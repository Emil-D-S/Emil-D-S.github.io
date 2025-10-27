import { DH6DOF } from "./kinematics.js";

export class RobotState {
  constructor(kinematics) {
    this.kinematics = kinematics;

    // Joint space state
    this.joints = new Array(6).fill(0);
    this.jointVelocities = new Array(6).fill(0);
    this.jointAccelerations = new Array(6).fill(0);

    // Task space state (end-effector)
    this.endEffector = {
      position: [0, 0, 0], // [x, y, z]
      orientation: [0, 0, 0, 1], // quaternion [x, y, z, w]
      velocity: [0, 0, 0], // linear velocity
      angularVelocity: [0, 0, 0], // angular velocity
    };

    // Cached transforms from FK
    this.transforms = null;

    // Timing
    this.lastUpdateTime = performance.now();

    // Initial FK
    this.updateEndEffector();
  }

  // ========== JOINT SPACE UPDATES ==========

  /**
   * Set all joint angles at once
   */
  setJoints(newJoints, updateFK = true) {
    const now = performance.now();
    const dt = Math.max(0.001, (now - this.lastUpdateTime) / 1000);

    // Calculate velocities and accelerations
    for (let i = 0; i < 6; i++) {
      const newVel = (newJoints[i] - this.joints[i]) / dt;
      this.jointAccelerations[i] = (newVel - this.jointVelocities[i]) / dt;
      this.jointVelocities[i] = newVel;
    }

    this.joints = [...newJoints];
    this.lastUpdateTime = now;

    if (updateFK) {
      this.updateEndEffector();
    }
  }

  /**
   * Set a single joint angle
   */
  setJoint(index, angle, updateFK = true) {
    if (index < 0 || index >= 6) {
      throw new Error(`Invalid joint index: ${index}`);
    }

    const now = performance.now();
    const dt = Math.max(0.001, (now - this.lastUpdateTime) / 1000);

    const newVel = (angle - this.joints[index]) / dt;
    this.jointAccelerations[index] =
      (newVel - this.jointVelocities[index]) / dt;
    this.jointVelocities[index] = newVel;

    this.joints[index] = angle;
    this.lastUpdateTime = now;

    if (updateFK) {
      this.updateEndEffector();
    }
  }

  /**
   * Set joint velocities directly (useful for velocity control)
   */
  setJointVelocities(velocities) {
    this.jointVelocities = [...velocities];
  }

  // ========== TASK SPACE UPDATES ==========

  /**
   * Update end-effector pose from current joint angles (FK)
   */
  updateEndEffector() {
    // compute FK in DH frame
    const fkDH = this.kinematics.forwardKinematics(this.joints);
    // apply base alignment (DH-frame -> world-frame)
    const Rbase = DH6DOF.rotXminus90();
    const worldTransforms = DH6DOF.applyBaseAlignToTransforms(
      fkDH.transforms,
      Rbase
    );

    // cache aligned transforms for external use
    this.transforms = worldTransforms;

    // take last transform as end-effector
    const endTf = worldTransforms[worldTransforms.length - 1];

    // oldPos for velocity estimate (keep previous endEffector.position)
    const oldPos = [...this.endEffector.position];

    // set position from aligned transform
    this.endEffector.position = [endTf.p[0], endTf.p[1], endTf.p[2]];

    // compute quaternion from aligned R and store
    const quat = DH6DOF.rotToQuat(endTf.R); // [x,y,z,w]
    this.endEffector.orientation = [quat[0], quat[1], quat[2], quat[3]];

    // approximate EE linear velocity
    const now = performance.now();
    const dt = Math.max(0.001, (now - this.lastUpdateTime) / 1000);
    this.endEffector.velocity = [
      (this.endEffector.position[0] - oldPos[0]) / dt,
      (this.endEffector.position[1] - oldPos[1]) / dt,
      (this.endEffector.position[2] - oldPos[2]) / dt,
    ];

    // update lastUpdateTime (so next velocity calc is correct)
    this.lastUpdateTime = now;
  }

