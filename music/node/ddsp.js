!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mm=e():t.mm=e()}(global,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=30)}([function(t,e){t.exports=require("@tensorflow/tfjs")},,function(t,e){t.exports=require("tone")},,function(t,e,n){"use strict";n.r(e),n.d(e,"Level",(function(){return o})),n.d(e,"verbosity",(function(){return s})),n.d(e,"setVerbosity",(function(){return i})),n.d(e,"log",(function(){return a})),n.d(e,"logWithDuration",(function(){return u}));var o,r=n(6);!function(t){t[t.NONE=0]="NONE",t[t.WARN=5]="WARN",t[t.INFO=10]="INFO",t[t.DEBUG=20]="DEBUG"}(o||(o={}));let s=10;function i(t){t=t}function a(t,e="Magenta.js",n=10){if(0===n)throw Error("Logging level cannot be NONE.");if(s>=n){(5===n?console.warn:console.log)(`%c ${e} `,"background:magenta; color:white",t)}}function u(t,e,n="Magenta.js",o=10){a(`${t} in ${((r.d.now()-e)/1e3).toPrecision(3)}s`,n,o)}},,function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return i}));const o=n(18),r=n(19);n(21);function s(){throw new Error("Cannot check if Safari in Node.js")}function i(t){throw new Error("Cannot use offline audio context in Node.js")}},,function(t,e,n){"use strict";n.d(e,"e",(function(){return l})),n.d(e,"d",(function(){return f})),n.d(e,"f",(function(){return d})),n.d(e,"i",(function(){return h})),n.d(e,"j",(function(){return p})),n.d(e,"a",(function(){return m})),n.d(e,"h",(function(){return y})),n.d(e,"b",(function(){return x})),n.d(e,"g",(function(){return v})),n.d(e,"c",(function(){return j}));var o=n(0),r=n(17),s=n(22),i=n(27),a=n(6),u=n(4);const c=Object(a.b)(16e3);async function l(t){return Object(a.a)(t).then(t=>t.arrayBuffer()).then(t=>c.decodeAudioData(t))}async function f(t){const e=new FileReader;return new Promise((n,o)=>{e.onerror=()=>{e.abort(),o(new DOMException("Something went wrong reading that file."))},e.onload=()=>{n(e.result)},e.readAsArrayBuffer(t)}).then(t=>c.decodeAudioData(t))}function d(t,e){e.power||(e.power=2);const n=function(t,e){const n=e.nFft||2048,o=e.winLength||n,r=e.hopLength||Math.floor(o/4);let s=x(o);s=y(s,n);const i=function(t,e,n){const o=Math.floor((t.length-e)/n)+1,r=Array.from({length:o},(t,n)=>new Float32Array(e));for(let s=0;s<o;s++){const o=s*n,i=t.slice(o,o+e);r[s].set(i),i.length}return r}(t=function(t,e){const n=b(t,e);for(let t=0;t<e;t++)n[t]=n[2*e-t],n[n.length-t-1]=n[n.length-2*e+t-1];return n}(t,Math.floor(n/2)),n,r),a=[],u=i.length,c=n+2;for(let t=0;t<u;t++){const e=new Float32Array(c);a[t]=e}for(let t=0;t<u;t++){const e=M(m(i[t],s));a[t].set(e.slice(0,c))}return a}(t,e),[o,r]=function(t,e){const n=t.map(t=>function(t,e){return t.map(t=>Math.pow(t,e))}(function(t){const e=new Float32Array(t.length/2);for(let n=0;n<t.length/2;n++)e[n]=Math.sqrt(t[2*n]*t[2*n]+t[2*n+1]*t[2*n+1]);return e}(t),e)),o=t[0].length-1;return[n,o]}(n,e.power);e.nFft=r;return function(t,e){const n=[];for(let o=0;o<t.length;o++)n[o]=w(t[o],e);return n}(o,function(t){const e=t.fMin||0,n=t.fMax||t.sampleRate/2,o=t.nMels||128,r=t.nFft||2048,s=function(t,e){return _(0,t/2,Math.floor(1+e/2))}(t.sampleRate,r),i=function(t,e,n){const o=O(e),r=O(n),s=_(o,r,t);return s.map(t=>function(t){return 700*(Math.exp(t/1125)-1)}(t))}(o+2,e,n),a=function(t){const e=new Float32Array(t.length-1);for(let n=0;n<t.length;n++)e[n]=t[n+1]-t[n];return e}(i),u=function(t,e){const n=[];for(let o=0;o<t.length;o++)n[o]=new Float32Array(e.length);for(let o=0;o<t.length;o++)for(let r=0;r<e.length;r++)n[o][r]=t[o]-e[r];return n}(i,s),c=u[0].length,l=[];for(let t=0;t<o;t++){l[t]=new Float32Array(c);for(let e=0;e<u[t].length;e++){const n=-u[t][e]/a[t],o=u[t+2][e]/a[t+1],r=Math.max(0,Math.min(n,o));l[t][e]=r}}for(let t=0;t<l.length;t++){const e=2/(i[2+t]-i[t]);l[t]=l[t].map(t=>t*e)}return l}(e))}function h(t,e=1e-10,n=80){const o=t.length,r=t[0].length,s=[];for(let t=0;t<o;t++)s[t]=new Float32Array(r);for(let n=0;n<o;n++)for(let o=0;o<r;o++){const r=t[n][o];s[n][o]=10*Math.log10(Math.max(e,r))}if(n){if(n<0)throw new Error("topDb must be non-negative.");for(let t=0;t<o;t++){const e=s[t].reduce((t,e)=>Math.max(t,e));for(let o=0;o<r;o++)s[t][o]=Math.max(s[t][o],e-n)}}return s}function g(t){if(1===t.numberOfChannels)return t.getChannelData(0);if(2!==t.numberOfChannels)throw Error(t.numberOfChannels+" channel audio is not supported.");const e=t.getChannelData(0),n=t.getChannelData(1),o=new Float32Array(t.length);for(let r=0;r<t.length;++r)o[r]=(e[r]+n[r])/2;return o}async function p(t,e=16e3){if(t.sampleRate===e)return g(t);const n=t.sampleRate,o=t.length*e/n;if(a.c){u.log("Safari does not support WebAudio resampling, so this may be slow.","O&F",5);const e=g(t),n=new Float32Array(o);return i(s(n,[o]),s(e,[e.length])),n}{const n=new OfflineAudioContext(t.numberOfChannels,t.duration*e,e),o=n.createBufferSource();return o.buffer=t,o.connect(n.destination),o.start(),n.startRendering().then(t=>t.getChannelData(0))}}function w(t,e){if(t.length!==e[0].length)throw new Error(`Each entry in filterbank should have dimensions matching FFT. |mags| = ${t.length}, |filterbank[0]| = ${e[0].length}.`);const n=new Float32Array(e.length);for(let o=0;o<e.length;o++){const r=m(t,e[o]);n[o]=r.reduce((t,e)=>t+e)}return n}function m(t,e){if(t.length!==e.length)return console.error(`Buffer length ${t.length} != window length ${e.length}.`),null;const n=new Float32Array(t.length);for(let o=0;o<t.length;o++)n[o]=e[o]*t[o];return n}function y(t,e){if(t.length>e)throw new Error("Data is longer than length.");const n=Math.floor((e-t.length)/2);return b(t,[n,e-t.length-n])}function b(t,e){let n,o;"object"==typeof e?[n,o]=e:n=o=e;const r=new Float32Array(t.length+n+o);return r.set(t,n),r}function M(t){const e=new r(t.length),n=e.createComplexArray(),o=e.toComplexArray(t);return e.transform(n,o),n}function x(t){const e=new Float32Array(t);for(let n=0;n<t;n++)e[n]=.5*(1-Math.cos(2*Math.PI*n/(t-1)));return e}function _(t,e,n){const o=(e-t)/(n-1),r=new Float32Array(n);for(let e=0;e<n;e++)r[e]=t+o*e;return r}function v(t){let e=o.sub(t,69);return e=o.div(e,12),e=o.pow(2,e),e=o.mul(440,e),e}async function j(t){let e=o.sub(o.div(o.log(t),o.log(2)),o.div(o.log(440),o.log(2)));e=o.mul(12,e),e=o.add(e,69);return await e.array()}function O(t){return 1125*Math.log(1+t/700)}},,,function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return a})),n.d(e,"e",(function(){return u})),n.d(e,"f",(function(){return c})),n.d(e,"d",(function(){return l})),n.d(e,"a",(function(){return f})),n.d(e,"h",(function(){return d})),n.d(e,"g",(function(){return h}));var o=n(0),r=n(8);var s=n(16);const i=16e3,a=250,u=25.58,c=63.07,l=.002,f=.7;async function d(t){let e;return e=await o.loadGraphModel(t,{fromTFHub:!0}),e}async function h(t,e,n){if("webgl"!==o.getBackend())throw new Error("Device does not support webgl.");const u=await Object(r.j)(t,i),c=u.length,l=await async function(t){const e=Math.floor(i/a),n=o.tensor1d(t,"float32"),r=t.length;if(null===n)return[];const s=n.mul(n).reshape([r,1]),u=o.conv1d(s,o.ones([1024,1,1]).div(1024),e,"same").sqrt().squeeze(),c=o.mul(o.log(o.maximum(1e-20,u)).div(o.log(10)),20),l=c.sub(20.7),f=o.maximum(l,-120),d=await f.array();return n.dispose(),s.dispose(),u.dispose(),c.dispose(),l.dispose(),f.dispose(),d}(u),{pitches:f,confidences:d}=await Object(s.a)(e,u,n);return{f0_hz:f,loudness_db:l,confidences:d,originalRecordedBufferLength:c}}},,,,,function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a}));var o=n(0),r=n(8),s=n(11);function i(t,e=0){return o.tidy(()=>{let n=o.mul(t,o.pow(2,e));return n=n.clipByValue(0,Object(r.g)(110).dataSync()[0]),n})}function a(t,e,n){return t.splice(n),function(t,e){const n=[],o=Math.floor(e/t.length),r=e%t.length;for(let e=0;e<t.length;e++){n.push(t[e]);for(let t=1;t<o;t++)n.push(-1);e<r&&n.push(-1)}let s=-1;for(let t=0;t<n.length;t++)if(-1!==n[t]){let e=n[t];const o=s>=0?n[s]:0;-1!==s&&(e-=n[s]);for(let r=s+1;r<t;r++)n[r]=o+e*(r-s)/(t-s);s=t}for(let t=s+1;t<n.length;t++)n[t]=s>=0?n[t-1]:0;return n}(t,e)}function u(t){const e=t*s.f+s.e;return 10*Math.pow(2,1*e/12)}async function c(t,e,n=s.a){const r=[],i=[],a=e.length,c=o.tensor(e),l=512*Math.ceil(a/512),f=c.pad([[0,l-a]]),d=f.size/16e3,h=await t.execute({input_audio_samples:f});let g=await h[0].data();const p=await h[1].data();if(32*(p.length-1)/1e3===d){let t=20;for(let e=0;e<p.length;++e){const n=1-g[e];if(i.push(n),n>=s.a)t=u(p[e]),r.push(t);else{const e=o.truncatedNormal([1],0,s.d),n=1-await e.array();r.push(t*n),e.dispose()}}}else{const e=l/512+1,a=new Float32Array(e);g=new Float32Array(e);for(let e=0;e<l;e+=l/4){const n=f.slice([e],[l/4]),o=await t.execute({input_audio_samples:n}),r=await o[0].data(),s=await o[1].data(),i=Math.floor(e/512);g.set(r,i),a.set(s,i),n.dispose(),o[0].dispose(),o[1].dispose()}let c=20;for(let t=0;t<a.length;++t){const e=1-g[t];if(i.push(e),e>=n)c=u(a[t]),r.push(c);else{const t=o.truncatedNormal([1],0,s.d),e=1-await t.array();r.push(c*e),t.dispose()}}}return h[0].dispose(),h[1].dispose(),c.dispose(),f.dispose(),{pitches:r,confidences:i}}},function(t,e){t.exports=require("fft.js")},function(t,e){t.exports=require("node-fetch")},function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"now",(function(){return r})),n.d(e,"timing",(function(){return s}));const o=t.process.hrtime(),r=()=>{const e=t.process.hrtime(o);return e[0]+e[1]/1e9},s={navigationStart:Date.now()}}.call(this,n(20))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";n.r(e),n.d(e,"userAgent",(function(){return o}));const o=""},function(t,e){t.exports=require("ndarray")},,,,,function(t,e){t.exports=require("ndarray-resample")},,,function(t,e,n){"use strict";n.r(e),n.d(e,"DDSP",(function(){return d}));n(37);var o=n(0),r=n(2),s=n(8),i=n(16),a=n(11);const u=(t,e,n)=>{const o=t.createBuffer(1,e.length,n);return o.copyToChannel(e,0),o};function c(t,e,n,o,r){return new Promise(s=>{const i={loudness_db:[0],f0_hz:[0]};let a=0;for(let s=e;s<n;s++)o&&s>=r?(i.loudness_db[a]=-120,i.f0_hz[a]=-1):(i.loudness_db[a]=t.loudness_db[s],i.f0_hz[a]=t.f0_hz[s]),a+=1;s(i)})}function l(t){return t*a.b}function f(t){return t/a.b}class d{constructor(t,e){this.checkpointUrl=t,e&&(this.settings=e)}async initialize(){let t;o.registerOp("Roll",t=>{const e=o.split(t.inputs[0],2,2),n=o.concat([e[1],e[0]],2);return e.forEach(t=>t.dispose()),n}),o.env().set("WEBGL_PACK",!1),o.env().set("WEBGL_CONV_IM2COL",!1),o.env().set("WEBGL_DELETE_TEXTURE_THRESHOLD",104857600),this.model=await async function(t){return await o.loadGraphModel(t)}(this.checkpointUrl+"/model.json");try{t=await fetch(this.checkpointUrl+"/settings.json").then(t=>t.json())}finally{if(null===this.settings)throw new Error("Passing settings is required if you do not have a settings.json file.")}this.settings={...t,...this.settings},this.initialized=!0}dispose(){this.initialized&&(this.model.dispose(),this.checkpointUrl=null,this.initialized=!1)}isInitialized(){return this.initialized}async memCheck(){return await async function(){const t=window.screen.availWidth*window.screen.availHeight,e=window.devicePixelRatio,n=Math.round(t*e*600/1048576);if(!isNaN(n)&&n<50)throw new Error(`Insufficient memory! Your device has ${n} and recommended memory is 50`);try{if(await o.ready(),"webgl"!==o.getBackend())throw new Error("It looks like your browser does not support webgl.")}catch(t){throw new Error("insufficient memory - "+t)}return!0}()}async synthesize(t,e){null!==e&&(this.settings={...this.settings,...e});const{f0_hz:n,loudness_db:d,confidences:h}=t,g=Object(i.c)(n,d.length,this.settings.modelMaxFrameLength),p=Object(i.c)(h,d.length,this.settings.modelMaxFrameLength),w=await async function(t,e){const n=e.averageMaxLoudness,r=e.meanLoudness,a=e.loudnessThreshold,u=e.meanPitch;let c,l=[];if(t.loudness_db.length>0){const e=o.tidy(()=>{const e=o.tensor1d(t.loudness_db,"float32"),r=e.max(),s=o.sub(n,r),i=o.add(e,s);return e.dispose(),r.dispose(),s.dispose(),i}),s=e.greater(a),i=await o.booleanMaskAsync(e,s),u=await i.array(),f=o.tidy(()=>{const t=u>0?i.mean():e.mean(),s=o.sub(r,t),a=e.add(s).add(0).clipByValue(-120,n),c=a.min(),l=t.sub(c);return a.sub(c).div(l).mul(r- -120).add(-120)}),d=o.reshape(t.confidences,[-1,1,1]),h=o.pool(d,[100,1],"avg","same"),g=h.reshape([-1]),p=o.lessEqual(g,.7);c=o.tidy(()=>{const t=p.mul(-25),e=f.add(t),n=o.maximum(e,-120);return t.dispose(),e.dispose(),n}),l=await c.array(),s.dispose(),e.dispose(),f.dispose(),i.dispose(),h.dispose(),g.dispose(),d.dispose(),p.dispose()}let f=[];if(t.f0_hz.length>0){const e=await Object(s.c)(t.f0_hz),n=o.tidy(()=>{for(let t=0,n=e.length;t<n;++t)e[t]===-1/0&&(e[t]=0);return e}),r=o.lessEqual(t.confidences,.7),l=c.greater(a),d=o.logicalOr(r,l),h=await o.booleanMaskAsync(n,d),g=h.mean(),p=await o.sub(u,g),w=await p.array(),m=o.tidy(()=>{let e=w/12;e=Math.round(e);return Object(i.b)(t.f0_hz,e)});f=await m.array(),c.dispose(),g.dispose(),h.dispose(),p.dispose(),m.dispose(),l.dispose(),d.dispose(),r.dispose()}return{f0_hz:f,loudness_db:l}}({f0_hz:g,loudness_db:d,confidences:p},this.settings),m=[],y=w.loudness_db.length,b=f(y);let M=!1;const x=f(this.settings.modelMaxFrameLength);let _;const v=1*a.c;for(let t=0;t<b;t+=x-1){const e=Math.floor(l(t)),n=l(t+x);n>y&&(M=!0);const{f0_hz:r,loudness_db:s}=await c(w,e,n,M,y),i=o.tensor1d(r,"float32"),a=o.tensor1d(s,"float32"),u=await this.model.predict({f0_hz:i,loudness_db:a}),f=await u.data();m.push(f),u.dispose(),i.dispose(),a.dispose()}if(b<=x)_=m[0];else{const t=[];for(let e=0;e<m.length;e++){const n=m[e];t.push(n)}_=function(t,e){const n=t.reduce((t,e)=>t+e.length,0),o=new Float32Array(n);let r=0;for(let n=0;n<t.length;n++){const u=t[n],c=n<t.length-1;if(0===n&&(o.set(u,r),r+=u.length),c){const c=t[n+1],l=r-e;for(let t=l,n=0,f=u.length-e;t<r&&n<c.length;t++,n++,f++){const e=(t-l)/(r-l);o[t]=(s=u[f],i=c[n],s*(1-(a=e))+i*a)}o.set(c.slice(e),r),r+=c.slice(e).length}}var s,i,a;return o}(t,v)}const j=_.slice(0,t.originalRecordedBufferLength).map(t=>t*(this.settings.postGain||1)),O=new r.Context,A=u(O,j,a.c),F=await Object(s.j)(A,48e3);return await async function({audioCtx:t,arrayBuffer:e,sampleRate:n}){let o;r.setContext(t);let s=u(t,e,n);const i=r.Offline(()=>{const t=new r.Compressor({attack:.001,release:.001,threshold:-6}).toDestination(),e=new r.Reverb({wet:.3,decay:3}).connect(t),n=new r.Filter(8e3,"lowpass",-24).connect(e);return new r.Player({url:s}).connect(n).start(),e.ready},e.length/n);o=await i;const a=o.getChannelData(0);return s=null,o.dispose(),o=null,a}({audioCtx:O,arrayBuffer:F,sampleRate:48e3})}}},,,,,,,function(t,e){t.exports=require("@tensorflow/tfjs-backend-webgl")}])}));