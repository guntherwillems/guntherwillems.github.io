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
var maxframes = 840; // 180 (1/4th round)* 4 * 4 (rounds)
// seconds = 1 / (drawInterval / 1000), 100 frames at 100ms interval => 10 seconds

// To calculate possible slowdown on slower devices
var secondsCheck = 3; // after how many seconds check slowdown
var maxfps = Math.ceil(1000/interval)*secondsCheck;
var lastTime = new Date();

// one visible canvas & one pre-render canvas initialization
var precanvas = null;
var ctx = null;  // pre-render canvas
var visibleCtx = null; // visible canvas

// Name array columns:
var cogx = 0;
var cogy = 1;
var angle = 2;
var anglestep = 3;

// For name columns see previous statements: cogx cogy angle anglestep
var cog = [
  [47.4+90, 47.3+4, 0, 0.6],      // cog1: -> ticking part
  [36.1+20, 36.1+15, 0, -0.6],    // cog2
  [47.4+90, 47.3+118, 0, -0.6],   // cog1:reflect-> ticking part
  [36.1+20, 36.1+128, 0, 0.6]     // cog2 reflect
];

// Get browser versions for exceptions
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var ie_version = 999;
if (navigator.appVersion.indexOf("MSIE") != -1)
  {
   ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
   if (ie_version == 7 && navigator.appVersion.indexOf("Trident") != -1)
    ie_version = 8; // compatibility mode
  }

// Function that starts the rotation
function Init() {
  //corrections();

  if (ie_version < 9) // Internet Explorer 8 and earlier versions, do not support the <canvas> element, visible if excanvas.js
  {
    var canvas = document.getElementById("canvas");
    if ( document.getElementById("canvas") != null) // still a problem if excanvas is active for canvas canvas is always != null
	// canvas != null && ie_version > 8 ||
    {
     visibleCtx = canvas.getContext("2d");
     var image = new Image();
     image.src = "/main/images/cogs/cogs.gif";
     visibleCtx.drawImage(image, 0, 0);

     if ( ie_version == 7 )
       canvas.style.marginLeft = "-230px";  // ie8 win7: //
    }
    else if ( ie_version == 7 ) // ie8 win7: == >=
    {
      canvas.style.marginLeft = "-230px";
      /*canvas.style.marginTop = "15px";*/
    }

   return;
  }

  var canvas = document.getElementById("canvas");
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
 // first draw the cogs in reflection
 if ( !rotateCog(2, "#CBCBCB"))
   return;
 if ( !rotateCog(3, "#CBCBCB"))
   return;
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
    cog[2][anglestep] = cog[2][anglestep]* percent;
    cog[3][anglestep] = cog[3][anglestep]* percent;
    //alert(diffTime + ":" + percent + ":"+interval+":"+anglestep);
  }
}

 setTimeout("rotateCogs()",interval);
 //window.requestAnimationFrame(rotateCogs); // test the new method when supported by major browsers...
}

function rotateCog(nr, cogcolor)
// rotation logic
{
 currentAngle = cog[nr][angle];

 if ( nr == 0 || nr == 2)  // Ticker part
  {
   cog1(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor);

   if (currentAngle > 7 || currentAngle < -7)
    {
     cog[nr][anglestep] = -1 * cog[nr][anglestep];  // rotate to the other side
    }

    currentAngle+=cog[nr][anglestep];
    cog[nr][angle] = currentAngle;

  }
 else  // cog2
  {
   cog2(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor);

   if (cog[0][angle] > -6 && cog[0][angle] < 6)  // cog doesn't move when ticker part is at it's ends
     {
      if (currentAngle > 360)
        currentAngle = currentAngle - 360;
      else if (currentAngle < 0)
        currentAngle = currentAngle + 360;
      cog[nr][angle] = currentAngle;
   
      currentAngle+=cog[nr][anglestep];
      cog[nr][angle] = currentAngle;
     }
   else if (cog[0][angle] <= -7 || cog[0][angle] >= 7)
   {
    currentAngle+= (-1 * cog[nr][anglestep]);
    cog[nr][angle] = currentAngle;
   }
  }
 


 return true;
}

