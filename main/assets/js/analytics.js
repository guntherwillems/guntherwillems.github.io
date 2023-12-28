// Google Analytics
  if ( window.location.href.substring(0,4) == "http" && window.location.href.indexOf('localhost') == -1 && window.location.href.indexOf('will.local') == -1 && window.location.href.indexOf('intran') == -1)
  // do not start Google analytics if used locally or for testing
  {
   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-24247197-2']);
   _gaq.push(['_trackPageview']);

   (function() {
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();
  }
// Google Analytics