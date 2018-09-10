(function(u){"use strict";var o;var c={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,unavailable:null,deactivated:null,overdue:null,ready:null};var d={};var p=null;var a=0;var s={};var i=0;var l={};var e=function(){var e,t,r,a,i="ZeroClipboard.swf";if(!(document.currentScript&&(a=document.currentScript.src))){var n=document.getElementsByTagName("script");if("readyState"in n[0]){for(e=n.length;e--;){if(n[e].readyState==="interactive"&&(a=n[e].src)){break}}}else if(document.readyState==="loading"){a=n[n.length-1].src}else{for(e=n.length;e--;){r=n[e].src;if(!r){t=null;break}r=r.split("#")[0].split("?")[0];r=r.slice(0,r.lastIndexOf("/")+1);if(t==null){t=r}else if(t!==r){t=null;break}}if(t!==null){a=t}}}if(a){a=a.split("#")[0].split("?")[0];i=a.slice(0,a.lastIndexOf("/")+1)+i}return i}();var n=function(){var t=/\-([a-z])/g,r=function(e,t){return t.toUpperCase()};return function(e){return e.replace(t,r)}}();var f=function(e,t){var r,a,i;if(u.getComputedStyle){r=u.getComputedStyle(e,null).getPropertyValue(t)}else{a=n(t);if(e.currentStyle){r=e.currentStyle[a]}else{r=e.style[a]}}if(t==="cursor"){if(!r||r==="auto"){i=e.tagName.toLowerCase();if(i==="a"){return"pointer"}}}return r};var v=function(e){if(!e){e=u.event}var t;if(this!==u){t=this}else if(e.target){t=e.target}else if(e.srcElement){t=e.srcElement}B.activate(t)};var h=function(e,t,r){if(!e||e.nodeType!==1){return}if(e.addEventListener){e.addEventListener(t,r,false)}else if(e.attachEvent){e.attachEvent("on"+t,r)}};var y=function(e,t,r){if(!e||e.nodeType!==1){return}if(e.removeEventListener){e.removeEventListener(t,r,false)}else if(e.detachEvent){e.detachEvent("on"+t,r)}};var g=function(e,t){if(!e||e.nodeType!==1){return e}if(e.classList){if(!e.classList.contains(t)){e.classList.add(t)}return e}if(t&&typeof t==="string"){var r=(t||"").split(/\s+/);if(e.nodeType===1){if(!e.className){e.className=t}else{var a=" "+e.className+" ",i=e.className;for(var n=0,o=r.length;n<o;n++){if(a.indexOf(" "+r[n]+" ")<0){i+=" "+r[n]}}e.className=i.replace(/^\s+|\s+$/g,"")}}}return e};var m=function(e,t){if(!e||e.nodeType!==1){return e}if(e.classList){if(e.classList.contains(t)){e.classList.remove(t)}return e}if(t&&typeof t==="string"||t===undefined){var r=(t||"").split(/\s+/);if(e.nodeType===1&&e.className){if(t){var a=(" "+e.className+" ").replace(/[\n\t]/g," ");for(var i=0,n=r.length;i<n;i++){a=a.replace(" "+r[i]+" "," ")}e.className=a.replace(/^\s+|\s+$/g,"")}else{e.className=""}}}return e};var b=function(){var e,t,r,a=1;if(typeof document.body.getBoundingClientRect==="function"){e=document.body.getBoundingClientRect();t=e.right-e.left;r=document.body.offsetWidth;a=Math.round(t/r*100)/100}return a};var r=function(e,t){var r={left:0,top:0,width:0,height:0,zIndex:D(t)-1};if(e.getBoundingClientRect){var a=e.getBoundingClientRect();var i,n,o;if("pageXOffset"in u&&"pageYOffset"in u){i=u.pageXOffset;n=u.pageYOffset}else{o=b();i=Math.round(document.documentElement.scrollLeft/o);n=Math.round(document.documentElement.scrollTop/o)}var l=document.documentElement.clientLeft||0;var s=document.documentElement.clientTop||0;r.left=a.left+i-l;r.top=a.top+n-s;r.width="width"in a?a.width:a.right-a.left;r.height="height"in a?a.height:a.bottom-a.top}return r};var w=function(e,t){var r=t==null||t&&t.cacheBust===true;if(r){return(e.indexOf("?")===-1?"?":"&")+"noCache="+(new Date).getTime()}else{return""}};var x=function(e){var t,r,a,i,n="",o=[];if(e.trustedDomains){if(typeof e.trustedDomains==="string"){i=[e.trustedDomains]}else if(typeof e.trustedDomains==="object"&&"length"in e.trustedDomains){i=e.trustedDomains}}if(i&&i.length){for(t=0,r=i.length;t<r;t++){if(i.hasOwnProperty(t)&&i[t]&&typeof i[t]==="string"){a=z(i[t]);if(!a){continue}if(a==="*"){o=[a];break}o.push.apply(o,[a,"//"+a,u.location.protocol+"//"+a])}}}if(o.length){n+="trustedOrigins="+encodeURIComponent(o.join(","))}if(e.forceEnhancedClipboard===true){n+=(n?"&":"")+"forceEnhancedClipboard=true"}return n};var C=function(e,t,r){if(typeof t.indexOf==="function"){return t.indexOf(e,r)}var a,i=t.length;if(typeof r==="undefined"){r=0}else if(r<0){r=i+r}for(a=r;a<i;a++){if(t.hasOwnProperty(a)&&t[a]===e){return a}}return-1};var O=function(e){if(typeof e==="string"){throw new TypeError("ZeroClipboard doesn't accept query strings.")}return typeof e.length!=="number"?[e]:e};var T=function(e,t,r,a){if(a){u.setTimeout(function(){e.apply(t,r)},0)}else{e.apply(t,r)}};var D=function(e){var t,r;if(e){if(typeof e==="number"&&e>0){t=e}else if(typeof e==="string"&&(r=parseInt(e,10))&&!isNaN(r)&&r>0){t=r}}if(!t){if(typeof $.zIndex==="number"&&$.zIndex>0){t=$.zIndex}else if(typeof $.zIndex==="string"&&(r=parseInt($.zIndex,10))&&!isNaN(r)&&r>0){t=r}}return t||0};var k=function(){var e,t,r,a,i,n,o=arguments[0]||{};for(e=1,t=arguments.length;e<t;e++){if((r=arguments[e])!=null){for(a in r){if(r.hasOwnProperty(a)){i=o[a];n=r[a];if(o===n){continue}if(n!==undefined){o[a]=n}}}}}return o};var z=function(e){if(e==null||e===""){return null}e=e.replace(/^\s+|\s+$/g,"");if(e===""){return null}var t=e.indexOf("//");e=t===-1?e:e.slice(t+2);var r=e.indexOf("/");e=r===-1?e:t===-1||r===0?null:e.slice(0,r);if(e&&e.slice(-4).toLowerCase()===".swf"){return null}return e||null};var N=function(){var n=function(e,t){var r,a,i;if(e==null||t[0]==="*"){return}if(typeof e==="string"){e=[e]}if(!(typeof e==="object"&&typeof e.length==="number")){return}for(r=0,a=e.length;r<a;r++){if(e.hasOwnProperty(r)&&(i=z(e[r]))){if(i==="*"){t.length=0;t.push("*");break}if(C(i,t)===-1){t.push(i)}}}};return function(e,t){var r=z(t.swfPath);if(r===null){r=e}var a=[];n(t.trustedOrigins,a);n(t.trustedDomains,a);var i=a.length;if(i>0){if(i===1&&a[0]==="*"){return"always"}if(C(e,a)!==-1){if(i===1&&e===r){return"sameDomain"}return"always"}}return"never"}}();var E=function(e){if(e==null){return[]}if(Object.keys){return Object.keys(e)}var t=[];for(var r in e){if(e.hasOwnProperty(r)){t.push(r)}}return t};var t=function(e){if(e){for(var t in e){if(e.hasOwnProperty(t)){delete e[t]}}}return e};var I=function(){try{return document.activeElement}catch(e){}return null};var P=function(e,t){var r={};for(var a=0,i=t.length;a<i;a++){if(t[a]in e){r[t[a]]=e[t[a]]}}return r};var j=function(e,t){var r={};for(var a in e){if(C(a,t)===-1){r[a]=e[a]}}return r};var L=function(e){var t={},r={};if(!(typeof e==="object"&&e)){return}for(var a in e){if(a&&e.hasOwnProperty(a)&&typeof e[a]==="string"&&e[a]){switch(a.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":t.text=e[a];r.text=a;break;case"text/html":case"html":case"air:html":case"flash:html":t.html=e[a];r.html=a;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":t.rtf=e[a];r.rtf=a;break;default:break}}}return{data:t,formatMap:r}};var S=function(e,t){if(!(typeof e==="object"&&e&&typeof t==="object"&&t)){return e}var r={};for(var a in e){if(e.hasOwnProperty(a)){if(a!=="success"&&a!=="data"){r[a]=e[a];continue}r[a]={};var i=e[a];for(var n in i){if(n&&i.hasOwnProperty(n)&&t.hasOwnProperty(n)){r[a][t[n]]=i[n]}}}}return r};var A=function(t){return function(e){return t.call(e,0)}}(u.Array.prototype.slice);var F=function(){var e,t,r,a=false,i=false,n=false,o="";function l(e){var t=e.match(/[\d]+/g);t.length=3;return t.join(".")}function s(e){return!!e&&(e=e.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e)||e.slice(-13)==="chrome.plugin")}function f(e){if(e){a=true;if(e.version){o=l(e.version)}if(!o&&e.description){o=l(e.description)}if(e.filename){n=s(e.filename)}}}if(navigator.plugins&&navigator.plugins.length){e=navigator.plugins["Shockwave Flash"];f(e);if(navigator.plugins["Shockwave Flash 2.0"]){a=true;o="2.0.0.11"}}else if(navigator.mimeTypes&&navigator.mimeTypes.length){r=navigator.mimeTypes["application/x-shockwave-flash"];e=r&&r.enabledPlugin;f(e)}else if(typeof ActiveXObject!=="undefined"){i=true;try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");a=true;o=l(t.GetVariable("$version"))}catch(e){try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");a=true;o="6.0.21"}catch(e){try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");a=true;o=l(t.GetVariable("$version"))}catch(e){i=false}}}}c.disabled=a!==true;c.outdated=o&&parseFloat(o)<11;c.version=o||"0.0.0";c.pluginType=n?"pepper":i?"activex":a?"netscape":"unknown"};F();var B=function(e){if(!(this instanceof B)){return new B(e)}this.id=""+a++;s[this.id]={instance:this,elements:[],handlers:{}};if(e){this.clip(e)}if(typeof c.ready!=="boolean"){c.ready=false}if(!B.isFlashUnusable()&&c.bridge===null){var t=this;var r=$.flashLoadTimeout;if(typeof r==="number"&&r>=0){setTimeout(function(){if(typeof c.deactivated!=="boolean"){c.deactivated=true}if(c.deactivated===true){B.emit({type:"error",name:"flash-deactivated",client:t})}},r)}c.overdue=false;R()}};B.prototype.setText=function(e){B.setData("text/plain",e);return this};B.prototype.setHtml=function(e){B.setData("text/html",e);return this};B.prototype.setRichText=function(e){B.setData("application/rtf",e);return this};B.prototype.setData=function(){B.setData.apply(B,A(arguments));return this};B.prototype.clearData=function(){B.clearData.apply(B,A(arguments));return this};B.prototype.setSize=function(e,t){V(e,t);return this};var H=function(e){if(c.ready===true&&c.bridge&&typeof c.bridge.setHandCursor==="function"){c.bridge.setHandCursor(e)}else{c.ready=false}};B.prototype.destroy=function(){this.unclip();this.off();delete s[this.id]};var M=function(){var e,t,r,a=[],i=E(s);for(e=0,t=i.length;e<t;e++){r=s[i[e]].instance;if(r&&r instanceof B){a.push(r)}}return a};B.version="2.0.0-beta.5";var $={swfPath:e,trustedDomains:u.location.host?[u.location.host]:[],cacheBust:true,forceHandCursor:false,forceEnhancedClipboard:false,zIndex:999999999,debug:false,title:null,autoActivate:true,flashLoadTimeout:3e4};B.isFlashUnusable=function(){return!!(c.disabled||c.outdated||c.unavailable||c.deactivated)};B.config=function(e){if(typeof e==="object"&&e!==null){k($,e)}if(typeof e==="string"&&e){if($.hasOwnProperty(e)){return $[e]}return}var t={};for(var r in $){if($.hasOwnProperty(r)){if(typeof $[r]==="object"&&$[r]!==null){if("length"in $[r]){t[r]=$[r].slice(0)}else{t[r]=k({},$[r])}}else{t[r]=$[r]}}}return t};B.destroy=function(){B.deactivate();for(var e in s){if(s.hasOwnProperty(e)&&s[e]){var t=s[e].instance;if(t&&typeof t.destroy==="function"){t.destroy()}}}var r=c.bridge;if(r){var a=Z(r);if(a){if(c.pluginType==="activex"&&"readyState"in r){r.style.display="none";(function e(){if(r.readyState===4){for(var t in r){if(typeof r[t]==="function"){r[t]=null}}r.parentNode.removeChild(r);if(a.parentNode){a.parentNode.removeChild(a)}}else{setTimeout(e,10)}})()}else{r.parentNode.removeChild(r);if(a.parentNode){a.parentNode.removeChild(a)}}}c.ready=null;c.bridge=null;c.deactivated=null}B.clearData()};B.activate=function(e){if(o){m(o,$.hoverClass);m(o,$.activeClass)}o=e;g(e,$.hoverClass);U();var t=$.title||e.getAttribute("title");if(t){var r=Z(c.bridge);if(r){r.setAttribute("title",t)}}var a=$.forceHandCursor===true||f(e,"cursor")==="pointer";H(a)};B.deactivate=function(){var e=Z(c.bridge);if(e){e.removeAttribute("title");e.style.left="0px";e.style.top="-9999px";V(1,1)}if(o){m(o,$.hoverClass);m(o,$.activeClass);o=null}};B.state=function(){return{browser:P(u.navigator,["userAgent","platform","appName"]),flash:j(c,["bridge"]),zeroclipboard:{version:B.version,config:B.config()}}};B.setData=function(e,t){var r;if(typeof e==="object"&&e&&typeof t==="undefined"){r=e;B.clearData()}else if(typeof e==="string"&&e){r={};r[e]=t}else{return}for(var a in r){if(a&&r.hasOwnProperty(a)&&typeof r[a]==="string"&&r[a]){d[a]=r[a]}}};B.clearData=function(e){if(typeof e==="undefined"){t(d);p=null}else if(typeof e==="string"&&d.hasOwnProperty(e)){delete d[e]}};var R=function(){var e,t;var r=document.getElementById("global-zeroclipboard-html-bridge");if(!r){var a=N(u.location.host,$);var i=a==="never"?"none":"all";var n=x($);var o=$.swfPath+w($.swfPath,$);r=X();var l=document.createElement("div");r.appendChild(l);document.body.appendChild(r);var s=document.createElement("div");var f=c.pluginType==="activex";s.innerHTML='<object id="global-zeroclipboard-flash-bridge" name="global-zeroclipboard-flash-bridge" '+'width="100%" height="100%" '+(f?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+o+'"')+">"+(f?'<param name="movie" value="'+o+'"/>':"")+'<param name="allowScriptAccess" value="'+a+'"/>'+'<param name="allowNetworking" value="'+i+'"/>'+'<param name="menu" value="false"/>'+'<param name="wmode" value="transparent"/>'+'<param name="flashvars" value="'+n+'"/>'+"</object>";e=s.firstChild;s=null;e.ZeroClipboard=B;r.replaceChild(e,l)}if(!e){e=document["global-zeroclipboard-flash-bridge"];if(e&&(t=e.length)){e=e[t-1]}if(!e){e=r.firstChild}}c.bridge=e||null};var X=function(){var e=document.createElement("div");e.id="global-zeroclipboard-html-bridge";e.className="global-zeroclipboard-container";e.style.position="absolute";e.style.left="0px";e.style.top="-9999px";e.style.width="1px";e.style.height="1px";e.style.zIndex=""+D($.zIndex);return e};var Z=function(e){var t=e&&e.parentNode;while(t&&t.nodeName==="OBJECT"&&t.parentNode){t=t.parentNode}return t||null};var U=function(){if(o){var e=r(o,$.zIndex);var t=Z(c.bridge);if(t){t.style.top=e.top+"px";t.style.left=e.left+"px";t.style.width=e.width+"px";t.style.height=e.height+"px";t.style.zIndex=e.zIndex+1}V(e.width,e.height)}};var V=function(e,t){var r=Z(c.bridge);if(r){r.style.width=e+"px";r.style.height=t+"px"}};B.emit=function(e){var t,r,a,i,n,o,l,s,f;if(typeof e==="string"&&e){t=e}if(typeof e==="object"&&e&&typeof e.type==="string"&&e.type){t=e.type;r=e}if(!t){return}e=Y(t,r);W(e);if(e.type==="ready"&&c.overdue===true){return B.emit({type:"error",name:"flash-overdue"})}a=!/^(before)?copy$/.test(e.type);if(e.client){G.call(e.client,e,a)}else{i=e.target&&e.target!==u&&$.autoActivate===true?_(e.target):M();for(n=0,o=i.length;n<o;n++){l=k({},e,{client:i[n]});G.call(i[n],l,a)}}if(e.type==="copy"){f=L(d);s=f.data;p=f.formatMap}return s};var G=function(e,t){var r=s[this.id]&&s[this.id].handlers[e.type];if(r&&r.length){var a,i,n,o,l=this;for(a=0,i=r.length;a<i;a++){n=r[a];o=l;if(typeof n==="string"&&typeof u[n]==="function"){n=u[n]}if(typeof n==="object"&&n&&typeof n.handleEvent==="function"){o=n;n=n.handleEvent}if(typeof n==="function"){T(n,o,[e],t)}}}return this};var J={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate","flash-overdue":"Flash communication was established but NOT within the acceptable time limit"}};var Y=function(e,t){if(!(e||t&&t.type)){return}t=t||{};e=(e||t.type).toLowerCase();k(t,{type:e,target:t.target||o||null,relatedTarget:t.relatedTarget||null,currentTarget:c&&c.bridge||null});var r=J[t.type];if(t.type==="error"&&t.name&&r){r=r[t.name]}if(r){t.message=r}if(t.type==="ready"){k(t,{target:null,version:c.version})}if(t.type==="error"){t.target=null;if(/^flash-(outdated|unavailable|deactivated|overdue)$/.test(t.name)){k(t,{version:c.version,minimumVersion:"11.0.0"})}}if(t.type==="copy"){t.clipboardData={setData:B.setData,clearData:B.clearData}}if(t.type==="aftercopy"){t=S(t,p)}if(t.target&&!t.relatedTarget){t.relatedTarget=q(t.target)}return t};var q=function(e){var t=e&&e.getAttribute&&e.getAttribute("data-clipboard-target");return t?document.getElementById(t):null};var W=function(e){var t=e.target||o;switch(e.type){case"error":if(C(e.name,["flash-disabled","flash-outdated","flash-deactivated","flash-overdue"])){k(c,{disabled:e.name==="flash-disabled",outdated:e.name==="flash-outdated",unavailable:e.name==="flash-unavailable",deactivated:e.name==="flash-deactivated",overdue:e.name==="flash-overdue",ready:false})}break;case"ready":var r=c.deactivated===true;k(c,{disabled:false,outdated:false,unavailable:false,deactivated:false,overdue:r,ready:!r});break;case"copy":var a,i,n=e.relatedTarget;if(!(d["text/html"]||d["text/plain"])&&n&&(i=n.value||n.outerHTML||n.innerHTML)&&(a=n.value||n.textContent||n.innerText)){e.clipboardData.clearData();e.clipboardData.setData("text/plain",a);if(i!==a){e.clipboardData.setData("text/html",i)}}else if(!d["text/plain"]&&e.target&&(a=e.target.getAttribute("data-clipboard-text"))){e.clipboardData.clearData();e.clipboardData.setData("text/plain",a)}break;case"aftercopy":B.clearData();if(t&&t!==I()&&t.focus){t.focus()}break;case"mouseover":g(t,$.hoverClass);break;case"mouseout":if($.autoActivate===true){B.deactivate()}break;case"mousedown":g(t,$.activeClass);break;case"mouseup":m(t,$.activeClass);break}};B.prototype.on=function(e,t){var r,a,i,n={},o=s[this.id]&&s[this.id].handlers;if(typeof e==="string"&&e){i=e.toLowerCase().split(/\s+/)}else if(typeof e==="object"&&e&&typeof t==="undefined"){for(r in e){if(e.hasOwnProperty(r)&&typeof r==="string"&&r&&typeof e[r]==="function"){this.on(r,e[r])}}}if(i&&i.length){for(r=0,a=i.length;r<a;r++){e=i[r].replace(/^on/,"");n[e]=true;if(!o[e]){o[e]=[]}o[e].push(t)}if(n.ready&&c.ready){B.emit({type:"ready",client:this})}if(n.error){var l=["disabled","outdated","unavailable","deactivated","overdue"];for(r=0,a=l.length;r<a;r++){if(c[l[r]]){B.emit({type:"error",name:"flash-"+l[r],client:this});break}}}}return this};B.prototype.off=function(e,t){var r,a,i,n,o,l=s[this.id]&&s[this.id].handlers;if(arguments.length===0){n=E(l)}else if(typeof e==="string"&&e){n=e.split(/\s+/)}else if(typeof e==="object"&&e&&typeof t==="undefined"){for(r in e){if(e.hasOwnProperty(r)&&typeof r==="string"&&r&&typeof e[r]==="function"){this.off(r,e[r])}}}if(n&&n.length){for(r=0,a=n.length;r<a;r++){e=n[r].toLowerCase().replace(/^on/,"");o=l[e];if(o&&o.length){if(t){i=C(t,o);while(i!==-1){o.splice(i,1);i=C(t,o,i)}}else{l[e].length=0}}}}return this};B.prototype.handlers=function(e){var t,r=null,a=s[this.id]&&s[this.id].handlers;if(a){if(typeof e==="string"&&e){return a[e]?a[e].slice(0):null}r={};for(t in a){if(a.hasOwnProperty(t)&&a[t]){r[t]=a[t].slice(0)}}}return r};B.prototype.clip=function(e){e=O(e);for(var t=0;t<e.length;t++){if(e.hasOwnProperty(t)&&e[t]&&e[t].nodeType===1){if(!e[t].zcClippingId){e[t].zcClippingId="zcClippingId_"+i++;l[e[t].zcClippingId]=[this.id];if($.autoActivate===true){h(e[t],"mouseover",v)}}else if(C(this.id,l[e[t].zcClippingId])===-1){l[e[t].zcClippingId].push(this.id)}var r=s[this.id].elements;if(C(e[t],r)===-1){r.push(e[t])}}}return this};B.prototype.unclip=function(e){var t=s[this.id];if(!t){return this}var r=t.elements;var a;if(typeof e==="undefined"){e=r.slice(0)}else{e=O(e)}for(var i=e.length;i--;){if(e.hasOwnProperty(i)&&e[i]&&e[i].nodeType===1){a=0;while((a=C(e[i],r,a))!==-1){r.splice(a,1)}var n=l[e[i].zcClippingId];if(n){a=0;while((a=C(this.id,n,a))!==-1){n.splice(a,1)}if(n.length===0){if($.autoActivate===true){y(e[i],"mouseover",v)}delete e[i].zcClippingId}}}}return this};B.prototype.elements=function(){var e=s[this.id];return e&&e.elements?e.elements.slice(0):[]};var _=function(e){var t,r,a,i,n,o=[];if(e&&e.nodeType===1&&(t=e.zcClippingId)&&l.hasOwnProperty(t)){r=l[t];if(r&&r.length){for(a=0,i=r.length;a<i;a++){n=s[r[a]].instance;if(n&&n instanceof B){o.push(n)}}}}return o};$.hoverClass="zeroclipboard-is-hover";$.activeClass="zeroclipboard-is-active";if(typeof define==="function"&&define.amd){define(function(){return B})}else if(typeof module==="object"&&module&&typeof module.exports==="object"&&module.exports){module.exports=B}else{u.ZeroClipboard=B}})(function(){return this}());