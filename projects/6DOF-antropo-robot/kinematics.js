export class DH6DOF {
  /**
   * dhParams: array of 6 objects { a, alpha, d, theta }
   * options: { jointLimits: [{min, max}, ...], tcp: {pos, rot} }
   */
  constructor(dhParams = null, options = {}) {
    if (!dhParams || dhParams.length !== 6)
      throw new Error("DH6DOF requires dhParams array of length 6");

    this.dh = dhParams.map((p) => ({
      a: p.a || 0,
      alpha: p.alpha || 0,
      d: p.d || 0,
      theta: p.theta || 0,
    }));

    this.jointLimits = options.jointLimits || null;

    // Store base alignment matrix
    this.Rbase = DH6DOF.rotXminus90();
    this.RbaseInv = DH6DOF.transpose(this.Rbase);

    // TCP offset (position and rotation relative to end-effector)
    this.tcp = {
      pos: options.tcp?.pos || [0, 0, 0],
      rot: options.tcp?.rot || [0, 0, 0], // Euler angles XYZ
    };
  }

  // =========== TCP METHODS ==========

  /**
   * Set TCP offset
   * @param {Array} pos - [x, y, z] position offset
   * @param {Array} rot - [rx, ry, rz] Euler angles in radians
   */
  setTCP(pos, rot) {
    this.tcp.pos = pos ? [...pos] : [0, 0, 0];
    this.tcp.rot = rot ? [...rot] : [0, 0, 0];
  }

  /**
   * Get TCP offset
   */
  getTCP() {
    return {
      pos: [...this.tcp.pos],
      rot: [...this.tcp.rot],
    };
  }

  /**
   * Calculate TCP pose from end-effector pose
   * @param {Array} eePos - [x, y, z] end-effector position
   * @param {Array} eeQuat - [x, y, z, w] end-effector quaternion
   * @returns {Object} { pos: [x,y,z], quat: [x,y,z,w] }
   */
  calcTCPPose(eePos, eeQuat) {
    // Create TCP offset rotation matrix
    const tcpRotMat = DH6DOF.eulerToRotMat(
      this.tcp.rot[0],
      this.tcp.rot[1],
      this.tcp.rot[2]
    );

    // Convert EE quat to rotation matrix
    const eeRotMat = DH6DOF.quatToRot(eeQuat);

    // TCP rotation = EE_rot * TCP_offset_rot
    const tcpRotMatWorld = DH6DOF.mat3Mul(eeRotMat, tcpRotMat);

    // TCP position = EE_pos + EE_rot * TCP_offset_pos
    const tcpPosOffset = DH6DOF.mat3MulVec(eeRotMat, this.tcp.pos);
    const tcpPos = DH6DOF.add3(eePos, tcpPosOffset);

    // Convert to quaternion
    const tcpQuat = DH6DOF.rotToQuat(tcpRotMatWorld);

    return { pos: tcpPos, quat: tcpQuat };
  }

  /**
   * Calculate end-effector pose from desired TCP pose
   * @param {Array} tcpPos - [x, y, z] desired TCP position
   * @param {Array} tcpQuat - [x, y, z, w] desired TCP quaternion
   * @returns {Object} { pos: [x,y,z], quat: [x,y,z,w] }
   */
  calcEEFromTCPPose(tcpPos, tcpQuat) {
    // Create TCP offset rotation matrix
    const tcpOffsetRotMat = DH6DOF.eulerToRotMat(
      this.tcp.rot[0],
      this.tcp.rot[1],
      this.tcp.rot[2]
    );

    // Invert TCP offset rotation
    const tcpOffsetRotMatInv = DH6DOF.transpose(tcpOffsetRotMat); // transpose = inverse for rotation

    // Convert TCP quat to rotation matrix
    const tcpRotMat = DH6DOF.quatToRot(tcpQuat);

    // EE rotation = TCP_rot * TCP_offset_rot^-1
    const eeRotMat = DH6DOF.mat3Mul(tcpRotMat, tcpOffsetRotMatInv);

    // EE position = TCP_pos - EE_rot * TCP_offset_pos
    const tcpPosOffsetWorld = DH6DOF.mat3MulVec(eeRotMat, this.tcp.pos);
    const eePos = DH6DOF.sub3(tcpPos, tcpPosOffsetWorld);

    // Convert to quaternion
    const eeQuat = DH6DOF.rotToQuat(eeRotMat);

    return { pos: eePos, quat: eeQuat };
  }

  // =========== BASE FRAME ALIGNMENT ==========
  static rotXminus90() {
    return [
      [1, 0, 0],
      [0, 0, 1],
      [0, -1, 0],
    ];
  }

  static applyBaseAlignToTransforms(transforms, Rbase) {
    return transforms.map((tf) => {
      const Rnew = DH6DOF.mat3Mul(Rbase, tf.R);
      const pnew = DH6DOF.mat3MulVec(Rbase, tf.p);
      return { R: Rnew, p: pnew };
    });
  }

  // ========== UTILITY FUNCTIONS ==========
  static vec3(x = 0, y = 0, z = 0) {
    return [x, y, z];
  }
  static add3(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  }
  static sub3(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  static mulScalar(v, s) {
    return [v[0] * s, v[1] * s, v[2] * s];
  }
  static dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  static cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }
  static norm(v) {
    return Math.hypot(v[0], v[1], v[2]);
  }
  static normalize(v) {
    const n = DH6DOF.norm(v) || 1;
    return [v[0] / n, v[1] / n, v[2] / n];
  }

  static ident3() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
  }

  static mat3MulVec(m, v) {
    return [
      m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
      m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
      m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
    ];
  }

  static mat3Mul(a, b) {
    const out = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        let s = 0;
        for (let k = 0; k < 3; k++) s += a[i][k] * b[k][j];
        out[i][j] = s;
      }
    return out;
  }

  static rotToQuat(R) {
    const tr = R[0][0] + R[1][1] + R[2][2];
    let x, y, z, w;
    if (tr > 0) {
      const S = Math.sqrt(tr + 1.0) * 2;
      w = 0.25 * S;
      x = (R[2][1] - R[1][2]) / S;
      y = (R[0][2] - R[2][0]) / S;
      z = (R[1][0] - R[0][1]) / S;
    } else if ((R[0][0] > R[1][1]) & (R[0][0] > R[2][2])) {
      const S = Math.sqrt(1.0 + R[0][0] - R[1][1] - R[2][2]) * 2;
      w = (R[2][1] - R[1][2]) / S;
      x = 0.25 * S;
      y = (R[0][1] + R[1][0]) / S;
      z = (R[0][2] + R[2][0]) / S;
    } else if (R[1][1] > R[2][2]) {
      const S = Math.sqrt(1.0 + R[1][1] - R[0][0] - R[2][2]) * 2;
      w = (R[0][2] - R[2][0]) / S;
      x = (R[0][1] + R[1][0]) / S;
      y = 0.25 * S;
      z = (R[1][2] + R[2][1]) / S;
    } else {
      const S = Math.sqrt(1.0 + R[2][2] - R[0][0] - R[1][1]) * 2;
      w = (R[1][0] - R[0][1]) / S;
      x = (R[0][2] + R[2][0]) / S;
      y = (R[1][2] + R[2][1]) / S;
      z = 0.25 * S;
    }
    return [x, y, z, w];
  }

  static quatToRot(q) {
    const x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    const x2 = x * x,
      y2 = y * y,
      z2 = z * z;
    const xy = x * y,
      xz = x * z,
      yz = y * z;
    const wx = w * x,
      wy = w * y,
      wz = w * z;

    return [
      [1 - 2 * (y2 + z2), 2 * (xy - wz), 2 * (xz + wy)],
      [2 * (xy + wz), 1 - 2 * (x2 + z2), 2 * (yz - wx)],
      [2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (x2 + y2)],
    ];
  }

  static eulerToRotMat(rx, ry, rz) {
    const cx = Math.cos(rx),
      sx = Math.sin(rx);
    const cy = Math.cos(ry),
      sy = Math.sin(ry);
    const cz = Math.cos(rz),
      sz = Math.sin(rz);

    // XYZ Euler
    return [
      [cy * cz, -cy * sz, sy],
      [cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy],
      [sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy],
    ];
  }

  static quatMul(a, b) {
    const ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
    const bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
    return [
      aw * bx + ax * bw + ay * bz - az * by,
      aw * by - ax * bz + ay * bw + az * bx,
      aw * bz + ax * by - ay * bx + az * bw,
      aw * bw - ax * bx - ay * by - az * bz,
    ];
  }

  static quatConjugate(q) {
    return [-q[0], -q[1], -q[2], q[3]];
  }

  // ========== DH TRANSFORM ==========
  static dhTransform(a, alpha, d, theta) {
    const ct = Math.cos(theta),
      st = Math.sin(theta);
    const ca = Math.cos(alpha),
      sa = Math.sin(alpha);
    const R = [
      [ct, -st * ca, st * sa],
      [st, ct * ca, -ct * sa],
      [0, sa, ca],
    ];
    const p = [a * ct, a * st, d];
    return { R, p };
  }

  // ========== FORWARD KINEMATICS ==========
  forwardKinematics(joints) {
    const transforms = [];
    transforms.push({ R: DH6DOF.ident3(), p: [0, 0, 0] });

    let currentR = DH6DOF.ident3();
    let currentP = [0, 0, 0];

    for (let i = 0; i < 6; i++) {
      const p = this.dh[i];
      const theta = joints[i] + p.theta;
      const T = DH6DOF.dhTransform(p.a, p.alpha, p.d, theta);

      const newR = DH6DOF.mat3Mul(currentR, T.R);
      const newP = DH6DOF.add3(currentP, DH6DOF.mat3MulVec(currentR, T.p));

      transforms.push({ R: newR, p: newP });
      currentR = newR;
      currentP = newP;
    }

    const end = transforms[transforms.length - 1];
    const quat = DH6DOF.rotToQuat(end.R);
    return { transforms, end: { pos: end.p, R: end.R, quat } };
  }

  // ========== JACOBIAN ==========
  computeJacobian(joints) {
    const fk = this.forwardKinematics(joints);
    const transforms = fk.transforms;
    const p_end = fk.end.pos;

    const zAxes = [];
    const origins = [];
    for (let i = 0; i < 6; i++) {
      const tf = transforms[i];
      const z = [tf.R[0][2], tf.R[1][2], tf.R[2][2]];
      zAxes.push(z);
      origins.push(tf.p);
    }

    const J = new Array(6).fill(0).map(() => new Array(6).fill(0));
    for (let i = 0; i < 6; i++) {
      const z = zAxes[i];
      const r = DH6DOF.sub3(p_end, origins[i]);
      const Jv = DH6DOF.cross(z, r);
      const Jw = z;
      J[0][i] = Jv[0];
      J[1][i] = Jv[1];
      J[2][i] = Jv[2];
      J[3][i] = Jw[0];
      J[4][i] = Jw[1];
      J[5][i] = Jw[2];
    }
    return J;
  }

  // ========== LINEAR ALGEBRA HELPERS ==========
  static transpose(A) {
    const r = A.length,
      c = A[0].length;
    const B = new Array(c).fill(0).map(() => new Array(r).fill(0));
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) B[j][i] = A[i][j];
    return B;
  }

  static matMul(A, B) {
    const r = A.length,
      m = A[0].length,
      c = B[0].length;
    const C = new Array(r).fill(0).map(() => new Array(c).fill(0));
    for (let i = 0; i < r; i++)
      for (let k = 0; k < c; k++) {
        let s = 0;
        for (let j = 0; j < m; j++) s += A[i][j] * B[j][k];
        C[i][k] = s;
      }
    return C;
  }

  static addDamping(A, lambda2) {
    const N = A.length;
    const B = new Array(N).fill(0).map(() => new Array(N).fill(0));
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) B[i][j] = A[i][j];
    for (let i = 0; i < N; i++) B[i][i] += lambda2;
    return B;
  }

  static solveLinearSystem(A_in, b_in) {
    const N = A_in.length;
    const A = new Array(N).fill(0).map((_, i) => A_in[i].slice());
    const b = b_in.slice();

    for (let i = 0; i < N; i++) {
      let maxRow = i;
      let maxVal = Math.abs(A[i][i]);
      for (let r = i + 1; r < N; r++) {
        const v = Math.abs(A[r][i]);
        if (v > maxVal) {
          maxVal = v;
          maxRow = r;
        }
      }
      if (maxRow !== i) {
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];
      }
      if (Math.abs(A[i][i]) < 1e-12) A[i][i] = 1e-12;

      for (let r = i + 1; r < N; r++) {
        const factor = A[r][i] / A[i][i];
        for (let c = i; c < N; c++) A[r][c] -= factor * A[i][c];
        b[r] -= factor * b[i];
      }
    }

    const x = new Array(N).fill(0);
    for (let i = N - 1; i >= 0; i--) {
      let s = b[i];
      for (let j = i + 1; j < N; j++) s -= A[i][j] * x[j];
      x[i] = s / A[i][i];
    }
    return x;
  }

  static orientationErrorQuat(q_cur, q_des) {
    const q_conj = DH6DOF.quatConjugate(q_cur);
    const q_err = DH6DOF.quatMul(q_des, q_conj);
    return [q_err[0], q_err[1], q_err[2]];
  }

  // ========== INVERSE KINEMATICS ==========
  /**
   * @param {Object} targetPose - { pos: [x,y,z], quat: [x,y,z,w] } in WORLD frame
   * @param {Array} initialGuess - starting joint angles
   * @param {Object} options - { maxIters, tolPos, tolOri, lambda }
   */
  inverseKinematics(targetPose, initialGuess, options = {}) {
    const maxIters = options.maxIters ?? 100;
    const tolPos = options.tolPos ?? 1e-4;
    const tolOri = options.tolOri ?? 1e-3;
    let lambda = options.lambda ?? 0.15;

    // Convert target from world frame to DH frame
    const p_des_world = Array.isArray(targetPose.pos)
      ? targetPose.pos
      : [targetPose.pos.x, targetPose.pos.y, targetPose.pos.z];

    const q_des_world = Array.isArray(targetPose.quat)
      ? targetPose.quat
      : [
          targetPose.quat.x,
          targetPose.quat.y,
          targetPose.quat.z,
          targetPose.quat.w,
        ];

    // Transform target position to DH frame
    const p_des = DH6DOF.mat3MulVec(this.RbaseInv, p_des_world);

    // Transform target orientation to DH frame
    const R_des_world = DH6DOF.quatToRot(q_des_world);
    const R_des = DH6DOF.mat3Mul(this.RbaseInv, R_des_world);
    const q_des = DH6DOF.rotToQuat(R_des);

    let theta = initialGuess ? initialGuess.slice() : new Array(6).fill(0);

    const clampToLimits = (arr) => {
      if (!this.jointLimits) return arr;
      for (let i = 0; i < 6; i++) {
        if (this.jointLimits[i]) {
          const lo = this.jointLimits[i].min ?? -Infinity;
          const hi = this.jointLimits[i].max ?? Infinity;
          arr[i] = Math.max(lo, Math.min(hi, arr[i]));
        }
      }
      return arr;
    };

    theta = clampToLimits(theta);
    let bestTheta = theta.slice();
    let bestError = Infinity;

    for (let iter = 0; iter < maxIters; iter++) {
      const fk = this.forwardKinematics(theta);
      const p_cur = fk.end.pos;
      const q_cur = fk.end.quat;

      const e_pos = DH6DOF.sub3(p_des, p_cur);
      const errPosNorm = DH6DOF.norm(e_pos);

      const e_ori = DH6DOF.orientationErrorQuat(q_cur, q_des);
      const errOriNorm = DH6DOF.norm(e_ori);

      const totalError = errPosNorm + errOriNorm;
      if (totalError < bestError) {
        bestError = totalError;
        bestTheta = theta.slice();
      }

      if (errPosNorm < tolPos && errOriNorm < tolOri) {
        return {
          success: true,
          iterations: iter,
          joints: theta,
          posError: errPosNorm,
          oriError: errOriNorm,
        };
      }

      const errorVec = [...e_pos, ...e_ori];
      const J = this.computeJacobian(theta);
      const JT = DH6DOF.transpose(J);
      const JTJ = DH6DOF.matMul(JT, J);
      const A = DH6DOF.addDamping(JTJ, lambda * lambda);
      const JT_e = DH6DOF.matMul(
        JT,
        errorVec.map((v) => [v])
      );
      const rhs = JT_e.map((row) => row[0]);

      let delta;
      try {
        delta = DH6DOF.solveLinearSystem(A, rhs);
      } catch (e) {
        console.warn("Linear solve failed, increasing damping");
        lambda *= 2;
        continue;
      }

      const deltaValid = delta.every((v) => isFinite(v));
      if (!deltaValid) {
        lambda *= 2;
        theta = bestTheta.slice();
        continue;
      }

      const maxStep = 0.3;
      for (let i = 0; i < 6; i++) {
        const step = Math.max(-maxStep, Math.min(maxStep, delta[i]));
        theta[i] += step;
      }

      theta = clampToLimits(theta);
      lambda = Math.max(1e-6, lambda * 0.95);
    }

    return {
      success: false,
      iterations: maxIters,
      joints: bestTheta,
      posError: bestError,
      oriError: bestError,
    };
  }

  clampJoints(joints) {
    if (!this.jointLimits) return joints;
    return joints.map((angle, i) => {
      if (!this.jointLimits[i]) return angle;
      const { min = -Infinity, max = Infinity } = this.jointLimits[i];
      return Math.max(min, Math.min(max, angle));
    });
  }
}
