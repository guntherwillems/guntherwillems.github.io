
CGallery.data = [
    {
        image: f1 + 'PlantFract2.jpg',
        descr: 'Fractal aquarium',
        innerBorders: [.04,"white",0.15]
    },
    {
        image: f1 + '03_Web-snow-flakes.jpg',
        descr: 'Web of snowflakes',
        outerBorders: [.004,"black",.008,"#801521",.008,"black",.02,"#801521"]
    },
    {
        image: f1 + '04_One-tree-out-off-the-chaotic-forest1.jpg',
        descr: 'One-tree-out-off-the-chaotic-forest',
        outerBorders: [.006,"black",.006,"#8b5614"]
    },
    {
        image: f1 + '05_Fosil-discovery-2007.jpg',
        descr: 'Fosil-discovery',
        outerBorders: [.01,"black",.025,"#3d1205"]  
    },
    {
        image: f1 + '06_Fireworks.jpg',
        descr: 'Fractal Fireworks',
        outerBorders: [0.01,"#1d3451",0.007,"black",0.02,"#294871"]
    },
    {
        image: f1 + '08_BlueIce.jpg',
        descr: 'Blue ice',
        outerBorders: [.01,"black",.03,"#555"]
    },
    {
        image: f1 + '09_Wallpaper1.jpg',
        descr: 'Wallpaper',
        outerBorders: [.01,"black",.006,"#ffec80",.01,"#65751d"]
    },
    {
        image: f1 + '10_ShoeSole.jpg',
        descr: 'Mathematical shoe sole',
        outerBorders: [.01,"black",.003,"#930e0f"]
    }

    
];

// Parameters: ( To use remove // before the line and change the value before the ; )

CGallery.canvasBackground = "#000"; // define the canvas backgroundcolor, IE 6 & 7 have problems with a transparent background. Default value = null

// CGallery.canvasBorder = 20, // inside border inside the canvas
// CGallery.activeImage = 0,   // The first image to show. 0 = the first image

// CGallery.arrowScale = 1,    // default = 1 = 100%, 2= 200%, ...
// CGallery.arrowSpacing = 10,  // space between image & arrow
// CGallery.arrowTransparency = 0.2,
// CGallery.arrowPosition = 0, // 0 = border, 1 = next to the image
// CGallery.arrowColor = "#000",
// CGallery.arrowBackColor = "#fff",

// CGallery.showFullScreenIcon = true,  // Can the viewer go to full screen mode?

// CGallery.textSize = "17px",
// CGallery.textColor = "#fff",
// CGallery.textBackground = "#fff",
// CGallery.textBoxHeight = 50,
// CGallery.textBoxTransparency = 0.25,
CGallery.defaultTitle = "\u00A9 Gunther Willems",
// CGallery.defaultDescription = "",
// CGallery.textPosition = "bottommiddle",  // none | top | middle | bottom | topmiddle | bottommiddle | free, if free set the value in textY
// CGallery.textAlways = false,  // if false, the text will show when the mousecursor is over the image
// CGallery.textY = -1,  // default value -1

// CGallery.outerBorders = [0.01,"white",0.01,"black",0.03,"white"],  // default border around the images. The number of borders is unlimited. Syntax: [size percent, color, size percent, color, ...], for no borders: []

// CGallery.showSlideshowIcon : true, //Can the viewer start/stop the slideshow?
// CGallery.autoSlideshow : false, // start the slideshow automatically
// CGallery.nextImageSpeed : 5000, // in milliseconds
CGallery.useImagesAsThumbs = true; // if no thumb is defined for an image, use the full image
CGallery.thumbSize = "40px"; // used if useImagesAsThumbs is true

// Initialize the gallery:
window.onload = CGallery.Init;