/* <?xml version="1.0" encoding="UTF-8"?>  may not be used for IE6 for document.documentElement.clientWidth to work !! */

var windowWidth = 777;
if( typeof( window.innerWidth ) == 'number' )
  {
   //Not IE
   windowWidth = window.innerWidth;
  } 
else if (document.documentElement && document.documentElement.clientWidth != 0)
  {
   windowWidth = document.documentElement.clientWidth;
  }
else if (document.body)
  {
    windowWidth = document.body.clientWidth;
  }

/* Change document stylesheet if windows size bigger than 900 */

if ( windowWidth > 900 )
  {
   changestyle( "defaultBig" ); /* function defined in changestyle.js */
  }
