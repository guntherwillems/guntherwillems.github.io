/*

   Author: Gunther Willems
   Date: 05/2018 & 05/2019
   URL: https://GuntherWillems.com/blog/windowsize
   Description: Show the inner size of the webbrowser in pixels px and em
                It can be used to define where to use media queries in CSS

*/

window.onload = displayWindowSize_CreateDiv;
window.onresize = displayWindowSize;


function displayWindowSize() {
// Show webbrowser size in px and em
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    myWidth = window.innerWidth; myHeight = window.innerHeight;
  } 
  else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    myWidth = document.documentElement.clientWidth; myHeight = document.documentElement.clientHeight;
  }
  else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    myWidth = document.body.clientWidth; myHeight = document.body.clientHeight;
  }
  document.getElementById("showWindowSize").innerHTML = "px: " + myWidth + " x " + myHeight + " / em: " + (myWidth/16).toFixed(2) + " x " + (myHeight/16).toFixed(2);
}


function displayWindowSize_CreateDiv() {
// Create the DIV tag to write information onscreen
  myDiv = document.createElement("div");
  myDiv.id = "showWindowSize";

  document.body.appendChild(myDiv, document.body.firstChild);
  myDiv = document.getElementById("showWindowSize");
 
  myDiv.style.color = "black";
  myDiv.style.fontStyle = "italic";
  myDiv.style.textAlign = "left";
  myDiv.style.borderWidth = "1px";
  myDiv.style.borderStyle = "dashed";
  myDiv.style.borderRadius = "10px";
  myDiv.style.margin = "5px";
  myDiv.style.padding = "5px";
  myDiv.style.backgroundColor = "lightgrey";
  myDiv.style.position = "absolute";
  myDiv.style.top = "10px";
  myDiv.style.left = "10px";

  displayWindowSize();
 }