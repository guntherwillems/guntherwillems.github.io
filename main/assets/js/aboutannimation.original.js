//
//  Pre-rendering canvas with device speed detection v1.00
//  By Gunther Willems - https://guntherwillems.com
//  Project started: 24/12/2012
//  Last Modification: 04/01/2012, 04/2019
//  Copyright Gunther Willems
//

var width = 0, height = 0;
var interval = 40; // 40 = 25 fps
var currentAngle = 0;
var framecount = 0;
var maxframes = 850; // 180 (1/4th round)* 4 * 4 (rounds)
// seconds = 1 / (drawInterval / 1000), 100 frames at 100ms interval => 10 seconds

// To calculate possible slowdown on slower devices
var secondsCheck = 3; // after how many seconds check slowdown
var maxfps = Math.ceil(1000/interval)*secondsCheck;
var lastTime = new Date();

// one visible canvas & one pre-render canvas initialization
var precanvas = null;
var ctx = null;  // pre-render canvas
var visibleCtx = null; // visible canvas

// rotate cog1 when square is in range:
var rangestart = 328;
var rangelength = 27;
var range = [
  [rangestart,rangestart-rangelength],
  [rangestart-90,rangestart-rangelength-90],
  [rangestart-180,rangestart-rangelength-180],
  [rangestart-270,rangestart-rangelength-270]
]

// Name array columns:
var cogx = 0;
var cogy = 1;
var angle = 2;
var anglestep = 3;

// For name columns see previous statements: cogx cogy angle anglestep
var cog = [
  [240, 85, 0, 0.8],      // cog1 -> ticking part (horizontal, vertical, 0, anglestep)
  [90, 85, 0, -0.8]      // square
];


// Function that starts the rotation
function Init() {

  var canvas = document.getElementById("canvassquare");
  if ( canvas == null) { return; } // if browser doesn't support the canvas element, quit
  
  visibleCtx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  // pre-render canvas
  precanvas = document.createElement('canvas');
  precanvas.width = width;
  precanvas.height = height; 
  ctx = precanvas.getContext("2d");

  // alert(width);
  rotateCogs();
}


function rotateCogs()
// frame logic and set color
{
 ctx.clearRect(0,0,width,height);
 // then draw the cogs in the foreground
 if ( !rotateCog(0, "black"))
   return;
 if ( !rotateCog(1, "black"))
   return;

// clone the pre-rendered canvas
 visibleCtx.clearRect(0,0,width,height);
 visibleCtx.drawImage(precanvas, 0, 0);

 ++framecount;
 if (framecount == maxframes)
   return false;

if (framecount == maxfps) // if slowdown => slower devices => lower the fps with the same rotation speed
{
  var margin = 200;  // margin in miliseconds for pagedraw slowdown
  var nowTime = new Date();
  var diffTime = Math.ceil((nowTime.getTime() - lastTime.getTime()));
  //diffTime = 6000; // for testing
  //alert( diffTime);
  if (diffTime > (1000 * secondsCheck + margin))
  {
    if ( diffTime > 5000) // minimum slowdown, 9 fps
      diffTime = 5000;
    else
      diffTime-=margin;
    var percent = (diffTime/(1000*secondsCheck));
    interval = Math.ceil(interval*percent); // 1 fps
    cog[0][anglestep] = cog[0][anglestep]* percent;
    cog[1][anglestep] = cog[1][anglestep]* percent;
    //alert(diffTime + ":" + percent + ":"+interval+":"+anglestep);
  }
}

 setTimeout("rotateCogs()",interval);
 //window.requestAnimationFrame(rotateCogs); // test the new method when supported by major browsers...
}

