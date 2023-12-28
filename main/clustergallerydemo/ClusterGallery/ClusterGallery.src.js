//
//  ClusterGallery - CGallery v1.1
//  By Gunther Willems - http://users.skynet.be/gunther.willems
//  Project started: 14/05/2011
//  Last Modification: 09/04/2013
//  Copyright Gunther Willems
//

var CGallery = {

// Parameters you can change. Change them in the file ClusterGalleryData.js

data : null,       // gallery images array
canvasBorder : 20, // inside border inside the canvas
canvasBackground : null, //"#000", // define the canvas backgroundcolor, default value : null
activeImage : 0,   // the first image to show. 0 = the first image

arrowScale : 1,    // default = 1 = 100%, 2= 200%, ...
arrowSpacing : 10,  // space between image & arrow
arrowTransparency : 0.2,
arrowPosition : 0, // 0 = border, 1 = next to the image
arrowColor : "#000", // used for the arrows and other icons on the screen
arrowBackColor : "#fff", // used for the arrows and other icons on the screen

showFullScreenIcon : true,  // Can the viewer go to full screen mode?

textSize : "17px",
textColor : "#000", // can also be "rgba(255, 255, 255, 0.8)", // Forth parameter is the transparency. A value between 0 & 1
textBackground : "#fff",
textBoxHeight : 50,
textBoxTransparency : 0.35,
defaultTitle : "",
defaultDescription : "",
textPosition : "bottommiddle",  // none | top | middle | bottom | topmiddle | bottommiddle | free, if free set the value in textY
textAlways : false,  // if false, the text will show when the mousecursor is over the image
textY : -1,  // Textbox position if textPosition="free", default value -1

outerBorders : [],//[0.01,"white",0.01,"black",0.03,"white"],  // default border around the images. The number of borders is unlimited. Syntax: [size percent, color, size percent, color, ...], for no borders: []

showSlideshowIcon : true, //can the viewer start/stop the slideshow?
autoSlideshow : false, // start the slideshow automatically
nextImageSpeed : 5000, // in milliseconds

useImagesAsThumbs : false, // if no thumb is defined for an image, use the full image (Is only used if the thumbs div exists
thumbSize : "30px", // used if useImagesAsThumbs is true

// parameters used by the program: Do not change these values!

destX : 0,       // image destination position coordinate X
destY : 0,
destW : 0,       // image destination width
destH : 0,       // image destination height

canvas : null,
context : null,
canvasW : 0,     // canvas width (default = 300)
canvasH : 0,     // canvas height (default = 150)
posCanvas : {x:0, y:0},  // position af the canvas inside the document

imageObj : new Image(),

arrowW : 22.6,  // width of the arrow objects
arrowH : 34.5,  // height

imageX : 0, // current image coordinate X
imageY : 0, // coordinate Y
imageW : 0, // current image width
imageH : 0, // height

outerBordersW : 0,   // total of all the image borders widths
lastImgBorder : 0, // the number of image borders defined
borderRef : 0,     // width or height of the canvas. Depends on the image to show
outerBordersWork : null, // the current borders array. the default or from data

lastImageN : 0,   // the position of the last image in data
IEversion : 999,  // get Internet Explorer (IE) version
IEcorrection : .9125, // correction image position for IE 6 & 7

mouseClicked: false,
fullscreenStarted : false,
thumbsOnscreen : false, // are the thumbs already on screen?
thumbImageObj : null, // loading thumb image
mouseOver : false, // is the mousecursor over the gallery?
debugDiv : null,  // the debug div container is needed

//========================== Init ==========================

Init:function()
 {
  // init canvas
  if ( !CGallery.fullscreenStarted )
    CGallery.canvas = document.getElementById("GalleryCanvas");
  if ( CGallery.canvas == null) {alert("ClusterGallery canvas not found."); return;}
  if (typeof(G_vmlCanvasManager) != 'undefined') // Only start this on IE
   {CGallery.canvas = G_vmlCanvasManager.initElement(CGallery.canvas);}
  
  //if ( CGallery.canvas.getcontext == null) {alert("No context on canvas."); return;}
  //if( !CGallery.canvas || !CGallery.canvas.getContext) {alert("not compatible with canvas."); return;}
  
  CGallery.canvas.style.visibility = 'visible';

  CGallery.context = CGallery.canvas.getContext("2d");

  if (CGallery.canvasBackground != null)
   CGallery.canvas.style.backgroundColor = CGallery.canvasBackground;

  CGallery.canvas.onclick = function(e)
   {
    if (!e)
     {
      e = window.event;
     }
     
    // Begin: Calculate the mouse position inside the canvas element
    var mouseX;
    var mouseY;

    if ( e.offsetX || e.offsetY ) // IE use the offsetX & Y values 
     {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
     }
    else if (e.pageX || e.pageY) // other browsers, calculate the offsetX & Y
     {
	  CGallery.posCanvas = CGallery.posObject( CGallery.canvas );
	  mouseX= window.pageXOffset + e.clientX - CGallery.posCanvas.x;
	  mouseY= window.pageYOffset + e.clientY - CGallery.posCanvas.y;
	  //mouseX = e.pageX - CGallery.canvas.offsetLeft;
	  //mouseY = e.pageY - CGallery.canvas.offsetTop;
     }
  /*  else
     {
	  mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - CGallery.canvas.offsetLeft;
	  mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - CGallery.canvas.offsetTop
     } // +CGallery.canvas.offsetTop + CGallery.canvas.parentNode.offsetTop  ? ie7
 */    
     
	//CGallery.Debug( "offset: " + mouseX + " " + mouseY);
	
	// End: Calculate the mouse position inside the canvas element
	  
	
	// fullscreen icon clicked
	if ( CGallery.showFullScreenIcon && mouseX > CGallery.canvasW - 30 && mouseY <  30)
	 {
	  CGallery.FullScreen();
	  return;
	 }
	 
	// slideshow start-pause icon clicked
	if ( CGallery.showSlideshowIcon && mouseX > CGallery.canvasW - 30 && mouseY <  100 && mouseY >  30)
	 {CGallery.mouseOver = true;
	  if ( CGallery.autoSlideshow )
	  {
	   CGallery.autoSlideshow = false;
	   CGallery.ClearCanvas();
	   CGallery.DrawCanvas();
	   return;
	  }
	  else
	   {
	    CGallery.autoSlideshow = true;
		CGallery.SlideShow();
		//setTimeout("CGallery.SlideShow()", CGallery.nextImageSpeed);
		return;
	   }
	 }
	// previous image clicked
    if ( mouseX <= CGallery.canvasW / 2 )
      {
       CGallery.ChangeImage(CGallery.activeImage-1 < 0 ?CGallery.lastImageN : CGallery.activeImage-1);
      }
    else // next image clicked
     {
      CGallery.ChangeImage(CGallery.activeImage+1 > CGallery.lastImageN ? 0 : CGallery.activeImage+1);
     }
	CGallery.mouseClicked = true;
	
   }; // onclick

  if ( (CGallery.textPosition != "none" || CGallery.showFullScreenIcon) && !CGallery.textAlways )
   {
   
   CGallery.canvas.onmouseover = function(e)
    {
     CGallery.mouseOver = true;
	 //CGallery.DrawCanvas();
	 CGallery.DrawText();
	};
  
  CGallery.canvas.onmouseout = function(e)  // is also triggered when creating the canvas????????
    {
     CGallery.mouseOver = false;
	 CGallery.ClearCanvas();
	 CGallery.DrawCanvas();
	};
  }
	
  CGallery.canvasW = CGallery.canvas.width;
  CGallery.canvasH = CGallery.canvas.height;
  //CGallery.posCanvas = CGallery.posObject( CGallery.canvas ); Use it later. Otherwise wrong if window size is changed
  
  CGallery.lastImageN = CGallery.data.length-1;
  CGallery.GetIEVersion();
  if ( CGallery.IEversion > 7)
    CGallery.IEcorrection = 1;
  
  switch (CGallery.textPosition)
   {
   case "top":
    CGallery.textY = 0;
    break;
   case "middle":
    CGallery.textY = CGallery.canvasH/2-CGallery.textBoxHeight/2;
    break;
   case "bottom":
    CGallery.textY = CGallery.canvasH-CGallery.textBoxHeight;
    break;
   case "topmiddle":
    CGallery.textY = CGallery.canvasH/4-CGallery.textBoxHeight/2;
    brak;
   case "bottommiddle":
    CGallery.textY = CGallery.canvasH*3/4-CGallery.textBoxHeight/2;
    break;
   }
  
  // There could be many thumbnails. Create a separate process for loading them:
  setTimeout("CGallery.ShowThumbs()", 2000);
  
  // draw the first image on the canvas
  CGallery.ShowImage( CGallery.activeImage );
  
  if ( CGallery.autoSlideshow )
	setTimeout("CGallery.SlideShow()", CGallery.nextImageSpeed);
  
 }, // init

//========================== ShowImage ==========================
// Draw a new image

ShowImage : function(imagenr)
 {
  CGallery.activeImage = imagenr;
  CGallery.imageObj.src="";
  CGallery.imageObj =  new Image();
  CGallery.imageObj.onload = function()  // wait for the image to be loaded before using it
   {
    CGallery.imageW = CGallery.imageObj.width;
    CGallery.imageH = CGallery.imageObj.height;
    
    // presume the height is the reference
    CGallery.borderRef = CGallery.canvasH;
    CGallery.CalcBorders( );
	CGallery.destH = CGallery.canvasH - 2*CGallery.canvasBorder - 2*CGallery.outerBordersW;
    CGallery.destW = parseInt(CGallery.destH / CGallery.imageH * CGallery.imageW);
	var totalImagesW = CGallery.destW + 2*CGallery.arrowW*CGallery.arrowScale + 2*CGallery.arrowSpacing + 2*CGallery.outerBordersW + 2*CGallery.canvasBorder;
	
	if ( totalImagesW <= CGallery.canvasW )
     {
      
      CGallery.destX = parseInt(CGallery.canvasW / 2 - CGallery.destW / 2);
      CGallery.destY = parseInt(CGallery.canvasBorder + CGallery.outerBordersW );
      
      
     }
	else
	 {
	  //CGallery.borderRef = CGallery.canvasW;  // I prefere to have the same scale for the borders
	  CGallery.CalcBorders( );
      CGallery.destW = parseInt(CGallery.canvasW-2*CGallery.canvasBorder-2*CGallery.arrowSpacing-2*CGallery.arrowW*CGallery.arrowScale-2*CGallery.outerBordersW);
	  CGallery.destH = parseInt(CGallery.imageH/CGallery.imageW*CGallery.destW);
	  CGallery.destX = parseInt(CGallery.canvasBorder+CGallery.arrowSpacing+CGallery.arrowW*CGallery.arrowScale+CGallery.outerBordersW);
      CGallery.destY = parseInt((CGallery.canvasH-CGallery.destH)/2);
	 }

	CGallery.DrawCanvas();
 
  }; // onload
  CGallery.imageObj.src = CGallery.data[imagenr].image;
  
 }, // ShowImage

//========================== ChangeImage ==========================
// Remove the old image and draw the new image

ChangeImage : function(imagenr)
 {
  CGallery.ClearCanvas();
  CGallery.ShowImage(imagenr);
 }, // ChangeImage

//========================== DrawCanvas ==========================

DrawCanvas : function()
 { //CGallery.destX+CGallery.destW+CGallery.arrowSpacing   :   CGallery.destX-CGallery.arrowSpacing-CGallery.arrowW*CGallery.arrowScale
  
  if ( CGallery.arrowPosition == 0 )
   {
    CGallery.DrawRightArrow( parseInt(CGallery.canvasW-CGallery.canvasBorder-CGallery.arrowW*CGallery.arrowScale), parseInt(CGallery.canvasH/2-CGallery.arrowH/2*CGallery.arrowScale) );
    CGallery.DrawLeftArrow( parseInt(CGallery.canvasBorder), parseInt(CGallery.canvasH/2-CGallery.arrowH/2*CGallery.arrowScale) );
   }
  else
   {
    CGallery.DrawRightArrow( parseInt(CGallery.destX+CGallery.destW+CGallery.arrowSpacing+CGallery.outerBordersW), parseInt(CGallery.canvasH/2-CGallery.arrowH/2*CGallery.arrowScale) );
    CGallery.DrawLeftArrow( parseInt(CGallery.destX-CGallery.arrowSpacing-CGallery.arrowW*CGallery.arrowScale-CGallery.outerBordersW), parseInt(CGallery.canvasH/2-CGallery.arrowH/2*CGallery.arrowScale) );
   }
  CGallery.context.globalAlpha = 1;
  if (typeof(CGallery.data[CGallery.activeImage].crop) != 'undefined')
   CGallery.context.drawImage(CGallery.imageObj, 
    parseInt(CGallery.data[CGallery.activeImage].crop[0]), parseInt(CGallery.data[CGallery.activeImage].crop[1]), CGallery.imageObj.width-parseInt(CGallery.data[CGallery.activeImage].crop[2])-CGallery.data[CGallery.activeImage].crop[0], CGallery.imageObj.height-parseInt(CGallery.data[CGallery.activeImage].crop[3])-CGallery.data[CGallery.activeImage].crop[1], 
    CGallery.destX*CGallery.IEcorrection, CGallery.destY*CGallery.IEcorrection, CGallery.destW, CGallery.destH);
  else
   CGallery.context.drawImage(CGallery.imageObj, CGallery.destX*CGallery.IEcorrection, CGallery.destY*CGallery.IEcorrection, CGallery.destW, CGallery.destH); // context.drawImage(img_elem, sx, sy, sw, sh, dx, dy, dw, dh);

  CGallery.DrawOuterBorders();
  CGallery.DrawInnerBorders();
  
  if ( CGallery.showFullScreenIcon )
    CGallery.DrawFullScreenIcon( CGallery.canvasW - 27, 7 );
  
  if( CGallery.showSlideshowIcon )
    CGallery.DrawSlideshowIcon( CGallery.canvasW - 27, 34 );
  
  if (CGallery.mouseOver || CGallery.mouseClicked || CGallery.textAlways)
    {
	 CGallery.DrawText();
	 CGallery.mouseClicked = false;
	}
 }, // DrawCanvas

//========================== Slideshow ==========================
// start the slideshow
SlideShow : function( )
 {
  if ( CGallery.autoSlideshow )
   {
    setTimeout("CGallery.SlideShow()", CGallery.nextImageSpeed);
    CGallery.ChangeImage( CGallery.activeImage+1 > CGallery.lastImageN ? 0 : CGallery.activeImage+1 );
   }
 }, // SlideShow
 
//========================== CalcBorders ==========================
// calculate the total border width=height

CalcBorders : function( )
 {
  if (typeof(CGallery.data[CGallery.activeImage].outerBorders) != 'undefined')
    CGallery.outerBordersWork = CGallery.data[CGallery.activeImage].outerBorders;
  else
    CGallery.outerBordersWork = CGallery.outerBorders;
  
  CGallery.outerBordersW = 0;
  CGallery.lastImgBorder = CGallery.outerBordersWork.length/2;
  for ( i=0; i<=CGallery.lastImgBorder-1; ++i)
   {
	CGallery.outerBordersW += parseInt(CGallery.outerBordersWork[i*2]*CGallery.borderRef);
   }
 }, // CalcBorders

//========================== DrawOuterBorders ==========================
// Draw borders outside the image

 DrawOuterBorders : function( )
  {
   var shift = 0;
   var borderW;
   var borderW2;
   
   for ( i=0; i<=CGallery.lastImgBorder-1; ++i)
   {
   
   borderW = parseInt(CGallery.outerBordersWork[i*2]*CGallery.borderRef);
   borderW2 = parseInt( borderW / 2 );
   shift += borderW;
   
   if ( CGallery.outerBordersWork[i*2+1] )  // if null, use transparent border
    {
     CGallery.context.beginPath();
     CGallery.context.strokeStyle = CGallery.outerBordersWork[i*2+1];
     CGallery.context.globalAlpha = 1;
     CGallery.context.lineWidth = borderW+1;
   
     CGallery.context.moveTo(CGallery.destX-shift+borderW2, CGallery.destY-shift+borderW2);
     CGallery.context.lineTo(CGallery.destX+CGallery.destW + shift-borderW2, CGallery.destY-shift+borderW2);
     CGallery.context.lineTo(CGallery.destX+CGallery.destW + shift-borderW2, CGallery.destY+CGallery.destH+shift-borderW2);
     CGallery.context.lineTo(CGallery.destX - shift+borderW2, CGallery.destY+CGallery.destH+shift-borderW2);

     CGallery.context.closePath();
     CGallery.context.stroke();
    }
   
   }
  }, // DrawOuterBorders
  
//========================== DrawInnerBorders ==========================
// Draw (transparent) borders inside the image if defined

 DrawInnerBorders : function( )
  {
   // check if an innerborder is defined for the active image
   if (typeof(CGallery.data[CGallery.activeImage].innerBorders) == 'undefined')
     return;
   
   var shift = 0;
   var borderW;
   var borderW2;
   var innerBordersWork = CGallery.data[CGallery.activeImage].innerBorders;
   var lastInnerBorder = innerBordersWork.length/3-1;
   
   for ( i=0; i<=lastInnerBorder; ++i)
   {
   borderW = parseInt(innerBordersWork[i*3]*CGallery.borderRef);
   borderW2 = parseInt( borderW / 2 );
   shift += borderW;
   
   if ( innerBordersWork[i*3+1] )  // if null, use transparent border
    {
   CGallery.context.beginPath();
   CGallery.context.strokeStyle = innerBordersWork[i*3+1];
   CGallery.context.globalAlpha = innerBordersWork[i*3+2];
   CGallery.context.lineWidth = borderW+1;
   
   CGallery.context.moveTo(CGallery.destX+shift-borderW2, CGallery.destY+shift-borderW2);
   CGallery.context.lineTo(CGallery.destX+CGallery.destW-shift+borderW2, CGallery.destY+shift-borderW2);
   CGallery.context.lineTo(CGallery.destX+CGallery.destW-shift+borderW2, CGallery.destY+CGallery.destH-shift+borderW2);
   CGallery.context.lineTo(CGallery.destX+shift-borderW2, CGallery.destY+CGallery.destH-shift+borderW2);

   CGallery.context.closePath();
   CGallery.context.stroke();
    }
   
   }
  }, // DrawInnerBorders

//========================== DrawText ==========================

DrawText : function()
 {
  if ( CGallery.textY != -1 )
   {
   CGallery.context.globalAlpha = CGallery.textBoxTransparency;
   CGallery.context.fillStyle = CGallery.textBackground;
   CGallery.context.fillRect(0,CGallery.textY,CGallery.canvasW,CGallery.textBoxHeight);
   CGallery.context.globalAlpha = 1;
   CGallery.context.fillStyle = CGallery.textColor;
   CGallery.context.font = CGallery.textSize + " Optimer";
   CGallery.context.textBaseline = 'middle';
   CGallery.context.textAlign = 'center';
  
   if (typeof(CGallery.data[CGallery.activeImage].title) != 'undefined')
    CGallery.context.fillText(CGallery.data[CGallery.activeImage].title, CGallery.canvasW/2, CGallery.textY+CGallery.textBoxHeight/3);
   else
    CGallery.context.fillText(CGallery.defaultTitle, CGallery.canvasW/2, CGallery.textY+CGallery.textBoxHeight/3);
  
   if (typeof(CGallery.data[CGallery.activeImage].descr) != 'undefined')
    CGallery.context.fillText(CGallery.data[CGallery.activeImage].descr, CGallery.canvasW/2, CGallery.textY+CGallery.textBoxHeight*2/3);
   else
    CGallery.context.fillText(CGallery.defaultDescription, CGallery.canvasW/2, CGallery.textY+CGallery.textBoxHeight*2/3);
   
   // ### for testing show filename
   // CGallery.Debug( CGallery.data[CGallery.activeImage].image );
  }
 }, // DrawText

//========================== DrawRightArrow ==========================

DrawRightArrow : function(x,y)
 {
  CGallery.context.save();
  CGallery.context.translate(x, y);
  
  CGallery.context.scale(CGallery.arrowScale, CGallery.arrowScale);
  CGallery.context.fillStyle = CGallery.arrowBackColor;
  
  // Circle
  CGallery.context.globalAlpha = CGallery.arrowTransparency;
  CGallery.context.beginPath();
  CGallery.context.moveTo(5.3, 0.0);
  CGallery.context.bezierCurveTo(3.5, 0.0, 1.7, 0.3, 0.0, 0.8);
  CGallery.context.lineTo(0.0, 33.6);
  CGallery.context.bezierCurveTo(1.7, 34.2, 3.5, 34.5, 5.3, 34.5);
  CGallery.context.bezierCurveTo(14.8, 34.5, 22.6, 26.8, 22.6, 17.2);
  CGallery.context.bezierCurveTo(22.6, 7.7, 14.8, 0.0, 5.3, 0.0);
  CGallery.context.closePath();
  
  CGallery.context.fill();

  // Arrow
  CGallery.context.strokeStyle = CGallery.arrowColor;
  CGallery.context.globalAlpha = 1;
  CGallery.context.beginPath();
  CGallery.context.moveTo(7.4, 11.0);
  CGallery.context.lineTo(13.5, 17.1);
  CGallery.context.lineTo(7.4, 23.1);
  CGallery.context.lineWidth = 1.9;
  CGallery.context.lineJoin = "miter";
  CGallery.context.miterLimit = 4.0;
  CGallery.context.stroke();
  
    
  // Check path width
  /*
  CGallery.context.strokeStyle = "#ee0";
  CGallery.context.lineWidth = 10;
  CGallery.context.beginPath();
  CGallery.context.moveTo(0.0, 38.4);
  CGallery.context.lineTo(CGallery.arrowW, 38.4);
  CGallery.context.stroke();
  */
  
  CGallery.context.restore();
 },

//========================== DrawLeftArrow ==========================

 DrawLeftArrow : function(x,y)
 {
  CGallery.context.save();
  CGallery.context.translate(x, y);
  
  CGallery.context.scale(CGallery.arrowScale, CGallery.arrowScale);
  CGallery.context.fillStyle = CGallery.arrowBackColor;
  
  // Circle
  CGallery.context.globalAlpha = CGallery.arrowTransparency;
  CGallery.context.beginPath();
  CGallery.context.moveTo(17.2, 0.0);
  CGallery.context.bezierCurveTo(19.1, 0.0, 20.9, 0.3, 22.6, 0.8);
  CGallery.context.lineTo(22.6, 33.6);
  CGallery.context.bezierCurveTo(20.9, 34.2, 19.1, 34.5, 17.2, 34.5);
  CGallery.context.bezierCurveTo(7.7, 34.5, 0.0, 26.8, 0.0, 17.2);
  CGallery.context.bezierCurveTo(0.0, 7.7, 7.7, 0.0, 17.2, 0.0);
  CGallery.context.closePath();
  CGallery.context.fill();

  // Arrow
  CGallery.context.strokeStyle = CGallery.arrowColor;
  CGallery.context.globalAlpha = 1;
  CGallery.context.beginPath();
  CGallery.context.moveTo(15.2, 11.0);
  CGallery.context.lineTo(9.1, 17.1);
  CGallery.context.lineTo(15.2, 23.1);
  CGallery.context.lineWidth = 1.9;
  CGallery.context.lineJoin = "miter";
  CGallery.context.miterLimit = 4.0;
  CGallery.context.stroke();
  
  CGallery.context.restore();
 },

//========================== DrawFullScreenIcon ==========================

DrawFullScreenIcon : function(x,y)
 {
  CGallery.context.save();
  CGallery.context.translate(x, y);
  
  //CGallery.context.scale(1.5, 1.5);
  CGallery.context.fillStyle = CGallery.arrowBackColor;
  
  
  // Box
  CGallery.context.globalAlpha = CGallery.arrowTransparency*1.5;
  CGallery.context.beginPath();
  CGallery.context.moveTo(0.0, 20.0);
  CGallery.context.lineTo(20.0, 20.0);
  CGallery.context.lineTo(20.0, 0.0);
  CGallery.context.lineTo(0.0, 0.0);
  CGallery.context.lineTo(0.0, 20.0);
  CGallery.context.closePath();
  CGallery.context.fill();

  // ArrowLT
  CGallery.context.globalAlpha = 1;
  CGallery.context.beginPath();
  CGallery.context.moveTo(2.7, 7.9);
  CGallery.context.lineTo(2.7, 2.7);
  CGallery.context.lineTo(8.0, 2.7);
  CGallery.context.lineTo(2.7, 7.9);
  CGallery.context.closePath();
  CGallery.context.fillStyle = CGallery.arrowColor;
  CGallery.context.fill();

  // ArrowLB
  CGallery.context.beginPath();
  CGallery.context.moveTo(8.0, 17.3);
  CGallery.context.lineTo(2.7, 17.3);
  CGallery.context.lineTo(2.7, 12.0);
  CGallery.context.lineTo(8.0, 17.3);
  CGallery.context.closePath();
  CGallery.context.fill();

  // ArrowRB
  CGallery.context.beginPath();
  CGallery.context.moveTo(17.4, 12.0);
  CGallery.context.lineTo(17.4, 17.3);
  CGallery.context.lineTo(12.1, 17.3);
  CGallery.context.lineTo(17.4, 12.0);
  CGallery.context.closePath();
  CGallery.context.fill();

  // ArrowTR
  CGallery.context.beginPath();
  CGallery.context.moveTo(12.1, 2.7);
  CGallery.context.lineTo(17.4, 2.7);
  CGallery.context.lineTo(17.4, 7.9);
  CGallery.context.lineTo(12.1, 2.7);
  CGallery.context.closePath();
  CGallery.context.fill();
  CGallery.context.restore();
 },

//========================== DrawSlideshowIcon ==========================
 
DrawSlideshowIcon : function(x,y)
 {
  CGallery.context.save();
  CGallery.context.translate(x, y);
  
  CGallery.context.fillStyle = CGallery.arrowBackColor;
  
  // Box
  CGallery.context.globalAlpha = CGallery.arrowTransparency*1.5;
  CGallery.context.beginPath();
  CGallery.context.moveTo(0.0, 20.0);
  CGallery.context.lineTo(20.0, 20.0);
  CGallery.context.lineTo(20.0, 0.0);
  CGallery.context.lineTo(0.0, 0.0);
  CGallery.context.lineTo(0.0, 20.0);
  CGallery.context.closePath();
  CGallery.context.fill();

 if ( CGallery.autoSlideshow )
 {
  // Pause1
  CGallery.context.globalAlpha = 1.00;
  CGallery.context.beginPath();
  CGallery.context.moveTo(13.5, 15.5);
  CGallery.context.lineTo(11.5, 15.5);
  CGallery.context.lineTo(11.5, 4.5);
  CGallery.context.lineTo(13.5, 4.5);
  CGallery.context.lineTo(13.5, 15.5);
  CGallery.context.closePath();
  CGallery.context.fillStyle = CGallery.arrowColor;
  CGallery.context.fill();
  
    // Pause2
  CGallery.context.beginPath();
  CGallery.context.moveTo(16.9, 15.5);
  CGallery.context.lineTo(14.9, 15.5);
  CGallery.context.lineTo(14.9, 4.5);
  CGallery.context.lineTo(16.9, 4.5);
  CGallery.context.lineTo(16.9, 15.5);
  CGallery.context.closePath();
  CGallery.context.fill();
 }
 else
 {
  // Play
  CGallery.context.globalAlpha = 1.00;
  CGallery.context.beginPath();
  CGallery.context.moveTo(3.9, 4.5);
  CGallery.context.lineTo(3.9, 15.5);
  CGallery.context.lineTo(9.2, 10.2);
  CGallery.context.lineTo(3.9, 4.5);
  CGallery.context.closePath();
  CGallery.context.fillStyle = CGallery.arrowColor;
  CGallery.context.fill();
 }

  CGallery.context.restore();
 }, // DrawSlideshowIcon
 
//========================== ClearCanvas ==========================

ClearCanvas : function()
 {
  // clearRect isn't implemented in excanvas for IE !!
  // It behaves strange in the onmouseover event in IE
  
  //CGallery.context.clearRect(0,0,CGallery.canvasW,CGallery.canvasH);
  //CGallery.canvas.width = CGallery.canvas.width; // clear the canvas
  
  if (CGallery.IEversion<=8)
   {
    CGallery.context.globalAlpha = 1;
    CGallery.context.fillStyle = CGallery.canvas.style.backgroundColor;
    CGallery.context.fillRect(0,0,CGallery.canvasW,CGallery.canvasW);
   }
  else
    CGallery.context.clearRect(0,0,CGallery.canvasW,CGallery.canvasH);
 }, // ClearCanvas

//========================== ShowThumbs ==========================

ShowThumbs : function()
 {
  var CGdiv = document.getElementById("GalleryThumbs");
  
  if (CGdiv != null && !CGallery.thumbsOnscreen)
   {
    //if (CGallery.canvasBackground != null)
    //  CGdiv.style.backgroundColor = CGallery.canvasBackground;
    
    CGallery.newStyleInHead("img#CGimg{margin: 3px; border-width: 2px; border-color: #fff; border-style: solid;}");
  var thumbsS = "";
  for ( i=0; i<=CGallery.lastImageN; ++i)
   {
    if (typeof(CGallery.data[i].thumb) != 'undefined')
      thumbsS += "<a href=\"javascript:CGallery.ChangeImage(" + i + ")\"><img title=\"image " + i + "\" src=\"" + CGallery.data[i].thumb + "\" id=\"CGimg\" /></a>";
	else if ( CGallery.useImagesAsThumbs == true )
	  thumbsS += "<a href=\"javascript:CGallery.ChangeImage(" + i + ")\"><img title=\"image " + i + "\" src=\"" + CGallery.data[i].image + "\" id=\"CGimg\" width=\"" + CGallery.thumbSize + "\" /></a>";
   }
   CGdiv.innerHTML = thumbsS;
   //CGallery.ShowThumb( 0 );
   
   }
 },

//========================== FullScreen ==========================
// go or exit fullscreen

FullScreen : function()
 {
  CGallery.autoSlideshow = false; // stop slideshow before going fullscreen
  CGallery.ClearCanvas();
  CGallery.canvas.onmouseout = null;
  CGallery.canvas.onmouseover = null;
  CGallery.canvas.onclick = null;
  
  if ( CGallery.fullscreenStarted )
   {
    //CGallery.ClearCanvas();
    document.body.removeChild(document.getElementById("FullScreenGallery"));
    //CGallery.canvas = document.getElementById("GalleryCanvas");
    //CGallery.canvas.style.visibility = 'visible';
    CGallery.fullscreenStarted = false;
    CGallery.mouseOver = false;
   }
  else
  {
  //CGallery.ClearCanvas();
  CGallery.canvas.style.visibility = 'hidden';
 
  var canvas = document.createElement("canvas");
  canvas.id = "FullScreenGallery";

  document.body.insertBefore(canvas, document.body.firstChild);
  CGallery.canvas = document.getElementById("FullScreenGallery");
 
  CGallery.canvasW = CGallery.canvas.width = CGallery.IEversion <=8 ? document.documentElement.clientWidth : window.innerWidth-15;
  CGallery.canvasH = CGallery.canvas.height = CGallery.IEversion <=8 ? document.documentElement.clientHeight : window.innerHeight;

  CGallery.canvas.style.position = "absolute";
  CGallery.canvas.style.zIndex = "100";
  CGallery.canvas.style.left = "0px";
  CGallery.canvas.style.top = "0px";
  CGallery.canvas.style.margin = "0px";
  CGallery.canvas.style.backgroundColor = CGallery.canvasBackground;
  
  CGallery.fullscreenStarted = true;
  window.scroll(0,0);
  }
  
  CGallery.Init();
  
 },

 //========================== findPosObject ==========================

posObject : function(obj)
 {
  var pagex = 0;
  var pagey = 0;
  var t = obj;
  if (t.offsetLeft == undefined)
   {
	t = t.parentNode;
   }
 
 while (t)
  {
	pagex += t.offsetLeft;
	pagey += t.offsetTop;
	t = t.offsetParent;
  }
  return {x:pagex, y:pagey};
 },
 
//========================== Debug ==========================
// code used to show debug info at the end of the document when testing

Debug : function(dtext)
 {
  if ( CGallery.debugDiv == null )
    CGallery.CreateDebugDiv();
    
  try
   {
    document.getElementById("debug").innerHTML += "<br/>   " + dtext;
   }
  catch(err)
   {
    return;
   }
 }, // Debug

//========================== CreateDebugDiv ==========================
// Create the debug div container if nonexistent at first usage
//<div id="debug" style="color:black; font-style:italic; border-width: 1px; border-style: dashed; border-radius: 10px; margin: 5px; padding: 5px;">Debug window</div>

CreateDebugDiv : function()
 {
  CGallery.debugDiv = document.createElement("div");
  CGallery.debugDiv.id = "debug";

  document.body.appendChild(CGallery.debugDiv, document.body.firstChild);
  CGallery.debugDiv = document.getElementById("debug");
 
  CGallery.debugDiv.style.color = "black";
  CGallery.debugDiv.style.fontStyle = "italic";
  CGallery.debugDiv.style.textAlign = "left";
  CGallery.debugDiv.style.borderWidth = "1px";
  CGallery.debugDiv.style.borderStyle = "dashed";
  CGallery.debugDiv.style.borderRadius = "10px";
  CGallery.debugDiv.style.margin = "5px";
  CGallery.debugDiv.style.padding = "5px";
  CGallery.debugDiv.style.backgroundColor = "#aaa";
  CGallery.debugDiv.innerHTML = "Debug window";
 }, // CreateDebugDiv

 //========================== newStyleInHead ==========================

newStyleInHead : function(str)
 {
  var st = document.createElement('style');
  st.type= 'text/css';
  if( st.styleSheet )
   st.styleSheet.cssText= str;// IE
  else
   st.appendChild( document.createTextNode(str) );// non IE

  document.getElementsByTagName('head')[0].appendChild(st);
 }, // newStyleInHead


//========================== GetIEVersion ==========================

// Code used as example: http://obvcode.blogspot.com/2007/11/easiest-way-to-check-ie-version-with.html
GetIEVersion : function()
 {
  if ( navigator.appVersion.indexOf("MSIE") != -1 )
   CGallery.IEversion = parseFloat(navigator.appVersion.split("MSIE")[1] );
 }//, // IEVersion

 } // ClusterGallery

//========================== End program ==========================