function cog1(ctx,x,y,r,color)
// draw ticking part
 {
  ctx.save();

  ctx.translate(x, y); // change point of origin to rotate around
  //r = 0;
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  // cog1
  ctx.moveTo(2.5, -3.2);
  ctx.lineTo(-30.9, -36.6);
  ctx.bezierCurveTo(-32.6, -38.4, -35.4, -38.4, -37.2, -36.8);
  ctx.bezierCurveTo(-37.2, -36.8, -37.2, -36.8, -37.2, -36.8);
  ctx.lineTo(-42.4, -31.5);
  ctx.lineTo(-42.4, -31.5);
  ctx.lineTo(-31.9, -31.5);
  ctx.lineTo(-31.9, -31.5);
  ctx.lineTo(-3.6, -3.2);
  ctx.bezierCurveTo(-3.4, -3.0, -3.2, -2.8, -3.1, -2.6);
  ctx.bezierCurveTo(-3.7, -1.9, -4.1, -1.0, -4.1, -0.0);
  ctx.bezierCurveTo(-4.1, 1.0, -3.7, 1.9, -3.1, 2.6);
  ctx.bezierCurveTo(-3.2, 2.8, -3.4, 3.0, -3.6, 3.2);
  ctx.lineTo(-31.9, 31.5);
  ctx.lineTo(-31.9, 31.5);
  ctx.lineTo(-42.4, 31.5);
  ctx.lineTo(-42.4, 31.5);
  ctx.lineTo(-37.2, 36.8);
  ctx.bezierCurveTo(-37.2, 36.8, -37.2, 36.8, -37.2, 36.8);
  ctx.bezierCurveTo(-35.4, 38.4, -32.6, 38.4, -30.9, 36.6);
  ctx.lineTo(2.5, 3.2);
  ctx.bezierCurveTo(4.3, 1.5, 4.3, -1.5, 2.5, -3.2);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.translate(-x, -y);

  ctx.restore();
 }