function rotateCog(nr, cogcolor)
// rotation logic
{
  rotateCog1 = false;
  currentAngle = cog[nr][angle];

 if ( nr == 0)  // cog1
  {
   if (cog[1][angle] < range[0][0] && cog[1][angle] > range[0][1] ||
       cog[1][angle] < range[1][0] && cog[1][angle] > range[1][1] ||
       cog[1][angle] < range[2][0] && cog[1][angle] > range[2][1] ||
       cog[1][angle] < range[3][0] && cog[1][angle] > range[3][1]
      )
     {
      rotateCog1 = true;
     }

   cog1(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor);
  }
 else
   cog2(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor); // square

 if (nr == 1 || rotateCog1)
   {
    currentAngle+=cog[nr][anglestep];

    if (currentAngle > 360)
      currentAngle = currentAngle - 360;
    else if (currentAngle < 0)
      currentAngle = currentAngle + 360;
    cog[nr][angle] = currentAngle;
   }

 return true;
}

function cog1(ctx,x,y,r,color)
// draw ticking part
 {
  ctx.save();

  //ctx.scale(0.55, 0.55);

  ctx.translate(x, y); // change point of origin to rotate around
  //r = 0;
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  // cog1
  ctx.moveTo(2.3, -65.5);
  ctx.bezierCurveTo(2.4, -66.7, 2.4, -68.0, 2.5, -69.2);
  ctx.bezierCurveTo(2.6, -71.5, -0.2, -72.9, -1.9, -71.2);
  ctx.bezierCurveTo(-3.9, -69.1, -0.5, -63.3, -4.7, -62.9);
  ctx.bezierCurveTo(-9.6, -62.7, -5.2, -71.9, -10.5, -71.2);
  ctx.bezierCurveTo(-15.6, -70.4, -9.3, -63.2, -13.8, -61.6);
  ctx.bezierCurveTo(-18.6, -60.3, -15.6, -70.3, -20.8, -68.9);
  ctx.bezierCurveTo(-25.9, -67.6, -18.2, -60.8, -22.6, -58.9);
  ctx.bezierCurveTo(-27.3, -57.2, -25.8, -67.4, -30.6, -65.1);
  ctx.bezierCurveTo(-35.3, -62.9, -27.2, -57.9, -31.0, -55.0);
  ctx.bezierCurveTo(-35.2, -52.4, -35.3, -62.8, -39.8, -60.0);
  ctx.bezierCurveTo(-44.3, -57.2, -35.0, -53.0, -38.7, -49.9);
  ctx.bezierCurveTo(-42.6, -46.9, -44.1, -57.1, -48.1, -53.5);
  ctx.bezierCurveTo(-51.9, -50.0, -42.7, -47.6, -45.5, -43.7);
  ctx.bezierCurveTo(-48.8, -40.1, -51.8, -49.9, -55.4, -46.0);
  ctx.bezierCurveTo(-58.8, -41.9, -48.7, -40.7, -51.4, -36.6);
  ctx.bezierCurveTo(-54.5, -32.7, -58.7, -42.0, -61.5, -37.4);
  ctx.bezierCurveTo(-64.2, -32.9, -54.5, -33.2, -56.2, -28.7);
  ctx.bezierCurveTo(-58.4, -24.3, -64.1, -32.9, -66.4, -28.1);
  ctx.bezierCurveTo(-68.3, -23.1, -58.4, -25.0, -59.8, -20.2);
  ctx.bezierCurveTo(-61.7, -15.7, -68.4, -23.2, -69.7, -18.1);
  ctx.bezierCurveTo(-71.0, -13.0, -61.9, -16.1, -62.2, -11.3);
  ctx.bezierCurveTo(-62.9, -6.5, -70.9, -13.0, -71.7, -7.7);
  ctx.bezierCurveTo(-72.3, -2.5, -63.2, -7.0, -63.1, -2.1);
  ctx.bezierCurveTo(-63.4, 2.8, -72.2, -2.6, -72.0, 2.8);
  ctx.bezierCurveTo(-71.7, 8.0, -63.8, 2.3, -62.8, 7.1);
  ctx.bezierCurveTo(-62.1, 12.0, -71.7, 8.0, -70.9, 13.2);
  ctx.bezierCurveTo(-70.2, 18.4, -62.6, 11.6, -61.1, 16.1);
  ctx.bezierCurveTo(-59.9, 20.9, -70.1, 18.4, -68.2, 23.4);
  ctx.bezierCurveTo(-66.4, 28.4, -60.3, 20.4, -58.2, 24.9);
  ctx.bezierCurveTo(-56.1, 29.3, -66.4, 28.3, -64.1, 33.1);
  ctx.bezierCurveTo(-61.9, 37.9, -56.6, 29.1, -53.9, 33.1);
  ctx.bezierCurveTo(-51.4, 37.3, -61.8, 37.8, -58.6, 42.1);
  ctx.bezierCurveTo(-55.4, 46.4, -51.9, 37.0, -48.6, 40.6);
  ctx.bezierCurveTo(-45.2, 44.2, -55.4, 46.2, -51.9, 50.2);
  ctx.bezierCurveTo(-48.5, 54.1, -45.8, 44.3, -42.1, 47.2);
  ctx.bezierCurveTo(-38.5, 50.5, -48.3, 53.9, -44.0, 57.2);
  ctx.bezierCurveTo(-39.8, 60.3, -39.1, 50.6, -34.8, 52.9);
  ctx.bezierCurveTo(-30.6, 55.4, -40.5, 61.2, -34.8, 63.2);
  ctx.bezierCurveTo(-30.4, 64.8, -31.3, 55.5, -26.8, 57.3);
  ctx.bezierCurveTo(-22.3, 59.5, -30.7, 65.5, -25.7, 67.4);
  ctx.bezierCurveTo(-20.8, 69.2, -22.9, 59.8, -18.2, 60.7);
  ctx.bezierCurveTo(-13.4, 61.9, -20.8, 69.2, -15.6, 70.5);
  ctx.bezierCurveTo(-10.7, 71.9, -13.9, 62.2, -9.2, 62.6);
  ctx.bezierCurveTo(-4.3, 63.3, -10.6, 71.8, -5.2, 72.0);
  ctx.bezierCurveTo(0.1, 72.3, -4.9, 63.1, 0.1, 63.4);
  ctx.bezierCurveTo(-0.0, 63.4, -0.3, 63.3, -0.3, 63.3);
  ctx.bezierCurveTo(-0.1, 63.2, 0.1, 63.2, 0.4, 63.2);
  ctx.bezierCurveTo(0.4, 63.3, 0.1, 63.3, 0.1, 63.3);
  ctx.bezierCurveTo(5.0, 63.1, -0.0, 72.2, 5.3, 72.0);
  ctx.bezierCurveTo(10.5, 71.8, 4.6, 63.7, 9.3, 62.6);
  ctx.bezierCurveTo(14.1, 61.9, 10.6, 71.9, 15.7, 70.5);
  ctx.bezierCurveTo(20.9, 69.1, 13.5, 62.0, 18.3, 60.6);
  ctx.bezierCurveTo(23.1, 59.4, 20.8, 69.2, 25.8, 67.4);
  ctx.bezierCurveTo(30.7, 65.6, 22.6, 59.7, 26.9, 57.3);
  ctx.bezierCurveTo(31.2, 55.2, 30.9, 65.8, 35.3, 63.0);
  ctx.bezierCurveTo(39.9, 60.2, 30.9, 55.6, 34.9, 52.8);
  ctx.bezierCurveTo(39.1, 50.2, 39.8, 60.3, 44.1, 57.1);
  ctx.bezierCurveTo(48.3, 53.9, 38.8, 50.6, 42.2, 47.1);
  ctx.bezierCurveTo(45.8, 43.8, 48.5, 54.1, 51.9, 50.1);
  ctx.bezierCurveTo(55.5, 46.2, 45.6, 44.4, 48.6, 40.5);
  ctx.bezierCurveTo(51.8, 36.7, 55.4, 46.3, 58.6, 42.0);
  ctx.bezierCurveTo(61.8, 37.9, 51.8, 37.3, 54.0, 33.0);
  ctx.bezierCurveTo(56.5, 28.8, 61.9, 37.9, 64.1, 33.0);
  ctx.bezierCurveTo(66.5, 28.2, 56.3, 29.4, 58.2, 24.8);
  ctx.bezierCurveTo(60.0, 20.2, 66.4, 28.4, 68.2, 23.3);
  ctx.bezierCurveTo(70.1, 18.5, 60.2, 20.8, 61.1, 16.0);
  ctx.bezierCurveTo(62.3, 11.3, 70.2, 18.4, 70.9, 13.2);
  ctx.bezierCurveTo(71.7, 7.9, 62.4, 11.9, 62.8, 7.0);
  ctx.bezierCurveTo(63.5, 2.1, 71.7, 8.0, 72.0, 2.7);
  ctx.bezierCurveTo(72.2, -2.6, 63.7, 2.6, 63.1, -2.3);
  ctx.bezierCurveTo(62.9, -7.2, 72.3, -2.5, 71.7, -7.8);
  ctx.bezierCurveTo(70.9, -13.1, 63.2, -6.6, 62.1, -11.4);
  ctx.bezierCurveTo(61.6, -16.3, 71.0, -13.0, 69.7, -18.1);
  ctx.bezierCurveTo(68.4, -23.2, 61.8, -16.0, 59.8, -20.3);
  ctx.bezierCurveTo(58.1, -25.0, 68.3, -23.1, 66.4, -28.1);
  ctx.bezierCurveTo(64.0, -33.0, 58.6, -24.5, 56.2, -28.8);
  ctx.bezierCurveTo(54.2, -33.3, 64.2, -32.9, 61.5, -37.5);
  ctx.bezierCurveTo(58.8, -41.9, 54.6, -33.2, 51.4, -36.7);
  ctx.bezierCurveTo(48.4, -40.7, 58.8, -41.9, 55.4, -46.0);
  ctx.bezierCurveTo(51.8, -50.0, 49.0, -40.4, 45.5, -43.8);
  ctx.bezierCurveTo(42.3, -47.6, 52.0, -50.0, 48.0, -53.6);
  ctx.bezierCurveTo(44.2, -57.1, 42.7, -47.4, 38.6, -49.9);
  ctx.bezierCurveTo(34.6, -52.9, 44.3, -57.2, 39.8, -60.0);
  ctx.bezierCurveTo(35.2, -62.8, 35.3, -52.7, 30.9, -55.0);
  ctx.bezierCurveTo(26.8, -57.8, 35.3, -62.8, 30.5, -65.1);
  ctx.bezierCurveTo(25.8, -67.4, 27.2, -57.6, 22.5, -58.9);
  ctx.bezierCurveTo(17.9, -60.6, 25.9, -67.6, 20.7, -68.9);
  ctx.bezierCurveTo(15.5, -70.3, 18.6, -60.7, 13.7, -61.6);
  ctx.bezierCurveTo(9.0, -63.0, 15.7, -70.4, 10.4, -71.2);
  ctx.bezierCurveTo(5.3, -71.9, 9.4, -63.1, 4.6, -62.9);
  ctx.bezierCurveTo(3.3, -63.0, 2.3, -64.1, 2.3, -65.5);
  ctx.lineWidth = 1;
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-9.3, -57.5);
  ctx.bezierCurveTo(-5.3, -51.9, -3.0, -45.1, -3.0, -37.9);
  ctx.bezierCurveTo(-3.0, -18.5, -19.5, -2.8, -39.8, -2.8);
  ctx.bezierCurveTo(-46.4, -2.8, -52.5, -4.5, -57.8, -7.3);
  ctx.bezierCurveTo(-54.6, -32.9, -34.7, -53.4, -9.3, -57.5);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(9.3, 57.7);
  ctx.bezierCurveTo(5.3, 52.1, 3.0, 45.4, 3.0, 38.1);
  ctx.bezierCurveTo(3.0, 18.8, 19.5, 3.1, 39.8, 3.0);
  ctx.bezierCurveTo(46.4, 3.0, 52.5, 4.7, 57.8, 7.5);
  ctx.bezierCurveTo(54.6, 33.2, 34.7, 53.6, 9.3, 57.7);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-57.6, 9.2);
  ctx.bezierCurveTo(-52.0, 5.3, -45.3, 3.0, -38.0, 3.0);
  ctx.bezierCurveTo(-18.7, 3.0, -3.0, 19.6, -3.1, 39.9);
  ctx.bezierCurveTo(-3.1, 46.5, -4.7, 52.6, -7.6, 57.9);
  ctx.bezierCurveTo(-33.2, 54.6, -53.6, 34.6, -57.6, 9.2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(57.6, -9.0);
  ctx.bezierCurveTo(52.0, -5.1, 45.3, -2.8, 38.0, -2.8);
  ctx.bezierCurveTo(18.7, -2.8, 3.0, -19.3, 3.1, -39.7);
  ctx.bezierCurveTo(3.1, -46.2, 4.7, -52.4, 7.6, -57.7);
  ctx.bezierCurveTo(33.2, -54.4, 53.6, -34.4, 57.6, -9.0);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.0, 14.2);
  ctx.bezierCurveTo(-7.8, 14.2, -14.1, 7.9, -14.1, 0.1);
  ctx.bezierCurveTo(-14.1, -7.7, -7.8, -14.0, -0.0, -14.0);
  ctx.bezierCurveTo(7.8, -14.0, 14.1, -7.7, 14.1, 0.1);
  ctx.bezierCurveTo(14.1, 7.9, 7.8, 14.2, 0.0, 14.2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-0.0, 3.1);
  ctx.bezierCurveTo(-1.6, 3.1, -3.0, 1.8, -3.0, 0.1);
  ctx.bezierCurveTo(-3.0, -1.5, -1.6, -2.9, -0.0, -2.9);
  ctx.bezierCurveTo(1.6, -2.9, 3.0, -1.5, 3.0, 0.1);
  ctx.bezierCurveTo(3.0, 1.7, 1.6, 3.1, -0.0, 3.1);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-58.3, 0.1);
  ctx.bezierCurveTo(-58.3, -32.1, -32.2, -58.2, -0.0, -58.2);
  ctx.bezierCurveTo(32.2, -58.2, 58.3, -32.1, 58.3, 0.1);
  ctx.bezierCurveTo(58.3, 32.3, 32.2, 58.4, -0.0, 58.4);
  ctx.bezierCurveTo(-32.2, 58.4, -58.3, 32.3, -58.3, 0.1);
  ctx.closePath();
  ctx.stroke();

  ctx.translate(-x, -y);

  ctx.restore();
 }

