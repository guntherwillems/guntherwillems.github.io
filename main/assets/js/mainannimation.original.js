//
//  Pre-rendering canvas with device speed detection v1.00
//  By Gunther Willems - https://guntherwillems.com
//  Project started: 24/12/2012
//  Last Modification: 04/01/2012
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

var cog = [
  [47.4+63, 47.3, 0, 1.7],
  [36.1, 36.1+39, 0, -2.1],
  [47.4+63, 47.3+122, 0, -1.7],
  [36.1, 36.1+108, 0, 2.1]
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

/*function corrections()
{
 if ( (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6)
   || (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Version') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 5)
   || (navigator.userAgent.toLowerCase().indexOf('chrome') != -1 ) // && (navigator.appVersion.indexOf("Mac")!=-1)
   || (ie_version >= 9 && ie_version < 999 )
  )
 {
  //document.getElementsByTagName('article')[0].style.wordSpacing = "-0.1em";
  //alert( document.getElementsByTagName('article')[0].style.font ); // not working
  articles = document.getElementsByTagName('article');
  for (var i = 0; i < articles.length; i++)
  {
    articles[i].style.wordSpacing = "-0.07em";
  }
 }
}*/

function rotateCogs()
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
{
 currentAngle = cog[nr][angle];

 if ( nr == 0 || nr == 2)
   cog1(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor);
 else
  cog2(ctx, cog[nr][cogx], cog[nr][cogy], currentAngle, cogcolor); 

 currentAngle+=cog[nr][anglestep];

 if (currentAngle > 360)
   currentAngle = currentAngle - 360;
 else if (currentAngle < 0)
   currentAngle = currentAngle + 360;
 cog[nr][angle] = currentAngle;

 return true;
}

function cog1(ctx,x,y,r,color)
 {
  ctx.save();

  ctx.translate(x, y); // change point of origin to rotate around
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  ctx.moveTo(31.4, -29.5);
  ctx.lineTo(33.3, -31.3);
  ctx.bezierCurveTo(34.0, -31.9, 34.0, -32.9, 33.3, -33.6);
  ctx.bezierCurveTo(32.6, -34.3, 31.6, -34.3, 31.0, -33.6);
  ctx.lineTo(29.2, -31.7);
  ctx.bezierCurveTo(28.6, -31.1, 27.6, -31.0, 27.0, -31.5);
  ctx.bezierCurveTo(27.0, -31.6, 26.9, -31.6, 26.9, -31.6);
  ctx.bezierCurveTo(26.4, -32.2, 26.3, -33.1, 26.8, -33.8);
  ctx.lineTo(28.5, -35.8);
  ctx.bezierCurveTo(29.0, -36.5, 28.8, -37.5, 28.1, -38.1);
  ctx.bezierCurveTo(27.3, -38.6, 26.3, -38.5, 25.8, -37.8);
  ctx.lineTo(24.3, -35.6);
  ctx.bezierCurveTo(23.8, -34.9, 22.9, -34.8, 22.1, -35.1);
  ctx.lineTo(22.3, -35.0);
  ctx.bezierCurveTo(22.2, -35.1, 22.1, -35.1, 22.1, -35.1);
  ctx.lineTo(22.1, -35.1);
  ctx.bezierCurveTo(21.4, -35.6, 21.2, -36.5, 21.6, -37.3);
  ctx.lineTo(22.9, -39.5);
  ctx.bezierCurveTo(23.4, -40.3, 23.1, -41.3, 22.2, -41.8);
  ctx.bezierCurveTo(21.4, -42.3, 20.4, -41.9, 20.0, -41.1);
  ctx.lineTo(18.8, -38.8);
  ctx.bezierCurveTo(18.4, -38.0, 17.5, -37.6, 16.8, -38.0);
  ctx.lineTo(16.8, -37.9);
  ctx.bezierCurveTo(16.8, -38.0, 16.7, -38.0, 16.7, -38.0);
  ctx.bezierCurveTo(16.0, -38.4, 15.7, -39.3, 16.0, -40.1);
  ctx.lineTo(16.9, -42.5);
  ctx.bezierCurveTo(17.3, -43.3, 16.8, -44.2, 15.9, -44.5);
  ctx.bezierCurveTo(15.0, -44.9, 14.1, -44.4, 13.8, -43.6);
  ctx.lineTo(13.0, -41.1);
  ctx.bezierCurveTo(12.7, -40.2, 11.9, -39.9, 11.1, -40.0);
  ctx.lineTo(11.4, -39.9);
  ctx.bezierCurveTo(11.2, -39.9, 11.0, -40.0, 10.8, -40.0);
  ctx.lineTo(11.1, -40.0);
  ctx.bezierCurveTo(10.3, -40.2, 9.8, -41.0, 10.0, -41.9);
  ctx.lineTo(10.6, -44.4);
  ctx.bezierCurveTo(10.8, -45.3, 10.2, -46.2, 9.3, -46.4);
  ctx.bezierCurveTo(8.3, -46.6, 7.4, -46.0, 7.3, -45.1);
  ctx.lineTo(6.9, -42.5);
  ctx.bezierCurveTo(6.7, -41.7, 5.9, -41.0, 5.1, -41.2);
  ctx.lineTo(5.3, -41.1);
  ctx.bezierCurveTo(5.2, -41.1, 5.2, -41.1, 5.1, -41.1);
  ctx.bezierCurveTo(4.3, -41.3, 3.7, -42.1, 3.8, -42.9);
  ctx.lineTo(4.0, -45.5);
  ctx.bezierCurveTo(4.1, -46.4, 3.4, -47.2, 2.4, -47.2);
  ctx.bezierCurveTo(1.4, -47.3, 0.7, -46.6, 0.7, -45.7);
  ctx.lineTo(0.6, -43.1);
  ctx.bezierCurveTo(0.6, -42.2, -0.1, -41.6, -0.9, -41.5);
  ctx.lineTo(-0.6, -41.5);
  ctx.bezierCurveTo(-0.8, -41.5, -1.0, -41.4, -1.1, -41.4);
  ctx.lineTo(-0.9, -41.5);
  ctx.bezierCurveTo(-1.8, -41.4, -2.5, -42.1, -2.5, -43.0);
  ctx.lineTo(-2.7, -45.6);
  ctx.bezierCurveTo(-2.7, -46.5, -3.5, -47.1, -4.5, -47.1);
  ctx.bezierCurveTo(-5.4, -47.0, -6.1, -46.1, -6.0, -45.3);
  ctx.lineTo(-5.7, -42.7);
  ctx.bezierCurveTo(-5.6, -41.8, -6.1, -41.0, -7.0, -40.9);
  ctx.lineTo(-6.7, -40.9);
  ctx.bezierCurveTo(-6.8, -40.9, -6.9, -40.9, -7.0, -40.9);
  ctx.lineTo(-7.0, -40.9);
  ctx.bezierCurveTo(-7.8, -40.8, -8.6, -41.3, -8.8, -42.2);
  ctx.lineTo(-9.3, -44.7);
  ctx.bezierCurveTo(-9.5, -45.6, -10.4, -46.1, -11.3, -45.9);
  ctx.bezierCurveTo(-12.2, -45.7, -12.8, -44.8, -12.5, -43.9);
  ctx.lineTo(-11.8, -41.4);
  ctx.bezierCurveTo(-11.6, -40.6, -12.1, -39.7, -12.8, -39.4);
  ctx.lineTo(-12.6, -39.5);
  ctx.bezierCurveTo(-12.7, -39.5, -12.8, -39.4, -12.9, -39.4);
  ctx.lineTo(-12.8, -39.4);
  ctx.bezierCurveTo(-13.6, -39.1, -14.5, -39.6, -14.8, -40.4);
  ctx.lineTo(-15.7, -42.9);
  ctx.bezierCurveTo(-16.0, -43.7, -17.0, -44.1, -17.9, -43.8);
  ctx.bezierCurveTo(-18.8, -43.4, -19.2, -42.4, -18.8, -41.6);
  ctx.lineTo(-17.7, -39.2);
  ctx.bezierCurveTo(-17.4, -38.4, -17.7, -37.5, -18.4, -37.1);
  ctx.lineTo(-18.3, -37.2);
  ctx.bezierCurveTo(-18.4, -37.2, -18.4, -37.1, -18.5, -37.1);
  ctx.bezierCurveTo(-19.2, -36.8, -20.1, -37.1, -20.5, -37.9);
  ctx.lineTo(-21.8, -40.2);
  ctx.bezierCurveTo(-22.2, -40.9, -23.2, -41.2, -24.0, -40.7);
  ctx.bezierCurveTo(-24.9, -40.2, -25.1, -39.2, -24.7, -38.5);
  ctx.lineTo(-23.2, -36.3);
  ctx.bezierCurveTo(-22.8, -35.5, -23.0, -34.6, -23.6, -34.1);
  ctx.lineTo(-23.5, -34.1);
  ctx.bezierCurveTo(-23.6, -34.1, -23.6, -34.1, -23.7, -34.0);
  ctx.bezierCurveTo(-24.3, -33.6, -25.3, -33.7, -25.8, -34.4);
  ctx.lineTo(-27.4, -36.5);
  ctx.bezierCurveTo(-27.9, -37.2, -29.0, -37.3, -29.7, -36.8);
  ctx.bezierCurveTo(-30.5, -36.2, -30.5, -35.1, -30.0, -34.4);
  ctx.lineTo(-28.3, -32.5);
  ctx.bezierCurveTo(-27.7, -31.8, -27.7, -30.9, -28.2, -30.3);
  ctx.bezierCurveTo(-28.3, -30.3, -28.4, -30.2, -28.5, -30.1);
  ctx.bezierCurveTo(-29.1, -29.7, -30.0, -29.8, -30.6, -30.3);
  ctx.lineTo(-32.4, -32.2);
  ctx.bezierCurveTo(-33.1, -32.8, -34.1, -32.7, -34.7, -32.0);
  ctx.bezierCurveTo(-35.4, -31.3, -35.3, -30.3, -34.7, -29.7);
  ctx.lineTo(-32.7, -28.0);
  ctx.bezierCurveTo(-32.0, -27.4, -32.0, -26.5, -32.5, -25.8);
  ctx.lineTo(-32.3, -26.0);
  ctx.bezierCurveTo(-32.4, -25.9, -32.5, -25.8, -32.5, -25.7);
  ctx.lineTo(-32.4, -25.8);
  ctx.bezierCurveTo(-32.9, -25.1, -33.9, -25.0, -34.6, -25.5);
  ctx.lineTo(-36.7, -27.1);
  ctx.bezierCurveTo(-37.4, -27.6, -38.5, -27.4, -39.0, -26.6);
  ctx.bezierCurveTo(-39.6, -25.9, -39.4, -24.8, -38.6, -24.3);
  ctx.lineTo(-36.4, -22.9);
  ctx.bezierCurveTo(-35.7, -22.5, -35.5, -21.6, -35.8, -20.9);
  ctx.bezierCurveTo(-35.8, -20.8, -35.9, -20.7, -36.0, -20.6);
  ctx.bezierCurveTo(-36.4, -20.0, -37.3, -19.9, -38.0, -20.2);
  ctx.lineTo(-40.3, -21.5);
  ctx.bezierCurveTo(-41.1, -21.9, -42.1, -21.5, -42.5, -20.7);
  ctx.bezierCurveTo(-42.9, -19.8, -42.6, -18.8, -41.7, -18.4);
  ctx.lineTo(-39.4, -17.4);
  ctx.bezierCurveTo(-38.6, -17.0, -38.2, -16.1, -38.5, -15.4);
  ctx.lineTo(-38.3, -15.9);
  ctx.bezierCurveTo(-38.4, -15.6, -38.5, -15.3, -38.6, -14.9);
  ctx.lineTo(-38.5, -15.4);
  ctx.bezierCurveTo(-38.8, -14.6, -39.7, -14.2, -40.5, -14.5);
  ctx.lineTo(-43.0, -15.3);
  ctx.bezierCurveTo(-43.8, -15.6, -44.7, -15.2, -45.0, -14.3);
  ctx.bezierCurveTo(-45.4, -13.3, -44.9, -12.4, -44.0, -12.2);
  ctx.lineTo(-41.5, -11.5);
  ctx.bezierCurveTo(-40.6, -11.2, -40.1, -10.4, -40.3, -9.6);
  ctx.bezierCurveTo(-40.3, -9.5, -40.3, -9.5, -40.3, -9.5);
  ctx.bezierCurveTo(-40.6, -8.7, -41.4, -8.3, -42.2, -8.4);
  ctx.lineTo(-44.8, -8.9);
  ctx.bezierCurveTo(-45.7, -9.1, -46.5, -8.5, -46.6, -7.5);
  ctx.bezierCurveTo(-46.8, -6.6, -46.2, -5.7, -45.3, -5.6);
  ctx.lineTo(-42.7, -5.3);
  ctx.bezierCurveTo(-41.8, -5.2, -41.2, -4.4, -41.3, -3.6);
  ctx.lineTo(-41.2, -4.3);
  ctx.bezierCurveTo(-41.2, -3.9, -41.3, -3.5, -41.3, -3.1);
  ctx.lineTo(-41.3, -3.6);
  ctx.bezierCurveTo(-41.3, -2.8, -42.1, -2.1, -42.9, -2.2);
  ctx.lineTo(-45.5, -2.3);
  ctx.bezierCurveTo(-46.4, -2.4, -47.2, -1.6, -47.2, -0.7);
  ctx.bezierCurveTo(-47.3, 0.3, -46.5, 1.1, -45.6, 1.0);
  ctx.lineTo(-43.0, 1.0);
  ctx.bezierCurveTo(-42.1, 1.0, -41.4, 1.6, -41.3, 2.5);
  ctx.lineTo(-41.3, 2.4);
  ctx.bezierCurveTo(-41.3, 2.4, -41.3, 2.5, -41.3, 2.5);
  ctx.bezierCurveTo(-41.3, 3.3, -42.0, 4.0, -42.8, 4.1);
  ctx.lineTo(-45.4, 4.4);
  ctx.bezierCurveTo(-46.3, 4.4, -46.9, 5.3, -46.8, 6.2);
  ctx.bezierCurveTo(-46.7, 7.2, -45.8, 7.8, -45.0, 7.7);
  ctx.lineTo(-42.4, 7.2);
  ctx.bezierCurveTo(-41.5, 7.1, -40.8, 7.6, -40.6, 8.5);
  ctx.lineTo(-40.6, 8.0);
  ctx.bezierCurveTo(-40.6, 8.3, -40.5, 8.5, -40.4, 8.8);
  ctx.lineTo(-40.5, 8.5);
  ctx.bezierCurveTo(-40.3, 9.3, -40.9, 10.1, -41.7, 10.3);
  ctx.lineTo(-44.3, 10.9);
  ctx.bezierCurveTo(-45.1, 11.1, -45.6, 12.0, -45.4, 13.0);
  ctx.bezierCurveTo(-45.2, 13.9, -44.2, 14.4, -43.4, 14.1);
  ctx.lineTo(-40.9, 13.3);
  ctx.bezierCurveTo(-40.1, 13.1, -39.1, 13.5, -38.9, 14.3);
  ctx.lineTo(-38.9, 14.2);
  ctx.bezierCurveTo(-38.9, 14.3, -38.8, 14.3, -38.8, 14.4);
  ctx.bezierCurveTo(-38.6, 15.1, -39.1, 16.0, -39.8, 16.3);
  ctx.lineTo(-42.3, 17.3);
  ctx.bezierCurveTo(-43.1, 17.6, -43.4, 18.6, -43.0, 19.4);
  ctx.bezierCurveTo(-42.6, 20.3, -41.6, 20.7, -40.8, 20.3);
  ctx.lineTo(-38.5, 19.1);
  ctx.bezierCurveTo(-37.7, 18.8, -36.8, 19.1, -36.4, 19.8);
  ctx.lineTo(-36.5, 19.5);
  ctx.bezierCurveTo(-36.4, 19.7, -36.4, 19.8, -36.3, 19.9);
  ctx.lineTo(-36.4, 19.8);
  ctx.bezierCurveTo(-36.0, 20.5, -36.2, 21.4, -37.0, 21.9);
  ctx.lineTo(-39.2, 23.2);
  ctx.bezierCurveTo(-40.0, 23.7, -40.2, 24.7, -39.7, 25.5);
  ctx.bezierCurveTo(-39.3, 26.4, -38.2, 26.5, -37.5, 26.0);
  ctx.lineTo(-35.3, 24.6);
  ctx.bezierCurveTo(-34.6, 24.1, -33.7, 24.2, -33.2, 24.7);
  ctx.bezierCurveTo(-33.1, 24.8, -33.0, 24.9, -33.0, 25.0);
  ctx.bezierCurveTo(-32.6, 25.7, -32.8, 26.6, -33.4, 27.1);
  ctx.lineTo(-35.5, 28.7);
  ctx.bezierCurveTo(-36.2, 29.3, -36.2, 30.3, -35.6, 31.0);
  ctx.bezierCurveTo(-34.9, 31.7, -33.9, 31.8, -33.2, 31.2);
  ctx.lineTo(-31.3, 29.4);
  ctx.bezierCurveTo(-30.7, 28.8, -29.7, 28.8, -29.1, 29.5);
  ctx.lineTo(-29.5, 29.0);
  ctx.bezierCurveTo(-29.4, 29.2, -29.3, 29.3, -29.1, 29.4);
  ctx.bezierCurveTo(-29.1, 29.5, -29.0, 29.6, -28.9, 29.6);
  ctx.lineTo(-29.1, 29.4);
  ctx.bezierCurveTo(-28.5, 30.0, -28.5, 31.0, -29.1, 31.6);
  ctx.lineTo(-30.9, 33.5);
  ctx.bezierCurveTo(-31.5, 34.2, -31.4, 35.2, -30.7, 35.9);
  ctx.bezierCurveTo(-30.0, 36.5, -28.9, 36.5, -28.4, 35.7);
  ctx.lineTo(-26.7, 33.7);
  ctx.bezierCurveTo(-26.2, 33.1, -25.3, 32.9, -24.6, 33.3);
  ctx.bezierCurveTo(-24.5, 33.4, -24.4, 33.5, -24.3, 33.6);
  ctx.bezierCurveTo(-23.8, 34.1, -23.7, 34.9, -24.2, 35.6);
  ctx.lineTo(-25.7, 37.7);
  ctx.bezierCurveTo(-26.1, 38.4, -26.0, 39.5, -25.1, 40.0);
  ctx.bezierCurveTo(-24.3, 40.5, -23.3, 40.2, -22.8, 39.5);
  ctx.lineTo(-21.5, 37.2);
  ctx.bezierCurveTo(-21.1, 36.5, -20.1, 36.2, -19.4, 36.6);
  ctx.lineTo(-19.7, 36.4);
  ctx.bezierCurveTo(-19.6, 36.5, -19.4, 36.6, -19.3, 36.6);
  ctx.lineTo(-19.4, 36.6);
  ctx.bezierCurveTo(-18.7, 37.0, -18.3, 37.9, -18.7, 38.7);
  ctx.lineTo(-19.9, 41.0);
  ctx.bezierCurveTo(-20.3, 41.8, -19.9, 42.8, -19.0, 43.2);
  ctx.bezierCurveTo(-18.1, 43.6, -17.2, 43.3, -16.8, 42.4);
  ctx.lineTo(-15.9, 40.0);
  ctx.bezierCurveTo(-15.5, 39.2, -14.6, 38.7, -13.9, 39.0);
  ctx.lineTo(-13.9, 39.0);
  ctx.bezierCurveTo(-13.8, 39.0, -13.8, 39.0, -13.7, 39.1);
  ctx.bezierCurveTo(-13.0, 39.4, -12.7, 40.2, -12.9, 41.0);
  ctx.lineTo(-13.7, 43.5);
  ctx.bezierCurveTo(-14.0, 44.3, -13.5, 45.3, -12.5, 45.5);
  ctx.bezierCurveTo(-11.6, 45.8, -10.7, 45.2, -10.5, 44.4);
  ctx.lineTo(-9.9, 41.8);
  ctx.bezierCurveTo(-9.7, 41.0, -8.8, 40.4, -8.0, 40.6);
  ctx.lineTo(-8.6, 40.5);
  ctx.bezierCurveTo(-8.3, 40.5, -8.0, 40.6, -7.8, 40.7);
  ctx.lineTo(-8.0, 40.6);
  ctx.bezierCurveTo(-7.2, 40.8, -6.6, 41.6, -6.8, 42.5);
  ctx.lineTo(-7.2, 45.0);
  ctx.bezierCurveTo(-7.3, 45.9, -6.7, 46.7, -5.7, 46.9);
  ctx.bezierCurveTo(-4.8, 47.0, -4.0, 46.4, -3.9, 45.5);
  ctx.lineTo(-3.7, 42.9);
  ctx.bezierCurveTo(-3.6, 42.0, -2.8, 41.3, -2.0, 41.3);
  ctx.lineTo(-2.1, 41.3);
  ctx.bezierCurveTo(-2.1, 41.3, -2.0, 41.3, -1.9, 41.3);
  ctx.bezierCurveTo(-1.1, 41.4, -0.5, 42.2, -0.5, 43.0);
  ctx.lineTo(-0.6, 45.6);
  ctx.bezierCurveTo(-0.6, 46.5, 0.2, 47.3, 1.1, 47.2);
  ctx.bezierCurveTo(2.1, 47.2, 2.8, 46.4, 2.8, 45.5);
  ctx.lineTo(2.6, 42.9);
  ctx.bezierCurveTo(2.6, 42.0, 3.2, 41.3, 4.1, 41.2);
  ctx.lineTo(3.3, 41.3);
  ctx.bezierCurveTo(3.7, 41.2, 4.1, 41.2, 4.5, 41.2);
  ctx.lineTo(4.1, 41.2);
  ctx.bezierCurveTo(4.9, 41.1, 5.6, 41.7, 5.8, 42.6);
  ctx.lineTo(6.1, 45.2);
  ctx.bezierCurveTo(6.2, 46.1, 7.1, 46.7, 8.0, 46.5);
  ctx.bezierCurveTo(9.0, 46.4, 9.6, 45.6, 9.4, 44.7);
  ctx.lineTo(8.9, 42.1);
  ctx.bezierCurveTo(8.7, 41.3, 9.2, 40.4, 10.0, 40.2);
  ctx.bezierCurveTo(10.1, 40.2, 10.1, 40.2, 10.2, 40.2);
  ctx.bezierCurveTo(10.9, 40.1, 11.7, 40.6, 11.9, 41.4);
  ctx.lineTo(12.6, 43.9);
  ctx.bezierCurveTo(12.9, 44.7, 13.8, 45.2, 14.7, 44.9);
  ctx.bezierCurveTo(15.6, 44.6, 16.1, 43.6, 15.8, 42.8);
  ctx.lineTo(14.9, 40.4);
  ctx.bezierCurveTo(14.6, 39.5, 15.0, 38.6, 15.8, 38.4);
  ctx.lineTo(15.1, 38.6);
  ctx.bezierCurveTo(15.5, 38.4, 15.8, 38.3, 16.1, 38.2);
  ctx.lineTo(15.8, 38.3);
  ctx.bezierCurveTo(16.5, 38.0, 17.4, 38.4, 17.8, 39.2);
  ctx.lineTo(18.9, 41.5);
  ctx.bezierCurveTo(19.2, 42.4, 20.2, 42.7, 21.1, 42.3);
  ctx.bezierCurveTo(22.0, 41.9, 22.3, 40.9, 21.9, 40.1);
  ctx.lineTo(20.6, 37.8);
  ctx.bezierCurveTo(20.2, 37.1, 20.5, 36.1, 21.1, 35.7);
  ctx.bezierCurveTo(21.2, 35.6, 21.3, 35.6, 21.4, 35.5);
  ctx.bezierCurveTo(22.1, 35.2, 22.9, 35.5, 23.3, 36.2);
  ctx.lineTo(24.7, 38.4);
  ctx.bezierCurveTo(25.2, 39.1, 26.3, 39.4, 27.0, 38.8);
  ctx.bezierCurveTo(27.8, 38.2, 28.0, 37.2, 27.5, 36.5);
  ctx.lineTo(25.9, 34.4);
  ctx.bezierCurveTo(25.4, 33.7, 25.5, 32.7, 26.2, 32.2);
  ctx.lineTo(25.9, 32.4);
  ctx.bezierCurveTo(26.0, 32.3, 26.1, 32.2, 26.2, 32.1);
  ctx.lineTo(26.2, 32.2);
  ctx.bezierCurveTo(26.8, 31.7, 27.8, 31.7, 28.4, 32.4);
  ctx.lineTo(30.1, 34.4);
  ctx.bezierCurveTo(30.6, 35.0, 31.7, 35.0, 32.4, 34.4);
  ctx.bezierCurveTo(33.1, 33.8, 33.2, 32.7, 32.5, 32.1);
  ctx.lineTo(30.7, 30.3);
  ctx.bezierCurveTo(30.1, 29.7, 30.0, 28.7, 30.5, 28.1);
  ctx.bezierCurveTo(30.6, 28.0, 30.7, 27.9, 30.8, 27.8);
  ctx.bezierCurveTo(31.3, 27.4, 32.2, 27.4, 32.8, 27.9);
  ctx.lineTo(34.8, 29.6);
  ctx.bezierCurveTo(35.4, 30.2, 36.5, 30.1, 37.1, 29.4);
  ctx.bezierCurveTo(37.7, 28.6, 37.5, 27.5, 36.8, 27.0);
  ctx.lineTo(34.7, 25.5);
  ctx.bezierCurveTo(34.0, 24.9, 33.8, 24.0, 34.3, 23.3);
  ctx.lineTo(34.2, 23.4);
  ctx.bezierCurveTo(34.3, 23.4, 34.3, 23.3, 34.3, 23.3);
  ctx.bezierCurveTo(34.9, 22.6, 35.8, 22.4, 36.5, 22.9);
  ctx.lineTo(38.7, 24.3);
  ctx.bezierCurveTo(39.5, 24.7, 40.5, 24.5, 41.0, 23.6);
  ctx.bezierCurveTo(41.4, 22.8, 41.2, 21.8, 40.4, 21.4);
  ctx.lineTo(38.1, 20.2);
  ctx.bezierCurveTo(37.4, 19.7, 37.0, 18.8, 37.4, 18.0);
  ctx.lineTo(37.3, 18.2);
  ctx.bezierCurveTo(37.3, 18.1, 37.4, 18.0, 37.4, 18.0);
  ctx.bezierCurveTo(37.8, 17.3, 38.7, 17.0, 39.5, 17.3);
  ctx.lineTo(41.8, 18.4);
  ctx.bezierCurveTo(42.6, 18.7, 43.6, 18.3, 44.0, 17.4);
  ctx.bezierCurveTo(44.3, 16.5, 43.9, 15.6, 43.1, 15.3);
  ctx.lineTo(40.6, 14.4);
  ctx.bezierCurveTo(39.8, 14.1, 39.3, 13.2, 39.6, 12.4);
  ctx.lineTo(39.5, 12.7);
  ctx.bezierCurveTo(39.5, 12.6, 39.6, 12.5, 39.6, 12.4);
  ctx.lineTo(39.6, 12.4);
  ctx.bezierCurveTo(39.9, 11.6, 40.7, 11.2, 41.6, 11.4);
  ctx.lineTo(44.1, 12.1);
  ctx.bezierCurveTo(44.9, 12.3, 45.8, 11.8, 46.0, 10.8);
  ctx.bezierCurveTo(46.3, 9.9, 45.7, 9.0, 44.9, 8.9);
  ctx.lineTo(42.3, 8.3);
  ctx.bezierCurveTo(41.5, 8.2, 40.9, 7.4, 41.0, 6.5);
  ctx.lineTo(40.9, 6.8);
  ctx.bezierCurveTo(40.9, 6.7, 41.0, 6.6, 41.0, 6.5);
  ctx.lineTo(41.0, 6.5);
  ctx.bezierCurveTo(41.1, 5.7, 41.9, 5.1, 42.8, 5.2);
  ctx.lineTo(45.4, 5.6);
  ctx.bezierCurveTo(46.2, 5.7, 47.1, 5.0, 47.2, 4.0);
  ctx.bezierCurveTo(47.2, 3.1, 46.5, 2.3, 45.7, 2.2);
  ctx.lineTo(43.1, 2.1);
  ctx.bezierCurveTo(42.2, 2.1, 41.5, 1.3, 41.5, 0.5);
  ctx.lineTo(41.5, 0.9);
  ctx.bezierCurveTo(41.5, 0.7, 41.5, 0.5, 41.5, 0.3);
  ctx.lineTo(41.5, 0.5);
  ctx.bezierCurveTo(41.6, -0.3, 42.2, -1.0, 43.1, -1.0);
  ctx.lineTo(45.7, -1.1);
  ctx.bezierCurveTo(46.6, -1.1, 47.3, -1.9, 47.2, -2.9);
  ctx.bezierCurveTo(47.2, -3.8, 46.4, -4.5, 45.5, -4.4);
  ctx.lineTo(42.9, -4.2);
  ctx.bezierCurveTo(42.1, -4.1, 41.3, -4.7, 41.1, -5.5);
  ctx.lineTo(41.2, -5.3);
  ctx.bezierCurveTo(41.1, -5.4, 41.1, -5.5, 41.1, -5.5);
  ctx.bezierCurveTo(41.0, -6.4, 41.6, -7.1, 42.5, -7.3);
  ctx.lineTo(45.1, -7.7);
  ctx.bezierCurveTo(45.9, -7.9, 46.6, -8.8, 46.4, -9.7);
  ctx.bezierCurveTo(46.1, -10.6, 45.2, -11.2, 44.4, -11.0);
  ctx.lineTo(41.8, -10.4);
  ctx.bezierCurveTo(41.0, -10.2, 40.1, -10.7, 39.9, -11.5);
  ctx.lineTo(40.0, -11.0);
  ctx.bezierCurveTo(40.0, -11.2, 39.9, -11.4, 39.9, -11.6);
  ctx.lineTo(39.9, -11.5);
  ctx.bezierCurveTo(39.7, -12.3, 40.1, -13.1, 41.0, -13.4);
  ctx.lineTo(43.5, -14.2);
  ctx.bezierCurveTo(44.3, -14.5, 44.7, -15.4, 44.4, -16.3);
  ctx.bezierCurveTo(44.1, -17.2, 43.2, -17.7, 42.4, -17.3);
  ctx.lineTo(39.9, -16.4);
  ctx.bezierCurveTo(39.1, -16.0, 38.2, -16.4, 37.8, -17.1);
  ctx.lineTo(37.8, -17.1);
  ctx.bezierCurveTo(37.8, -17.2, 37.8, -17.2, 37.8, -17.3);
  ctx.bezierCurveTo(37.5, -18.0, 37.9, -18.8, 38.6, -19.2);
  ctx.lineTo(40.9, -20.4);
  ctx.bezierCurveTo(41.7, -20.7, 42.1, -21.8, 41.6, -22.6);
  ctx.bezierCurveTo(41.1, -23.4, 40.1, -23.7, 39.3, -23.3);
  ctx.lineTo(37.1, -22.0);
  ctx.bezierCurveTo(36.3, -21.5, 35.4, -21.7, 34.9, -22.5);
  ctx.lineTo(35.1, -22.2);
  ctx.bezierCurveTo(35.0, -22.3, 35.0, -22.4, 34.9, -22.5);
  ctx.lineTo(34.9, -22.4);
  ctx.bezierCurveTo(34.5, -23.2, 34.7, -24.1, 35.4, -24.6);
  ctx.lineTo(37.5, -26.1);
  ctx.bezierCurveTo(38.3, -26.6, 38.4, -27.6, 37.8, -28.4);
  ctx.bezierCurveTo(37.3, -29.2, 36.2, -29.3, 35.6, -28.8);
  ctx.lineTo(33.5, -27.1);
  ctx.bezierCurveTo(32.9, -26.6, 31.9, -26.7, 31.3, -27.3);
  ctx.bezierCurveTo(31.2, -27.3, 31.2, -27.4, 31.2, -27.4);
  ctx.bezierCurveTo(30.7, -28.1, 30.8, -28.9, 31.4, -29.5);
  ctx.closePath();

  ctx.moveTo(-7.8, -5.0);
  ctx.bezierCurveTo(-9.7, -2.0, -9.7, 2.0, -7.7, 5.0);
  ctx.lineTo(-28.2, 25.7);
  ctx.bezierCurveTo(-41.4, 11.3, -41.5, -10.9, -28.4, -25.5);
  ctx.lineTo(-7.8, -5.0);
  ctx.closePath();

  ctx.moveTo(-4.9, 7.8);
  ctx.bezierCurveTo(-1.9, 9.7, 2.1, 9.7, 5.1, 7.7);
  ctx.lineTo(25.8, 28.2);
  ctx.bezierCurveTo(11.4, 41.4, -10.8, 41.5, -25.4, 28.4);
  ctx.lineTo(-4.9, 7.8);
  ctx.closePath();

  ctx.moveTo(7.9, 4.9);
  ctx.bezierCurveTo(9.8, 1.9, 9.8, -2.1, 7.8, -5.1);
  ctx.lineTo(28.3, -25.8);
  ctx.bezierCurveTo(41.5, -11.4, 41.6, 10.8, 28.5, 25.4);
  ctx.lineTo(7.9, 4.9);
  ctx.closePath();

  ctx.moveTo(5.0, -7.8);
  ctx.bezierCurveTo(2.0, -9.8, -2.0, -9.8, -5.0, -7.8);
  ctx.lineTo(-25.7, -28.2);
  ctx.bezierCurveTo(-11.3, -41.4, 10.9, -41.5, 25.5, -28.5);
  ctx.lineTo(5.0, -7.8);
  ctx.closePath();
  //if (color=="black") // is_chrome
    ctx.lineWidth = 1;
  /*else
    ctx.lineWidth = 1;*/
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-4.1, 1.2);
  ctx.bezierCurveTo(-4.8, -1.1, -3.4, -3.5, -1.1, -4.2);
  ctx.bezierCurveTo(1.2, -4.8, 3.6, -3.4, 4.2, -1.1);
  ctx.bezierCurveTo(4.9, 1.2, 3.5, 3.6, 1.2, 4.2);
  ctx.bezierCurveTo(-1.1, 4.8, -3.5, 3.5, -4.1, 1.2);
  ctx.closePath();
  ctx.lineJoin = "miter";
  ctx.miterLimit = 1.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-0.8, 0.3);
  ctx.bezierCurveTo(-1.0, -0.2, -0.7, -0.7, -0.2, -0.9);
  ctx.bezierCurveTo(0.3, -1.0, 0.8, -0.7, 0.9, -0.2);
  ctx.bezierCurveTo(1.1, 0.3, 0.8, 0.8, 0.3, 0.9);
  ctx.bezierCurveTo(-0.2, 1.0, -0.7, 0.8, -0.8, 0.3);
  ctx.closePath();
  ctx.stroke();

  ctx.translate(-x, -y);

  ctx.restore();
 }

