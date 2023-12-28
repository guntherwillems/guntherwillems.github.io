var f1 = "borders/";

CGallery.data = [
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [.01,"black", .015,"#eee"]',
        outerBorders: [.01,"black", .015,"#eee"]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.03,"#eee"] ',
        outerBorders: [0.03,"#eee"] 
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [.01,"black", .015,"#465485"]',
        outerBorders: [.01,"black", .015,"#465485"]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.01,"#465485",0.01,"black", 0.03,"#465485"]',
        outerBorders: [0.01,"#465485",0.01,"black", 0.03,"#465485"]
    },
    {
        image: f1 + 'empty.jpg',
        title: ' outerBorders: [0.005,"#f6e6cc", 0.01,"#354065", 0.03,"#465485", 0.045,"black", 0.0045,"#465485"]',
        outerBorders: [0.005,"#f6e6cc", 0.01,"#354065", 0.03,"#465485", 0.045,"black", 0.0045,"#465485"]
    },
    {
        image: f1 + 'empty.jpg',
        title: ' innerBorders: [.04,null,0.5, .006,"white", 0.5]',
        innerBorders: [.04,null,0.5, .006,"white", 0.5]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [.02,"#b59402"],',
        descr: 'innerBorders: [.02,null,0.5, .01,"#ffd103",0.31]',
        outerBorders: [.02,"#b59402"],
        innerBorders: [.02,null,0.5, .01,"#ffd103",0.31]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.003,"#ccc", .02,"#404813", 0.01,"black", 0.004,"#937b4a"]',
        outerBorders: [0.003,"#ccc", .02,"#404813", 0.01,"black", 0.004,"#937b4a"]
    },
    {
        image: f1 + 'empty.jpg',
        title: ' outerBorders: [0.008,"black", 0.004,"#465485", 0.02,"black", 0.02,"#465485", 0.01,"black", 0.004,"#465485"]',
        outerBorders: [0.008,"black", 0.004,"#465485", 0.02,"black", 0.02,"#465485", 0.01,"black", 0.004,"#465485"]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.005,"black", 0.01,"#562b94", 0.02,"#6740b5"],',
        descr: 'innerBorders: [.01,null,0.5, .01,"#6740b5",0.7]',
        outerBorders: [0.005,"black", 0.01,"#562b94", 0.02,"#6740b5"],
        innerBorders: [.01,null,0.5, .01,"#6740b5",0.7]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.008,"black", 0.004,"white", 0.02,"black", 0.03,"#949372"]',
        outerBorders: [0.008,"black", 0.004,"white", 0.02,"black", 0.03,"#949372"]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.007,"#a74ac7"],',
        descr: 'innerBorders: [.03,"#a74ac7",0.31]',
        outerBorders: [0.007,"#a74ac7"],
        innerBorders: [.03,"#a74ac7",0.31]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.004,"#c3cd71", 0.02,"#6a8200"]',
        outerBorders: [0.004,"#c3cd71", 0.02,"#6a8200"]
    },
    {
        image: f1 + 'empty.jpg',
        title: 'outerBorders: [0.015,"black", 0.008,"#465485", 0.05,"black", 0.02,"#465485"]',
        outerBorders: [0.015,"black", 0.008,"#465485", 0.05,"black", 0.02,"#465485"]
    }
];

// Parameters: ( To use remove // before the line and change the value before the ; )

CGallery.canvasBackground = "#000"; // define the canvas backgroundcolor, IE 6 & 7 have problems with a transparent background. Default value = null

// CGallery.canvasBorder = 10; // inside border inside the canvas
// CGallery.activeImage = 0;   // The first image to show. 0 = the first image

// CGallery.arrowScale = 1;    // default = 1 = 100%, 2= 200%, ...
// CGallery.arrowSpacing = 10;  // space between image & arrow
// CGallery.arrowTransparency = 0.2;
// CGallery.arrowPosition = 0; // 0 = border, 1 = next to the image
// CGallery.arrowColor = "#000";
// CGallery.arrowBackColor = "#fff";

// CGallery.showFullScreenIcon = false;  // Can the viewer go to full screen mode?

// CGallery.textSize = "17px";
// CGallery.textColor = "#000";
// CGallery.textBackground = "#fff";
// CGallery.textBoxHeight = 40;
// CGallery.textBoxTransparency = 0.3;
// CGallery.defaultTitle = "\u00A9 Gunther Willems";
// CGallery.defaultDescription = "";
// CGallery.textPosition = "bottom";  // none | top | middle | bottom | topmiddle | bottommiddle | free, if free set the value in textY
CGallery.textAlways = true;  // if false, the text will show when the mousecursor is over the image
// CGallery.textY = -1;  // position of textbox if textPosition="free", default value -1

// CGallery.outerBorders = [0.01,"white",0.01,"black",0.03,"white"];  // default border around the images. The number of borders is unlimited. Syntax: [size percent, color, size percent, color, ...], for no borders: []

// CGallery.showSlideshowIcon = false; //Can the viewer start/stop the slideshow?
// CGallery.autoSlideshow = true; // start the slideshow automatically
// CGallery.nextImageSpeed = 3000; // in milliseconds
// CGallery.useImagesAsThumbs = true; // if no thumb is defined for an image, use the full image
// CGallery.thumbSize = "50px"; // used if useImagesAsThumbs is true

// Initialize the gallery:
window.onload = CGallery.Init;