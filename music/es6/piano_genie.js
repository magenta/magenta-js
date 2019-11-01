!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@tensorflow/tfjs")):"function"==typeof define&&define.amd?define(["tf"],e):"object"==typeof exports?exports.piano_genie=e(require("@tensorflow/tfjs")):t.piano_genie=e(t.tf)}(self,(function(t){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=68)}({0:function(e,s){e.exports=t},68:function(t,e,s){"use strict";s.r(e);var i=s(0);const n=31.25,r=32,o=2,a=128,l=8,c=88;function u(t){for(let e=0;e<o;++e)t.c[e].dispose(),t.h[e].dispose()}function d(t,e,s){if((e=void 0!==e?e:1)<0||e>1)throw new Error("Invalid temperature specified");let n;if(0===e)n=i.argMax(t,0);else{e<1&&(t=i.div(t,i.scalar(e,"float32")));const r=i.reshape(i.softmax(t,0),[1,-1]),o=i.multinomial(r,1,s,!0);n=i.reshape(o,[])}return n}class h{constructor(t){this.checkpointURL=t,this.initialized=!1}isInitialized(){return this.initialized}async initialize(t){if(this.initialized&&this.dispose(),void 0===this.checkpointURL&&void 0===t)throw new Error("Need to specify either URI or static variables");if(void 0===t){const t=await fetch(`${this.checkpointURL}/weights_manifest.json`).then(t=>t.json()).then(t=>i.io.loadWeights(t,this.checkpointURL));this.modelVars=t}else this.modelVars=t;this.decLSTMCells=[],this.decForgetBias=i.scalar(1,"float32");for(let t=0;t<o;++t){const e=`phero_model/decoder/rnn/rnn/multi_rnn_cell/cell_${t}/lstm_cell/`;this.decLSTMCells.push((t,s,n)=>i.basicLSTMCell(this.decForgetBias,this.modelVars[e+"kernel"],this.modelVars[e+"bias"],t,s,n))}this.resetState(),this.initialized=!0,this.next(0),this.resetState()}getRnnInputFeats(){return i.tidy(()=>{const t=i.tensor1d([this.button],"float32");return i.sub(i.mul(2,i.div(t,l-1)),1).as1D()})}next(t,e,s){return this.nextWithCustomSamplingFunction(t,t=>d(t,e,s))}nextFromKeyWhitelist(t,e,s,n){return this.nextWithCustomSamplingFunction(t,t=>{const r=i.tensor1d(e,"int32");let o=d(t=i.gather(t,r),s,n);const a=i.gather(r,i.reshape(o,[1]));return o=i.reshape(a,[])})}nextWithCustomSamplingFunction(t,e){const s=this.lastState;this.button=t;const i=this.getRnnInputFeats(),[n,r]=this.evaluateModelAndSample(i,s,e);return i.dispose(),u(this.lastState),this.lastState=n,r}evaluateModelAndSample(t,e,s){if(!this.initialized)throw new Error("Model is not initialized.");const[n,r]=i.tidy(()=>{let n=i.matMul(i.expandDims(t,0),this.modelVars["phero_model/decoder/rnn_input/dense/kernel"]);n=i.add(n,this.modelVars["phero_model/decoder/rnn_input/dense/bias"]);const[r,a]=i.multiRNNCell(this.decLSTMCells,n,e.c,e.h),l={c:r,h:a};let u=i.matMul(a[o-1],this.modelVars["phero_model/decoder/pitches/dense/kernel"]);u=i.add(u,this.modelVars["phero_model/decoder/pitches/dense/bias"]);const d=i.reshape(u,[c]);return[l,s(d).dataSync()[0]]});return[n,r]}resetState(){void 0!==this.lastState&&u(this.lastState),this.lastState=function(){const t={c:[],h:[]};for(let e=0;e<o;++e)t.c.push(i.zeros([1,a],"float32")),t.h.push(i.zeros([1,a],"float32"));return t}()}dispose(){this.initialized&&(Object.keys(this.modelVars).forEach(t=>this.modelVars[t].dispose()),this.decForgetBias.dispose(),u(this.lastState),this.initialized=!1)}}class p extends h{getRnnInputFeats(){return i.tidy(()=>{const t=[super.getRnnInputFeats()],e=this.lastOutput,s=this.lastTime,o=this.time;let a;void 0===this.deltaTimeOverride?a=(o.getTime()-s.getTime())/1e3:(a=this.deltaTimeOverride,this.deltaTimeOverride=void 0);const l=i.scalar(e,"int32"),u=i.addStrict(l,i.scalar(1,"int32")),d=i.cast(i.oneHot(u,c+1),"float32");t.push(d);const h=i.scalar(a,"float32"),p=i.round(i.mul(h,n)),m=i.minimum(p,r),f=i.cast(i.add(m,1e-4),"int32"),S=i.oneHot(f,r+1),y=i.cast(S,"float32");return t.push(y),this.lastTime=o,i.concat1d(t)})}nextWithCustomSamplingFunction(t,e){this.time=new Date;const s=super.nextWithCustomSamplingFunction(t,e);return this.lastOutput=s,this.lastTime=this.time,s}overrideLastOutput(t){this.lastOutput=t}overrideDeltaTime(t){this.deltaTimeOverride=t}resetState(){super.resetState(),this.lastOutput=-1,this.lastTime=new Date,this.lastTime.setSeconds(this.lastTime.getSeconds()-1e5),this.time=new Date}}var m,f;!function(t){t[t.None=0]="None",t[t.C=1]="C",t[t.Cs=2]="Cs",t[t.D=3]="D",t[t.Eb=4]="Eb",t[t.E=5]="E",t[t.F=6]="F",t[t.Fs=7]="Fs",t[t.G=8]="G",t[t.Ab=9]="Ab",t[t.A=10]="A",t[t.Bb=11]="Bb",t[t.B=12]="B"}(m||(m={})),function(t){t[t.None=0]="None",t[t.Maj=1]="Maj",t[t.Min=2]="Min",t[t.Aug=3]="Aug",t[t.Dim=4]="Dim",t[t.Seven=5]="Seven",t[t.Maj7=6]="Maj7",t[t.Min7=7]="Min7",t[t.Min7b5=8]="Min7b5"}(f||(f={}));class S extends p{getRnnInputFeats(){return i.tidy(()=>{const t=[super.getRnnInputFeats()],e=i.scalar(this.chordRoot,"int32"),s=i.subStrict(e,i.scalar(1,"int32")),n=i.cast(i.oneHot(s,12),"float32");t.push(n);const r=i.scalar(this.chordFamily,"int32"),o=i.subStrict(r,i.scalar(1,"int32")),a=i.cast(i.oneHot(o,8),"float32");return t.push(a),i.concat1d(t)})}setChordRoot(t){this.chordRoot=t}setChordFamily(t){this.chordFamily=t}resetState(){super.resetState(),this.chordRoot=m.None,this.chordFamily=f.None}}class y extends p{getRnnInputFeats(){return i.tidy(()=>{const t=[super.getRnnInputFeats()],e=i.scalar(this.keySignature,"int32"),s=i.subStrict(e,i.scalar(1,"int32")),n=i.cast(i.oneHot(s,12),"float32");return t.push(n),i.concat1d(t)})}setKeySignature(t){this.keySignature=t}resetState(){super.resetState(),this.keySignature=m.None}}class g extends y{getRnnInputFeats(){return i.tidy(()=>{const t=[super.getRnnInputFeats()],e=i.scalar(this.chordRoot,"int32"),s=i.subStrict(e,i.scalar(1,"int32")),n=i.cast(i.oneHot(s,12),"float32");t.push(n);const r=i.scalar(this.chordFamily,"int32"),o=i.subStrict(r,i.scalar(1,"int32")),a=i.cast(i.oneHot(o,8),"float32");return t.push(a),i.concat1d(t)})}setChordRoot(t){this.chordRoot=t}setChordFamily(t){this.chordFamily=t}resetState(){super.resetState(),this.chordRoot=m.None,this.chordFamily=f.None}}class b extends y{getRnnInputFeats(){return i.tidy(()=>{const t=[super.getRnnInputFeats()],e=i.scalar(this.chordFamily,"int32"),s=i.subStrict(e,i.scalar(1,"int32")),n=i.cast(i.oneHot(s,8),"float32");return t.push(n),i.concat1d(t)})}setChordFamily(t){this.chordFamily=t}resetState(){super.resetState(),this.chordFamily=f.None}}class F extends p{}class v extends S{}class x extends y{}class R extends g{}class M extends b{}s.d(e,"PianoGenie",(function(){return F})),s.d(e,"PianoGenieKeysig",(function(){return x})),s.d(e,"PianoGenieChord",(function(){return v})),s.d(e,"PianoGenieKeysigChordFamily",(function(){return M})),s.d(e,"PianoGenieKeysigChord",(function(){return R}))}})}));