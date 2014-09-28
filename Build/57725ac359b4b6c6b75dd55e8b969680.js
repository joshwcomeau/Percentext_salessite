/*
 * patternizer.js
 * v1.01
 * To see what this is capable of, see the UI at patternizer.com
 * 
 * Developed by Matthew Lein
 * matthewlein.com
 * 
 * Released under the MIT license.
 * Please leave this license and author info intact.
 * 
 * Copyright 2011
 */
var patternizer={supportsCanvas:function(){var t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))},isArray:function(t){return t&&!t.propertyIsEnumerable("length")&&"object"==typeof t&&"number"==typeof t.length},DEGREES_RADIANS:function(t){return t*Math.PI/180},HEX_RGBA:function(t,e){var r=parseInt(t.substring(1,3),16),n=parseInt(t.substring(3,5),16),a=parseInt(t.substring(5,7),16),i=e;return"rgba("+r+","+n+","+a+","+i+")"},stripe:function(t,e){var r=e.stripes,n=e.bg,a=t.getContext("2d"),i=t.width,o=t.height,s=Math.sqrt(i*i+o*o);a.fillStyle=n,a.fillRect(0,0,i,o);for(var l=r.length-1;l>=0;l--){var p=r[l],f=p.opacity/100||.5,u=patternizer.HEX_RGBA(p.color,f),c=p.mode||"normal",g=p.rotation||0,E=p.width,h=p.offset||0,v=p.gap||E,R=E+v,d=(2*s+h)/R;a.rotate(patternizer.DEGREES_RADIANS(g));for(var y=0;d>y;y++){if(patternizer.isArray(u)){for(var A=R*y+h,S=R*y+h+E,b=a.createLinearGradient(A,0,S,0),z=1/(u.length-1),I=0;I<u.length;I++)b.addColorStop(z*I,u[I]);a.fillStyle=b}else a.fillStyle=u;a.fillRect(-s+R*y-h,-s,E,2*s),"plaid"===c&&a.fillRect(-s,-s+R*y-h,2*s,E)}a.rotate(-patternizer.DEGREES_RADIANS(g))}}};patternizer.supportsCanvas&&(HTMLCanvasElement.prototype.patternizer=function(t){return patternizer.stripe(this,t),this});
;