function cog2(ctx,x,y,r,color)
// draw cog
 {//alert(x + " : " + y + " : " + r)
  //ctx.clearRect(0,0,width,height);
  ctx.save();

  //ctx.scale(1.5, 1.5);

  ctx.translate(x, y); // change point of origin to rotate around
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  // Cog2
  ctx.moveTo(43.6, 3.6);
  ctx.bezierCurveTo(46.1, 1.2, 48.7, 2.4, 48.8, 1.5);
  ctx.bezierCurveTo(48.9, 0.6, 41.4, 0.0, 41.4, 0.0);
  ctx.bezierCurveTo(41.4, 0.0, 41.4, 0.0, 41.4, 0.0);
  ctx.bezierCurveTo(41.4, -0.1, 41.7, -3.3, 43.3, -5.6);
  ctx.bezierCurveTo(45.3, -8.4, 48.1, -7.7, 48.0, -8.7);
  ctx.bezierCurveTo(47.9, -9.6, 40.7, -8.6, 40.5, -8.6);
  ctx.bezierCurveTo(40.5, -8.7, 40.2, -12.0, 41.2, -14.5);
  ctx.bezierCurveTo(42.6, -17.6, 45.4, -17.6, 45.2, -18.4);
  ctx.bezierCurveTo(44.9, -19.3, 38.0, -16.9, 37.8, -16.8);
  ctx.bezierCurveTo(37.8, -16.9, 36.8, -20.1, 37.3, -22.7);
  ctx.bezierCurveTo(38.0, -26.1, 40.8, -26.6, 40.3, -27.4);
  ctx.bezierCurveTo(39.9, -28.2, 33.5, -24.3, 33.5, -24.3);
  ctx.bezierCurveTo(33.5, -24.3, 31.8, -27.2, 31.8, -30.0);
  ctx.bezierCurveTo(31.7, -33.4, 34.4, -34.5, 33.8, -35.2);
  ctx.bezierCurveTo(33.1, -35.9, 27.7, -30.7, 27.7, -30.7);
  ctx.bezierCurveTo(27.7, -30.7, 25.5, -33.1, 24.9, -35.9);
  ctx.bezierCurveTo(24.1, -39.3, 26.4, -40.9, 25.7, -41.5);
  ctx.bezierCurveTo(25.0, -42.0, 20.7, -35.8, 20.7, -35.8);
  ctx.bezierCurveTo(20.7, -35.8, 18.0, -37.7, 16.9, -40.3);
  ctx.bezierCurveTo(15.4, -43.4, 17.3, -45.5, 16.5, -45.9);
  ctx.bezierCurveTo(15.7, -46.3, 12.8, -39.4, 12.8, -39.4);
  ctx.bezierCurveTo(12.8, -39.4, 9.8, -40.6, 8.1, -42.9);
  ctx.bezierCurveTo(6.0, -45.7, 7.5, -48.1, 6.6, -48.3);
  ctx.bezierCurveTo(5.7, -48.5, 4.4, -41.2, 4.4, -41.2);
  ctx.bezierCurveTo(4.4, -41.2, 1.6, -41.4, -1.0, -43.7);
  ctx.bezierCurveTo(-3.6, -45.9, -2.7, -48.7, -3.6, -48.7);
  ctx.bezierCurveTo(-4.5, -48.7, -4.3, -41.2, -4.3, -41.2);
  ctx.lineTo(-4.3, -41.2);
  ctx.bezierCurveTo(-4.3, -41.2, -7.1, -40.8, -10.1, -42.5);
  ctx.bezierCurveTo(-13.1, -44.2, -12.7, -47.0, -13.6, -46.8);
  ctx.bezierCurveTo(-14.5, -46.7, -12.8, -39.4, -12.8, -39.4);
  ctx.lineTo(-12.8, -39.4);
  ctx.bezierCurveTo(-12.8, -39.4, -15.4, -38.5, -18.7, -39.5);
  ctx.bezierCurveTo(-22.0, -40.5, -22.2, -43.4, -23.1, -43.0);
  ctx.bezierCurveTo(-23.9, -42.6, -20.7, -35.9, -20.7, -35.9);
  ctx.lineTo(-20.7, -35.9);
  ctx.bezierCurveTo(-20.7, -35.9, -23.1, -34.4, -26.5, -34.8);
  ctx.bezierCurveTo(-29.9, -35.1, -30.8, -37.8, -31.5, -37.2);
  ctx.bezierCurveTo(-32.2, -36.7, -27.7, -30.8, -27.7, -30.8);
  ctx.lineTo(-27.7, -30.8);
  ctx.bezierCurveTo(-27.7, -30.8, -29.7, -28.9, -33.1, -28.5);
  ctx.bezierCurveTo(-36.5, -28.1, -37.9, -30.6, -38.6, -29.9);
  ctx.bezierCurveTo(-39.2, -29.2, -33.5, -24.4, -33.5, -24.4);
  ctx.lineTo(-33.5, -24.4);
  ctx.bezierCurveTo(-33.5, -24.4, -35.1, -22.1, -38.3, -21.0);
  ctx.bezierCurveTo(-41.6, -19.9, -43.5, -22.0, -43.9, -21.2);
  ctx.bezierCurveTo(-44.4, -20.4, -37.8, -16.9, -37.8, -16.9);
  ctx.lineTo(-37.8, -16.9);
  ctx.bezierCurveTo(-37.8, -16.9, -38.9, -14.3, -41.9, -12.5);
  ctx.bezierCurveTo(-44.8, -10.8, -47.1, -12.5, -47.4, -11.6);
  ctx.bezierCurveTo(-47.7, -10.8, -40.5, -8.6, -40.5, -8.6);
  ctx.lineTo(-40.5, -8.6);
  ctx.bezierCurveTo(-40.5, -8.6, -41.0, -5.9, -43.6, -3.6);
  ctx.bezierCurveTo(-46.1, -1.2, -48.7, -2.4, -48.8, -1.5);
  ctx.bezierCurveTo(-48.9, -0.6, -41.4, -0.0, -41.4, -0.0);
  ctx.lineTo(-41.4, -0.0);
  ctx.bezierCurveTo(-41.4, -0.0, -41.3, 2.7, -43.3, 5.6);
  ctx.bezierCurveTo(-45.3, 8.4, -48.1, 7.7, -48.0, 8.7);
  ctx.bezierCurveTo(-47.9, 9.6, -40.5, 8.6, -40.5, 8.6);
  ctx.lineTo(-40.5, 8.6);
  ctx.bezierCurveTo(-40.5, 8.6, -39.9, 11.3, -41.2, 14.5);
  ctx.bezierCurveTo(-42.6, 17.6, -45.4, 17.6, -45.2, 18.4);
  ctx.bezierCurveTo(-44.9, 19.3, -37.8, 16.8, -37.8, 16.8);
  ctx.lineTo(-37.8, 16.8);
  ctx.bezierCurveTo(-37.8, 16.8, -36.7, 19.3, -37.3, 22.7);
  ctx.bezierCurveTo(-38.0, 26.1, -40.8, 26.6, -40.3, 27.4);
  ctx.bezierCurveTo(-39.9, 28.2, -33.5, 24.3, -33.5, 24.3);
  ctx.lineTo(-33.5, 24.3);
  ctx.bezierCurveTo(-33.5, 24.3, -31.8, 26.5, -31.8, 30.0);
  ctx.bezierCurveTo(-31.7, 33.4, -34.4, 34.5, -33.8, 35.2);
  ctx.bezierCurveTo(-33.1, 35.9, -27.7, 30.7, -27.7, 30.7);
  ctx.lineTo(-27.7, 30.7);
  ctx.bezierCurveTo(-27.7, 30.7, -25.6, 32.6, -24.9, 35.9);
  ctx.bezierCurveTo(-24.1, 39.3, -26.4, 40.9, -25.7, 41.5);
  ctx.bezierCurveTo(-25.0, 42.0, -20.7, 35.8, -20.7, 35.8);
  ctx.lineTo(-20.7, 35.8);
  ctx.bezierCurveTo(-20.7, 35.8, -18.3, 37.2, -16.9, 40.3);
  ctx.bezierCurveTo(-15.4, 43.4, -17.3, 45.5, -16.5, 45.9);
  ctx.bezierCurveTo(-15.7, 46.3, -12.8, 39.4, -12.8, 39.4);
  ctx.lineTo(-12.8, 39.3);
  ctx.bezierCurveTo(-12.8, 39.3, -10.2, 40.2, -8.1, 42.9);
  ctx.bezierCurveTo(-6.0, 45.7, -7.5, 48.1, -6.6, 48.3);
  ctx.bezierCurveTo(-5.7, 48.5, -4.4, 41.2, -4.4, 41.2);
  ctx.lineTo(-4.4, 41.2);
  ctx.bezierCurveTo(-4.4, 41.2, -1.6, 41.4, 1.0, 43.7);
  ctx.bezierCurveTo(3.6, 45.9, 2.7, 48.7, 3.6, 48.7);
  ctx.bezierCurveTo(4.5, 48.7, 4.3, 41.2, 4.3, 41.2);
  ctx.lineTo(4.3, 41.2);
  ctx.bezierCurveTo(4.3, 41.2, 7.1, 40.8, 10.1, 42.5);
  ctx.bezierCurveTo(13.1, 44.2, 12.7, 47.0, 13.6, 46.8);
  ctx.bezierCurveTo(14.5, 46.7, 12.8, 39.4, 12.8, 39.4);
  ctx.bezierCurveTo(12.8, 39.4, 15.9, 38.6, 18.7, 39.5);
  ctx.bezierCurveTo(22.0, 40.5, 22.2, 43.4, 23.1, 43.0);
  ctx.bezierCurveTo(23.9, 42.6, 20.7, 35.9, 20.7, 35.9);
  ctx.bezierCurveTo(20.7, 35.9, 23.6, 34.5, 26.5, 34.8);
  ctx.bezierCurveTo(29.9, 35.1, 30.8, 37.8, 31.5, 37.2);
  ctx.bezierCurveTo(32.2, 36.7, 27.7, 30.8, 27.7, 30.8);
  ctx.bezierCurveTo(27.7, 30.8, 30.3, 28.8, 33.1, 28.5);
  ctx.bezierCurveTo(36.5, 28.1, 37.9, 30.6, 38.6, 29.9);
  ctx.bezierCurveTo(39.2, 29.2, 33.5, 24.4, 33.5, 24.4);
  ctx.bezierCurveTo(33.5, 24.4, 35.7, 21.9, 38.3, 21.0);
  ctx.bezierCurveTo(41.6, 19.9, 43.5, 22.0, 43.9, 21.2);
  ctx.bezierCurveTo(44.4, 20.4, 38.0, 17.0, 37.8, 16.9);
  ctx.bezierCurveTo(37.9, 16.8, 39.5, 13.9, 41.9, 12.5);
  ctx.bezierCurveTo(44.8, 10.8, 47.1, 12.5, 47.4, 11.6);
  ctx.bezierCurveTo(47.7, 10.8, 40.6, 8.7, 40.5, 8.6);
  ctx.bezierCurveTo(40.5, 8.5, 41.6, 5.4, 43.6, 3.6);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(-6.0, -37.1);
  ctx.bezierCurveTo(-3.4, -33.5, -1.9, -29.1, -1.9, -24.5);
  ctx.bezierCurveTo(-1.9, -12.0, -12.5, -1.9, -25.6, -1.9);
  ctx.bezierCurveTo(-29.8, -1.9, -33.8, -2.9, -37.2, -4.8);
  ctx.bezierCurveTo(-35.1, -21.3, -22.3, -34.4, -6.0, -37.1);
  ctx.closePath();
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4.0;
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(6.0, 37.1);
  ctx.bezierCurveTo(3.5, 33.5, 2.0, 29.1, 2.0, 24.5);
  ctx.bezierCurveTo(1.9, 12.0, 12.6, 1.9, 25.7, 1.9);
  ctx.bezierCurveTo(29.9, 1.9, 33.8, 2.9, 37.3, 4.8);
  ctx.bezierCurveTo(35.2, 21.3, 22.4, 34.5, 6.0, 37.1);
  ctx.closePath();
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(-37.1, 5.9);
  ctx.bezierCurveTo(-33.5, 3.3, -29.1, 1.8, -24.5, 1.9);
  ctx.bezierCurveTo(-12.0, 1.9, -1.9, 12.5, -2.0, 25.6);
  ctx.bezierCurveTo(-2.0, 29.8, -3.0, 33.8, -4.9, 37.2);
  ctx.bezierCurveTo(-21.4, 35.1, -34.5, 22.2, -37.1, 5.9);
  ctx.closePath();
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(37.1, -5.9);
  ctx.bezierCurveTo(33.5, -3.3, 29.2, -1.8, 24.5, -1.9);
  ctx.bezierCurveTo(12.0, -1.9, 2.0, -12.5, 2.0, -25.6);
  ctx.bezierCurveTo(2.0, -29.8, 3.1, -33.8, 4.9, -37.2);
  ctx.bezierCurveTo(21.4, -35.1, 34.5, -22.2, 37.1, -5.9);
  ctx.closePath();
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(0.0, 9.1);
  ctx.bezierCurveTo(-5.0, 9.1, -9.1, 5.0, -9.1, 0.0);
  ctx.bezierCurveTo(-9.1, -5.0, -5.0, -9.1, 0.0, -9.1);
  ctx.bezierCurveTo(5.0, -9.1, 9.1, -5.0, 9.1, -0.0);
  ctx.bezierCurveTo(9.1, 5.0, 5.0, 9.1, 0.0, 9.1);
  ctx.closePath();
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(0.0, 1.9);
  ctx.bezierCurveTo(-1.0, 1.9, -1.9, 1.1, -1.9, 0.0);
  ctx.bezierCurveTo(-1.9, -1.1, -1.0, -1.9, 0.0, -1.9);
  ctx.bezierCurveTo(1.1, -1.9, 1.9, -1.1, 1.9, -0.0);
  ctx.bezierCurveTo(1.9, 1.1, 1.1, 1.9, 0.0, 1.9);
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