  /**
   * Move to target pose using IK
   */
  moveToTarget(targetPose, options = {}) {
    const result = this.kinematics.inverseKinematics(
      targetPose,
      this.joints,
      options
    );

    if (result.success) {
      this.setJoints(result.joints);
      return { success: true, ...result };
    }

    return { success: false, ...result };
  }

  /**
   * Move EE to a position/rotation relative to a given origin frame
   * Accepts origin in either { pos, quat } or { position, orientation } forms.
   * relative: { pos: [dx,dy,dz], rotEuler: [dRx,dRy,dRz] } (in origin's local axes)
   */
  moveEERelativeToPosition(origin, relative, ikOptions = {}) {
    if (!origin || !relative) {
      return { success: false, error: "Missing parameters" };
    }

    // --- Parse origin position (support .pos or .position) ---
    let originPos = null;
    if (Array.isArray(origin.pos) && origin.pos.length === 3) {
      originPos = origin.pos.slice();
    } else if (Array.isArray(origin.position) && origin.position.length === 3) {
      originPos = origin.position.slice();
    } else if (origin.position && origin.position.isVector3) {
      originPos = [origin.position.x, origin.position.y, origin.position.z];
    } else if (origin.pos && origin.pos.isVector3) {
      originPos = [origin.pos.x, origin.pos.y, origin.pos.z];
    } else {
      originPos = [0, 0, 0];
    }

    // --- Parse origin quaternion (support .quat, .orientation, THREE.Quaternion, or array) ---
    let originQuat = null;
    if (Array.isArray(origin.quat) && origin.quat.length === 4) {
      originQuat = origin.quat.slice();
    } else if (
      Array.isArray(origin.orientation) &&
      origin.orientation.length === 4
    ) {
      originQuat = origin.orientation.slice();
    } else if (origin.orientation && origin.orientation.isQuaternion) {
      originQuat = [
        origin.orientation.x,
        origin.orientation.y,
        origin.orientation.z,
        origin.orientation.w,
      ];
    } else if (origin.quat && origin.quat.isQuaternion) {
      originQuat = [origin.quat.x, origin.quat.y, origin.quat.z, origin.quat.w];
    } else {
      // fallback identity
      originQuat = [0, 0, 0, 1];
    }

    // --- Relative translation (in origin local axes) ---
    const relPos =
      Array.isArray(relative.pos) && relative.pos.length === 3
        ? relative.pos.slice()
        : [0, 0, 0];

    // --- Convert origin quaternion -> rotation matrix ---
    const R_origin = DH6DOF.quatToRot(originQuat);

    // --- Transform relative position into world-frame target position ---
    const worldTargetPos = DH6DOF.add3(
      originPos,
      DH6DOF.mat3MulVec(R_origin, relPos)
    );

    // --- Relative rotation (Euler in origin-local axes) ---
    const relEuler =
      Array.isArray(relative.rotEuler) && relative.rotEuler.length === 3
        ? relative.rotEuler.slice()
        : [0, 0, 0];

    const relRotMat = DH6DOF.eulerToRotMat(
      relEuler[0],
      relEuler[1],
      relEuler[2]
    );
    const relQuat = DH6DOF.rotToQuat(relRotMat);

    // --- Compose quaternions (origin * relative) ---
    let targetQuat = DH6DOF.quatMul(originQuat, relQuat);

    // Normalize quaternion
    const qnorm =
      Math.hypot(targetQuat[0], targetQuat[1], targetQuat[2], targetQuat[3]) ||
      1;
    targetQuat = targetQuat.map((v) => v / qnorm);

    // Validate numbers (avoid NaN)
    const anyNaN =
      worldTargetPos.some((v) => !isFinite(v)) ||
      targetQuat.some((v) => !isFinite(v));
    if (anyNaN) {
      console.warn("moveEERelativeToOrigin: computed invalid targetPose", {
        worldTargetPos,
        targetQuat,
      });
      return { success: false, error: "Invalid computed target pose" };
    }

    const targetPose = { pos: worldTargetPos, quat: targetQuat };

    // Call IK (existing moveToTarget expects EE pose in world coords)
    const res = this.moveToTarget(targetPose, ikOptions);

    return { res, targetPose };
  }

