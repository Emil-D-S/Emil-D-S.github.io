let actionsText = `
Left click to place set ball x position
Left click and drag to set x position and x velocity
`

let paramText;
let param2Text;

let infoText = `
Combinations:
P - oscillates
I - oscillates, unstable
D - tries to stop velocity
PD - stable, doesn't correct for misalignment of actuator
PI - unstable
ID - oscillates



`

let slidP;
let slidD;
let slidI;
let slidThErr;
let slidWind;

let checkP;
let checkD;
let checkI;
let checkThErr;
let checkWind;
let checkManual;

let g = 1;

let mass = 1;

let acc = 0;
let vel = 0;
let pos = 40;
let ipos = 0;
let theta = 0;

let thetaError = 0;
let windForce = 0;

let holoX = 0;
let holoVel = 0;

let mouseVelScale = 1;

let velArrowScale = 10;
let accArrowScale = 100;

let baseWidth = 20;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  
  slidP = createSlider(1, 100, 10);
  slidD = createSlider(5, 500, 50);
  slidI = createSlider(1, 100, 100);
  slidThErr = createSlider(-20, 20, 0, 0.1);
  slidWind = createSlider(-0.75, 0.75, 0, 0.01);
  
  checkP = createCheckbox(" Proportional", 1);
  checkD = createCheckbox(" Derivative", 1);
  checkI = createCheckbox(" Integral ", 1);
  checkThErr = createCheckbox(" misalignment error ", 1);
  checkWind = createCheckbox(" wind force ", 1);
  checkManual = createCheckbox(" Manual platfrom control ", 0);
  
  slidP.position(5, height + 10);
  slidD.position(135, height + 10);
  slidI.position(135*2, height + 10);
  slidThErr.position(135*3, height + 10);
  slidWind.position(135*4+40, height + 10);
  
  checkP.position(5, height - 30);
  checkD.position(135, height - 30);
  checkI.position(135*2, height - 30);
  checkThErr.position(135*3, height - 30);
  checkWind.position(135*4+40, height - 30);
  checkManual.position(135*4+40, height - 60);
  
}

  let accP = 0;
  let accD = 0;
  let accI = 0;

function draw() {
  background(180);
  
  
  let kp = slidP.value() * 0.0001;  // 10
  let kd = slidD.value() * 0.001 * mass; // 50  <== MASS DEPENDENT
  let ki = slidI.value() * 0.0000001; // 100
  
  
  let tarAcc = 0;
  if(checkP.checked()) {accP = kp * pos;} else {accP = 0;}
  if(checkD.checked()) {accD = kd * vel;} else {accD = 0;}
  if(checkI.checked()) {accI = ki * ipos;} else {accI = 0;}
  
  
  tarAcc += accP;
  tarAcc += accD;
  tarAcc += accI;
  tarAcc = constrain(tarAcc, -g*0.9, g*0.9);
  
  theta = asin(tarAcc/g);
  
  
  thetaError = 0;
  if(checkThErr.checked()) {thetaError = slidThErr.value();}
  theta += thetaError;
  
  //theta = constrain(theta, -75, 75);
  
  if(checkWind.checked()) {windForce = slidWind.value();}
  else {windForce = 0;}
  
  if(checkManual.checked()) {theta = map(mouseX, 0, width, -45, 45);}
  
  
  acc = -(g/mass) * sin(theta) + windForce;
  vel += acc;
  pos += vel;
  ipos += pos;
  
  //console.log(theta, acc);
  
  if(mouseIsPressed && !checkManual.checked()) {holoX = mouseStartX - width/2;
                     holoVel = (mouseX - mouseStartX)* (mouseVelScale/100);}
  else {holoX = mouseX - width/2;
       holoVel = 0;}
  
  drawPlatform({x:width/2, y:height/2}, theta, thetaError, width, 40, pos, vel, acc, holoX, holoVel, (!checkManual.checked() && 0 < mouseY && mouseY < height - 200));
  
  
  paramText = `
mass: ` + mass + `
pos: ` + round(pos, 2) + `
vel: ` + round(vel, 4) + `
acc: ` + round(acc, 8) + `
`
  
  param2Text = `
only visual:
acc indicator scale: ` + accArrowScale + `
vel indicator scale: ` + velArrowScale + `
`
  
  strokeWeight(0);
  fill(0);
  textStyle(BOLD)
  textSize(20);
  text(actionsText, 20, 20);
  textStyle(NORMAL);
  text(paramText, 20, 100);
  push();
  fill(193, 18, 31); // RED
  text("\n\n➡", 480, 100);
  fill(0, 0, 255);
  text("\n\n\n➡", 480, 100);
  pop();
  text(param2Text, 500, 100);
  textStyle(BOLD)
  text(infoText, 20, 575);
}