function cog2(ctx,x,y,r,color)
 {//alert(x + " : " + y + " : " + r)
  //ctx.clearRect(0,0,width,height);
  ctx.save();

  ctx.translate(x, y); // change point of origin to rotate around
  ctx.rotate(r*(Math.PI/180)); // degrees to rotate

  ctx.beginPath();
  ctx.strokeStyle = color;

  ctx.moveTo(1.2, -32.7);
  ctx.bezierCurveTo(1.2, -33.4, 1.2, -34.0, 1.2, -34.6);
  ctx.bezierCurveTo(1.3, -35.8, -0.1, -36.5, -0.9, -35.6);
  ctx.bezierCurveTo(-2.0, -34.6, -0.2, -31.7, -2.3, -31.4);
  ctx.bezierCurveTo(-4.8, -31.4, -2.6, -36.0, -5.3, -35.6);
  ctx.bezierCurveTo(-7.8, -35.2, -4.7, -31.6, -6.9, -30.8);
  ctx.bezierCurveTo(-9.3, -30.2, -7.8, -35.1, -10.4, -34.5);
  ctx.bezierCurveTo(-12.9, -33.8, -9.1, -30.4, -11.3, -29.4);
  ctx.bezierCurveTo(-13.6, -28.6, -12.9, -33.7, -15.3, -32.6);
  ctx.bezierCurveTo(-17.6, -31.4, -13.6, -28.9, -15.5, -27.5);
  ctx.bezierCurveTo(-17.6, -26.2, -17.6, -31.4, -19.9, -30.0);
  ctx.bezierCurveTo(-22.1, -28.6, -17.5, -26.5, -19.3, -24.9);
  ctx.bezierCurveTo(-21.3, -23.5, -22.1, -28.6, -24.1, -26.8);
  ctx.bezierCurveTo(-26.0, -25.0, -21.3, -23.8, -22.8, -21.9);
  ctx.bezierCurveTo(-24.4, -20.0, -25.9, -25.0, -27.7, -23.0);
  ctx.bezierCurveTo(-29.4, -20.9, -24.4, -20.4, -25.7, -18.3);
  ctx.bezierCurveTo(-27.2, -16.4, -29.4, -21.0, -30.8, -18.7);
  ctx.bezierCurveTo(-32.1, -16.5, -27.3, -16.6, -28.1, -14.4);
  ctx.bezierCurveTo(-29.2, -12.1, -32.0, -16.4, -33.2, -14.0);
  ctx.bezierCurveTo(-34.2, -11.5, -29.2, -12.5, -29.9, -10.1);
  ctx.bezierCurveTo(-30.8, -7.8, -34.2, -11.6, -34.9, -9.0);
  ctx.bezierCurveTo(-35.5, -6.5, -30.9, -8.1, -31.1, -5.7);
  ctx.bezierCurveTo(-31.4, -3.2, -35.4, -6.5, -35.8, -3.9);
  ctx.bezierCurveTo(-36.2, -1.2, -31.6, -3.5, -31.6, -1.1);
  ctx.bezierCurveTo(-31.7, 1.4, -36.1, -1.3, -36.0, 1.4);
  ctx.bezierCurveTo(-35.9, 4.0, -31.9, 1.2, -31.4, 3.5);
  ctx.bezierCurveTo(-31.0, 6.0, -35.8, 4.0, -35.4, 6.6);
  ctx.bezierCurveTo(-35.1, 9.2, -31.3, 5.8, -30.6, 8.1);
  ctx.bezierCurveTo(-29.9, 10.4, -35.1, 9.2, -34.1, 11.7);
  ctx.bezierCurveTo(-33.2, 14.2, -30.1, 10.2, -29.1, 12.4);
  ctx.bezierCurveTo(-28.0, 14.7, -33.2, 14.1, -32.0, 16.6);
  ctx.bezierCurveTo(-31.0, 18.9, -28.3, 14.6, -26.9, 16.5);
  ctx.bezierCurveTo(-25.7, 18.6, -30.9, 18.9, -29.3, 21.0);
  ctx.bezierCurveTo(-27.7, 23.2, -26.0, 18.5, -24.3, 20.3);
  ctx.bezierCurveTo(-22.6, 22.1, -27.7, 23.1, -25.9, 25.1);
  ctx.bezierCurveTo(-24.3, 27.0, -22.9, 22.1, -21.1, 23.6);
  ctx.bezierCurveTo(-19.2, 25.3, -24.2, 27.0, -22.0, 28.6);
  ctx.bezierCurveTo(-19.9, 30.2, -19.6, 25.3, -17.4, 26.4);
  ctx.bezierCurveTo(-15.3, 27.7, -20.2, 30.6, -17.4, 31.6);
  ctx.bezierCurveTo(-15.2, 32.4, -15.6, 27.7, -13.4, 28.7);
  ctx.bezierCurveTo(-11.2, 29.7, -15.4, 32.8, -12.9, 33.7);
  ctx.bezierCurveTo(-10.4, 34.6, -11.5, 29.9, -9.1, 30.3);
  ctx.bezierCurveTo(-6.7, 30.9, -10.4, 34.6, -7.8, 35.2);
  ctx.bezierCurveTo(-5.3, 36.0, -6.9, 31.1, -4.6, 31.3);
  ctx.bezierCurveTo(-2.1, 31.7, -5.3, 35.9, -2.6, 36.0);
  ctx.bezierCurveTo(0.1, 36.1, -2.4, 31.5, 0.0, 31.7);
  ctx.bezierCurveTo(-0.0, 31.7, -0.1, 31.6, -0.1, 31.6);
  ctx.bezierCurveTo(-0.0, 31.6, 0.1, 31.6, 0.2, 31.6);
  ctx.bezierCurveTo(0.2, 31.6, 0.1, 31.7, 0.0, 31.7);
  ctx.bezierCurveTo(2.5, 31.5, -0.0, 36.1, 2.6, 36.0);
  ctx.bezierCurveTo(5.3, 35.9, 2.3, 31.8, 4.6, 31.3);
  ctx.bezierCurveTo(7.0, 30.9, 5.3, 36.0, 7.9, 35.2);
  ctx.bezierCurveTo(10.5, 34.6, 6.8, 31.0, 9.1, 30.3);
  ctx.bezierCurveTo(11.5, 29.7, 10.4, 34.6, 12.9, 33.7);
  ctx.bezierCurveTo(15.4, 32.8, 11.3, 29.8, 13.4, 28.6);
  ctx.bezierCurveTo(15.6, 27.6, 15.4, 32.9, 17.7, 31.5);
  ctx.bezierCurveTo(20.0, 30.1, 15.4, 27.8, 17.5, 26.4);
  ctx.bezierCurveTo(19.6, 25.1, 19.9, 30.2, 22.0, 28.6);
  ctx.bezierCurveTo(24.1, 27.0, 19.4, 25.3, 21.1, 23.6);
  ctx.bezierCurveTo(22.9, 21.9, 24.2, 27.1, 26.0, 25.1);
  ctx.bezierCurveTo(27.8, 23.1, 22.8, 22.2, 24.3, 20.3);
  ctx.bezierCurveTo(25.9, 18.3, 27.7, 23.2, 29.3, 21.0);
  ctx.bezierCurveTo(30.9, 18.9, 25.9, 18.6, 27.0, 16.5);
  ctx.bezierCurveTo(28.2, 14.4, 31.0, 18.9, 32.1, 16.5);
  ctx.bezierCurveTo(33.2, 14.1, 28.2, 14.7, 29.1, 12.4);
  ctx.bezierCurveTo(30.0, 10.1, 33.2, 14.2, 34.1, 11.7);
  ctx.bezierCurveTo(35.1, 9.2, 30.1, 10.4, 30.6, 8.0);
  ctx.bezierCurveTo(31.2, 5.7, 35.1, 9.2, 35.4, 6.6);
  ctx.bezierCurveTo(35.8, 3.9, 31.2, 6.0, 31.4, 3.5);
  ctx.bezierCurveTo(31.7, 1.0, 35.9, 4.0, 36.0, 1.4);
  ctx.bezierCurveTo(36.1, -1.3, 31.9, 1.3, 31.6, -1.1);
  ctx.bezierCurveTo(31.4, -3.6, 36.1, -1.2, 35.8, -3.9);
  ctx.bezierCurveTo(35.4, -6.6, 31.6, -3.3, 31.1, -5.7);
  ctx.bezierCurveTo(30.8, -8.2, 35.5, -6.5, 34.8, -9.1);
  ctx.bezierCurveTo(34.2, -11.6, 30.9, -8.0, 29.9, -10.2);
  ctx.bezierCurveTo(29.0, -12.5, 34.2, -11.6, 33.2, -14.1);
  ctx.bezierCurveTo(32.0, -16.5, 29.3, -12.3, 28.1, -14.4);
  ctx.bezierCurveTo(27.1, -16.7, 32.1, -16.4, 30.7, -18.7);
  ctx.bezierCurveTo(29.4, -20.9, 27.3, -16.6, 25.7, -18.3);
  ctx.bezierCurveTo(24.2, -20.3, 29.4, -20.9, 27.7, -23.0);
  ctx.bezierCurveTo(25.9, -25.0, 24.5, -20.2, 22.7, -21.9);
  ctx.bezierCurveTo(21.2, -23.8, 26.0, -25.0, 24.0, -26.8);
  ctx.bezierCurveTo(22.1, -28.5, 21.3, -23.7, 19.3, -25.0);
  ctx.bezierCurveTo(17.3, -26.4, 22.1, -28.6, 19.9, -30.0);
  ctx.bezierCurveTo(17.6, -31.4, 17.6, -26.3, 15.4, -27.5);
  ctx.bezierCurveTo(13.4, -28.9, 17.7, -31.4, 15.3, -32.6);
  ctx.bezierCurveTo(12.9, -33.7, 13.6, -28.8, 11.3, -29.5);
  ctx.bezierCurveTo(9.0, -30.3, 12.9, -33.8, 10.4, -34.5);
  ctx.bezierCurveTo(7.8, -35.1, 9.3, -30.3, 6.8, -30.8);
  ctx.bezierCurveTo(4.5, -31.5, 7.8, -35.2, 5.2, -35.6);
  ctx.bezierCurveTo(2.6, -36.0, 4.7, -31.6, 2.3, -31.4);
  ctx.bezierCurveTo(1.6, -31.5, 1.2, -32.1, 1.2, -32.7);
  //if (color=="black") // is_chrome
    ctx.lineWidth = 1;
  /*else
    ctx.lineWidth = 1;*/ /* 0.7 */
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-4.7, -28.7);
  ctx.bezierCurveTo(-2.7, -25.9, -1.5, -22.6, -1.5, -18.9);
  ctx.bezierCurveTo(-1.5, -9.3, -9.7, -1.4, -19.9, -1.4);
  ctx.bezierCurveTo(-23.2, -1.4, -26.3, -2.2, -28.9, -3.6);
  ctx.bezierCurveTo(-27.3, -16.5, -17.3, -26.7, -4.7, -28.7);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(4.7, 28.8);
  ctx.bezierCurveTo(2.7, 26.1, 1.5, 22.7, 1.5, 19.1);
  ctx.bezierCurveTo(1.5, 9.4, 9.7, 1.5, 19.9, 1.5);
  ctx.bezierCurveTo(23.2, 1.5, 26.3, 2.3, 28.9, 3.8);
  ctx.bezierCurveTo(27.3, 16.6, 17.4, 26.8, 4.7, 28.8);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-28.8, 4.6);
  ctx.bezierCurveTo(-26.0, 2.6, -22.6, 1.5, -19.0, 1.5);
  ctx.bezierCurveTo(-9.3, 1.5, -1.5, 9.8, -1.5, 20.0);
  ctx.bezierCurveTo(-1.5, 23.2, -2.4, 26.3, -3.8, 29.0);
  ctx.bezierCurveTo(-16.6, 27.3, -26.8, 17.3, -28.8, 4.6);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(28.8, -4.5);
  ctx.bezierCurveTo(26.0, -2.5, 22.6, -1.4, 19.0, -1.4);
  ctx.bezierCurveTo(9.3, -1.4, 1.5, -9.7, 1.5, -19.8);
  ctx.bezierCurveTo(1.5, -23.1, 2.4, -26.2, 3.8, -28.9);
  ctx.bezierCurveTo(16.6, -27.2, 26.8, -17.2, 28.8, -4.5);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.0, 7.1);
  ctx.bezierCurveTo(-3.9, 7.1, -7.1, 4.0, -7.1, 0.1);
  ctx.bezierCurveTo(-7.1, -3.8, -3.9, -7.0, -0.0, -7.0);
  ctx.bezierCurveTo(3.9, -7.0, 7.1, -3.9, 7.1, 0.0);
  ctx.bezierCurveTo(7.1, 3.9, 3.9, 7.1, 0.0, 7.1);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.0, 1.5);
  ctx.bezierCurveTo(-0.8, 1.5, -1.5, 0.9, -1.5, 0.1);
  ctx.bezierCurveTo(-1.5, -0.8, -0.8, -1.4, -0.0, -1.4);
  ctx.bezierCurveTo(0.8, -1.4, 1.5, -0.8, 1.5, 0.1);
  ctx.bezierCurveTo(1.5, 0.9, 0.8, 1.5, 0.0, 1.5);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-29.2, 0.1);
  ctx.bezierCurveTo(-29.2, -16.1, -16.1, -29.1, -0.0, -29.1);
  ctx.bezierCurveTo(16.1, -29.1, 29.2, -16.1, 29.2, 0.1);
  ctx.bezierCurveTo(29.2, 16.2, 16.1, 29.2, -0.0, 29.2);
  ctx.bezierCurveTo(-16.1, 29.2, -29.2, 16.2, -29.2, 0.1);
  ctx.closePath();
  ctx.lineWidth = 0.1;
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