  moveEEByLocalDelta(localDelta, ikOptions = {}) {
    // localDelta: { pos?: [dx,dy,dz], rotEuler?: [dRx,dRy,dRz] }
    // pos is in meters in the EE local axes
    // rotEuler is XYZ Euler (radians) representing rotation to apply in the EE local frame

    // Read current EE pose (world)
    const curPos = this.getEndEffectorPosition(); // [x,y,z]
    const curQuat = this.getEndEffectorOrientation(); // [x,y,z,w]

    // Normalise inputs
    const dpos = localDelta.pos ? [...localDelta.pos] : [0, 0, 0];
    const drot = localDelta.rotEuler ? [...localDelta.rotEuler] : [0, 0, 0];

    // Convert current quaternion -> rotation matrix
    const R_cur = DH6DOF.quatToRot(curQuat); // 3x3

    // Transform local translation to world: worldDelta = R_cur * dpos
    const worldDelta = DH6DOF.mat3MulVec(R_cur, dpos);
    const targetPos = DH6DOF.add3(curPos, worldDelta);

    // Convert local delta Euler -> quaternion (delta in EE local axes)
    const deltaRotMat = DH6DOF.eulerToRotMat(drot[0], drot[1], drot[2]);
    const deltaQuat = DH6DOF.rotToQuat(deltaRotMat); // [x,y,z,w]

    // Compose quaternions: newQuat = curQuat * deltaQuat
    let targetQuat = DH6DOF.quatMul(curQuat, deltaQuat); // [x,y,z,w]

    // (Optional) normalize quaternion to reduce numeric drift
    const qnorm =
      Math.hypot(targetQuat[0], targetQuat[1], targetQuat[2], targetQuat[3]) ||
      1;
    targetQuat = [
      targetQuat[0] / qnorm,
      targetQuat[1] / qnorm,
      targetQuat[2] / qnorm,
      targetQuat[3] / qnorm,
    ];

    // Build target pose (world-frame EE pose)
    const targetPose = { pos: targetPos, quat: targetQuat };

    // Debug (uncomment while testing)
    // console.debug("moveEEByLocalDelta -> targetPose:", targetPose);

    // Call existing IK (robotState.moveToTarget expects an EE pose in world coordinates)
    const res = this.moveToTarget(targetPose, ikOptions);

    // Return IK result (so caller can inspect success/failure)
    return { res, targetPose };
  }

  // ========== GETTERS ==========

  getJoints() {
    return [...this.joints];
  }

  getJointVelocities() {
    return [...this.jointVelocities];
  }

  getJointAccelerations() {
    return [...this.jointAccelerations];
  }

  getEndEffectorPosition() {
    return [...this.endEffector.position];
  }

  getEndEffectorOrientation() {
    return [...this.endEffector.orientation];
  }

  getEndEffectorVelocity() {
    return [...this.endEffector.velocity];
  }

  getTransform(jointIndex) {
    if (
      !this.transforms ||
      jointIndex < 0 ||
      jointIndex >= this.transforms.length
    ) {
      return null;
    }
    return this.transforms[jointIndex];
  }

  // ========== STATE SERIALIZATION ==========

  toJSON() {
    return {
      joints: this.joints,
      jointVelocities: this.jointVelocities,
      jointAccelerations: this.jointAccelerations,
      endEffector: this.endEffector,
      timestamp: this.lastUpdateTime,
    };
  }

  fromJSON(data) {
    this.joints = [...data.joints];
    this.jointVelocities = [...data.jointVelocities];
    this.jointAccelerations = [...data.jointAccelerations];
    this.endEffector = { ...data.endEffector };
    this.lastUpdateTime = data.timestamp || performance.now();
    this.updateEndEffector();
  }
}