function drawPlatform(pivot, theta, thetaError, len,r, ballx, v, a, holox, holoVel, holoEn) {
  strokeWeight(4);
  
  stroke(0, 0, 0, 255);
  fill(255, 255);
  let bally = +(ballx/cos(theta)) * sin(theta) + r/cos(theta);
  let holoy = +(holox/cos(theta)) * sin(theta) + r/cos(theta);
  circle(pivot.x + ballx, pivot.y - bally, 2*r);
  if(holoEn){
  stroke(0, 0, 0, 125);
  fill(255, 125);
  circle(pivot.x + holox, pivot.y - holoy, 2*r);
  }
  stroke(0, 0, 0, 255);
  fill(255, 255);
  line(pivot.x, pivot.y, pivot.x + len * cos(theta), pivot.y - len * sin(theta));
  line(pivot.x, pivot.y, pivot.x - len * cos(theta), pivot.y + len * sin(theta));
  
  strokeWeight(2);
  stroke(0, 0, 255, 255);
  line(pivot.x, pivot.y, pivot.x + len * cos(theta - thetaError), pivot.y - len * sin(theta - thetaError));
  line(pivot.x, pivot.y, pivot.x - len * cos(theta - thetaError), pivot.y + len * sin(theta - thetaError));
  
  let weight = 10
  strokeWeight(weight);
  stroke(0, 0, 255);
  line(pivot.x + ballx, pivot.y - bally, pivot.x + ballx + vel*velArrowScale, pivot.y - bally);
  if(holoEn){
    stroke(0, 0, 255, 125);
    line(pivot.x + holox, pivot.y - holoy, pivot.x + holox + holoVel*velArrowScale, pivot.y - holoy);
  }
  stroke(193, 18, 31); // RED
  line(pivot.x + ballx, pivot.y - bally - weight, pivot.x + ballx + 3*acc*accArrowScale, pivot.y - bally - weight);
  
  stroke(75, 170, 200);
  line(width/2, 250, width/2 + windForce*accArrowScale, 250);
  
  strokeWeight(10);
  stroke(193, 18, 31); // RED
  line(width/2, pivot.y + 80, width/2 + 5*acc*accArrowScale, pivot.y + 80);
  stroke(255, 195, 0);
  line(width/2, pivot.y + 110, width/2 - 5*accP*accArrowScale, pivot.y + 110);
  stroke(33, 158, 188);
  line(width/2, pivot.y + 140, width/2 - 5*accD*accArrowScale, pivot.y + 140);
  stroke(17, 152, 34);
  line(width/2, pivot.y + 170, width/2 - 5*accI*accArrowScale, pivot.y + 170);
  
  strokeWeight(4);
  stroke(0, 0, 0);
  line(pivot.x, pivot.y, width/2 - baseWidth, height-350);
  line(pivot.x, pivot.y, width/2 + baseWidth, height-350);
  line(width/2 - baseWidth, height-350, width/2 + baseWidth, height-350);
  strokeWeight(8);
  stroke(255, 0, 0);
  point(pivot.x, pivot.y);
}


let mouseStartX;
let validMouseStartX = false;

function mousePressed() {
  if(0 < mouseY && mouseY < height - 200 && !checkManual.checked()) {
    mouseStartX = mouseX;
    validMouseStartX = true;
  } else {
    validMouseStartX = false;
    
  }
}
function mouseReleased() {
  if(0 < mouseY && mouseY < height - 200 && !checkManual.checked() && validMouseStartX) {
    vel = holoVel;
    pos = mouseStartX - width/2;
    ipos = 0;
  }
}