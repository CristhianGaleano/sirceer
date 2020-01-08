/**
svg2pdf.js
The MIT License (MIT)
Copyright (c) 2015-2016 yWorks GmbH
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * RGBColor.js: A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.svg2pdf=t()}}(function(){var t;return function t(e,r,a){function i(s,o){if(!r[s]){if(!e[s]){var u="function"==typeof require&&require;if(!o&&u)return u(s,!0);if(n)return n(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var h=r[s]={exports:{}};e[s][0].call(h.exports,function(t){var r=e[s][1][t];return i(r?r:t)},h,h.exports,t,e,r,a)}return r[s].exports}for(var n="function"==typeof require&&require,s=0;s<a.length;s++)i(a[s]);return i}({1:[function(t,e,r){"use strict";e.exports=t("./lib/svgpath")},{"./lib/svgpath":6}],2:[function(t,e,r){"use strict";function a(t,e,r,a){var i=t*a-e*r<0?-1:1,n=Math.sqrt(t*t+e*e),s=Math.sqrt(t*t+e*e),o=t*r+e*a,u=o/(n*s);return u>1&&(u=1),u<-1&&(u=-1),i*Math.acos(u)}function i(t,e,r,i,n,o,u,c,h,f){var l=f*(t-r)/2+h*(e-i)/2,d=-h*(t-r)/2+f*(e-i)/2,g=u*u,p=c*c,b=l*l,x=d*d,m=g*p-g*x-p*b;m<0&&(m=0),m/=g*x+p*b,m=Math.sqrt(m)*(n===o?-1:1);var v=m*u/c*d,y=m*-c/u*l,A=f*v-h*y+(t+r)/2,k=h*v+f*y+(e+i)/2,w=(l-v)/u,M=(d-y)/c,F=(-l-v)/u,C=(-d-y)/c,S=a(1,0,w,M),I=a(w,M,F,C);return 0===o&&I>0&&(I-=s),1===o&&I<0&&(I+=s),[A,k,S,I]}function n(t,e){var r=4/3*Math.tan(e/4),a=Math.cos(t),i=Math.sin(t),n=Math.cos(t+e),s=Math.sin(t+e);return[a,i,a-i*r,i+a*r,n+s*r,s-n*r,n,s]}var s=2*Math.PI;e.exports=function(t,e,r,a,o,u,c,h,f){var l=Math.sin(f*s/360),d=Math.cos(f*s/360),g=d*(t-r)/2+l*(e-a)/2,p=-l*(t-r)/2+d*(e-a)/2;if(0===g&&0===p)return[];if(0===c||0===h)return[];c=Math.abs(c),h=Math.abs(h);var b=g*g/(c*c)+p*p/(h*h);b>1&&(c*=Math.sqrt(b),h*=Math.sqrt(b));var x=i(t,e,r,a,o,u,c,h,l,d),m=[],v=x[2],y=x[3],A=Math.max(Math.ceil(Math.abs(y)/(s/4)),1);y/=A;for(var k=0;k<A;k++)m.push(n(v,y)),v+=y;return m.map(function(t){for(var e=0;e<t.length;e+=2){var r=t[e+0],a=t[e+1];r*=c,a*=h;var i=d*r-l*a,n=l*r+d*a;t[e+0]=i+x[0],t[e+1]=n+x[1]}return t})}},{}],3:[function(t,e,r){"use strict";function a(t,e,r){return this instanceof a?(this.rx=t,this.ry=e,void(this.ax=r)):new a(t,e,r)}var i=1e-10,n=Math.PI/180;a.prototype.transform=function(t){var e=Math.cos(this.ax*n),r=Math.sin(this.ax*n),a=[this.rx*(t[0]*e+t[2]*r),this.rx*(t[1]*e+t[3]*r),this.ry*(-t[0]*r+t[2]*e),this.ry*(-t[1]*r+t[3]*e)],s=a[0]*a[0]+a[2]*a[2],o=a[1]*a[1]+a[3]*a[3],u=((a[0]-a[3])*(a[0]-a[3])+(a[2]+a[1])*(a[2]+a[1]))*((a[0]+a[3])*(a[0]+a[3])+(a[2]-a[1])*(a[2]-a[1])),c=(s+o)/2;if(u<i*c)return this.rx=this.ry=Math.sqrt(c),this.ax=0,this;var h=a[0]*a[1]+a[2]*a[3];u=Math.sqrt(u);var f=c+u/2,l=c-u/2;return this.ax=Math.abs(h)<i&&Math.abs(f-o)<i?90:180*Math.atan(Math.abs(h)>Math.abs(f-o)?(f-s)/h:h/(f-o))/Math.PI,this.ax>=0?(this.rx=Math.sqrt(f),this.ry=Math.sqrt(l)):(this.ax+=90,this.rx=Math.sqrt(l),this.ry=Math.sqrt(f)),this},a.prototype.isDegenerate=function(){return this.rx<i*this.ry||this.ry<i*this.rx},e.exports=a},{}],4:[function(t,e,r){"use strict";function a(t,e){return[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1],t[0]*e[2]+t[2]*e[3],t[1]*e[2]+t[3]*e[3],t[0]*e[4]+t[2]*e[5]+t[4],t[1]*e[4]+t[3]*e[5]+t[5]]}function i(){return this instanceof i?(this.queue=[],void(this.cache=null)):new i}i.prototype.matrix=function(t){return 1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]?this:(this.cache=null,this.queue.push(t),this)},i.prototype.translate=function(t,e){return 0===t&&0===e||(this.cache=null,this.queue.push([1,0,0,1,t,e])),this},i.prototype.scale=function(t,e){return 1===t&&1===e||(this.cache=null,this.queue.push([t,0,0,e,0,0])),this},i.prototype.rotate=function(t,e,r){var a,i,n;return 0!==t&&(this.translate(e,r),a=t*Math.PI/180,i=Math.cos(a),n=Math.sin(a),this.queue.push([i,n,-n,i,0,0]),this.cache=null,this.translate(-e,-r)),this},i.prototype.skewX=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,0,Math.tan(t*Math.PI/180),1,0,0])),this},i.prototype.skewY=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,Math.tan(t*Math.PI/180),0,1,0,0])),this},i.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],1===this.queue.length)return this.cache;for(var t=1;t<this.queue.length;t++)this.cache=a(this.cache,this.queue[t]);return this.cache},i.prototype.calc=function(t,e,r){var a;return this.queue.length?(this.cache||(this.cache=this.toArray()),a=this.cache,[t*a[0]+e*a[2]+(r?0:a[4]),t*a[1]+e*a[3]+(r?0:a[5])]):[t,e]},e.exports=i},{}],5:[function(t,e,r){"use strict";function a(t){return 10===t||13===t||8232===t||8233===t||32===t||9===t||11===t||12===t||160===t||t>=5760&&d.indexOf(t)>=0}function i(t){switch(32|t){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function n(t){return t>=48&&t<=57}function s(t){return t>=48&&t<=57||43===t||45===t||46===t}function o(t){this.index=0,this.path=t,this.max=t.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function u(t){for(;t.index<t.max&&a(t.path.charCodeAt(t.index));)t.index++}function c(t){var e,r=t.index,a=r,i=t.max,s=!1,o=!1,u=!1,c=!1;if(a>=i)return void(t.err="SvgPath: missed param (at pos "+a+")");if(e=t.path.charCodeAt(a),43!==e&&45!==e||(a++,e=a<i?t.path.charCodeAt(a):0),!n(e)&&46!==e)return void(t.err="SvgPath: param should start with 0..9 or `.` (at pos "+a+")");if(46!==e){if(s=48===e,a++,e=a<i?t.path.charCodeAt(a):0,s&&a<i&&e&&n(e))return void(t.err="SvgPath: numbers started with `0` such as `09` are ilegal (at pos "+r+")");for(;a<i&&n(t.path.charCodeAt(a));)a++,o=!0;e=a<i?t.path.charCodeAt(a):0}if(46===e){for(c=!0,a++;n(t.path.charCodeAt(a));)a++,u=!0;e=a<i?t.path.charCodeAt(a):0}if(101===e||69===e){if(c&&!o&&!u)return void(t.err="SvgPath: invalid float exponent (at pos "+a+")");if(a++,e=a<i?t.path.charCodeAt(a):0,43!==e&&45!==e||a++,!(a<i&&n(t.path.charCodeAt(a))))return void(t.err="SvgPath: invalid float exponent (at pos "+a+")");for(;a<i&&n(t.path.charCodeAt(a));)a++}t.index=a,t.param=parseFloat(t.path.slice(r,a))+0}function h(t){var e,r;e=t.path[t.segmentStart],r=e.toLowerCase();var a=t.data;if("m"===r&&a.length>2&&(t.result.push([e,a[0],a[1]]),a=a.slice(2),r="l",e="m"===e?"l":"L"),"r"===r)t.result.push([e].concat(a));else for(;a.length>=l[r]&&(t.result.push([e].concat(a.splice(0,l[r]))),l[r]););}function f(t){var e,r,a,n,o=t.max;if(t.segmentStart=t.index,e=t.path.charCodeAt(t.index),!i(e))return void(t.err="SvgPath: bad command "+t.path[t.index]+" (at pos "+t.index+")");if(a=l[t.path[t.index].toLowerCase()],t.index++,u(t),t.data=[],!a)return void h(t);for(r=!1;;){for(n=a;n>0;n--){if(c(t),t.err.length)return;t.data.push(t.param),u(t),r=!1,t.index<o&&44===t.path.charCodeAt(t.index)&&(t.index++,u(t),r=!0)}if(!r){if(t.index>=t.max)break;if(!s(t.path.charCodeAt(t.index)))break}}h(t)}var l={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},d=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];e.exports=function(t){var e=new o(t),r=e.max;for(u(e);e.index<r&&!e.err.length;)f(e);return e.err.length?e.result=[]:e.result.length&&("mM".indexOf(e.result[0][0])<0?(e.err="SvgPath: string should start with `M` or `m`",e.result=[]):e.result[0][0]="M"),{err:e.err,segments:e.result}}},{}],6:[function(t,e,r){"use strict";function a(t){if(!(this instanceof a))return new a(t);var e=i(t);this.segments=e.segments,this.err=e.err,this.__stack=[]}var i=t("./path_parse"),n=t("./transform_parse"),s=t("./matrix"),o=t("./a2c"),u=t("./ellipse");a.prototype.__matrix=function(t){var e,r=this;t.queue.length&&this.iterate(function(a,i,n,s){var o,c,h,f;switch(a[0]){case"v":o=t.calc(0,a[1],!0),c=0===o[0]?["v",o[1]]:["l",o[0],o[1]];break;case"V":o=t.calc(n,a[1],!1),c=o[0]===t.calc(n,s,!1)[0]?["V",o[1]]:["L",o[0],o[1]];break;case"h":o=t.calc(a[1],0,!0),c=0===o[1]?["h",o[0]]:["l",o[0],o[1]];break;case"H":o=t.calc(a[1],s,!1),c=o[1]===t.calc(n,s,!1)[1]?["H",o[0]]:["L",o[0],o[1]];break;case"a":case"A":var l=t.toArray(),d=u(a[1],a[2],a[3]).transform(l);if(l[0]*l[3]-l[1]*l[2]<0&&(a[5]=a[5]?"0":"1"),o=t.calc(a[6],a[7],"a"===a[0]),"A"===a[0]&&a[6]===n&&a[7]===s||"a"===a[0]&&0===a[6]&&0===a[7]){c=["a"===a[0]?"l":"L",o[0],o[1]];break}c=d.isDegenerate()?["a"===a[0]?"l":"L",o[0],o[1]]:[a[0],d.rx,d.ry,d.ax,a[4],a[5],o[0],o[1]];break;case"m":f=i>0,o=t.calc(a[1],a[2],f),c=["m",o[0],o[1]];break;default:for(h=a[0],c=[h],f=h.toLowerCase()===h,e=1;e<a.length;e+=2)o=t.calc(a[e],a[e+1],f),c.push(o[0],o[1])}r.segments[i]=c},!0)},a.prototype.__evaluateStack=function(){var t,e;if(this.__stack.length){if(1===this.__stack.length)return this.__matrix(this.__stack[0]),void(this.__stack=[]);for(t=s(),e=this.__stack.length;--e>=0;)t.matrix(this.__stack[e].toArray());this.__matrix(t),this.__stack=[]}},a.prototype.toString=function(){var t,e,r=[];this.__evaluateStack();for(var a=0;a<this.segments.length;a++)e=this.segments[a][0],t=a>0&&"m"!==e&&"M"!==e&&e===this.segments[a-1][0],r=r.concat(t?this.segments[a].slice(1):this.segments[a]);return r.join(" ").replace(/ ?([achlmqrstvz]) ?/gi,"$1").replace(/ \-/g,"-").replace(/zm/g,"z m")},a.prototype.translate=function(t,e){return this.__stack.push(s().translate(t,e||0)),this},a.prototype.scale=function(t,e){return this.__stack.push(s().scale(t,e||0===e?e:t)),this},a.prototype.rotate=function(t,e,r){return this.__stack.push(s().rotate(t,e||0,r||0)),this},a.prototype.skewX=function(t){return this.__stack.push(s().skewX(t)),this},a.prototype.skewY=function(t){return this.__stack.push(s().skewY(t)),this},a.prototype.matrix=function(t){return this.__stack.push(s().matrix(t)),this},a.prototype.transform=function(t){return t.trim()?(this.__stack.push(n(t)),this):this},a.prototype.round=function(t){var e,r=0,a=0,i=0,n=0;return t=t||0,this.__evaluateStack(),this.segments.forEach(function(s){var o=s[0].toLowerCase()===s[0];switch(s[0]){case"H":case"h":return o&&(s[1]+=i),i=s[1]-s[1].toFixed(t),void(s[1]=+s[1].toFixed(t));case"V":case"v":return o&&(s[1]+=n),n=s[1]-s[1].toFixed(t),void(s[1]=+s[1].toFixed(t));case"Z":case"z":return i=r,void(n=a);case"M":case"m":return o&&(s[1]+=i,s[2]+=n),i=s[1]-s[1].toFixed(t),n=s[2]-s[2].toFixed(t),r=i,a=n,s[1]=+s[1].toFixed(t),void(s[2]=+s[2].toFixed(t));case"A":case"a":return o&&(s[6]+=i,s[7]+=n),i=s[6]-s[6].toFixed(t),n=s[7]-s[7].toFixed(t),s[1]=+s[1].toFixed(t),s[2]=+s[2].toFixed(t),s[3]=+s[3].toFixed(t+2),s[6]=+s[6].toFixed(t),void(s[7]=+s[7].toFixed(t));default:return e=s.length,o&&(s[e-2]+=i,s[e-1]+=n),i=s[e-2]-s[e-2].toFixed(t),n=s[e-1]-s[e-1].toFixed(t),void s.forEach(function(e,r){r&&(s[r]=+s[r].toFixed(t))})}}),this},a.prototype.iterate=function(t,e){var r,a,i,n=this.segments,s={},o=!1,u=0,c=0,h=0,f=0;if(e||this.__evaluateStack(),n.forEach(function(e,r){var a=t(e,r,u,c);Array.isArray(a)&&(s[r]=a,o=!0);var i=e[0]===e[0].toLowerCase();switch(e[0]){case"m":case"M":return u=e[1]+(i?u:0),c=e[2]+(i?c:0),h=u,void(f=c);case"h":case"H":return void(u=e[1]+(i?u:0));case"v":case"V":return void(c=e[1]+(i?c:0));case"z":case"Z":return u=h,void(c=f);default:u=e[e.length-2]+(i?u:0),c=e[e.length-1]+(i?c:0)}}),!o)return this;for(i=[],r=0;r<n.length;r++)if("undefined"!=typeof s[r])for(a=0;a<s[r].length;a++)i.push(s[r][a]);else i.push(n[r]);return this.segments=i,this},a.prototype.abs=function(){return this.iterate(function(t,e,r,a){var i,n=t[0],s=n.toUpperCase();if(n!==s)switch(t[0]=s,n){case"v":return void(t[1]+=a);case"a":return t[6]+=r,void(t[7]+=a);default:for(i=1;i<t.length;i++)t[i]+=i%2?r:a}},!0),this},a.prototype.rel=function(){return this.iterate(function(t,e,r,a){var i,n=t[0],s=n.toLowerCase();if(n!==s&&(0!==e||"M"!==n))switch(t[0]=s,n){case"V":return void(t[1]-=a);case"A":return t[6]-=r,void(t[7]-=a);default:for(i=1;i<t.length;i++)t[i]-=i%2?r:a}},!0),this},a.prototype.unarc=function(){return this.iterate(function(t,e,r,a){var i,n,s,u=[],c=t[0];return"A"!==c&&"a"!==c?null:("a"===c?(n=r+t[6],s=a+t[7]):(n=t[6],s=t[7]),i=o(r,a,n,s,t[4],t[5],t[1],t[2],t[3]),0===i.length?[["a"===t[0]?"l":"L",t[6],t[7]]]:(i.forEach(function(t){u.push(["C",t[2],t[3],t[4],t[5],t[6],t[7]])}),u))}),this},a.prototype.unshort=function(){var t,e,r,a,i,n=this.segments;return this.iterate(function(s,o,u,c){var h,f=s[0],l=f.toUpperCase();o&&("T"===l?(h="t"===f,r=n[o-1],"Q"===r[0]?(t=r[1]-u,e=r[2]-c):"q"===r[0]?(t=r[1]-r[3],e=r[2]-r[4]):(t=0,e=0),a=-t,i=-e,h||(a+=u,i+=c),n[o]=[h?"q":"Q",a,i,s[1],s[2]]):"S"===l&&(h="s"===f,r=n[o-1],"C"===r[0]?(t=r[3]-u,e=r[4]-c):"c"===r[0]?(t=r[3]-r[5],e=r[4]-r[6]):(t=0,e=0),a=-t,i=-e,h||(a+=u,i+=c),n[o]=[h?"c":"C",a,i,s[1],s[2],s[3],s[4]]))}),this},e.exports=a},{"./a2c":2,"./ellipse":3,"./matrix":4,"./path_parse":5,"./transform_parse":7}],7:[function(t,e,r){"use strict";var a=t("./matrix"),i={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},n=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,s=/[\s,]+/;e.exports=function(t){var e,r,o=new a;return t.split(n).forEach(function(t){if(t.length){if("undefined"!=typeof i[t])return void(e=t);switch(r=t.split(s).map(function(t){return+t||0}),e){case"matrix":return void(6===r.length&&o.matrix(r));case"scale":return void(1===r.length?o.scale(r[0],r[0]):2===r.length&&o.scale(r[0],r[1]));case"rotate":return void(1===r.length?o.rotate(r[0],0,0):3===r.length&&o.rotate(r[0],r[1],r[2]));case"translate":return void(1===r.length?o.translate(r[0],0):2===r.length&&o.translate(r[0],r[1]));case"skewX":return void(1===r.length&&o.skewX(r[0]));case"skewY":return void(1===r.length&&o.skewY(r[0]))}}}),o}},{"./matrix":4}],8:[function(e,r,a){!function(e){function a(t){this.ok=!1,"#"==t.charAt(0)&&(t=t.substr(1,6)),t=t.replace(/ /g,""),t=t.toLowerCase();var e={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};for(var r in e)t==r&&(t=e[r]);for(var i=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(t){return[parseInt(t[1]),parseInt(t[2]),parseInt(t[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}}],n=0;n<i.length;n++){var s=i[n].re,o=i[n].process,u=s.exec(t);if(u){var c=o(u);this.r=c[0],this.g=c[1],this.b=c[2],this.ok=!0}}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r,this.g=this.g<0||isNaN(this.g)?0:this.g>255?255:this.g,this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b,this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},this.toHex=function(){var t=this.r.toString(16),e=this.g.toString(16),r=this.b.toString(16);return 1==t.length&&(t="0"+t),1==e.length&&(e="0"+e),1==r.length&&(r="0"+r),"#"+t+e+r},this.getHelpXML=function(){for(var t=new Array,r=0;r<i.length;r++)for(var n=i[r].example,s=0;s<n.length;s++)t[t.length]=n[s];for(var o in e)t[t.length]=o;var u=document.createElement("ul");u.setAttribute("id","rgbcolor-examples");for(var r=0;r<t.length;r++)try{var c=document.createElement("li"),h=new a(t[r]),f=document.createElement("div");f.style.cssText="margin: 3px; border: 1px solid black; background:"+h.toHex()+"; color:"+h.toHex(),f.appendChild(document.createTextNode("test"));var l=document.createTextNode(" "+t[r]+" -> "+h.toRGB()+" -> "+h.toHex());c.appendChild(f),c.appendChild(l),u.appendChild(c)}catch(t){}return u}}return"function"==typeof t&&t.amd?t(function(){return a}):"undefined"!=typeof r&&r.exports?r.exports=a:e.RGBColor=a,a}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this)},{}],9:[function(e,r,a){!function(a){function i(t,e){var r=f(t,"font-family");r&&o.setFont(r),e&&e.ok&&o.setTextColor(e.r,e.g,e.b);var a,i=f(t,"font-weight");i&&"bold"===i&&(a="bold");var n=f(t,"font-style");n&&"italic"===n&&(a+="italic"),o.setFontType(a);var s=16,u=f(t,"font-size");u&&(s=parseFloat(u),o.setFontSize(s))}var n,s,o,u=2/3,c=/url\(#([^)]+)\)/,h=function(t){var e=t.pathSegList;if(e)return e;e=[];var r=t.getAttribute("d");s&&(r=s(r).unshort().unarc().abs().toString());for(var a,i=/([a-df-zA-DF-Z])([^a-df-zA-DF-Z]*)/g;a=i.exec(r);){var n=F(a[2]),o=a[1],u="zZ".indexOf(o)>=0?0:"hHvV".indexOf(o)>=0?1:"mMlLtT".indexOf(o)>=0?2:"sSqQ".indexOf(o)>=0?4:"aA".indexOf(o)>=0?7:"cC".indexOf(o)>=0?6:-1,c=0;do{var h={pathSegTypeAsLetter:o};switch(o){case"h":case"H":h.x=n[c];break;case"v":case"V":h.y=n[c];break;case"c":case"C":h.x1=n[c+u-6],h.y1=n[c+u-5];case"s":case"S":h.x2=n[c+u-4],h.y2=n[c+u-3];case"t":case"T":case"l":case"L":case"m":case"M":h.x=n[c+u-2],h.y=n[c+u-1];break;case"q":case"Q":h.x1=n[c],h.y1=n[c+1],h.x=n[c+2],h.y=n[c+3];break;case"a":case"A":throw new Error("Cannot convert Arcs without SvgPath package")}e.push(h),c+=u}while(c<n.length)}return e.getItem=function(t){return this[t]},e.numberOfItems=e.length,e},f=function(t,e,r){return r=r||e,t.getAttribute(e)||t.style[r]},l=function(t,e){return e.split(",").indexOf(t.tagName.toLowerCase())>=0},d=function(t,e){for(var r=[],a=0;a<t.childNodes.length;a++){var i=t.childNodes[a];"#"!==i.nodeName.charAt(0)&&r.push(i)}for(a=0;a<r.length;a++)e(a,r[a])},g=function(t,e){return Math.atan2(e[1]-t[1],e[0]-t[0])},p=function(t,e){var r=e[0]-t[0],a=e[1]-t[1];return[t[0]+2*r,t[1]+2*a]},b=function(t,e){return[u*(e[0]-t[0])+t[0],u*(e[1]-t[1])+t[1]]},x=function(t,e,r,a,i){var n,s=r.getItem(t-1);return n=t>0&&("C"===s.pathSegTypeAsLetter||"S"===s.pathSegTypeAsLetter)?p([s.x2,s.y2],e):t>0&&("c"===s.pathSegTypeAsLetter||"s"===s.pathSegTypeAsLetter)?p([s.x2+a,s.y2+i],e):[e[0],e[1]]},m=function(t){this.prefix=t,this.id=0,this.nextChild=function(){return new m("_"+this.id++ +"_"+this.get())},this.get=function(){return this.prefix}},v=function(t,e){for(var r=/_\d+_/;!e[t]&&r.exec(t);)t=t.replace(r,"");return e[t]},y=function(t){return t.replace(/[\n\s\r]+/," ").trim()},A=function(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},k=function(t){var e,r,a,i,n,s,u,c,h=o.unitMatrix;if(l(t,"svg,g"))c=parseFloat(t.getAttribute("x"))||0,u=parseFloat(t.getAttribute("y"))||0,s=t.getAttribute("viewBox"),s?(n=F(s),i=n[2]-n[0],a=n[3]-n[1],r=parseFloat(t.getAttribute("width"))||i,e=parseFloat(t.getAttribute("height"))||a,h=new o.Matrix(r/i,0,0,e/a,c-n[0],u-n[1])):h=new o.Matrix(1,0,0,1,c,u);else if(l(t,"marker"))if(c=-parseFloat(t.getAttribute("refX"))||0,u=-parseFloat(t.getAttribute("refY"))||0,s=t.getAttribute("viewBox")){n=F(s),i=n[2]-n[0],a=n[3]-n[1],r=parseFloat(t.getAttribute("markerWidth"))||i,e=parseFloat(t.getAttribute("markerHeight"))||a;var f=new o.Matrix(r/i,0,0,e/a,0,0),d=new o.Matrix(1,0,0,1,c,u);h=o.matrixMult(d,f)}else h=new o.Matrix(1,0,0,1,c,u);var g=t.getAttribute("transform");return g?o.matrixMult(h,M(g)):h},w=function(t){for(var e=F(t),r=[],a=0;a<e.length-1;a+=2){var i=e[a],n=e[a+1];r.push([i,n])}return r},M=function(t){if(!t)return o.unitMatrix;for(var e,r=/^\s*matrix\(([^\)]+)\)\s*/,a=/^\s*translate\(([^\)]+)\)\s*/,i=/^\s*rotate\(([^\)]+)\)\s*/,n=/^\s*scale\(([^\)]+)\)\s*/,s=/^\s*skewX\(([^\)]+)\)\s*/,u=/^\s*skewY\(([^\)]+)\)\s*/,c=o.unitMatrix;t.length>0;){var h=r.exec(t);if(h&&(e=F(h[1]),c=o.matrixMult(new o.Matrix(e[0],e[1],e[2],e[3],e[4],e[5]),c),t=t.substr(h[0].length)),h=i.exec(t)){e=F(h[1]);var f=Math.PI*e[0]/180;if(c=o.matrixMult(new o.Matrix(Math.cos(f),Math.sin(f),-Math.sin(f),Math.cos(f),0,0),c),e[1]&&e[2]){var l=new o.Matrix(1,0,0,1,e[1],e[2]),d=new o.Matrix(1,0,0,1,-e[1],-e[2]);c=o.matrixMult(d,o.matrixMult(c,l))}t=t.substr(h[0].length)}h=a.exec(t),h&&(e=F(h[1]),c=o.matrixMult(new o.Matrix(1,0,0,1,e[0],e[1]||0),c),t=t.substr(h[0].length)),h=n.exec(t),h&&(e=F(h[1]),e[1]||(e[1]=e[0]),c=o.matrixMult(new o.Matrix(e[0],0,0,e[1],0,0),c),t=t.substr(h[0].length)),h=s.exec(t),h&&(e=parseFloat(h[1]),c=o.matrixMult(new o.Matrix(1,0,Math.tan(e),1,0,0),c),t=t.substr(h[0].length)),h=u.exec(t),h&&(e=parseFloat(h[1]),c=o.matrixMult(new o.Matrix(1,Math.tan(e),0,1,0,0),c),t=t.substr(h[0].length))}return c},F=function(t){for(var e,r=[],a=/[+-]?(?:(?:\d+\.?\d*)|(?:\d*\.?\d+))(?:[eE][+-]?\d+)?/g;e=a.exec(t);)r.push(parseFloat(e[0]));return r},C=function(t){var e=/\s*rgba\(((?:[^,\)]*,){3}[^,\)]*)\)\s*/.exec(t);if(e){var r=F(e[1]),a=new n("rgb("+r.slice(0,3).join(",")+")");return a.a=r[3],a}return new n(t)},S=function(t,e){var r=t[0],a=t[1];return[e.a*r+e.c*a+e.e,e.b*r+e.d*a+e.f]},I=function(t){var e,r,a,i,n,s,o,u,c=parseFloat;if(l(t,"polygon")){var g=w(t.getAttribute("points"));for(r=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY,n=Number.NEGATIVE_INFINITY,e=0;e<g.length;e++){var p=g[e];r=Math.min(r,p[0]),i=Math.max(i,p[0]),a=Math.min(a,p[1]),n=Math.max(n,p[1])}u=[r,a,i-r,n-a]}else if(l(t,"path")){var m=h(t);r=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY,n=Number.NEGATIVE_INFINITY;var v,y,A,k,M,C,S,_=0,T=0;for(e=0;e<m.numberOfItems;e++){var q=m.getItem(e),L=q.pathSegTypeAsLetter;switch(L){case"H":A=q.x,k=T;break;case"h":A=q.x+_,k=T;break;case"V":A=_,k=q.y;break;case"v":A=_,k=q.y+T;break;case"C":M=[q.x1,q.y1],C=[q.x2,q.y2],S=[q.x,q.y];break;case"c":M=[q.x1+_,q.y1+T],C=[q.x2+_,q.y2+T],S=[q.x+_,q.y+T];break;case"S":M=x(e,[_,T],m,v,y),C=[q.x2,q.y2],S=[q.x,q.y];break;case"s":M=x(e,[_,T],m,v,y),C=[q.x2+_,q.y2+T],S=[q.x+_,q.y+T];break;case"Q":c=[q.x1,q.y1],M=b([_,T],c),C=b([q.x,q.y],c),S=[q.x,q.y];break;case"q":c=[q.x1+_,q.y1+T],M=b([_,T],c),C=b([_+q.x,T+q.y],c),S=[q.x+_,q.y+T];break;case"T":M=x(e,[_,T],m,v,y),M=b([_,T],c),C=b([q.x,q.y],c),S=[q.x,q.y];break;case"t":c=x(e,[_,T],m,v,y),M=b([_,T],c),C=b([_+q.x,T+q.y],c),S=[q.x+_,q.y+T]}"sScCqQtT".indexOf(L)>=0&&(v=_,y=T),"MLCSQT".indexOf(L)>=0?(_=q.x,T=q.y):"mlcsqt".indexOf(L)>=0?(_=q.x+_,T=q.y+T):"zZ".indexOf(L)<0&&(_=A,T=k),"CSQTcsqt".indexOf(L)>=0?(r=Math.min(r,_,M[0],C[0],S[0]),i=Math.max(i,_,M[0],C[0],S[0]),a=Math.min(a,T,M[1],C[1],S[1]),n=Math.max(n,T,M[1],C[1],S[1])):(r=Math.min(r,_),i=Math.max(i,_),a=Math.min(a,T),n=Math.max(n,T))}u=[r,a,i-r,n-a]}else{if(l(t,"svg"))return s=t.getAttribute("viewBox"),s&&(o=F(s)),[c(t.getAttribute("x"))||o&&o[0]||0,c(t.getAttribute("y"))||o&&o[1]||0,c(t.getAttribute("width"))||o&&o[2]||0,c(t.getAttribute("height"))||o&&o[3]||0];if(l(t,"g"))u=[0,0,0,0],d(t,function(t,e){var r=I(e);u=[Math.min(u[0],r[0]),Math.min(u[1],r[1]),Math.max(u[0]+u[2],r[0]+r[2])-Math.min(u[0],r[0]),Math.max(u[1]+u[3],r[1]+r[3])-Math.min(u[1],r[1])]});else{if(l(t,"marker"))return s=t.getAttribute("viewBox"),s&&(o=F(s)),[o&&o[0]||0,o&&o[1]||0,o&&o[2]||c(t.getAttribute("marker-width"))||0,o&&o[3]||c(t.getAttribute("marker-height"))||0];if(l(t,"pattern"))return[c(t.getAttribute("x"))||0,c(t.getAttribute("y"))||0,c(t.getAttribute("width"))||0,c(t.getAttribute("height"))||0];var N=c(t.getAttribute("x1"))||c(t.getAttribute("x"))||c(t.getAttribute("cx")-c(t.getAttribute("r")))||0,O=c(t.getAttribute("x2"))||N+c(t.getAttribute("width"))||c(t.getAttribute("cx"))+c(t.getAttribute("r"))||0,P=c(t.getAttribute("y1"))||c(t.getAttribute("y"))||c(t.getAttribute("cy"))-c(t.getAttribute("r"))||0,E=c(t.getAttribute("y2"))||P+c(t.getAttribute("height"))||c(t.getAttribute("cy"))+c(t.getAttribute("r"))||0;u=[Math.min(N,O),Math.min(P,E),Math.max(N,O)-Math.min(N,O),Math.max(P,E)-Math.min(P,E)]}}if(!l(t,"marker,svg,g")){var G=f(t,"stroke-width")||1,j=f(t,"stroke-miterlimit");return j&&(G*=.5/Math.sin(Math.PI/12)),[u[0]-G,u[1]-G,u[2]+2*G,u[3]+2*G]}return u},_=function(t,e,r,a,i){for(var n=w(t.getAttribute("points")),s=[{op:"m",c:S(n[0],e)}],u=1;u<n.length;u++){var c=n[u],h=S(c,e);s.push({op:"l",c:h})}s.push({op:"h"}),o.path(s,r,a,i)},T=function(t){var e=t.getAttribute("xlink:href")||t.getAttribute("href"),r=new Image;r.src=e;var a=document.createElement("canvas"),i=parseFloat(t.getAttribute("width")),n=parseFloat(t.getAttribute("height")),s=parseFloat(t.getAttribute("x")||0),u=parseFloat(t.getAttribute("y")||0);a.width=i,a.height=n;var c=a.getContext("2d");c.fillStyle="#fff",c.fillRect(0,0,i,n),c.drawImage(r,0,0,i,n);var h=a.toDataURL("image/jpeg");o.addImage(h,"jpeg",s,u,i,n)},q=function(t,e,r,a,i,n){var s=h(t),u=t.getAttribute("marker-end"),f=t.getAttribute("marker-start"),l=t.getAttribute("marker-mid"),d=function(t,e){for(var r,a,i,n,c,h,d,p,m,v,y=0,A=0,k=y,w=A,M=[],F=[],C=0,I=function(t,r,a){var i,n=Math.cos(t),s=Math.sin(t);i=new o.Matrix(n,s,-s,n,r[0],r[1]),F.push({type:a,tf:o.matrixMult(i,e)})},_=0;_<s.numberOfItems;_++){var T=s.getItem(_),q=T.pathSegTypeAsLetter;switch(q){case"M":k=y,w=A,c=[T.x,T.y],m="m";break;case"m":k=y,w=A,c=[T.x+y,T.y+A],m="m";break;case"L":c=[T.x,T.y],m="l";break;case"l":c=[T.x+y,T.y+A],m="l";break;case"H":c=[T.x,A],m="l",i=T.x,n=A;break;case"h":c=[T.x+y,A],m="l",i=T.x+y,n=A;break;case"V":c=[y,T.y],m="l",i=y,n=T.y;break;case"v":c=[y,T.y+A],m="l",i=y,n=T.y+A;break;case"C":d=[T.x1,T.y1],p=[T.x2,T.y2],c=[T.x,T.y];break;case"c":d=[T.x1+y,T.y1+A],p=[T.x2+y,T.y2+A],c=[T.x+y,T.y+A];break;case"S":d=x(_,[y,A],s,r,a),p=[T.x2,T.y2],c=[T.x,T.y];break;case"s":d=x(_,[y,A],s,r,a),p=[T.x2+y,T.y2+A],c=[T.x+y,T.y+A];break;case"Q":h=[T.x1,T.y1],d=b([y,A],h),p=b([T.x,T.y],h),c=[T.x,T.y];break;case"q":h=[T.x1+y,T.y1+A],d=b([y,A],h),p=b([y+T.x,A+T.y],h),c=[T.x+y,T.y+A];break;case"T":d=x(_,[y,A],s,r,a),d=b([y,A],h),p=b([T.x,T.y],h),c=[T.x,T.y];break;case"t":h=x(_,[y,A],s,r,a),d=b([y,A],h),p=b([y+T.x,A+T.y],h),c=[T.x+y,T.y+A];break;case"Z":case"z":y=k,A=w,M.push({op:"h"})}var L=f&&(1===_||"mM".indexOf(q)<0&&"mM".indexOf(s.getItem(_-1).pathSegTypeAsLetter)>=0),N=u&&(_===s.numberOfItems-1||"mM".indexOf(q)<0&&"mM".indexOf(s.getItem(_+1).pathSegTypeAsLetter)>=0),O=l&&_>0&&!(1===_&&"mM".indexOf(s.getItem(_-1).pathSegTypeAsLetter)>=0);if("sScCqQtT".indexOf(q)>=0)L&&I(g([y,A],d),[y,A],"start"),N&&I(g(p,c),c,"end"),O&&(v=g([y,A],d),v="mM".indexOf(s.getItem(_-1).pathSegTypeAsLetter)>=0?v:.5*(C+v),I(v,[y,A],"mid")),C=g(p,c),r=y,a=A,d=S(d,e),p=S(p,e),h=S(c,e),M.push({op:"c",c:[d[0],d[1],p[0],p[1],h[0],h[1]]});else if("lLhHvVmM".indexOf(q)>=0){if(v=g([y,A],c),L&&I(v,[y,A],"start"),N&&I(v,c,"end"),O){var P="mM".indexOf(q)>=0?C:"mM".indexOf(s.getItem(_-1).pathSegTypeAsLetter)>=0?v:.5*(C+v);I(P,[y,A],"mid")}C=v,h=S(c,e),M.push({op:m,c:h})}"MLCSQT".indexOf(q)>=0?(y=T.x,A=T.y):"mlcsqt".indexOf(q)>=0?(y=T.x+y,A=T.y+A):"zZ".indexOf(q)<0&&(y=i,A=n)}return{lines:M,markers:F}},p=d(s,e);if(u||f||l)for(var m=0;m<p.markers.length;m++){var v,y=p.markers[m];switch(y.type){case"start":v=r.get()+c.exec(f)[1];break;case"end":v=r.get()+c.exec(u)[1];break;case"mid":v=r.get()+c.exec(l)[1]}o.doFormObject(v,y.tf)}p.lines.length>0&&o.path(p.lines,a,i,n)},L=function(t,e,r){var a=t.getAttribute("href")||t.getAttribute("xlink:href");if(a){var i=o.getFormObject(r.get()+a.substring(1)),n=t.getAttribute("x")||0,s=t.getAttribute("y")||0,u=t.getAttribute("width")||i.width,c=t.getAttribute("height")||i.height,h=new o.Matrix(u/i.width||0,0,0,c/i.height||0,n,s);h=o.matrixMult(h,e),o.doFormObject(r.get()+a.substring(1),h)}},N=function(t,e){var r=S([parseFloat(t.getAttribute("x1")),parseFloat(t.getAttribute("y1"))],e),a=S([parseFloat(t.getAttribute("x2")),parseFloat(t.getAttribute("y2"))],e);o.line(r[0],r[1],a[0],a[1])},O=function(t,e,r,a){o.roundedRect(parseFloat(t.getAttribute("x"))||0,parseFloat(t.getAttribute("y"))||0,parseFloat(t.getAttribute("width")),parseFloat(t.getAttribute("height")),parseFloat(t.getAttribute("rx"))||0,parseFloat(t.getAttribute("ry"))||0,e,r,a)},P=function(t,e,r,a){o.ellipse(parseFloat(t.getAttribute("cx"))||0,parseFloat(t.getAttribute("cy"))||0,parseFloat(t.getAttribute("rx")),parseFloat(t.getAttribute("ry")),e,r,a)},E=function(t,e,r,a){var i=parseFloat(t.getAttribute("r"))||0;o.ellipse(parseFloat(t.getAttribute("cx"))||0,parseFloat(t.getAttribute("cy"))||0,i,i,e,r,a)},G=function(t,e){var r=f(t,"text-transform");switch(r){case"uppercase":return e.toUpperCase();case"lowercase":return e.toLowerCase();default:return e}},j=function(t,e,r,a){o.saveGraphicsState(),i(t,a);var s=function(t,e){var r=0;switch(t){case"end":r=e;break;case"middle":r=e/2;break;case"start":}return r},u=function(t,e){var r;return(r=t&&t.toString().match(/^([\-0-9.]+)em$/))?parseFloat(r[1])*e:(r=t&&t.toString().match(/^([\-0-9.]+)(px|)$/),r?parseFloat(r[1]):0)},c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(t),c.setAttribute("visibility","hidden"),document.body.appendChild(c);var h,l,g=t.getBBox(),p=0,b=f(t,"text-anchor");b&&(p=s(b,g.width));var x=o.getFontSize(),m=u(t.getAttribute("x"),x),v=u(t.getAttribute("y"),x),A=o.matrixMult(new o.Matrix(1,0,0,1,m,v),e);h=u(t.getAttribute("dx"),x),l=u(t.getAttribute("dy"),x),0===t.childElementCount?o.text(h-p,l,G(t,y(t.textContent)),void 0,A):d(t,function(e,r){o.saveGraphicsState();var a=f(r,"fill");i(r,a&&new n(a));var s=r.getExtentOfChar(0);o.text(s.x-m,s.y+.7*s.height-v,G(t,y(r.textContent)),void 0,A),o.restoreGraphicsState()}),document.body.removeChild(c),o.restoreGraphicsState()},V=function(t,e,r,a,i){d(t,function(t,n){"defs"===n.tagName.toLowerCase()&&(U(n,e,r,a,i),n.parentNode.removeChild(n))})},Y=function(t,e,r,a,i){var n=a.nextChild(),s=A(r);V(t,e,s,n,i),z(t,e,s,n,i)},z=function(t,e,r,a,i){d(t,function(t,n){U(n,e,r,a,i)})},H=function(t,e,r,a,i){var s,u=[],c=0,h=!1;d(t,function(t,e){if("stop"===e.tagName.toLowerCase()){var r=new n(f(e,"stop-color"));u.push({offset:parseFloat(e.getAttribute("offset")),color:[r.r,r.g,r.b]});var a=f(e,"stop-opacity");a&&1!=a&&(c+=parseFloat(a),
h=!0)}}),h&&(s=new o.GState({opacity:c/r.length}));var l=new o.ShadingPattern(e,r,u,s),g=i.get()+t.getAttribute("id");o.addShadingPattern(g,l),a[g]=t},B=function(t,e,r){var a=r.get()+t.getAttribute("id");e[a]=t;var i=I(t),n=new o.TilingPattern([i[0],i[1],i[0]+i[2],i[1]+i[3]],i[2],i[3],null,k(t));o.beginTilingPattern(n),z(t,o.unitMatrix,e,r,!1),o.endTilingPattern(a,n)},U=function(t,e,r,a,s){function u(){p=new n("rgb(0, 0, 0)"),g=!0,b="F"}var h,d,g=!1,p=null,b=null,x=null,m=null,y=s&&!l(t,"lineargradient,radialgradient,pattern");if(y?(h=k(t),d=I(t),o.beginFormObject(d[0],d[1],d[2],d[3],h),h=o.unitMatrix,s=!1):(h=o.matrixMult(k(t),e),o.saveGraphicsState()),l(t,"g,path,rect,text,ellipse,line,circle,polygon")){var A=f(t,"fill");if(A){var w=c.exec(A);if(w){x=a.get()+w[1];var S=v(x,r);if(S&&l(S,"lineargradient,radialgradient")){var G=h;if(!S.hasAttribute("gradientUnits")||"objectboundingbox"===S.getAttribute("gradientUnits").toLowerCase()){d||(d=I(t)),G=new o.Matrix(d[2],0,0,d[3],d[0],d[1]);var U=k(t);G=o.matrixMult(G,U)}var Q=M(S.getAttribute("gradientTransform"));m=o.matrixMult(Q,G)}else if(S&&l(S,"pattern")){var D,X,Z,R,$;m={};var W=o.unitMatrix;S.hasAttribute("patternUnits")&&"objectboundingbox"!==S.getAttribute("patternUnits").toLowerCase()||(d||(d=I(t)),W=new o.Matrix(1,0,0,1,d[0],d[1]),D=I(S),$=D[0]*d[0],X=D[1]*d[1],Z=D[2]*d[2],R=D[3]*d[3],m.boundingBox=[$,X,$+Z,X+R],m.xStep=Z,m.yStep=R);var J=o.unitMatrix;S.hasAttribute("patternContentUnits")&&"objectboundingbox"===S.getAttribute("patternContentUnits").toLowerCase()&&(d||(d=I(t)),J=new o.Matrix(d[2],0,0,d[3],0,0),D=m.boundingBox||I(S),$=D[0]/d[0],X=D[1]/d[1],Z=D[2]/d[2],R=D[3]/d[3],m.boundingBox=[$,X,$+Z,X+R],m.xStep=Z,m.yStep=R),m.matrix=o.matrixMult(o.matrixMult(J,W),h),b="F"}else x=S=null,u()}else p=C(A),p.ok?(g=!0,b="F"):b=null}else u();var K=1,tt=t.getAttribute("opacity")||t.getAttribute("fill-opacity");tt&&(K*=parseFloat(tt)),p&&"number"==typeof p.a&&(K*=p.a),o.setGState(new o.GState({opacity:K}))}if(l(t,"g,path,rect,ellipse,line,circle,polygon")){g&&o.setFillColor(p.r,p.g,p.b);var et=t.getAttribute("stroke");if(et){var rt;t.hasAttribute("stroke-width")&&(rt=Math.abs(parseFloat(t.getAttribute("stroke-width"))),o.setLineWidth(rt));var at=new n(et);at.ok&&(o.setDrawColor(at.r,at.g,at.b),0!==rt&&(b=(b||"")+"D")),t.hasAttribute("stroke-linecap")&&o.setLineCap(t.getAttribute("stroke-linecap")),t.hasAttribute("stroke-linejoin")&&o.setLineJoin(t.getAttribute("stroke-linejoin")),t.hasAttribute("stroke-dasharray")&&o.setLineDashPattern(F(t.getAttribute("stroke-dasharray")),parseInt(t.getAttribute("stroke-dashoffset"))||0),t.hasAttribute("stroke-miterlimit")&&o.setLineMiterLimit(parseFloat(t.getAttribute("stroke-miterlimit")))}}switch(i(t,p),t.tagName.toLowerCase()){case"svg":Y(t,h,r,a,s);break;case"g":V(t,h,r,a,s);case"a":case"marker":z(t,h,r,a,s);break;case"defs":z(t,h,r,a,!0);break;case"use":L(t,h,a);break;case"line":N(t,h);break;case"rect":o.setCurrentTransformationMatrix(h),O(t,b,x,m);break;case"ellipse":o.setCurrentTransformationMatrix(h),P(t,b,x,m);break;case"circle":o.setCurrentTransformationMatrix(h),E(t,b,x,m);break;case"text":j(t,h,g,p);break;case"path":q(t,h,a,b,x,m);break;case"polygon":_(t,h,b,x,m);break;case"image":o.setCurrentTransformationMatrix(h),T(t);break;case"lineargradient":H(t,"axial",[t.getAttribute("x1"),t.getAttribute("y1"),t.getAttribute("x2"),t.getAttribute("y2")],r,a);break;case"radialgradient":H(t,"radial",[t.getAttribute("fx")||t.getAttribute("cx"),t.getAttribute("fy")||t.getAttribute("cy"),0,t.getAttribute("cx")||0,t.getAttribute("cy")||0,t.getAttribute("r")||0],r,a);break;case"pattern":B(t,r,a)}y?o.endFormObject(a.get()+t.getAttribute("id")):o.restoreGraphicsState()},Q=function(t,e,r){o=e;var a=r.scale||1,i=r.xOffset||0,n=r.yOffset||0;return o.saveGraphicsState(),o.setCurrentTransformationMatrix(new o.Matrix(a,0,0,a,i,n)),U(t.cloneNode(!0),o.unitMatrix,{},new m(""),!1),o.restoreGraphicsState(),o};return"function"==typeof t&&t.amd?t(["./rgbcolor","./SvgPath"],function(t,e){return n=t,s=e,Q}):"undefined"!=typeof r&&r.exports?(n=e("./rgbcolor.js"),s=e("SvgPath"),r.exports=Q):(s=a.SvgPath,n=a.RGBColor,a.svg2pdf=Q,a.svgElementToPdf=Q),Q}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this)},{"./rgbcolor.js":8,SvgPath:1}]},{},[9])(9)});
