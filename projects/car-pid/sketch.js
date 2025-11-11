class Car {
  constructor(x, y) {
    this.rearAxle = createVector(x, y); // Use rear axle as reference point
    this.heading = 0;

    this.powerSpeed = 0;
    this.steeringAngle = 0;

    this.carLength = 100;
    this.carWidth = 50;
    this.wheelBase = this.carLength; // Distance between axles
    this.frontBumperLength = this.carLength * 0.2;
    this.rearBumperLength = this.carLength * 0.2;
  }

  update() {
    if (Math.abs(this.powerSpeed) < 0.001) return;

    const dt = 1; // Time step

    // Handle straight motion
    if (Math.abs(this.steeringAngle) < 0.001) {
      this.rearAxle.x += this.powerSpeed * cos(this.heading) * dt;
      this.rearAxle.y += this.powerSpeed * sin(this.heading) * dt;
      return;
    }

    // Calculate turning radius from steering angle
    // Using bicycle model: R = wheelBase / tan(steeringAngle)
    const turningRadius = this.wheelBase / tan(this.steeringAngle);

    // Calculate angular velocity
    const omega = this.powerSpeed / turningRadius;

    // Update heading
    this.heading += omega * dt;

    // Calculate ICC (Instantaneous Center of Curvature)
    // ICC is perpendicular to heading, at distance R
    const iccX = this.rearAxle.x - turningRadius * sin(this.heading);
    const iccY = this.rearAxle.y + turningRadius * cos(this.heading);

    // Rotate rear axle around ICC
    const dx = this.rearAxle.x - iccX;
    const dy = this.rearAxle.y - iccY;

    const newDx = dx * cos(omega * dt) - dy * sin(omega * dt);
    const newDy = dx * sin(omega * dt) + dy * cos(omega * dt);

    this.rearAxle.x = iccX + newDx;
    this.rearAxle.y = iccY + newDy;

    // Normalize heading
    this.heading = ((this.heading % TWO_PI) + TWO_PI) % TWO_PI;
  }

  show() {
    push();

    // Translate to rear axle position
    translate(this.rearAxle.x, this.rearAxle.y);
    rotate(this.heading);

    // Draw car body (origin is at rear axle center)
    rectMode(CORNER);
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(1);

    // Main body
    rect(0, -this.carWidth / 2, this.carLength, this.carWidth);

    // Front bumper
    rect(
      this.carLength,
      -this.carWidth / 2,
      this.frontBumperLength,
      this.carWidth
    );

    // Rear bumper
    rect(
      -this.rearBumperLength,
      -this.carWidth / 2,
      this.rearBumperLength,
      this.carWidth
    );

    // Draw wheels
    this.drawWheel(0, -this.carWidth / 2, 0); // Rear left
    this.drawWheel(0, this.carWidth / 2, 0); // Rear right

    // Front wheels with steering angle
    if (Math.abs(this.steeringAngle) < 0.001) {
      this.drawWheel(this.carLength, -this.carWidth / 2, 0);
      this.drawWheel(this.carLength, this.carWidth / 2, 0);
    } else {
      const innerAngle = atan(
        this.wheelBase /
          (this.wheelBase / tan(this.steeringAngle) - this.carWidth / 2)
      );
      const outerAngle = atan(
        this.wheelBase /
          (this.wheelBase / tan(this.steeringAngle) + this.carWidth / 2)
      );

      if (this.steeringAngle > 0) {
        this.drawWheel(this.carLength, -this.carWidth / 2, innerAngle); // Inner wheel
        this.drawWheel(this.carLength, this.carWidth / 2, outerAngle); // Outer wheel
      } else {
        this.drawWheel(this.carLength, -this.carWidth / 2, outerAngle);
        this.drawWheel(this.carLength, this.carWidth / 2, innerAngle);
      }
    }

    // Draw rear axle point (blue)
    fill(0, 0, 255);
    noStroke();
    circle(0, 0, 10);

    // Draw ICC (green) for visualization
    if (Math.abs(this.steeringAngle) > 0.001) {
      const turningRadius = this.wheelBase / tan(this.steeringAngle);
      fill(0, 255, 0);
      circle(0, turningRadius, 10);
    }

    pop();
  }

  drawWheel(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(10);
    rect(0, 0, 20, 10);
    pop();
  }
}

let car;

function setup() {
  createCanvas(1000, 700);
  car = new Car(width / 2, height / 2);
}

function draw() {
  background(220);

  car.update();
  car.show();

  // Display controls info
  fill(0);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  text("Arrow Keys: Steering", 10, 20);
  text("W/S: Speed control", 10, 40);
  text(`Speed: ${car.powerSpeed.toFixed(1)}`, 10, 60);
  text(`Steering: ${degrees(car.steeringAngle).toFixed(1)}°`, 10, 80);
}

function keyReleased() {
  // Steering control
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    car.steeringAngle = 0;
  }
}

function keyIsDown(keyCode) {
  return false;
}

// Check for continuous key presses
function draw() {
  background(220);

  // Steering control (continuous)
  if (keyIsDown(LEFT_ARROW)) {
    car.steeringAngle = -PI / 6; // -30 degrees
  } else if (keyIsDown(RIGHT_ARROW)) {
    car.steeringAngle = PI / 6; // 30 degrees
  } else {
    car.steeringAngle = 0;
  }
  if (keyIsDown(UP_ARROW)) {
    car.powerSpeed += 0.1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    car.powerSpeed -= 0.1;
  }

  car.update();
  car.show();

  // Display controls info
  fill(0);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  text("Arrow Keys: Steering", 10, 20);
  text("W/S: Speed control", 10, 40);
  text(`Speed: ${car.powerSpeed.toFixed(1)}`, 10, 60);
  text(`Steering: ${degrees(car.steeringAngle).toFixed(1)}°`, 10, 80);
}
