!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CgCountDown",[],t):"object"==typeof exports?exports.CgCountDown=t():e.CgCountDown=t()}(this,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var o in a)e.o(a,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:a[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function a(e,t){var a=document.createElement("span");a.className="flip-clock__piece",a.innerHTML='<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b><span class="flip-clock__slot">'+e+"</span>",this.el=a;var o=a.querySelector(".card__top"),r=a.querySelector(".card__bottom"),n=a.querySelector(".card__back"),c=a.querySelector(".card__back .card__bottom");this.update=function(e){(e=("0"+e).slice(-2))!==this.currentValue&&(this.currentValue>=0&&(n.setAttribute("data-value",this.currentValue),r.setAttribute("data-value",this.currentValue)),this.currentValue=e,o.innerText=this.currentValue,c.setAttribute("data-value",this.currentValue),this.el.classList.remove("flip"),this.el.offsetWidth,this.el.classList.add("flip"))},this.update(t)}function o(e){var t=Date.parse(e)-Date.parse(new Date);return{Total:t,Days:Math.floor(t/864e5),Hours:Math.floor(t/36e5%24),Minutes:Math.floor(t/1e3/60%60),Seconds:Math.floor(t/1e3%60)}}function r(e,t,r){t=!!t&&new Date(Date.parse(t)),r=r||function(){};var n=o;this.el=document.getElementById(e),this.el.className="flip-clock";var c,l,s={},i=n(t);for(c in i)"Total"!==c&&(s[c]=new a(c,i[c]),this.el.appendChild(s[c].el));var u=0;setTimeout((function e(){if(l=requestAnimationFrame(e),!(u++%10)){var a=n(t);if(a.Total<0){for(c in cancelAnimationFrame(l),s)s[c].update(0);r()}else for(c in s)s[c].update(a[c])}}),500)}function n(e){const t=e.split(/[/ :]/).map((e=>parseInt(e,10)));return new Date(t[0],t[1]-1,t[2],t[3],t[4])}return e.r(t),e.d(t,{Clock:()=>r,convertStringToDate:()=>n}),t})()));