function cog2(ctx,x,y,r,color)
// draw cog
 {//alert(x + " : " + y + " : " + r)
  //ctx.clearRect(0,0,width,height);
  ctx.save();

  //ctx.scale(0.55, 0.55);

  // Debug
  //ctx.font = "30px Arial";
  //ctx.fillText(r, 10, 50);

  ctx.translate(x, y); // change point of origin to rotate around
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  // Square
  ctx.moveTo(-58.3, -58.3);
  ctx.lineTo(58.3, -58.3);
  ctx.lineTo(58.3, 58.3);
  ctx.lineTo(-58.3, 58.3);
  ctx.lineTo(-58.3, -58.3);
  ctx.closePath();
  ctx.lineWidth = 1.1;
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-0.1, 2.4);
  ctx.bezierCurveTo(-1.5, 2.4, -2.5, 1.3, -2.5, 0.0);
  ctx.bezierCurveTo(-2.5, -1.3, -1.5, -2.4, -0.1, -2.4);
  ctx.bezierCurveTo(1.2, -2.4, 2.3, -1.3, 2.3, -0.0);
  ctx.bezierCurveTo(2.3, 1.3, 1.2, 2.4, -0.1, 2.4);
  ctx.closePath();
  ctx.stroke();

  ctx.translate(-x, -y);

  ctx.restore();
    }

// Initialize the annimation:
//alert (window.onload );
//window.onload = function () {initAll1(); initAll2();};
 if ( window.onload == null)
  window.onload = Init;     
 else
   {
    if (window.addEventListener) // W3C standard
     {
       window.addEventListener('load', Init, false); // NB **not** 'onload'
     } 
     else if (window.attachEvent) // Microsoft
     {
       window.attachEvent('onload', Init);
     }
   }