function changestyle( stylename )
// Change the style of the current html page. When changing to another page, the default stype is used again.
// Altered code from http://alistapart.com/stories/alternate/
 {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
   {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title"))
     {
      a.disabled = true;
      if(a.getAttribute("title") == stylename) a.disabled = false;
     }
   }
  
  /* create a cookie with the active stylename is not the default */
  if ( stylename == "default" )
    {
     eraseCookie("style");
    }
  else
    {
     createCookie( "style", stylename );
    }
 }
