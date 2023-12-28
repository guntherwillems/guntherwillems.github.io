var width=0,height=0,interval=67,precanvas=null,ctx=null,visibleCtx=null,angle=0,anglestep=.35,framecount=0,maxframes=2880,secondsCheck=3,maxfps=Math.ceil(1e3/interval)*secondsCheck,lastTime=new Date;function Init(){var e=document.getElementById("canvas");null!=e&&(visibleCtx=e.getContext("2d"),width=e.width,height=e.height,(precanvas=document.createElement("canvas")).width=width,precanvas.height=height,ctx=precanvas.getContext("2d"),rotateCog())}function rotateCog(){if(cog1(ctx,94.2,94.3,angle),visibleCtx.clearRect(0,0,width,height),visibleCtx.drawImage(precanvas,0,0),360<(angle+=anglestep)?angle-=360:angle<0&&(angle+=360),++framecount!=maxframes){if(framecount==maxfps){var e=new Date,r=Math.ceil(e.getTime()-lastTime.getTime());if(1e3*secondsCheck+200<r){5e3<r?r=5e3:r-=200;var i=r/(1e3*secondsCheck);interval=Math.ceil(interval*i),anglestep*=i}}setTimeout("rotateCog()",interval)}}function cog1(e,r,i,o){e.clearRect(0,0,width,height),e.save(),e.translate(r,i),e.rotate(o*(Math.PI/180)),e.beginPath(),e.moveTo(62.4,-58.6),e.lineTo(66.2,-62.1),e.bezierCurveTo(67.4,-63.3,67.5,-65.4,66.2,-66.8),e.bezierCurveTo(64.8,-68.1,62.6,-68,61.5,-66.8),e.lineTo(57.9,-63),e.bezierCurveTo(56.8,-61.7,54.8,-61.5,53.6,-62.6),e.bezierCurveTo(53.5,-62.7,53.4,-62.7,53.4,-62.8),e.bezierCurveTo(52.3,-63.9,52.2,-65.8,53.2,-67.1),e.lineTo(56.5,-71.1),e.bezierCurveTo(57.6,-72.5,57.2,-74.5,55.7,-75.6),e.bezierCurveTo(54.2,-76.7,52.1,-76.5,51.1,-75),e.lineTo(48.2,-70.8),e.bezierCurveTo(47.2,-69.3,45.4,-69,43.9,-69.8),e.lineTo(44.2,-69.5),e.bezierCurveTo(44.1,-69.6,44,-69.7,43.8,-69.8),e.lineTo(43.9,-69.8),e.bezierCurveTo(42.5,-70.6,42,-72.5,42.9,-74),e.lineTo(45.5,-78.5),e.bezierCurveTo(46.4,-80,45.8,-82,44.1,-83),e.bezierCurveTo(42.5,-83.9,40.4,-83.2,39.7,-81.6),e.lineTo(37.4,-77),e.bezierCurveTo(36.6,-75.4,34.8,-74.7,33.3,-75.4),e.lineTo(33.3,-75.4),e.bezierCurveTo(33.3,-75.4,33.2,-75.4,33.1,-75.5),e.bezierCurveTo(31.7,-76.2,31.1,-78,31.7,-79.6),e.lineTo(33.6,-84.4),e.bezierCurveTo(34.3,-86,33.4,-87.8,31.6,-88.5),e.bezierCurveTo(29.8,-89.1,27.9,-88.2,27.4,-86.5),e.lineTo(25.8,-81.6),e.bezierCurveTo(25.2,-79.9,23.6,-79.1,22,-79.5),e.lineTo(22.6,-79.2),e.bezierCurveTo(22.2,-79.3,21.9,-79.4,21.5,-79.5),e.lineTo(22,-79.4),e.bezierCurveTo(20.4,-79.8,19.4,-81.5,19.8,-83.2),e.lineTo(21,-88.3),e.bezierCurveTo(21.4,-90,20.2,-91.7,18.4,-92.1),e.bezierCurveTo(16.5,-92.6,14.7,-91.3,14.5,-89.6),e.lineTo(13.7,-84.5),e.bezierCurveTo(13.4,-82.7,11.8,-81.5,10.2,-81.7),e.lineTo(10.5,-81.7),e.bezierCurveTo(10.4,-81.7,10.3,-81.7,10.2,-81.7),e.bezierCurveTo(8.5,-82,7.3,-83.6,7.5,-85.3),e.lineTo(7.9,-90.4),e.bezierCurveTo(8.1,-92.2,6.7,-93.7,4.8,-93.8),e.bezierCurveTo(2.9,-93.8,1.3,-92.5,1.3,-90.7),e.lineTo(1.2,-85.5),e.bezierCurveTo(1.2,-83.8,-.2,-82.5,-1.8,-82.4),e.lineTo(-1.1,-82.3),e.bezierCurveTo(-1.5,-82.3,-1.9,-82.3,-2.3,-82.3),e.lineTo(-1.8,-82.3),e.bezierCurveTo(-3.5,-82.2,-4.9,-83.6,-5,-85.4),e.lineTo(-5.3,-90.5),e.bezierCurveTo(-5.4,-92.3,-7,-93.6,-8.9,-93.5),e.bezierCurveTo(-10.8,-93.3,-12.1,-91.6,-11.9,-89.9),e.lineTo(-11.2,-84.8),e.bezierCurveTo(-11,-83,-12.2,-81.4,-13.8,-81.2),e.lineTo(-13.3,-81.2),e.bezierCurveTo(-13.5,-81.2,-13.7,-81.2,-13.9,-81.1),e.lineTo(-13.8,-81.2),e.bezierCurveTo(-15.4,-81,-17,-82.1,-17.4,-83.8),e.lineTo(-18.4,-88.8),e.bezierCurveTo(-18.8,-90.6,-20.6,-91.6,-22.4,-91.1),e.bezierCurveTo(-24.3,-90.7,-25.4,-88.9,-24.9,-87.2),e.lineTo(-23.5,-82.3),e.bezierCurveTo(-23,-80.6,-23.9,-78.9,-25.5,-78.3),e.lineTo(-25,-78.4),e.bezierCurveTo(-25.2,-78.4,-25.4,-78.3,-25.6,-78.2),e.lineTo(-25.5,-78.3),e.bezierCurveTo(-27,-77.7,-28.8,-78.6,-29.4,-80.3),e.lineTo(-31.2,-85.1),e.bezierCurveTo(-31.7,-86.8,-33.7,-87.6,-35.5,-87),e.bezierCurveTo(-37.2,-86.2,-38,-84.2,-37.3,-82.6),e.lineTo(-35.2,-77.9),e.bezierCurveTo(-34.5,-76.3,-35.1,-74.5,-36.6,-73.8),e.lineTo(-36.3,-73.9),e.bezierCurveTo(-36.4,-73.8,-36.5,-73.8,-36.6,-73.7),e.bezierCurveTo(-38.1,-73.1,-40,-73.7,-40.8,-75.2),e.lineTo(-43.2,-79.7),e.bezierCurveTo(-44.1,-81.3,-46.1,-81.8,-47.7,-80.8),e.bezierCurveTo(-49.3,-79.8,-49.9,-77.8,-48.9,-76.4),e.lineTo(-46.1,-72),e.bezierCurveTo(-45.2,-70.5,-45.6,-68.7,-46.9,-67.6),e.lineTo(-46.7,-67.8),e.bezierCurveTo(-46.8,-67.7,-46.9,-67.6,-47,-67.6),e.bezierCurveTo(-48.3,-66.7,-50.2,-67,-51.2,-68.4),e.lineTo(-54.3,-72.5),e.bezierCurveTo(-55.4,-73.9,-57.5,-74.2,-59,-73),e.bezierCurveTo(-60.5,-71.8,-60.6,-69.7,-59.5,-68.4),e.lineTo(-56.1,-64.5),e.bezierCurveTo(-55,-63.2,-55,-61.4,-56.1,-60.2),e.bezierCurveTo(-56.2,-60.1,-56.4,-59.9,-56.5,-59.8),e.bezierCurveTo(-57.7,-58.9,-59.5,-59.1,-60.7,-60.2),e.lineTo(-64.4,-63.9),e.bezierCurveTo(-65.6,-65.1,-67.6,-65,-68.9,-63.6),e.bezierCurveTo(-70.2,-62.2,-70.1,-60.1,-68.8,-59),e.lineTo(-64.9,-55.6),e.bezierCurveTo(-63.5,-54.4,-63.4,-52.5,-64.4,-51.2),e.lineTo(-64.1,-51.6),e.bezierCurveTo(-64.3,-51.4,-64.4,-51.2,-64.6,-51),e.lineTo(-64.4,-51.2),e.bezierCurveTo(-65.4,-49.9,-67.3,-49.6,-68.7,-50.7),e.lineTo(-72.9,-53.8),e.bezierCurveTo(-74.3,-54.8,-76.3,-54.4,-77.5,-52.9),e.bezierCurveTo(-78.6,-51.4,-78.2,-49.3,-76.7,-48.3),e.lineTo(-72.3,-45.6),e.bezierCurveTo(-70.9,-44.7,-70.4,-42.9,-71,-41.6),e.bezierCurveTo(-71.1,-41.3,-71.2,-41.1,-71.4,-40.9),e.bezierCurveTo(-72.3,-39.8,-74,-39.4,-75.4,-40.2),e.lineTo(-80,-42.6),e.bezierCurveTo(-81.6,-43.5,-83.6,-42.8,-84.3,-41),e.bezierCurveTo(-85.1,-39.3,-84.5,-37.3,-82.9,-36.6),e.lineTo(-78.1,-34.5),e.bezierCurveTo(-76.5,-33.8,-75.8,-32,-76.5,-30.5),e.lineTo(-75.9,-31.6),e.bezierCurveTo(-76.2,-30.9,-76.4,-30.3,-76.7,-29.6),e.lineTo(-76.4,-30.5),e.bezierCurveTo(-77,-28.9,-78.8,-28.1,-80.4,-28.7),e.lineTo(-85.3,-30.5),e.bezierCurveTo(-86.9,-31.1,-88.8,-30.1,-89.4,-28.3),e.bezierCurveTo(-90.1,-26.5,-89,-24.6,-87.3,-24.2),e.lineTo(-82.3,-22.8),e.bezierCurveTo(-80.7,-22.3,-79.6,-20.6,-80,-19),e.bezierCurveTo(-80,-18.9,-80,-18.9,-80,-18.8),e.bezierCurveTo(-80.5,-17.3,-82.1,-16.4,-83.8,-16.7),e.lineTo(-88.9,-17.7),e.bezierCurveTo(-90.6,-18.1,-92.3,-16.9,-92.5,-15),e.bezierCurveTo(-92.8,-13.1,-91.6,-11.4,-89.9,-11.2),e.lineTo(-84.7,-10.5),e.bezierCurveTo(-83,-10.3,-81.8,-8.8,-82,-7.2),e.lineTo(-81.7,-8.5),e.bezierCurveTo(-81.8,-7.7,-81.9,-6.9,-81.9,-6.1),e.lineTo(-81.9,-7.1),e.bezierCurveTo(-82,-5.5,-83.5,-4.2,-85.2,-4.3),e.lineTo(-90.4,-4.6),e.bezierCurveTo(-92.2,-4.7,-93.6,-3.2,-93.7,-1.3),e.bezierCurveTo(-93.9,.6,-92.3,2.1,-90.5,2),e.lineTo(-85.4,1.9),e.bezierCurveTo(-83.6,1.9,-82.1,3.2,-82,4.9),e.lineTo(-82,4.7),e.bezierCurveTo(-82,4.8,-82,4.9,-82,5),e.bezierCurveTo(-82,6.6,-83.3,8,-85,8.2),e.lineTo(-90.2,8.7),e.bezierCurveTo(-92,8.8,-93.2,10.5,-92.9,12.3),e.bezierCurveTo(-92.6,14.2,-91,15.5,-89.2,15.2),e.lineTo(-84.1,14.4),e.bezierCurveTo(-82.4,14.1,-80.9,15.2,-80.5,16.8),e.lineTo(-80.6,15.9),e.bezierCurveTo(-80.5,16.4,-80.4,17,-80.3,17.5),e.lineTo(-80.5,16.8),e.bezierCurveTo(-80.1,18.4,-81.1,20,-82.8,20.5),e.lineTo(-87.9,21.7),e.bezierCurveTo(-89.6,22.1,-90.6,23.9,-90.1,25.8),e.bezierCurveTo(-89.7,27.6,-87.7,28.6,-86.1,28.1),e.lineTo(-81.2,26.5),e.bezierCurveTo(-79.5,25.9,-77.7,26.8,-77.1,28.3),e.lineTo(-77.2,28.3),e.bezierCurveTo(-77.1,28.4,-77.1,28.4,-77.1,28.5),e.bezierCurveTo(-76.7,30,-77.5,31.7,-79.1,32.4),e.lineTo(-83.9,34.3),e.bezierCurveTo(-85.5,35,-86.2,36.9,-85.4,38.6),e.bezierCurveTo(-84.6,40.3,-82.6,41.1,-81.1,40.3),e.lineTo(-76.4,38),e.bezierCurveTo(-74.8,37.2,-73.1,37.9,-72.2,39.3),e.lineTo(-72.5,38.8),e.bezierCurveTo(-72.3,39.1,-72.2,39.3,-72,39.6),e.lineTo(-72.2,39.3),e.bezierCurveTo(-71.4,40.7,-71.9,42.6,-73.4,43.5),e.lineTo(-77.9,46.1),e.bezierCurveTo(-79.4,47,-79.8,49,-78.9,50.7),e.bezierCurveTo(-77.9,52.3,-75.7,52.7,-74.3,51.7),e.lineTo(-70.1,48.8),e.bezierCurveTo(-68.7,47.8,-67,48,-65.9,49.1),e.bezierCurveTo(-65.8,49.3,-65.6,49.5,-65.4,49.7),e.bezierCurveTo(-64.8,51,-65.1,52.8,-66.3,53.8),e.lineTo(-70.4,57),e.bezierCurveTo(-71.8,58.1,-71.9,60.2,-70.6,61.6),e.bezierCurveTo(-69.3,63,-67.2,63.2,-66,62),e.lineTo(-62.2,58.4),e.bezierCurveTo(-60.9,57.2,-58.9,57.3,-57.8,58.5),e.lineTo(-58.5,57.7),e.bezierCurveTo(-58.3,57.9,-58.1,58.2,-57.8,58.4),e.bezierCurveTo(-57.7,58.6,-57.5,58.7,-57.4,58.8),e.lineTo(-57.8,58.5),e.bezierCurveTo(-56.6,59.6,-56.6,61.5,-57.7,62.8),e.lineTo(-61.3,66.6),e.bezierCurveTo(-62.5,67.9,-62.3,70,-60.9,71.2),e.bezierCurveTo(-59.5,72.5,-57.4,72.4,-56.3,71),e.lineTo(-53.1,66.9),e.bezierCurveTo(-52,65.6,-50.2,65.3,-48.8,66.1),e.bezierCurveTo(-48.6,66.3,-48.4,66.5,-48.2,66.6),e.bezierCurveTo(-47.2,67.7,-47.1,69.3,-48,70.6),e.lineTo(-50.9,74.9),e.bezierCurveTo(-51.9,76.3,-51.5,78.5,-49.9,79.4),e.bezierCurveTo(-48.2,80.4,-46.2,79.9,-45.3,78.4),e.lineTo(-42.7,73.9),e.bezierCurveTo(-41.8,72.4,-39.9,71.8,-38.5,72.7),e.lineTo(-39.2,72.2),e.bezierCurveTo(-38.9,72.4,-38.6,72.6,-38.3,72.8),e.lineTo(-38.5,72.7),e.bezierCurveTo(-37.1,73.5,-36.4,75.2,-37.2,76.8),e.lineTo(-39.5,81.5),e.bezierCurveTo(-40.2,83.1,-39.5,85,-37.7,85.8),e.bezierCurveTo(-36,86.6,-34.1,85.9,-33.4,84.2),e.lineTo(-31.5,79.4),e.bezierCurveTo(-30.9,77.8,-29,76.9,-27.5,77.5),e.lineTo(-27.6,77.4),e.bezierCurveTo(-27.4,77.5,-27.3,77.5,-27.2,77.6),e.bezierCurveTo(-25.8,78.2,-25.1,79.9,-25.6,81.5),e.lineTo(-27.2,86.4),e.bezierCurveTo(-27.7,88,-26.7,90,-24.8,90.4),e.bezierCurveTo(-23,90.9,-21.2,89.8,-20.8,88.1),e.lineTo(-19.6,83.1),e.bezierCurveTo(-19.2,81.4,-17.5,80.3,-15.9,80.7),e.lineTo(-17,80.4),e.bezierCurveTo(-16.5,80.5,-16,80.6,-15.4,80.7),e.lineTo(-15.9,80.7),e.bezierCurveTo(-14.3,81.1,-13.2,82.5,-13.5,84.3),e.lineTo(-14.3,89.4),e.bezierCurveTo(-14.6,91.2,-13.3,92.8,-11.4,93),e.bezierCurveTo(-9.5,93.3,-7.9,92.1,-7.7,90.3),e.lineTo(-7.3,85.2),e.bezierCurveTo(-7.1,83.4,-5.6,82,-4,82.1),e.lineTo(-4.2,82.1),e.bezierCurveTo(-4.1,82.1,-3.9,82.1,-3.8,82.1),e.bezierCurveTo(-2.2,82.3,-1,83.7,-1,85.4),e.lineTo(-1.1,90.6),e.bezierCurveTo(-1.1,92.3,.4,93.9,2.3,93.7),e.bezierCurveTo(4.2,93.7,5.6,92.2,5.5,90.4),e.lineTo(5.2,85.2),e.bezierCurveTo(5.1,83.5,6.4,82,8,81.9),e.lineTo(6.6,81.9),e.bezierCurveTo(7.4,81.9,8.1,81.8,8.8,81.7),e.lineTo(8,81.9),e.bezierCurveTo(9.7,81.7,11.2,82.9,11.4,84.6),e.lineTo(12.1,89.8),e.bezierCurveTo(12.3,91.5,14,92.7,15.9,92.4),e.bezierCurveTo(17.8,92.2,19,90.5,18.6,88.7),e.lineTo(17.6,83.6),e.bezierCurveTo(17.3,81.9,18.3,80.2,19.9,79.8),e.bezierCurveTo(20,79.8,20.1,79.8,20.2,79.7),e.bezierCurveTo(21.7,79.5,23.2,80.5,23.7,82.1),e.lineTo(25.1,87.1),e.bezierCurveTo(25.5,88.8,27.4,89.8,29.2,89.1),e.bezierCurveTo(31,88.5,32,86.7,31.4,85),e.lineTo(29.6,80.2),e.bezierCurveTo(29,78.5,29.8,76.7,31.3,76.2),e.lineTo(30.1,76.6),e.bezierCurveTo(30.7,76.3,31.4,76.1,32,75.8),e.lineTo(31.3,76.1),e.bezierCurveTo(32.8,75.5,34.6,76.2,35.4,77.8),e.lineTo(37.5,82.5),e.bezierCurveTo(38.2,84.1,40.2,84.8,41.9,84),e.bezierCurveTo(43.6,83.2,44.3,81.2,43.4,79.6),e.lineTo(41,75.1),e.bezierCurveTo(40.2,73.6,40.6,71.7,41.9,70.9),e.bezierCurveTo(42.1,70.7,42.3,70.6,42.5,70.5),e.bezierCurveTo(43.9,70,45.5,70.5,46.3,71.8),e.lineTo(49.1,76.2),e.bezierCurveTo(50.1,77.7,52.2,78.2,53.7,77),e.bezierCurveTo(55.2,75.8,55.6,73.8,54.5,72.4),e.lineTo(51.4,68.2),e.bezierCurveTo(50.4,66.8,50.6,64.9,51.9,63.9),e.lineTo(51.3,64.3),e.bezierCurveTo(51.6,64.2,51.8,64,52.1,63.8),e.lineTo(51.9,63.9),e.bezierCurveTo(53.2,62.9,55.1,63,56.3,64.3),e.lineTo(59.7,68.2),e.bezierCurveTo(60.8,69.6,62.9,69.6,64.3,68.3),e.bezierCurveTo(65.7,67,65.8,65,64.6,63.8),e.lineTo(60.9,60.1),e.bezierCurveTo(59.7,58.9,59.6,57,60.6,55.8),e.bezierCurveTo(60.7,55.6,60.9,55.4,61.1,55.2),e.bezierCurveTo(62.2,54.4,63.9,54.4,65.1,55.4),e.lineTo(69,58.8),e.bezierCurveTo(70.3,60,72.5,59.8,73.6,58.3),e.bezierCurveTo(74.8,56.8,74.5,54.7,73.1,53.6),e.lineTo(68.9,50.6),e.bezierCurveTo(67.5,49.5,67.2,47.6,68.2,46.2),e.lineTo(68,46.5),e.bezierCurveTo(68,46.4,68.1,46.3,68.2,46.2),e.bezierCurveTo(69.2,44.9,71,44.5,72.5,45.4),e.lineTo(76.9,48.2),e.bezierCurveTo(78.3,49.1,80.3,48.6,81.3,46.9),e.bezierCurveTo(82.3,45.3,81.8,43.3,80.2,42.5),e.lineTo(75.7,40),e.bezierCurveTo(74.1,39.2,73.5,37.4,74.2,35.8),e.lineTo(74,36.1),e.bezierCurveTo(74.1,36,74.2,35.8,74.2,35.7),e.bezierCurveTo(74.9,34.3,76.7,33.7,78.3,34.4),e.lineTo(83,36.5),e.bezierCurveTo(84.6,37.2,86.6,36.4,87.4,34.6),e.bezierCurveTo(88,32.8,87.2,30.9,85.5,30.3),e.lineTo(80.6,28.6),e.bezierCurveTo(79,28,78.1,26.2,78.6,24.7),e.lineTo(78.4,25.2),e.bezierCurveTo(78.5,25,78.5,24.8,78.6,24.5),e.lineTo(78.6,24.7),e.bezierCurveTo(79.2,23.1,80.8,22.2,82.5,22.6),e.lineTo(87.5,24),e.bezierCurveTo(89.2,24.5,90.9,23.4,91.4,21.5),e.bezierCurveTo(91.8,19.7,90.8,17.9,89.1,17.6),e.lineTo(84,16.6),e.bezierCurveTo(82.3,16.2,81.2,14.6,81.4,13),e.lineTo(81.2,13.5),e.bezierCurveTo(81.3,13.3,81.3,13.1,81.3,12.9),e.lineTo(81.3,13),e.bezierCurveTo(81.6,11.3,83.2,10.2,84.9,10.4),e.lineTo(90,11),e.bezierCurveTo(91.8,11.3,93.4,9.9,93.6,8),e.bezierCurveTo(93.7,6.1,92.4,4.5,90.6,4.4),e.lineTo(85.4,4.2),e.bezierCurveTo(83.7,4.1,82.3,2.7,82.4,1),e.lineTo(82.3,1.9),e.bezierCurveTo(82.3,1.4,82.3,1,82.4,.6),e.lineTo(82.4,1),e.bezierCurveTo(82.5,-.6,83.8,-2,85.5,-2.1),e.lineTo(90.7,-2.2),e.bezierCurveTo(92.5,-2.2,93.8,-3.8,93.7,-5.7),e.bezierCurveTo(93.6,-7.6,92.1,-9,90.4,-8.8),e.lineTo(85.2,-8.3),e.bezierCurveTo(83.5,-8.2,81.9,-9.4,81.7,-11),e.lineTo(81.7,-10.5),e.bezierCurveTo(81.7,-10.7,81.7,-10.8,81.6,-11),e.bezierCurveTo(81.4,-12.6,82.6,-14.2,84.3,-14.5),e.lineTo(89.4,-15.3),e.bezierCurveTo(91.1,-15.6,92.4,-17.4,92,-19.3),e.bezierCurveTo(91.5,-21.1,89.8,-22.3,88.1,-21.8),e.lineTo(83.1,-20.6),e.bezierCurveTo(81.3,-20.2,79.6,-21.2,79.2,-22.8),e.lineTo(79.4,-21.9),e.bezierCurveTo(79.3,-22.3,79.2,-22.7,79.1,-23.1),e.lineTo(79.2,-22.8),e.bezierCurveTo(78.9,-24.4,79.6,-26,81.4,-26.6),e.lineTo(86.3,-28.2),e.bezierCurveTo(88,-28.7,88.8,-30.6,88.2,-32.4),e.bezierCurveTo(87.5,-34.2,85.7,-35.1,84.1,-34.4),e.lineTo(79.3,-32.5),e.bezierCurveTo(77.7,-31.9,75.8,-32.5,75.1,-34),e.lineTo(75.1,-33.9),e.bezierCurveTo(75,-34.1,75,-34.2,74.9,-34.3),e.bezierCurveTo(74.4,-35.7,75.1,-37.4,76.6,-38.1),e.lineTo(81.3,-40.4),e.bezierCurveTo(82.8,-41.2,83.5,-43.3,82.6,-44.9),e.bezierCurveTo(81.6,-46.6,79.6,-47.2,78.1,-46.3),e.lineTo(73.6,-43.6),e.bezierCurveTo(72.1,-42.7,70.2,-43.2,69.4,-44.6),e.lineTo(69.6,-44.2),e.bezierCurveTo(69.5,-44.3,69.4,-44.5,69.3,-44.6),e.lineTo(69.3,-44.6),e.bezierCurveTo(68.5,-46,68.8,-47.9,70.3,-48.9),e.lineTo(74.5,-51.8),e.bezierCurveTo(76,-52.8,76.2,-54.9,75.1,-56.4),e.bezierCurveTo(74,-57.9,71.9,-58.3,70.6,-57.2),e.lineTo(66.6,-53.9),e.bezierCurveTo(65.2,-52.8,63.3,-53,62.1,-54.2),e.bezierCurveTo(62,-54.3,61.9,-54.4,61.8,-54.5),e.bezierCurveTo(61,-55.7,61.2,-57.4,62.4,-58.6),e.closePath(),e.moveTo(-15.4,-10),e.bezierCurveTo(-19.3,-3.9,-19.2,4,-15.3,10),e.lineTo(-55.9,51),e.bezierCurveTo(-82.1,22.4,-82.3,-21.7,-56.5,-50.6),e.lineTo(-15.4,-10),e.closePath(),e.moveTo(-9.8,15.4),e.bezierCurveTo(-3.7,19.3,4.1,19.3,10.1,15.3),e.lineTo(51.2,56),e.bezierCurveTo(22.6,82.1,-21.5,82.3,-50.4,56.5),e.lineTo(-9.8,15.4),e.closePath(),e.moveTo(15.6,9.8),e.bezierCurveTo(19.5,3.7,19.4,-4.1,15.5,-10.1),e.lineTo(56.1,-51.2),e.bezierCurveTo(82.3,-22.5,82.5,21.5,56.7,50.5),e.lineTo(15.6,9.8),e.closePath(),e.moveTo(10,-15.6),e.bezierCurveTo(3.9,-19.4,-3.9,-19.4,-9.9,-15.5),e.lineTo(-51,-56.1),e.bezierCurveTo(-22.4,-82.3,21.7,-82.5,50.6,-56.6),e.lineTo(10,-15.6),e.closePath(),e.lineJoin="miter",e.miterLimit=4,e.lineWidth=1.2,e.stroke(),e.beginPath(),e.moveTo(-8.2,2.3),e.bezierCurveTo(-9.4,-2.3,-6.7,-7,-2.2,-8.2),e.bezierCurveTo(2.4,-9.5,7.2,-6.8,8.4,-2.2),e.bezierCurveTo(9.7,2.4,6.9,7.1,2.4,8.4),e.bezierCurveTo(-2.2,9.6,-7,6.9,-8.2,2.3),e.closePath(),e.lineJoin="miter",e.miterLimit=1,e.stroke(),e.beginPath(),e.moveTo(-1.6,.5),e.bezierCurveTo(-1.9,-.4,-1.3,-1.4,-.4,-1.7),e.bezierCurveTo(.6,-2,1.6,-1.4,1.8,-.4),e.bezierCurveTo(2.1,.5,1.5,1.5,.6,1.8),e.bezierCurveTo(-.4,2.1,-1.4,1.5,-1.6,.5),e.closePath(),e.stroke(),e.restore()}window.onload=Init;