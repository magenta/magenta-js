!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@tensorflow/tfjs"),require("tone")):"function"==typeof define&&define.amd?define(["tf","Tone"],t):"object"==typeof exports?exports.ddsp=t(require("@tensorflow/tfjs"),require("tone")):e.ddsp=t(e.tf,e.Tone)}(self,(function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=186)}([function(e,t,n){"use strict";n.d(t,"T",(function(){return U.b})),n.d(t,"Fb",(function(){return Se.a})),n.d(t,"Kb",(function(){return Se.b})),n.d(t,"W",(function(){return Te})),n.d(t,"Y",(function(){return Fe})),n.d(t,"Z",(function(){return V})),n.d(t,"ab",(function(){return X})),n.d(t,"bb",(function(){return Be})),n.d(t,"cb",(function(){return Je})),n.d(t,"db",(function(){return ut})),n.d(t,"eb",(function(){return ct})),n.d(t,"hb",(function(){return ht})),n.d(t,"mb",(function(){return dt})),n.d(t,"nb",(function(){return ft})),n.d(t,"ob",(function(){return pt})),n.d(t,"pb",(function(){return gt})),n.d(t,"rb",(function(){return mt})),n.d(t,"sb",(function(){return bt})),n.d(t,"tb",(function(){return vt})),n.d(t,"ub",(function(){return $t})),n.d(t,"xb",(function(){return _e})),n.d(t,"yb",(function(){return Ot})),n.d(t,"zb",(function(){return kt})),n.d(t,"Bb",(function(){return Rt})),n.d(t,"Cb",(function(){return At})),n.d(t,"Db",(function(){return Tt})),n.d(t,"Eb",(function(){return _t})),n.d(t,"Gb",(function(){return Le.a})),n.d(t,"Ib",(function(){return Nt})),n.d(t,"Mb",(function(){return Bt})),n.d(t,"Nb",(function(){return Et})),n.d(t,"Ob",(function(){return Pt})),n.d(t,"Jb",(function(){return it})),n.d(t,"ib",(function(){return $n})),n.d(t,"Hb",(function(){return On})),n.d(t,"gb",(function(){return kn})),n.d(t,"vb",(function(){return Rn})),n.d(t,"wb",(function(){return Xn.e})),n.d(t,"jb",(function(){return c.b})),n.d(t,"qb",(function(){return qn.a})),n.d(t,"kb",(function(){return r})),n.d(t,"Lb",(function(){return Re})),n.d(t,"X",(function(){return s})),n.d(t,"Ab",(function(){return o})),n.d(t,"fb",(function(){return Br})),n.d(t,"lb",(function(){return i})),n.d(t,"w",(function(){return zr.b})),n.d(t,"k",(function(){return zr.a})),n.d(t,"a",(function(){return z.a})),n.d(t,"b",(function(){return z.d})),n.d(t,"c",(function(){return z.m})),n.d(t,"d",(function(){return z.o})),n.d(t,"e",(function(){return z.r})),n.d(t,"f",(function(){return z.v})),n.d(t,"g",(function(){return z.w})),n.d(t,"h",(function(){return z.y})),n.d(t,"i",(function(){return z.z})),n.d(t,"j",(function(){return z.G})),n.d(t,"l",(function(){return z.R})),n.d(t,"m",(function(){return z.W})),n.d(t,"n",(function(){return z.X})),n.d(t,"o",(function(){return z.Y})),n.d(t,"p",(function(){return z.ab})),n.d(t,"q",(function(){return z.bb})),n.d(t,"s",(function(){return z.eb})),n.d(t,"u",(function(){return z.jb})),n.d(t,"t",(function(){return z.ib})),n.d(t,"v",(function(){return z.kb})),n.d(t,"x",(function(){return z.sb})),n.d(t,"y",(function(){return z.yb})),n.d(t,"z",(function(){return z.zb})),n.d(t,"A",(function(){return z.Cb})),n.d(t,"B",(function(){return z.Db})),n.d(t,"C",(function(){return z.Fb})),n.d(t,"D",(function(){return z.Ib})),n.d(t,"E",(function(){return z.Kb})),n.d(t,"I",(function(){return z.Pb})),n.d(t,"F",(function(){return z.Mb})),n.d(t,"G",(function(){return z.Nb})),n.d(t,"H",(function(){return z.Ob})),n.d(t,"J",(function(){return z.Xb})),n.d(t,"K",(function(){return z.bc})),n.d(t,"M",(function(){return z.jc})),n.d(t,"O",(function(){return z.qc})),n.d(t,"N",(function(){return z.oc})),n.d(t,"Q",(function(){return z.xc})),n.d(t,"P",(function(){return z.wc})),n.d(t,"R",(function(){return z.Ac})),n.d(t,"S",(function(){return z.Cc})),n.d(t,"U",(function(){return z.Gc})),n.d(t,"V",(function(){return z.Hc})),n.d(t,"r",(function(){return z.db})),n.d(t,"L",(function(){return z.hc}));var r={};n.r(r),n.d(r,"copyModel",(function(){return B})),n.d(r,"listModels",(function(){return D})),n.d(r,"moveModel",(function(){return P})),n.d(r,"removeModel",(function(){return L})),n.d(r,"browserFiles",(function(){return J})),n.d(r,"browserHTTPRequest",(function(){return ue})),n.d(r,"concatenateArrayBuffers",(function(){return l.d})),n.d(r,"decodeWeights",(function(){return l.e})),n.d(r,"encodeWeights",(function(){return l.f})),n.d(r,"fromMemory",(function(){return he})),n.d(r,"getLoadHandlers",(function(){return g})),n.d(r,"getModelArtifactsInfoForJSON",(function(){return l.g})),n.d(r,"getSaveHandlers",(function(){return p})),n.d(r,"http",(function(){return ie})),n.d(r,"isHTTPScheme",(function(){return ae})),n.d(r,"loadWeights",(function(){return ne})),n.d(r,"registerLoadRouter",(function(){return f})),n.d(r,"registerSaveRouter",(function(){return d})),n.d(r,"weightsLoaderFactory",(function(){return re})),n.d(r,"withSaveHandler",(function(){return de}));var o={};n.r(o),n.d(o,"assertParamsValid",(function(){return fe})),n.d(o,"maskToAxes",(function(){return pe})),n.d(o,"computeOutShape",(function(){return ge})),n.d(o,"stridesWithElidedDims",(function(){return me})),n.d(o,"getNormalizedAxes",(function(){return ye})),n.d(o,"startIndicesWithElidedDims",(function(){return ve})),n.d(o,"stopIndicesWithElidedDims",(function(){return we})),n.d(o,"stridesForAxis",(function(){return Ce})),n.d(o,"startForAxis",(function(){return Ie})),n.d(o,"stopForAxis",(function(){return Ee})),n.d(o,"isSliceContinous",(function(){return $e})),n.d(o,"computeFlatOffset",(function(){return Oe})),n.d(o,"parseSliceParams",(function(){return ke}));var a={};n.r(a),n.d(a,"segOpComputeOptimalWindowSize",(function(){return _r})),n.d(a,"computeOutShape",(function(){return Nr})),n.d(a,"collectGatherOpShapeInfo",(function(){return Fr}));var s={};n.r(s),n.d(s,"axesAreInnerMostDims",(function(){return Ze})),n.d(s,"combineLocations",(function(){return et})),n.d(s,"computeOutAndReduceShapes",(function(){return tt})),n.d(s,"expandShapeToKeepDim",(function(){return nt})),n.d(s,"assertAxesAreInnerMostDims",(function(){return rt})),n.d(s,"getAxesPermutation",(function(){return ot})),n.d(s,"getUndoAxesPermutation",(function(){return at})),n.d(s,"getInnerMostAxes",(function(){return st})),n.d(s,"getBroadcastDims",(function(){return jt})),n.d(s,"getReductionAxes",(function(){return Dt})),n.d(s,"assertAndGetBroadcastShape",(function(){return Lt})),n.d(s,"assertParamsConsistent",(function(){return je})),n.d(s,"computeOutShape",(function(){return De})),n.d(s,"computeDilation2DInfo",(function(){return Pe})),n.d(s,"computePool2DInfo",(function(){return Me})),n.d(s,"computePool3DInfo",(function(){return Ue})),n.d(s,"computeConv2DInfo",(function(){return Ve})),n.d(s,"computeConv3DInfo",(function(){return ze})),n.d(s,"computeDefaultPad",(function(){return We})),n.d(s,"tupleValuesAreOne",(function(){return Ke})),n.d(s,"eitherStridesOrDilationsAreOne",(function(){return Ye})),n.d(s,"convertConv2DDataFormat",(function(){return Qe})),n.d(s,"getFusedDyActivation",(function(){return Jn})),n.d(s,"getFusedBiasGradient",(function(){return Zn})),n.d(s,"applyActivation",(function(){return er})),n.d(s,"shouldFuse",(function(){return tr})),n.d(s,"PARALLELIZE_THRESHOLD",(function(){return nr})),n.d(s,"computeOptimalWindowSize",(function(){return rr})),n.d(s,"slice_util",(function(){return o})),n.d(s,"upcastType",(function(){return Se.b})),n.d(s,"getImageCenter",(function(){return or})),n.d(s,"getReshaped",(function(){return ar})),n.d(s,"getPermuted",(function(){return sr})),n.d(s,"getReshapedPermuted",(function(){return ir})),n.d(s,"getSliceBeginCoords",(function(){return ur})),n.d(s,"getSliceSize",(function(){return cr})),n.d(s,"prepareAndValidate",(function(){return lr})),n.d(s,"validateUpdateShape",(function(){return hr})),n.d(s,"validateInput",(function(){return dr})),n.d(s,"calculateShapes",(function(){return fr})),n.d(s,"SELU_SCALEALPHA",(function(){return pr})),n.d(s,"SELU_SCALE",(function(){return gr})),n.d(s,"ERF_P",(function(){return mr})),n.d(s,"ERF_A1",(function(){return br})),n.d(s,"ERF_A2",(function(){return xr})),n.d(s,"ERF_A3",(function(){return yr})),n.d(s,"ERF_A4",(function(){return vr})),n.d(s,"ERF_A5",(function(){return wr})),n.d(s,"warn",(function(){return Cr})),n.d(s,"log",(function(){return Ir})),n.d(s,"mergeRealAndImagArrays",(function(){return Er})),n.d(s,"splitRealAndImagArrays",(function(){return $r})),n.d(s,"complexWithEvenIndex",(function(){return Or})),n.d(s,"complexWithOddIndex",(function(){return kr})),n.d(s,"getComplexWithIndex",(function(){return Rr})),n.d(s,"assignToTypedArray",(function(){return Sr})),n.d(s,"exponents",(function(){return Ar})),n.d(s,"exponent",(function(){return Tr})),n.d(s,"prepareSplitSize",(function(){return St})),n.d(s,"segment_util",(function(){return a})),n.d(s,"castTensor",(function(){return jr})),n.d(s,"reshapeTensor",(function(){return Dr})),n.d(s,"linspaceImpl",(function(){return Lr}));var i={};n.r(i),n.d(i,"nonMaxSuppressionV3Impl",(function(){return nn})),n.d(i,"nonMaxSuppressionV4Impl",(function(){return rn})),n.d(i,"nonMaxSuppressionV5Impl",(function(){return on})),n.d(i,"split",(function(){return Pr})),n.d(i,"tile",(function(){return Mr})),n.d(i,"topkImpl",(function(){return Ur})),n.d(i,"whereImpl",(function(){return Vr}));var u=n(6),c=(n(39),n(11)),l=n(17);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class h{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==h.instance&&(h.instance=new h),h.instance}static registerSaveRouter(e){h.getInstance().saveRouters.push(e)}static registerLoadRouter(e){h.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return h.getHandlers(e,"save")}static getLoadHandlers(e,t){return h.getHandlers(e,"load",t)}static getHandlers(e,t,n){const r=[];return("load"===t?h.getInstance().loadRouters:h.getInstance().saveRouters).forEach(t=>{const o=t(e,n);null!==o&&r.push(o)}),r}}const d=e=>h.registerSaveRouter(e),f=e=>h.registerLoadRouter(e),p=e=>h.getSaveHandlers(e),g=(e,t)=>h.getLoadHandlers(e,t)
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */;function m(){if(!Object(c.b)().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw new Error("The current browser does not appear to support IndexedDB.");return t}function b(e){const t=e.result;t.createObjectStore("models_store",{keyPath:"modelPath"}),t.createObjectStore("model_info_store",{keyPath:"modelPath"})}class x{constructor(e){if(this.indexedDB=m(),null==e||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{const r=this.indexedDB.open("tensorflowjs",1);r.onupgradeneeded=()=>b(r),r.onsuccess=()=>{const o=r.result;if(null==t){const t=o.transaction("models_store","readonly"),r=t.objectStore("models_store").get(this.modelPath);r.onsuccess=()=>{if(null==r.result)return o.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(o.close(),n(r.error)),t.oncomplete=()=>o.close()}else{const r=Object(l.g)(t),a=o.transaction("model_info_store","readwrite");let s=a.objectStore("model_info_store");const i=s.put({modelPath:this.modelPath,modelArtifactsInfo:r});let u;i.onsuccess=()=>{u=o.transaction("models_store","readwrite");const i=u.objectStore("models_store").put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r});i.onsuccess=()=>e({modelArtifactsInfo:r}),i.onerror=e=>{s=a.objectStore("model_info_store");const t=s.delete(this.modelPath);t.onsuccess=()=>(o.close(),n(i.error)),t.onerror=e=>(o.close(),n(i.error))}},i.onerror=e=>(o.close(),n(i.error)),a.oncomplete=()=>{null==u?o.close():u.oncomplete=()=>o.close()}}},r.onerror=e=>n(r.error)})}}x.URL_SCHEME="indexeddb://";const y=e=>{return Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(x.URL_SCHEME)?(t=e.slice(x.URL_SCHEME.length),new x(t)):null;var t};h.registerSaveRouter(y),h.registerLoadRouter(y);class v{constructor(){this.indexedDB=m()}async listModels(){return new Promise((e,t)=>{const n=this.indexedDB.open("tensorflowjs",1);n.onupgradeneeded=()=>b(n),n.onsuccess=()=>{const r=n.result,o=r.transaction("model_info_store","readonly"),a=o.objectStore("model_info_store").getAll();a.onsuccess=()=>{const t={};for(const e of a.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},a.onerror=e=>(r.close(),t(a.error)),o.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){var t;return e=(t=e).startsWith(x.URL_SCHEME)?t.slice(x.URL_SCHEME.length):t,new Promise((t,n)=>{const r=this.indexedDB.open("tensorflowjs",1);r.onupgradeneeded=()=>b(r),r.onsuccess=()=>{const o=r.result,a=o.transaction("model_info_store","readwrite"),s=a.objectStore("model_info_store"),i=s.get(e);let u;i.onsuccess=()=>{if(null==i.result)return o.close(),n(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const r=s.delete(e),a=()=>{u=o.transaction("models_store","readwrite");const r=u.objectStore("models_store").delete(e);r.onsuccess=()=>t(i.result.modelArtifactsInfo),r.onerror=e=>n(i.error)};r.onsuccess=a,r.onerror=e=>(a(),o.close(),n(i.error))}},i.onerror=e=>(o.close(),n(i.error)),a.oncomplete=()=>{null==u?o.close():u.oncomplete=()=>o.close()}},r.onerror=e=>n(r.error)})}}var w=n(16);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const C="tensorflowjs_models",I="info",E="model_topology",$="weight_specs",O="weight_data",k="model_metadata";function R(e){return{info:[C,e,I].join("/"),topology:[C,e,E].join("/"),weightSpecs:[C,e,$].join("/"),weightData:[C,e,O].join("/"),modelMetadata:[C,e,k].join("/")}}function S(e){const t=e.split("/");if(t.length<3)throw new Error("Invalid key format: "+e);return t.slice(1,t.length-1).join("/")}class A{constructor(e){if(!Object(c.b)().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=R(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=Object(l.g)(e);try{return this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,Object(l.a)(e.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata})),{modelArtifactsInfo:r}}catch(e){throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(null==n)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;const r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==r)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;const o=this.LS.getItem(this.keys.modelMetadata);if(null!=o){const e=JSON.parse(o);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,t.userDefinedMetadata=e.userDefinedMetadata}const a=this.LS.getItem(this.keys.weightData);if(null==a)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=Object(l.b)(a),t}}A.URL_SCHEME="localstorage://";const T=e=>{return Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(A.URL_SCHEME)?(t=e.slice(A.URL_SCHEME.length),new A(t)):null;var t};h.registerSaveRouter(T),h.registerLoadRouter(T);class _{constructor(){Object(w.b)(Object(c.b)().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),Object(w.b)("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const e={},t=C+"/",n="/"+I;for(let r=0;r<this.LS.length;++r){const o=this.LS.key(r);if(o.startsWith(t)&&o.endsWith(n)){e[S(o)]=JSON.parse(this.LS.getItem(o))}}return e}async removeModel(e){var t;const n=R(e=(t=e).startsWith(A.URL_SCHEME)?t.slice(A.URL_SCHEME.length):t);if(null==this.LS.getItem(n.info))throw new Error(`Cannot find model at path '${e}'`);const r=JSON.parse(this.LS.getItem(n.info));return this.LS.removeItem(n.info),this.LS.removeItem(n.topology),this.LS.removeItem(n.weightSpecs),this.LS.removeItem(n.weightData),r}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class N{constructor(){this.managers={}}static getInstance(){return null==N.instance&&(N.instance=new N),N.instance}static registerManager(e,t){Object(w.b)(null!=e,()=>"scheme must not be undefined or null."),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),Object(w.b)(e.length>0,()=>"scheme must not be an empty string.");const n=N.getInstance();Object(w.b)(null==n.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),n.managers[e]=t}static getManager(e){const t=this.getInstance().managers[e];if(null==t)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(this.getInstance().managers)}}function F(e){if(-1===e.indexOf("://"))throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+N.getSchemes().join(","));return{scheme:e.split("://")[0],path:e.split("://")[1]}}async function j(e,t,n=!1){Object(w.b)(e!==t,()=>`Old path and new path are the same: '${e}'`);const r=h.getLoadHandlers(e);Object(w.b)(r.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),Object(w.b)(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${e}.`);const o=r[0],a=h.getSaveHandlers(t);Object(w.b)(a.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),Object(w.b)(a.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${t}.`);const s=a[0],i=F(e).scheme,u=F(e).path,c=i===F(e).scheme,l=await o.load();n&&c&&await N.getManager(i).removeModel(u);const d=await s.save(l);return n&&!c&&await N.getManager(i).removeModel(u),d.modelArtifactsInfo}async function D(){const e=N.getSchemes(),t={};for(const n of e){const e=await N.getManager(n).listModels();for(const r in e){t[n+"://"+r]=e[r]}}return t}async function L(e){const t=F(e);return N.getManager(t.scheme).removeModel(t.path)}async function B(e,t){return j(e,t,!1)}async function P(e,t){return j(e,t,!0)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class M{fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error("Browser's encoder only supports utf-8, but got "+t);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}}if(Object(c.b)().get("IS_BROWSER")){Object(c.b)().setPlatform("browser",new M);try{N.registerManager(A.URL_SCHEME,new _)}catch(e){}try{N.registerManager(x.URL_SCHEME,new v)}catch(e){}}n(163);var U=n(5);
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function V(e,t="float32",n){return t=t||"float32",w.c(e),new U.b(e,t,n)}var z=n(1),W=n(3),G=n(4);const X=Object(G.a)({cast_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(W.a)(e,"x","cast");if(!w.B(t))throw new Error("Failed to cast to unknown dtype "+t);if("string"===t&&"string"!==n.dtype||"string"!==t&&"string"===n.dtype)throw new Error("Only strings can be casted to strings");const r={x:n},o={dtype:t};return u.a.runKernelFunc(e=>e.cast(n,t),r,null,z.v,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const q=Object(G.a)({clone_:function(e){const t=Object(W.a)(e,"x","clone",null),n={x:t};return u.a.runKernelFunc(()=>u.a.makeTensorFromDataId(t.dataId,t.shape,t.dtype),n,null,z.jb)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object(u.b)();const H={buffer:V,cast:X,clone:q,print:function(e,t=!1){console.log(e.toString(t))}};Object(U.e)(H);function K(e){return new Promise(e=>setTimeout(e)).then(e)}class Y{constructor(e){if(!Object(c.b)().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(Y.URL_SCHEME)&&(e=e.slice(Y.URL_SCHEME.length)),null!=e&&0!==e.length||(e="model"),this.modelTopologyFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw new Error("Browser downloads are not supported in this environment since `document` is not present");const t=window.URL.createObjectURL(new Blob([e.weightData],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:n},o=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),a=null==this.jsonAnchor?document.createElement("a"):this.jsonAnchor;if(a.download=this.modelTopologyFileName,a.href=o,await K(()=>a.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){const e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=t,await K(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Object(l.g)(e)}}}}Y.URL_SCHEME="downloads://";class Q{constructor(e){if(null==e||e.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+e);this.files=e}async load(){const e=this.files[0],t=this.files.slice(1);return new Promise((n,r)=>{const o=new FileReader;o.onload=o=>{const a=JSON.parse(o.target.result),s=a.modelTopology;if(null==s)return void r(new Error("modelTopology field is missing from file "+e.name));0===t.length&&n({modelTopology:s});const i=a.weightsManifest;if(null==i)return void r(new Error("weightManifest field is missing from file "+e.name));let u;try{u=this.checkManifestAndWeightFiles(i,t)}catch(e){return void r(e)}const c=[],h=[],d=[];i.forEach(e=>{e.paths.forEach(e=>{h.push(e),d.push(null)}),c.push(...e.weights)}),i.forEach(e=>{e.paths.forEach(e=>{const t=new FileReader;t.onload=t=>{const r=t.target.result,o=h.indexOf(e);d[o]=r,-1===d.indexOf(null)&&n({modelTopology:s,weightSpecs:c,weightData:Object(l.d)(d),format:a.format,generatedBy:a.generatedBy,convertedBy:a.convertedBy,userDefinedMetadata:a.userDefinedMetadata})},t.onerror=t=>r(`Failed to weights data from file of path '${e}'.`),t.readAsArrayBuffer(u[e])})})},o.onerror=t=>r(`Failed to read model topology and weights manifest JSON from file '${e.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),o.readAsText(e)})}checkManifestAndWeightFiles(e,t){const n=[],r=t.map(e=>Object(l.c)(e.name)),o={};for(const a of e)a.paths.forEach(e=>{const a=Object(l.c)(e);if(-1!==n.indexOf(a))throw new Error(`Duplicate file basename found in weights manifest: '${a}'`);if(n.push(a),-1===r.indexOf(a))throw new Error(`Weight file with basename '${a}' is not provided.`);o[e]=t[r.indexOf(a)]});if(n.length!==t.length)throw new Error(`Mismatch in the number of files in weights manifest (${n.length}) and the number of weight files provided (${t.length}).`);return o}}function J(e){return new Q(e)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Z(e,t,n,r){!function(e){Object(w.b)(null!=e&&Array.isArray(e)&&e.length>0,()=>"promises must be a none empty array")}(e),function(e,t){Object(w.b)(e>=0&&e<=1,()=>"Progress fraction must be in range [0, 1], but got startFraction "+e),Object(w.b)(t>=0&&t<=1,()=>"Progress fraction must be in range [0, 1], but got endFraction "+t),Object(w.b)(t>=e,()=>`startFraction must be no more than endFraction, but got startFraction ${e} and endFraction `+t)}(n=null==n?0:n,r=null==r?1:r);let o=0;return Promise.all(e.map(a=>(a.then(a=>{const s=n+ ++o/e.length*(r-n);return t(s),a}),a)))}h.registerSaveRouter(e=>Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Y.URL_SCHEME)?function(e="model"){return new Y(e)}(e.slice(Y.URL_SCHEME.length)):null);var ee=n(42);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function te(e,t){null==t&&(t={});const n=null==t.fetchFunc?Object(c.b)().platform.fetch:t.fetchFunc,r=e.map(e=>n(e,t.requestInit,{isBinary:!0})),o=(null==t.onProgress?await Promise.all(r):await Z(r,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return null==t.onProgress?await Promise.all(o):await Z(o,t.onProgress,.5,1)}async function ne(e,t="",n,r){return re(e=>te(e,{requestInit:r}))(e,t,n)}function re(e){return async(t,n="",r)=>{const o=t.map(()=>!1),a={},s=null!=r?r.map(()=>!1):[],i=[];if(t.forEach((e,t)=>{let n=0;e.weights.forEach(e=>{const u="quantization"in e?e.quantization.dtype:e.dtype,c=ee.a[u]*w.N(e.shape),l=()=>{o[t]=!0,null==a[t]&&(a[t]=[]),a[t].push({manifestEntry:e,groupOffset:n,sizeBytes:c})};null!=r?r.forEach((t,n)=>{t===e.name&&(l(),s[n]=!0)}):l(),i.push(e.name),n+=c})}),!s.every(e=>e)){const e=r.filter((e,t)=>!s[t]);throw new Error("Could not find weights in manifest with names: "+e.join(", ")+". \nManifest JSON has weights with names: "+i.join(", ")+".")}const u=o.reduce((e,t,n)=>(t&&e.push(n),e),[]),c=[];u.forEach(e=>{t[e].paths.forEach(e=>{const t=n+(n.endsWith("/")?"":"/")+e;c.push(t)})});const h=await e(c),d={};let f=0;return u.forEach(e=>{const n=t[e].paths.length;let r=0;for(let e=0;e<n;e++)r+=h[f+e].byteLength;const o=new ArrayBuffer(r),s=new Uint8Array(o);let i=0;for(let e=0;e<n;e++){const t=new Uint8Array(h[f+e]);s.set(t,i),i+=t.byteLength}a[e].forEach(e=>{const t=o.slice(e.groupOffset,e.groupOffset+e.sizeBytes),n=Object(l.e)(t,[e.manifestEntry]);for(const e in n)d[e]=n[e]}),f+=n}),d}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class oe{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.onProgress=t.onProgress,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(Object(w.b)("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=Object(c.b)().platform.fetch,Object(w.b)(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&Object(w.b)(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{}}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;const n=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata,weightsManifest:n};t.body.append("model.json",new Blob([JSON.stringify(r)],{type:"application/json"}),"model.json"),null!=e.weightData&&t.body.append("model.weights.bin",new Blob([e.weightData],{type:"application/octet-stream"}),"model.weights.bin");const o=await this.fetch(this.path,t);if(o.ok)return{modelArtifactsInfo:Object(l.g)(e),responses:[o]};throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+o.status+".")}async load(){const e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code `+e.status+". Please verify this URL points to the model JSON of the model to load.");let t;try{t=await e.json()}catch(e){let t=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?t+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":t+=" Please make sure the server is serving valid JSON for this request.",new Error(t)}const n=t.modelTopology,r=t.weightsManifest,o=t.generatedBy,a=t.convertedBy,s=t.format,i=t.userDefinedMetadata;if(null==n&&null==r)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);let u,c;if(null!=r){const e=await this.loadWeights(r);[u,c]=e}const l={modelTopology:n,weightSpecs:u,weightData:c,userDefinedMetadata:i,generatedBy:o,convertedBy:a,format:s},h=t.modelInitializer;return h&&(l.modelInitializer=h),l}async loadWeights(e){const t=Array.isArray(this.path)?this.path[1]:this.path,[n,r]=function(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),r=e.substring(0,t),o=n>t?e.substring(n):"";return[r+"/",o]}(t),o=this.weightPathPrefix||n,a=[];for(const t of e)a.push(...t.weights);const s=[],i=[];for(const t of e)for(const e of t.paths)null!=this.weightUrlConverter?i.push(this.weightUrlConverter(e)):s.push(o+e+r);this.weightUrlConverter&&s.push(...await Promise.all(i));const u=await te(s,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress});return[a,Object(l.d)(u)]}}function ae(e){return null!=e.match(oe.URL_SCHEME_REGEX)}oe.URL_SCHEME_REGEX=/^https?:\/\//;const se=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc))return null;{let n=!0;if(n=Array.isArray(e)?e.every(e=>ae(e)):ae(e),n)return ie(e,t)}return null};function ie(e,t){return new oe(e,t)}function ue(e,t){return ie(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */h.registerSaveRouter(se),h.registerLoadRouter(se);class ce{constructor(e){this.modelArtifacts=e}async load(){return this.modelArtifacts}}class le{constructor(e){this.saveHandler=e}async save(e){return this.saveHandler(e)}}function he(e,t,n,r){if(1===arguments.length){return null!=e.modelTopology||null!=e.weightSpecs?new ce(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ce({modelTopology:e}))}return console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ce({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:r})}function de(e){return new le(e)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fe(e,t,n){const r=e.shape.length;w.b(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),w.b(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let o=0;o<r;++o)w.b(t[o]+n[o]<=e.shape[o],()=>`Error in slice${r}D: begin[${o}] + size[${o}] (${t[o]+n[o]}) would overflow input.shape[${o}] (${e.shape[o]})`)}function pe(e){const t=[];let n=0;for(;e>0;)1&e&&t.push(n),e/=2,n++;return t}function ge(e,t,n){const r=[];for(let o=0;o<e.length;o++)r[o]=Math.ceil((t[o]-e[o])/n[o]);return r}function me(e,t,n,r){const o=[...e];for(let e=o.length;e<r.length;e++)o.push(1);for(let e=0;e<n;e++)0===e?o[t]=1:(o.splice(t,0,1),o.pop());return o}function be(e,t,n){return n<=e?n:n-(t-1)}function xe(e,t){const n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function ye(e,t,n,r,o,a,s,i,u){const c=e.length;let l=new Array(c),h=new Array(c),d=new Array(c);if(t.length&&n>0){const u=t[0],c=n+1;l=ve(s,u,c,r,e),h=we(i,u,c,o,e),d=me(a,u,c,e)}else for(let t=0;t<c;t++)l[t]=Ie(s,r,a,e,t,u),h[t]=Ee(i,o,a,e,t,u),d[t]=Ce(a,t,u);return{begin:l,end:h,strides:d}}function ve(e,t,n,r,o){const a=[...o],s=xe(n,t);for(let o=0;o<a.length;o++)if(s.indexOf(o)>-1)a[o]=0;else{const s=be(t,n,o);let i=r[s];e&1<<s&&(i=0),a[o]=i}return a}function we(e,t,n,r,o){const a=[...o],s=xe(n,t);for(let o=0;o<a.length;o++)if(s.indexOf(o)>-1)a[o]=Number.MAX_SAFE_INTEGER;else{const s=be(t,n,o);let i=r[s];e&1<<s&&(i=Number.MAX_SAFE_INTEGER),a[o]=i}for(let e=0;e<a.length;e++){const t=o[e];a[e]<0&&(a[e]+=t),a[e]=w.i(0,a[e],o[e])}return a}function Ce(e,t,n){let r=e[t];return(n&1<<t||null==r)&&(r=1),r}function Ie(e,t,n,r,o,a){let s=t[o];const i=n[o]||1;(e&1<<o||a&1<<o||null==s)&&(s=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);const u=r[o];return s<0&&(s+=u),s=w.i(0,s,u-1),s}function Ee(e,t,n,r,o,a){let s=t[o];const i=n[o]||1;(e&1<<o||a&1<<o||null==s)&&(s=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);const u=r[o];return s<0&&(s+=u),s=i>0?w.i(0,s,u):w.i(-1,s,u-1),s}function $e(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let o=r+1;o<n.length;o++)if(t[o]>0||n[o]!==e[o])return!1;return!0}function Oe(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function ke(e,t,n){let r;const o=e.shape.length;let a;return r="number"==typeof t?[t,...new Array(o-1).fill(0)]:t.length<o?t.concat(new Array(o-t.length).fill(0)):t.slice(),r.forEach(e=>{w.b(-1!==e,()=>"slice() does not support negative begin indexing.")}),a=null==n?new Array(o).fill(-1):"number"==typeof n?[n,...new Array(o-1).fill(-1)]:n.length<o?n.concat(new Array(o-n.length).fill(-1)):n,a=a.map((t,n)=>t>=0?t:(w.b(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,a]}var Re=n(7),Se=n(28),Ae=n(14);const Te=Object(G.a)({add_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=Object(W.a)(e,"a","add"),r=Object(W.a)(t,"b","add");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.add(n,r);return t([n,r]),o},o,null,z.d)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _e=Object(G.a)({reshape_:function(e,t){const n=Object(W.a)(e,"x","reshape",null),r={x:n},o={shape:t};return u.a.runKernelFunc((e,r)=>(t=w.s(t,n.size),w.b(n.size===w.N(t),()=>"new shape and old shape must have the same number of elements."),r([n]),e.reshape(n,t)),r,null,z.bc,o)}});function Ne(e){return null==e?null:0===e.rank?_e(e,[e.size]):1===e.rank?e:2===e.rank?_e(e,[1,1,e.shape[0],e.shape[1]]):3===e.rank?_e(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e}const Fe=Object(G.a)({batchNorm_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a){null==a&&(a=.001);const s=Object(W.a)(e,"x","batchNorm"),i=Object(W.a)(t,"mean","batchNorm"),c=Object(W.a)(n,"variance","batchNorm");let l,h;null!=o&&(l=Object(W.a)(o,"scale","batchNorm")),null!=r&&(h=Object(W.a)(r,"offset","batchNorm")),w.b(i.rank===c.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),w.b(null==h||i.rank===h.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),w.b(null==l||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const d=function(e){let t;return t=0===e.rank||1===e.rank?_e(e,[1,1,1,e.size]):2===e.rank?_e(e,[1,1,e.shape[0],e.shape[1]]):3===e.rank?_e(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e,t}(s),f={x:d,scale:l,offset:h,mean:i,variance:c},p={varianceEpsilon:a},g=u.a.runKernelFunc((e,t)=>(t([d,i,c,l]),e.batchNorm(d,Ne(i),Ne(c),Ne(h),Ne(l),a)),f,null,z.eb,p);return _e(g,s.shape)}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function je(e,t){const n=e[0].length;e.forEach((e,t)=>{w.b(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),w.b(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const r=e[0];e.forEach((e,o)=>{for(let a=0;a<n;a++)w.b(a===t||e[a]===r[a],()=>`Error in concat${n}D: Shape of tensors[${o}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${o}.`)})}function De(e,t){const n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}var Le=n(24);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Be=Object(G.a)({concat_:function(e,t=0){Object(w.b)(e.length>=1,()=>"Pass at least one tensor to concat");let n=Object(W.b)(e,"tensors","concat");"complex64"===n[0].dtype&&n.forEach(e=>{if("complex64"!==e.dtype)throw new Error(`Cannot concatenate complex64 tensors with a tensor\n          with dtype ${e.dtype}. `)});const r=n,o={axis:t};return u.a.runKernelFunc((e,r)=>{const o=Object(w.I)(t,n[0].shape)[0],a=De(n.map(e=>e.shape),o);if(0===Object(w.N)(a))return Object(Le.a)([],a);if(n=n.filter(e=>e.size>0),1===n.length)return n[0];je(n.map(e=>e.shape),o);const s=e.concat(n,o);return r(n),s},r,null,z.z,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pe(e,t,n,r,o="NHWC",a){return Ve(e,[...t,e[3]],n,a,r,null,null,Qe(o))}function Me(e,t,n,r,o,a,s="channelsLast"){const[i,u]=Ge(t);let c;if("channelsLast"===s)c=[i,u,e[3],e[3]];else{if("channelsFirst"!==s)throw new Error("Unknown dataFormat "+s);c=[i,u,e[1],e[1]]}return Ve(e,c,n,r,o,a,!1,s)}function Ue(e,t,n,r,o,a,s="NDHWC"){const[i,u,c]=Xe(t);let l,h;if("NDHWC"===s)h="channelsLast",l=[i,u,c,e[4],e[4]];else{if("NCDHW"!==s)throw new Error("Unknown dataFormat "+s);h="channelsFirst",l=[i,u,c,e[1],e[1]]}return ze(e,l,n,r,o,!1,h,a)}function Ve(e,t,n,r,o,a,s=!1,i="channelsLast"){let[u,c,l,h]=[-1,-1,-1,-1];if("channelsLast"===i)[u,c,l,h]=e;else{if("channelsFirst"!==i)throw new Error("Unknown dataFormat "+i);[u,h,c,l]=e}const[d,f,,p]=t,[g,m]=Ge(n),[b,x]=Ge(r),y=qe(d,b),v=qe(f,x),{padInfo:C,outHeight:I,outWidth:E}=function(e,t,n,r,o,a,s,i,u){let c,l,h;if("number"==typeof e){c={top:e,bottom:e,left:e,right:e,type:0===e?"VALID":"NUMBER"};const o=function(e,t,n,r,o){null==r&&(r=We(e,t,n));const a=e[0],s=e[1],i=He((a-t+2*r)/n+1,o);w.b(w.v(i),()=>`The output # of rows (${i}) must be an integer. Change the stride and/or zero pad parameters`);const u=He((s-t+2*r)/n+1,o);return w.b(w.v(u),()=>`The output # of columns (${u}) must be an integer. Change the stride and/or zero pad parameters`),[i,u]}([t,n],a,r,e,i);l=o[0],h=o[1]}else if("same"===e){l=Math.ceil(t/r),h=Math.ceil(n/o);const e=Math.max(0,(l-1)*r+a-t),i=Math.max(0,(h-1)*o+s-n),u=Math.floor(e/2),d=e-u,f=Math.floor(i/2);c={top:u,bottom:d,left:f,right:i-f,type:"SAME"}}else if("valid"===e)c={top:0,bottom:0,left:0,right:0,type:"VALID"},l=Math.ceil((t-a+1)/r),h=Math.ceil((n-s+1)/o);else{if("object"!=typeof e)throw Error("Unknown padding parameter: "+e);{const d="channelsLast"===u?e[1][0]:e[2][0],f="channelsLast"===u?e[1][1]:e[2][1],p="channelsLast"===u?e[2][0]:e[3][0],g="channelsLast"===u?e[2][1]:e[3][1];c={top:d,bottom:f,left:p,right:g,type:0===d&&0===f&&0===p&&0===g?"VALID":"EXPLICIT"},l=He((t-a+d+f)/r+1,i),h=He((n-s+p+g)/o+1,i)}}return{padInfo:c,outHeight:l,outWidth:h}}(o,c,l,g,m,y,v,a,i),$=s?p*h:p;let O;return"channelsFirst"===i?O=[u,$,I,E]:"channelsLast"===i&&(O=[u,I,E,$]),{batchSize:u,dataFormat:i,inHeight:c,inWidth:l,inChannels:h,outHeight:I,outWidth:E,outChannels:$,padInfo:C,strideHeight:g,strideWidth:m,filterHeight:d,filterWidth:f,effectiveFilterHeight:y,effectiveFilterWidth:v,dilationHeight:b,dilationWidth:x,inShape:e,outShape:O,filterShape:t}}function ze(e,t,n,r,o,a=!1,s="channelsLast",i){let[u,c,l,h,d]=[-1,-1,-1,-1,-1];if("channelsLast"===s)[u,c,l,h,d]=e;else{if("channelsFirst"!==s)throw new Error("Unknown dataFormat "+s);[u,d,c,l,h]=e}const[f,p,g,,m]=t,[b,x,y]=Xe(n),[v,C,I]=Xe(r),E=qe(f,v),$=qe(p,C),O=qe(g,I),{padInfo:k,outDepth:R,outHeight:S,outWidth:A}=function(e,t,n,r,o,a,s,i,u,c,l){let h,d,f,p;if("number"==typeof e){h={top:e,bottom:e,left:e,right:e,front:e,back:e,type:0===e?"VALID":"NUMBER"};const a=function(e,t,n,r,o,a){null==o&&(o=We(e,t,r));const s=e[0],i=e[1],u=e[2],c=He((s-t+2*o)/r+1,a);w.b(w.v(c),()=>`The output # of depths (${c}) must be an integer. Change the stride and/or zero pad parameters`);const l=He((i-t+2*o)/r+1,a);w.b(w.v(l),()=>`The output # of rows (${l}) must be an integer. Change the stride and/or zero pad parameters`);const h=He((u-t+2*o)/r+1,a);return w.b(w.v(h),()=>`The output # of columns (${h}) must be an integer. Change the stride and/or zero pad parameters`),[c,l,h,n]}([t,n,r,1],i,1,o,e,l);d=a[0],f=a[1],p=a[2]}else if("same"===e){d=Math.ceil(t/o),f=Math.ceil(n/a),p=Math.ceil(r/s);const e=(d-1)*o+i-t,l=(f-1)*a+u-n,g=(p-1)*s+c-r,m=Math.floor(e/2),b=e-m,x=Math.floor(l/2),y=l-x,v=Math.floor(g/2);h={top:x,bottom:y,left:v,right:g-v,front:m,back:b,type:"SAME"}}else{if("valid"!==e)throw Error("Unknown padding parameter: "+e);h={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},d=Math.ceil((t-i+1)/o),f=Math.ceil((n-u+1)/a),p=Math.ceil((r-c+1)/s)}return{padInfo:h,outDepth:d,outHeight:f,outWidth:p}}(o,c,l,h,b,x,y,E,$,O,i),T=a?m*d:m;let _;return"channelsFirst"===s?_=[u,T,R,S,A]:"channelsLast"===s&&(_=[u,R,S,A,T]),{batchSize:u,dataFormat:s,inDepth:c,inHeight:l,inWidth:h,inChannels:d,outDepth:R,outHeight:S,outWidth:A,outChannels:T,padInfo:k,strideDepth:b,strideHeight:x,strideWidth:y,filterDepth:f,filterHeight:p,filterWidth:g,effectiveFilterDepth:E,effectiveFilterHeight:$,effectiveFilterWidth:O,dilationDepth:v,dilationHeight:C,dilationWidth:I,inShape:e,outShape:_,filterShape:t}}function We(e,t,n,r=1){const o=qe(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)}function Ge(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function Xe(e){return"number"==typeof e?[e,e,e]:e}function qe(e,t){return t<=1?e:e+(e-1)*(t-1)}function He(e,t){if(!t)return e;switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error("Unknown roundingMode "+t)}}function Ke(e){const[t,n,r]=Ge(e);return 1===t&&1===n&&1===r}function Ye(e,t){return Ke(e)||Ke(t)}function Qe(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw new Error("Unknown dataFormat "+e)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Je=Object(G.a)({conv2d_:function(e,t,n,r,o="NHWC",a=[1,1],s){const i=Object(W.a)(e,"x","conv2d"),c=Object(W.a)(t,"filter","conv2d");let l=i,h=!1;3===i.rank&&(h=!0,l=_e(i,[1,i.shape[0],i.shape[1],i.shape[2]])),w.b(4===l.rank,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),w.b(4===c.rank,()=>"Error in conv2d: filter must be rank 4, but got rank "+c.rank+"."),null!=s&&w.b(w.v(r),()=>`Error in conv2d: pad must be an integer when using, dimRoundingMode ${s} but got pad ${r}.`);const d="NHWC"===o?l.shape[3]:l.shape[1];w.b(d===c.shape[2],()=>`Error in conv2d: depth of input (${d}) must match input depth for filter ${c.shape[2]}.`),w.b(Ye(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);const f={x:l,filter:c},p={strides:n,pad:r,dataFormat:o,dilations:a,dimRoundingMode:s},g=u.a.runKernelFunc((e,t)=>{const i=Qe(o),u=Ve(l.shape,c.shape,n,a,r,s,!1,i),h=e.conv2d(l,c,u);return t([l,c]),h},f,null,z.A,p);return h?_e(g,[g.shape[1],g.shape[2],g.shape[3]]):g}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ze(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function et(e,t,n){const r=e.length+t.length,o=[];let a=0,s=0;for(let i=0;i<r;i++)-1===n.indexOf(i)?o.push(e[a++]):o.push(t[s++]);return o}function tt(e,t){const n=[],r=e.length;for(let o=0;o<r;o++)-1===t.indexOf(o)&&n.push(e[o]);return[n,t.map(t=>e[t])]}function nt(e,t){return et(e,t.map(e=>1),t)}function rt(e,t,n){w.b(Ze(t,n),()=>e+" supports only inner-most axes for now. "+`Got axes ${t} and rank-${n} input.`)}function ot(e,t){if(Ze(e,t))return null;const n=[];for(let r=0;r<t;++r)-1===e.indexOf(r)&&n.push(r);return e.forEach(e=>n.push(e)),n}function at(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function st(e,t){const n=[];for(let r=t-e;r<t;++r)n.push(r);return n}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const it=Object(G.a)({transpose_:function(e,t){const n=Object(W.a)(e,"x","transpose");if(null==t&&(t=n.shape.map((e,t)=>t).reverse()),w.b(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of perm ${t}.`),t.forEach(e=>{w.b(e>=0&&e<n.rank,()=>"All entries in 'perm' must be between 0 and "+(n.rank-1)+" but got "+t)}),n.rank<=1)return n.clone();const r={x:n},o={perm:t};return u.a.runKernelFunc(e=>e.transpose(n,t),r,null,z.Gc,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ut=Object(G.a)({cumsum_:function(e,t=0,n=!1,r=!1){const o=Object(W.a)(e,"x","cumsum"),a={x:o},s={axis:t,exclusive:n,reverse:r};return u.a.runKernelFunc((e,a)=>{const s=ot([t],o.rank);let i=o;null!=s&&(i=it(o,s));const u=st(1,o.rank)[0];let c=e.cumsum(i,u,n,r);if(a([o]),null!=s){const e=at(s);c=it(c,e)}return c},a,null,z.J,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ct=Object(G.a)({depthwiseConv2d_:function(e,t,n,r,o="NHWC",a=[1,1],s){const i=Object(W.a)(e,"x","depthwiseConv2d"),c=Object(W.a)(t,"filter","depthwiseConv2d");let l=i,h=!1;3===i.rank&&(h=!0,l=_e(i,[1,i.shape[0],i.shape[1],i.shape[2]])),w.b(4===l.rank,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),w.b(4===c.rank,()=>"Error in depthwiseConv2d: filter must be rank 4, but got rank "+c.rank+"."),w.b(l.shape[3]===c.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${l.shape[3]}) must match the inChannels dimension in filter ${c.shape[2]}.`),null!=s&&w.b(w.v(r),()=>`Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode ${s} but got pad ${r}.`);const d={x:l,filter:c},f={strides:n,pad:r,dataFormat:o,dilations:a,dimRoundingMode:s},p=u.a.runKernelFunc((e,t)=>{null==a&&(a=[1,1]),w.b(Ye(n,a),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);const o=Ve(l.shape,c.shape,n,a,r,s,!0),i=e.depthwiseConv2D(l,c,o);return t([l,c]),i},d,null,z.L,f);return h?_e(p,[p.shape[1],p.shape[2],p.shape[3]]):p}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lt=Object(G.a)({floorDiv_:function(e,t){let n=Object(W.a)(e,"a","floorDiv"),r=Object(W.a)(t,"b","floorDiv");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.floorDiv(n,r);return t([n,r]),o},o,null,z.cb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ht=Object(G.a)({div_:function(e,t){let n=Object(W.a)(e,"a","div"),r=Object(W.a)(t,"b","div");if([n,r]=Object(Ae.b)(n,r),"int32"===n.dtype&&"int32"===r.dtype)return lt(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.realDivide(n,r);return t([n,r]),o},o,null,z.R,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dt=Object(G.a)({matMul_:function(e,t,n=!1,r=!1){let o=Object(W.a)(e,"a","matMul"),a=Object(W.a)(t,"b","matMul");[o,a]=Object(Ae.b)(o,a);const s={a:o,b:a},i={transposeA:n,transposeB:r};return u.a.runKernelFunc((e,t)=>{t([o,a]);const s=n?o.shape[o.rank-2]:o.shape[o.rank-1],i=r?a.shape[a.rank-1]:a.shape[a.rank-2],u=n?o.shape[o.rank-1]:o.shape[o.rank-2],c=r?a.shape[a.rank-2]:a.shape[a.rank-1],l=o.shape.slice(0,-2),h=a.shape.slice(0,-2),d=w.N(l),f=w.N(h),p=d===f||1===d||1===f;w.b(o.rank>=2&&a.rank>=2&&p,()=>`Error in matMul: the input batch dimensions must either be the same or at least one input batch dimension must be 1. Got input batch dimensions of (${l}) and (${h}).`),w.b(s===i,()=>`Error in matMul: inner shapes (${s}) and (${i}) of Tensors with shapes ${o.shape} and ${a.shape} and transposeA=${n} and transposeB=${r} must match.`);const g=(d>f?l:h).concat([u,c]),m=_e(o,n?[d,s,u]:[d,u,s]),b=_e(a,r?[f,c,i]:[f,i,c]),x=e.batchMatMul(m,b,n,r);return _e(x,g)},s,null,z.s,i)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ft=Object(G.a)({max_:function(e,t=null,n=!1){const r=Object(W.a)(e,"x","max"),o={x:r},a={reductionIndices:t,keepDims:n};return u.a.runKernelFunc((e,o)=>{let a=w.I(t,r.shape);const s=ot(a,r.rank);let i=r;null!=s&&(i=it(r,s),a=st(a.length,i.rank));const u=e.max(i,a);null!=s&&i.dispose();let c=u;if(n){const e=nt(c.shape,w.I(t,r.shape));c=_e(c,e),u.dispose()}return o([r,c]),c},o,null,z.yb,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pt=Object(G.a)({maxPool_:function(e,t,n,r,o){const a=Object(W.a)(e,"x","maxPool");let s=a,i=!1;3===a.rank&&(i=!0,s=_e(a,[1,a.shape[0],a.shape[1],a.shape[2]])),w.b(4===s.rank,()=>`Error in maxPool: input must be rank 4 but got rank ${s.rank}.`),w.b(Ye(n,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`),null!=o&&w.b(w.v(r),()=>`Error in maxPool: pad must be an integer when using, dimRoundingMode ${o} but got pad ${r}.`);const c={x:s},l={filterSize:t,strides:n,pad:r,dimRoundingMode:o},h=u.a.runKernelFunc((e,a)=>{const i=Me(s.shape,t,n,1,r,o);let u;return u=1===i.filterWidth&&1===i.filterHeight&&w.a(i.inShape,i.outShape)?s.clone():e.maxPool(s,i),a([s,u]),u},c,null,z.zb,l);return i?_e(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gt=Object(G.a)({mul_:function(e,t){let n=Object(W.a)(e,"a","mul"),r=Object(W.a)(t,"b","mul");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.multiply(n,r);return t([n,r]),o},o,null,z.Kb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mt=Object(G.a)({oneHot_:function(e,t,n=1,r=0){if(t<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+t);const o=Object(W.a)(e,"indices","oneHot","int32"),a=[...o.shape,t],s={indices:o},i={depth:t,onValue:n,offValue:r};return u.a.runKernelFunc((e,s)=>(s([o]),_e(e.oneHot(_e(o,[o.size]),t,n,r),a)),s,null,z.Qb,i)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bt=Object(G.a)({pow_:function(e,t){let n=Object(W.a)(e,"base","pow"),r=Object(W.a)(t,"exp","pow");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.pow(n,r);return t([n,r,o]),o},o,null,z.Tb)}});var xt=n(51);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class yt{constructor(e=0,t=1,n,r){if(this.canReturnFloat=()=>null==this.dtype||"float32"===this.dtype,this.min=e,this.range=t-e,this.dtype=n,null==r&&(r=Math.random()),"number"==typeof r&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=xt.alea(r)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}const vt=Object(G.a)({randomUniform_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=0,n=1,r="float32",o){const a=V(e,r),s=new yt(t,n,null,o);for(let e=0;e<a.values.length;e++)a.values[e]=s.nextValue();return a.toTensor()}});var wt=n(29);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ct(e,t){Object(w.d)(e);const n=Object(W.c)(e,t);if(1!==n.length)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Object(wt.a)(e,null,n,t)}var It=n(20);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Et(e,t="float32"){if("complex64"===t){const t=Et(e,"float32"),n=Et(e,"float32");return Object(It.a)(t,n)}const n=Object(w.F)(Object(w.N)(e),t);return u.a.makeTensor(n,e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $t(e,t,n=1,r="float32"){if(0===n)throw new Error("Cannot have a step of zero");const o={start:e,stop:t,step:n,dtype:r};return u.a.runKernelFunc(()=>{if(e===t||e<t&&n<0||t<e&&n>1)return Et([0],r);const o=Math.abs(Math.ceil((t-e)/n)),a=Object(w.F)(o,r);t<e&&1===n&&(n=-1),a[0]=e;for(let e=1;e<a.length;e++)a[e]=a[e-1]+n;return Ct(a,r)},{},null,z.Wb,o)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ot(e,t){if((Object(w.A)(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&Object(w.A)(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Object(wt.a)(e,[],[],t)}const kt=Object(G.a)({separableConv2d_:function(e,t,n,r,o,a=[1,1],s="NHWC"){const i=Object(W.a)(e,"x","separableConv2d"),u=Object(W.a)(t,"depthwiseFilter","separableConv2d"),c=Object(W.a)(n,"pointwiseFilter","separableConv2d");let l=i,h=!1;if(3===i.rank&&(h=!0,l=_e(i,[1,i.shape[0],i.shape[1],i.shape[2]])),"NCHW"===s)throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");w.b(4===l.rank,()=>`Error in separableConv2d: input must be rank 4, but got rank ${l.rank}.`),w.b(4===u.rank,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),w.b(4===c.rank,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),w.b(1===c.shape[0],()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),w.b(1===c.shape[1],()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);const d=u.shape[2],f=u.shape[3];w.b(c.shape[2]===d*f,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${d*f}, but got ${c.shape[2]}.`);const p=ct(l,u,r,o,s,a),g=Je(p,c,1,"valid",s);return h?_e(g,[g.shape[1],g.shape[2],g.shape[3]]):g}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rt=Object(G.a)({softmax_:function(e,t=-1){const n=Object(W.a)(e,"logits","softmax","float32");if(-1===t&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);const r={logits:n},o={dim:t};return u.a.runKernelFunc((e,r)=>{const o=e.softmax(n,t);return r([o]),o},r,null,z.rc,o)}});function St(e,t,n=0){let r=[];if("number"==typeof t)Object(w.b)(e.shape[n]%t==0,()=>"Number of splits must evenly divide the axis."),r=new Array(t).fill(e.shape[n]/t);else{const o=t.reduce((e,t)=>(-1===t&&(e+=1),e),0);Object(w.b)(o<=1,()=>"There should be only one negative value in split array.");const a=t.indexOf(-1);if(-1!==a){const r=t.reduce((e,t)=>t>0?e+t:e);t[a]=e.shape[n]-r}Object(w.b)(e.shape[n]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),r=t}return r}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const At=Object(G.a)({split_:function(e,t,n=0){const r=Object(W.a)(e,"x","split"),o={x:r},a={numOrSizeSplits:t,axis:n};return u.a.runKernelFunc((e,o)=>{const a=Object(w.I)(n,r.shape)[0],s=St(r,t,a);return e.split(r,s,a)},o,null,z.uc,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tt=Object(G.a)({squeeze_:function(e,t){const n=Object(W.a)(e,"x","squeeze");return _e(n,Object(w.P)(n.shape,t).newShape)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _t=Object(G.a)({sub_:function(e,t){let n=Object(W.a)(e,"a","sub"),r=Object(W.a)(t,"b","sub");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.subtract(n,r);return t([n,r]),o},o,null,z.Ac)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nt=Object(G.a)({tile_:function(e,t){const n=Object(W.a)(e,"x","tile",null);w.b(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);const r=[n],o={x:n},a={reps:t};return u.a.runKernelFunc((e,r)=>{const o=e.tile(n,t);return r([n]),o},o,null,z.Ec,a,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ft=Object(G.a)({broadcastTo_:function(e,t){let n=Object(W.a)(e,"broadcastTo","x");const r=n.shape;if(t.some(e=>!(e>0)||e%1!=0))throw new Error(`broadcastTo(): Invalid broadcast shape [${t}].`);if(t.length<n.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){const e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=_e(n,e)}const o=n.shape,a=Array.from(t);for(let e=t.length-1;e>=0;e--)if(o[e]===t[e])a[e]=1;else if(1!==n.shape[e])throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(0===a.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length)return q(n);const s={x:n},i={shape:t,inputShape:o};return u.a.runKernelFunc(e=>e.tile(n,a),s,null,z.u,i)}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jt(e,t){const n=e.length,r=[];for(let o=0;o<n;o++){const a=n-1-o,s=e[a]||1;(t[t.length-1-o]||1)>1&&1===s&&r.unshift(a)}return r}function Dt(e,t){const n=[];for(let r=0;r<t.length;r++){const o=e[e.length-r-1],a=t.length-r-1,s=t[a];(null==o||1===o&&s>1)&&n.unshift(a)}return n}function Lt(e,t){const n=[],r=Math.max(e.length,t.length);for(let o=0;o<r;o++){let r=e[e.length-o-1];null==r&&(r=1);let a=t[t.length-o-1];if(null==a&&(a=1),1===r)n.unshift(a);else if(1===a)n.unshift(r);else{if(r!==a){throw Error(`Operands could not be broadcast together with shapes ${e} and ${t}.`)}n.unshift(r)}}return n}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bt=Object(G.a)({where_:function(e,t,n){const r=Object(W.a)(t,"a","where"),o=Object(W.a)(n,"b","where"),a=Object(W.a)(e,"condition","where","bool"),s=Lt(r.shape,o.shape),i=Ft(r,s),c=Ft(o,s);1===a.rank&&Object(w.b)(a.shape[0]===r.shape[0],()=>"The first dimension of `a` must match the size of `condition`."),1!==a.rank&&Object(w.e)(a.shape,c.shape,"Error in where: ");const l={condition:a,t:i,e:c};return u.a.runKernelFunc((e,t)=>{const n=e.select(a,i,c);return t([a]),n},l,null,z.kc)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pt=Object(G.a)({zerosLike_:function(e){const t=Object(W.a)(e,"x","zerosLike"),n={x:t};return u.a.runKernelFunc(e=>e.zerosLike(t),n,null,z.Kc)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mt=Object(G.a)({imag_:function(e){const t=Object(W.a)(e,"input","imag"),n={input:t};return u.a.runKernelFunc(e=>e.imag(t),n,null,z.kb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ut=Object(G.a)({real_:function(e){const t=Object(W.a)(e,"input","real"),n={input:t};return u.a.runKernelFunc(e=>e.real(t),n,null,z.Xb)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vt=Object(G.a)({slice_:function(e,t,n){const r=Object(W.a)(e,"x","slice");if(0===r.rank)throw new Error("Slicing scalar is not possible");const o={x:r},a={begin:t,size:n};return u.a.runKernelFunc((e,o)=>{const[a,s]=ke(r,t,n);return fe(r,a,s),o([r]),e.slice(r,a,s)},o,null,z.qc,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zt=Object(G.a)({fft_:function(e){Object(w.b)("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);const t={input:e};return u.a.runKernelFunc(t=>{const n=e.shape[e.shape.length-1],r=e.size/n,o=e.as2D(r,n);return t.fft(o).reshape(e.shape)},t,null,z.Y)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wt=Object(G.a)({rfft_:function(e,t){Object(w.b)("float32"===e.dtype,()=>"The dtype for rfft() must be real value but got "+e.dtype);let n=e.shape[e.shape.length-1];const r=e.size/n;let o;if(null!=t&&t<n){const r=e.shape.map(e=>0),a=e.shape.map(e=>e);a[e.shape.length-1]=t,o=Vt(e,r,a),n=t}else if(null!=t&&t>n){const r=e.shape.map(e=>e);r[e.shape.length-1]=t-n,o=Be([e,Et(r)],e.shape.length-1),n=t}else o=e;const a=Pt(o),s=_e(Object(It.a)(o,a),[r,n]),i=zt(s),u=Math.floor(n/2)+1,c=Ut(i),l=Mt(i),h=At(c,[u,n-u],c.shape.length-1),d=At(l,[u,n-u],l.shape.length-1),f=o.shape.slice();return f[o.shape.length-1]=u,_e(Object(It.a)(h[0],d[0]),f)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gt=Object(G.a)({ifft_:function(e){Object(w.b)("complex64"===e.dtype,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);const t={input:e};return u.a.runKernelFunc(t=>{const n=e.shape[e.shape.length-1],r=e.size/n,o=_e(e,[r,n]),a=t.ifft(o);return _e(a,e.shape)},t,null,z.ib)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xt=Object(G.a)({reverse_:function(e,t){const n=Object(W.a)(e,"x","reverse"),r={x:n},o={dims:t};return u.a.runKernelFunc(e=>{const r=Object(w.I)(t,n.shape);if(0===n.rank)return q(n);const o=e.reverse(n,r);return _e(o,n.shape)},r,null,z.gc,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qt=Object(G.a)({irfft_:function(e){const t=e.shape[e.shape.length-1],n=e.size/t;let r;if(t<=2){const o=_e(e,[n,t]);r=Gt(o)}else{const o=[n,2*(t-1)],a=_e(Ut(e),[n,t]),s=_e(Mt(e),[n,t]),i=Xt(Vt(a,[0,1],[n,t-2]),1),u=gt(Xt(Vt(s,[0,1],[n,t-2]),1),Ot(-1)),c=Be([a,i],1),l=Be([s,u],1),h=_e(Object(It.a)(c,l),[o[0],o[1]]);r=Gt(h)}if(r=Ut(r),3===e.rank&&0!==e.shape[0]){const t=r,n=e.shape[0];r=_e(r,[n,r.shape[0]/n,r.shape[1]]),t.dispose()}return r}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ht(e,t,n){const r=1-e%2,o=new Float32Array(e);for(let a=0;a<e;++a){const s=2*Math.PI*a/(e+r-1);o[a]=t-n*Math.cos(s)}return Ct(o,"float32")}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({hammingWindow_:function(e){return Ht(e,.54,.46)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kt=Object(G.a)({hannWindow_:function(e){return Ht(e,.5,.5)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yt(e,t,n){const r={shape:e,value:t,dtype:n};return u.a.runKernelFunc(r=>r.fill(e,t,n),{},null,z.Z,r)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qt(e,t,n){if(Object(w.d)(e),null!=t&&2!==t.length)throw new Error("tensor2d() requires shape to have two numbers");const r=Object(W.c)(e,n);if(2!==r.length&&1!==r.length)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Object(wt.a)(e,t,r,n)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jt=Object(G.a)({frame_:function(e,t,n,r=!1,o=0){let a=0;const s=[];for(;a+t<=e.size;)s.push(Vt(e,a,t)),a+=n;if(r)for(;a<e.size;){const r=a+t-e.size,i=Be([Vt(e,a,t-r),Yt([r],o)]);s.push(i),a+=n}return 0===s.length?Qt([],[0,t]):_e(Be(s),[s.length,t])}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({stft_:function(e,t,n,r,o=Kt){var a;null==r&&(a=t,r=Math.floor(Math.pow(2,Math.ceil(Math.log(a)/Math.log(2)))));const s=Jt(e,t,n),i=gt(s,o(t)),u=[];for(let e=0;e<s.shape[0];e++)u.push(Wt(Vt(i,[e,0],[1,t]),r));return Be(u)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({cropAndResize_:function(e,t,n,r,o,a){const s=Object(W.a)(e,"image","cropAndResize"),i=Object(W.a)(t,"boxes","cropAndResize","float32"),c=Object(W.a)(n,"boxInd","cropAndResize","int32");o=o||"bilinear",a=a||0;const l=i.shape[0];w.b(4===s.rank,()=>`Error in cropAndResize: image must be rank 4,but got rank ${s.rank}.`),w.b(2===i.rank&&4===i.shape[1],()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),w.b(1===c.rank&&c.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),w.b(2===r.length,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),w.b(r[0]>=1&&r[1]>=1,()=>"cropSize must be atleast [1,1], but was "+r),w.b("bilinear"===o||"nearest"===o,()=>"method must be bilinear or nearest, but was "+o);const h={image:s,boxes:i,boxInd:c},d={method:o,extrapolationValue:a,cropSize:r};return u.a.runKernelFunc(e=>e.cropAndResize(s,i,c,r,o,a),h,null,z.I,d)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({flipLeftRight_:function(e){const t=Object(W.a)(e,"image","flipLeftRight","float32");w.b(4===t.rank,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const n={image:t};return u.a.runKernel(z.ab,n,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({rotateWithOffset_:function(e,t,n=0,r=.5){const o=Object(W.a)(e,"image","rotateWithOffset","float32");w.b(4===o.rank,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${o.rank}.`);const a={image:o},s={radians:t,fillValue:n,center:r};return u.a.runKernel(z.hc,a,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zt(e,t,n,r,o,a){null==r&&(r=.5),null==o&&(o=Number.NEGATIVE_INFINITY),null==a&&(a=0);const s=e.shape[0];return n=Math.min(n,s),w.b(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),w.b(2===e.rank,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),w.b(4===e.shape[1],()=>"boxes must have 4 columns, but 2nd dimension was "+e.shape[1]),w.b(1===t.rank,()=>"scores must be a 1D tensor"),w.b(t.shape[0]===s,()=>`scores has incompatible shape with boxes. Expected ${s}, but was `+t.shape[0]),w.b(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:o,softNmsSigma:a}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({nonMaxSuppression_:function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY){const a=Object(W.a)(e,"boxes","nonMaxSuppression"),s=Object(W.a)(t,"scores","nonMaxSuppression"),i=Zt(a,s,n,r,o);n=i.maxOutputSize,r=i.iouThreshold,o=i.scoreThreshold;const c={maxOutputSize:n,iouThreshold:r,scoreThreshold:o};return u.a.runKernelFunc(e=>e.nonMaxSuppression(a,s,n,r,o),{boxes:a,scores:s},null,z.Mb,c)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function en(e,t,n){const r=function(e,t,n){return function(e,t,n){let r=0,o=e.length,a=0,s=!1;for(;r<o;){a=r+(o-r>>>1);const i=n(t,e[a]);i>0?r=a+1:(o=a,s=!i)}return s?r:-r-1}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,t,n||tn)}(e,t,n),o=r<0?-(r+1):r;e.splice(o,0,t)}function tn(e,t){return e>t?1:e<t?-1:0}function nn(e,t,n,r,o){return an(e,t,n,r,o,0).selectedIndices}function rn(e,t,n,r,o,a){return an(e,t,n,r,o,0,!1,a,!0)}function on(e,t,n,r,o,a){return an(e,t,n,r,o,a,!0)}function an(e,t,n,r,o,a,s=!1,i=!1,u=!1){const c=[];for(let e=0;e<t.length;e++)t[e]>o&&c.push({score:t[e],boxIndex:e,suppressBeginIndex:0});c.sort(cn);const l=a>0?-.5/a:0,h=[],d=[];for(;h.length<n&&c.length>0;){const t=c.pop(),{score:n,boxIndex:a,suppressBeginIndex:s}=t;if(n<o)break;let i=!1;for(let n=h.length-1;n>=s;--n){const s=sn(e,a,h[n]);if(s>=r){i=!0;break}if(t.score=t.score*un(r,l,s),t.score<=o)break}t.suppressBeginIndex=h.length,i||(t.score===n?(h.push(a),d.push(t.score)):t.score>o&&en(c,t,cn))}const f=h.length,p=n-f;i&&p>0&&(h.push(...new Array(p).fill(0)),d.push(...new Array(p).fill(0)));const g={selectedIndices:Ct(h,"int32")};return s&&(g.selectedScores=Ct(d,"float32")),u&&(g.validOutputs=Ot(f,"int32")),g}function sn(e,t,n){const r=e.subarray(4*t,4*t+4),o=e.subarray(4*n,4*n+4),a=Math.min(r[0],r[2]),s=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),d=Math.max(o[1],o[3]),f=(i-a)*(u-s),p=(h-c)*(d-l);if(f<=0||p<=0)return 0;const g=Math.max(a,c),m=Math.max(s,l),b=Math.min(i,h),x=Math.min(u,d),y=Math.max(b-g,0)*Math.max(x-m,0);return y/(f+p-y)}function un(e,t,n){const r=Math.exp(t*n*n);return n<=e?r:0}function cn(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({nonMaxSuppressionWithScore_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY,a=0){const s=Object(W.a)(e,"boxes","nonMaxSuppression"),i=Object(W.a)(t,"scores","nonMaxSuppression"),c=Zt(s,i,n,r,o,a),l={boxes:s,scores:i},h={maxOutputSize:n=c.maxOutputSize,iouThreshold:r=c.iouThreshold,scoreThreshold:o=c.scoreThreshold,softNmsSigma:a=c.softNmsSigma},d=u.a.runKernel(z.Ob,l,h);return{selectedIndices:d[0],selectedScores:d[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({nonMaxSuppressionPadded_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY,a=!1){const s=Object(W.a)(e,"boxes","nonMaxSuppression"),i=Object(W.a)(t,"scores","nonMaxSuppression"),c=Zt(s,i,n,r,o,null),l={boxes:s,scores:i},h={maxOutputSize:c.maxOutputSize,iouThreshold:c.iouThreshold,scoreThreshold:c.scoreThreshold,padToMaxOutputSize:a},d=u.a.runKernel(z.Nb,l,h);return{selectedIndices:d[0],validOutputs:d[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ln=Object(G.a)({resizeBilinear_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n=!1){const r=Object(W.a)(e,"images","resizeBilinear");w.b(3===r.rank||4===r.rank,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${r.rank}.`),w.b(2===t.length,()=>"Error in resizeBilinear: new shape must 2D, but got shape "+t+".");let o=r,a=!1;3===r.rank&&(a=!0,o=_e(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const[s,i]=t,c={images:o},l={alignCorners:n,size:t},h=u.a.runKernelFunc((e,t)=>(t([o]),e.resizeBilinear(o,s,i,n)),c,null,z.cc,l);return a?_e(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hn=Object(G.a)({resizeNearestNeighbor_:function(e,t,n=!1){const r=Object(W.a)(e,"images","resizeNearestNeighbor");w.b(3===r.rank||4===r.rank,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${r.rank}.`),w.b(2===t.length,()=>"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."),w.b("float32"===r.dtype||"int32"===r.dtype,()=>"`images` must have `int32` or `float32` as dtype");let o=r,a=!1;3===r.rank&&(a=!0,o=_e(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const[s,i]=t,c={images:o},l={alignCorners:n,size:t},h=u.a.runKernelFunc((e,t)=>(t([o]),e.resizeNearestNeighbor(o,s,i,n)),c,null,z.ec,l);return a?_e(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dn=Object(G.a)({greaterEqual_:function(e,t){let n=Object(W.a)(e,"a","greaterEqual"),r=Object(W.a)(t,"b","greaterEqual");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.greaterEqual(n,r);return t([n,r]),o},o,null,z.hb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fn=Object(G.a)({lessEqual_:function(e,t){let n=Object(W.a)(e,"a","lessEqual"),r=Object(W.a)(t,"b","lessEqual");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.lessEqual(n,r);return t([n,r]),o},o,null,z.rb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pn=Object(G.a)({logicalAnd_:function(e,t){const n=Object(W.a)(e,"a","logicalAnd","bool"),r=Object(W.a)(t,"b","logicalAnd","bool");Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.logicalAnd(n,r),o,null,z.vb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gn=Object(G.a)({expandDims_:function(e,t=0){const n=Object(W.a)(e,"x","expandDims",null);w.b(t<=n.rank,()=>"Axis must be <= rank of the tensor");const r=n.shape.slice();return t<0&&(w.b(-(n.rank+1)<=t,()=>`Axis must be in the interval [${-(n.rank+1)}, ${n.rank}]`),t=n.rank+t+1),r.splice(t,0,1),_e(n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mn=Object(G.a)({stack_:function(e,t=0){const n=Object(W.b)(e,"tensors","stack");if(w.b(n.length>=1,()=>"Pass at least one tensor to tf.stack"),1===n.length)return gn(n[0],t);const r=n[0].rank,o=n[0].shape,a=n[0].dtype;w.b(t<=r,()=>"Axis must be <= rank of the tensor"),n.forEach(e=>{w.e(o,e.shape,"All tensors passed to stack must have matching shapes"),w.b(a===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});const s=n.map(e=>gn(e,t));return Be(s,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bn=Object(G.a)({unstack_:function(e,t=0){const n=Object(W.a)(e,"x","unstack");w.b(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`),t<0&&(t+=n.shape.length);const r={value:n},o={axis:t};return u.a.runKernelFunc(e=>e.unstack(n,t),r,null,z.Ic,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({bandPart_:function(e,t,n){Object(w.b)(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),Object(w.b)(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`);const r=Object(W.a)(e,"a","bandPart");Object(w.b)(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);const o=r.shape,[a,s]=r.shape.slice(-2);if(!(t<=a))throw new Error(`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`);if(!(n<=s))throw new Error(`bandPart(): numUpper (${n}) must not be greater than the number of columns (${s}).`);t<0&&(t=a),n<0&&(n=s);const i=_e($t(0,a,1,"int32"),[-1,1]),u=$t(0,s,1,"int32"),c=_t(i,u),l=pn(fn(c,Ot(+t,"int32")),dn(c,Ot(-n,"int32"))),h=Et([a,s],r.dtype);return _e(mn(bn(_e(r,[-1,a,s])).map(e=>Bt(l,e,h))),o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xn=Object(G.a)({abs_:function(e){const t=Object(W.a)(e,"x","abs"),n={x:t};return u.a.runKernelFunc((e,n)=>(n([t]),"complex64"===t.dtype?e.complexAbs(t):e.abs(t)),n,null,z.a)}});const yn=Object(G.a)({min_:function(e,t=null,n=!1){const r=Object(W.a)(e,"x","min"),o={x:r},a={axis:t,keepDims:n};return u.a.runKernelFunc((e,o)=>{const a=Object(w.I)(t,r.shape);let s=a;const i=ot(s,r.rank);let u=r;null!=i&&(u=it(r,i),s=st(s.length,r.rank));const c=e.min(u,s);null!=i&&u.dispose();let l=c;if(n){const e=nt(l.shape,a);l=_e(c,e),c.dispose()}return o([r,l]),l},o,null,z.Gb,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vn=Object(G.a)({sqrt_:function(e){const t=Object(W.a)(e,"x","sqrt"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.sqrt(t);return n([t]),r},n,null,z.vc)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wn=Object(G.a)({square_:function(e){const t=Object(W.a)(e,"x","square"),n=[t];return u.a.runKernelFunc((e,n)=>(n([t]),e.square(t)),{x:t},null,"Square",{},n,[])}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cn=Object(G.a)({sum_:function(e,t=null,n=!1){let r=Object(W.a)(e,"x","sum");"bool"===r.dtype&&(r=X(r,"int32"));const o={x:r},a={axis:t,keepDims:n};return u.a.runKernelFunc((e,o)=>{o([r]);const a=Object(w.I)(t,r.shape),s=ot(a,r.rank);let i=a,u=r;null!=s&&(u=it(r,s),i=st(i.length,r.rank));let c=e.sum(u,i);if(n){const e=nt(c.shape,a);c=_e(c,e)}return c},o,null,z.Bc,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const In=Object(G.a)({norm_:function(e,t="euclidean",n=null,r=!1){const o=function e(t,n,r=null){if(0===t.rank)return xn(t);if(1!==t.rank&&null===r)return e(_e(t,[-1]),n,r);if(1===t.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===n)return Cn(xn(t),r);if(n===1/0)return ft(xn(t),r);if(n===-1/0)return yn(xn(t),r);if("euclidean"===n||2===n)return vn(Cn(bt(xn(t),Ot(2,"int32")),r));throw new Error("Error in norm: invalid ord value: "+n)}if(Array.isArray(r)&&2===r.length){if(1===n)return ft(Cn(xn(t),r[0]),r[1]-1);if(n===1/0)return ft(Cn(xn(t),r[1]),r[0]);if(n===-1/0)return yn(Cn(xn(t),r[1]),r[0]);if("fro"===n||"euclidean"===n)return vn(Cn(wn(t),r));throw new Error("Error in norm: invalid ord value: "+n)}throw new Error("Error in norm: invalid axis: "+r)}(e=Object(W.a)(e,"x","norm"),t,n);let a=o.shape;if(r){const t=Object(w.I)(n,e.shape);a=nt(o.shape,t)}return _e(o,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({gramSchmidt_:function(e){let t;if(Array.isArray(e)){t=!1,Object(w.b)(null!=e&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const n=e[0].shape[0];for(let t=1;t<e.length;++t)Object(w.b)(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=At(e,e.shape[0],0).map(e=>Tt(e,[0]));Object(w.b)(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);const n=[],r=e;for(let t=0;t<e.length;++t)n.push(u.a.tidy(()=>{let e=r[t];if(t>0)for(let r=0;r<t;++r){const t=gt(Cn(gt(n[r],e)),n[r]);e=_t(e,t)}return ht(e,In(e,"euclidean"))}));return t?mn(n,0):n}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function En(e){Object(c.b)().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function $n(){return u.a}function On(e,t){return u.a.tidy(e,t)}function kn(e){Object(Ae.a)(e).forEach(e=>e.dispose())}function Rn(e,t,n=1){return u.a.registerBackend(e,t,n)}Object(U.d)(En);const Sn=Object(G.a)({eye_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r="float32"){null==t&&(t=e);const o=V([e,t],r),a=e<=t?e:t;for(let e=0;e<a;++e)o.set(1,e,e);const s=_e(o.toTensor(),[e,t]);if(null==n)return s;if(1===n.length)return Nt(gn(s,0),[n[0],1,1]);if(2===n.length)return Nt(gn(gn(s,0),0),[n[0],n[1],1,1]);if(3===n.length)return Nt(gn(gn(gn(s,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const An=Object(G.a)({greater_:function(e,t){let n=Object(W.a)(e,"a","greater"),r=Object(W.a)(t,"b","greater");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.greater(n,r),o,null,z.gb)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tn=Object(G.a)({neg_:function(e){const t=Object(W.a)(e,"x","neg"),n={x:t};return u.a.runKernelFunc(e=>e.neg(t),n,null,z.Lb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _n(e,t=!1){return u.a.tidy(()=>{Object(w.b)(2===e.shape.length,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);const n=e.shape[0],r=e.shape[1];let o=Sn(n),a=q(e);const s=Qt([[1]],[1,1]);let i=q(s);const c=n>=r?r:n;for(let e=0;e<c;++e){const t=a,c=i,l=o;[i,a,o]=u.a.tidy(()=>{const t=Vt(a,[e,e],[n-e,1]),u=In(t),c=Vt(a,[e,e],[1,1]),l=Bt(An(c,0),Qt([[-1]]),Qt([[1]])),h=_t(c,gt(l,u)),d=ht(t,h);i=1===d.shape[0]?q(s):Be([s,Vt(d,[1,0],[d.shape[0]-1,d.shape[1]])],0);const f=Tn(ht(dt(l,h),u)),p=Vt(a,[e,0],[n-e,r]),g=gt(f,i),m=it(i);if(0===e)a=_t(p,dt(g,dt(m,p)));else{const t=_t(p,dt(g,dt(m,p)));a=Be([Vt(a,[0,0],[e,r]),t],0)}const b=it(g),x=Vt(o,[0,e],[n,o.shape[1]-e]);if(0===e)o=_t(x,dt(dt(x,i),b));else{const t=_t(x,dt(dt(x,i),b));o=Be([Vt(o,[0,0],[n,e]),t],1)}return[i,a,o]}),kn([t,c,l])}return!t&&n>r&&(o=Vt(o,[0,0],[n,r]),a=Vt(a,[0,0],[r,r])),[o,a]})}Object(G.a)({qr_:function(e,t=!1){if(Object(w.b)(e.rank>=2,()=>"qr() requires input tensor to have a rank >= 2, but got rank "+e.rank),2===e.rank)return _n(e,t);{const n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=bn(_e(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),o=[],a=[];r.forEach(e=>{const[n,r]=_n(e,t);o.push(n),a.push(r)});return[_e(mn(o,0),e.shape),_e(mn(a,0),e.shape)]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Nn;function Fn(e){return u.a.customGrad(e)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function jn(e,t="float32"){if("complex64"===t){const t=jn(e,"float32"),n=Et(e,"float32");return Object(It.a)(t,n)}const n=Object(w.D)(Object(w.N)(e),t);return u.a.makeTensor(n,e,t)}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */!function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}(Nn||(Nn={}));const Dn=Object(G.a)({mean_:function(e,t=null,n=!1){const r=Object(W.a)(e,"x","mean"),o=Object(w.I)(t,r.shape),a=tt(r.shape,o)[1],s=Object(w.N)(a),i={x:r},c={axis:t,keepDims:n},l=()=>{const e=Ot(s),o=e.dtype===r.dtype?r:X(r,e.dtype),a=ht(o,e);return Cn(a,t,n)};return Fn(e=>({value:u.a.runKernelFunc(l,i,null,z.Fb,c),gradFunc:t=>{const n=e.shape.slice();o.forEach(e=>{n[e]=1});const r=_e(t,n);return ht(gt(r,jn(e.shape,"float32")),s)}}))(r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ln=Object(G.a)({notEqual_:function(e,t){let n=Object(W.a)(e,"a","notEqual"),r=Object(W.a)(t,"b","notEqual");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.notEqual(n,r),o,null,z.Pb)}});const Bn=Object(G.a)({computeWeightedLoss_:function(e,t,n=Nn.SUM_BY_NONZERO_WEIGHTS){const r=Object(W.a)(e,"losses","computeWeightedLoss");let o=null;null!=t&&(o=Object(W.a)(t,"weights","computeWeightedLoss"));const a=null==o?r:gt(r,o);if(n===Nn.NONE)return a;if(n===Nn.SUM)return Cn(a);if(n===Nn.MEAN){if(null==o)return Dn(a);{const e=r.size/o.size,t=ht(Cn(a),Cn(o));return e>1?ht(t,Ot(e)):t}}if(n===Nn.SUM_BY_NONZERO_WEIGHTS){if(null==o)return ht(Cn(a),Ot(r.size));{const e=gt(o,jn(r.shape)),t=X(Cn(Ln(e,Ot(0))),"float32");return ht(Cn(a),t)}}throw Error("Unknown reduction: "+n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({absoluteDifference_:function(e,t,n,r=Nn.SUM_BY_NONZERO_WEIGHTS){const o=Object(W.a)(e,"labels","absoluteDifference"),a=Object(W.a)(t,"predictions","absoluteDifference");let s=null;null!=n&&(s=Object(W.a)(n,"weights","absoluteDifference")),Object(w.e)(o.shape,a.shape,"Error in absoluteDifference: ");const i=xn(_t(o,a));return Bn(i,s,r)}});Object(G.a)({cosineDistance_:function(e,t,n,r,o=Nn.SUM_BY_NONZERO_WEIGHTS){const a=Object(W.a)(e,"labels","cosineDistance"),s=Object(W.a)(t,"predictions","cosineDistance");let i=null;null!=r&&(i=Object(W.a)(r,"weights","cosineDistance")),Object(w.e)(a.shape,s.shape,"Error in cosineDistance: ");const u=Ot(1),c=_t(u,Cn(gt(a,s),n,!0));return Bn(c,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pn=Object(G.a)({relu_:function(e){const t=Object(W.a)(e,"x","relu"),n={x:t};return u.a.runKernelFunc((e,n)=>(n([t]),"bool"===t.dtype?X(t,"int32"):e.relu(t)),n,null,z.Zb)}});Object(G.a)({hingeLoss_:function(e,t,n,r=Nn.SUM_BY_NONZERO_WEIGHTS){let o=Object(W.a)(e,"labels","hingeLoss");const a=Object(W.a)(t,"predictions","hingeLoss");let s=null;null!=n&&(s=Object(W.a)(n,"weights","hingeLoss")),Object(w.e)(o.shape,a.shape,"Error in hingeLoss: ");const i=Ot(1);o=_t(gt(Ot(2),o),i);const u=Pn(_t(i,gt(o,a)));return Bn(u,s,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mn=Object(G.a)({minimum_:function(e,t){let n=Object(W.a)(e,"a","minimum"),r=Object(W.a)(t,"b","minimum");[n,r]=Object(Ae.b)(n,r),"bool"===n.dtype&&(n=X(n,"int32"),r=X(r,"int32")),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.minimum(n,r);return t([n,r]),o},o,null,z.Hb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({huberLoss_:function(e,t,n,r=1,o=Nn.SUM_BY_NONZERO_WEIGHTS){const a=Object(W.a)(e,"labels","huberLoss"),s=Object(W.a)(t,"predictions","huberLoss");let i=null;null!=n&&(i=Object(W.a)(n,"weights","huberLoss")),Object(w.e)(a.shape,s.shape,"Error in huberLoss: ");const u=Ot(r),c=xn(_t(s,a)),l=Mn(c,u),h=_t(c,l),d=Te(gt(Ot(.5),wn(l)),gt(u,h));return Bn(d,i,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Un=Object(G.a)({log_:function(e){const t=Object(W.a)(e,"x","log"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.log(t);return n([t]),r},n,null,z.sb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({logLoss_:function(e,t,n,r=1e-7,o=Nn.SUM_BY_NONZERO_WEIGHTS){const a=Object(W.a)(e,"labels","logLoss"),s=Object(W.a)(t,"predictions","logLoss");let i=null;null!=n&&(i=Object(W.a)(n,"weights","logLoss")),Object(w.e)(a.shape,s.shape,"Error in logLoss: ");const u=Ot(1),c=Ot(r),l=Tn(gt(a,Un(Te(s,c)))),h=gt(_t(u,a),Un(Te(_t(u,s),c))),d=_t(l,h);return Bn(d,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vn=Object(G.a)({squaredDifference_:function(e,t){let n=Object(W.a)(e,"a","squaredDifference"),r=Object(W.a)(t,"b","squaredDifference");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.squaredDifference(n,r);return t([n,r]),o},o,null,z.xc,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({meanSquaredError_:function(e,t,n,r=Nn.SUM_BY_NONZERO_WEIGHTS){const o=Object(W.a)(e,"labels","meanSquaredError"),a=Object(W.a)(t,"predictions","meanSquaredError");let s=null;null!=n&&(s=Object(W.a)(n,"weights","meanSquaredError")),Object(w.e)(o.shape,a.shape,"Error in meanSquaredError: ");const i=Vn(o,a);return Bn(i,s,r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zn=Object(G.a)({exp_:function(e){const t=Object(W.a)(e,"x","exp"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.exp(t);return n([r]),r},n,null,z.W)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wn=Object(G.a)({log1p_:function(e){const t=Object(W.a)(e,"x","log1p"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.log1p(t);return n([t]),r},n,null,z.tb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({sigmoidCrossEntropy_:function(e,t,n,r=0,o=Nn.SUM_BY_NONZERO_WEIGHTS){let a=Object(W.a)(e,"multiClassLabels","sigmoidCrossEntropy");const s=Object(W.a)(t,"logits","sigmoidCrossEntropy");let i=null;if(null!=n&&(i=Object(W.a)(n,"weights","sigmoidCrossEntropy")),Object(w.e)(a.shape,s.shape,"Error in sigmoidCrossEntropy: "),r>0){const e=Ot(r),t=Ot(1),n=Ot(.5);a=Te(gt(a,_t(t,e)),gt(n,e))}const u=function(e,t){const n=Object(W.a)(e,"labels","sigmoidCrossEntropyWithLogits"),r=Object(W.a)(t,"logits","sigmoidCrossEntropyWithLogits");Object(w.e)(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");const o=Pn(r),a=gt(r,n),s=Wn(zn(Tn(xn(r))));return Te(_t(o,a),s)}(a,s);return Bn(u,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gn=Object(G.a)({logSumExp_:function(e,t=null,n=!1){const r=Object(W.a)(e,"x","logSumExp"),o=Object(w.I)(t,r.shape),a=ft(r,o,!0),s=_t(r,a),i=zn(s),u=Cn(i,o),c=Un(u),l=Te(_e(a,c.shape),c);if(n){const e=nt(l.shape,o);return _e(l,e)}return l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(G.a)({softmaxCrossEntropy_:function(e,t,n,r=0,o=Nn.SUM_BY_NONZERO_WEIGHTS){let a=Object(W.a)(e,"onehotLabels","softmaxCrossEntropy");const s=Object(W.a)(t,"logits","softmaxCrossEntropy");let i=null;if(null!=n&&(i=Object(W.a)(n,"weights","softmaxCrossEntropy")),Object(w.e)(a.shape,s.shape,"Error in softmaxCrossEntropy: "),r>0){const e=Ot(r),t=Ot(1),n=Ot(a.shape[1]);a=Te(gt(a,_t(t,e)),ht(e,n))}const u=function(e,t,n=-1){if(-1===n&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was `+n);return Fn((e,t,r)=>{const o=Gn(t,[n],!0),a=_t(X(t,"float32"),o);r([e,a]);const s=Tn(gt(a,e));return{value:Cn(s,[n]),gradFunc:(e,t)=>{const[r,o]=t,a=nt(e.shape,[n]);return[gt(_e(e,a),_t(X(r,"float32"),zn(o))),gt(_e(e,a),_t(zn(o),X(r,"float32")))]}}})(e,t)}(a,s);return Bn(u,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Xn=n(26),qn=n(82);const Hn=Object(G.a)({elu_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","elu"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.elu(t);return n([r]),r},n,null,z.S)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kn=Object(G.a)({prelu_:function(e,t){const n=Object(W.a)(e,"x","prelu"),r=Object(W.a)(t,"alpha","prelu"),o={x:n,alpha:r};return u.a.runKernelFunc((e,t)=>{const o=e.prelu(n,r);return t([n,r]),o},o,null,z.Ub)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yn=Object(G.a)({relu6_:function(e){const t=Object(W.a)(e,"x","relu6"),n={x:t};return u.a.runKernelFunc((e,n)=>(n([t]),"bool"===t.dtype?X(t,"int32"):e.relu6(t)),n,null,z.ac)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qn=Object(G.a)({step_:function(e,t=0){const n=Object(W.a)(e,"x","step"),r={x:n},o={alpha:t};return u.a.runKernelFunc(e=>e.step(n,t),r,null,z.yc,o)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jn(e,t,n){if(null==n||"linear"===n)return e;if("relu"===n)return gt(e,Qn(t));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function Zn(e,t){let n=t;const r=Dt(e.shape,t.shape);return r.length>0&&(n=Cn(n,r)),_e(n,e.shape)}function er(e,t,n){if("linear"===t)return e;if("relu"===t)return Pn(e);if("elu"===t)return Hn(e);if("relu6"===t)return Yn(e);if("prelu"===t)return Kn(e,n);throw new Error(`Unknown fused activation ${t}.`)}const tr=(e,t)=>!(e>0)||"linear"===t,nr=30;
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rr(e){return e<=nr?e:Object(w.G)(e,Math.floor(Math.sqrt(e)))}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function or(e,t,n){return[n*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ar(e,t,n,r=!0){let o=[];if(r)o=o.concat(t.slice(0)),o.push(e[0]/n),o=o.concat(e.slice(1));else{o=o.concat(e[0]);const n=t.length;for(let r=0;r<n;++r)o=o.concat([e[r+1]/t[r],t[r]]);o=o.concat(e.slice(n+1))}return o}function sr(e,t,n=!0){const r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{const n=[],o=[];for(let r=1;r<e;++r)r>=2*t+1||r%2==1?o.push(r):n.push(r);r.push(...n),r.push(0),r.push(...o)}return r}function ir(e,t,n,r=!0){const o=[];r?o.push(e[0]/n):o.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?o.push(t[n-1]*e[n]):o.push(e[n]/t[n-1]):o.push(e[n]);return o}function ur(e,t){const n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function cr(e,t,n){const r=e.slice(0,1);for(let o=0;o<n;++o)r.push(e[o+1]-t[o][0]-t[o][1]);return r}function lr(e,t){if(e.rank<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.rank<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if("int32"!==t.dtype)throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[t.rank-1]>e.rank)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[t.rank-1]} vs. ${e.rank}`);if(0===e.size)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);const n=t.shape,r=n[n.length-1];let o=1;for(let e=0;e<n.length-1;++e)o*=n[e];const a=e.shape,s=n.slice();s.pop();let i=1;for(let t=r;t<e.rank;++t)i*=a[t],s.push(a[t]);const u=[...Object(w.j)(e.shape).map(e=>e/i),1].slice(0,r);return[s,o,i,u]}function hr(e,t,n){const r=t.rank>1?t.shape[t.rank-1]:1,o=t.rank>1?t.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+n.shape+`, indices.shape: ${t.shape}, shape: ${e}`+`, sliceDim: ${r}, and batchDim: ${o}.`;if(n.rank<o)throw new Error(a+` update.rank < ${o}. `);if(e.length<r+(n.rank-o))throw new Error(a+" Output shape length < "+(r+(n.rank-o)));if(n.rank!==o+e.length-r)throw new Error(a+" update.rank != "+(o+e.length-r));for(let e=0;e<o;++e)if(n.shape[e]!==t.shape[e])throw new Error(a+` updates.shape[${e}] (${n.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<n.rank-o;++t)if(n.shape[t+o]!==e[t+r])throw new Error(a+` updates.shape[${t+o}] (${n.shape[t+o]}) != shape[${t+o}] (${e[t+o]})`)}function dr(e,t,n){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(n.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+n);if(0===n.length){if(0===t.size)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(0===e.size)throw new Error("Updates specified for empty output. updates shape: "+e.shape)}hr(n,t,e)}function fr(e,t,n){const r=t.shape.length,o=r>1?t.shape[r-1]:1,a=n.length;let s=1;for(let e=o;e<a;++e)s*=n[e];const i=o<1?1:o;return{sliceRank:o,numUpdates:Object(w.N)(t.shape)/i,sliceSize:s,strides:[...Object(w.j)(n.slice(0,o)),1],outputSize:Object(w.N)(n)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pr=1.7580993408473768,gr=1.0507009873554805,mr=.3275911,br=.254829592,xr=-.284496736,yr=1.421413741,vr=-1.453152027,wr=1.061405429;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Cr(...e){Object(c.b)().getBool("IS_TEST")||console.warn(...e)}function Ir(...e){Object(c.b)().getBool("IS_TEST")||console.log(...e)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Er(e,t){if(e.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);const n=new Float32Array(2*e.length);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function $r(e){const t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function Or(e){const t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function kr(e){const t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Rr(e,t){return{real:e[2*t],imag:e[2*t+1]}}function Sr(e,t,n,r){e[2*r]=t,e[2*r+1]=n}function Ar(e,t){const n=new Float32Array(e/2),r=new Float32Array(e/2);for(let o=0;o<Math.ceil(e/2);o++){const a=(t?2:-2)*Math.PI*(o/e);n[o]=Math.cos(a),r[o]=Math.sin(a)}return{real:n,imag:r}}function Tr(e,t,n){const r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _r(e,t){let n,r=!1;for(e<=nr?(n=e,r=!0):n=Object(w.G)(e,Math.floor(Math.sqrt(e)));!r;)n>t||n===e?r=!0:n=Object(w.G)(e,n+1);return n}function Nr(e,t,n){const r=[],o=e.length;for(let a=0;a<o;a++)a!==t?r.push(e[a]):r.push(n);return r}function Fr(e,t,n){const r=e.shape[n],o=[];let a=1,s=1;for(let t=0;t<n;t++)o.push(e.shape[t]),a*=e.shape[t];for(let e=0;e<t.rank;e++)o.push(t.shape[e]);for(let t=n+1;t<e.rank;t++)o.push(e.shape[t]),s*=e.shape[t];return{batchSize:a,sliceSize:s,dimSize:r,outputShape:o}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jr(e,t,n){if("complex64"===t){if("complex64"===e.dtype)return e.clone();const t=Et(e.shape),r=X(e,"float32"),o=n.complex(r,t);return t.dispose(),r.dispose(),o}if(!Object(w.p)(e.dtype,t))return u.a.makeTensorFromDataId(e.dataId,e.shape,t);if("complex64"===e.dtype){const r=n.real(e),o=X(r,t);return r.dispose(),o}if("int32"===t)return n.int(e);if("bool"===t){const t=Ot(0,e.dtype),r=n.notEqual(e,t);return t.dispose(),r}throw new Error(`Error in Cast: failed to cast ${e.dtype} to ${t}`)}function Dr(e,t){return u.a.makeTensorFromDataId(e.dataId,t,e.dtype)}function Lr(e,t,n){const r=(t-e)/(n-1),o=Object(w.F)(n,"float32");o[0]=e;for(let e=1;e<o.length;e++)o[e]=o[e-1]+r;return Ct(o,"float32")}var Br=n(50);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pr(e,t,n){const r=new Array(e.rank).fill(0),o=e.shape.slice();return t.map(t=>{const a=[...o];a[n]=t;const s=Vt(e,r,a);return r[n]+=t,s})}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mr(e,t){const n=new Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];const r=V(n,e.dtype);for(let t=0;t<r.values.length;++t){const n=r.indexToLoc(t),o=new Array(e.rank);for(let t=0;t<o.length;t++)o[t]=n[t]%e.shape[t];const a=e.locToIndex(o);r.values[t]=e.values[a]}return r.toTensor()}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ur(e,t,n,r,o){const a=t[t.length-1],[s,i]=[e.length/a,a],u=Object(w.o)(n,s*r),c=Object(w.o)("int32",s*r);for(let t=0;t<s;t++){const n=t*i,o=e.subarray(n,n+i),a=[];for(let e=0;e<o.length;e++)a.push({value:o[e],index:e});a.sort((e,t)=>t.value-e.value);const s=t*r,l=u.subarray(s,s+r),h=c.subarray(s,s+r);for(let e=0;e<r;e++)l[e]=a[e].value,h[e]=a[e].index}const l=t.slice();return l[l.length-1]=r,[Object(Le.a)(u,l,n),Object(Le.a)(c,l,"int32")]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vr(e,t){const n=[];for(let e=0;e<t.length;e++)t[e]&&n.push(e);const r=V(e,"int32"),o=V([n.length,e.length],"int32");for(let t=0;t<n.length;t++){const a=r.indexToLoc(n[t]),s=t*e.length;o.values.set(a,s)}return o.toTensor()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var zr=n(40);
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wr={kernelName:z.a,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,Qn(X(n,"float32"),-1))}}},Gr={kernelName:z.b,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>{const t=wn(X(n,"float32")),r=vn(_t(Ot(1),t));return Tn(ht(e,r))}}}},Xr={kernelName:z.c,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>{const t=vn(_t(wn(X(n,"float32")),1));return ht(e,t)}}}},qr={kernelName:z.d,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{let t=e;const r=Dt(n.shape,o);return r.length>0&&(t=Cn(t,r)),_e(t,n.shape)},b:()=>{let t=e;const n=Dt(r.shape,o);return n.length>0&&(t=Cn(t,n)),_e(t,r.shape)}}}},Hr={kernelName:z.e,saveAllInputs:!0,gradFunc:(e,t)=>{const n={};return t.forEach((t,r)=>{n[r]=()=>e.clone()}),n}},Kr={kernelName:z.h,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>Pt(n)}}},Yr={kernelName:z.i,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>Pt(n)}}},Qr={kernelName:z.j,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,vn(_t(Ot(1),wn(X(n,"float32")))))}}},Jr={kernelName:z.k,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>{const t=vn(Te(Ot(1),wn(X(n,"float32"))));return ht(e,t)}}}},Zr={kernelName:z.m,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{const t=Te(wn(n),wn(r));let a=gt(e,ht(r,t));const s=Dt(n.shape,o);return s.length>0&&(a=Cn(a,s)),_e(a,n.shape)},b:()=>{const t=Te(wn(n),wn(r));let a=Tn(gt(e,ht(n,t)));const s=Dt(r.shape,o);return s.length>0&&(a=Cn(a,s)),_e(a,r.shape)}}}},eo={kernelName:z.l,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,Te(wn(X(n,"float32")),1))}}},to={kernelName:z.n,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,_t(Ot(1),wn(X(n,"float32"))))}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const no=Object(G.a)({avgPool3dBackprop_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o=[1,1,1],a,s){const i=Object(W.a)(e,"dy","avgPool3dBackprop"),c=Object(W.a)(t,"input","avgPool3dBackprop");let l=i,h=c,d=!1;4===c.rank&&(d=!0,l=_e(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]]),h=_e(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]])),w.b(5===l.rank,()=>"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+l.rank+"."),w.b(5===h.rank,()=>"Error in avgPool3dBackprop: input must be rank 5 but got rank "+h.rank+"."),w.b(Ye(r,o),()=>`Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides ${r} and dilations '${o}'`),null!=s&&w.b(w.v(a),()=>`Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode ${s} but got pad ${a}.`);const f={dy:l,input:h},p={filterSize:n,strides:r,dilations:o,pad:a,dimRoundingMode:s},g=u.a.runKernelFunc(e=>{const t=Ue(h.shape,n,r,o,a,s);return e.avgPool3dBackprop(l,h,t)},f,null,z.q,p);return d?_e(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}}),ro={kernelName:z.p,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{filterSize:o,strides:a,dilations:s,pad:i,dimRoundingMode:u}=n,c=null==s?[1,1,1]:s;return{x:()=>no(e,r,o,a,c,i,u)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oo=Object(G.a)({avgPoolBackprop_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o){const a=Object(W.a)(e,"dy","avgPoolBackprop"),s=Object(W.a)(t,"input","avgPoolBackprop");w.b(s.rank===a.rank,()=>`Rank of input (${s.rank}) does not match rank of dy (${a.rank})`);let i=s,c=a,l=!1;3===s.rank&&(l=!0,i=_e(s,[1,s.shape[0],s.shape[1],s.shape[2]]),c=_e(a,[1,a.shape[0],a.shape[1],a.shape[2]])),w.b(4===c.rank,()=>"Error in avgPoolBackprop: dy must be rank 4 but got rank "+c.rank+"."),w.b(4===i.rank,()=>"Error in avgPoolBackprop: input must be rank 4 but got rank "+i.rank+".");const h={dy:c,input:i},d={filterSize:n,strides:r,pad:o},f=u.a.runKernelFunc(e=>{const t=Me(i.shape,n,r,1,o);return e.avgPoolBackprop(c,i,t)},h,null,z.r,d);return l?_e(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),ao={kernelName:z.o,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{filterSize:o,strides:a,pad:s}=n;return{x:()=>oo(e,r,o,a,s)}}},so={kernelName:z.s,inputsToSave:["a","b"],gradFunc:(e,t,n)=>{const[r,o]=t,{transposeA:a,transposeB:s}=n;return a||s?!a&&s?{a:()=>dt(e,o,!1,!1),b:()=>dt(e,r,!0,!1)}:a&&!s?{a:()=>dt(o,e,!1,!0),b:()=>dt(r,e,!1,!1)}:{a:()=>dt(o,e,!0,!0),b:()=>dt(e,r,!0,!0)}:{a:()=>dt(e,o,!1,!0),b:()=>dt(r,e,!0,!1)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const io=Object(G.a)({spaceToBatchND_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=Object(W.a)(e,"x","spaceToBatchND");w.b(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),w.b(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),w.b(r.shape.reduce((e,r,o)=>o>0&&o<=t.length?e&&(r+n[o-1][0]+n[o-1][1])%t[o-1]==0:e,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);const o={x:r},a={blockShape:t,paddings:n};return u.a.runKernelFunc(e=>e.spaceToBatchND(r,t,n),o,null,z.tc,a)}}),uo={kernelName:z.t,gradFunc:(e,t,n)=>{const{blockShape:r,crops:o}=n;return{x:()=>io(e,r,o)}}},co={kernelName:z.u,gradFunc:(e,t,n)=>{const r=n,o=r.inputShape,a=r.shape,s=Array.from(a);for(let e=o.length-1;e>=0;e--)if(o[e]===a[e])s[e]=1;else if(1!==o[e])throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${a}].`);const i=[];for(let e=0;e<s.length;e++)s[e]>1&&i.push(e);return{x:()=>Cn(e,i,!0)}}},lo={kernelName:z.v,gradFunc:e=>({x:()=>e.clone()})},ho={kernelName:z.w,gradFunc:e=>({x:()=>Pt(e)})},fo={kernelName:z.x,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{clipValueMin:o,clipValueMax:a}=n;return{x:()=>Bt(pn(dn(r,o),fn(r,a)),e,Pt(e))}}},po={kernelName:z.z,saveAllInputs:!0,gradFunc:(e,t,n)=>{const r=t.map(e=>e.shape),{axis:o}=n,a=Object(w.I)(o,t[0].shape)[0],s=r.map(e=>e[a]);return At(e,s,a).map(e=>()=>e)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const go=Object(G.a)({conv2DBackpropFilter_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a="NHWC",s){let i=e;3===e.rank&&(i=_e(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;3===c.rank&&(c=_e(t,[1,t.shape[0],t.shape[1],t.shape[2]])),w.b(4===i.rank,()=>"Error in conv2dDerFilter: input must be rank 4, but got shape "+i.shape+"."),w.b(4===c.rank,()=>"Error in conv2dDerFilter: dy must be rank 4, but got shape "+c.shape+"."),w.b(4===n.length,()=>"Error in conv2dDerFilter: filterShape must be length 4, but got "+n+".");const l="NHWC"===a?i.shape[3]:i.shape[1],h="NHWC"===a?c.shape[3]:c.shape[1];w.b(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),w.b(h===n[3],()=>`Error in conv2dDerFilter: depth of dy (${h}) must match output depth for filter (${n[3]}).`),null!=s&&w.b(w.v(o),()=>`Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode ${s} but got pad ${o}.`);const d={x:i,dy:c},f={strides:r,pad:o,dataFormat:a,dimRoundingMode:s,filterShape:n};return u.a.runKernelFunc(e=>{const t=Qe(a),u=Ve(i.shape,n,r,1,o,s,!1,t);return e.conv2dDerFilter(i,c,u)},d,null,z.B,f)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mo=Object(G.a)({conv2DBackpropInput_:function(e,t,n,r,o,a="NHWC",s){w.b(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let i=e,c=t,l=!1;3===t.rank&&(l=!0,c=_e(t,[1,t.shape[0],t.shape[1],t.shape[2]]),i=[1,e[0],e[1],e[2]]),w.b(4===i.length,()=>"Error in conv2dDerInput: inShape must be length 4, but got length "+i.length+"."),w.b(4===c.rank,()=>"Error in conv2dDerInput: dy must be rank 4, but got rank "+c.rank),w.b(4===n.rank,()=>"Error in conv2dDerInput: filter must be rank 4, but got rank "+n.rank);const h="NHWC"===a?i[3]:i[1],d="NHWC"===a?c.shape[3]:c.shape[1];w.b(h===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${h}) must match input depth for filter ${n.shape[2]}.`),w.b(d===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${d}) must match output depth for filter ${n.shape[3]}.`),null!=s&&w.b(w.v(o),()=>`Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode ${s} but got pad ${o}.`);const f={dy:c,filter:n},p={strides:r,pad:o,dataFormat:a,dimRoundingMode:s,inputShape:i},g=u.a.runKernelFunc((e,t)=>{const u=Qe(a),l=Ve(i,n.shape,r,1,o,s,!1,u),h=e.conv2dDerInput(c,n,l);return t([c,n]),h},f,null,z.C,p);return l?_e(g,[g.shape[1],g.shape[2],g.shape[3]]):g}}),bo={kernelName:z.A,inputsToSave:["x","filter"],gradFunc:(e,t,n)=>{const[r,o]=t,{dilations:a,strides:s,pad:i,dataFormat:u}=n;return w.b(Ke(a),()=>`Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`),{x:()=>mo(r.shape,e,o,s,i,u),filter:()=>go(r,e,o.shape,s,i,u)}}},xo={kernelName:z.C,inputsToSave:["dy","filter"],gradFunc:(e,t,n)=>{const[r,o]=t,{strides:a,pad:s,dataFormat:i,dimRoundingMode:u}=n;return{dy:()=>Je(e,o,a,s,i,1,u),filter:()=>go(e,r,o.shape,a,s,i,u)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yo=Object(G.a)({conv3DBackpropFilter_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o){let a=e;4===e.rank&&(a=_e(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]));let s=t;4===s.rank&&(s=_e(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]])),w.b(5===a.rank,()=>"Error in conv3dDerFilter: input must be rank 5, but got shape "+a.shape+"."),w.b(5===s.rank,()=>"Error in conv3dDerFilter: dy must be rank 5, but got shape "+s.shape+"."),w.b(5===n.length,()=>"Error in conv3dDerFilter: filterShape must be length 5, but got "+n+"."),w.b(a.shape[4]===n[3],()=>`Error in conv3dDerFilter: depth of input ${a.shape[4]}) must match input depth in filter (${n[3]}.`),w.b(s.shape[4]===n[4],()=>`Error in conv3dDerFilter: depth of dy (${s.shape[4]}) must match output depth for filter (${n[4]}).`);const i={x:a,dy:s},c={strides:r,pad:o,filterShape:n};return u.a.runKernelFunc(e=>{const t=ze(a.shape,n,r,1,o);return e.conv3dDerFilter(a,s,t)},i,null,z.E,c)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vo=Object(G.a)({conv3DBackpropInput_:function(e,t,n,r,o){w.b(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,s=t,i=!1;4===t.rank&&(i=!0,s=_e(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);const c=a[4],l=s.shape[4];w.b(5===a.length,()=>"Error in conv3dDerInput: inShape must be length 5, but got length "+a.length+"."),w.b(5===s.rank,()=>"Error in conv3dDerInput: dy must be rank 5, but got rank "+s.rank),w.b(5===n.rank,()=>"Error in conv3dDerInput: filter must be rank 5, but got rank "+n.rank),w.b(c===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${n.shape[3]}.`),w.b(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);const h={dy:s,filter:n},d={pad:o,strides:r,inputShape:a},f=u.a.runKernelFunc(e=>{const t=ze(a,n.shape,r,1,o);return e.conv3dDerInput(s,n,t)},h,null,z.F,d);return i?_e(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}}),wo={kernelName:z.D,inputsToSave:["x","filter"],gradFunc:(e,t,n)=>{const{dilations:r,strides:o,pad:a}=n;w.b(Ke(r),()=>`Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`);const[s,i]=t;return{x:()=>vo(s.shape,e,i,o,a),filter:()=>yo(s,e,i.shape,o,a)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Co=Object(G.a)({sin_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","sin"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.sin(t);return n([t]),r},n,null,z.oc)}}),Io={kernelName:z.G,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(Tn(Co(X(n,"float32"))),e)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Eo=Object(G.a)({sinh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","sinh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.sinh(t);return n([t]),r},n,null,z.pc)}}),$o={kernelName:z.H,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(Eo(X(n,"float32")),e)}}},Oo={kernelName:z.J,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{axis:o,exclusive:a,reverse:s}=n;return{x:()=>{const t=ot([o],r.rank);let n=ut(e,o,a,!s);return null!=t&&(n=it(n,t)),n}}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ko=Object(G.a)({depthwiseConv2dNativeBackpropFilter_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a=[1,1],s){let i=e;3===e.rank&&(i=_e(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;3===c.rank&&(c=_e(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const l={x:i,dy:c},h={strides:r,pad:o,dimRoundingMode:s,dilations:a,filterShape:n};return u.a.runKernelFunc(t=>{const u=Ve(e.shape,n,r,a,o,s,!0);return t.depthwiseConv2DDerFilter(i,c,u)},l,null,z.M,h)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ro=Object(G.a)({depthwiseConv2dNativeBackpropInput_:function(e,t,n,r,o,a=[1,1],s){let i=t,c=!1;3===t.rank&&(c=!0,i=_e(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const l={dy:i,filter:n},h={strides:r,pad:o,dimRoundingMode:s,dilations:a,inputShape:e},d=u.a.runKernelFunc(t=>{const u=Ve(e,n.shape,r,a,o,s,!0);return t.depthwiseConv2DDerInput(i,n,u)},l,null,z.N,h);return c?_e(d,[d.shape[1],d.shape[2],d.shape[3]]):d}}),So={kernelName:z.L,inputsToSave:["x","filter"],gradFunc:(e,t,n)=>{const{dilations:r,strides:o,pad:a,dimRoundingMode:s}=n,i=null==r?[1,1]:r;w.b(Ke(i),()=>`Error in gradient of depthwiseConv2dNative: dilation rates greater than 1 are not yet supported. Got dilations '${i}'`);const[u,c]=t;return w.b(4===u.rank,()=>`Error in gradient of depthwiseConv2dNative: input must be rank 4, but got rank ${u.rank}.`),w.b(4===c.rank,()=>`Error in gradient of depthwiseConv2dNative: filter must be rank 4, but got rank ${c.rank}.`),w.b(u.shape[3]===c.shape[2],()=>`Error in gradient of depthwiseConv2d: number of input channels (${u.shape[3]}) must match the inChannels dimension in filter ${c.shape[2]}.`),w.b(Ye(o,i),()=>`Error in gradient of depthwiseConv2d: Either strides or dilations must be  1. Got strides ${o} and dilations '${i}'.`),null!=s&&w.b(w.v(a),()=>`Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode ${s} but got pad ${a}.`),{x:()=>Ro(u.shape,e,c,o,a,r,s),filter:()=>ko(u,e,c.shape,o,a,r,s)}}},Ao={kernelName:z.O,inputsToSave:["x","filter"],gradFunc:(e,t,n)=>{const[r,o]=t,a={x:r,filter:o,dy:e},s={x:r,filter:o,dy:e};return{x:()=>u.a.runKernel(z.Q,a,n),filter:()=>u.a.runKernel(z.P,s,n)}}},To={kernelName:z.R,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{const t=ht(e,X(r,"float32")),a=Dt(n.shape,o);return a.length>0?_e(Cn(t,a),n.shape):t},b:()=>{let t=gt(e,X(n,"float32"));const a=Dt(r.shape,o);a.length>0&&(t=_e(Cn(t,a),r.shape));const s=wn(r);return Tn(ht(t,X(s,"float32")))}}}},_o={kernelName:z.S,outputsToSave:[!0],gradFunc:(e,t)=>{const[n]=t,r=t=>t.eluDer(e,n),o={dy:e,y:n};return{x:()=>u.a.runKernelFunc(r,o,null,z.T)}}},No={kernelName:z.V,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t,r=gt(zn(Tn(wn(n))),2/Math.sqrt(Math.PI));return{x:()=>gt(e,r)}}},Fo={kernelName:z.W,outputsToSave:[!0],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,n)}}},jo={kernelName:z.X,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,zn(n))}}},Do={kernelName:z.bb,gradFunc:e=>({x:()=>Pt(e)})},Lo={kernelName:z.cb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{const t=ht(e,X(r,"float32")),a=Dt(n.shape,o);return a.length>0?_e(Cn(t,a),n.shape):t},b:()=>{let t=gt(e,X(n,"float32"));const a=Dt(r.shape,o);a.length>0&&(t=_e(Cn(t,a),r.shape));const s=wn(r);return Tn(ht(t,X(s,"float32")))}}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bo=Object(G.a)({rsqrt_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","rsqrt"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.rsqrt(t);return n([t]),r},n,null,z.jc)}}),Po={kernelName:z.eb,inputsToSave:["x","mean","variance","scale"],gradFunc:(e,t,n)=>{const{varianceEpsilon:r}=n,[o,a,s,i]=t,u=null==i?Ot(1):i,c=Dt(a.shape,o.shape),l=[];if(1===a.rank){for(let e=0;e<o.shape.length-1;++e)l.push(o.shape[e]);l.push(1)}const h=_t(o,a),d=gt(e,u),f=Bo(Te(s,Ot(r))),p=gt(gt(gt(f,f),f),Ot(-.5));return{x:()=>1===a.rank?_e(gt(gt(e,Nt(_e(f,[1,1,1,a.shape[0]]),l)),u),o.shape):_e(gt(gt(e,f),u),o.shape),mean:()=>{let e=gt(gt(f,Ot(-1)),d);return 1===a.rank&&(e=Cn(e,c)),_e(e,a.shape)},variance:()=>{let e=gt(gt(p,h),d);return 1===a.rank&&(e=Cn(e,c)),_e(e,a.shape)},scale:()=>{const t=gt(h,f);let n=gt(e,t);return 1===a.rank&&(n=Cn(n,c)),_e(n,a.shape)},offset:()=>{let t=e;return 1===a.rank&&(t=Cn(t,c)),_e(t,a.shape)}}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mo=Object(G.a)({unsortedSegmentSum_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=Object(W.a)(e,"x","unsortedSegmentSum"),o=Object(W.a)(t,"segmentIds","unsortedSegmentSum","int32");Object(w.b)(Object(w.v)(n),()=>"numSegments must be of dtype int");const a={x:r,segmentIds:o},s={numSegments:n};return u.a.runKernelFunc((e,t)=>{const a=e.unsortedSegmentSum(r,o,n);return t([o]),a},a,null,z.Jc,s)}}),Uo={kernelName:z.fb,inputsToSave:["x","indices"],gradFunc:(e,t,n)=>{const[r,o]=t,{axis:a}=n,s=Object(w.I)(a,r.shape)[0];return{x:()=>{const t=r.shape,n=o.size,i=t.slice(0,s),u=i.length,c=t.slice(a,t.length).slice(1),l=c.length,h=Vo(0,u),d=Vo(u+1,u+1+l),f=zo([i,[n],c]),p=_e(e,f),g=_e(o,[n]),m=zo([[u],h,d]),b=it(p,m);let x=Mo(b,g,r.shape[s]);const y=at(m);return x=it(x,y),x},indices:()=>o}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vo(e,t){const n=[];for(let r=e;r<t;++r)n.push(r);return n}function zo(e){const t=[];for(let n=0;n<e.length;++n)for(let r=0;r<e[n].length;++r)t.push(e[n][r]);return t}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wo={kernelName:z.hb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t;return{a:()=>Pt(n),b:()=>Pt(r)}}},Go={kernelName:z.jb,gradFunc:e=>({x:()=>X(e,"float32")})},Xo={kernelName:z.lb,gradFunc:e=>({x:()=>Pt(e)})},qo={kernelName:z.mb,gradFunc:e=>({x:()=>Pt(e)})},Ho={kernelName:z.nb,gradFunc:e=>({x:()=>Pt(e)})},Ko={kernelName:z.tb,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,Te(n,1))}}},Yo={kernelName:z.sb,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,X(n,"float32"))}}},Qo={kernelName:z.ub,inputsToSave:[],outputsToSave:[!0],gradFunc:(e,t,n)=>{const[r]=t,{axis:o}=n;return{logits:()=>{const t=zn(r);return _t(e,gt(Cn(e,o,!0),t))}}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jo=Object(G.a)({localResponseNormalizationBackprop_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=5,o=1,a=1,s=.5){const i={x:e,y:t,dy:n},c={depthRadius:r,bias:o,alpha:a,beta:s};return u.a.runKernelFunc(i=>i.LRNGrad(n,e,t,r,o,a,s),i,null,z.pb,c)}}),Zo={kernelName:z.ob,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(e,t,n)=>{const[r,o]=t,{depthRadius:a,bias:s,alpha:i,beta:u}=n;return{x:()=>Jo(r,o,e,a,s,i,u)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ea=Object(G.a)({equal_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=Object(W.a)(e,"a","equal"),r=Object(W.a)(t,"b","equal");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.equal(n,r),o,null,z.U)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ta(e,t,n,r){return t.rank<n.rank&&(t=_e(t,nt(t.shape,r))),e.rank<n.rank&&(e=_e(e,nt(e.shape,r))),{x:()=>gt(e,X(ea(n,t),e.dtype))}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const na={kernelName:z.yb,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(e,t,n)=>{const r=n,{reductionIndices:o}=r,a=t[0],s=ta(e,t[1],a,w.I(o,a.shape));return{x:()=>s.x()}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ra=Object(G.a)({less_:function(e,t){let n=Object(W.a)(e,"a","less"),r=Object(W.a)(t,"b","less");[n,r]=Object(Ae.b)(n,r),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.less(n,r),o,null,z.qb)}}),oa={kernelName:z.Eb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t;return{a:()=>gt(e,X(dn(n,r),"float32")),b:()=>gt(e,X(ra(n,r),"float32"))}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const aa=Object(G.a)({maxPool3dBackprop_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a=[1,1,1],s,i){const c=Object(W.a)(e,"dy","maxPool3dBackprop"),l=Object(W.a)(t,"input","maxPool3dBackprop"),h=Object(W.a)(n,"output","maxPool3dBackprop");let d=c,f=l,p=h,g=!1;4===l.rank&&(g=!0,d=_e(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]]),f=_e(l,[1,l.shape[0],l.shape[1],l.shape[2],l.shape[3]]),p=_e(h,[1,h.shape[0],h.shape[1],h.shape[2],h.shape[3]])),w.b(5===d.rank,()=>"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+d.rank+"."),w.b(5===f.rank,()=>"Error in maxPool3dBackprop: input must be rank 5 but got rank "+f.rank+"."),w.b(5===p.rank,()=>"Error in maxPool3dBackprop: output must be rank 5 but got rank "+p.rank+"."),w.b(Ye(o,a),()=>`Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides ${o} and dilations '${a}'`),null!=i&&w.b(w.v(s),()=>`Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode ${i} but got pad ${s}.`);const m={dy:d,input:f,output:p},b={filterSize:r,strides:o,dilations:a,pad:s,dimRoundingMode:i},x=u.a.runKernelFunc(e=>{const t=Ue(f.shape,r,o,a,s,i);return e.maxPool3dBackprop(d,f,p,t)},m,null,z.Bb,b);return g?_e(x,[x.shape[1],x.shape[2],x.shape[3],x.shape[4]]):x}}),sa={kernelName:z.Ab,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(e,t,n)=>{const[r,o]=t,{filterSize:a,strides:s,dilations:i,pad:u,dimRoundingMode:c}=n,l=null==i?[1,1,1]:i;return{x:()=>aa(e,r,o,a,s,l,u,c)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ia=Object(G.a)({maxPoolBackprop_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a,s){const i=Object(W.a)(e,"dy","maxPoolBackprop"),c=Object(W.a)(t,"input","maxPoolBackprop"),l=Object(W.a)(n,"output","maxPoolBackprop");w.b(c.rank===i.rank,()=>`Rank of input (${c.rank}) does not match rank of dy (${i.rank})`),w.b(4===i.rank,()=>"Error in maxPoolBackprop: dy must be rank 4 but got rank "+i.rank+"."),w.b(4===c.rank,()=>"Error in maxPoolBackprop: input must be rank 4 but got rank "+c.rank+"."),null!=s&&w.b(w.v(a),()=>`Error in maxPoolBackprop: pad must be an integer when using, dimRoundingMode ${s} but got pad ${a}.`);const h={dy:i,input:c,output:l},d={filterSize:r,strides:o,pad:a,dimRoundingMode:s};return u.a.runKernelFunc(e=>{const t=Me(c.shape,r,o,1,a,s);return e.maxPoolBackprop(i,c,l,t)},h,null,z.Cb,d)}}),ua={kernelName:z.zb,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(e,t,n)=>{const[r,o]=t,{filterSize:a,strides:s,pad:i}=n;return{x:()=>ia(e,r,o,a,s,i)}}},ca={kernelName:z.Gb,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(e,t,n)=>{const r=n,{axis:o}=r,[a,s]=t,i=ta(e,s,a,w.I(o,a.shape));return{x:()=>i.x()}}},la={kernelName:z.Hb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t;return{a:()=>gt(e,X(fn(n,r),"float32")),b:()=>gt(e,X(An(n,r),"float32"))}}},ha={kernelName:z.Ib,inputsToSave:["x"],gradFunc:(e,t,n)=>{const r=t[0],{paddings:o}=n,a=o.map(e=>e[0]);return{x:()=>Vt(e,a,r.shape)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const da=Object(G.a)({floor_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","floor"),n={x:t};return u.a.runKernelFunc(e=>e.floor(t),n,null,z.bb)}}),fa={kernelName:z.Jb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{const t=Dt(n.shape,o);return t.length>0?_e(Cn(e,t),n.shape):e},b:()=>{const t=gt(e,Tn(da(ht(n,r)))),a=Dt(r.shape,o);return a.length>0?_e(Cn(t,a),r.shape):t}}}},pa={kernelName:z.Kb,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{const t=gt(e,X(r,"float32")),a=Dt(n.shape,o);return a.length>0?_e(Cn(t,a),n.shape):t},b:()=>{const t=gt(e,X(n,"float32")),a=Dt(r.shape,o);return a.length>0?_e(Cn(t,a),r.shape):t}}}},ga={kernelName:z.Lb,gradFunc:e=>({x:()=>Tn(e)})},ma={kernelName:z.Qb,inputsToSave:["indices"],gradFunc:(e,t)=>{const n=t[0];return{indices:()=>Et(n.shape,"float32")}}},ba={kernelName:z.Rb,gradFunc:e=>({x:()=>Pt(e)})},xa={kernelName:z.Sb,inputsToSave:["x"],gradFunc:(e,t,n)=>{const r=t[0],{paddings:o}=n,a=o.map(e=>e[0]);return{x:()=>Vt(e,a,r.shape)}}},ya={kernelName:z.Tb,inputsToSave:["a","b"],outputsToSave:[!0],gradFunc:(e,t)=>{const[n,r,o]=t,a=n,s=r,i=Lt(a.shape,s.shape);return{a:()=>{const t=X(s,"float32");let n=gt(e,gt(t,bt(a,_t(t,Ot(1)))));const r=Dt(a.shape,i);return r.length>0&&(n=Cn(n,r)),_e(n,a.shape)},b:()=>{const t=An(a,0),n=Bt(t,Un(a),Pt(a));let r=gt(e,gt(o,n));const u=Dt(s.shape,i);return u.length>0&&(r=Cn(r,u)),_e(r,s.shape)}}}},va={kernelName:z.Ub,inputsToSave:["x","alpha"],gradFunc:(e,t)=>{const[n,r]=t,o=An(n,0);return{x:()=>Bt(o,e,gt(e,r)),alpha:()=>{let t=Bt(o,Pt(e),gt(e,n));const a=Dt(r.shape,e.shape);return a.length>0&&(t=Cn(t,a)),_e(t,r.shape)}}}},wa={kernelName:z.Yb,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,Tn(wn(n)))}}},Ca={kernelName:z.ac,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t,r=gt(fn(n,6),Qn(n));return{x:()=>gt(e,X(r,"float32"))}}},Ia={kernelName:z.Zb,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,X(Qn(n),"float32"))}}},Ea={kernelName:z.bc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>_e(e,n.shape)}}},$a={kernelName:z.cc,inputsToSave:["images"],gradFunc:(e,t,n)=>{const[r]=t,o=t=>{const{alignCorners:o}=n;return t.resizeBilinearBackprop(e,r,o)},a={images:r};return{images:()=>u.a.runKernelFunc(o,a,null,z.dc,n)}}},Oa={kernelName:z.ec,inputsToSave:["images"],gradFunc:(e,t,n)=>{const[r]=t,o=t=>{const{alignCorners:o}=n;return t.resizeNearestNeighborBackprop(e,r,o)},a={images:r};return{images:()=>u.a.runKernelFunc(o,a,null,z.fc,n)}}},ka={kernelName:z.gc,gradFunc:(e,t,n)=>{const{dims:r}=n,o=Object(w.I)(r,e.shape);return{x:()=>Xt(e,o)}}},Ra={kernelName:z.ic,gradFunc:e=>({x:()=>Pt(e)})},Sa={kernelName:z.jc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>Tn(ht(e,gt(bt(n,1.5),2)))}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Aa=Object(G.a)({logicalNot_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","logicalNot","bool"),n={x:t};return u.a.runKernelFunc(e=>e.logicalNot(t),n,null,z.wb)}}),Ta={kernelName:z.kc,inputsToSave:["condition"],gradFunc:(e,t)=>{const[n]=t;return{condition:()=>X(Pt(n),"float32"),t:()=>gt(e,X(n,e.dtype)),e:()=>gt(e,X(Aa(n),e.dtype))}}},_a={kernelName:z.lc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>{const t=An(n,Ot(0)),r=Ot(pr),o=Ot(gr),a=gt(e,o),s=gt(gt(e,r),zn(X(n,"float32")));return Bt(t,a,s)}}}},Na={kernelName:z.mc,outputsToSave:[!0],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,gt(n,_t(Ot(1),n)))}}},Fa={kernelName:z.nc,gradFunc:e=>({x:()=>Pt(e)})};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ja=Object(G.a)({cos_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","cos"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.cos(t);return n([t]),r},n,null,z.G)}}),Da={kernelName:z.oc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(ja(X(n,"float32")),e)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const La=Object(G.a)({cosh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","cosh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.cosh(t);return n([t]),r},n,null,z.H)}}),Ba={kernelName:z.pc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(La(X(n,"float32")),e)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pa=Object(G.a)({pad_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n=0){const r=Object(W.a)(e,"x","pad");if(0===r.rank)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const o={paddings:t,constantValue:n},a={x:r};return u.a.runKernelFunc((e,o)=>(o([r]),e.pad(r,t,n)),a,null,z.Sb,o)}}),Ma={kernelName:z.qc,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{begin:o,size:a}=n,s=r.shape,[i,u]=ke(r,o,a),c=[];for(let t=0;t<e.rank;t++)c.push([i[t],s[t]-i[t]-u[t]]);return{x:()=>Pa(e,c)}}},Ua={kernelName:z.rc,outputsToSave:[!0],gradFunc:(e,t,n)=>{const[r]=t,{dim:o}=n,a=gt(e,r);return{logits:()=>_t(a,gt(Cn(a,[o],!0),r))}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Va=Object(G.a)({sigmoid_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","sigmoid"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.sigmoid(t);return n([r]),r},n,null,z.mc)}}),za={kernelName:z.sc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,Va(n))}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wa=Object(G.a)({batchToSpaceND_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=Object(W.a)(e,"x","batchToSpaceND"),o=t.reduce((e,t)=>e*t);w.b(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),w.b(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),w.b(r.shape[0]%o==0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${o}`);const a={x:r},s={blockShape:t,crops:n};return u.a.runKernelFunc(e=>e.batchToSpaceND(r,t,n),a,null,z.t,s)}}),Ga={kernelName:z.tc,gradFunc:(e,t,n)=>{const{blockShape:r,paddings:o}=n;return{x:()=>Wa(e,r,o)}}},Xa={kernelName:z.uc,gradFunc:(e,t,n)=>{const{axis:r}=n;return{x:()=>Be(e,r)}}},qa={kernelName:z.vc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,gt(vn(X(n,"float32")),2))}}},Ha={kernelName:z.wc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(e,gt(X(n,"float32"),2))}}},Ka={kernelName:z.xc,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Ot(2);return{a:()=>gt(e,gt(o,_t(n,r))),b:()=>gt(e,gt(o,_t(r,n)))}}},Ya={kernelName:z.yc,gradFunc:e=>({x:()=>Pt(e)})},Qa={kernelName:z.Ac,inputsToSave:["a","b"],gradFunc:(e,t)=>{const[n,r]=t,o=Lt(n.shape,r.shape);return{a:()=>{let t=e;const r=Dt(n.shape,o);return r.length>0&&(t=Cn(t,r)),_e(t,n.shape)},b:()=>{let t=e;const n=Dt(r.shape,o);return n.length>0&&(t=Cn(t,n)),_e(Tn(t),r.shape)}}}},Ja={kernelName:z.Bc,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,o=r.shape.slice(),{axis:a}=n;Object(w.I)(a,r.shape).forEach(e=>{o[e]=1});const s=_e(e,o),i=gt(s,jn(r.shape,"float32"));return{x:()=>i}}},Za={kernelName:z.Cc,inputsToSave:["x"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>ht(e,wn(ja(n)))}}},es={kernelName:z.Dc,outputsToSave:[!0],gradFunc:(e,t)=>{const[n]=t;return{x:()=>gt(_t(Ot(1),wn(n)),e)}}},ts={kernelName:z.Ec,inputsToSave:["x"],gradFunc:(e,t,n)=>{const[r]=t,{reps:o}=n;return{x:()=>{let t=Pt(r);if(1===r.rank)for(let n=0;n<o[0];++n)t=Te(t,Vt(e,[n*r.shape[0]],[r.shape[0]]));else if(2===r.rank)for(let n=0;n<o[0];++n)for(let a=0;a<o[1];++a)t=Te(t,Vt(e,[n*r.shape[0],a*r.shape[1]],[r.shape[0],r.shape[1]]));else if(3===r.rank)for(let n=0;n<o[0];++n)for(let a=0;a<o[1];++a)for(let s=0;s<o[2];++s)t=Te(t,Vt(e,[n*r.shape[0],a*r.shape[1],s*r.shape[2]],[r.shape[0],r.shape[1],r.shape[2]]));else{if(4!==r.rank)throw new Error("Gradient for tile operation is not implemented for rank-"+r.rank+" tensors yet.");for(let n=0;n<o[0];++n)for(let a=0;a<o[1];++a)for(let s=0;s<o[2];++s)for(let i=0;i<o[3];++i)t=Te(t,Vt(e,[n*r.shape[0],a*r.shape[1],s*r.shape[2],i*r.shape[3]],[r.shape[0],r.shape[1],r.shape[2],r.shape[3]]))}return t}}}},ns={kernelName:z.Gc,gradFunc:(e,t,n)=>{const r=n,{perm:o}=r,a=at(o);return{x:()=>it(e,a)}}},rs={kernelName:z.Ic,gradFunc:(e,t,n)=>{const r=n,{axis:o}=r;return{value:()=>mn(e,o)}}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const os=Object(G.a)({gather_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n=0){const r=Object(W.a)(e,"x","gather"),o=Object(W.a)(t,"indices","gather","int32"),a={x:r,indices:o},s={axis:n};return u.a.runKernelFunc((e,t)=>{const a=Object(w.I)(n,r.shape)[0],s=Fr(r,o,a),i=e.gather(r,_e(o,[o.size]),a);return t([r,o]),_e(i,s.outputShape)},a,null,z.fb,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const as=Object(G.a)({maximum_:function(e,t){let n=Object(W.a)(e,"a","maximum"),r=Object(W.a)(t,"b","maximum");[n,r]=Object(Ae.b)(n,r),"bool"===n.dtype&&(n=X(n,"int32"),r=X(r,"int32")),Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.maximum(n,r);return t([n,r]),o},o,null,z.Eb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const ss=[Wr,Gr,Xr,qr,Hr,Kr,Yr,Qr,Jr,Zr,eo,to,ro,ao,so,uo,co,lo,ho,fo,po,xo,bo,wo,Io,$o,Oo,So,Ao,To,_o,No,Fo,jo,Lo,Do,Po,Uo,Wo,Go,Xo,qo,Ho,Ko,Yo,Qo,Zo,na,na,oa,sa,ua,ca,la,ha,fa,pa,ga,ma,ba,xa,xa,ya,va,wa,Ca,Ia,Ea,$a,Oa,ka,Ra,Sa,Ta,_a,Na,Fa,Da,Ba,Ma,Ua,za,Ga,Ga,Xa,Xa,qa,Ka,Ha,Ya,Qa,Ja,Za,es,ts,ns,rs,{kernelName:z.Jc,inputsToSave:["segmentIds"],gradFunc:(e,t)=>{const[n]=t;return{x:()=>function(e,t){const n=as(t,Pt(t)),r=os(e,n);let o=dn(t,Ot(0,"int32"));const a=r.rank-o.rank;for(let e=0;e<a;++e)o=gn(o,e+1);o=pn(o,jn(r.shape,"bool"));const s=Pt(r);return Bt(o,r,s)}(e,n)}}},{kernelName:z.Kc,gradFunc:e=>({x:()=>Pt(e)})}];
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */for(const e of ss)Object(Xn.d)(e);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.abs=function(){return this.throwIfDisposed(),xn(this)};const is=Object(G.a)({acos_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","acos"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.acos(t);return n([t]),r},n,null,z.b)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.acos=function(){return this.throwIfDisposed(),is(this)};const us=Object(G.a)({acosh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","acosh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.acosh(t);return n([t]),r},n,null,z.c)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.acosh=function(){return this.throwIfDisposed(),us(this)};const cs=Object(G.a)({mod_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=Object(W.a)(e,"a","mod"),r=Object(W.a)(t,"b","mod");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.mod(n,r);return t([n,r]),o},o,null,z.Jb)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ls=Object(G.a)({addStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","addStrict"),r=Object(W.a)(t,"b","addStrict");return w.e(n.shape,r.shape,"Error in addStrict: "),Te(n,r)}}),hs=Object(G.a)({divStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","div"),r=Object(W.a)(t,"b","div");return w.e(n.shape,r.shape,"Error in divideStrict: "),ht(n,r)}}),ds=Object(G.a)({maximumStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","maximumStrict"),r=Object(W.a)(t,"b","maximumStrict");return w.e(n.shape,r.shape,"Error in maximumStrict: "),as(n,r)}}),fs=Object(G.a)({minimumStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","minimumStrict"),r=Object(W.a)(t,"b","minimumStrict");return w.e(n.shape,r.shape,"Error in minimumStrict: "),Mn(n,r)}}),ps=Object(G.a)({modStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","modStrict"),r=Object(W.a)(t,"b","modStrict");return w.e(n.shape,r.shape,"Error in modStrict: "),cs(n,r)}}),gs=Object(G.a)({mulStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","mul"),r=Object(W.a)(t,"b","mul");return w.e(n.shape,r.shape,"Error in multiplyStrict: "),gt(n,r)}}),ms=Object(G.a)({powStrict_:function(e,t){return En("strict variants of ops have been deprecated and will be removed in future"),w.e(e.shape,t.shape,"Error in powStrict: "),bt(e,t)}}),bs=Object(G.a)({squaredDifferenceStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","squaredDifferenceStrict"),r=Object(W.a)(t,"b","squaredDifferenceStrict");return w.e(n.shape,r.shape,"Error in squaredDifferenceStrict: "),Vn(n,r)}}),xs=Object(G.a)({subStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","subStrict"),r=Object(W.a)(t,"b","subStrict");return w.e(n.shape,r.shape,"Error in subStrict: "),_t(n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.addStrict=function(e){return this.throwIfDisposed(),ls(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.add=function(e){return this.throwIfDisposed(),Te(this,e)};const ys=Object(G.a)({all_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=null,n=!1){let r=Object(W.a)(e,"x","all","bool");const o={x:r},a={axis:t,keepDims:n};return u.a.runKernelFunc(e=>{const o=Object(w.I)(t,r.shape);let a=o;const s=ot(a,r.rank);null!=s&&(r=it(r,s),a=st(a.length,r.rank));const i=e.all(r,a);if(n){const e=nt(i.shape,o);return _e(i,e)}return i},o,null,z.f,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.all=function(e,t){return this.throwIfDisposed(),ys(this,e,t)};const vs=Object(G.a)({any_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=null,n=!1){let r=Object(W.a)(e,"x","any","bool");const o={x:r},a={axis:t,keepDims:n};return u.a.runKernelFunc(e=>{const o=Object(w.I)(t,r.shape);let a=o;const s=ot(a,r.rank);null!=s&&(r=it(r,s),a=st(a.length,r.rank));const i=e.any(r,a);if(n){const e=nt(i.shape,o);return _e(i,e)}return i},o,null,z.g,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.any=function(e,t){return this.throwIfDisposed(),vs(this,e,t)};const ws=Object(G.a)({argMax_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=0){let n=Object(W.a)(e,"x","argMax");const r={x:n},o={axis:t};return u.a.runKernelFunc((e,r)=>{r([n]);let o=w.I(t,n.shape);const a=ot(o,n.rank);return null!=a&&(n=it(n,a),o=st(o.length,n.rank)),e.argMax(n,o[0])},r,null,z.h,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.argMax=function(e){return this.throwIfDisposed(),ws(this,e)};const Cs=Object(G.a)({argMin_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=0){let n=Object(W.a)(e,"x","argMin");const r={x:n},o={axis:t};return u.a.runKernelFunc((e,r)=>{r([n]),null==t&&(t=0);let o=w.I(t,n.shape);const a=ot(o,n.rank);return null!=a&&(n=it(n,a),o=st(o.length,n.rank)),e.argMin(n,o[0])},r,null,z.i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.argMin=function(e){return this.throwIfDisposed(),Cs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.asScalar=function(){return this.throwIfDisposed(),Object(w.b)(1===this.size,()=>"The array must have only 1 element."),_e(this,[])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.asType=function(e){return this.throwIfDisposed(),X(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.as1D=function(){return this.throwIfDisposed(),_e(this,[this.size])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.as2D=function(e,t){return this.throwIfDisposed(),_e(this,[e,t])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.as3D=function(e,t,n){return this.throwIfDisposed(),_e(this,[e,t,n])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.as4D=function(e,t,n,r){return this.throwIfDisposed(),_e(this,[e,t,n,r])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.as5D=function(e,t,n,r,o){return this.throwIfDisposed(),_e(this,[e,t,n,r,o])};const Is=Object(G.a)({asin_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","asin"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.asin(t);return n([t]),r},n,null,z.j)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.asin=function(){return this.throwIfDisposed(),Is(this)};const Es=Object(G.a)({asinh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","asinh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.asinh(t);return n([t]),r},n,null,z.k)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.asinh=function(){return this.throwIfDisposed(),Es(this)};const $s=Object(G.a)({atan_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","atan"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.atan(t);return n([t]),r},n,null,z.l)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.atan=function(){return this.throwIfDisposed(),$s(this)};const Os=Object(G.a)({atan2_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=Object(W.a)(e,"a","atan2"),r=Object(W.a)(t,"b","atan2");[n,r]=Object(Ae.b)(n,r);const o={a:n,b:r};return u.a.runKernelFunc((e,t)=>{const o=e.atan2(n,r);return t([n,r]),o},o,null,z.m)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.atan2=function(e){return this.throwIfDisposed(),Os(this,e)};const ks=Object(G.a)({atanh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","atanh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.atanh(t);return n([t]),r},n,null,z.n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.atanh=function(){return this.throwIfDisposed(),ks(this)};const Rs=Object(G.a)({avgPool_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o){const a=Object(W.a)(e,"x","avgPool","float32");w.b(Ye(n,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`);let s=a,i=!1;3===a.rank&&(i=!0,s=_e(a,[1,a.shape[0],a.shape[1],a.shape[2]])),w.b(4===s.rank,()=>`Error in avgPool: x must be rank 4 but got rank ${s.rank}.`),null!=o&&w.b(w.v(r),()=>`Error in avgPool: pad must be an integer when using, dimRoundingMode ${o} but got pad ${r}.`);const c={x:s},l={filterSize:t,strides:n,pad:r,dimRoundingMode:o};let h=u.a.runKernelFunc((e,a)=>{const i=Me(s.shape,t,n,1,r,o);return a([s]),1===i.filterWidth&&1===i.filterHeight&&w.a(i.inShape,i.outShape)?s.clone():e.avgPool(s,i)},c,null,z.o,l);return h=X(h,a.dtype),i?_e(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.avgPool=function(e,t,n,r){return this.throwIfDisposed(),Rs(this,e,t,n,r)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.batchToSpaceND=function(e,t){return this.throwIfDisposed(),Wa(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.batchNorm=function(e,t,n,r,o){return this.throwIfDisposed(),Fe(this,e,t,n,r,o)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.broadcastTo=function(e){return this.throwIfDisposed(),Ft(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.cast=function(e){return this.throwIfDisposed(),X(this,e)};const Ss=Object(G.a)({ceil_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","ceil"),n={x:t};return u.a.runKernelFunc(e=>e.ceil(t),n,null,z.w)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.ceil=function(){return this.throwIfDisposed(),Ss(this)};const As=Object(G.a)({clipByValue_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=Object(W.a)(e,"x","clipByValue");w.b(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`);const o={x:r},a={clipValueMin:t,clipValueMax:n};return u.a.runKernelFunc((e,o)=>{const a=e.clip(r,t,n);return o([r]),a},o,null,z.x,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.clipByValue=function(e,t){return this.throwIfDisposed(),As(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.concat=function(e,t){return this.throwIfDisposed(),e instanceof U.a&&(e=[e]),Be([this,...e],t)};const Ts=Object(G.a)({conv1d_:function(e,t,n,r,o="NWC",a=1,s){const i=Object(W.a)(e,"x","conv1d"),u=Object(W.a)(t,"filter","conv1d");let c=i,l=!1;2===i.rank&&(l=!0,c=_e(i,[1,i.shape[0],i.shape[1]])),w.b(3===c.rank,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),w.b(3===u.rank,()=>"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."),null!=s&&w.b(w.v(r),()=>`Error in conv1d: pad must be an integer when using, dimRoundingMode ${s} but got pad ${r}.`),w.b(c.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${u.shape[1]}.`),w.b(Ye(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),w.b("NWC"===o,()=>`Error in conv1d: got dataFormat of ${o} but only NWC is currently supported.`);const h=_e(u,[1,u.shape[0],u.shape[1],u.shape[2]]),d=_e(c,[c.shape[0],1,c.shape[1],c.shape[2]]),f=Je(d,h,[1,n],r,"NHWC",[1,a],s);return _e(f,l?[f.shape[2],f.shape[3]]:[f.shape[0],f.shape[2],f.shape[3]])}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.conv1d=function(e,t,n,r,o,a){return this.throwIfDisposed(),Ts(this,e,t,n,r,o,a)};const _s=Object(G.a)({conv2dTranspose_:function(e,t,n,r,o,a){const s=Object(W.a)(e,"x","conv2dTranspose"),i=Object(W.a)(t,"filter","conv2dTranspose");return mo(n,s,i,r,o,"NHWC",a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.conv2dTranspose=function(e,t,n,r,o){return this.throwIfDisposed(),_s(this,e,t,n,r,o)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.conv2d=function(e,t,n,r,o,a){return this.throwIfDisposed(),Je(this,e,t,n,r,o,a)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.cos=function(){return this.throwIfDisposed(),ja(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.cosh=function(){return this.throwIfDisposed(),La(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.cumsum=function(e,t,n){return this.throwIfDisposed(),ut(this,e,t,n)};const Ns=Object(G.a)({depthToSpace_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n="NHWC"){const r=Object(W.a)(e,"x","depthToSpace"),o="NHWC"===n?r.shape[1]:r.shape[2],a="NHWC"===n?r.shape[2]:r.shape[3],s="NHWC"===n?r.shape[3]:r.shape[1];w.b(o*t>=0,()=>`Negative dimension size caused by overflow when multiplying\n    ${o} and ${t}  for depthToSpace with input shape\n    ${r.shape}`),w.b(a*t>=0,()=>`Negative dimension size caused by overflow when multiplying\n    ${a} and ${t} for depthToSpace with input shape\n        ${r.shape}`),w.b(s%(t*t)==0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${s} for depthToSpace with input shape ${r.shape}`);const i={x:r},c={blockSize:t,dataFormat:n};return u.a.runKernelFunc(e=>e.depthToSpace(r,t,n),i,null,z.K,c)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.depthToSpace=function(e,t){return this.throwIfDisposed(),Ns(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.depthwiseConv2D=function(e,t,n,r,o,a){return En("depthwiseConv2D is deprecated, use depthwiseConv2d instead"),this.throwIfDisposed(),ct(this,e,t,n,r,o,a)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.depthwiseConv2d=function(e,t,n,r,o,a){return this.throwIfDisposed(),ct(this,e,t,n,r,o,a)};const Fs=Object(G.a)({dilation2d_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o=[1,1],a="NHWC"){const s=Object(W.a)(e,"x","dilation2d"),i=Object(W.a)(t,"filter","dilation2d");w.b(3===s.rank||4===s.rank,()=>"Error in dilation2d: input must be rank 3 or 4, but got rank "+s.rank+"."),w.b(3===i.rank,()=>"Error in dilation2d: filter must be rank 3, but got rank "+i.rank+"."),w.b("NHWC"===a,()=>"Error in dilation2d: Only NHWC is currently supported, but got dataFormat of "+a);let c=s,l=!1;3===s.rank&&(c=_e(s,[1,s.shape[0],s.shape[1],s.shape[2]]),l=!0);const h={x:c,filter:i},d={strides:n,pad:r,dilations:o},f=u.a.runKernel(z.O,h,d);return l?_e(f,[f.shape[1],f.shape[2],f.shape[3]]):f}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.dilation2d=function(e,t,n,r,o){return this.throwIfDisposed(),Fs(this,e,t,n,r,o)};const js=Object(G.a)({divNoNan_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=Object(W.a)(e,"a","div"),r=Object(W.a)(t,"b","div");[n,r]=Object(Ae.b)(n,r);const o=ht(n,r),a=Pt(o),s=ea(r,a);return Bt(s,a,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.divNoNan=function(e){return this.throwIfDisposed(),js(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.divStrict=function(e){return this.throwIfDisposed(),hs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.div=function(e){return this.throwIfDisposed(),ht(this,e)};const Ds=Object(G.a)({dot_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(W.a)(e,"t1","dot"),r=Object(W.a)(t,"t2","dot");w.b(!(1!==n.rank&&2!==n.rank||1!==r.rank&&2!==r.rank),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);const o=1===n.rank?n.size:n.shape[1],a=1===r.rank?r.size:r.shape[0];if(w.b(o===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${o} and ${a}.`),1===n.rank&&1===r.rank){const e=_e(n,[1,-1]),t=_e(r,[-1,1]),o=dt(e,t);return _e(o,[])}if(1===n.rank&&2===r.rank){const e=_e(n,[1,-1]),t=_e(r,[r.shape[0],r.shape[1]]),o=dt(e,t);return _e(o,[o.size])}if(2===n.rank&&1===r.rank){const e=_e(r,[-1,1]),t=dt(n,e);return _e(t,[t.size])}{const e=_e(r,[r.shape[0],r.shape[1]]);return dt(n,e)}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.dot=function(e){return this.throwIfDisposed(),Ds(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.elu=function(){return this.throwIfDisposed(),Hn(this)};const Ls=Object(G.a)({equalStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","equalStrict"),r=Object(W.a)(t,"b","equalStrict");return Object(w.e)(n.shape,r.shape,"Error in equalStrict: "),ea(n,r)}}),Bs=Object(G.a)({greaterEqualStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","greaterEqualStrict"),r=Object(W.a)(t,"b","greaterEqualStrict");return Object(w.e)(n.shape,r.shape,"Error in greaterEqualStrict: "),dn(n,r)}}),Ps=Object(G.a)({greaterStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","greaterStrict"),r=Object(W.a)(t,"b","greaterStrict");return Object(w.e)(n.shape,r.shape,"Error in greaterStrict: "),An(n,r)}}),Ms=Object(G.a)({lessEqualStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","lessEqualStrict"),r=Object(W.a)(t,"b","lessEqualStrict");return Object(w.e)(n.shape,r.shape,"Error in lessEqualStrict: "),fn(n,r)}}),Us=Object(G.a)({lessStrict_:function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","lessStrict"),r=Object(W.a)(t,"b","lessStrict");return Object(w.e)(n.shape,r.shape,"Error in lessStrict: "),ra(n,r)}}),Vs=Object(G.a)({notEqualStrict_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){En("strict variants of ops have been deprecated and will be removed in future");const n=Object(W.a)(e,"a","notEqualStrict"),r=Object(W.a)(t,"b","notEqualStrict");return Object(w.e)(n.shape,r.shape,"Error in notEqualStrict: "),Ln(n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.equalStrict=function(e){return this.throwIfDisposed(),Ls(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.equal=function(e){return this.throwIfDisposed(),ea(this,e)};const zs=Object(G.a)({erf_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){let t=Object(W.a)(e,"x","erf");w.b("int32"===t.dtype||"float32"===t.dtype,()=>"Input dtype must be `int32` or `float32`."),"int32"===t.dtype&&(t=X(t,"float32"));const n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.erf(t);return n([t]),r},n,null,z.V)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.erf=function(){return this.throwIfDisposed(),zs(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.exp=function(){return this.throwIfDisposed(),zn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.expandDims=function(e){return this.throwIfDisposed(),gn(this,e)};const Ws=Object(G.a)({expm1_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","expm1"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.expm1(t);return n([t]),r},n,null,z.X)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.expm1=function(){return this.throwIfDisposed(),Ws(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.fft=function(){return this.throwIfDisposed(),zt(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.flatten=function(){return this.throwIfDisposed(),_e(this,[this.size])},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.floor=function(){return this.throwIfDisposed(),da(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.floorDiv=function(e){return this.throwIfDisposed(),lt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.gather=function(e,t){return this.throwIfDisposed(),os(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.greaterEqualStrict=function(e){return this.throwIfDisposed(),Bs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.greaterEqual=function(e){return this.throwIfDisposed(),dn(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.greaterStrict=function(e){return this.throwIfDisposed(),Ps(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.greater=function(e){return this.throwIfDisposed(),An(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.ifft=function(){return this.throwIfDisposed(),Gt(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.irfft=function(){return this.throwIfDisposed(),qt(this)};const Gs=Object(G.a)({isFinite_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","isFinite"),n={x:t};return u.a.runKernelFunc(e=>e.isFinite(t),n,null,z.lb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.isFinite=function(){return this.throwIfDisposed(),Gs(this)};const Xs=Object(G.a)({isInf_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","isInf"),n={x:t};return u.a.runKernelFunc(e=>e.isInf(t),n,null,z.mb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.isInf=function(){return this.throwIfDisposed(),Xs(this)};const qs=Object(G.a)({isNaN_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","isNaN"),n={x:t};return u.a.runKernelFunc(e=>e.isNaN(t),n,null,z.nb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.isNaN=function(){return this.throwIfDisposed(),qs(this)};const Hs=Object(G.a)({leakyRelu_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=.2){const n=Object(W.a)(e,"x","leakyRelu");return as(gt(Ot(t),n),n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.leakyRelu=function(e){return this.throwIfDisposed(),Hs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.lessEqualStrict=function(e){return this.throwIfDisposed(),Ms(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.lessEqual=function(e){return this.throwIfDisposed(),fn(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.lessStrict=function(e){return this.throwIfDisposed(),Us(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.less=function(e){return this.throwIfDisposed(),ra(this,e)};const Ks=Object(G.a)({localResponseNormalization_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=5,n=1,r=1,o=.5){const a=Object(W.a)(e,"x","localResponseNormalization");w.b(4===a.rank||3===a.rank,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank ${a.rank}.`),w.b(w.v(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let s=a,i=!1;3===a.rank&&(i=!0,s=_e(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const c={x:s},l={depthRadius:t,bias:n,alpha:r,beta:o},h=u.a.runKernelFunc((e,a)=>{const i=e.localResponseNormalization4D(s,t,n,r,o);return a([s,i]),i},c,null,z.ob,l);return i?_e(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.localResponseNormalization=function(e,t,n,r){return this.throwIfDisposed(),Ks(this,e,t,n,r)};const Ys=Object(G.a)({softplus_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","softplus"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.softplus(t);return n([t]),r},n,null,z.sc)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qs=Object(G.a)({logSigmoid_:function(e){const t=Object(W.a)(e,"x","logSigmoid");return Fn(e=>({value:Tn(Ys(Tn(e))),gradFunc:t=>gt(t,Va(Tn(e)))}))(t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.logSigmoid=function(){return this.throwIfDisposed(),Qs(this)};const Js=Object(G.a)({logSoftmax_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=-1){const n=Object(W.a)(e,"logits","logSoftmax");if(-1===t&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);const r={logits:n},o={axis:t};return u.a.runKernelFunc((n,r)=>{const o=ft(e,t,!0),a=_t(e,o),s=_t(X(a,"float32"),Un(Cn(zn(a),t,!0)));return r([s]),s},r,null,z.ub,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.logSoftmax=function(e){return this.throwIfDisposed(),Js(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.logSumExp=function(e,t){return this.throwIfDisposed(),Gn(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.log=function(){return this.throwIfDisposed(),Un(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.log1p=function(){return this.throwIfDisposed(),Wn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.logicalAnd=function(e){return this.throwIfDisposed(),pn(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.logicalNot=function(){return this.throwIfDisposed(),Aa(this)};const Zs=Object(G.a)({logicalOr_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(W.a)(e,"a","logicalOr","bool"),r=Object(W.a)(t,"b","logicalOr","bool");Lt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernelFunc(e=>e.logicalOr(n,r),o,null,z.xb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.logicalOr=function(e){return this.throwIfDisposed(),Zs(this,e)};const ei=Object(G.a)({logicalXor_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(W.a)(e,"a","logicalXor","bool"),r=Object(W.a)(t,"b","logicalXor","bool");return Lt(n.shape,r.shape),pn(Zs(e,t),Aa(pn(e,t)))}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.logicalXor=function(e){return this.throwIfDisposed(),ei(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.matMul=function(e,t,n){return this.throwIfDisposed(),dt(this,e,t,n)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.maxPool=function(e,t,n,r){return this.throwIfDisposed(),pt(this,e,t,n,r)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.max=function(e,t){return this.throwIfDisposed(),ft(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.maximumStrict=function(e){return this.throwIfDisposed(),ds(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.maximum=function(e){return this.throwIfDisposed(),as(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.mean=function(e,t){return this.throwIfDisposed(),Dn(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.min=function(e,t){return this.throwIfDisposed(),yn(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.minimumStrict=function(e){return this.throwIfDisposed(),fs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.minimum=function(e){return this.throwIfDisposed(),Mn(this,e)};const ti=Object(G.a)({mirrorPad_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){w.b("reflect"===n||"symmetric"===n,()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const r=Object(W.a)(e,"x","mirrorPad");if(0===r.rank)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");w.b(t.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${t.length}.`);const o="reflect"===n?1:0;for(let e=0;e<r.rank;e++)w.b(2===t[e].length,()=>"Invalid number of paddings. Must be length of 2 each."),w.b(t[e][0]>=0&&t[e][0]<=r.shape[e]-o&&t[e][1]>=0&&t[e][1]<=r.shape[e]-o,()=>`Padding in dimension ${e} cannot be greater than or equal to ${r.shape[e]-o} or less than 0 for input of shape `+r.shape);const a={paddings:t,mode:n},s={x:r};return u.a.runKernel(z.Ib,s,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.mirrorPad=function(e,t){return this.throwIfDisposed(),ti(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.modStrict=function(e){return this.throwIfDisposed(),ps(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.mod=function(e){return this.throwIfDisposed(),cs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.mulStrict=function(e){return this.throwIfDisposed(),gs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.mul=function(e){return this.throwIfDisposed(),gt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.neg=function(){return this.throwIfDisposed(),Tn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.norm=function(e,t,n){return this.throwIfDisposed(),In(this,e,t,n)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.notEqualStrict=function(e){return this.throwIfDisposed(),Vs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.notEqual=function(e){return this.throwIfDisposed(),Ln(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.oneHot=function(e,t=1,n=0){return this.throwIfDisposed(),mt(this,e,t,n)};const ni=Object(G.a)({onesLike_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","onesLike"),n={x:t};return u.a.runKernelFunc((e,n)=>{if("complex64"===t.dtype){const e=ni(Ut(t)),n=Pt(Mt(t));return Object(It.a)(e,n)}return e.onesLike(t)},n,null,z.Rb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.onesLike=function(){return this.throwIfDisposed(),ni(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.pad=function(e,t){return this.throwIfDisposed(),Pa(this,e,t)};const ri=Object(G.a)({pool_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o,a){null==o&&(o=[1,1]),null==a&&(a=1),0===r&&(r="valid");const s=Object(W.a)(e,"x","maxPool");let i=s,u=!1;3===s.rank&&(u=!0,i=_e(s,[1,s.shape[0],s.shape[1],s.shape[2]])),w.b(Ye(a,o),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${o}'`);const c=Me(i.shape,t,a,o,r),l=[c.dilationHeight,c.dilationWidth];let h;h="same"===r?function(e,t){const n=e.map((e,n)=>e+(e-1)*(t[n]-1)).map(e=>e-1),r=n.map(e=>Math.floor(e/2)),o=n.map((e,t)=>e-r[t]);return n.map((e,t)=>[r[t],o[t]])}([c.filterHeight,c.filterWidth],l):[[0,0],[0,0]];const d=1===l[0]&&1===l[1],[f,p]=function(e,t,n){const r=n.map(e=>e[0]),o=n.map(e=>e[1]),a=e.concat(r,o),s=t.map((e,t)=>(e-a[t]%e)%e),i=o.map((e,t)=>e+s[t]),u=t.map((e,t)=>[r[t],i[t]]),c=t.map((e,t)=>[0,s[t]]);return[u,c]}([c.inHeight,c.inWidth],l,h),g=d?r:"valid",m=d?i:io(i,l,f),b=("avg"===n?()=>Rs(m,t,a,g):()=>pt(m,t,a,g))(),x=d?b:Wa(b,l,p);return u?_e(x,[x.shape[1],x.shape[2],x.shape[3]]):x}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.pool=function(e,t,n,r,o){return this.throwIfDisposed(),ri(this,e,t,n,r,o)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.powStrict=function(e){return this.throwIfDisposed(),ms(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.pow=function(e){return this.throwIfDisposed(),bt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.prelu=function(e){return this.throwIfDisposed(),Kn(this,e)};const oi=Object(G.a)({prod_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=null,n=!1){let r=Object(W.a)(e,"x","prod");"bool"===r.dtype&&(r=X(r,"int32"));const o={x:r},a={axis:t,keepDims:n};return u.a.runKernelFunc(e=>{const o=Object(w.I)(t,r.shape),a=ot(o,r.rank);let s=o,i=r;null!=a&&(i=it(r,a),s=st(s.length,r.rank));let u=e.prod(i,s);if(n){const e=nt(u.shape,o);u=_e(u,e)}return u},o,null,z.Vb,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.prod=function(e,t){return this.throwIfDisposed(),oi(this,e,t)};const ai=Object(G.a)({reciprocal_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","reciprocal"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.reciprocal(t);return n([t]),r},n,null,z.Yb)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.reciprocal=function(){return this.throwIfDisposed(),ai(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.relu=function(){return this.throwIfDisposed(),Pn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.relu6=function(){return this.throwIfDisposed(),Yn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.reshapeAs=function(e){return this.throwIfDisposed(),_e(this,e.shape)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.reshape=function(e){return this.throwIfDisposed(),_e(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.resizeBilinear=function(e,t){return this.throwIfDisposed(),ln(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.resizeNearestNeighbor=function(e,t){return this.throwIfDisposed(),hn(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.reverse=function(e){return this.throwIfDisposed(),Xt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.rfft=function(){return this.throwIfDisposed(),Wt(this)};const si=Object(G.a)({round_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","round"),n={x:t};return u.a.runKernelFunc(e=>e.round(t),n,null,z.ic)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.round=function(){return this.throwIfDisposed(),si(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.rsqrt=function(){return this.throwIfDisposed(),Bo(this)};const ii=Object(G.a)({selu_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","selu"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.selu(t);return n([t]),r},n,null,z.lc)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.selu=function(){return this.throwIfDisposed(),ii(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.separableConv2d=function(e,t,n,r,o,a){return this.throwIfDisposed(),kt(this,e,t,n,r,o,a)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sigmoid=function(){return this.throwIfDisposed(),Va(this)};const ui=Object(G.a)({sign_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","sign"),n={x:t};return u.a.runKernelFunc(e=>e.sign(t),n,null,z.nc)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.sign=function(){return this.throwIfDisposed(),ui(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sin=function(){return this.throwIfDisposed(),Co(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sinh=function(){return this.throwIfDisposed(),Eo(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.slice=function(e,t){return this.throwIfDisposed(),Vt(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.softmax=function(e){return this.throwIfDisposed(),Rt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.softplus=function(){return this.throwIfDisposed(),Ys(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.spaceToBatchND=function(e,t){return this.throwIfDisposed(),io(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.split=function(e,t){return this.throwIfDisposed(),At(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sqrt=function(){return this.throwIfDisposed(),vn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.square=function(){return this.throwIfDisposed(),wn(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.squaredDifference=function(e){return this.throwIfDisposed(),Vn(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.squaredDifferenceStrict=function(e){return this.throwIfDisposed(),bs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.squeeze=function(e){return this.throwIfDisposed(),Tt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.stack=function(e,t){this.throwIfDisposed();const n=e instanceof U.a?[this,e]:[this,...e];return mn(n,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.step=function(e){return this.throwIfDisposed(),Qn(this,e)};const ci=Object(G.a)({stridedSlice_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,o=0,a=0,s=0,i=0,c=0){let l=Object(W.a)(e,"x","stridedSlice");const h={x:l},d={begin:t,end:n,strides:r,beginMask:o,endMask:a,ellipsisMask:s,newAxisMask:i,shrinkAxisMask:c};return u.a.runKernelFunc(e=>{null==r&&(r=new Array(t.length));const u=pe(s);if(u.length>1)throw new Error("Multiple ellipses in slice is not allowed.");if(0!==s&&0!==i)throw new Error("Using both ellipsisMask and newAxisMask is not yet supported.");if(0!==s&&0!==c)throw new Error("Using both ellipsisMask and shrinkAxisMask is not yet supported.");const h=l.rank-t.length,d=pe(i),f=l.shape.slice();d.forEach(e=>{t[e]=0,n[e]=1,f.splice(e,0,1)}),l=_e(l,f);const{begin:p,end:g,strides:m}=ye(l.shape,u,h,t,n,r,o,a,s);t=p,n=g,r=m;const b=pe(c);b.forEach(e=>{n[e]=t[e]+1,r[e]=1});const x=ge(t,n,r),y=x.filter((e,t)=>-1===b.indexOf(t));if(r.every(e=>1===e))return _e(Vt(l,t,x),y);const v=e.stridedSlice(l,t,n,r);return _e(v,y)},h,null,z.zc,d)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.stridedSlice=function(e,t,n,r,o,a,s,i){return this.throwIfDisposed(),ci(this,e,t,n,r,o,a,s,i)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.subStrict=function(e){return this.throwIfDisposed(),xs(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sub=function(e){return this.throwIfDisposed(),_t(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.sum=function(e,t){return this.throwIfDisposed(),Cn(this,e,t)};const li=Object(G.a)({tan_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","tan"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.tan(t);return n([t]),r},n,null,z.Cc)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.tan=function(){return this.throwIfDisposed(),li(this)};const hi=Object(G.a)({tanh_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t=Object(W.a)(e,"x","tanh"),n={x:t};return u.a.runKernelFunc((e,n)=>{const r=e.tanh(t);return n([r]),r},n,null,z.Dc)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.tanh=function(){return this.throwIfDisposed(),hi(this)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.tile=function(e){return this.throwIfDisposed(),Nt(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.toBool=function(){return this.throwIfDisposed(),X(this,"bool")},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.toFloat=function(){return this.throwIfDisposed(),X(this,"float32")},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.toInt=function(){return this.throwIfDisposed(),X(this,"int32")};const di=Object(G.a)({topk_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=1,n=!0){const r=Object(W.a)(e,"x","topk");if(0===r.rank)throw new Error("topk() expects the input to be of rank 1 or higher");const o=r.shape[r.shape.length-1];if(t>o)throw new Error(`'k' passed to topk() must be <= the last dimension (${o}) but got `+t);const a={x:r},s={k:t,sorted:n},[i,c]=u.a.runKernelFunc(e=>e.topk(r,t,n),a,null,z.Fc,s);return{values:i,indices:c}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.topk=function(e,t){return this.throwIfDisposed(),di(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.transpose=function(e){return this.throwIfDisposed(),it(this,e)};const fi=Object(G.a)({unique_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=0){const n=Object(W.a)(e,"x","unique",null);Object(w.b)(n.rank>0,()=>"The input tensor must be at least 1D");const r={x:n},o={axis:t},[a,s]=u.a.runKernel(z.Hc,r,o);return{values:a,indices:s}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */U.a.prototype.unique=function(e){return this.throwIfDisposed(),fi(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.unsortedSegmentSum=function(e,t){return this.throwIfDisposed(),Mo(this,e,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.unstack=function(e){return this.throwIfDisposed(),bn(this,e)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.where=function(e,t){return this.throwIfDisposed(),Bt(e,this,t)},
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
U.a.prototype.zerosLike=function(){return this.throwIfDisposed(),Pt(this)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return c})),n.d(t,"h",(function(){return l})),n.d(t,"i",(function(){return h})),n.d(t,"j",(function(){return d})),n.d(t,"k",(function(){return f})),n.d(t,"l",(function(){return p})),n.d(t,"n",(function(){return g})),n.d(t,"m",(function(){return m})),n.d(t,"o",(function(){return b})),n.d(t,"r",(function(){return x})),n.d(t,"p",(function(){return y})),n.d(t,"q",(function(){return v})),n.d(t,"s",(function(){return w})),n.d(t,"t",(function(){return C})),n.d(t,"u",(function(){return I})),n.d(t,"v",(function(){return E})),n.d(t,"w",(function(){return $})),n.d(t,"x",(function(){return O})),n.d(t,"y",(function(){return k})),n.d(t,"z",(function(){return R})),n.d(t,"A",(function(){return S})),n.d(t,"B",(function(){return A})),n.d(t,"C",(function(){return T})),n.d(t,"D",(function(){return _})),n.d(t,"E",(function(){return N})),n.d(t,"F",(function(){return F})),n.d(t,"G",(function(){return j})),n.d(t,"H",(function(){return D})),n.d(t,"J",(function(){return L})),n.d(t,"I",(function(){return B})),n.d(t,"K",(function(){return P})),n.d(t,"L",(function(){return M})),n.d(t,"M",(function(){return U})),n.d(t,"N",(function(){return V})),n.d(t,"O",(function(){return z})),n.d(t,"Q",(function(){return W})),n.d(t,"P",(function(){return G})),n.d(t,"R",(function(){return X})),n.d(t,"S",(function(){return q})),n.d(t,"T",(function(){return H})),n.d(t,"V",(function(){return K})),n.d(t,"U",(function(){return Y})),n.d(t,"W",(function(){return Q})),n.d(t,"X",(function(){return J})),n.d(t,"Y",(function(){return Z})),n.d(t,"Z",(function(){return ee})),n.d(t,"ab",(function(){return te})),n.d(t,"bb",(function(){return ne})),n.d(t,"cb",(function(){return re})),n.d(t,"eb",(function(){return oe})),n.d(t,"fb",(function(){return ae})),n.d(t,"gb",(function(){return se})),n.d(t,"hb",(function(){return ie})),n.d(t,"jb",(function(){return ue})),n.d(t,"ib",(function(){return ce})),n.d(t,"kb",(function(){return le})),n.d(t,"lb",(function(){return he})),n.d(t,"mb",(function(){return de})),n.d(t,"nb",(function(){return fe})),n.d(t,"qb",(function(){return pe})),n.d(t,"rb",(function(){return ge})),n.d(t,"sb",(function(){return me})),n.d(t,"tb",(function(){return be})),n.d(t,"vb",(function(){return xe})),n.d(t,"wb",(function(){return ye})),n.d(t,"xb",(function(){return ve})),n.d(t,"ub",(function(){return we})),n.d(t,"ob",(function(){return Ce})),n.d(t,"pb",(function(){return Ie})),n.d(t,"yb",(function(){return Ee})),n.d(t,"Eb",(function(){return $e})),n.d(t,"zb",(function(){return Oe})),n.d(t,"Cb",(function(){return ke})),n.d(t,"Ab",(function(){return Re})),n.d(t,"Bb",(function(){return Se})),n.d(t,"Db",(function(){return Ae})),n.d(t,"Fb",(function(){return Te})),n.d(t,"Gb",(function(){return _e})),n.d(t,"Hb",(function(){return Ne})),n.d(t,"Ib",(function(){return Fe})),n.d(t,"Jb",(function(){return je})),n.d(t,"Kb",(function(){return De})),n.d(t,"Lb",(function(){return Le})),n.d(t,"Pb",(function(){return Be})),n.d(t,"Mb",(function(){return Pe})),n.d(t,"Nb",(function(){return Me})),n.d(t,"Ob",(function(){return Ue})),n.d(t,"Rb",(function(){return Ve})),n.d(t,"Qb",(function(){return ze})),n.d(t,"Sb",(function(){return We})),n.d(t,"Tb",(function(){return Ge})),n.d(t,"Ub",(function(){return Xe})),n.d(t,"Vb",(function(){return qe})),n.d(t,"Wb",(function(){return He})),n.d(t,"Xb",(function(){return Ke})),n.d(t,"Yb",(function(){return Ye})),n.d(t,"Zb",(function(){return Qe})),n.d(t,"bc",(function(){return Je})),n.d(t,"ec",(function(){return Ze})),n.d(t,"fc",(function(){return et})),n.d(t,"cc",(function(){return tt})),n.d(t,"dc",(function(){return nt})),n.d(t,"ac",(function(){return rt})),n.d(t,"gc",(function(){return ot})),n.d(t,"ic",(function(){return at})),n.d(t,"jc",(function(){return st})),n.d(t,"kc",(function(){return it})),n.d(t,"lc",(function(){return ut})),n.d(t,"qc",(function(){return ct})),n.d(t,"oc",(function(){return lt})),n.d(t,"pc",(function(){return ht})),n.d(t,"nc",(function(){return dt})),n.d(t,"mc",(function(){return ft})),n.d(t,"sc",(function(){return pt})),n.d(t,"vc",(function(){return gt})),n.d(t,"Bc",(function(){return mt})),n.d(t,"tc",(function(){return bt})),n.d(t,"uc",(function(){return xt})),n.d(t,"rc",(function(){return yt})),n.d(t,"xc",(function(){return vt})),n.d(t,"wc",(function(){return wt})),n.d(t,"Ac",(function(){return Ct})),n.d(t,"zc",(function(){return It})),n.d(t,"Cc",(function(){return Et})),n.d(t,"Dc",(function(){return $t})),n.d(t,"Ec",(function(){return Ot})),n.d(t,"Fc",(function(){return kt})),n.d(t,"Gc",(function(){return Rt})),n.d(t,"Hc",(function(){return St})),n.d(t,"Ic",(function(){return At})),n.d(t,"Jc",(function(){return Tt})),n.d(t,"Kc",(function(){return _t})),n.d(t,"yc",(function(){return Nt})),n.d(t,"db",(function(){return Ft})),n.d(t,"hc",(function(){return jt}));const r="Abs",o="Acos",a="Acosh",s="Add",i="AddN",u="All",c="Any",l="ArgMax",h="ArgMin",d="Asin",f="Asinh",p="Atan",g="Atanh",m="Atan2",b="AvgPool",x="AvgPoolBackprop",y="AvgPool3D",v="AvgPool3DBackprop",w="BatchMatMul",C="BatchToSpaceND",I="BroadcastTo",E="Cast",$="Ceil",O="ClipByValue",k="Complex",R="Concat",S="Conv2D",A="Conv2DBackpropFilter",T="Conv2DBackpropInput",_="Conv3D",N="Conv3DBackpropFilterV2",F="Conv3DBackpropInputV2",j="Cos",D="Cosh",L="Cumsum",B="CropAndResize",P="DepthToSpace",M="DepthwiseConv2dNative",U="DepthwiseConv2dNativeBackpropFilter",V="DepthwiseConv2dNativeBackpropInput",z="Dilation2D",W="Dilation2DBackpropInput",G="Dilation2DBackpropFilter",X="Div",q="Elu",H="EluGrad",K="Erf",Y="Equal",Q="Exp",J="Expm1",Z="FFT",ee="Fill",te="FlipLeftRight",ne="Floor",re="FloorDiv",oe="FusedBatchNorm",ae="GatherV2",se="Greater",ie="GreaterEqual",ue="Identity",ce="IFFT",le="Imag",he="IsFinite",de="IsInf",fe="IsNan",pe="Less",ge="LessEqual",me="Log",be="Log1p",xe="LogicalAnd",ye="LogicalNot",ve="LogicalOr",we="LogSoftmax",Ce="LRN",Ie="LRNBackprop",Ee="Max",$e="Maximum",Oe="MaxPool",ke="MaxPoolBackprop",Re="MaxPool3D",Se="MaxPool3DBackprop",Ae="MaxPoolWithArgmax",Te="Mean",_e="Min",Ne="Minimum",Fe="MirrorPad",je="Mod",De="Multiply",Le="Negate",Be="NotEqual",Pe="NonMaxSuppressionV3",Me="NonMaxSuppressionV4",Ue="NonMaxSuppressionV5",Ve="OnesLike",ze="OneHot",We="PadV2",Ge="Pow",Xe="Prelu",qe="Prod",He="Range",Ke="Real",Ye="Reciprocal",Qe="Relu",Je="Reshape",Ze="ResizeNearestNeighbor",et="ResizeNearestNeighborGrad",tt="ResizeBilinear",nt="ResizeBilinearGrad",rt="Relu6",ot="Reverse",at="Round",st="Rsqrt",it="SelectV2",ut="Selu",ct="Slice",lt="Sin",ht="Sinh",dt="Sign",ft="Sigmoid",pt="Softplus",gt="Sqrt",mt="Sum",bt="SpaceToBatchND",xt="SplitV",yt="Softmax",vt="SquaredDifference",wt="Square",Ct="Sub",It="StridedSlice",Et="Tan",$t="Tanh",Ot="Tile",kt="TopK",Rt="Transpose",St="Unique",At="Unpack",Tt="UnsortedSegmentSum",_t="ZerosLike",Nt="Step",Ft="FromPixels",jt="RotateWithOffset"},function(t,n){t.exports=e},function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return h}));var r=n(6),o=n(11),a=n(5),s=n(16),i=n(7);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function u(e,t){let n=e;if(Object(s.A)(e))return"string"===t?[]:[e.length];if(!Array.isArray(e))return[];const r=[];for(;Array.isArray(n)||Object(s.A)(n)&&"string"!==t;)r.push(n.length),n=n[0];return Array.isArray(e)&&Object(o.b)().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function e(t,n,r){if(r=r||[],!Array.isArray(t)&&!Object(s.A)(t))return void Object(s.b)(0===n.length,()=>`Element arr[${r.join("][")}] is a primitive, but should be an array/TypedArray of ${n[0]} elements`);Object(s.b)(n.length>0,()=>`Element arr[${r.join("][")}] should be a primitive, but is an array of ${t.length} elements`),Object(s.b)(t.length===n[0],()=>`Element arr[${r.join("][")}] should have ${n[0]} elements, but has ${t.length} elements`);const o=n.slice(1);for(let n=0;n<t.length;++n)e(t[n],o,r.concat(n))}(e,r,[]),r}function c(e,t,n,r){if(null!=e&&("numeric"!==e&&e!==t||"numeric"===e&&"string"===t))throw new Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}function l(e,t,n,o="numeric"){if(e instanceof a.a)return c(o,e.dtype,t,n),e;let l=Object(s.r)(e);if("string"!==l&&["bool","int32","float32"].indexOf(o)>=0&&(l=o),c(o,l,t,n),null==e||!Object(s.A)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){const r=null==e?"null":e.constructor.name;throw new Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}const h=u(e,l);Object(s.A)(e)||Array.isArray(e)||(e=[e]);const d="string"!==l?Object(i.toTypedArray)(e,l):Object(s.m)(e,[],!0);return r.a.makeTensor(d,h,l)}function h(e,t,n,r="numeric"){if(!Array.isArray(e))throw new Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,r)=>l(e,`${t}[${r}]`,n),r)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(6),o=n(16);function a(e){const t=Object.keys(e);if(1!==t.length)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");let n=t[0];const a=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n+="__op";const s=(...e)=>{r.a.startScope(n);try{const t=a(...e);return Object(o.x)(t)&&console.error("Cannot return a Promise inside of tidy."),r.a.endScope(t),t}catch(e){throw r.a.endScope(null),e}};return Object.defineProperty(s,"name",{value:n,configurable:!0}),s}},function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return p})),n.d(t,"d",(function(){return g})),n.d(t,"a",(function(){return m})),n.d(t,"c",(function(){return b}));var r=n(16);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o(e,t,n,o){const u=Object(r.j)(t),c=function(e,t,n,o){const s=Object(r.N)(t),u=o[o.length-1],c=new Array(u).fill(0),l=t.length,h="complex64"===n?i(e):e;if(l>1)for(let e=0;e<s/u;e++){const t=e*u;for(let e=0;e<u;e++)c[e]=Math.max(c[e],a(h[t+e],0,n).length)}return c}(e,t,n,u),l=t.length,h=function e(t,n,r,o,u,c=!0){const l="complex64"===r?2:1,h=n[0],d=n.length;if(0===d){if("complex64"===r){return[a(i(t)[0],0,r)]}return"bool"===r?[s(t[0])]:[t[0].toString()]}if(1===d){if(h>20){const e=3*l;let n=Array.from(t.slice(0,e)),o=Array.from(t.slice((h-3)*l,h*l));return"complex64"===r&&(n=i(n),o=i(o)),["["+n.map((e,t)=>a(e,u[t],r)).join(", ")+", ..., "+o.map((e,t)=>a(e,u[h-3+t],r)).join(", ")+"]"]}return["["+("complex64"===r?i(t):Array.from(t)).map((e,t)=>a(e,u[t],r)).join(", ")+"]"]}const f=n.slice(1),p=o.slice(1),g=o[0]*l,m=[];if(h>20){for(let n=0;n<3;n++){const o=n*g,a=o+g;m.push(...e(t.slice(o,a),f,r,p,u,!1))}m.push("...");for(let n=h-3;n<h;n++){const o=n*g,a=o+g;m.push(...e(t.slice(o,a),f,r,p,u,n===h-1))}}else for(let n=0;n<h;n++){const o=n*g,a=o+g;m.push(...e(t.slice(o,a),f,r,p,u,n===h-1))}const b=2===d?",":"";m[0]="["+m[0]+b;for(let e=1;e<m.length-1;e++)m[e]=" "+m[e]+b;let x=",\n";for(let e=2;e<d;e++)x+="\n";return m[m.length-1]=" "+m[m.length-1]+"]"+(c?"":x),m}(e,t,n,u,c),d=["Tensor"];return o&&(d.push("  dtype: "+n),d.push("  rank: "+l),d.push(`  shape: [${t}]`),d.push("  values:")),d.push(h.map(e=>"    "+e).join("\n")),d.join("\n")}function a(e,t,n){let o;return o=Array.isArray(e)?parseFloat(e[0].toFixed(7))+" + "+parseFloat(e[1].toFixed(7))+"j":Object(r.z)(e)?`'${e}'`:"bool"===n?s(e):parseFloat(e.toFixed(7)).toString(),Object(r.L)(o,t)}function s(e){return 0===e?"false":"true"}function i(e){const t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var u=n(7);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class c{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=r.N(e),null!=n){const e=n.length;r.b(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||r.n(t,this.size),this.strides=Object(r.j)(e)}set(e,...t){0===t.length&&(t=[0]),r.b(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);const n=this.locToIndex(t);this.values[n]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(const n of e){if(n<0||n>=this.shape[t]){const t=`Requested out of range element at ${e}.   Buffer shape=`+this.shape;throw new Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];const t=new Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return l().makeTensor(this.values,this.shape,this.dtype)}}let l=null,h=null,d=null;function f(e){l=e}function p(e){h=e}function g(e){d=e}class m{constructor(e,t,n,o){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=r.N(e),this.strides=Object(r.j)(e),this.dataId=n,this.id=o,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const e=await this.data();return h.buffer(this.shape,this.dtype,e)}bufferSync(){return h.buffer(this.shape,this.dtype,this.dataSync())}async array(){const e=await this.data();return Object(r.S)(this.shape,e)}arraySync(){return Object(r.S)(this.shape,this.dataSync())}async data(){this.throwIfDisposed();const e=l().read(this.dataId);if("string"===this.dtype){const t=await e;try{return t.map(e=>u.decodeString(e))}catch(e){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataSync(){this.throwIfDisposed();const e=l().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>u.decodeString(e))}catch(e){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();const e=await l().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(l().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return h.print(this,e)}clone(){return this.throwIfDisposed(),h.clone(this)}toString(e=!1){return o(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),h.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),l().makeVariable(this,e,t,n)}}Object.defineProperty(m,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed});class b extends m{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!r.a(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);l().disposeTensor(this),this.dataId=e.dataId,l().incRef(this,null)}dispose(){l().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(b,Symbol.hasInstance,{value:e=>e instanceof m&&null!=e.assign&&e.assign instanceof Function})},function(e,t,n){"use strict";n.d(t,"b",(function(){return b})),n.d(t,"a",(function(){return x}));var r=n(40),o=n(11),a=n(41),s=n(1),i=n(26),u=n(16);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class c{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new h)}profileKernel(e,t,n){let r;const o=this.backendTimer.time(()=>{r=n()});for(let t=0;t<r.length;t++){const n=r[t];n.data().then(t=>{l(t,n.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:o.then(e=>e.kernelMs),extraInfo:o.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:t,outputs:n,timeMs:r,inputs:o,extraInfo:a}=e;n.forEach(e=>{Promise.all([e.data(),r,a]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],o,n[2])})})}}function l(e,t,n){if("float32"!==t)return!1;for(let t=0;t<e.length;t++){const r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}class h{logKernelProfile(e,t,n,r,o,a){const s="number"==typeof r?u.L(r+"ms",9):r.error,i=u.L(e,25),c=t.rank,l=t.size,h=u.L(t.shape.toString(),14);let d="";for(const e in o){const n=o[e];if(null!=n){const r=n.shape||t.shape,o=r.length;d+=`${e}: ${o}D ${o>0?r:""} `}}console.log(`%c${i}\t%c${s}\t%c${c}D ${h}\t%c${l}\t%c${d}\t%c${a}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var d=n(5),f=n(14),p=n(7);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class g{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class m{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new g}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t];if(await this.initializeBackend(n).success)return void await this.setBackend(n)}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){const{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(!(e in this.registryFactory))return null;{const{asyncInit:t}=this.initializeBackend(e);if(t)return null}}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(console.warn(e+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(null==this.registryFactory[e])throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;const{success:t,asyncInit:n}=this.initializeBackend(e);if(!(n?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new c(this.backendInstance),!0}setupRegisteredKernels(){Object(i.c)(this.backendName).forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Object(i.c)(e).forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){const t=this.registryFactory[e];if(null==t)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const n=t.factory();if(!n||n instanceof r.b||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};{const t=++this.pendingBackendInitId,r=n.then(n=>!(t<this.pendingBackendInitId)&&(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>(t<this.pendingBackendInitId||(this.pendingBackendInit=null,console.warn(`Initialization of backend ${e} failed`),console.warn(n.stack||n.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}}catch(t){return console.warn(`Initialization of backend ${e} failed`),console.warn(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(e+" backend not found in registry");this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t],{success:r,asyncInit:o}=this.initializeBackend(n);if(o||r)return{name:n,asyncInit:o}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){const n=this.state.tensorInfo.get(t),r=n.backend,o=this.readSync(t);r.disposeData(t),n.backend=e,e.move(t,o,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n,r=null;if(null==t){if("function"!=typeof e)throw new Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>(n=t(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(e,t,n){e();try{const e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return m.nextTensorId++}nextVariableId(){return m.nextVariableId++}clone(e){const t=this.makeTensorFromDataId(e.dataId,e.shape,e.dtype),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{const t={x:e},n={dtype:"float32"};return x.runKernelFunc(t=>t.cast(e,"float32"),t,null,s.v,n)}}),[],{}),t}runKernel(e,t,n,r,o){return this.runKernelFunc(null,t,null,e,n,r,o)}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,n){const r=this.backend.numDataIds();let o=0;n.forEach(e=>{o+="complex64"===e.dtype?3:1});const a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=r-t-o-a;if(s>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${s} data ids) after running '${e}'`)}runKernelFunc(e,t,n,r,o,a,s){let u,c=[];const l=this.isTapeOn();null==r&&(r=null!=this.state.activeScope?this.state.activeScope.name:"");const h=this.state.numBytes,d=this.state.numTensors;let f;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);const p=Object(i.b)(r,this.backendName);let g,m;if(null!=p)f=()=>{const e=this.backend.numDataIds();g=p.kernelFunc({inputs:t,attrs:o,backend:this.backend});const n=Array.isArray(g)?g:[g];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(r,e,n);const i=n.map(({dataId:e,shape:t,dtype:n})=>this.makeTensorFromDataId(e,t,n));if(l){let e=this.getTensorsForGradient(r,t,i);if(null==e){null==s&&(s=[]);const t=i.filter((e,t)=>s[t]);e=(a||[]).slice().concat(t)}c=this.saveTensorsForBackwardMode(e)}return i};else{const t=e=>{l&&(c=e.map(e=>this.keep(this.clone(e))))};f=()=>{const n=this.backend.numDataIds();g=this.tidy(()=>e(this.backend,t));const o=Array.isArray(g)?g:[g];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(r,n,o),o}}return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(m=this.profiler.profileKernel(r,t,()=>f()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(m),u=m.outputs):u=f()}),l&&this.addTapeNode(r,t,u,n,c,o),this.state.profiling&&this.state.activeProfile.kernels.push({name:r,bytesAdded:this.state.numBytes-h,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-d,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(t).map(e=>null!=t[e]?t[e].shape:null),outputShapes:u.map(e=>e.shape),kernelTimeMs:m.timeMs,extraInfo:m.extraInfo}),Array.isArray(g)?u:u[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){const r=Object(i.a)(e);if(null!=r){const e=r.inputsToSave||[],o=r.outputsToSave||[];let a;r.saveAllInputs?(u.b(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(t).map(e=>t[e])):a=e.map(e=>t[e]);const s=n.filter((e,t)=>o[t]);return a.concat(s)}return null}makeTensor(e,t,n,r){if(null==e)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;let o=e;"string"===n&&u.z(e[0])&&(o=e.map(e=>p.encodeString(e)));const a=r.write(o,t,n),s=new d.a(t,n,a,this.nextTensorId());if(this.incRef(s,r),"string"===n){const e=this.state.tensorInfo.get(a),t=Object(u.f)(o);this.state.numBytes+=t-e.bytes,e.bytes=t}return s}makeTensorFromDataId(e,t,n,r){n=n||"float32";const o=new d.a(t,n,e,this.nextTensorId());return this.incRef(o,r),o}makeVariable(e,t=!0,n,r){n=n||this.nextVariableId().toString(),null!=r&&r!==e.dtype&&(e=e.cast(r));const o=new d.c(e,t,n,this.nextTensorId());if(null!=this.state.registeredVariables[o.name])throw new Error(`Variable with name ${o.name} was already registered`);return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o}incRef(e,t){const n=this.state.tensorInfo.has(e.dataId)?this.state.tensorInfo.get(e.dataId).refCount:0;if(this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++,0===n){this.state.numDataBuffers++;let n=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(n=e.size*u.g(e.dtype)),this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n,refCount:0}),this.state.numBytes+=n}this.state.tensorInfo.get(e.dataId).refCount++,e instanceof d.c||this.track(e)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;this.state.numTensors--,"string"===e.dtype&&this.state.numStringTensors--;const t=this.state.tensorInfo.get(e.dataId);t.refCount<=1?("complex64"!==e.dtype&&(this.state.numBytes-=t.bytes),this.state.numDataBuffers--,t.backend.disposeData(e.dataId),this.state.tensorInfo.delete(e.dataId)):this.state.tensorInfo.get(e.dataId).refCount--}disposeVariables(){for(const e in this.state.registeredVariables){const t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;const t=this.state.numBytes,n=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n;for(const e of this.state.activeProfile.kernels)e.kernelTimeMs=await e.kernelTimeMs,e.extraInfo=await e.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,n,r,o,a){const s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:o},c=Object(i.a)(e);null!=c&&(r=c.gradFunc),null!=r&&(s.gradient=e=>(e=e.map((e,t)=>{if(null==e){const e=n[t],r=u.F(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],o,a))),this.state.activeTape.push(s)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){const t=Object(f.a)(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){const t=this.state.activeScope.track[e];t.kept||n.has(t.id)||t.dispose()}const r=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==r.id||this.track(e)})}gradients(e,t,n,r=!1){if(u.b(t.length>0,()=>"gradients() received an empty list of xs."),null!=n&&"float32"!==n.dtype)throw new Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);const o=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));u.b(o instanceof d.a,()=>"The result y returned by f() must be a tensor.");const a=function(e,t,n){const r={},o={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){const a=e[n],s=a.inputs;for(const e in s){const n=s[e];let i=!1;for(let e=0;e<t.length;e++)if(r[n.id]){a.outputs.forEach(e=>r[e.id]=!0),i=!0,o[a.id]=!0;break}if(i)break}}const a={};a[n.id]=!0;const s={};for(let t=e.length-1;t>=0;t--){const n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(a[n.outputs[e].id]){for(const e in r)a[r[e].id]=!0,s[n.id]=!0;break}}const i=[];for(let t=0;t<e.length;t++){const n=e[t];if(o[n.id]&&s[n.id]){const e={};for(const t in n.inputs){const o=n.inputs[t];r[o.id]&&(e[t]=o)}const t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,i.push(t)}}return i}(this.state.activeTape,t,o);if(!r&&0===a.length&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const e={};e[o.id]=null==n?function(e){const t=Object(u.D)(Object(u.N)(e),"float32");return x.makeTensor(t,e,"float32")}(o.shape):n,function(e,t,n,r){for(let o=t.length-1;o>=0;o--){const a=t[o],s=[];if(a.outputs.forEach(t=>{const n=e[t.id];null!=n?s.push(n):s.push(null)}),null==a.gradient)throw new Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);const i=a.gradient(s);for(const t in a.inputs){if(!(t in i))throw new Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(i)}.`);const o=n(()=>i[t]());if("float32"!==o.dtype)throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${o.dtype}'`);const s=a.inputs[t];if(!u.a(o.shape,s.shape))throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${t}' has shape '${o.shape}', which does not match the shape of the input '${s.shape}'`);if(null==e[s.id])e[s.id]=o;else{const t=e[s.id];e[s.id]=r(t,o),t.dispose()}}}}(e,a,e=>this.tidy(e),y);const r=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(const t of e.saved)t.dispose()}),this.state.activeTape=null),{value:o,grads:r}})}customGrad(e){return u.b(u.u(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let n;u.b(t.every(e=>e instanceof d.a),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");const r={};return t.forEach((e,t)=>{r[t]=e}),this.runKernelFunc((r,o)=>(n=e(...t,o),u.b(n.value instanceof d.a,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),u.b(u.u(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),r,(e,r)=>{const o=n.gradFunc(e,r),a=Array.isArray(o)?o:[o];u.b(a.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),u.b(a.every(e=>e instanceof d.a),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const s={};return a.forEach((e,t)=>{s[t]=()=>e}),s})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}async time(e){const t=Object(p.now)(),n=await this.backend.time(e);return n.wallMs=Object(p.now)()-t,n}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new g;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}function b(){const e=Object(a.b)();if(null==e._tfengine){const t=new o.a(e);e._tfengine=new m(t)}return Object(o.c)(e._tfengine.ENV),Object(d.f)(()=>e._tfengine),e._tfengine}m.nextTensorId=0,m.nextVariableId=0;const x=b();function y(e,t){const n={a:e,b:t};return x.runKernelFunc((n,r)=>{const o=n.add(e,t);return r([e,t]),o},n,null,s.d)}},function(e,t,n){"use strict";n.r(t),n.d(t,"createScalarValue",(function(){return a})),n.d(t,"toTypedArray",(function(){return s})),n.d(t,"now",(function(){return i})),n.d(t,"fetch",(function(){return u})),n.d(t,"encodeString",(function(){return c})),n.d(t,"decodeString",(function(){return l}));var r=n(11),o=n(16);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t){return"string"===t?c(e):s([e],t)}function s(e,t){if("string"===t)throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=o.m(e)),Object(r.b)().getBool("DEBUG")&&o.h(e,t),function(e,t){return e instanceof Float32Array&&"float32"===t||e instanceof Int32Array&&"int32"===t||e instanceof Uint8Array&&"bool"===t}(e,t))return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){const t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)0!==Math.round(e[n])&&(t[n]=1);return t}throw new Error("Unknown data type "+t)}function i(){return Object(r.b)().platform.now()}function u(e,t){return Object(r.b)().platform.fetch(e,t)}function c(e,t="utf-8"){return t=t||"utf-8",Object(r.b)().platform.encode(e,t)}function l(e,t="utf-8"){return t=t||"utf-8",Object(r.b)().platform.decode(e,t)}n.d(t,"shuffle",(function(){return o.M})),n.d(t,"clamp",(function(){return o.i})),n.d(t,"nearestLargerEven",(function(){return o.H})),n.d(t,"sum",(function(){return o.Q})),n.d(t,"randUniform",(function(){return o.J})),n.d(t,"distSquared",(function(){return o.l})),n.d(t,"assert",(function(){return o.b})),n.d(t,"assertShapesMatch",(function(){return o.e})),n.d(t,"assertNonNull",(function(){return o.d})),n.d(t,"flatten",(function(){return o.m})),n.d(t,"sizeFromShape",(function(){return o.N})),n.d(t,"isScalarShape",(function(){return o.y})),n.d(t,"arraysEqual",(function(){return o.a})),n.d(t,"isInt",(function(){return o.v})),n.d(t,"tanh",(function(){return o.R})),n.d(t,"sizeToSquarishShape",(function(){return o.O})),n.d(t,"createShuffledIndices",(function(){return o.k})),n.d(t,"rightPad",(function(){return o.L})),n.d(t,"repeatedTry",(function(){return o.K})),n.d(t,"inferFromImplicitShape",(function(){return o.s})),n.d(t,"parseAxisParam",(function(){return o.I})),n.d(t,"squeezeShape",(function(){return o.P})),n.d(t,"getTypedArrayFromDType",(function(){return o.o})),n.d(t,"getArrayFromDType",(function(){return o.n})),n.d(t,"checkConversionForErrors",(function(){return o.h})),n.d(t,"isValidDtype",(function(){return o.B})),n.d(t,"hasEncodingLoss",(function(){return o.p})),n.d(t,"isTypedArray",(function(){return o.A})),n.d(t,"bytesPerElement",(function(){return o.g})),n.d(t,"bytesFromStringArray",(function(){return o.f})),n.d(t,"isString",(function(){return o.z})),n.d(t,"isBoolean",(function(){return o.t})),n.d(t,"isNumber",(function(){return o.w})),n.d(t,"inferDtype",(function(){return o.r})),n.d(t,"isFunction",(function(){return o.u})),n.d(t,"nearestDivisor",(function(){return o.G})),n.d(t,"computeStrides",(function(){return o.j})),n.d(t,"toNestedArray",(function(){return o.S})),n.d(t,"makeOnesTypedArray",(function(){return o.D})),n.d(t,"makeZerosTypedArray",(function(){return o.F})),n.d(t,"makeZerosNestedTypedArray",(function(){return o.E})),n.d(t,"assertNonNegativeIntegerDimensions",(function(){return o.c})),n.d(t,"locToIndex",(function(){return o.C})),n.d(t,"indexToLoc",(function(){return o.q})),n.d(t,"isPromise",(function(){return o.x}))},,function(e,n){e.exports=t},,function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i}));var r=n(16);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class o{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}setPlatform(e,t){null!=this.platform&&console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},null!=this.urlFlags[e]){const t=this.urlFlags[e];console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];const t=this.evaluateFlag(e);if(Object(r.x)(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;const e=function(e){const t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(function(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||"")}(t,n[0],n[1]),n.join("="))),t}(this.global.location.search);if("tfjsflags"in e){e.tfjsflags.split(",").forEach(e=>{const[t,n]=e.split(":");this.urlFlags[t]=function(e,t){if("true"===(t=t.toLowerCase())||"false"===t)return"true"===t;if(""+ +t===t)return+t;throw new Error(`Could not parse value flag value ${t} for flag ${e}.`)}(t,n)})}}}function a(){return s}let s=null;function i(e){s=e}},function(e,t,n){"use strict";n.r(t),n.d(t,"Level",(function(){return r})),n.d(t,"verbosity",(function(){return a})),n.d(t,"setVerbosity",(function(){return s})),n.d(t,"log",(function(){return i})),n.d(t,"logWithDuration",(function(){return u}));var r,o=n(15);!function(e){e[e.NONE=0]="NONE",e[e.WARN=5]="WARN",e[e.INFO=10]="INFO",e[e.DEBUG=20]="DEBUG"}(r||(r={}));let a=10;function s(e){e=e}function i(e,t="Magenta.js",n=10){if(0===n)throw Error("Logging level cannot be NONE.");if(a>=n){(5===n?console.warn:console.log)(`%c ${t} `,"background:magenta; color:white",e)}}function u(e,t,n="Magenta.js",r=10){i(`${e} in ${((o.d.now()-t)/1e3).toPrecision(3)}s`,n,r)}},,function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}));var r=n(5),o=n(28);n(16);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t){if(e.dtype===t.dtype)return[e,t];const n=Object(o.b)(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function s(e){const t=[];return function e(t,n,o){if(null==t)return;if(t instanceof r.a)return void n.push(t);if(a=t,!Array.isArray(a)&&"object"!=typeof a)return;var a;const s=t;for(const t in s){const r=s[t];o.has(r)||(o.add(r),e(r,n,o))}}(e,t,new Set),t}},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return s}));var r=n(27);n.d(t,"c",(function(){return r.b})),n.d(t,"b",(function(){return r.a}));const o=void 0!==e&&void 0!==e.process,a=o?n(46):window.fetch.bind(window),s=o?n(47):window.performance;o?n(48):window.navigator}).call(this,n(18))},function(e,t,n){"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function r(e){let t=e.length,n=0,r=0;for(;t>0;)r=Math.random()*t|0,t--,n=e[t],e[t]=e[r],e[r]=n}function o(e,t,n){return Math.max(e,Math.min(t,n))}function a(e){return e%2==0?e:e+1}function s(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function i(e,t){const n=Math.random();return t*n+(1-n)*e}function u(e,t){let n=0;for(let r=0;r<e.length;r++){const o=Number(e[r])-Number(t[r]);n+=o*o}return n}function c(e,t){if(!e)throw new Error("string"==typeof t?t:t())}function l(e,t,n=""){c(g(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function h(e){c(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function d(e,t=[],n=!1){if(null==t&&(t=[]),Array.isArray(e)||A(e)&&!n)for(let r=0;r<e.length;++r)d(e[r],t,n);else t.push(e);return t}function f(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function p(e){return 0===e.length}function g(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function m(e){return e%1==0}function b(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return-1;{const t=Math.exp(2*e);return(t-1)/(t+1)}}function x(e){const t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function y(e){const t=new Uint32Array(e);for(let n=0;n<e;++n)t[n]=n;return r(t),t}function v(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function w(e,t=(e=>0),n){return new Promise((r,o)=>{let a=0;const s=()=>{if(e())return void r();a++;const i=t(a);null!=n&&a>=n?o():setTimeout(s,i)};s()})}function C(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(-1===e[t]){if(-1!==r)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(-1===r){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===n)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!=0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);const o=e.slice();return o[r]=t/n,o}function I(e,t){const n=t.length;return c((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis `+e),c(e.every(e=>m(e)),()=>"All values in axis param must be integers but got axis "+e),e.map(e=>e<0?n+e:e)}function E(e,t){const n=[],r=[],o=null!=t&&Array.isArray(t)&&0===t.length,a=null==t||o?null:I(t,e).sort();let s=0;for(let t=0;t<e.length;++t){if(null!=a){if(a[s]===t&&1!==e[t])throw new Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==a[s]||a[s]>t)&&1===e[t]&&(n.push(e[t]),r.push(t)),a[s]<=t&&s++}1!==e[t]&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function $(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else{if("bool"!==e)throw new Error("Unknown data type "+e);n=new Uint8Array(t)}return n}function O(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else if("bool"===e)n=new Uint8Array(t);else{if("string"!==e)throw new Error("Unknown data type "+e);n=new Array(t)}return n}function k(e,t){for(let n=0;n<e.length;n++){const r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function R(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function S(e,t){return"complex64"!==t&&(("float32"!==t||"complex64"===e)&&(("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)))}function A(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array}function T(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw new Error("Unknown dtype "+e)}function _(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function N(e){return"string"==typeof e||e instanceof String}function F(e){return"boolean"==typeof e}function j(e){return"number"==typeof e}function D(e){return Array.isArray(e)?D(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array?"int32":j(e)?"float32":N(e)?"string":F(e)?"bool":"float32"}function L(e){return!!(e&&e.constructor&&e.call&&e.apply)}function B(e,t){for(let n=t;n<e;++n)if(e%n==0)return n;return e}function P(e){const t=e.length;if(t<2)return[];const n=new Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function M(e,t){if(0===e.length)return t[0];const n=e.reduce((e,t)=>e*t);if(0===n)return[];if(n!==t.length)throw new Error(`[${e}] does not match the input size ${t.length}.`);return function e(t,n,r){const o=new Array;if(1===n.length){const e=n[0];for(let n=0;n<e;n++)o[n]=r[t+n]}else{const a=n[0],s=n.slice(1),i=s.reduce((e,t)=>e*t);for(let n=0;n<a;n++)o[n]=e(t+n*i,s,r)}return o}(0,e,t)}function U(e,t){const n=V(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function V(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw new Error("Unknown data type "+t)}function z(e,t){const n=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return M(e,new Float32Array(n));if("int32"===t)return M(e,new Int32Array(n));if("bool"===t)return M(e,new Uint8Array(n));throw new Error("Unknown data type "+t)}function W(e){e.forEach(t=>{c(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function G(e,t,n){if(0===t)return 0;if(1===t)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function X(e,t,n){if(0===t)return[];if(1===t)return[e];const r=new Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function q(e){return e&&e.then&&"function"==typeof e.then}n.d(t,"M",(function(){return r})),n.d(t,"i",(function(){return o})),n.d(t,"H",(function(){return a})),n.d(t,"Q",(function(){return s})),n.d(t,"J",(function(){return i})),n.d(t,"l",(function(){return u})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return h})),n.d(t,"m",(function(){return d})),n.d(t,"N",(function(){return f})),n.d(t,"y",(function(){return p})),n.d(t,"a",(function(){return g})),n.d(t,"v",(function(){return m})),n.d(t,"R",(function(){return b})),n.d(t,"O",(function(){return x})),n.d(t,"k",(function(){return y})),n.d(t,"L",(function(){return v})),n.d(t,"K",(function(){return w})),n.d(t,"s",(function(){return C})),n.d(t,"I",(function(){return I})),n.d(t,"P",(function(){return E})),n.d(t,"o",(function(){return $})),n.d(t,"n",(function(){return O})),n.d(t,"h",(function(){return k})),n.d(t,"B",(function(){return R})),n.d(t,"p",(function(){return S})),n.d(t,"A",(function(){return A})),n.d(t,"g",(function(){return T})),n.d(t,"f",(function(){return _})),n.d(t,"z",(function(){return N})),n.d(t,"t",(function(){return F})),n.d(t,"w",(function(){return j})),n.d(t,"r",(function(){return D})),n.d(t,"u",(function(){return L})),n.d(t,"G",(function(){return B})),n.d(t,"j",(function(){return P})),n.d(t,"S",(function(){return M})),n.d(t,"D",(function(){return U})),n.d(t,"F",(function(){return V})),n.d(t,"E",(function(){return z})),n.d(t,"c",(function(){return W})),n.d(t,"C",(function(){return G})),n.d(t,"q",(function(){return X})),n.d(t,"x",(function(){return q}))},function(e,t,n){"use strict";(function(e){n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"d",(function(){return p})),n.d(t,"c",(function(){return g})),n.d(t,"g",(function(){return m}));var r=n(20),o=n(24),a=n(16),s=n(42);async function i(e,t){const n=[],r=[],o=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let a=0;a<o.length;++a){const s=o[a],i=Array.isArray(e)?e[a].tensor:e[s];if("float32"!==i.dtype&&"int32"!==i.dtype&&"bool"!==i.dtype&&"string"!==i.dtype&&"complex64"!==i.dtype)throw new Error(`Unsupported dtype in weight '${s}': ${i.dtype}`);const u={name:s,shape:i.shape,dtype:i.dtype};if("string"===i.dtype){const e=new Promise(async e=>{const t=await i.bytes(),n=t.reduce((e,t)=>e+t.length,0)+4*t.length,r=new Uint8Array(n);let o=0;for(let e=0;e<t.length;e++){const n=t[e],a=new Uint8Array(new Uint32Array([n.length]).buffer);r.set(a,o),o+=4,r.set(n,o),o+=n.length}e(r)});r.push(e)}else r.push(i.data());null!=t&&(u.group=t),n.push(u)}return{data:c(await Promise.all(r)),specs:n}}function u(e,t){const n={};let i,u=0;for(const c of t){const t=c.name,l=c.dtype,h=c.shape,d=Object(a.N)(h);let f;if("quantization"in c){const n=c.quantization;if("uint8"===n.dtype||"uint16"===n.dtype){if(!("min"in n)||!("scale"in n))throw new Error(`Weight ${c.name} with quantization ${n.dtype} doesn't have corresponding metadata min and scale.`)}else{if("float16"!==n.dtype)throw new Error(`Weight ${c.name} has unknown quantization dtype ${n.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);if("float32"!==l)throw new Error(`Weight ${c.name} is quantized with ${n.dtype} which only supports weights of type float32 not ${l}.`)}const r=s.a[n.dtype],o=e.slice(u,u+d*r),a="uint8"===n.dtype?new Uint8Array(o):new Uint16Array(o);if("float32"===l)if("uint8"===n.dtype||"uint16"===n.dtype){f=new Float32Array(a.length);for(let e=0;e<a.length;e++){const t=a[e];f[e]=t*n.scale+n.min}}else{if("float16"!==n.dtype)throw new Error(`Unsupported quantization type ${n.dtype} for weight type float32.`);void 0===i&&(i=b()),f=i(a)}else{if("int32"!==l)throw new Error(`Unsupported dtype in weight '${t}': ${l}`);if("uint8"!==n.dtype&&"uint16"!==n.dtype)throw new Error(`Unsupported quantization type ${n.dtype} for weight type int32.`);f=new Int32Array(a.length);for(let e=0;e<a.length;e++){const t=a[e];f[e]=Math.round(t*n.scale+n.min)}}u+=d*r}else if("string"===l){const t=Object(a.N)(c.shape);f=[];for(let n=0;n<t;n++){const t=new Uint32Array(e.slice(u,u+4))[0];u+=4;const n=new Uint8Array(e.slice(u,u+t));f.push(n),u+=t}}else{const a=s.a[l],i=e.slice(u,u+d*a);if("float32"===l)f=new Float32Array(i);else if("int32"===l)f=new Int32Array(i);else if("bool"===l)f=new Uint8Array(i);else{if("complex64"!==l)throw new Error(`Unsupported dtype in weight '${t}': ${l}`);{f=new Float32Array(i);const e=new Float32Array(f.length/2),a=new Float32Array(f.length/2);for(let t=0;t<e.length;t++)e[t]=f[2*t],a[t]=f[2*t+1];const s=Object(o.a)(e,h,"float32"),u=Object(o.a)(a,h,"float32");n[t]=Object(r.a)(s,u),s.dispose(),u.dispose()}}u+=d*a}"complex64"!==l&&(n[t]=Object(o.a)(f,h,l))}return n}function c(e){if(null===e)throw new Error("Invalid input value: "+JSON.stringify(e));let t=0;const n=[];e.forEach(e=>{if(t+=e.byteLength,n.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+e.constructor.name)});const r=new Uint8Array(t);let o=0;return n.forEach(e=>{r.set(new Uint8Array(e.buffer),o),o+=e.byteLength}),r.buffer}const l=void 0!==e&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function h(t){return l?e.byteLength(t):new Blob([t]).size}function d(t){if(l)return e.from(t).toString("base64");const n=new Uint8Array(t);let r="";for(let e=0,t=n.length;e<t;e++)r+=String.fromCharCode(n[e]);return btoa(r)}function f(t){if(l){const n=e.from(t,"base64");return n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}const n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r.set([n.charCodeAt(e)],e);return r.buffer}function p(e){if(1===e.length)return e[0];let t=0;e.forEach(e=>{t+=e.byteLength});const n=new Uint8Array(t);let r=0;return e.forEach(e=>{n.set(new Uint8Array(e),r),r+=e.byteLength}),n.buffer}function g(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);const t=e.split("/");return t[t.length-1]}function m(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:h(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:h(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:e.weightData.byteLength}}function b(){const e=function(){const e=e=>{let t=e<<13,n=0;for(;0==(8388608&t);)n-=8388608,t<<=1;return t&=-8388609,n+=947912704,t|n},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}(),t=function(){const e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),n=function(){const e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}();return r=>{const o=new ArrayBuffer(4*r.length),a=new Uint32Array(o);for(let o=0;o<r.length;o++){const s=r[o],i=e[n[s>>10]+(1023&s)]+t[s>>10];a[o]=i}return new Float32Array(o)}}}).call(this,n(72).Buffer)},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},,function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(6),o=n(1),a=n(3),s=n(16),i=n(4);const u=Object(i.a)({complex_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(a.a)(e,"real","complex"),i=Object(a.a)(t,"imag","complex");s.e(n.shape,i.shape,`real and imag shapes, ${n.shape} and ${i.shape}, must match in call to tf.complex().`);const u={real:n,imag:i};return r.a.runKernelFunc(e=>e.complex(n,i),u,null,o.y)}})},function(e,t,n){"use strict";n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return h})),n.d(t,"f",(function(){return d})),n.d(t,"i",(function(){return f})),n.d(t,"j",(function(){return g})),n.d(t,"a",(function(){return b})),n.d(t,"h",(function(){return x})),n.d(t,"b",(function(){return w})),n.d(t,"g",(function(){return I})),n.d(t,"c",(function(){return E}));var r=n(2),o=n(44),a=n(31),s=n(78),i=n(15),u=n(12);const c=Object(i.b)(16e3);async function l(e){return Object(i.a)(e).then(e=>e.arrayBuffer()).then(e=>c.decodeAudioData(e))}async function h(e){const t=new FileReader;return new Promise((n,r)=>{t.onerror=()=>{t.abort(),r(new DOMException("Something went wrong reading that file."))},t.onload=()=>{n(t.result)},t.readAsArrayBuffer(e)}).then(e=>c.decodeAudioData(e))}function d(e,t){t.power||(t.power=2);const n=function(e,t){const n=t.nFft||2048,r=t.winLength||n,o=t.hopLength||Math.floor(r/4);let a=w(r);a=x(a,n);const s=function(e,t,n){const r=Math.floor((e.length-t)/n)+1,o=Array.from({length:r},(e,n)=>new Float32Array(t));for(let a=0;a<r;a++){const r=a*n,s=e.slice(r,r+t);o[a].set(s),s.length}return o}(e=function(e,t){const n=y(e,t);for(let e=0;e<t;e++)n[e]=n[2*t-e],n[n.length-e-1]=n[n.length-2*t+e-1];return n}(e,Math.floor(n/2)),n,o),i=[],u=s.length,c=n+2;for(let e=0;e<u;e++){const t=new Float32Array(c);i[e]=t}for(let e=0;e<u;e++){const t=v(b(s[e],a));i[e].set(t.slice(0,c))}return i}(e,t),[r,o]=function(e,t){const n=e.map(e=>function(e,t){return e.map(e=>Math.pow(e,t))}(function(e){const t=new Float32Array(e.length/2);for(let n=0;n<e.length/2;n++)t[n]=Math.sqrt(e[2*n]*e[2*n]+e[2*n+1]*e[2*n+1]);return t}(e),t)),r=e[0].length-1;return[n,r]}(n,t.power);t.nFft=o;return function(e,t){const n=[];for(let r=0;r<e.length;r++)n[r]=m(e[r],t);return n}(r,function(e){const t=e.fMin||0,n=e.fMax||e.sampleRate/2,r=e.nMels||128,o=e.nFft||2048,a=function(e,t){return C(0,e/2,Math.floor(1+t/2))}(e.sampleRate,o),s=function(e,t,n){const r=$(t),o=$(n),a=C(r,o,e);return a.map(e=>function(e){return 700*(Math.exp(e/1125)-1)}(e))}(r+2,t,n),i=function(e){const t=new Float32Array(e.length-1);for(let n=0;n<e.length;n++)t[n]=e[n+1]-e[n];return t}(s),u=function(e,t){const n=[];for(let r=0;r<e.length;r++)n[r]=new Float32Array(t.length);for(let r=0;r<e.length;r++)for(let o=0;o<t.length;o++)n[r][o]=e[r]-t[o];return n}(s,a),c=u[0].length,l=[];for(let e=0;e<r;e++){l[e]=new Float32Array(c);for(let t=0;t<u[e].length;t++){const n=-u[e][t]/i[e],r=u[e+2][t]/i[e+1],o=Math.max(0,Math.min(n,r));l[e][t]=o}}for(let e=0;e<l.length;e++){const t=2/(s[2+e]-s[e]);l[e]=l[e].map(e=>e*t)}return l}(t))}function f(e,t=1e-10,n=80){const r=e.length,o=e[0].length,a=[];for(let e=0;e<r;e++)a[e]=new Float32Array(o);for(let n=0;n<r;n++)for(let r=0;r<o;r++){const o=e[n][r];a[n][r]=10*Math.log10(Math.max(t,o))}if(n){if(n<0)throw new Error("topDb must be non-negative.");for(let e=0;e<r;e++){const t=a[e].reduce((e,t)=>Math.max(e,t));for(let r=0;r<o;r++)a[e][r]=Math.max(a[e][r],t-n)}}return a}function p(e){if(1===e.numberOfChannels)return e.getChannelData(0);if(2!==e.numberOfChannels)throw Error(e.numberOfChannels+" channel audio is not supported.");const t=e.getChannelData(0),n=e.getChannelData(1),r=new Float32Array(e.length);for(let o=0;o<e.length;++o)r[o]=(t[o]+n[o])/2;return r}async function g(e,t=16e3){if(e.sampleRate===t)return p(e);const n=e.sampleRate,r=e.length*t/n;if(i.c){u.log("Safari does not support WebAudio resampling, so this may be slow.","O&F",5);const t=p(e),n=new Float32Array(r);return s(a(n,[r]),a(t,[t.length])),n}{const n=new OfflineAudioContext(e.numberOfChannels,e.duration*t,t),r=n.createBufferSource();return r.buffer=e,r.connect(n.destination),r.start(),n.startRendering().then(e=>e.getChannelData(0))}}function m(e,t){if(e.length!==t[0].length)throw new Error(`Each entry in filterbank should have dimensions matching FFT. |mags| = ${e.length}, |filterbank[0]| = ${t[0].length}.`);const n=new Float32Array(t.length);for(let r=0;r<t.length;r++){const o=b(e,t[r]);n[r]=o.reduce((e,t)=>e+t)}return n}function b(e,t){if(e.length!==t.length)return console.error(`Buffer length ${e.length} != window length ${t.length}.`),null;const n=new Float32Array(e.length);for(let r=0;r<e.length;r++)n[r]=t[r]*e[r];return n}function x(e,t){if(e.length>t)throw new Error("Data is longer than length.");const n=Math.floor((t-e.length)/2);return y(e,[n,t-e.length-n])}function y(e,t){let n,r;"object"==typeof t?[n,r]=t:n=r=t;const o=new Float32Array(e.length+n+r);return o.set(e,n),o}function v(e){const t=new o(e.length),n=t.createComplexArray(),r=t.toComplexArray(e);return t.transform(n,r),n}function w(e){const t=new Float32Array(e);for(let n=0;n<e;n++)t[n]=.5*(1-Math.cos(2*Math.PI*n/(e-1)));return t}function C(e,t,n){const r=(t-e)/(n-1),o=new Float32Array(n);for(let t=0;t<n;t++)o[t]=e+r*t;return o}function I(e){let t=r.sub(e,69);return t=r.div(t,12),t=r.pow(2,t),t=r.mul(440,t),t}async function E(e){let t=r.sub(r.div(r.log(e),r.log(2)),r.div(r.log(440),r.log(2)));t=r.mul(12,t),t=r.add(t,69);return await t.array()}function $(e){return 1125*Math.log(1+e/700)}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},,function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(3),o=n(29);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t,n){const a=Object(r.c)(e,n);return Object(o.a)(e,t,a,n)}},function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return i})),n.d(t,"e",(function(){return u})),n.d(t,"f",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return h})),n.d(t,"h",(function(){return d})),n.d(t,"g",(function(){return f}));var r=n(2),o=n(21);var a=n(43);const s=16e3,i=250,u=25.58,c=63.07,l=.002,h=.7;async function d(e){let t;return t=await r.loadGraphModel(e,{fromTFHub:!0}),t}async function f(e,t,n){if("webgl"!==r.getBackend())throw new Error("Device does not support webgl.");const u=await Object(o.j)(e,s),c=u.length,l=await async function(e){const t=Math.floor(s/i),n=r.tensor1d(e,"float32"),o=e.length;if(null===n)return[];const a=n.mul(n).reshape([o,1]),u=r.conv1d(a,r.ones([1024,1,1]).div(1024),t,"same").sqrt().squeeze(),c=r.mul(r.log(r.maximum(1e-20,u)).div(r.log(10)),20),l=c.sub(20.7),h=r.maximum(l,-120),d=await h.array();return n.dispose(),a.dispose(),u.dispose(),c.dispose(),l.dispose(),h.dispose(),d}(u),{pitches:h,confidences:d}=await Object(a.a)(t,u,n);return{f0_hz:h,loudness_db:l,confidences:d,originalRecordedBufferLength:c}}},function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return h}));var r=n(11),o=n(41);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const a=Object(o.a)("kernelRegistry",()=>new Map),s=Object(o.a)("gradRegistry",()=>new Map);function i(e,t){const n=d(e,t);return a.get(n)}function u(e){return s.get(e)}function c(e){const t=a.entries(),n=[];for(;;){const{done:r,value:o}=t.next();if(r)break;const[a,s]=o,[i]=a.split("_");i===e&&n.push(s)}return n}function l(e){const{kernelName:t,backendName:n}=e,r=d(t,n);a.has(r)&&console.warn(`The kernel '${t}' for backend '${n}' is already registered`),a.set(r,e)}function h(e){const{kernelName:t}=e;s.has(t)&&Object(r.b)().getBool("DEBUG")&&console.warn(`Overriding the gradient for '${t}'`),s.set(t,e)}function d(e,t){return`${t}_${e}`}},function(e,t,n){"use strict";(function(e){n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return s}));const r=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==e)return e;throw new Error("cannot find the global object")}(),o=(r.fetch.bind(r),r.performance,r.navigator,!!r.webkitOfflineAudioContext),a=void 0!==r.WorkerGlobalScope;function s(e){if(e=o?44100:e,a)throw new Error("Cannot use offline audio context in a web worker.");const t=r.webkitOfflineAudioContext;return o?new t(1,e,e):new r.OfflineAudioContext(1,e,e)}}).call(this,n(18))},function(e,t,n){"use strict";
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var r,o,a,s,i;n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l})),function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"}(r||(r={})),function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"}(o||(o={})),function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"}(a||(a={})),function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"}(s||(s={})),function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"}(i||(i={}));const u={float32:s,int32:o,bool:a,complex64:i};function c(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw new Error(`Can not upcast ${e} with ${t}`)}return u[e][t]}function l(e){return c(e,"int32")}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(6),o=n(16),a=n(7);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function s(e,t,n,s){if(null==s&&(s=Object(o.r)(e)),"complex64"===s)throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!Object(o.A)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){Object(o.c)(t);const e=Object(o.N)(t),r=Object(o.N)(n);Object(o.b)(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){const r=n[e],a=e!==n.length-1||r!==Object(o.N)(t.slice(e));Object(o.b)(n[e]===t[e]||!a,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return Object(o.A)(e)||Array.isArray(e)||(e=[e]),t=t||n,e="string"!==s?Object(a.toTypedArray)(e,s):Object(o.m)(e,[],!0),r.a.makeTensor(e,t,s)}},,function(e,t,n){var r=n(88),o=n(89),a="undefined"!=typeof Float64Array;function s(e,t){return e[0]-t[0]}function i(){var e,t=this.stride,n=new Array(t.length);for(e=0;e<n.length;++e)n[e]=[Math.abs(t[e]),e];n.sort(s);var r=new Array(n.length);for(e=0;e<r.length;++e)r[e]=n[e][1];return r}function u(e,t){var n=["View",t,"d",e].join("");t<0&&(n="View_Nil"+e);var o="generic"===e;if(-1===t){var a="function "+n+"(a){this.data=a;};var proto="+n+".prototype;proto.dtype='"+e+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+n+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+n+"(a){return new "+n+"(a);}";return new Function(a)()}if(0===t){a="function "+n+"(a,d) {this.data = a;this.offset = d};var proto="+n+".prototype;proto.dtype='"+e+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+n+"_copy() {return new "+n+"(this.data,this.offset)};proto.pick=function "+n+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+n+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+n+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+n+"(a,b,c,d){return new "+n+"(a,d)}";return new Function("TrivialArray",a)(c[e][0])}a=["'use strict'"];var s=r(t),u=s.map((function(e){return"i"+e})),l="this.offset+"+s.map((function(e){return"this.stride["+e+"]*i"+e})).join("+"),h=s.map((function(e){return"b"+e})).join(","),d=s.map((function(e){return"c"+e})).join(",");a.push("function "+n+"(a,"+h+","+d+",d){this.data=a","this.shape=["+h+"]","this.stride=["+d+"]","this.offset=d|0}","var proto="+n+".prototype","proto.dtype='"+e+"'","proto.dimension="+t),a.push("Object.defineProperty(proto,'size',{get:function "+n+"_size(){return "+s.map((function(e){return"this.shape["+e+"]"})).join("*"),"}})"),1===t?a.push("proto.order=[0]"):(a.push("Object.defineProperty(proto,'order',{get:"),t<4?(a.push("function "+n+"_order(){"),2===t?a.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===t&&a.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):a.push("ORDER})")),a.push("proto.set=function "+n+"_set("+u.join(",")+",v){"),o?a.push("return this.data.set("+l+",v)}"):a.push("return this.data["+l+"]=v}"),a.push("proto.get=function "+n+"_get("+u.join(",")+"){"),o?a.push("return this.data.get("+l+")}"):a.push("return this.data["+l+"]}"),a.push("proto.index=function "+n+"_index(",u.join(),"){return "+l+"}"),a.push("proto.hi=function "+n+"_hi("+u.join(",")+"){return new "+n+"(this.data,"+s.map((function(e){return["(typeof i",e,"!=='number'||i",e,"<0)?this.shape[",e,"]:i",e,"|0"].join("")})).join(",")+","+s.map((function(e){return"this.stride["+e+"]"})).join(",")+",this.offset)}");var f=s.map((function(e){return"a"+e+"=this.shape["+e+"]"})),p=s.map((function(e){return"c"+e+"=this.stride["+e+"]"}));a.push("proto.lo=function "+n+"_lo("+u.join(",")+"){var b=this.offset,d=0,"+f.join(",")+","+p.join(","));for(var g=0;g<t;++g)a.push("if(typeof i"+g+"==='number'&&i"+g+">=0){d=i"+g+"|0;b+=c"+g+"*d;a"+g+"-=d}");a.push("return new "+n+"(this.data,"+s.map((function(e){return"a"+e})).join(",")+","+s.map((function(e){return"c"+e})).join(",")+",b)}"),a.push("proto.step=function "+n+"_step("+u.join(",")+"){var "+s.map((function(e){return"a"+e+"=this.shape["+e+"]"})).join(",")+","+s.map((function(e){return"b"+e+"=this.stride["+e+"]"})).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(g=0;g<t;++g)a.push("if(typeof i"+g+"==='number'){d=i"+g+"|0;if(d<0){c+=b"+g+"*(a"+g+"-1);a"+g+"=ceil(-a"+g+"/d)}else{a"+g+"=ceil(a"+g+"/d)}b"+g+"*=d}");a.push("return new "+n+"(this.data,"+s.map((function(e){return"a"+e})).join(",")+","+s.map((function(e){return"b"+e})).join(",")+",c)}");var m=new Array(t),b=new Array(t);for(g=0;g<t;++g)m[g]="a[i"+g+"]",b[g]="b[i"+g+"]";a.push("proto.transpose=function "+n+"_transpose("+u+"){"+u.map((function(e,t){return e+"=("+e+"===undefined?"+t+":"+e+"|0)"})).join(";"),"var a=this.shape,b=this.stride;return new "+n+"(this.data,"+m.join(",")+","+b.join(",")+",this.offset)}"),a.push("proto.pick=function "+n+"_pick("+u+"){var a=[],b=[],c=this.offset");for(g=0;g<t;++g)a.push("if(typeof i"+g+"==='number'&&i"+g+">=0){c=(c+this.stride["+g+"]*i"+g+")|0}else{a.push(this.shape["+g+"]);b.push(this.stride["+g+"])}");return a.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),a.push("return function construct_"+n+"(data,shape,stride,offset){return new "+n+"(data,"+s.map((function(e){return"shape["+e+"]"})).join(",")+","+s.map((function(e){return"stride["+e+"]"})).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",a.join("\n"))(c[e],i)}var c={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],bigint64:[],biguint64:[],buffer:[],generic:[]};e.exports=function(e,t,n,r){if(void 0===e)return(0,c.array[0])([]);"number"==typeof e&&(e=[e]),void 0===t&&(t=[e.length]);var s=t.length;if(void 0===n){n=new Array(s);for(var i=s-1,l=1;i>=0;--i)n[i]=l,l*=t[i]}if(void 0===r){r=0;for(i=0;i<s;++i)n[i]<0&&(r-=(t[i]-1)*n[i])}for(var h=function(e){if(o(e))return"buffer";if(a)switch(Object.prototype.toString.call(e)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped";case"[object BigInt64Array]":return"bigint64";case"[object BigUint64Array]":return"biguint64"}return Array.isArray(e)?"array":"generic"}(e),d=c[h];d.length<=s+1;)d.push(u(h,d.length-1));return(0,d[s+1])(e,t,n,r)}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){(function(t){e.exports=t}).call(this,{})},,,,,,function(e,t,n){"use strict";(function(e){var t=n(50),r=n(11);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const o=Object(r.b)();o.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),o.registerFlag("IS_BROWSER",()=>t.isBrowser()),o.registerFlag("IS_NODE",()=>void 0!==e&&void 0!==e.versions&&void 0!==e.versions.node),o.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),o.registerFlag("PROD",()=>!1),o.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>o.getBool("DEBUG")),o.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),o.registerFlag("IS_TEST",()=>!1)}).call(this,n(45))},function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));class r{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class o{time(e){return a("time")}read(e){return a("read")}readSync(e){return a("readSync")}numDataIds(){return a("numDataIds")}disposeData(e){return a("disposeData")}write(e,t,n){return a("write")}move(e,t,n,r){return a("move")}memory(){return a("memory")}floatPrecision(){return a("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}batchMatMul(e,t,n,r){return a("batchMatMul")}fusedBatchMatMul({a:e,b:t,transposeA:n,transposeB:r,bias:o,activation:s,preluActivationWeights:i}){return a("fusedBatchMatMul")}slice(e,t,n){return a("slice")}stridedSlice(e,t,n,r){return a("stridedSlice")}unstack(e,t){return a("unstack")}reverse(e,t){return a("reverse")}concat(e,t){return a("concat")}neg(e){return a("neg")}add(e,t){return a("add")}addN(e){return a("addN")}subtract(e,t){return a("subtract")}multiply(e,t){return a("multiply")}realDivide(e,t){return a("realDivide")}floorDiv(e,t){return a("floorDiv")}sum(e,t){return a("sum")}prod(e,t){return a("prod")}unsortedSegmentSum(e,t,n){return a("unsortedSegmentSum")}argMin(e,t){return a("argMin")}argMax(e,t){return a("argMax")}equal(e,t){return a("equal")}notEqual(e,t){return a("notEqual")}less(e,t){return a("less")}lessEqual(e,t){return a("lessEqual")}greater(e,t){return a("greater")}greaterEqual(e,t){return a("greaterEqual")}logicalNot(e){return a("logicalNot")}logicalAnd(e,t){return a("logicalAnd")}logicalOr(e,t){return a("logicalOr")}where(e){return a("where")}select(e,t,n){return a("select")}topk(e,t,n){return a("topk")}min(e,t){return a("min")}minimum(e,t){return a("minimum")}mod(e,t){return a("mod")}max(e,t){return a("max")}maximum(e,t){return a("maximum")}all(e,t){return a("all")}any(e,t){return a("any")}squaredDifference(e,t){return a("squaredDifference")}ceil(e){return a("ceil")}floor(e){return a("floor")}round(e){return a("round")}sign(e){return a("sign")}isNaN(e){return a("isNaN")}isInf(e){return a("isInf")}isFinite(e){return a("isFinite")}pow(e,t){return a("pow")}exp(e){return a("exp")}expm1(e){return a("expm1")}softmax(e,t){return a("softmax")}log(e){return a("log")}log1p(e){return a("log1p")}sqrt(e){return a("sqrt")}rsqrt(e){return a("rsqrt")}square(e){return a("square")}reciprocal(e){return a("reciprocal")}relu(e){return a("relu")}relu6(e){return a("relu6")}prelu(e,t){return a("prelu")}elu(e){return a("elu")}eluDer(e,t){return a("eluDer")}selu(e){return a("selu")}int(e){return a("int")}clip(e,t,n){return a("clip")}abs(e){return a("abs")}complexAbs(e){return a("complexAbs")}sigmoid(e){return a("sigmoid")}softplus(e){return a("softplus")}sin(e){return a("sin")}cos(e){return a("cos")}tan(e){return a("tan")}asin(e){return a("asin")}acos(e){return a("acos")}atan(e){return a("atan")}atan2(e,t){return a("atan2")}sinh(e){return a("sinh")}cosh(e){return a("cosh")}tanh(e){return a("tanh")}asinh(e){return a("asinh")}acosh(e){return a("acosh")}atanh(e){return a("atanh")}erf(e){return a("erf")}step(e,t){return a("step")}fusedConv2d({input:e,filter:t,convInfo:n,bias:r,activation:o,preluActivationWeights:s}){return a("fusedConv2d")}conv2d(e,t,n){return a("conv2d")}conv2dDerInput(e,t,n){return a("conv2dDerInput")}conv2dDerFilter(e,t,n){return a("conv2dDerFilter")}fusedDepthwiseConv2D({input:e,filter:t,convInfo:n,bias:r,activation:o,preluActivationWeights:s}){return a("fusedDepthwiseConv2D")}depthwiseConv2D(e,t,n){return a("depthwiseConv2D")}depthwiseConv2DDerInput(e,t,n){return a("depthwiseConv2DDerInput")}depthwiseConv2DDerFilter(e,t,n){return a("depthwiseConv2DDerFilter")}conv3d(e,t,n){return a("conv3d")}conv3dDerInput(e,t,n){return a("conv3dDerInput")}conv3dDerFilter(e,t,n){return a("conv3dDerFilter")}maxPool(e,t){return a("maxPool")}maxPoolBackprop(e,t,n,r){return a("maxPoolBackprop")}avgPool(e,t){return a("avgPool")}avgPoolBackprop(e,t,n){return a("avgPoolBackprop")}avgPool3d(e,t){return a("avgPool3d")}avgPool3dBackprop(e,t,n){return a("avgPool3dBackprop")}maxPool3d(e,t){return a("maxPool3d")}maxPool3dBackprop(e,t,n,r){return a("maxPool3dBackprop")}reshape(e,t){return a("reshape")}cast(e,t){return a("cast")}tile(e,t){return a("tile")}pad(e,t,n){return a("pad")}transpose(e,t){return a("transpose")}gather(e,t,n){return a("gather")}gatherND(e,t){return a("gatherND")}scatterND(e,t,n){return a("scatterND")}batchToSpaceND(e,t,n){return a("batchToSpaceND")}spaceToBatchND(e,t,n){return a("spaceToBatchND")}resizeBilinear(e,t,n,r){return a("resizeBilinear")}resizeBilinearBackprop(e,t,n){return a("resizeBilinearBackprop")}resizeNearestNeighbor(e,t,n,r){return a("resizeNearestNeighbor")}resizeNearestNeighborBackprop(e,t,n){return a("resizeNearestNeighborBackprop")}batchNorm(e,t,n,r,o,s){return a("batchNorm")}localResponseNormalization4D(e,t,n,r,o){return a("localResponseNormalization4D")}LRNGrad(e,t,n,r,o,s,i){return a("LRNGrad")}multinomial(e,t,n,r){return a("multinomial")}oneHot(e,t,n,r){return a("oneHot")}cumsum(e,t,n,r){return a("cumsum")}nonMaxSuppression(e,t,n,r,o){return a("nonMaxSuppression")}fft(e){return a("fft")}ifft(e){return a("ifft")}complex(e,t){return a("complex")}real(e){return a("real")}imag(e){return a("imag")}cropAndResize(e,t,n,r,o,s){return a("cropAndResize")}depthToSpace(e,t,n){return a("depthToSpace")}split(e,t,n){return a("split")}sparseToDense(e,t,n,r){return a("sparseToDense")}diag(e){return a("diag")}fill(e,t,n){return a("fill")}onesLike(e){return a("onesLike")}zerosLike(e){return a("zerosLike")}linspace(e,t,n){return a("linspace")}dispose(){return a("dispose")}}function a(e){throw new Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}},function(e,t,n){"use strict";(function(e,r){
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
let o;function a(){if(null==o){let t;if("undefined"!=typeof window)t=window;else if(void 0!==e)t=e;else if(void 0!==r)t=r;else{if("undefined"==typeof self)throw new Error("Could not find a global object");t=self}o=t}return o}function s(e,t){const n=function(){const e=a();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(n.has(e))return n.get(e);{const r=t();return n.set(e,r),n.get(e)}}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}))}).call(this,n(18),n(45))},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const r={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8}},function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return i}));var r=n(2),o=n(21),a=n(25);function s(e,t=0){return r.tidy(()=>{let n=r.mul(e,r.pow(2,t));return n=n.clipByValue(0,Object(o.g)(110).dataSync()[0]),n})}function i(e,t,n){return e.splice(n),function(e,t){const n=[],r=Math.floor(t/e.length),o=t%e.length;for(let t=0;t<e.length;t++){n.push(e[t]);for(let e=1;e<r;e++)n.push(-1);t<o&&n.push(-1)}let a=-1;for(let e=0;e<n.length;e++)if(-1!==n[e]){let t=n[e];const r=a>=0?n[a]:0;-1!==a&&(t-=n[a]);for(let o=a+1;o<e;o++)n[o]=r+t*(o-a)/(e-a);a=e}for(let e=a+1;e<n.length;e++)n[e]=a>=0?n[e-1]:0;return n}(e,t)}function u(e){const t=e*a.f+a.e;return 10*Math.pow(2,1*t/12)}async function c(e,t,n=a.a){const o=[],s=[],i=t.length,c=r.tensor(t),l=512*Math.ceil(i/512),h=c.pad([[0,l-i]]),d=h.size/16e3,f=await e.execute({input_audio_samples:h});let p=await f[0].data();const g=await f[1].data();if(32*(g.length-1)/1e3===d){let e=20;for(let t=0;t<g.length;++t){const n=1-p[t];if(s.push(n),n>=a.a)e=u(g[t]),o.push(e);else{const t=r.truncatedNormal([1],0,a.d),n=1-await t.array();o.push(e*n),t.dispose()}}}else{const t=l/512+1,i=new Float32Array(t);p=new Float32Array(t);for(let t=0;t<l;t+=l/4){const n=h.slice([t],[l/4]),r=await e.execute({input_audio_samples:n}),o=await r[0].data(),a=await r[1].data(),s=Math.floor(t/512);p.set(o,s),i.set(a,s),n.dispose(),r[0].dispose(),r[1].dispose()}let c=20;for(let e=0;e<i.length;++e){const t=1-p[e];if(s.push(t),t>=n)c=u(i[e]),o.push(c);else{const e=r.truncatedNormal([1],0,a.d),t=1-await e.array();o.push(c*t),e.dispose()}}}return f[0].dispose(),f[1].dispose(),c.dispose(),h.dispose(),{pitches:o,confidences:s}}},function(e,t,n){"use strict";function r(e){if(this.size=0|e,this.size<=1||0!=(this.size&this.size-1))throw new Error("FFT size must be a power of two and bigger than 1");this._csize=e<<1;for(var t=new Array(2*this.size),n=0;n<t.length;n+=2){const e=Math.PI*n/this.size;t[n]=Math.cos(e),t[n+1]=-Math.sin(e)}this.table=t;for(var r=0,o=1;this.size>o;o<<=1)r++;this._width=r%2==0?r-1:r,this._bitrev=new Array(1<<this._width);for(var a=0;a<this._bitrev.length;a++){this._bitrev[a]=0;for(var s=0;s<this._width;s+=2){var i=this._width-s-2;this._bitrev[a]|=(a>>>s&3)<<i}}this._out=null,this._data=null,this._inv=0}e.exports=r,r.prototype.fromComplexArray=function(e,t){for(var n=t||new Array(e.length>>>1),r=0;r<e.length;r+=2)n[r>>>1]=e[r];return n},r.prototype.createComplexArray=function(){const e=new Array(this._csize);for(var t=0;t<e.length;t++)e[t]=0;return e},r.prototype.toComplexArray=function(e,t){for(var n=t||this.createComplexArray(),r=0;r<n.length;r+=2)n[r]=e[r>>>1],n[r+1]=0;return n},r.prototype.completeSpectrum=function(e){for(var t=this._csize,n=t>>>1,r=2;r<n;r+=2)e[t-r]=e[r],e[t-r+1]=-e[r+1]},r.prototype.transform=function(e,t){if(e===t)throw new Error("Input and output buffers must be different");this._out=e,this._data=t,this._inv=0,this._transform4(),this._out=null,this._data=null},r.prototype.realTransform=function(e,t){if(e===t)throw new Error("Input and output buffers must be different");this._out=e,this._data=t,this._inv=0,this._realTransform4(),this._out=null,this._data=null},r.prototype.inverseTransform=function(e,t){if(e===t)throw new Error("Input and output buffers must be different");this._out=e,this._data=t,this._inv=1,this._transform4();for(var n=0;n<e.length;n++)e[n]/=this.size;this._out=null,this._data=null},r.prototype._transform4=function(){var e,t,n=this._out,r=this._csize,o=1<<this._width,a=r/o<<1,s=this._bitrev;if(4===a)for(e=0,t=0;e<r;e+=a,t++){const n=s[t];this._singleTransform2(e,n,o)}else for(e=0,t=0;e<r;e+=a,t++){const n=s[t];this._singleTransform4(e,n,o)}var i=this._inv?-1:1,u=this.table;for(o>>=2;o>=2;o>>=2){var c=(a=r/o<<1)>>>2;for(e=0;e<r;e+=a)for(var l=e+c,h=e,d=0;h<l;h+=2,d+=o){const e=h,t=e+c,r=t+c,o=r+c,a=n[e],s=n[e+1],l=n[t],f=n[t+1],p=n[r],g=n[r+1],m=n[o],b=n[o+1],x=a,y=s,v=u[d],w=i*u[d+1],C=l*v-f*w,I=l*w+f*v,E=u[2*d],$=i*u[2*d+1],O=p*E-g*$,k=p*$+g*E,R=u[3*d],S=i*u[3*d+1],A=m*R-b*S,T=m*S+b*R,_=x+O,N=y+k,F=x-O,j=y-k,D=C+A,L=I+T,B=i*(C-A),P=i*(I-T),M=_+D,U=N+L,V=_-D,z=N-L,W=F+P,G=j-B,X=F-P,q=j+B;n[e]=M,n[e+1]=U,n[t]=W,n[t+1]=G,n[r]=V,n[r+1]=z,n[o]=X,n[o+1]=q}}},r.prototype._singleTransform2=function(e,t,n){const r=this._out,o=this._data,a=o[t],s=o[t+1],i=o[t+n],u=o[t+n+1],c=a+i,l=s+u,h=a-i,d=s-u;r[e]=c,r[e+1]=l,r[e+2]=h,r[e+3]=d},r.prototype._singleTransform4=function(e,t,n){const r=this._out,o=this._data,a=this._inv?-1:1,s=2*n,i=3*n,u=o[t],c=o[t+1],l=o[t+n],h=o[t+n+1],d=o[t+s],f=o[t+s+1],p=o[t+i],g=o[t+i+1],m=u+d,b=c+f,x=u-d,y=c-f,v=l+p,w=h+g,C=a*(l-p),I=a*(h-g),E=m+v,$=b+w,O=x+I,k=y-C,R=m-v,S=b-w,A=x-I,T=y+C;r[e]=E,r[e+1]=$,r[e+2]=O,r[e+3]=k,r[e+4]=R,r[e+5]=S,r[e+6]=A,r[e+7]=T},r.prototype._realTransform4=function(){var e,t,n=this._out,r=this._csize,o=1<<this._width,a=r/o<<1,s=this._bitrev;if(4===a)for(e=0,t=0;e<r;e+=a,t++){const n=s[t];this._singleRealTransform2(e,n>>>1,o>>>1)}else for(e=0,t=0;e<r;e+=a,t++){const n=s[t];this._singleRealTransform4(e,n>>>1,o>>>1)}var i=this._inv?-1:1,u=this.table;for(o>>=2;o>=2;o>>=2){var c=(a=r/o<<1)>>>1,l=c>>>1,h=l>>>1;for(e=0;e<r;e+=a)for(var d=0,f=0;d<=h;d+=2,f+=o){var p=e+d,g=p+l,m=g+l,b=m+l,x=n[p],y=n[p+1],v=n[g],w=n[g+1],C=n[m],I=n[m+1],E=n[b],$=n[b+1],O=x,k=y,R=u[f],S=i*u[f+1],A=v*R-w*S,T=v*S+w*R,_=u[2*f],N=i*u[2*f+1],F=C*_-I*N,j=C*N+I*_,D=u[3*f],L=i*u[3*f+1],B=E*D-$*L,P=E*L+$*D,M=O+F,U=k+j,V=O-F,z=k-j,W=A+B,G=T+P,X=i*(A-B),q=i*(T-P),H=M+W,K=U+G,Y=V+q,Q=z-X;if(n[p]=H,n[p+1]=K,n[g]=Y,n[g+1]=Q,0!==d){if(d!==h){var J=V+-i*q,Z=-z+-i*X,ee=M+-i*W,te=-U- -i*G,ne=e+l-d,re=e+c-d;n[ne]=J,n[ne+1]=Z,n[re]=ee,n[re+1]=te}}else{var oe=M-W,ae=U-G;n[m]=oe,n[m+1]=ae}}}},r.prototype._singleRealTransform2=function(e,t,n){const r=this._out,o=this._data,a=o[t],s=o[t+n],i=a+s,u=a-s;r[e]=i,r[e+1]=0,r[e+2]=u,r[e+3]=0},r.prototype._singleRealTransform4=function(e,t,n){const r=this._out,o=this._data,a=this._inv?-1:1,s=2*n,i=3*n,u=o[t],c=o[t+n],l=o[t+s],h=o[t+i],d=u+l,f=u-l,p=c+h,g=a*(c-h),m=d+p,b=f,x=-g,y=d-p,v=f,w=g;r[e]=m,r[e+1]=0,r[e+2]=b,r[e+3]=x,r[e+4]=y,r[e+5]=0,r[e+6]=v,r[e+7]=w}},function(e,t){var n,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function i(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var u,c=[],l=!1,h=-1;function d(){l&&u&&(l=!1,u.length?c=u.concat(c):h=-1,c.length&&f())}function f(){if(!l){var e=i(d);l=!0;for(var t=c.length;t;){for(u=c,c=[];++h<t;)u&&u[h].run();h=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||l||i(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r)return r;throw new Error("unable to locate global object")}();e.exports=t=r.fetch,r.fetch&&(t.default=r.fetch.bind(r)),t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response},function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"now",(function(){return o})),n.d(t,"timing",(function(){return a}));const r=e.process.hrtime(),o=()=>{const t=e.process.hrtime(r);return t[0]+t[1]/1e9},a={navigationStart:Date.now()}}.call(this,n(18))},function(e,t,n){"use strict";n.r(t),n.d(t,"userAgent",(function(){return r}));const r=""},function(e,t,n){"use strict";var r=n(73),o={body:"",args:[],thisVars:[],localVars:[]};function a(e){if(!e)return o;for(var t=0;t<e.args.length;++t){var n=e.args[t];e.args[t]=0===t?{name:n,lvalue:!0,rvalue:!!e.rvalue,count:e.count||1}:{name:n,lvalue:!1,rvalue:!0,count:1}}return e.thisVars||(e.thisVars=[]),e.localVars||(e.localVars=[]),e}function s(e){for(var t=[],n=0;n<e.args.length;++n)t.push("a"+n);return new Function("P",["return function ",e.funcName,"_ndarrayops(",t.join(","),") {P(",t.join(","),");return a0}"].join(""))(function(e){return r({args:e.args,pre:a(e.pre),body:a(e.body),post:a(e.proc),funcName:e.funcName})}(e))}var i={add:"+",sub:"-",mul:"*",div:"/",mod:"%",band:"&",bor:"|",bxor:"^",lshift:"<<",rshift:">>",rrshift:">>>"};!function(){for(var e in i){var n=i[e];t[e]=s({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+n+"c"},funcName:e}),t[e+"eq"]=s({args:["array","array"],body:{args:["a","b"],body:"a"+n+"=b"},rvalue:!0,funcName:e+"eq"}),t[e+"s"]=s({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+n+"s"},funcName:e+"s"}),t[e+"seq"]=s({args:["array","scalar"],body:{args:["a","s"],body:"a"+n+"=s"},rvalue:!0,funcName:e+"seq"})}}();var u={not:"!",bnot:"~",neg:"-",recip:"1.0/"};!function(){for(var e in u){var n=u[e];t[e]=s({args:["array","array"],body:{args:["a","b"],body:"a="+n+"b"},funcName:e}),t[e+"eq"]=s({args:["array"],body:{args:["a"],body:"a="+n+"a"},rvalue:!0,count:2,funcName:e+"eq"})}}();var c={and:"&&",or:"||",eq:"===",neq:"!==",lt:"<",gt:">",leq:"<=",geq:">="};!function(){for(var e in c){var n=c[e];t[e]=s({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+n+"c"},funcName:e}),t[e+"s"]=s({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+n+"s"},funcName:e+"s"}),t[e+"eq"]=s({args:["array","array"],body:{args:["a","b"],body:"a=a"+n+"b"},rvalue:!0,count:2,funcName:e+"eq"}),t[e+"seq"]=s({args:["array","scalar"],body:{args:["a","s"],body:"a=a"+n+"s"},rvalue:!0,count:2,funcName:e+"seq"})}}();var l=["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan"];!function(){for(var e=0;e<l.length;++e){var n=l[e];t[n]=s({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b)",thisVars:["this_f"]},funcName:n}),t[n+"eq"]=s({args:["array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a"],body:"a=this_f(a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"eq"})}}();var h=["max","min","atan2","pow"];!function(){for(var e=0;e<h.length;++e){var n=h[e];t[n]=s({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:n}),t[n+"s"]=s({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:n+"s"}),t[n+"eq"]=s({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"eq"}),t[n+"seq"]=s({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"seq"})}}();var d=["atan2","pow"];!function(){for(var e=0;e<d.length;++e){var n=d[e];t[n+"op"]=s({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:n+"op"}),t[n+"ops"]=s({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:n+"ops"}),t[n+"opeq"]=s({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"opeq"}),t[n+"opseq"]=s({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"opseq"})}}(),t.any=r({args:["array"],pre:o,body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"if(a){return true}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return false"},funcName:"any"}),t.all=r({args:["array"],pre:o,body:{args:[{name:"x",lvalue:!1,rvalue:!0,count:1}],body:"if(!x){return false}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return true"},funcName:"all"}),t.sum=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s+=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"sum"}),t.prod=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=1"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s*=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"prod"}),t.norm2squared=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm2squared"}),t.norm2=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return Math.sqrt(this_s)"},funcName:"norm2"}),t.norminf=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:4}],body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norminf"}),t.norm1=r({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:3}],body:"this_s+=a<0?-a:a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm1"}),t.sup=r({args:["array"],pre:{body:"this_h=-Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),t.inf=r({args:["array"],pre:{body:"this_h=Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),t.argmin=r({args:["index","array","shape"],pre:{body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),t.argmax=r({args:["index","array","shape"],pre:{body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),t.random=s({args:["array"],pre:{args:[],body:"this_f=Math.random",thisVars:["this_f"]},body:{args:["a"],body:"a=this_f()",thisVars:["this_f"]},funcName:"random"}),t.assign=s({args:["array","array"],body:{args:["a","b"],body:"a=b"},funcName:"assign"}),t.assigns=s({args:["array","scalar"],body:{args:["a","b"],body:"a=b"},funcName:"assigns"}),t.equals=r({args:["array","array"],pre:o,body:{args:[{name:"x",lvalue:!1,rvalue:!0,count:1},{name:"y",lvalue:!1,rvalue:!0,count:1}],body:"if(x!==y){return false}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return true"},funcName:"equals"})},function(e,t,n){"use strict";function r(){if("undefined"!=typeof navigator&&null!=navigator){const e=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function o(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}n.r(t),n.d(t,"isMobile",(function(){return r})),n.d(t,"isBrowser",(function(){return o}))},function(e,t,n){var r=n(166),o=n(167),a=n(168),s=n(169),i=n(170),u=n(171),c=n(172);c.alea=r,c.xor128=o,c.xorwow=a,c.xorshift7=s,c.xor4096=i,c.tychei=u,e.exports=c},,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var r=n(79),o=n(80),a=n(81);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(e,t){if(s()<t)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=u.prototype:(null===e&&(e=new u(t)),e.length=t),e}function u(e,t,n){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return h(this,e)}return c(this,e,t,n)}function c(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,n,r){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r);u.TYPED_ARRAY_SUPPORT?(e=t).__proto__=u.prototype:e=d(e,t);return e}(e,t,n,r):"string"==typeof t?function(e,t,n){"string"==typeof n&&""!==n||(n="utf8");if(!u.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|p(t,n),o=(e=i(e,r)).write(t,n);o!==r&&(e=e.slice(0,o));return e}(e,t,n):function(e,t){if(u.isBuffer(t)){var n=0|f(t.length);return 0===(e=i(e,n)).length||t.copy(e,0,0,n),e}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r?i(e,0):d(e,t);if("Buffer"===t.type&&a(t.data))return d(e,t.data)}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function l(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function h(e,t){if(l(t),e=i(e,t<0?0:0|f(t)),!u.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function d(e,t){var n=t.length<0?0:0|f(t.length);e=i(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function f(e){if(e>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|e}function p(e,t){if(u.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return M(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return U(e).length;default:if(r)return M(e).length;t=(""+t).toLowerCase(),r=!0}}function g(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return S(this,t,n);case"utf8":case"utf-8":return O(this,t,n);case"ascii":return k(this,t,n);case"latin1":case"binary":return R(this,t,n);case"base64":return $(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function m(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function b(e,t,n,r,o){if(0===e.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(o)return-1;n=e.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof t&&(t=u.from(t,r)),u.isBuffer(t))return 0===t.length?-1:x(e,t,n,r,o);if("number"==typeof t)return t&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):x(e,[t],n,r,o);throw new TypeError("val must be string, number or Buffer")}function x(e,t,n,r,o){var a,s=1,i=e.length,u=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;s=2,i/=2,u/=2,n/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){var l=-1;for(a=n;a<i;a++)if(c(e,a)===c(t,-1===l?0:a-l)){if(-1===l&&(l=a),a-l+1===u)return l*s}else-1!==l&&(a-=a-l),l=-1}else for(n+u>i&&(n=i-u),a=n;a>=0;a--){for(var h=!0,d=0;d<u;d++)if(c(e,a+d)!==c(t,d)){h=!1;break}if(h)return a}return-1}function y(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r))>o&&(r=o):r=o;var a=t.length;if(a%2!=0)throw new TypeError("Invalid hex string");r>a/2&&(r=a/2);for(var s=0;s<r;++s){var i=parseInt(t.substr(2*s,2),16);if(isNaN(i))return s;e[n+s]=i}return s}function v(e,t,n,r){return V(M(t,e.length-n),e,n,r)}function w(e,t,n,r){return V(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function C(e,t,n,r){return w(e,t,n,r)}function I(e,t,n,r){return V(U(t),e,n,r)}function E(e,t,n,r){return V(function(e,t){for(var n,r,o,a=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s),r=n>>8,o=n%256,a.push(o),a.push(r);return a}(t,e.length-n),e,n,r)}function $(e,t,n){return 0===t&&n===e.length?r.fromByteArray(e):r.fromByteArray(e.slice(t,n))}function O(e,t,n){n=Math.min(e.length,n);for(var r=[],o=t;o<n;){var a,s,i,u,c=e[o],l=null,h=c>239?4:c>223?3:c>191?2:1;if(o+h<=n)switch(h){case 1:c<128&&(l=c);break;case 2:128==(192&(a=e[o+1]))&&(u=(31&c)<<6|63&a)>127&&(l=u);break;case 3:a=e[o+1],s=e[o+2],128==(192&a)&&128==(192&s)&&(u=(15&c)<<12|(63&a)<<6|63&s)>2047&&(u<55296||u>57343)&&(l=u);break;case 4:a=e[o+1],s=e[o+2],i=e[o+3],128==(192&a)&&128==(192&s)&&128==(192&i)&&(u=(15&c)<<18|(63&a)<<12|(63&s)<<6|63&i)>65535&&u<1114112&&(l=u)}null===l?(l=65533,h=1):l>65535&&(l-=65536,r.push(l>>>10&1023|55296),l=56320|1023&l),r.push(l),o+=h}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);var n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=4096));return n}(r)}t.Buffer=u,t.SlowBuffer=function(e){+e!=e&&(e=0);return u.alloc(+e)},t.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=s(),u.poolSize=8192,u._augment=function(e){return e.__proto__=u.prototype,e},u.from=function(e,t,n){return c(null,e,t,n)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(e,t,n){return function(e,t,n,r){return l(t),t<=0?i(e,t):void 0!==n?"string"==typeof r?i(e,t).fill(n,r):i(e,t).fill(n):i(e,t)}(null,e,t,n)},u.allocUnsafe=function(e){return h(null,e)},u.allocUnsafeSlow=function(e){return h(null,e)},u.isBuffer=function(e){return!(null==e||!e._isBuffer)},u.compare=function(e,t){if(!u.isBuffer(e)||!u.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,o=0,a=Math.min(n,r);o<a;++o)if(e[o]!==t[o]){n=e[o],r=t[o];break}return n<r?-1:r<n?1:0},u.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(e,t){if(!a(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return u.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=u.allocUnsafe(t),o=0;for(n=0;n<e.length;++n){var s=e[n];if(!u.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(r,o),o+=s.length}return r},u.byteLength=p,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)m(this,t,t+1);return this},u.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)m(this,t,t+3),m(this,t+1,t+2);return this},u.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)m(this,t,t+7),m(this,t+1,t+6),m(this,t+2,t+5),m(this,t+3,t+4);return this},u.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?O(this,0,e):g.apply(this,arguments)},u.prototype.equals=function(e){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===u.compare(this,e)},u.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},u.prototype.compare=function(e,t,n,r,o){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),t<0||n>e.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&t>=n)return 0;if(r>=o)return-1;if(t>=n)return 1;if(this===e)return 0;for(var a=(o>>>=0)-(r>>>=0),s=(n>>>=0)-(t>>>=0),i=Math.min(a,s),c=this.slice(r,o),l=e.slice(t,n),h=0;h<i;++h)if(c[h]!==l[h]){a=c[h],s=l[h];break}return a<s?-1:s<a?1:0},u.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},u.prototype.indexOf=function(e,t,n){return b(this,e,t,n,!0)},u.prototype.lastIndexOf=function(e,t,n){return b(this,e,t,n,!1)},u.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-t;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var a=!1;;)switch(r){case"hex":return y(this,e,t,n);case"utf8":case"utf-8":return v(this,e,t,n);case"ascii":return w(this,e,t,n);case"latin1":case"binary":return C(this,e,t,n);case"base64":return I(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,e,t,n);default:if(a)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function k(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(127&e[o]);return r}function R(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(e[o]);return r}function S(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",a=t;a<n;++a)o+=P(e[a]);return o}function A(e,t,n){for(var r=e.slice(t,n),o="",a=0;a<r.length;a+=2)o+=String.fromCharCode(r[a]+256*r[a+1]);return o}function T(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function _(e,t,n,r,o,a){if(!u.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<a)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function N(e,t,n,r){t<0&&(t=65535+t+1);for(var o=0,a=Math.min(e.length-n,2);o<a;++o)e[n+o]=(t&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function F(e,t,n,r){t<0&&(t=4294967295+t+1);for(var o=0,a=Math.min(e.length-n,4);o<a;++o)e[n+o]=t>>>8*(r?o:3-o)&255}function j(e,t,n,r,o,a){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function D(e,t,n,r,a){return a||j(e,0,n,4),o.write(e,t,n,r,23,4),n+4}function L(e,t,n,r,a){return a||j(e,0,n,8),o.write(e,t,n,r,52,8),n+8}u.prototype.slice=function(e,t){var n,r=this.length;if((e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e),u.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=u.prototype;else{var o=t-e;n=new u(o,void 0);for(var a=0;a<o;++a)n[a]=this[a+e]}return n},u.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||T(e,t,this.length);for(var r=this[e],o=1,a=0;++a<t&&(o*=256);)r+=this[e+a]*o;return r},u.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||T(e,t,this.length);for(var r=this[e+--t],o=1;t>0&&(o*=256);)r+=this[e+--t]*o;return r},u.prototype.readUInt8=function(e,t){return t||T(e,1,this.length),this[e]},u.prototype.readUInt16LE=function(e,t){return t||T(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUInt16BE=function(e,t){return t||T(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUInt32LE=function(e,t){return t||T(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},u.prototype.readUInt32BE=function(e,t){return t||T(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||T(e,t,this.length);for(var r=this[e],o=1,a=0;++a<t&&(o*=256);)r+=this[e+a]*o;return r>=(o*=128)&&(r-=Math.pow(2,8*t)),r},u.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||T(e,t,this.length);for(var r=t,o=1,a=this[e+--r];r>0&&(o*=256);)a+=this[e+--r]*o;return a>=(o*=128)&&(a-=Math.pow(2,8*t)),a},u.prototype.readInt8=function(e,t){return t||T(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},u.prototype.readInt16LE=function(e,t){t||T(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt16BE=function(e,t){t||T(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt32LE=function(e,t){return t||T(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function(e,t){return t||T(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readFloatLE=function(e,t){return t||T(e,4,this.length),o.read(this,e,!0,23,4)},u.prototype.readFloatBE=function(e,t){return t||T(e,4,this.length),o.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function(e,t){return t||T(e,8,this.length),o.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function(e,t){return t||T(e,8,this.length),o.read(this,e,!1,52,8)},u.prototype.writeUIntLE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||_(this,e,t,n,Math.pow(2,8*n)-1,0);var o=1,a=0;for(this[t]=255&e;++a<n&&(o*=256);)this[t+a]=e/o&255;return t+n},u.prototype.writeUIntBE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||_(this,e,t,n,Math.pow(2,8*n)-1,0);var o=n-1,a=1;for(this[t+o]=255&e;--o>=0&&(a*=256);)this[t+o]=e/a&255;return t+n},u.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,1,255,0),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},u.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):N(this,e,t,!0),t+2},u.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):N(this,e,t,!1),t+2},u.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):F(this,e,t,!0),t+4},u.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):F(this,e,t,!1),t+4},u.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t|=0,!r){var o=Math.pow(2,8*n-1);_(this,e,t,n,o-1,-o)}var a=0,s=1,i=0;for(this[t]=255&e;++a<n&&(s*=256);)e<0&&0===i&&0!==this[t+a-1]&&(i=1),this[t+a]=(e/s>>0)-i&255;return t+n},u.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t|=0,!r){var o=Math.pow(2,8*n-1);_(this,e,t,n,o-1,-o)}var a=n-1,s=1,i=0;for(this[t+a]=255&e;--a>=0&&(s*=256);)e<0&&0===i&&0!==this[t+a+1]&&(i=1),this[t+a]=(e/s>>0)-i&255;return t+n},u.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,1,127,-128),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},u.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):N(this,e,t,!0),t+2},u.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):N(this,e,t,!1),t+2},u.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):F(this,e,t,!0),t+4},u.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||_(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):F(this,e,t,!1),t+4},u.prototype.writeFloatLE=function(e,t,n){return D(this,e,t,!0,n)},u.prototype.writeFloatBE=function(e,t,n){return D(this,e,t,!1,n)},u.prototype.writeDoubleLE=function(e,t,n){return L(this,e,t,!0,n)},u.prototype.writeDoubleBE=function(e,t,n){return L(this,e,t,!1,n)},u.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o,a=r-n;if(this===e&&n<t&&t<r)for(o=a-1;o>=0;--o)e[o+t]=this[o+n];else if(a<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<a;++o)e[o+t]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+a),t);return a},u.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var o=e.charCodeAt(0);o<256&&(e=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!u.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var a;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(a=t;a<n;++a)this[a]=e;else{var s=u.isBuffer(e)?e:M(new u(e,r).toString()),i=s.length;for(a=0;a<n-t;++a)this[a+t]=s[a%i]}return this};var B=/[^+\/0-9A-Za-z-_]/g;function P(e){return e<16?"0"+e.toString(16):e.toString(16)}function M(e,t){var n;t=t||1/0;for(var r=e.length,o=null,a=[],s=0;s<r;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!o){if(n>56319){(t-=3)>-1&&a.push(239,191,189);continue}if(s+1===r){(t-=3)>-1&&a.push(239,191,189);continue}o=n;continue}if(n<56320){(t-=3)>-1&&a.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(t-=3)>-1&&a.push(239,191,189);if(o=null,n<128){if((t-=1)<0)break;a.push(n)}else if(n<2048){if((t-=2)<0)break;a.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;a.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;a.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return a}function U(e){return r.toByteArray(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(B,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function V(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);++o)t[o+n]=e[o];return o}}).call(this,n(18))},function(e,t,n){"use strict";var r=n(91);function o(){this.argTypes=[],this.shimArgs=[],this.arrayArgs=[],this.arrayBlockIndices=[],this.scalarArgs=[],this.offsetArgs=[],this.offsetArgIndex=[],this.indexArgs=[],this.shapeArgs=[],this.funcName="",this.pre=null,this.body=null,this.post=null,this.debug=!1}e.exports=function(e){var t=new o;t.pre=e.pre,t.body=e.body,t.post=e.post;var n=e.args.slice(0);t.argTypes=n;for(var a=0;a<n.length;++a){var s=n[a];if("array"===s||"object"==typeof s&&s.blockIndices){if(t.argTypes[a]="array",t.arrayArgs.push(a),t.arrayBlockIndices.push(s.blockIndices?s.blockIndices:0),t.shimArgs.push("array"+a),a<t.pre.args.length&&t.pre.args[a].count>0)throw new Error("cwise: pre() block may not reference array args");if(a<t.post.args.length&&t.post.args[a].count>0)throw new Error("cwise: post() block may not reference array args")}else if("scalar"===s)t.scalarArgs.push(a),t.shimArgs.push("scalar"+a);else if("index"===s){if(t.indexArgs.push(a),a<t.pre.args.length&&t.pre.args[a].count>0)throw new Error("cwise: pre() block may not reference array index");if(a<t.body.args.length&&t.body.args[a].lvalue)throw new Error("cwise: body() block may not write to array index");if(a<t.post.args.length&&t.post.args[a].count>0)throw new Error("cwise: post() block may not reference array index")}else if("shape"===s){if(t.shapeArgs.push(a),a<t.pre.args.length&&t.pre.args[a].lvalue)throw new Error("cwise: pre() block may not write to array shape");if(a<t.body.args.length&&t.body.args[a].lvalue)throw new Error("cwise: body() block may not write to array shape");if(a<t.post.args.length&&t.post.args[a].lvalue)throw new Error("cwise: post() block may not write to array shape")}else{if("object"!=typeof s||!s.offset)throw new Error("cwise: Unknown argument type "+n[a]);t.argTypes[a]="offset",t.offsetArgs.push({array:s.array,offset:s.offset}),t.offsetArgIndex.push(a)}}if(t.arrayArgs.length<=0)throw new Error("cwise: No array arguments specified");if(t.pre.args.length>n.length)throw new Error("cwise: Too many arguments in pre() block");if(t.body.args.length>n.length)throw new Error("cwise: Too many arguments in body() block");if(t.post.args.length>n.length)throw new Error("cwise: Too many arguments in post() block");return t.debug=!!e.printCode||!!e.debug,t.funcName=e.funcName||"cwise",t.blockSize=e.blockSize||64,r(t)}},function(e,t,n){"use strict";e.exports=function(e,t,n){return 0===e.length?e:t?(n||e.sort(t),function(e,t){for(var n=1,r=e.length,o=e[0],a=e[0],s=1;s<r;++s)if(a=o,t(o=e[s],a)){if(s===n){n++;continue}e[n++]=o}return e.length=n,e}(e,t)):(n||e.sort(),function(e){for(var t=1,n=e.length,r=e[0],o=e[0],a=1;a<n;++a,o=r)if(o=r,(r=e[a])!==o){if(a===t){t++;continue}e[t++]=r}return e.length=t,e}(e))}},function(e,t,n){"use strict";(function(e){var r=n(76),o=n(93),a=n(72).Buffer;e.__TYPEDARRAY_POOL||(e.__TYPEDARRAY_POOL={UINT8:o([32,0]),UINT16:o([32,0]),UINT32:o([32,0]),BIGUINT64:o([32,0]),INT8:o([32,0]),INT16:o([32,0]),INT32:o([32,0]),BIGINT64:o([32,0]),FLOAT:o([32,0]),DOUBLE:o([32,0]),DATA:o([32,0]),UINT8C:o([32,0]),BUFFER:o([32,0])});var s="undefined"!=typeof Uint8ClampedArray,i="undefined"!=typeof BigUint64Array,u="undefined"!=typeof BigInt64Array,c=e.__TYPEDARRAY_POOL;c.UINT8C||(c.UINT8C=o([32,0])),c.BIGUINT64||(c.BIGUINT64=o([32,0])),c.BIGINT64||(c.BIGINT64=o([32,0])),c.BUFFER||(c.BUFFER=o([32,0]));var l=c.DATA,h=c.BUFFER;function d(e){if(e){var t=e.length||e.byteLength,n=r.log2(t);l[n].push(e)}}function f(e){e=r.nextPow2(e);var t=r.log2(e),n=l[t];return n.length>0?n.pop():new ArrayBuffer(e)}function p(e){return new Uint8Array(f(e),0,e)}function g(e){return new Uint16Array(f(2*e),0,e)}function m(e){return new Uint32Array(f(4*e),0,e)}function b(e){return new Int8Array(f(e),0,e)}function x(e){return new Int16Array(f(2*e),0,e)}function y(e){return new Int32Array(f(4*e),0,e)}function v(e){return new Float32Array(f(4*e),0,e)}function w(e){return new Float64Array(f(8*e),0,e)}function C(e){return s?new Uint8ClampedArray(f(e),0,e):p(e)}function I(e){return i?new BigUint64Array(f(8*e),0,e):null}function E(e){return u?new BigInt64Array(f(8*e),0,e):null}function $(e){return new DataView(f(e),0,e)}function O(e){e=r.nextPow2(e);var t=r.log2(e),n=h[t];return n.length>0?n.pop():new a(e)}t.free=function(e){if(a.isBuffer(e))h[r.log2(e.length)].push(e);else{if("[object ArrayBuffer]"!==Object.prototype.toString.call(e)&&(e=e.buffer),!e)return;var t=e.length||e.byteLength,n=0|r.log2(t);l[n].push(e)}},t.freeUint8=t.freeUint16=t.freeUint32=t.freeBigUint64=t.freeInt8=t.freeInt16=t.freeInt32=t.freeBigInt64=t.freeFloat32=t.freeFloat=t.freeFloat64=t.freeDouble=t.freeUint8Clamped=t.freeDataView=function(e){d(e.buffer)},t.freeArrayBuffer=d,t.freeBuffer=function(e){h[r.log2(e.length)].push(e)},t.malloc=function(e,t){if(void 0===t||"arraybuffer"===t)return f(e);switch(t){case"uint8":return p(e);case"uint16":return g(e);case"uint32":return m(e);case"int8":return b(e);case"int16":return x(e);case"int32":return y(e);case"float":case"float32":return v(e);case"double":case"float64":return w(e);case"uint8_clamped":return C(e);case"bigint64":return E(e);case"biguint64":return I(e);case"buffer":return O(e);case"data":case"dataview":return $(e);default:return null}return null},t.mallocArrayBuffer=f,t.mallocUint8=p,t.mallocUint16=g,t.mallocUint32=m,t.mallocInt8=b,t.mallocInt16=x,t.mallocInt32=y,t.mallocFloat32=t.mallocFloat=v,t.mallocFloat64=t.mallocDouble=w,t.mallocUint8Clamped=C,t.mallocBigUint64=I,t.mallocBigInt64=E,t.mallocDataView=$,t.mallocBuffer=O,t.clearCache=function(){for(var e=0;e<32;++e)c.UINT8[e].length=0,c.UINT16[e].length=0,c.UINT32[e].length=0,c.INT8[e].length=0,c.INT16[e].length=0,c.INT32[e].length=0,c.FLOAT[e].length=0,c.DOUBLE[e].length=0,c.BIGUINT64[e].length=0,c.BIGINT64[e].length=0,c.UINT8C[e].length=0,l[e].length=0,h[e].length=0}}).call(this,n(18))},function(e,t,n){"use strict";function r(e){var t=32;return(e&=-e)&&t--,65535&e&&(t-=16),16711935&e&&(t-=8),252645135&e&&(t-=4),858993459&e&&(t-=2),1431655765&e&&(t-=1),t}t.INT_BITS=32,t.INT_MAX=2147483647,t.INT_MIN=-1<<31,t.sign=function(e){return(e>0)-(e<0)},t.abs=function(e){var t=e>>31;return(e^t)-t},t.min=function(e,t){return t^(e^t)&-(e<t)},t.max=function(e,t){return e^(e^t)&-(e<t)},t.isPow2=function(e){return!(e&e-1||!e)},t.log2=function(e){var t,n;return t=(e>65535)<<4,t|=n=((e>>>=t)>255)<<3,t|=n=((e>>>=n)>15)<<2,(t|=n=((e>>>=n)>3)<<1)|(e>>>=n)>>1},t.log10=function(e){return e>=1e9?9:e>=1e8?8:e>=1e7?7:e>=1e6?6:e>=1e5?5:e>=1e4?4:e>=1e3?3:e>=100?2:e>=10?1:0},t.popCount=function(e){return 16843009*((e=(858993459&(e-=e>>>1&1431655765))+(e>>>2&858993459))+(e>>>4)&252645135)>>>24},t.countTrailingZeros=r,t.nextPow2=function(e){return e+=0===e,--e,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,(e|=e>>>16)+1},t.prevPow2=function(e){return e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,(e|=e>>>16)-(e>>>1)},t.parity=function(e){return e^=e>>>16,e^=e>>>8,e^=e>>>4,27030>>>(e&=15)&1};var o=new Array(256);!function(e){for(var t=0;t<256;++t){var n=t,r=t,o=7;for(n>>>=1;n;n>>>=1)r<<=1,r|=1&n,--o;e[t]=r<<o&255}}(o),t.reverse=function(e){return o[255&e]<<24|o[e>>>8&255]<<16|o[e>>>16&255]<<8|o[e>>>24&255]},t.interleave2=function(e,t){return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e&=65535)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t&=65535)|t<<8))|t<<4))|t<<2))|t<<1))<<1},t.deinterleave2=function(e,t){return(e=65535&((e=16711935&((e=252645135&((e=858993459&((e=e>>>t&1431655765)|e>>>1))|e>>>2))|e>>>4))|e>>>16))<<16>>16},t.interleave3=function(e,t,n){return e=1227133513&((e=3272356035&((e=251719695&((e=4278190335&((e&=1023)|e<<16))|e<<8))|e<<4))|e<<2),(e|=(t=1227133513&((t=3272356035&((t=251719695&((t=4278190335&((t&=1023)|t<<16))|t<<8))|t<<4))|t<<2))<<1)|(n=1227133513&((n=3272356035&((n=251719695&((n=4278190335&((n&=1023)|n<<16))|n<<8))|n<<4))|n<<2))<<2},t.deinterleave3=function(e,t){return(e=1023&((e=4278190335&((e=251719695&((e=3272356035&((e=e>>>t&1227133513)|e>>>2))|e>>>4))|e>>>8))|e>>>16))<<22>>22},t.nextCombination=function(e){var t=e|e-1;return t+1|(~t&-~t)-1>>>r(e)+1}},,function(e,t,n){"use strict";var r=n(90),o=n(95),a=n(49),s=n(96)({args:["array","array","scalar","scalar","scalar"],body:function(e,t,n,r,o){var a=t*n;a<r&&(a=r),a>o&&(a=o)}});e.exports=function(e,t,n,i){void 0===n&&(n=-1/0),void 0===i&&(i=1/0);var u=t.shape,c=e.shape;if(t.shape.length!==e.shape.length)throw new Error("ndarray-resample: input and output arrays should have the same dimensions");var l,h=u.map((function(){return 0}));if(1===e.size)return(l=a.sum(t)/t.size)<n&&(l=n),l>i&&(l=i),void e.set.apply(e,h.concat(l));if(1===t.size)return(l=t.get.apply(t,h))<n&&(l=n),l>i&&(l=i),void a.assigns(e,l);for(var d=u.length,f=new Array(d),p=!1,g=0;g<d;g++)f[g]=Math.min(c[g],u[g]),c[g]>u[g]&&(p=!0);var m=o.malloc(u),b=o.malloc(u);a.assign(m,t),a.assigns(b,0),r(1,m,b);var x=m.lo,y=m.hi,v=o.malloc(c),w=o.malloc(c);p&&(a.assigns(v,0),a.assigns(w,0));var C=new Array(d),I=new Array(d),E=new Array(d),$=new Array(d);for(g=0;g<1<<d;++g){for(var O=0;O<d;++O)if(g&1<<O){if(C[O]=f[O]-(f[O]+1>>>1),0===C[O])continue;I[O]=c[O]-C[O],E[O]=u[O]-C[O],$[O]=1&f[O]?0:1}else C[O]=f[O]+1>>>1,I[O]=0,E[O]=0,$[O]=0;a.assign(y.apply(x.apply(v,I),C),y.apply(x.apply(m,E),C)),a.assign(x.apply(y.apply(x.apply(w,I),C),$),x.apply(y.apply(x.apply(b,E),C),$)),a.assigns(y.apply(y.apply(x.apply(w,I),C),$),0)}r(-1,v,w),s(e,v,e.size/t.size,n,i),o.free(m),o.free(b),o.free(v),o.free(w)}},function(e,t,n){"use strict";t.byteLength=function(e){var t=c(e),n=t[0],r=t[1];return 3*(n+r)/4-r},t.toByteArray=function(e){var t,n,r=c(e),s=r[0],i=r[1],u=new a(function(e,t,n){return 3*(t+n)/4-n}(0,s,i)),l=0,h=i>0?s-4:s;for(n=0;n<h;n+=4)t=o[e.charCodeAt(n)]<<18|o[e.charCodeAt(n+1)]<<12|o[e.charCodeAt(n+2)]<<6|o[e.charCodeAt(n+3)],u[l++]=t>>16&255,u[l++]=t>>8&255,u[l++]=255&t;2===i&&(t=o[e.charCodeAt(n)]<<2|o[e.charCodeAt(n+1)]>>4,u[l++]=255&t);1===i&&(t=o[e.charCodeAt(n)]<<10|o[e.charCodeAt(n+1)]<<4|o[e.charCodeAt(n+2)]>>2,u[l++]=t>>8&255,u[l++]=255&t);return u},t.fromByteArray=function(e){for(var t,n=e.length,o=n%3,a=[],s=0,i=n-o;s<i;s+=16383)a.push(l(e,s,s+16383>i?i:s+16383));1===o?(t=e[n-1],a.push(r[t>>2]+r[t<<4&63]+"==")):2===o&&(t=(e[n-2]<<8)+e[n-1],a.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"="));return a.join("")};for(var r=[],o=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,u=s.length;i<u;++i)r[i]=s[i],o[s.charCodeAt(i)]=i;function c(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function l(e,t,n){for(var o,a,s=[],i=t;i<n;i+=3)o=(e[i]<<16&16711680)+(e[i+1]<<8&65280)+(255&e[i+2]),s.push(r[(a=o)>>18&63]+r[a>>12&63]+r[a>>6&63]+r[63&a]);return s.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},function(e,t){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
t.read=function(e,t,n,r,o){var a,s,i=8*o-r-1,u=(1<<i)-1,c=u>>1,l=-7,h=n?o-1:0,d=n?-1:1,f=e[t+h];for(h+=d,a=f&(1<<-l)-1,f>>=-l,l+=i;l>0;a=256*a+e[t+h],h+=d,l-=8);for(s=a&(1<<-l)-1,a>>=-l,l+=r;l>0;s=256*s+e[t+h],h+=d,l-=8);if(0===a)a=1-c;else{if(a===u)return s?NaN:1/0*(f?-1:1);s+=Math.pow(2,r),a-=c}return(f?-1:1)*s*Math.pow(2,a-r)},t.write=function(e,t,n,r,o,a){var s,i,u,c=8*a-o-1,l=(1<<c)-1,h=l>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,f=r?0:a-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(i=isNaN(t)?1:0,s=l):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),(t+=s+h>=1?d/u:d*Math.pow(2,1-h))*u>=2&&(s++,u/=2),s+h>=l?(i=0,s=l):s+h>=1?(i=(t*u-1)*Math.pow(2,o),s+=h):(i=t*Math.pow(2,h-1)*Math.pow(2,o),s=0));o>=8;e[n+f]=255&i,f+=p,i/=256,o-=8);for(s=s<<o|i,c+=o;c>0;e[n+f]=255&s,f+=p,s/=256,c-=8);e[n+f-p]|=128*g}},function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return o}));
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const r="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:void 0!==e?e:e=>e();function o(){return new Promise(e=>r(()=>e()))}}).call(this,n(174).setImmediate)},,,,,,function(e,t,n){"use strict";e.exports=function(e){for(var t=new Array(e),n=0;n<e;++n)t[n]=n;return t}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(49),o=n(31),a=n(75),s=n(94);e.exports=function(e,t,n){var i,u,c=t.shape,l=c.length,h=1,d=new Array(l),f=0;for(i=l-1;i>=0;--i)if(d[i]=h,h*=c[i],f=Math.max(f,s.scratchMemory(c[i])),t.shape[i]!==n.shape[i])throw new Error("Shape mismatch, real and imaginary arrays must have same size");var p,g=4*h+f;p="array"===t.dtype||"float64"===t.dtype||"custom"===t.dtype?a.mallocDouble(g):a.mallocFloat(g);var m,b,x,y,v=o(p,c.slice(0),d,0),w=o(p,c.slice(0),d.slice(0),h),C=o(p,c.slice(0),d.slice(0),2*h),I=o(p,c.slice(0),d.slice(0),3*h),E=4*h;for(r.assign(v,t),r.assign(w,n),i=l-1;i>=0&&(s(e,h/c[i],c[i],p,v.offset,w.offset,E),0!==i);--i){for(b=1,x=C.stride,y=I.stride,u=i-1;u<l;++u)y[u]=x[u]=b,b*=c[u];for(u=i-2;u>=0;--u)y[u]=x[u]=b,b*=c[u];r.assign(C,v),r.assign(I,w),m=v,v=C,C=m,m=w,w=I,I=m}r.assign(t,v),r.assign(n,w),a.free(p)}},function(e,t,n){"use strict";var r=n(92);e.exports=function(e){var t=["'use strict'","var CACHED={}"],n=[],o=e.funcName+"_cwise_thunk";t.push(["return function ",o,"(",e.shimArgs.join(","),"){"].join(""));for(var a=[],s=[],i=[["array",e.arrayArgs[0],".shape.slice(",Math.max(0,e.arrayBlockIndices[0]),e.arrayBlockIndices[0]<0?","+e.arrayBlockIndices[0]+")":")"].join("")],u=[],c=[],l=0;l<e.arrayArgs.length;++l){var h=e.arrayArgs[l];n.push(["t",h,"=array",h,".dtype,","r",h,"=array",h,".order"].join("")),a.push("t"+h),a.push("r"+h),s.push("t"+h),s.push("r"+h+".join()"),i.push("array"+h+".data"),i.push("array"+h+".stride"),i.push("array"+h+".offset|0"),l>0&&(u.push("array"+e.arrayArgs[0]+".shape.length===array"+h+".shape.length+"+(Math.abs(e.arrayBlockIndices[0])-Math.abs(e.arrayBlockIndices[l]))),c.push("array"+e.arrayArgs[0]+".shape[shapeIndex+"+Math.max(0,e.arrayBlockIndices[0])+"]===array"+h+".shape[shapeIndex+"+Math.max(0,e.arrayBlockIndices[l])+"]"))}for(e.arrayArgs.length>1&&(t.push("if (!("+u.join(" && ")+")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),t.push("for(var shapeIndex=array"+e.arrayArgs[0]+".shape.length-"+Math.abs(e.arrayBlockIndices[0])+"; shapeIndex--\x3e0;) {"),t.push("if (!("+c.join(" && ")+")) throw new Error('cwise: Arrays do not all have the same shape!')"),t.push("}")),l=0;l<e.scalarArgs.length;++l)i.push("scalar"+e.scalarArgs[l]);return n.push(["type=[",s.join(","),"].join()"].join("")),n.push("proc=CACHED[type]"),t.push("var "+n.join(",")),t.push(["if(!proc){","CACHED[type]=proc=compile([",a.join(","),"])}","return proc(",i.join(","),")}"].join("")),e.debug&&console.log("-----Generated thunk:\n"+t.join("\n")+"\n----------"),new Function("compile",t.join("\n"))(r.bind(void 0,e))}},function(e,t,n){"use strict";var r=n(74);function o(e,t,n){var r,o,a=e.length,s=t.arrayArgs.length,i=t.indexArgs.length>0,u=[],c=[],l=0,h=0;for(r=0;r<a;++r)c.push(["i",r,"=0"].join(""));for(o=0;o<s;++o)for(r=0;r<a;++r)h=l,l=e[r],0===r?c.push(["d",o,"s",r,"=t",o,"p",l].join("")):c.push(["d",o,"s",r,"=(t",o,"p",l,"-s",h,"*t",o,"p",h,")"].join(""));for(c.length>0&&u.push("var "+c.join(",")),r=a-1;r>=0;--r)l=e[r],u.push(["for(i",r,"=0;i",r,"<s",l,";++i",r,"){"].join(""));for(u.push(n),r=0;r<a;++r){for(h=l,l=e[r],o=0;o<s;++o)u.push(["p",o,"+=d",o,"s",r].join(""));i&&(r>0&&u.push(["index[",h,"]-=s",h].join("")),u.push(["++index[",l,"]"].join(""))),u.push("}")}return u.join("\n")}function a(e,t,n){for(var r=e.body,o=[],a=[],s=0;s<e.args.length;++s){var i=e.args[s];if(!(i.count<=0)){var u=new RegExp(i.name,"g"),c="",l=t.arrayArgs.indexOf(s);switch(t.argTypes[s]){case"offset":var h=t.offsetArgIndex.indexOf(s);l=t.offsetArgs[h].array,c="+q"+h;case"array":c="p"+l+c;var d="l"+s,f="a"+l;if(0===t.arrayBlockIndices[l])1===i.count?"generic"===n[l]?i.lvalue?(o.push(["var ",d,"=",f,".get(",c,")"].join("")),r=r.replace(u,d),a.push([f,".set(",c,",",d,")"].join(""))):r=r.replace(u,[f,".get(",c,")"].join("")):r=r.replace(u,[f,"[",c,"]"].join("")):"generic"===n[l]?(o.push(["var ",d,"=",f,".get(",c,")"].join("")),r=r.replace(u,d),i.lvalue&&a.push([f,".set(",c,",",d,")"].join(""))):(o.push(["var ",d,"=",f,"[",c,"]"].join("")),r=r.replace(u,d),i.lvalue&&a.push([f,"[",c,"]=",d].join("")));else{for(var p=[i.name],g=[c],m=0;m<Math.abs(t.arrayBlockIndices[l]);m++)p.push("\\s*\\[([^\\]]+)\\]"),g.push("$"+(m+1)+"*t"+l+"b"+m);if(u=new RegExp(p.join(""),"g"),c=g.join("+"),"generic"===n[l])throw new Error("cwise: Generic arrays not supported in combination with blocks!");r=r.replace(u,[f,"[",c,"]"].join(""))}break;case"scalar":r=r.replace(u,"Y"+t.scalarArgs.indexOf(s));break;case"index":r=r.replace(u,"index");break;case"shape":r=r.replace(u,"shape")}}}return[o.join("\n"),r,a.join("\n")].join("\n").trim()}function s(e){for(var t=new Array(e.length),n=!0,r=0;r<e.length;++r){var o=e[r],a=o.match(/\d+/);a=a?a[0]:"",0===o.charAt(0)?t[r]="u"+o.charAt(1)+a:t[r]=o.charAt(0)+a,r>0&&(n=n&&t[r]===t[r-1])}return n?t[0]:t.join("")}e.exports=function(e,t){for(var n=t[1].length-Math.abs(e.arrayBlockIndices[0])|0,i=new Array(e.arrayArgs.length),u=new Array(e.arrayArgs.length),c=0;c<e.arrayArgs.length;++c)u[c]=t[2*c],i[c]=t[2*c+1];var l=[],h=[],d=[],f=[],p=[];for(c=0;c<e.arrayArgs.length;++c){e.arrayBlockIndices[c]<0?(d.push(0),f.push(n),l.push(n),h.push(n+e.arrayBlockIndices[c])):(d.push(e.arrayBlockIndices[c]),f.push(e.arrayBlockIndices[c]+n),l.push(0),h.push(e.arrayBlockIndices[c]));for(var g=[],m=0;m<i[c].length;m++)d[c]<=i[c][m]&&i[c][m]<f[c]&&g.push(i[c][m]-d[c]);p.push(g)}var b=["SS"],x=["'use strict'"],y=[];for(m=0;m<n;++m)y.push(["s",m,"=SS[",m,"]"].join(""));for(c=0;c<e.arrayArgs.length;++c){b.push("a"+c),b.push("t"+c),b.push("p"+c);for(m=0;m<n;++m)y.push(["t",c,"p",m,"=t",c,"[",d[c]+m,"]"].join(""));for(m=0;m<Math.abs(e.arrayBlockIndices[c]);++m)y.push(["t",c,"b",m,"=t",c,"[",l[c]+m,"]"].join(""))}for(c=0;c<e.scalarArgs.length;++c)b.push("Y"+c);if(e.shapeArgs.length>0&&y.push("shape=SS.slice(0)"),e.indexArgs.length>0){var v=new Array(n);for(c=0;c<n;++c)v[c]="0";y.push(["index=[",v.join(","),"]"].join(""))}for(c=0;c<e.offsetArgs.length;++c){var w=e.offsetArgs[c],C=[];for(m=0;m<w.offset.length;++m)0!==w.offset[m]&&(1===w.offset[m]?C.push(["t",w.array,"p",m].join("")):C.push([w.offset[m],"*t",w.array,"p",m].join("")));0===C.length?y.push("q"+c+"=0"):y.push(["q",c,"=",C.join("+")].join(""))}var I=r([].concat(e.pre.thisVars).concat(e.body.thisVars).concat(e.post.thisVars));for((y=y.concat(I)).length>0&&x.push("var "+y.join(",")),c=0;c<e.arrayArgs.length;++c)x.push("p"+c+"|=0");e.pre.body.length>3&&x.push(a(e.pre,e,u));var E=a(e.body,e,u),$=function(e){for(var t=0,n=e[0].length;t<n;){for(var r=1;r<e.length;++r)if(e[r][t]!==e[0][t])return t;++t}return t}(p);$<n?x.push(function(e,t,n,r){for(var a=t.length,s=n.arrayArgs.length,i=n.blockSize,u=n.indexArgs.length>0,c=[],l=0;l<s;++l)c.push(["var offset",l,"=p",l].join(""));for(l=e;l<a;++l)c.push(["for(var j"+l+"=SS[",t[l],"]|0;j",l,">0;){"].join("")),c.push(["if(j",l,"<",i,"){"].join("")),c.push(["s",t[l],"=j",l].join("")),c.push(["j",l,"=0"].join("")),c.push(["}else{s",t[l],"=",i].join("")),c.push(["j",l,"-=",i,"}"].join("")),u&&c.push(["index[",t[l],"]=j",l].join(""));for(l=0;l<s;++l){for(var h=["offset"+l],d=e;d<a;++d)h.push(["j",d,"*t",l,"p",t[d]].join(""));c.push(["p",l,"=(",h.join("+"),")"].join(""))}for(c.push(o(t,n,r)),l=e;l<a;++l)c.push("}");return c.join("\n")}($,p[0],e,E)):x.push(o(p[0],e,E)),e.post.body.length>3&&x.push(a(e.post,e,u)),e.debug&&console.log("-----Generated cwise routine for ",t,":\n"+x.join("\n")+"\n----------");var O=[e.funcName||"unnamed","_cwise_loop_",i[0].join("s"),"m",$,s(u)].join("");return new Function(["function ",O,"(",b.join(","),"){",x.join("\n"),"} return ",O].join(""))()}},function(e,t,n){"use strict";e.exports=function(e,t){switch(void 0===t&&(t=0),typeof e){case"number":if(e>0)return function(e,t){var n,r;for(n=new Array(e),r=0;r<e;++r)n[r]=t;return n}(0|e,t);break;case"object":if("number"==typeof e.length)return function e(t,n,r){var o=0|t[r];if(o<=0)return[];var a,s=new Array(o);if(r===t.length-1)for(a=0;a<o;++a)s[a]=n;else for(a=0;a<o;++a)s[a]=e(t,n,r+1);return s}(e,t,0)}return[]}},function(e,t,n){var r=n(76);function o(e,t,n,o,a,s){var i,u,c,l,h,d,f,p,g,m,b,x,y,v,w,C,I,E,$,O,k,R,S,A;for(e|=0,t|=0,a|=0,s|=0,i=n|=0,u=r.log2(i),E=0;E<t;++E){for(f=i>>1,h=0,c=0;c<i-1;c++){for(c<h&&(y=o[a+c],o[a+c]=o[a+h],o[a+h]=y,y=o[s+c],o[s+c]=o[s+h],o[s+h]=y),d=f;d<=h;)h-=d,d>>=1;h+=d}for(b=-1,x=0,m=1,p=0;p<u;p++){for(g=m,m<<=1,C=1,I=0,h=0;h<g;h++){for(c=h;c<i;c+=m)$=o[a+(l=c+g)],O=o[s+l],k=o[a+c],R=o[s+c],v=(S=C*($+O))-O*(C+I),w=S+(A=$*(I-C)),o[a+l]=k-v,o[s+l]=R-w,o[a+c]+=v,o[s+c]+=w;A=C*(x-b),C=(S=b*(C+I))-I*(b+x),I=S+A}x=Math.sqrt((1-b)/2),e<0&&(x=-x),b=Math.sqrt((1+b)/2)}if(e<0){var T=1/i;for(c=0;c<i;c++)o[a+c]*=T,o[s+c]*=T}a+=n,s+=n}}e.exports=function(e,t,n,a,s,i,u){e|=0,t|=0,n|=0,s|=0,i|=0,r.isPow2(n)?o(e,t,n,a,s,i):function(e,t,n,a,s,i,u){e|=0,t|=0,n|=0,s|=0,i|=0,u|=0;var c,l,h,d,f,p,g,m,b,x=r.nextPow2(2*n+1),y=u,v=y+n,w=v+n,C=w+x,I=C+x,E=I+x,$=-e*Math.PI/n;for(b=0;b<n;++b)l=$*(b*b%(2*n)),d=Math.cos(l),f=Math.sin(l),a[I+(x-b)]=a[I+b]=a[y+b]=d,a[E+(x-b)]=a[E+b]=a[v+b]=f;for(b=n;b<=x-n;++b)a[I+b]=0;for(b=n;b<=x-n;++b)a[E+b]=0;o(1,1,x,a,I,E),$=e<0?1/n:1;for(c=0;c<t;++c){for(b=0;b<n;++b)l=a[s+b],h=a[i+b],d=a[y+b],f=-a[v+b],p=d*(l+h),g=l*(f-d),m=h*(d+f),a[w+b]=p-m,a[C+b]=p+g;for(b=n;b<x;++b)a[w+b]=0;for(b=n;b<x;++b)a[C+b]=0;for(o(1,1,x,a,w,C),b=0;b<x;++b)l=a[w+b],h=a[C+b],d=a[I+b],f=a[E+b],p=d*(l+h),g=l*(f-d),m=h*(d+f),a[w+b]=p-m,a[C+b]=p+g;for(o(-1,1,x,a,w,C),b=0;b<n;++b)l=a[w+b],h=a[C+b],d=a[y+b],f=-a[v+b],p=d*(l+h),g=l*(f-d),m=h*(d+f),a[s+b]=$*(p-m),a[i+b]=$*(p+g);s+=n,i+=n}}(e,t,n,a,s,i,u)},e.exports.scratchMemory=function(e){return r.isPow2(e)?0:2*e+4*r.nextPow2(2*e+1)}},function(e,t,n){"use strict";var r=n(31),o=n(49),a=n(75);t.clone=function(e){var t=e.dtype;"generic"!==t&&"array"!==t||(t="double");var n=a.malloc(e.size,t),s=r(n,e.shape);return o.assign(s,e),s},t.malloc=function(e,t){t||(t="double");for(var n=1,o=new Array(e.length),s=e.length-1;s>=0;--s)o[s]=n,n*=e[s];return r(a.malloc(n,t),e,o,0)},t.free=function(e){"generic"!==e.dtype&&"array"!==e.dtype&&a.free(e.data)},t.zeros=function(e,t){t||(t="double");for(var n=1,o=new Array(e.length),s=e.length-1;s>=0;--s)o[s]=n,n*=e[s];var i=a.malloc(n,t);for(s=0;s<n;++s)i[s]=0;return r(i,e,o,0)},t.ones=function(e,t){t||(t="double");for(var n=1,o=new Array(e.length),s=e.length-1;s>=0;--s)o[s]=n,n*=e[s];var i=a.malloc(n,t);for(s=0;s<n;++s)i[s]=1;return r(i,e,o,0)},t.eye=function(e,t){var n,o;t||(t="double");var s=1,i=new Array(e.length);for(n=e.length-1;n>=0;--n)i[n]=s,s*=e[n];var u=a.malloc(s,t);for(n=0;n<s;++n)u[n]=0;var c=1/0,l=0;for(n=e.length-1;n>=0;n--)l+=i[n],c=Math.min(c,e[n]);for(n=0,o=0;n<c;n++,o+=l)u[o]=1;return r(u,e,i,0)}},function(e,t,n){"use strict";var r=n(97),o=n(73),a=["args","body"],s=["pre","post","printCode","funcName","blockSize"];e.exports=function(e){for(var t in e)a.indexOf(t)<0&&s.indexOf(t)<0&&console.warn("cwise: Unknown argument '"+t+"' passed to expression compiler");for(var n=0;n<a.length;++n)if(!e[a[n]])throw new Error("cwise: Missing argument: "+a[n]);return o({args:e.args,pre:r(e.pre||function(){}),body:r(e.body),post:r(e.post||function(){}),debug:!!e.printCode,funcName:e.funcName||e.body.name||"cwise",blockSize:e.blockSize||64})}},function(e,t,n){"use strict";(function(t){var r=n(98),o=n(74),a=0;function s(e,t,n){this.name=e,this.lvalue=t,this.rvalue=n,this.count=0}function i(e,t,n,r){this.body=e,this.args=t,this.thisVars=n,this.localVars=r}e.exports=function(e){for(var n=["(",e,")()"].join(""),u=r.parse(n,{range:!0}),c="_inline_"+a+++"_",l=function(e){for(var t=e.body[0].expression.callee.params,n=new Array(t.length),r=0;r<t.length;++r)n[r]=t[r].name;return n}(u),h=new Array(l.length),d=0;d<l.length;++d)h[d]=new s([c,"arg",d,"_"].join(""),!1,!1);for(var f=new Array(n.length),p=(d=0,n.length);d<p;++d)f[d]=n.charAt(d);var g,m=[],b=[];function x(e,t){for(var n=e.range[0],r=e.range[1],o=n+1;o<r;++o)f[o]="";f[n]=t}return function e(n,r){if(n.parent=r,"MemberExpression"===n.type)n.computed?(e(n.object,n),e(n.property,n)):"ThisExpression"===n.object.type?x(n,(y=n.property.name,v="this_"+y.replace(/\_/g,"__"),b.push(v),v)):e(n.object,n);else{if("ThisExpression"===n.type)throw new Error("cwise-parser: Computed this is not allowed");if("Identifier"===n.type){var o=n.name,a=l.indexOf(o);if(a>=0){var s=h[a],i=function(e){return"AssignmentExpression"===e.parent.type&&e.parent.left===e?"="===e.parent.operator?1:3:"UpdateExpression"===e.parent.type?3:2}(n);1&i&&(s.lvalue=!0),2&i&&(s.rvalue=!0),++s.count,x(n,s.name)}else(function(e){if("eval"===e)throw new Error("cwise-parser: eval() not allowed");return"undefined"!=typeof window?e in window:void 0!==t?e in t:"undefined"!=typeof self&&e in self})(o)||x(n,function(e){var t=c+e.replace(/\_/g,"__");return m.push(t),t}(o))}else if("Literal"===n.type)"string"==typeof n.value&&x(n,"'"+n.value.replace(/\_/g,"\\_").replace(/\'/g,"'")+"'");else{if("WithStatement"===n.type)throw new Error("cwise-parser: with() statements not allowed");for(var u=Object.keys(n),d=0,f=u.length;d<f;++d)if("parent"!==u[d]){var p=n[u[d]];if(p)if(p instanceof Array)for(var g=0;g<p.length;++g)p[g]&&"string"==typeof p[g].type&&e(p[g],n);else"string"==typeof p.type&&e(p,n)}}}var y,v}(u.body[0].expression.callee.body,void 0),o(m),o(b),new i((g=u.body[0].expression.callee.body,f.slice(g.range[0],g.range[1]).join("")),h,b,m)}}).call(this,n(18))},function(e,t,n){var r,o,a;!function(n,s){"use strict";o=[t],void 0===(a="function"==typeof(r=function(e){var t,n,r,o,a,s,i,u,c,l,h,d,f,p,g,m,b,x;function y(e,t){if(!e)throw new Error("ASSERT: "+t)}function v(e){return e>=48&&e<=57}function w(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function C(e){return"01234567".indexOf(e)>=0}function I(e){return 32===e||9===e||11===e||12===e||160===e||e>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)>=0}function E(e){return 10===e||13===e||8232===e||8233===e}function $(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||92===e||e>=128&&i.NonAsciiIdentifierStart.test(String.fromCharCode(e))}function O(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||92===e||e>=128&&i.NonAsciiIdentifierPart.test(String.fromCharCode(e))}function k(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}}function R(e){return"eval"===e||"arguments"===e}function S(e,t,n,r,o){var a;y("number"==typeof n,"Comment must have valid position"),b.lastCommentStart>=n||(b.lastCommentStart=n,a={type:e,value:t},x.range&&(a.range=[n,r]),x.loc&&(a.loc=o),x.comments.push(a),x.attachComment&&(x.leadingComments.push(a),x.trailingComments.push(a)))}function A(e){var t,n,r,o;for(t=h-e,n={start:{line:d,column:h-f-e}};h<p;)if(r=c.charCodeAt(h),++h,E(r))return x.comments&&(o=c.slice(t+e,h-1),n.end={line:d,column:h-f-1},S("Line",o,t,h-1,n)),13===r&&10===c.charCodeAt(h)&&++h,++d,void(f=h);x.comments&&(o=c.slice(t+e,h),n.end={line:d,column:h-f},S("Line",o,t,h,n))}function T(){var e,t,n,r;for(x.comments&&(e=h-2,t={start:{line:d,column:h-f-2}});h<p;)if(E(n=c.charCodeAt(h)))13===n&&10===c.charCodeAt(h+1)&&++h,++d,++h,f=h,h>=p&&q({},s.UnexpectedToken,"ILLEGAL");else if(42===n){if(47===c.charCodeAt(h+1))return++h,++h,void(x.comments&&(r=c.slice(e+2,h-2),t.end={line:d,column:h-f},S("Block",r,e,h,t)));++h}else++h;q({},s.UnexpectedToken,"ILLEGAL")}function _(){var e,t;for(t=0===h;h<p;)if(I(e=c.charCodeAt(h)))++h;else if(E(e))++h,13===e&&10===c.charCodeAt(h)&&++h,++d,f=h,t=!0;else if(47===e)if(47===(e=c.charCodeAt(h+1)))++h,++h,A(2),t=!0;else{if(42!==e)break;++h,++h,T()}else if(t&&45===e){if(45!==c.charCodeAt(h+1)||62!==c.charCodeAt(h+2))break;h+=3,A(3)}else{if(60!==e)break;if("!--"!==c.slice(h+1,h+4))break;++h,++h,++h,++h,A(4)}}function N(e){var t,n,r,o=0;for(n="u"===e?4:2,t=0;t<n;++t){if(!(h<p&&w(c[h])))return"";r=c[h++],o=16*o+"0123456789abcdef".indexOf(r.toLowerCase())}return String.fromCharCode(o)}function F(){var e,t;for(e=c.charCodeAt(h++),t=String.fromCharCode(e),92===e&&(117!==c.charCodeAt(h)&&q({},s.UnexpectedToken,"ILLEGAL"),++h,(e=N("u"))&&"\\"!==e&&$(e.charCodeAt(0))||q({},s.UnexpectedToken,"ILLEGAL"),t=e);h<p&&O(e=c.charCodeAt(h));)++h,t+=String.fromCharCode(e),92===e&&(t=t.substr(0,t.length-1),117!==c.charCodeAt(h)&&q({},s.UnexpectedToken,"ILLEGAL"),++h,(e=N("u"))&&"\\"!==e&&O(e.charCodeAt(0))||q({},s.UnexpectedToken,"ILLEGAL"),t+=e);return t}function j(){var e,n;return e=h,{type:1===(n=92===c.charCodeAt(h)?F():function(){var e,t;for(e=h++;h<p;){if(92===(t=c.charCodeAt(h)))return h=e,F();if(!O(t))break;++h}return c.slice(e,h)}()).length?t.Identifier:function(e){if(l&&k(e))return!0;switch(e.length){case 2:return"if"===e||"in"===e||"do"===e;case 3:return"var"===e||"for"===e||"new"===e||"try"===e||"let"===e;case 4:return"this"===e||"else"===e||"case"===e||"void"===e||"with"===e||"enum"===e;case 5:return"while"===e||"break"===e||"catch"===e||"throw"===e||"const"===e||"yield"===e||"class"===e||"super"===e;case 6:return"return"===e||"typeof"===e||"delete"===e||"switch"===e||"export"===e||"import"===e;case 7:return"default"===e||"finally"===e||"extends"===e;case 8:return"function"===e||"continue"===e||"debugger"===e;case 10:return"instanceof"===e;default:return!1}}(n)?t.Keyword:"null"===n?t.NullLiteral:"true"===n||"false"===n?t.BooleanLiteral:t.Identifier,value:n,lineNumber:d,lineStart:f,start:e,end:h}}function D(){var e,n,r,o,a=h,i=c.charCodeAt(h),u=c[h];switch(i){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++h,x.tokenize&&(40===i?x.openParenToken=x.tokens.length:123===i&&(x.openCurlyToken=x.tokens.length)),{type:t.Punctuator,value:String.fromCharCode(i),lineNumber:d,lineStart:f,start:a,end:h};default:if(61===(e=c.charCodeAt(h+1)))switch(i){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return h+=2,{type:t.Punctuator,value:String.fromCharCode(i)+String.fromCharCode(e),lineNumber:d,lineStart:f,start:a,end:h};case 33:case 61:return h+=2,61===c.charCodeAt(h)&&++h,{type:t.Punctuator,value:c.slice(a,h),lineNumber:d,lineStart:f,start:a,end:h}}}return">>>="===(o=c.substr(h,4))?{type:t.Punctuator,value:o,lineNumber:d,lineStart:f,start:a,end:h+=4}:">>>"===(r=o.substr(0,3))||"<<="===r||">>="===r?{type:t.Punctuator,value:r,lineNumber:d,lineStart:f,start:a,end:h+=3}:u===(n=r.substr(0,2))[1]&&"+-<>&|".indexOf(u)>=0||"=>"===n?{type:t.Punctuator,value:n,lineNumber:d,lineStart:f,start:a,end:h+=2}:"<>=!+-*%&|^/".indexOf(u)>=0?(++h,{type:t.Punctuator,value:u,lineNumber:d,lineStart:f,start:a,end:h}):void q({},s.UnexpectedToken,"ILLEGAL")}function L(){var e,n,r;if(y(v((r=c[h]).charCodeAt(0))||"."===r,"Numeric literal must start with a decimal digit or a decimal point"),n=h,e="","."!==r){if(e=c[h++],r=c[h],"0"===e){if("x"===r||"X"===r)return++h,function(e){for(var n="";h<p&&w(c[h]);)n+=c[h++];return 0===n.length&&q({},s.UnexpectedToken,"ILLEGAL"),$(c.charCodeAt(h))&&q({},s.UnexpectedToken,"ILLEGAL"),{type:t.NumericLiteral,value:parseInt("0x"+n,16),lineNumber:d,lineStart:f,start:e,end:h}}(n);if(C(r)&&function(){var e,t;for(e=h+1;e<p;++e){if("8"===(t=c[e])||"9"===t)return!1;if(!C(t))return!0}return!0}())return function(e){for(var n="0"+c[h++];h<p&&C(c[h]);)n+=c[h++];return($(c.charCodeAt(h))||v(c.charCodeAt(h)))&&q({},s.UnexpectedToken,"ILLEGAL"),{type:t.NumericLiteral,value:parseInt(n,8),octal:!0,lineNumber:d,lineStart:f,start:e,end:h}}(n)}for(;v(c.charCodeAt(h));)e+=c[h++];r=c[h]}if("."===r){for(e+=c[h++];v(c.charCodeAt(h));)e+=c[h++];r=c[h]}if("e"===r||"E"===r)if(e+=c[h++],"+"!==(r=c[h])&&"-"!==r||(e+=c[h++]),v(c.charCodeAt(h)))for(;v(c.charCodeAt(h));)e+=c[h++];else q({},s.UnexpectedToken,"ILLEGAL");return $(c.charCodeAt(h))&&q({},s.UnexpectedToken,"ILLEGAL"),{type:t.NumericLiteral,value:parseFloat(e),lineNumber:d,lineStart:f,start:n,end:h}}function B(){var e,n,r,o;return m=null,_(),e=h,n=function(){var e,t,n,r;for(y("/"===(e=c[h]),"Regular expression literal must start with a slash"),t=c[h++],n=!1,r=!1;h<p;)if(t+=e=c[h++],"\\"===e)E((e=c[h++]).charCodeAt(0))&&q({},s.UnterminatedRegExp),t+=e;else if(E(e.charCodeAt(0)))q({},s.UnterminatedRegExp);else if(n)"]"===e&&(n=!1);else{if("/"===e){r=!0;break}"["===e&&(n=!0)}return r||q({},s.UnterminatedRegExp),{value:t.substr(1,t.length-2),literal:t}}(),r=function(){var e,t,n,r;for(t="",n="";h<p&&O((e=c[h]).charCodeAt(0));)if(++h,"\\"===e&&h<p)if("u"===(e=c[h])){if(r=++h,e=N("u"))for(n+=e,t+="\\u";r<h;++r)t+=c[r];else h=r,n+="u",t+="\\u";H({},s.UnexpectedToken,"ILLEGAL")}else t+="\\",H({},s.UnexpectedToken,"ILLEGAL");else n+=e,t+=e;return{value:n,literal:t}}(),o=function(e,t){var n;try{n=new RegExp(e,t)}catch(e){q({},s.InvalidRegExp)}return n}(n.value,r.value),x.tokenize?{type:t.RegularExpression,value:o,lineNumber:d,lineStart:f,start:e,end:h}:{literal:n.literal+r.literal,value:o,start:e,end:h}}function P(){var e,t,n,r;return _(),e=h,t={start:{line:d,column:h-f}},n=B(),t.end={line:d,column:h-f},x.tokenize||(x.tokens.length>0&&(r=x.tokens[x.tokens.length-1]).range[0]===e&&"Punctuator"===r.type&&("/"!==r.value&&"/="!==r.value||x.tokens.pop()),x.tokens.push({type:"RegularExpression",value:n.literal,range:[e,h],loc:t})),n}function M(){var e;return _(),h>=p?{type:t.EOF,lineNumber:d,lineStart:f,start:h,end:h}:$(e=c.charCodeAt(h))?j():40===e||41===e||59===e?D():39===e||34===e?function(){var e,n,r,o,a,i,u,l,g="",m=!1;for(u=d,l=f,y("'"===(e=c[h])||'"'===e,"String literal must starts with a quote"),n=h,++h;h<p;){if((r=c[h++])===e){e="";break}if("\\"===r)if((r=c[h++])&&E(r.charCodeAt(0)))++d,"\r"===r&&"\n"===c[h]&&++h,f=h;else switch(r){case"u":case"x":i=h,(a=N(r))?g+=a:(h=i,g+=r);break;case"n":g+="\n";break;case"r":g+="\r";break;case"t":g+="\t";break;case"b":g+="\b";break;case"f":g+="\f";break;case"v":g+="\v";break;default:C(r)?(0!==(o="01234567".indexOf(r))&&(m=!0),h<p&&C(c[h])&&(m=!0,o=8*o+"01234567".indexOf(c[h++]),"0123".indexOf(r)>=0&&h<p&&C(c[h])&&(o=8*o+"01234567".indexOf(c[h++]))),g+=String.fromCharCode(o)):g+=r}else{if(E(r.charCodeAt(0)))break;g+=r}}return""!==e&&q({},s.UnexpectedToken,"ILLEGAL"),{type:t.StringLiteral,value:g,octal:m,startLineNumber:u,startLineStart:l,lineNumber:d,lineStart:f,start:n,end:h}}():46===e?v(c.charCodeAt(h+1))?L():D():v(e)?L():x.tokenize&&47===e?function(){var e,t;if(!(e=x.tokens[x.tokens.length-1]))return P();if("Punctuator"===e.type){if("]"===e.value)return D();if(")"===e.value)return!(t=x.tokens[x.openParenToken-1])||"Keyword"!==t.type||"if"!==t.value&&"while"!==t.value&&"for"!==t.value&&"with"!==t.value?D():P();if("}"===e.value){if(x.tokens[x.openCurlyToken-3]&&"Keyword"===x.tokens[x.openCurlyToken-3].type){if(!(t=x.tokens[x.openCurlyToken-4]))return D()}else{if(!x.tokens[x.openCurlyToken-4]||"Keyword"!==x.tokens[x.openCurlyToken-4].type)return D();if(!(t=x.tokens[x.openCurlyToken-5]))return P()}return r.indexOf(t.value)>=0?D():P()}return P()}return"Keyword"===e.type&&"this"!==e.value?P():D()}():D()}function U(){var e,r,o;return _(),e={start:{line:d,column:h-f}},r=M(),e.end={line:d,column:h-f},r.type!==t.EOF&&(o=c.slice(r.start,r.end),x.tokens.push({type:n[r.type],value:o,range:[r.start,r.end],loc:e})),r}function V(){var e;return h=(e=m).end,d=e.lineNumber,f=e.lineStart,m=void 0!==x.tokens?U():M(),h=e.end,d=e.lineNumber,f=e.lineStart,e}function z(){var e,t,n;e=h,t=d,n=f,m=void 0!==x.tokens?U():M(),h=e,d=t,f=n}function W(e,t){this.line=e,this.column=t}function G(e,t,n,r){this.start=new W(e,t),this.end=new W(n,r)}function X(){var e,t,n,r;return e=h,t=d,n=f,_(),r=d!==t,h=e,d=t,f=n,r}function q(e,t){var n,r=Array.prototype.slice.call(arguments,2),o=t.replace(/%(\d)/g,(function(e,t){return y(t<r.length,"Message reference must be in range"),r[t]}));throw"number"==typeof e.lineNumber?((n=new Error("Line "+e.lineNumber+": "+o)).index=e.start,n.lineNumber=e.lineNumber,n.column=e.start-f+1):((n=new Error("Line "+d+": "+o)).index=h,n.lineNumber=d,n.column=h-f+1),n.description=o,n}function H(){try{q.apply(null,arguments)}catch(e){if(!x.errors)throw e;x.errors.push(e)}}function K(e){if(e.type===t.EOF&&q(e,s.UnexpectedEOS),e.type===t.NumericLiteral&&q(e,s.UnexpectedNumber),e.type===t.StringLiteral&&q(e,s.UnexpectedString),e.type===t.Identifier&&q(e,s.UnexpectedIdentifier),e.type===t.Keyword){if(function(e){switch(e){case"class":case"enum":case"export":case"extends":case"import":case"super":return!0;default:return!1}}(e.value))q(e,s.UnexpectedReserved);else if(l&&k(e.value))return void H(e,s.StrictReservedWord);q(e,s.UnexpectedToken,e.value)}q(e,s.UnexpectedToken,e.value)}function Y(e){var n=V();n.type===t.Punctuator&&n.value===e||K(n)}function Q(e){var n=V();n.type===t.Keyword&&n.value===e||K(n)}function J(e){return m.type===t.Punctuator&&m.value===e}function Z(e){return m.type===t.Keyword&&m.value===e}function ee(){var e,n=h,r=d,o=f,a=m;if(59===c.charCodeAt(h)||J(";"))V();else{if(e=d,_(),d!==e)return h=n,d=r,f=o,void(m=a);m.type===t.EOF||J("}")||K(m)}}function te(e){return e.type===o.Identifier||e.type===o.MemberExpression}function ne(e,t){var n,r,o;return n=l,o=m,r=$e(),t&&l&&R(e[0].name)&&H(t,s.StrictParamName),l=n,g.markEnd(g.createFunctionExpression(null,e,[],r),o)}function re(){var e,n;return n=m,(e=V()).type===t.StringLiteral||e.type===t.NumericLiteral?(l&&e.octal&&H(e,s.StrictOctalLiteral),g.markEnd(g.createLiteral(e),n)):g.markEnd(g.createIdentifier(e.value),n)}function oe(){var e,n,r,o,a,i;return i=m,(e=m).type===t.Identifier?(r=re(),"get"!==e.value||J(":")?"set"!==e.value||J(":")?(Y(":"),o=ge(),g.markEnd(g.createProperty("init",r,o),i)):(n=re(),Y("("),(e=m).type!==t.Identifier?(Y(")"),H(e,s.UnexpectedToken,e.value),o=ne([])):(a=[xe()],Y(")"),o=ne(a,e)),g.markEnd(g.createProperty("set",n,o),i)):(n=re(),Y("("),Y(")"),o=ne([]),g.markEnd(g.createProperty("get",n,o),i))):e.type!==t.EOF&&e.type!==t.Punctuator?(n=re(),Y(":"),o=ge(),g.markEnd(g.createProperty("init",n,o),i)):void K(e)}function ae(){var e,n,r,i;if(J("("))return function(){var e;return Y("("),e=me(),Y(")"),e}();if(J("["))return function(){var e,t=[];for(e=m,Y("[");!J("]");)J(",")?(V(),t.push(null)):(t.push(ge()),J("]")||Y(","));return V(),g.markEnd(g.createArrayExpression(t),e)}();if(J("{"))return function(){var e,t,n,r,i,u=[],c={},h=String;for(i=m,Y("{");!J("}");)t=(e=oe()).key.type===o.Identifier?e.key.name:h(e.key.value),r="init"===e.kind?a.Data:"get"===e.kind?a.Get:a.Set,n="$"+t,Object.prototype.hasOwnProperty.call(c,n)?(c[n]===a.Data?l&&r===a.Data?H({},s.StrictDuplicateProperty):r!==a.Data&&H({},s.AccessorDataProperty):r===a.Data?H({},s.AccessorDataProperty):c[n]&r&&H({},s.AccessorGetSet),c[n]|=r):c[n]=r,u.push(e),J("}")||Y(",");return Y("}"),g.markEnd(g.createObjectExpression(u),i)}();if(e=m.type,i=m,e===t.Identifier)r=g.createIdentifier(V().value);else if(e===t.StringLiteral||e===t.NumericLiteral)l&&m.octal&&H(m,s.StrictOctalLiteral),r=g.createLiteral(V());else if(e===t.Keyword){if(Z("function"))return function(){var e,t,n,r,o,a,i,u,c,h=null;c=m,Q("function"),J("(")||(e=m,h=xe(),l?R(e.value)&&H(e,s.StrictFunctionName):R(e.value)?(n=e,r=s.StrictFunctionName):k(e.value)&&(n=e,r=s.StrictReservedWord));o=Oe(n),a=o.params,t=o.stricted,n=o.firstRestricted,o.message&&(r=o.message);u=l,i=$e(),l&&n&&q(n,r);l&&t&&H(t,r);return l=u,g.markEnd(g.createFunctionExpression(h,a,[],i),c)}();Z("this")?(V(),r=g.createThisExpression()):K(V())}else e===t.BooleanLiteral?((n=V()).value="true"===n.value,r=g.createLiteral(n)):e===t.NullLiteral?((n=V()).value=null,r=g.createLiteral(n)):J("/")||J("/=")?(r=void 0!==x.tokens?g.createLiteral(P()):g.createLiteral(B()),z()):K(V());return g.markEnd(r,i)}function se(){var e=[];if(Y("("),!J(")"))for(;h<p&&(e.push(ge()),!J(")"));)Y(",");return Y(")"),e}function ie(){var e,n;return n=m,function(e){return e.type===t.Identifier||e.type===t.Keyword||e.type===t.BooleanLiteral||e.type===t.NullLiteral}(e=V())||K(e),g.markEnd(g.createIdentifier(e.value),n)}function ue(){return Y("."),ie()}function ce(){var e;return Y("["),e=me(),Y("]"),e}function le(){var e,t,n;return n=m,Q("new"),e=function(){var e,t,n;y(b.allowIn,"callee of new expression always allow in keyword."),n=m,e=Z("new")?le():ae();for(;J(".")||J("[");)J("[")?(t=ce(),e=g.createMemberExpression("[",e,t)):(t=ue(),e=g.createMemberExpression(".",e,t)),g.markEnd(e,n);return e}(),t=J("(")?se():[],g.markEnd(g.createNewExpression(e,t),n)}function he(){var e,n,r=m;return e=function(){var e,t,n,r,o=b.allowIn;for(r=m,b.allowIn=!0,e=Z("new")?le():ae();;){if(J("."))n=ue(),e=g.createMemberExpression(".",e,n);else if(J("("))t=se(),e=g.createCallExpression(e,t);else{if(!J("["))break;n=ce(),e=g.createMemberExpression("[",e,n)}g.markEnd(e,r)}return b.allowIn=o,e}(),m.type===t.Punctuator&&(!J("++")&&!J("--")||X()||(l&&e.type===o.Identifier&&R(e.name)&&H({},s.StrictLHSPostfix),te(e)||H({},s.InvalidLHSInAssignment),n=V(),e=g.markEnd(g.createPostfixExpression(n.value,e),r))),e}function de(){var e,n,r;return m.type!==t.Punctuator&&m.type!==t.Keyword?n=he():J("++")||J("--")?(r=m,e=V(),n=de(),l&&n.type===o.Identifier&&R(n.name)&&H({},s.StrictLHSPrefix),te(n)||H({},s.InvalidLHSInAssignment),n=g.createUnaryExpression(e.value,n),n=g.markEnd(n,r)):J("+")||J("-")||J("~")||J("!")?(r=m,e=V(),n=de(),n=g.createUnaryExpression(e.value,n),n=g.markEnd(n,r)):Z("delete")||Z("void")||Z("typeof")?(r=m,e=V(),n=de(),n=g.createUnaryExpression(e.value,n),n=g.markEnd(n,r),l&&"delete"===n.operator&&n.argument.type===o.Identifier&&H({},s.StrictDelete)):n=he(),n}function fe(e,n){var r=0;if(e.type!==t.Punctuator&&e.type!==t.Keyword)return 0;switch(e.value){case"||":r=1;break;case"&&":r=2;break;case"|":r=3;break;case"^":r=4;break;case"&":r=5;break;case"==":case"!=":case"===":case"!==":r=6;break;case"<":case">":case"<=":case">=":case"instanceof":r=7;break;case"in":r=n?7:0;break;case"<<":case">>":case">>>":r=8;break;case"+":case"-":r=9;break;case"*":case"/":case"%":r=11}return r}function pe(){var e,t,n,r,o;return o=m,e=function(){var e,t,n,r,o,a,s,i,u,c;if(e=m,u=de(),0===(o=fe(r=m,b.allowIn)))return u;for(r.prec=o,V(),t=[e,m],a=[u,r,s=de()];(o=fe(m,b.allowIn))>0;){for(;a.length>2&&o<=a[a.length-2].prec;)s=a.pop(),i=a.pop().value,u=a.pop(),n=g.createBinaryExpression(i,u,s),t.pop(),e=t[t.length-1],g.markEnd(n,e),a.push(n);(r=V()).prec=o,a.push(r),t.push(m),n=de(),a.push(n)}for(n=a[c=a.length-1],t.pop();c>1;)n=g.createBinaryExpression(a[c-1].value,a[c-2],n),c-=2,e=t.pop(),g.markEnd(n,e);return n}(),J("?")&&(V(),t=b.allowIn,b.allowIn=!0,n=ge(),b.allowIn=t,Y(":"),r=ge(),e=g.createConditionalExpression(e,n,r),g.markEnd(e,o)),e}function ge(){var e,n,r,a,i,u;return e=m,i=m,a=n=pe(),m.type!==t.Punctuator||"="!==(u=m.value)&&"*="!==u&&"/="!==u&&"%="!==u&&"+="!==u&&"-="!==u&&"<<="!==u&&">>="!==u&&">>>="!==u&&"&="!==u&&"^="!==u&&"|="!==u||(te(n)||H({},s.InvalidLHSInAssignment),l&&n.type===o.Identifier&&R(n.name)&&H(e,s.StrictLHSAssignment),e=V(),r=ge(),a=g.markEnd(g.createAssignmentExpression(e.value,n,r),i)),a}function me(){var e,t=m;if(e=ge(),J(",")){for(e=g.createSequenceExpression([e]);h<p&&J(",");)V(),e.expressions.push(ge());g.markEnd(e,t)}return e}function be(){var e,t;return t=m,Y("{"),e=function(){for(var e,t=[];h<p&&!J("}")&&void 0!==(e=Re());)t.push(e);return t}(),Y("}"),g.markEnd(g.createBlockStatement(e),t)}function xe(){var e,n;return n=m,(e=V()).type!==t.Identifier&&K(e),g.markEnd(g.createIdentifier(e.value),n)}function ye(e){var t,n,r=null;return n=m,t=xe(),l&&R(t.name)&&H({},s.StrictVarName),"const"===e?(Y("="),r=ge()):J("=")&&(V(),r=ge()),g.markEnd(g.createVariableDeclarator(t,r),n)}function ve(e){var t=[];do{if(t.push(ye(e)),!J(","))break;V()}while(h<p);return t}function we(){var e,t,n,r,o,a,i,u,c,l,h=b.allowIn;return e=t=n=null,Q("for"),Y("("),J(";")?V():(Z("var")||Z("let")?(b.allowIn=!1,l=m,u=V(),c=ve(),e=g.markEnd(g.createVariableDeclaration(c,u.value),l),b.allowIn=h,1===e.declarations.length&&Z("in")&&(V(),r=e,o=me(),e=null)):(b.allowIn=!1,e=me(),b.allowIn=h,Z("in")&&(te(e)||H({},s.InvalidLHSInForIn),V(),r=e,o=me(),e=null)),void 0===r&&Y(";")),void 0===r&&(J(";")||(t=me()),Y(";"),J(")")||(n=me())),Y(")"),i=b.inIteration,b.inIteration=!0,a=Ee(),b.inIteration=i,void 0===r?g.createForStatement(e,t,n,a):g.createForInStatement(r,o,a)}function Ce(){var e,t,n,r=[];for(n=m,Z("default")?(V(),e=null):(Q("case"),e=me()),Y(":");h<p&&!(J("}")||Z("default")||Z("case"));)t=Ee(),r.push(t);return g.markEnd(g.createSwitchCase(e,r),n)}function Ie(){var e,t,n,r,o=[],a=null;return Q("try"),e=be(),Z("catch")&&o.push((r=m,Q("catch"),Y("("),J(")")&&K(m),t=xe(),l&&R(t.name)&&H({},s.StrictCatchVariable),Y(")"),n=be(),g.markEnd(g.createCatchClause(t,n),r))),Z("finally")&&(V(),a=be()),0!==o.length||a||q({},s.NoCatchOrFinally),g.createTryStatement(e,[],o,a)}function Ee(){var e,n,r,a,i,u,d,f,x,y=m.type;if(y===t.EOF&&K(m),y===t.Punctuator&&"{"===m.value)return be();if(a=m,y===t.Punctuator)switch(m.value){case";":return g.markEnd((Y(";"),g.createEmptyStatement()),a);case"(":return g.markEnd(function(){var e=me();return ee(),g.createExpressionStatement(e)}(),a)}if(y===t.Keyword)switch(m.value){case"break":return g.markEnd(function(){var e,n=null;return Q("break"),59===c.charCodeAt(h)?(V(),b.inIteration||b.inSwitch||q({},s.IllegalBreak),g.createBreakStatement(null)):X()?(b.inIteration||b.inSwitch||q({},s.IllegalBreak),g.createBreakStatement(null)):(m.type===t.Identifier&&(e="$"+(n=xe()).name,Object.prototype.hasOwnProperty.call(b.labelSet,e)||q({},s.UnknownLabel,n.name)),ee(),null!==n||b.inIteration||b.inSwitch||q({},s.IllegalBreak),g.createBreakStatement(n))}(),a);case"continue":return g.markEnd(function(){var e,n=null;return Q("continue"),59===c.charCodeAt(h)?(V(),b.inIteration||q({},s.IllegalContinue),g.createContinueStatement(null)):X()?(b.inIteration||q({},s.IllegalContinue),g.createContinueStatement(null)):(m.type===t.Identifier&&(e="$"+(n=xe()).name,Object.prototype.hasOwnProperty.call(b.labelSet,e)||q({},s.UnknownLabel,n.name)),ee(),null!==n||b.inIteration||q({},s.IllegalContinue),g.createContinueStatement(n))}(),a);case"debugger":return g.markEnd((Q("debugger"),ee(),g.createDebuggerStatement()),a);case"do":return g.markEnd((Q("do"),x=b.inIteration,b.inIteration=!0,d=Ee(),b.inIteration=x,Q("while"),Y("("),f=me(),Y(")"),J(";")&&V(),g.createDoWhileStatement(d,f)),a);case"for":return g.markEnd(we(),a);case"function":return g.markEnd(ke(),a);case"if":return g.markEnd(function(){var e,t,n;return Q("if"),Y("("),e=me(),Y(")"),t=Ee(),Z("else")?(V(),n=Ee()):n=null,g.createIfStatement(e,t,n)}(),a);case"return":return g.markEnd((u=null,Q("return"),b.inFunctionBody||H({},s.IllegalReturn),32===c.charCodeAt(h)&&$(c.charCodeAt(h+1))?(u=me(),ee(),g.createReturnStatement(u)):X()?g.createReturnStatement(null):(J(";")||J("}")||m.type===t.EOF||(u=me()),ee(),g.createReturnStatement(u))),a);case"switch":return g.markEnd(function(){var e,t,n,r,o;if(Q("switch"),Y("("),e=me(),Y(")"),Y("{"),t=[],J("}"))return V(),g.createSwitchStatement(e,t);for(r=b.inSwitch,b.inSwitch=!0,o=!1;h<p&&!J("}");)null===(n=Ce()).test&&(o&&q({},s.MultipleDefaultsInSwitch),o=!0),t.push(n);return b.inSwitch=r,Y("}"),g.createSwitchStatement(e,t)}(),a);case"throw":return g.markEnd(function(){var e;return Q("throw"),X()&&q({},s.NewlineAfterThrow),e=me(),ee(),g.createThrowStatement(e)}(),a);case"try":return g.markEnd(Ie(),a);case"var":return g.markEnd((Q("var"),i=ve(),ee(),g.createVariableDeclaration(i,"var")),a);case"while":return g.markEnd(function(){var e,t,n;return Q("while"),Y("("),e=me(),Y(")"),n=b.inIteration,b.inIteration=!0,t=Ee(),b.inIteration=n,g.createWhileStatement(e,t)}(),a);case"with":return g.markEnd(function(){var e,t;return l&&(_(),H({},s.StrictModeWith)),Q("with"),Y("("),e=me(),Y(")"),t=Ee(),g.createWithStatement(e,t)}(),a)}return(e=me()).type===o.Identifier&&J(":")?(V(),r="$"+e.name,Object.prototype.hasOwnProperty.call(b.labelSet,r)&&q({},s.Redeclaration,"Label",e.name),b.labelSet[r]=!0,n=Ee(),delete b.labelSet[r],g.markEnd(g.createLabeledStatement(e,n),a)):(ee(),g.markEnd(g.createExpressionStatement(e),a))}function $e(){var e,n,r,a,i,u,d,f,x=[];for(f=m,Y("{");h<p&&m.type===t.StringLiteral&&(n=m,e=Re(),x.push(e),e.expression.type===o.Literal);)"use strict"===c.slice(n.start+1,n.end-1)?(l=!0,r&&H(r,s.StrictOctalLiteral)):!r&&n.octal&&(r=n);for(a=b.labelSet,i=b.inIteration,u=b.inSwitch,d=b.inFunctionBody,b.labelSet={},b.inIteration=!1,b.inSwitch=!1,b.inFunctionBody=!0;h<p&&!J("}")&&void 0!==(e=Re());)x.push(e);return Y("}"),b.labelSet=a,b.inIteration=i,b.inSwitch=u,b.inFunctionBody=d,g.markEnd(g.createBlockStatement(x),f)}function Oe(e){var t,n,r,o,a,i,u=[];if(Y("("),!J(")"))for(o={};h<p&&(n=m,t=xe(),a="$"+n.value,l?(R(n.value)&&(r=n,i=s.StrictParamName),Object.prototype.hasOwnProperty.call(o,a)&&(r=n,i=s.StrictParamDupe)):e||(R(n.value)?(e=n,i=s.StrictParamName):k(n.value)?(e=n,i=s.StrictReservedWord):Object.prototype.hasOwnProperty.call(o,a)&&(e=n,i=s.StrictParamDupe)),u.push(t),o[a]=!0,!J(")"));)Y(",");return Y(")"),{params:u,stricted:r,firstRestricted:e,message:i}}function ke(){var e,t,n,r,o,a,i,u,c,h;return h=m,Q("function"),r=m,e=xe(),l?R(r.value)&&H(r,s.StrictFunctionName):R(r.value)?(i=r,u=s.StrictFunctionName):k(r.value)&&(i=r,u=s.StrictReservedWord),t=(a=Oe(i)).params,o=a.stricted,i=a.firstRestricted,a.message&&(u=a.message),c=l,n=$e(),l&&i&&q(i,u),l&&o&&H(o,u),l=c,g.markEnd(g.createFunctionDeclaration(e,t,[],n),h)}function Re(){if(m.type===t.Keyword)switch(m.value){case"const":case"let":return e=m.value,r=m,Q(e),n=ve(e),ee(),g.markEnd(g.createVariableDeclaration(n,e),r);case"function":return ke();default:return Ee()}var e,n,r;if(m.type!==t.EOF)return Ee()}function Se(){var e,n;return _(),z(),n=m,l=!1,e=function(){for(var e,n,r,a=[];h<p&&(n=m).type===t.StringLiteral&&(e=Re(),a.push(e),e.expression.type===o.Literal);)"use strict"===c.slice(n.start+1,n.end-1)?(l=!0,r&&H(r,s.StrictOctalLiteral)):!r&&n.octal&&(r=n);for(;h<p&&void 0!==(e=Re());)a.push(e);return a}(),g.markEnd(g.createProgram(e),n)}function Ae(){var e,t,n,r=[];for(e=0;e<x.tokens.length;++e)n={type:(t=x.tokens[e]).type,value:t.value},x.range&&(n.range=t.range),x.loc&&(n.loc=t.loc),r.push(n);x.tokens=r}(n={})[(t={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9}).BooleanLiteral]="Boolean",n[t.EOF]="<end>",n[t.Identifier]="Identifier",n[t.Keyword]="Keyword",n[t.NullLiteral]="Null",n[t.NumericLiteral]="Numeric",n[t.Punctuator]="Punctuator",n[t.StringLiteral]="String",n[t.RegularExpression]="RegularExpression",r=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="],o={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},a={Data:1,Get:2,Set:4},s={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode"},i={NonAsciiIdentifierStart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),NonAsciiIdentifierPart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")},u={name:"SyntaxTree",processComment:function(e){var t,n;if(!(e.type===o.Program&&e.body.length>0)){for(x.trailingComments.length>0?x.trailingComments[0].range[0]>=e.range[1]?(n=x.trailingComments,x.trailingComments=[]):x.trailingComments.length=0:x.bottomRightStack.length>0&&x.bottomRightStack[x.bottomRightStack.length-1].trailingComments&&x.bottomRightStack[x.bottomRightStack.length-1].trailingComments[0].range[0]>=e.range[1]&&(n=x.bottomRightStack[x.bottomRightStack.length-1].trailingComments,delete x.bottomRightStack[x.bottomRightStack.length-1].trailingComments);x.bottomRightStack.length>0&&x.bottomRightStack[x.bottomRightStack.length-1].range[0]>=e.range[0];)t=x.bottomRightStack.pop();t?t.leadingComments&&t.leadingComments[t.leadingComments.length-1].range[1]<=e.range[0]&&(e.leadingComments=t.leadingComments,delete t.leadingComments):x.leadingComments.length>0&&x.leadingComments[x.leadingComments.length-1].range[1]<=e.range[0]&&(e.leadingComments=x.leadingComments,x.leadingComments=[]),n&&(e.trailingComments=n),x.bottomRightStack.push(e)}},markEnd:function(e,t){return x.range&&(e.range=[t.start,h]),x.loc&&(e.loc=new G(void 0===t.startLineNumber?t.lineNumber:t.startLineNumber,t.start-(void 0===t.startLineStart?t.lineStart:t.startLineStart),d,h-f),this.postProcess(e)),x.attachComment&&this.processComment(e),e},postProcess:function(e){return x.source&&(e.loc.source=x.source),e},createArrayExpression:function(e){return{type:o.ArrayExpression,elements:e}},createAssignmentExpression:function(e,t,n){return{type:o.AssignmentExpression,operator:e,left:t,right:n}},createBinaryExpression:function(e,t,n){return{type:"||"===e||"&&"===e?o.LogicalExpression:o.BinaryExpression,operator:e,left:t,right:n}},createBlockStatement:function(e){return{type:o.BlockStatement,body:e}},createBreakStatement:function(e){return{type:o.BreakStatement,label:e}},createCallExpression:function(e,t){return{type:o.CallExpression,callee:e,arguments:t}},createCatchClause:function(e,t){return{type:o.CatchClause,param:e,body:t}},createConditionalExpression:function(e,t,n){return{type:o.ConditionalExpression,test:e,consequent:t,alternate:n}},createContinueStatement:function(e){return{type:o.ContinueStatement,label:e}},createDebuggerStatement:function(){return{type:o.DebuggerStatement}},createDoWhileStatement:function(e,t){return{type:o.DoWhileStatement,body:e,test:t}},createEmptyStatement:function(){return{type:o.EmptyStatement}},createExpressionStatement:function(e){return{type:o.ExpressionStatement,expression:e}},createForStatement:function(e,t,n,r){return{type:o.ForStatement,init:e,test:t,update:n,body:r}},createForInStatement:function(e,t,n){return{type:o.ForInStatement,left:e,right:t,body:n,each:!1}},createFunctionDeclaration:function(e,t,n,r){return{type:o.FunctionDeclaration,id:e,params:t,defaults:n,body:r,rest:null,generator:!1,expression:!1}},createFunctionExpression:function(e,t,n,r){return{type:o.FunctionExpression,id:e,params:t,defaults:n,body:r,rest:null,generator:!1,expression:!1}},createIdentifier:function(e){return{type:o.Identifier,name:e}},createIfStatement:function(e,t,n){return{type:o.IfStatement,test:e,consequent:t,alternate:n}},createLabeledStatement:function(e,t){return{type:o.LabeledStatement,label:e,body:t}},createLiteral:function(e){return{type:o.Literal,value:e.value,raw:c.slice(e.start,e.end)}},createMemberExpression:function(e,t,n){return{type:o.MemberExpression,computed:"["===e,object:t,property:n}},createNewExpression:function(e,t){return{type:o.NewExpression,callee:e,arguments:t}},createObjectExpression:function(e){return{type:o.ObjectExpression,properties:e}},createPostfixExpression:function(e,t){return{type:o.UpdateExpression,operator:e,argument:t,prefix:!1}},createProgram:function(e){return{type:o.Program,body:e}},createProperty:function(e,t,n){return{type:o.Property,key:t,value:n,kind:e}},createReturnStatement:function(e){return{type:o.ReturnStatement,argument:e}},createSequenceExpression:function(e){return{type:o.SequenceExpression,expressions:e}},createSwitchCase:function(e,t){return{type:o.SwitchCase,test:e,consequent:t}},createSwitchStatement:function(e,t){return{type:o.SwitchStatement,discriminant:e,cases:t}},createThisExpression:function(){return{type:o.ThisExpression}},createThrowStatement:function(e){return{type:o.ThrowStatement,argument:e}},createTryStatement:function(e,t,n,r){return{type:o.TryStatement,block:e,guardedHandlers:t,handlers:n,finalizer:r}},createUnaryExpression:function(e,t){return"++"===e||"--"===e?{type:o.UpdateExpression,operator:e,argument:t,prefix:!0}:{type:o.UnaryExpression,operator:e,argument:t,prefix:!0}},createVariableDeclaration:function(e,t){return{type:o.VariableDeclaration,declarations:e,kind:t}},createVariableDeclarator:function(e,t){return{type:o.VariableDeclarator,id:e,init:t}},createWhileStatement:function(e,t){return{type:o.WhileStatement,test:e,body:t}},createWithStatement:function(e,t){return{type:o.WithStatement,object:e,body:t}}},e.version="1.2.5",e.tokenize=function(e,n){var r;"string"==typeof e||e instanceof String||(e=String(e)),g=u,h=0,d=(c=e).length>0?1:0,f=0,p=c.length,m=null,b={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},x={},(n=n||{}).tokens=!0,x.tokens=[],x.tokenize=!0,x.openParenToken=-1,x.openCurlyToken=-1,x.range="boolean"==typeof n.range&&n.range,x.loc="boolean"==typeof n.loc&&n.loc,"boolean"==typeof n.comment&&n.comment&&(x.comments=[]),"boolean"==typeof n.tolerant&&n.tolerant&&(x.errors=[]);try{if(z(),m.type===t.EOF)return x.tokens;for(V();m.type!==t.EOF;)try{V()}catch(e){if(m,x.errors){x.errors.push(e);break}throw e}Ae(),r=x.tokens,void 0!==x.comments&&(r.comments=x.comments),void 0!==x.errors&&(r.errors=x.errors)}catch(e){throw e}finally{x={}}return r},e.parse=function(e,t){var n,r;r=String,"string"==typeof e||e instanceof String||(e=r(e)),g=u,h=0,d=(c=e).length>0?1:0,f=0,p=c.length,m=null,b={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},x={},void 0!==t&&(x.range="boolean"==typeof t.range&&t.range,x.loc="boolean"==typeof t.loc&&t.loc,x.attachComment="boolean"==typeof t.attachComment&&t.attachComment,x.loc&&null!==t.source&&void 0!==t.source&&(x.source=r(t.source)),"boolean"==typeof t.tokens&&t.tokens&&(x.tokens=[]),"boolean"==typeof t.comment&&t.comment&&(x.comments=[]),"boolean"==typeof t.tolerant&&t.tolerant&&(x.errors=[]),x.attachComment&&(x.range=!0,x.comments=[],x.bottomRightStack=[],x.trailingComments=[],x.leadingComments=[]));try{n=Se(),void 0!==x.comments&&(n.comments=x.comments),void 0!==x.tokens&&(Ae(),n.tokens=x.tokens),void 0!==x.errors&&(n.errors=x.errors)}catch(e){throw e}finally{x={}}return n},e.Syntax=function(){var e,t={};for(e in"function"==typeof Object.create&&(t=Object.create(null)),o)o.hasOwnProperty(e)&&(t[e]=o[e]);return"function"==typeof Object.freeze&&Object.freeze(t),t}()})?r.apply(t,o):r)||(e.exports=a)}()},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";(function(e){var t=n(11);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const r=()=>n(164);let o;class a{constructor(){this.util=n(165),this.textEncoder=new this.util.TextEncoder}fetch(e,n){return null!=Object(t.b)().global.fetch?Object(t.b)().global.fetch(e,n):(null==o&&(o=r()),o(e,n))}now(){const t=e.hrtime();return 1e3*t[0]+t[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error("Node built-in encoder only supports utf-8, but got "+t);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}}Object(t.b)().get("IS_NODE")&&Object(t.b)().setPlatform("node",new a)}).call(this,n(45))},function(e,t){},function(e,t){},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t,n=this,r=(t=4022871197,function(e){e=e.toString();for(var n=0;n<e.length;n++){var r=.02519603282416938*(t+=e.charCodeAt(n));r-=t=r>>>0,t=(r*=t)>>>0,t+=4294967296*(r-=t)}return 2.3283064365386963e-10*(t>>>0)});n.next=function(){var e=2091639*n.s0+2.3283064365386963e-10*n.c;return n.s0=n.s1,n.s1=n.s2,n.s2=e-(n.c=0|e)},n.c=1,n.s0=r(" "),n.s1=r(" "),n.s2=r(" "),n.s0-=r(e),n.s0<0&&(n.s0+=1),n.s1-=r(e),n.s1<0&&(n.s1+=1),n.s2-=r(e),n.s2<0&&(n.s2+=1),r=null}function i(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function u(e,t){var n=new s(e),r=t&&t.state,o=n.next;return o.int32=function(){return 4294967296*n.next()|0},o.double=function(){return o()+11102230246251565e-32*(2097152*o()|0)},o.quick=o,r&&("object"==typeof r&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.alea=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function u(e,t){var n=new s(e),r=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=n.next,o.quick=o,r&&("object"==typeof r&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.xor128=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function u(e,t){var n=new s(e),r=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=n.next,o.quick=o,r&&("object"==typeof r&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.xorwow=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t=this;t.next=function(){var e,n,r=t.x,o=t.i;return e=r[o],n=(e^=e>>>7)^e<<24,n^=(e=r[o+1&7])^e>>>10,n^=(e=r[o+3&7])^e>>>3,n^=(e=r[o+4&7])^e<<7,e=r[o+7&7],n^=(e^=e<<13)^e<<9,r[o]=n,t.i=o+1&7,n},function(e,t){var n,r=[];if(t===(0|t))r[0]=t;else for(t=""+t,n=0;n<t.length;++n)r[7&n]=r[7&n]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function i(e,t){return t.x=e.x.slice(),t.i=e.i,t}function u(e,t){null==e&&(e=+new Date);var n=new s(e),r=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=n.next,o.quick=o,r&&(r.x&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.xorshift7=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t=this;t.next=function(){var e,n,r=t.w,o=t.X,a=t.i;return t.w=r=r+1640531527|0,n=o[a+34&127],e=o[a=a+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=o[a]=n^e,t.i=a,n+(r^r>>>16)|0},function(e,t){var n,r,o,a,s,i=[],u=128;for(t===(0|t)?(r=t,t=null):(t+="\0",r=0,u=Math.max(u,t.length)),o=0,a=-32;a<u;++a)t&&(r^=t.charCodeAt((a+32)%t.length)),0===a&&(s=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(s=s+1640531527|0,o=0==(n=i[127&a]^=r+s)?o+1:0);for(o>=128&&(i[127&(t&&t.length||0)]=-1),o=127,a=512;a>0;--a)r=i[o+34&127],n=i[o=o+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,i[o]=r^n;e.w=s,e.X=i,e.i=o}(t,e)}function i(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function u(e,t){null==e&&(e=+new Date);var n=new s(e),r=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=n.next,o.quick=o,r&&(r.X&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.xor4096=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){(function(e){var r;!function(e,o,a){function s(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,r=t.d,o=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^o,o=o-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^o,t.a=o-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var r=0;r<n.length+20;r++)t.b^=0|n.charCodeAt(r),t.next()}function i(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function u(e,t){var n=new s(e),r=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=n.next,o.quick=o,r&&("object"==typeof r&&i(r,n),o.state=function(){return i(n,{})}),o}o&&o.exports?o.exports=u:n(22)&&n(33)?void 0===(r=function(){return u}.call(t,n,t,o))||(o.exports=r):this.tychei=u}(0,e,n(22))}).call(this,n(32)(e))},function(e,t,n){var r;!function(o,a){var s,i=this,u=a.pow(256,6),c=a.pow(2,52),l=2*c;function h(e,t,n){var r=[],h=p(function e(t,n){var r,o=[],a=typeof t;if(n&&"object"==a)for(r in t)try{o.push(e(t[r],n-1))}catch(e){}return o.length?o:"string"==a?t:t+"\0"}((t=1==t?{entropy:!0}:t||{}).entropy?[e,g(o)]:null==e?function(){try{var e;return s&&(e=s.randomBytes)?e=e(256):(e=new Uint8Array(256),(i.crypto||i.msCrypto).getRandomValues(e)),g(e)}catch(e){var t=i.navigator,n=t&&t.plugins;return[+new Date,i,n,i.screen,g(o)]}}():e,3),r),m=new d(r),b=function(){for(var e=m.g(6),t=u,n=0;e<c;)e=256*(e+n),t*=256,n=m.g(1);for(;e>=l;)e/=2,t/=2,n>>>=1;return(e+n)/t};return b.int32=function(){return 0|m.g(4)},b.quick=function(){return m.g(4)/4294967296},b.double=b,p(g(m.S),o),(t.pass||n||function(e,t,n,r){return r&&(r.S&&f(r,m),e.state=function(){return f(m,{})}),n?(a.random=e,t):e})(b,h,"global"in t?t.global:this==a,t.state)}function d(e){var t,n=e.length,r=this,o=0,a=r.i=r.j=0,s=r.S=[];for(n||(e=[n++]);o<256;)s[o]=o++;for(o=0;o<256;o++)s[o]=s[a=255&a+e[o%n]+(t=s[o])],s[a]=t;(r.g=function(e){for(var t,n=0,o=r.i,a=r.j,s=r.S;e--;)t=s[o=255&o+1],n=256*n+s[255&(s[o]=s[a=255&a+t])+(s[a]=t)];return r.i=o,r.j=a,n})(256)}function f(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function p(e,t){for(var n,r=e+"",o=0;o<r.length;)t[255&o]=255&(n^=19*t[255&o])+r.charCodeAt(o++);return g(t)}function g(e){return String.fromCharCode.apply(0,e)}if(a.seedrandom=h,p(a.random(),o),e.exports){e.exports=h;try{s=n(173)}catch(e){}}else void 0===(r=function(){return h}.call(t,n,t,e))||(e.exports=r)}([],Math)},function(e,t){},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function a(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new a(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new a(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},a.prototype.unref=a.prototype.ref=function(){},a.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(175),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(18))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o,a,s,i,u=1,c={},l=!1,h=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick((function(){p(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((a=new MessageChannel).port1.onmessage=function(e){p(e.data)},r=function(e){a.port2.postMessage(e)}):h&&"onreadystatechange"in h.createElement("script")?(o=h.documentElement,r=function(e){var t=h.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,o.removeChild(t),t=null},o.appendChild(t)}):r=function(e){setTimeout(p,0,e)}:(s="setImmediate$"+Math.random()+"$",i=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(s)&&p(+t.data.slice(s.length))},e.addEventListener?e.addEventListener("message",i,!1):e.attachEvent("onmessage",i),r=function(t){e.postMessage(s+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return c[u]=o,r(u),u++},d.clearImmediate=f}function f(e){delete c[e]}function p(e){if(l)setTimeout(p,0,e);else{var t=c[e];if(t){l=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{f(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(18),n(45))},,,,,,,,,,,function(e,t,n){"use strict";n.r(t),n.d(t,"DDSP",(function(){return jo}));var r={};n.r(r),n.d(r,"simpleAbsImpl",(function(){return U})),n.d(r,"addImpl",(function(){return Y})),n.d(r,"ceilImpl",(function(){return ee})),n.d(r,"expImpl",(function(){return te})),n.d(r,"expm1Impl",(function(){return ne})),n.d(r,"floorImpl",(function(){return re})),n.d(r,"logImpl",(function(){return oe})),n.d(r,"maxImpl",(function(){return ae})),n.d(r,"multiplyImpl",(function(){return se})),n.d(r,"notEqualImpl",(function(){return ue})),n.d(r,"rsqrtImpl",(function(){return ce})),n.d(r,"sliceImpl",(function(){return le})),n.d(r,"squaredDifferenceImpl",(function(){return he})),n.d(r,"subImpl",(function(){return de})),n.d(r,"transposeImpl",(function(){return pe})),n.d(r,"uniqueImpl",(function(){return ge}));var o=n(0);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const a={},s={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function i(e){if(!(e in a)){const t=function(e){if(1!==e&&2!==e)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");const t=function(e){if("undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}(e);if(t.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete a[e]},!1),1===e)return t.getContext("webgl",s)||t.getContext("experimental-webgl",s);return t.getContext("webgl2",s)}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e);if(null===t)return console.log("Could not get context for WebGL version",e),null;a[e]=t}const t=a[e];return t.isContextLost()?(delete a[e],i(e)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),a[e])}var u,c,l;function h(e,t){return[t,e]}function d(e){const t=o.Lb.sizeFromShape(e),n=Math.ceil(t/4);return o.Lb.sizeToSquarishShape(n)}function f(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function p(e,t){const n=e;let r,a,s,i,u,c,l,h,d,f;return 2===Object(o.jb)().getNumber("WEBGL_VERSION")?(r=n.R32F,a=n.R16F,s=n.RGBA16F,i=n.RGBA32F,u=n.RED,l=4,h=1,d=n.HALF_FLOAT,f=n.FLOAT):(r=e.RGBA,a=e.RGBA,s=e.RGBA,i=n.RGBA,u=e.RGBA,l=4,h=4,d=null!=t?t.HALF_FLOAT_OES:null,f=e.FLOAT),c=e.RGBA,{internalFormatFloat:r,internalFormatHalfFloat:a,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:i,textureFormatFloat:u,downloadTextureFormat:c,downloadUnpackNumChannels:l,defaultNumChannels:h,textureTypeHalfFloat:d,textureTypeFloat:f}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function g(e,t){const n=t();return Object(o.jb)().getBool("DEBUG")&&function(e){const t=e.getError();if(t!==e.NO_ERROR)throw new Error("WebGL Error: "+function(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}(e,t))}(e),n}!function(e){e[e.DENSE=0]="DENSE",e[e.SHARED_BATCH=1]="SHARED_BATCH"}(u||(u={})),function(e){e[e.RENDER=0]="RENDER",e[e.UPLOAD=1]="UPLOAD",e[e.PIXELS=2]="PIXELS",e[e.DOWNLOAD=3]="DOWNLOAD"}(c||(c={})),function(e){e[e.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",e[e.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",e[e.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",e[e.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",e[e.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"}(l||(l={}));function m(e){return!!(Object(o.jb)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===e||5.96e-8<Math.abs(e)&&Math.abs(e)<65504)}function b(e,t){return O(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function x(e,t){const n=O(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(g(e,()=>e.shaderSource(n,t)),g(e,()=>e.compileShader(n)),!1===e.getShaderParameter(n,e.COMPILE_STATUS))throw function(e,t){const n=y.exec(t);if(null==n)return console.log("Couldn't parse line number in error: "+t),void console.log(e);const r=+n[1],a=e.split("\n"),s=a.length.toString().length+2,i=a.map((e,t)=>o.Lb.rightPad((t+1).toString(),s)+e);let u=0;for(let e=0;e<i.length;e++)u=Math.max(i[e].length,u);const c=i.slice(0,r-1),l=i.slice(r-1,r),h=i.slice(r);console.log(c.join("\n")),console.log(t.split("\n")[0]),console.log("%c "+o.Lb.rightPad(l[0],u),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(h.join("\n"))}(t,e.getShaderInfoLog(n)),new Error("Failed to compile fragment shader.");return n}const y=/ERROR: [0-9]+:([0-9]+):/g;function v(e,t){if(g(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function w(e,t,n,r,o,a,s){const i=e.getAttribLocation(t,n);return-1!==i&&(g(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),g(e,()=>e.vertexAttribPointer(i,o,e.FLOAT,!1,a,s)),g(e,()=>e.enableVertexAttribArray(i)),!0)}function C(e,t,n,r){g(e,()=>function(e,t,n){k(e,n),g(e,()=>e.activeTexture(e.TEXTURE0+n)),g(e,()=>e.bindTexture(e.TEXTURE_2D,t))}(e,t,r)),g(e,()=>e.uniform1i(n,r))}function I(e,t,n){g(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,n)),g(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function E(e,t){g(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),g(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function $(e){const t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+function(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}(e,t))}function O(e,t,n){const r=g(e,()=>t());if(null==r)throw new Error(n);return r}function k(e,t){const n=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+e.TEXTURE0;if(r<e.TEXTURE0||r>n){throw new Error(`textureUnit must be in ${`[gl.TEXTURE0, gl.TEXTURE${n}]`}.`)}}function R(e,t=2){return o.Lb.sizeFromShape(e.slice(0,e.length-t))}function S(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function A(e){let t=[1,1,1];return 0===e.length||1===e.length&&1===e[0]||(t=[R(e),...S(e)]),t}function T(e){return e%2==0}function _(e,t){if(e=e.slice(-2),t=t.slice(-2),o.Lb.arraysEqual(e,t))return!0;if(!e.length||!t.length)return!0;if(0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){const n=e.slice(-1)[0],r=t.slice(-1)[0];if(n===r)return!0;if(T(n)&&T(r)&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&T(e[0])&&T(t[0])}let N,F;function j(e,t){return null!=e.getExtension(t)}function D(e){try{if(null!=i(e))return!0}catch(e){return console.log("Error when getting WebGL context: ",e),!1}return!1}function L(e){if(0===e)return!1;const t=i(e);if(1!==e){if(j(t,"EXT_color_buffer_float"))return B(t);const e="EXT_color_buffer_half_float";if(j(t,e)){const n=t.getExtension(e);return function(e,t){const n=p(e,t),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);e.texImage2D(e.TEXTURE_2D,0,n.internalFormatHalfFloat,1,1,0,n.textureFormatFloat,n.textureTypeHalfFloat,null);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);const a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),a}(t,n)}return!1}if(!j(t,"OES_texture_float"))return!1;if(!j(t,"WEBGL_color_buffer_float"))return!1;return B(t)}function B(e){const t=p(e),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);const r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);const o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(r),o}function P(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&o.Lb.assert("complex64"!==e.dtype,()=>t+" does not support complex64 tensors in the WebGL backend.")})}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const M=Object(o.jb)();
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function U(e){const t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}M.registerFlag("HAS_WEBGL",()=>M.getNumber("WEBGL_VERSION")>0),M.registerFlag("WEBGL_VERSION",()=>D(2)?2:D(1)?1:0),M.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),M.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===M.get("WEBGL_VERSION")),M.registerFlag("WEBGL_CPU_FORWARD",()=>!0),M.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),M.registerFlag("WEBGL_PACK",()=>M.getBool("HAS_WEBGL")),M.registerFlag("WEBGL_PACK_NORMALIZATION",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_CLIP",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>!1),M.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_PACK_REDUCE",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_LAZILY_UNPACK",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_CONV_IM2COL",()=>M.getBool("WEBGL_PACK")),M.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>function(e){if(null==N){const t=i(e);N=t.getParameter(t.MAX_TEXTURE_SIZE)}return N}(M.getNumber("WEBGL_VERSION"))),M.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>function(e){if(null==F){const t=i(e);F=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,F)}(M.getNumber("WEBGL_VERSION"))),M.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{const e=M.getNumber("WEBGL_VERSION");return 0===e?0:function(e){if(0===e)return 0;let t;const n=i(e);return t=j(n,"EXT_disjoint_timer_query_webgl2")&&2===e?2:j(n,"EXT_disjoint_timer_query")?1:0,t}(e)}),M.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>M.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!o.fb.isMobile()),M.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>function(e){if(0===e)return!1;const t=i(e);if(1===e){if(!j(t,"OES_texture_float"))return!1}else if(!j(t,"EXT_color_buffer_float"))return!1;return B(t)}(M.getNumber("WEBGL_VERSION"))),M.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!M.getBool("WEBGL_FORCE_F16_TEXTURES")&&M.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),M.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>L(M.getNumber("WEBGL_VERSION"))),M.registerFlag("WEBGL_FENCE_API_ENABLED",()=>{return 2===(e=M.getNumber("WEBGL_VERSION"))&&null!=i(e).fenceSync;var e}),M.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>M.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0),M.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if(e<0&&-1!==e)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)});o.a;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function V(e){return(t,n,r,a,s)=>{const i=o.X.assertAndGetBroadcastShape(t,n),u=i.length,c=o.Lb.computeStrides(i),l=o.Lb.sizeFromShape(i),h=o.Lb.getTypedArrayFromDType(s,l),d=t.length,f=n.length,p=o.Lb.computeStrides(t),g=o.Lb.computeStrides(n),m=o.X.getBroadcastDims(t,i),b=o.X.getBroadcastDims(n,i);if(m.length+b.length===0)for(let t=0;t<h.length;++t)h[t]=e(r[t%r.length],a[t%a.length]);else for(let t=0;t<h.length;++t){const n=o.Lb.indexToLoc(t,u,c),s=n.slice(-d);m.forEach(e=>s[e]=0);const i=o.Lb.locToIndex(s,d,p),l=n.slice(-f);b.forEach(e=>l[e]=0);const x=o.Lb.locToIndex(l,f,g);h[t]=e(r[i],a[x])}return[h,i]}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function z(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&o.Lb.assert("complex64"!==e.dtype,()=>t+" does not support complex64 tensors in the CPU backend.")})}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function W(e){const{inputs:t,backend:n}=e,{real:r,imag:o}=t,a=n.data.get(r.dataId).values,s=n.data.get(o.dataId).values,i=n.makeTensorInfo(r.shape,"complex64");return n.data.get(i.dataId).complexTensorInfos={real:n.makeTensorInfo(r.shape,"float32",a),imag:n.makeTensorInfo(o.shape,"float32",s)},i}o.h;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G(e){const{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}o.u;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function X(e){const{inputs:t,backend:n}=e,{input:r}=t,o=n.data.get(r.dataId).complexTensorInfos.real,a=n.data.get(o.dataId).values;return n.makeTensorInfo(o.shape,o.dtype,a)}o.J;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function q(e){const{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{dtype:s}=r;if("complex64"===s){if("complex64"===a.dtype)return G({inputs:{x:a},backend:n});const e=o.Nb(a.shape),t=q({inputs:{x:a},backend:n,attrs:{dtype:"float32"}}),r=W({inputs:{real:t,imag:e},backend:n});return e.dispose(),n.disposeIntermediateTensorInfo(t),r}if("complex64"===a.dtype){const e=X({inputs:{input:a},backend:n}),t=q({inputs:{x:e},backend:n,attrs:{dtype:s}});return n.disposeIntermediateTensorInfo(e),t}if(!o.Lb.hasEncodingLoss(a.dtype,s)){const e=G({inputs:{x:a},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:s}}if("int32"===s){const e=n.data.get(a.dataId).values,t=Int32Array.from(e);return n.makeTensorInfo(a.shape,"int32",t)}if("bool"===s){const e=n.data.get(a.dataId).values,t=o.Lb.toTypedArray([0],a.dtype),[r,s]=V((e,t)=>e!==t?1:0)(a.shape,[],e,t,"bool");return n.makeTensorInfo(s,"bool",r)}throw new Error(`Error in Cast: failed to cast ${a.dtype} to ${s}`)}o.f;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function H(e,t,n,r){return null==n?({inputs:n,backend:o})=>{const{a,b:s}=n,i=o;z([a,s],e);const u=i.data.get(a.dataId).values,c=i.data.get(s.dataId).values,l=r||a.dtype,[h,d]=t(a.shape,s.shape,u,c,l);return i.makeTensorInfo(d,l,h)}:({inputs:e,backend:o})=>{const{a,b:s}=e,i=o;if("complex64"===a.dtype||"complex64"===s.dtype){const e=q({inputs:{x:a},backend:i,attrs:{dtype:"complex64"}}),t=i.data.get(e.dataId),r=t.complexTensorInfos.real,o=t.complexTensorInfos.imag,u=i.data.get(r.dataId).values,c=i.data.get(o.dataId).values,l=q({inputs:{x:s},backend:i,attrs:{dtype:"complex64"}}),h=i.data.get(l.dataId),d=h.complexTensorInfos.real,f=h.complexTensorInfos.imag,p=i.data.get(d.dataId).values,g=i.data.get(f.dataId).values,[m,b,x]=n(a.shape,s.shape,u,c,p,g),y=i.makeTensorInfo(x,"float32",m),v=i.makeTensorInfo(x,"float32",b),w=W({inputs:{real:y,imag:v},backend:i});return i.disposeIntermediateTensorInfo(e),i.disposeIntermediateTensorInfo(l),i.disposeIntermediateTensorInfo(y),i.disposeIntermediateTensorInfo(v),w}{const e=i.data.get(a.dataId).values,n=i.data.get(s.dataId).values,o=r||a.dtype,[u,c]=t(a.shape,s.shape,e,n,o);return i.makeTensorInfo(c,o,u)}}}function K(e){return(t,n,r,a,s,i)=>{const u=o.X.assertAndGetBroadcastShape(t,n),c=o.Lb.sizeFromShape(u),l=u.length,h=o.Lb.computeStrides(u),d=o.Lb.getTypedArrayFromDType("float32",c),f=o.Lb.getTypedArrayFromDType("float32",c),p=o.X.getBroadcastDims(t,u),g=o.X.getBroadcastDims(n,u),m=o.X.mergeRealAndImagArrays(r,a),b=o.X.mergeRealAndImagArrays(s,i),x=t.length,y=o.Lb.computeStrides(t),v=n.length,w=o.Lb.computeStrides(n);if(p.length+g.length===0)for(let t=0;t<d.length;t++){const n=t%m.length,r=t%b.length,o=e(m[2*n],m[2*n+1],b[2*r],b[2*r+1]);d[t]=o.real,f[t]=o.imag}else for(let t=0;t<d.length;t++){const n=o.Lb.indexToLoc(t,l,h),r=n.slice(-x);p.forEach(e=>r[e]=0);const a=o.Lb.locToIndex(r,x,y),s=n.slice(-v);g.forEach(e=>s[e]=0);const i=o.Lb.locToIndex(s,v,w),u=e(m[2*a],m[2*a+1],b[2*i],b[2*i+1]);d[t]=u.real,f[t]=u.imag}return[d,f,u]}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Y=V((e,t)=>e+t),Q=K((e,t,n,r)=>({real:e+n,imag:t+r}));H(o.b,Y,Q),o.b;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function J(e){return(t,n,r)=>{const a=o.Lb.getTypedArrayFromDType(n,t.length);for(let n=0;n<t.length;++n)a[n]=e(t[n],r);return a}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Z(e,t,n){return({inputs:r,attrs:o,backend:a})=>{const{x:s}=r;if(z(s,e),"string"===s.dtype||"string"===n)throw new Error("unaryKernelFunc does not support string input/output");const i=a,u=i.data.get(s.dataId).values,c=n||s.dtype,l=t(u,c,o);return i.makeTensorInfo(s.shape,c,l)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ee=J(e=>Math.ceil(e)),te=(Z(o.g,ee),o.g,J(e=>Math.exp(e))),ne=(Z(o.m,te),o.m,J(e=>Math.expm1(e))),re=(Z(o.n,ne),o.n,J(e=>Math.floor(e))),oe=(Z(o.q,re),o.q,J(e=>Math.log(e)));Z(o.x,oe),o.x;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ae(e,t,n,r){const a=o.Lb.getTypedArrayFromDType(r,o.Lb.sizeFromShape(n));for(let n=0;n<a.length;++n){const r=n*t;let o=e[r];for(let n=0;n<t;++n){const t=e[r+n];t>o&&(o=t)}a[n]=o}return a}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const se=V((e,t)=>e*t),ie=K((e,t,n,r)=>({real:e*n-t*r,imag:e*r+t*n})),ue=(H(o.E,se,ie),o.E,V((e,t)=>e!==t?1:0)),ce=(H(o.I,ue,null,"bool"),o.I,J(e=>1/Math.sqrt(e)));Z(o.M,ce),o.M;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function le(e,t,n,r,a){const s=o.Ab.isSliceContinous(r,t,n),i=o.Lb.sizeFromShape(n),u=o.Lb.computeStrides(r);if(s){const n=o.Ab.computeFlatOffset(t,u);return e.subarray(n,n+i)}const c=o.Lb.getTypedArrayFromDType(a,i);for(let a=0;a<i;++a){const s=n.length,i=o.Lb.computeStrides(n),l=o.Lb.indexToLoc(a,s,i).map((e,n)=>e+t[n]),h=o.Lb.locToIndex(l,r.length,u);c[a]=e[h]}return c}o.O;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const he=V((e,t)=>{const n=e-t;return n*n}),de=(H(o.Q,he),o.Q,V((e,t)=>e-t)),fe=K((e,t,n,r)=>({real:e-n,imag:t-r}));H(o.R,de,fe),o.R;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function pe(e,t,n,r,a){const s=t.length,i=o.Lb.sizeFromShape(t),u=o.Lb.computeStrides(t),c=o.Lb.computeStrides(a),l=o.Lb.getTypedArrayFromDType(n,o.Lb.sizeFromShape(a));for(let t=0;t<i;++t){const n=o.Lb.indexToLoc(t,s,u),a=new Array(n.length);for(let e=0;e<a.length;e++)a[e]=n[r[e]];l[o.Lb.locToIndex(a,s,c)]=e[t]}return l}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ge(e,t,n,r){const a=o.Lb.parseAxisParam(t,n)[0],s=[1,n[0],1];for(let e=0;e<a;e++)s[0]*=n[e];s[1]=n[a];for(let e=a+1;e<n.length;e++)s[2]*=n[e];const i={},u=new Int32Array(n[a]),c=new o.T(s,r,e),l=[],h=1===s[0]&&1===s[2];for(let t=0;t<n[a];t++){let n;if(h)n=e[t].toString();else{const e=[];for(let n=0;n<s[0];n++)for(let r=0;r<s[2];r++)e.push(c.get(n,t,r));n=e.join(",")}if(void 0!==i[n])u[t]=i[n];else{const e=Object.keys(i).length;i[n]=e,u[t]=e,l.push(t)}}const d=s.slice();d[1]=Object.keys(i).length;const f=new o.T(d,r);l.forEach((e,t)=>{for(let n=0;n<s[0];n++)for(let r=0;r<s[2];r++)f.set(c.get(n,e,r),n,t,r)});const p=n.slice();return p[a]=d[1],{outputValues:f.values,outputShape:p,indices:u}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const{simpleAbsImpl:me,addImpl:be,ceilImpl:xe,expImpl:ye,expm1Impl:ve,floorImpl:we,logImpl:Ce,maxImpl:Ie,multiplyImpl:Ee,rsqrtImpl:$e,sliceImpl:Oe,subImpl:ke,transposeImpl:Re,uniqueImpl:Se}=r;
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ae{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>"T"+t);const n=[];this.variableNames.forEach(e=>{n.push(`float v${e} = get${e}AtOutCoords();`)});const r=this.variableNames.map(e=>"v"+e).join(" + ");this.userCode=`\n      void main() {\n        ${n.join("\n        ")}\n\n        float result = ${r};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Te{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>"T"+t);const n=[];this.variableNames.forEach(e=>{n.push(`vec4 v${e} = get${e}AtOutCoords();`)});const r=this.variableNames.map(e=>"v"+e).join(" + ");this.userCode=`\n      void main() {\n        ${n.join("\n        ")}\n\n        vec4 result = ${r};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class _e{constructor(e,t,n){this.variableNames=["A"];const{windowSize:r,batchSize:o,outSize:a}=e;n||this.variableNames.push("bestIndicesA"),this.outputShape=[o,a];const s="max"===t?">":"<",i=n?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${r};\n\n        int bestIndex = inOffset;\n        float bestValue = getA(batch, bestIndex);\n\n        for (int i = 0; i < ${r}; i++) {\n          int inIdx = ${i};\n          float candidate = getA(batch, inIdx);\n          if (candidate ${s} bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ne(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function Fe(e,t){return 1===t?[e]:Ne(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function je(){let e,t,n,r,a,s,i,u,c,l;return 2===Object(o.jb)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",n="out",r="in",a="texture",s="outputColor",i="out vec4 outputColor;",u="\n      bool isnan_custom(float val) {\n        return (val > 0.0 || val < 0.0) ? false : val != 0.0;\n      }\n\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan_custom(val.x),\n          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));\n      }\n\n      #define isnan(value) isnan_custom(value)\n    ",c="",l="\n      #define round(value) newRound(value)\n      int newRound(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 newRound(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "):(e="",t="attribute",n="varying",r="varying",a="texture2D",s="gl_FragColor",i="",u="\n      #define isnan(value) isnan_custom(value)\n      bool isnan_custom(float val) {\n        return (val > 0. || val < 1. || val == 0.) ? false : true;\n      }\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));\n      }\n    ",c="\n      uniform float INFINITY;\n\n      bool isinf(float val) {\n        return abs(val) == INFINITY;\n      }\n      bvec4 isinf(vec4 val) {\n        return equal(abs(val), vec4(INFINITY));\n      }\n    ",l="\n      int round(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 round(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "),{version:e,attribute:t,varyingVs:n,varyingFs:r,texture2D:a,output:s,defineOutput:i,defineSpecialNaN:u,defineSpecialInf:c,defineRound:l}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function De(e,t,n="index"){const r=o.Lb.computeStrides(t);return r.map((t,o)=>`${`int ${e[o]} = ${n} / ${t}`}; ${o===r.length-1?`int ${e[o+1]} = ${n} - ${e[o]} * ${t}`:`index -= ${e[o]} * ${t}`};`).join("")}function Le(e){const t=o.Lb.computeStrides(e).map(e=>e.toString());return`\n  int getFlatIndex(ivec3 coords) {\n    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;\n  }\n`}const Be="\n  const float FLOAT_MAX = 1.70141184e38;\n  const float FLOAT_MIN = 1.17549435e-38;\n\n  lowp vec4 encode_float(highp float v) {\n    if (isnan(v)) {\n      return vec4(255, 255, 255, 255);\n    }\n\n    highp float av = abs(v);\n\n    if(av < FLOAT_MIN) {\n      return vec4(0.0, 0.0, 0.0, 0.0);\n    } else if(v > FLOAT_MAX) {\n      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n    } else if(v < -FLOAT_MAX) {\n      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n    }\n\n    highp vec4 c = vec4(0,0,0,0);\n\n    highp float e = floor(log2(av));\n    highp float m = exp2(fract(log2(av))) - 1.0;\n\n    c[2] = floor(128.0 * m);\n    m -= c[2] / 128.0;\n    c[1] = floor(32768.0 * m);\n    m -= c[1] / 32768.0;\n    c[0] = floor(8388608.0 * m);\n\n    highp float ebias = e + 127.0;\n    c[3] = floor(ebias / 2.0);\n    ebias -= c[3] * 2.0;\n    c[2] += floor(ebias) * 128.0;\n\n    c[3] += 128.0 * step(0.0, -v);\n\n    return c / 255.0;\n  }\n",{getBroadcastDims:Pe}=o.X;
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Me(e,t,n,r){const a=[];e.forEach(e=>{const t=o.Lb.sizeFromShape(e.shapeInfo.logicalShape);e.shapeInfo.isUniform?a.push(`uniform float ${e.name}${t>1?`[${t}]`:""};`):(a.push(`uniform sampler2D ${e.name};`),a.push(`uniform int offset${e.name};`))});const s=a.join("\n"),i=e.map(e=>function(e,t,n=!1){let r="";r+=n?Ve(e):Ue(e);const a=e.shapeInfo.logicalShape,s=t.logicalShape;a.length<=s.length&&(r+=n?function(e,t){const n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),a="get"+r+"AtOutCoords",s=e.shapeInfo.logicalShape.length,i=t.logicalShape.length,u=Pe(e.shapeInfo.logicalShape,t.logicalShape),c=Ye(i),l=i-s;let h;const d=["x","y","z","w","u","v"];h=0===s?"":i<2&&u.length>=1?"coords = 0;":u.map(e=>`coords.${d[e+l]} = 0;`).join("\n");let f="";f=i<2&&s>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>"coords."+d[t+l]).join(", ");let p="return outputValue;";const g=1===o.Lb.sizeFromShape(e.shapeInfo.logicalShape),m=1===o.Lb.sizeFromShape(t.logicalShape);if(1!==s||g||m){if(g&&!m)p=1===i?"\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ":"\n        return vec4(outputValue.x);\n      ";else if(u.length){const e=s-2,t=s-1;u.indexOf(e)>-1&&u.indexOf(t)>-1?p="return vec4(outputValue.x);":u.indexOf(e)>-1?p="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":u.indexOf(t)>-1&&(p="return vec4(outputValue.xx, outputValue.zz);")}}else p="\n      return vec4(outputValue.xy, outputValue.xy);\n    ";return`\n    vec4 ${a}() {\n      ${c} coords = getOutputCoords();\n      ${h}\n      vec4 outputValue = get${r}(${f});\n      ${p}\n    }\n  `}(e,t):function(e,t){const n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),a="get"+r+"AtOutCoords",s=t.texShape,i=e.shapeInfo.texShape,u=e.shapeInfo.logicalShape.length,c=t.logicalShape.length;if(!e.shapeInfo.isUniform&&u===c&&null==e.shapeInfo.flatOffset&&o.Lb.arraysEqual(i,s))return`\n      float ${a}() {\n        return sampleTexture(${n}, resultUV);\n      }\n    `;const l=Ye(c),h=Pe(e.shapeInfo.logicalShape,t.logicalShape),d=c-u;let f;const p=["x","y","z","w","u","v"];f=0===u?"":c<2&&h.length>=1?"coords = 0;":h.map(e=>`coords.${p[e+d]} = 0;`).join("\n");let g="";g=c<2&&u>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>"coords."+p[t+d]).join(", ");return`\n    float ${a}() {\n      ${l} coords = getOutputCoords();\n      ${f}\n      return get${r}(${g});\n    }\n  `}(e,t));return r}(e,t,r)).join("\n"),u=t.texShape,c=je(),l=function(e){return`\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return ${e.texture2D}(textureSampler, uv).r;\n    }\n  `}(c);let h,d,f=function(e){return`${e.version}\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    ${e.varyingFs} vec2 resultUV;\n    ${e.defineOutput}\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    uniform float NAN;\n    ${e.defineSpecialNaN}\n    ${e.defineSpecialInf}\n    ${e.defineRound}\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    int idiv(int a, int b, float sign) {\n      int res = a / b;\n      int mod = imod(a, b);\n      if (sign < 0. && mod != 0) {\n        res -= 1;\n      }\n      return res;\n    }\n\n    //Based on the work of Dave Hoskins\n    //https://www.shadertoy.com/view/4djSRW\n    #define HASHSCALE1 443.8975\n    float random(float seed){\n      vec2 p = resultUV * seed;\n      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n      p3 += dot(p3, p3.yzx + 19.19);\n      return fract((p3.x + p3.y) * p3.z);\n    }\n\n    ${ze}\n    ${We}\n    ${Ge}\n  `}(c);t.isPacked?(h=function(e,t){switch(e.length){case 0:return qe();case 1:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(1===n[0])return`\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * ${n[1]}.0);\n      }\n    `;if(1===n[1])return`\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * ${n[0]}.0);\n      }\n    `;return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      return 2 * (resTexRC.x * ${n[1]} + resTexRC.y);\n    }\n  `}(0,t);case 2:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(o.Lb.arraysEqual(e,t))return`\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2(${n[0]}, ${n[1]}));\n      }\n    `;const r=Math.ceil(e[1]/2);return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec2(r, c);\n    }\n  `}(e,t);case 3:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],r=Math.ceil(e[2]/2),o=r*Math.ceil(e[1]/2);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec3(b, r, c);\n    }\n  `}(e,t);default:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],r=Math.ceil(e[e.length-1]/2),o=r*Math.ceil(e[e.length-2]/2);let a=o,s="",i="b, r, c";for(let t=2;t<e.length-1;t++)a*=e[e.length-t-1],s=`\n      int b${t} = index / ${a};\n      index -= b${t} * ${a};\n    `+s,i=`b${t}, `+i;return`\n    ivec${e.length} getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      ${s}\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec${e.length}(${i});\n    }\n  `}(e,t)}}(t.logicalShape,u),d=function(e){return`\n    void setOutput(vec4 val) {\n      ${e.output} = val;\n    }\n  `}(c)):(h=function(e,t){switch(e.length){case 0:return qe();case 1:return function(e,t){if(1===t[0])return`\n      int getOutputCoords() {\n        return int(resultUV.x * ${t[1]}.0);\n      }\n    `;if(1===t[1])return`\n      int getOutputCoords() {\n        return int(resultUV.y * ${t[0]}.0);\n      }\n    `;return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      return resTexRC.x * ${t[1]} + resTexRC.y;\n    }\n  `}(0,t);case 2:return function(e,t){if(o.Lb.arraysEqual(e,t))return`\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));\n      }\n    `;if(1===e[1])return`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${t[0]}, ${t[1]}));\n        int index = resTexRC.x * ${t[1]} + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    `;if(1===e[0])return`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${t[0]}, ${t[1]}));\n        int index = resTexRC.x * ${t[1]} + resTexRC.y;\n        return ivec2(0, index);\n      }\n    `;return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      int r = index / ${e[1]};\n      int c = index - r * ${e[1]};\n      return ivec2(r, c);\n    }\n  `}(e,t);case 3:return function(e,t){const n=De(["r","c","d"],e);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      ${n}\n      return ivec3(r, c, d);\n    }\n  `}(e,t);case 4:return function(e,t){const n=De(["r","c","d","d2"],e);return`\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      ${n}\n      return ivec4(r, c, d, d2);\n    }\n  `}(e,t);case 5:return function(e,t){const n=De(["r","c","d","d2","d3"],e);return`\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},\n                             ${t[1]}));\n\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n\n      ${n}\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  `}(e,t);case 6:return function(e,t){const n=De(["r","c","d","d2","d3","d4"],e);return`\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n\n      ${n}\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  `}(e,t);default:throw new Error(e.length+"-D output sampling is not yet supported")}}(t.logicalShape,u),d=function(e){return`\n    void setOutput(float val) {\n      ${e.output} = vec4(val, 0, 0, 0);\n    }\n  `}(c)),r&&(f+=Xe);return[f,l,d,s,h,i,n].join("\n")}function Ue(e){const t=e.shapeInfo.logicalShape;switch(t.length){case 0:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`float ${n}() {return ${t};}`;const[r,o]=e.shapeInfo.texShape;if(1===r&&1===o)return`\n      float ${n}() {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const[a,s]=e.shapeInfo.texShape,i=He(t);return`\n    float ${n}() {\n      vec2 uv = uvFromFlat(${a}, ${s}, ${i});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);case 1:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`\n      float ${n}(int index) {\n        ${Ke(e)}\n      }\n    `;const r=e.shapeInfo.texShape,o=r[0],a=r[1];if(1===a&&1===o)return`\n      float ${n}(int index) {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const s=He(t);if(1===a)return`\n      float ${n}(int index) {\n        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / ${o}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(1===o)return`\n      float ${n}(int index) {\n        vec2 uv = vec2((float(index + ${s}) + 0.5) / ${a}.0, 0.5);\n        return sampleTexture(${t}, uv);\n      }\n    `;return`\n    float ${n}(int index) {\n      vec2 uv = uvFromFlat(${o}, ${a}, index + ${s});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);case 2:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),a=e.shapeInfo.texShape;if(null!=a&&o.Lb.arraysEqual(t,a)){const e=a[0],t=a[1];return`\n    float ${r}(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(${t}.0, ${e}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `}const{newShape:s,keptDims:i}=o.Lb.squeezeShape(t),u=s;if(u.length<t.length){const t=Qe(e,u),n=["row","col"];return`\n      ${Ue(t)}\n      float ${r}(int row, int col) {\n        return ${r}(${Je(n,i)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));\n        ${Ke(e)}\n      }\n    `;const c=a[0],l=a[1],h=He(n);if(1===l)return`\n    float ${r}(int row, int col) {\n      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `;if(1===c)return`\n    float ${r}(int row, int col) {\n      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2((index + 0.5) / ${l}.0, 0.5);\n      return sampleTexture(${n}, uv);\n    }\n  `;return`\n  float ${r}(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * ${t[1]} + col + ${h};\n    vec2 uv = uvFromFlat(${c}, ${l}, index);\n    return sampleTexture(${n}, uv);\n  }\n`}(e);case 3:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),a=t[1]*t[2],s=t[2],{newShape:i,keptDims:u}=o.Lb.squeezeShape(t),c=i;if(c.length<t.length){const t=Qe(e,c),n=["row","col","depth"];return`\n        ${Ue(t)}\n        float ${r}(int row, int col, int depth) {\n          return ${r}(${Je(n,u)});\n        }\n      `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3(${a}, ${s}, 1)));\n        ${Ke(e)}\n      }\n    `;const l=e.shapeInfo.texShape,h=l[0],d=l[1],f=e.shapeInfo.flatOffset;if(d===a&&null==f)return`\n        float ${r}(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2(${s}, 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(${d}.0, ${h}.0);\n          return sampleTexture(${n}, uv);\n        }\n      `;if(d===s&&null==f)return`\n    float ${r}(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}.0, ${h}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `;const p=He(n);return`\n      float ${r}(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * ${a} + col * ${s} + depth + ${p};\n        vec2 uv = uvFromFlat(${h}, ${d}, index);\n        return sampleTexture(${n}, uv);\n      }\n  `}(e);case 4:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),a=t[3],s=t[2]*a,i=t[1]*s,{newShape:u,keptDims:c}=o.Lb.squeezeShape(t);if(u.length<t.length){const t=Qe(e,u),n=["row","col","depth","depth2"];return`\n      ${Ue(t)}\n      float ${r}(int row, int col, int depth, int depth2) {\n        return ${r}(${Je(n,c)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4(${i}, ${s}, ${a}, 1)));\n        ${Ke(e)}\n      }\n    `;const l=e.shapeInfo.flatOffset,h=e.shapeInfo.texShape,d=h[0],f=h[1];if(f===i&&null==l)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(${s}, ${a}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${f}.0, ${d}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(f===a&&null==l)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(${t[1]*t[2]}, ${t[2]}, 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${f}.0, ${d}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const p=He(n);return`\n    float ${r}(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${i} + col * ${s} +\n          depth * ${a} + depth2;\n      vec2 uv = uvFromFlat(${d}, ${f}, index + ${p});\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);case 5:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),a=t[4],s=t[3]*a,i=t[2]*s,u=t[1]*i,{newShape:c,keptDims:l}=o.Lb.squeezeShape(t);if(c.length<t.length){const t=Qe(e,c),n=["row","col","depth","depth2","depth3"];return`\n      ${Ue(t)}\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        return ${r}(${Je(n,l)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        float index = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${u}, ${i}, ${s}, ${a})) +\n          depth3;\n        ${Ke(e)}\n      }\n    `;const h=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],p=d[1];if(p===u&&null==h)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n                         vec4(${i}, ${s}, ${a}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${p}.0, ${f}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(p===a&&null==h)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        float texR = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${t[1]*t[2]*t[3]},\n               ${t[2]*t[3]}, ${t[3]}, 1));\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${p}.0, ${f}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const g=He(n);return`\n    float ${r}(int row, int col, int depth, int depth2, int depth3) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${u} + col * ${i} + depth * ${s} +\n          depth2 * ${a} + depth3 + ${g};\n      vec2 uv = uvFromFlat(${f}, ${p}, index);\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);case 6:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),{newShape:a,keptDims:s}=o.Lb.squeezeShape(t);if(a.length<t.length){const t=Qe(e,a),n=["row","col","depth","depth2","depth3","depth4"];return`\n      ${Ue(t)}\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return ${r}(${Je(n,s)});\n      }\n    `}const i=t[5],u=t[4]*i,c=t[3]*u,l=t[2]*c,h=t[1]*l;if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4(${h}, ${l}, ${c}, ${u})) +\n          dot(\n            vec2(depth3, depth4),\n            vec2(${i}, 1)));\n        ${Ke(e)}\n      }\n    `;const d=e.shapeInfo.flatOffset,f=e.shapeInfo.texShape,p=f[0],g=f[1];if(g===h&&null==d)return`\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4(${l}, ${c}, ${u}, ${i})) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${g}.0, ${p}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(g===i&&null==d)return`\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4(${t[1]*t[2]*t[3]*t[4]},\n               ${t[2]*t[3]*t[4]},\n               ${t[3]*t[4]},\n               ${t[4]})) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${g}.0, ${p}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const m=He(n);return`\n    float ${r}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${h} + col * ${l} + depth * ${c} +\n          depth2 * ${u} + depth3 * ${i} + depth4 + ${m};\n      vec2 uv = uvFromFlat(${p}, ${g}, index);\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);default:throw new Error(t.length+"-D input sampling is not yet supported")}}function Ve(e){switch(e.shapeInfo.logicalShape.length){case 0:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1),r=je();return`\n    vec4 ${n}() {\n      return ${r.texture2D}(${t}, halfCR);\n    }\n  `}(e);case 1:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1),r=e.shapeInfo.texShape,o=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],a=je();return`\n    vec4 ${n}(int index) {\n      vec2 uv = packedUVfrom1D(\n        ${o[0]}, ${o[1]}, index);\n      return ${a.texture2D}(${t}, uv);\n    }\n  `}(e);case 2:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),a=e.shapeInfo.texShape,s=a[0],i=a[1],u=je();if(null!=a&&o.Lb.arraysEqual(t,a))return`\n      vec4 ${r}(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}.0, ${s}.0);\n\n        return ${u.texture2D}(${n}, uv);\n      }\n    `;const c=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],l=Math.ceil(t[1]/2);return`\n    vec4 ${r}(int row, int col) {\n      vec2 uv = packedUVfrom2D(${l}, ${c[0]}, ${c[1]}, row, col);\n      return ${u.texture2D}(${n}, uv);\n    }\n  `}(e);case 3:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape,a=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];if(1===t[0]){const n=t.slice(1),o=[1,2],a=Qe(e,n),s=["b","row","col"];return`\n        ${Ve(a)}\n        vec4 ${r}(int b, int row, int col) {\n          return ${r}(${Je(s,o)});\n        }\n      `}const s=a[0],i=a[1],u=Math.ceil(t[2]/2),c=u*Math.ceil(t[1]/2),l=je();return`\n    vec4 ${r}(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        ${s}, ${i}, ${c}, ${u}, b, row, col);\n      return ${l.texture2D}(${n}, uv);\n    }\n  `}(e);default:return function(e){const t=e.shapeInfo.logicalShape,n=t.length,r=e.name,o="get"+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,s=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],i=s[0],u=s[1],c=Math.ceil(t[n-1]/2);let l=c*Math.ceil(t[n-2]/2),h="int b, int row, int col",d=`b * ${l} + (row / 2) * ${c} + (col / 2)`;for(let e=2;e<n-1;e++)h=`int b${e}, `+h,l*=t[n-e-1],d=`b${e} * ${l} + `+d;const f=je();return`\n    vec4 ${o}(${h}) {\n      int index = ${d};\n      int texR = index / ${u};\n      int texC = index - texR * ${u};\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${i});\n      return ${f.texture2D}(${r}, uv);\n    }\n  `}(e)}}const ze="\nvec2 uvFromFlat(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\nvec2 packedUVfrom1D(int texNumR, int texNumC, int index) {\n  int texelIndex = index / 2;\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",We="\nvec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,\n  int texNumC, int row, int col) {\n  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",Ge="\nvec2 packedUVfrom3D(int texNumR, int texNumC,\n    int texelsInBatch, int texelsInLogicalRow, int b,\n    int row, int col) {\n  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",Xe="\n  float getChannel(vec4 frag, vec2 innerDims) {\n    vec2 modCoord = mod(innerDims, 2.);\n    return modCoord.x == 0. ?\n      (modCoord.y == 0. ? frag.r : frag.g) :\n      (modCoord.y == 0. ? frag.b : frag.a);\n  }\n  float getChannel(vec4 frag, int dim) {\n    float modCoord = mod(float(dim), 2.);\n    return modCoord == 0. ? frag.r : frag.g;\n  }\n";function qe(){return"\n    int getOutputCoords() {\n      return 0;\n    }\n  "}function He(e){return"offset"+e}function Ke(e){const t=e.name,n=o.Lb.sizeFromShape(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`\n    for (int i = 0; i < ${n}; i++) {\n      if (i == index) {\n        return ${t}[i];\n      }\n    }\n  `}function Ye(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function Qe(e,t){const n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function Je(e,t){return t.map(t=>e[t]).join(", ")}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ze{constructor(e,t,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,o.Lb.assert(e.length>2,()=>`Packed arg${n.charAt(0).toUpperCase()+n.slice(1)} supports only inputs with rank above 2.`);const a=e[e.length-1],s=Math.ceil(a/t);this.outputShape=e.slice(0,-1),s>1&&this.outputShape.push(s),r||this.variableNames.push("bestIndicesA");const i=this.outputShape,u=i.length,c=Ye(u),l=Fe("coords",u);let h,d;if(1===s){d=u+1;const e=Ye(d);h=`\n        ${e} sourceLocR = ${e}(${l.join()}, 0);\n        ++${l[u-1]};\n        ${e} sourceLocG = ${e}(${l.join()}, 0);\n        ++${l[u-2]};\n        ${e} sourceLocA = ${e}(${l.join()}, 0);\n        --${l[u-1]};\n        ${e} sourceLocB = ${e}(${l.join()}, 0);\n        --${l[u-2]};`}else d=u,h=`\n        ${c} sourceLocR = coords;\n        ++${l[u-1]};\n        ${c} sourceLocG = coords;\n        ++${l[u-2]};\n        ${c} sourceLocA = coords;\n        --${l[u-1]};\n        ${c} sourceLocB = coords;\n        --${l[u-2]};`;const f=["x","y","z","w","u","v"].slice(0,d),p="."+f[d-1],g=f.map(e=>"int "+e),m=Fe("sourceLocR",d-1).concat("inIdx.r"),b=Fe("sourceLocG",d-1).concat("inIdx.g"),x=Fe("sourceLocB",d-1).concat("inIdx.b"),y=Fe("sourceLocA",d-1).concat("inIdx.a"),v="max"===n?"greaterThan":"lessThan",w=r?"":`\n          inIdx = round(vec4(getBestIndicesAChannel(${m.join()}),\n                             getBestIndicesAChannel(${b.join()}),\n                             getBestIndicesAChannel(${x.join()}),\n                             getBestIndicesAChannel(${y.join()})));`,C=`vec4(\n            getAChannel(${m.join()}),\n            hasNextCol ? getAChannel(${b.join()}) : 0.,\n            hasNextRow ? getAChannel(${x.join()}) : 0.,\n            hasNextRow && hasNextCol ? getAChannel(${y.join()}) : 0.)`,I=r?"":`\n      float getBestIndicesAChannel(${g.join()}) {\n        return getChannel(getBestIndicesA(${f.join()}),\n                                          vec2(${f.slice(-2).join()}));\n      }`;this.userCode=`\n      float getAChannel(${g.join()}) {\n        return getChannel(getA(${f.join()}),\n                               vec2(${f.slice(-2).join()}));\n      }\n      ${I}\n      void main() {\n        ${c} coords = getOutputCoords();\n        bool hasNextCol = ${l[u-1]} < ${i[u-1]-1};\n        bool hasNextRow = ${l[u-2]} < ${i[u-2]-1};\n        ${h}\n        ivec4 srcIdx = ivec4(sourceLocR${p}, sourceLocG${p},\n          sourceLocB${p}, sourceLocA${p}) * ${t};\n        ivec4 inIdx = srcIdx;\n        vec4 bestIndex = vec4(inIdx);\n        vec4 bestValue = ${C};\n\n        for (int i = 0; i < ${t}; i++) {\n          inIdx = srcIdx;\n          ${w}\n          vec4 candidate = ${C};\n          bvec4 nan = isnan(candidate);\n          bvec4 replace = bvec4(\n            vec4(${v}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));\n\n          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,\n                           replace.y  ? candidate.y : bestValue.y,\n                           replace.z  ? candidate.z : bestValue.z,\n                           replace.w  ? candidate.w : bestValue.w);\n          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));\n          srcIdx++;\n        }\n        setOutput(bestIndex);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class et{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a=e.dilationHeight,s=e.dilationWidth,i=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=i-1-e.padInfo.top,l=u-1-e.padInfo.left,h=1/(t*n);this.userCode=`\n      const ivec2 pads = ivec2(${c}, ${l});\n      const float avgMultiplier = float(${h});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${i};\n            wR += ${a}) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < ${u};\n            wC+= ${s}) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class tt{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterDepth,h=e.effectiveFilterHeight,d=e.effectiveFilterWidth,f=l-1-e.padInfo.front,p=h-1-e.padInfo.top,g=d-1-e.padInfo.left,m=1/(t*n*r);this.userCode=`\n      const ivec3 pads = ivec3(${f}, ${p}, ${g});\n      const float avgMultiplier = float(${m});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < ${l};\n            wD += ${i}) {\n          float dyD = float(dyDCorner + wD) / ${o}.0;\n\n          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < ${h};\n              wR += ${u}) {\n            float dyR = float(dyRCorner + wR) / ${a}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < ${d};\n                wC += ${c}) {\n              float dyC = float(dyCCorner + wC) / ${s}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n\n              dotProd += dyValue * avgMultiplier;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nt="return (a < 0.) ? b * a : a;";class rt{constructor(e,t,n){this.variableNames=["A","B"],this.outputShape=o.X.assertAndGetBroadcastShape(t,n),this.userCode=`\n      float binaryOperation(float a, float b) {\n        ${e}\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ot="\n  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));\n  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);\n";class at{constructor(e,t,n,r=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o.X.assertAndGetBroadcastShape(t,n);const a=this.outputShape.length;let s="";if(r)if(0===a||1===o.Lb.sizeFromShape(this.outputShape))s="\n          result.y = 0.;\n          result.z = 0.;\n          result.w = 0.;\n        ";else{if(s=`\n          ${Ye(a)} coords = getOutputCoords();\n        `,1===a)s+=`\n            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;\n            result.z = 0.;\n            result.w = 0.;\n          `;else{const e=Fe("coords",a);s+=`\n            bool nextRowOutOfBounds =\n              (${e[a-2]} + 1) >= ${this.outputShape[a-2]};\n            bool nextColOutOfBounds =\n              (${e[a-1]} + 1) >= ${this.outputShape[a-1]};\n            result.y = nextColOutOfBounds ? 0. : result.y;\n            result.z = nextRowOutOfBounds ? 0. : result.z;\n            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;\n          `}}this.userCode=`\n      vec4 binaryOperation(vec4 a, vec4 b) {\n        ${e}\n      }\n\n      void main() {\n        vec4 a = getAAtOutCoords();\n        vec4 b = getBAtOutCoords();\n\n        vec4 result = binaryOperation(a, b);\n        ${s}\n\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class st{constructor(e){this.variableNames=["A"],this.outputShape=e,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        float value = getAAtOutCoords();\n        if (isnan(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, minVal, maxVal));\n      }\n    "}getCustomSetupFunc(e,t){return(n,r)=>{null==this.minLoc&&(this.minLoc=n.getUniformLocationNoThrow(r,"minVal"),this.maxLoc=n.getUniformLocationNoThrow(r,"maxVal")),n.gl.uniform1f(this.minLoc,e),n.gl.uniform1f(this.maxLoc,t)}}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class it{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        vec4 value = getAAtOutCoords();\n\n        if (any(isnan(value))) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));\n      }\n    "}getCustomSetupFunc(e,t){return(n,r)=>{null==this.minLoc&&(this.minLoc=n.getUniformLocationNoThrow(r,"minVal"),this.maxLoc=n.getUniformLocationNoThrow(r,"maxVal")),n.gl.uniform1f(this.minLoc,e),n.gl.uniform1f(this.maxLoc,t)}}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ut{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode="\n      void main() {\n        float re = abs(getRealAtOutCoords());\n        float im = abs(getImagAtOutCoords());\n        float mx = max(re, im);\n\n        // sadly the length function in glsl is not underflow-safe\n        // (at least not on Intel GPUs). So the safe solution is\n        // to ensure underflow-safety in all cases.\n        setOutput(\n          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))\n        );\n      }\n    "}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ct{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,a="channelsLast"===e.dataFormat;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yR = 0; yR < ${e.outHeight}; yR++) {\n            int xR = wR + yR * ${t} - ${r};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int yC = 0; yC < ${e.outWidth}; yC++) {\n              int xC = wC + yC * ${n} - ${o};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              if (${a}) {\n                float dyValue = getDy(b, yR, yC, d2);\n                float xValue = getX(b, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              } else {\n                float dyValue = getDy(b, d2, yR, yC);\n                float xValue = getX(b, d1, xR, xC);\n                dotProd += (xValue * dyValue);\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class lt{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a="channelsLast"===e.dataFormat,s=t-1-e.padInfo.top,i=n-1-e.padInfo.left,u=a?1:2,c=a?2:3,l=a?3:1;this.userCode=`\n      const ivec2 pads = ivec2(${s}, ${i});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[${l}];\n\n        ivec2 dyCorner = ivec2(coords[${u}], coords[${c}]) - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${t}; wR++) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = ${t} - 1 - wR;\n\n          for (int wC = 0; wC < ${n}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = ${n} - 1 - wC;\n\n            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {\n\n              if (${a}) {\n                float xValue = getDy(batch, idyR, idyC, d2);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              } else {\n                float xValue = getDy(batch, d2, idyR, idyC);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class ht{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.padInfo.front,a=e.padInfo.top,s=e.padInfo.left;this.userCode=`\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int wF = coords.x;\n        int wR = coords.y;\n        int wC = coords.z;\n        int d1 = coords.w;\n        int d2 = coords.u;\n\n        float dotProd = 0.0;\n\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yF = 0; yF < ${e.outDepth}; yF++) {\n            int xF = wF + yF * ${t} - ${o};\n\n            if (xF < 0 || xF >= ${e.inDepth}) {\n              continue;\n            }\n\n            for (int yR = 0; yR < ${e.outHeight}; yR++) {\n              int xR = wR + yR * ${n} - ${a};\n\n              if (xR < 0 || xR >= ${e.inHeight}) {\n                continue;\n              }\n\n              for (int yC = 0; yC < ${e.outWidth}; yC++) {\n                int xC = wC + yC * ${r} - ${s};\n\n                if (xC < 0 || xC >= ${e.inWidth}) {\n                  continue;\n                }\n\n                float dyValue = getDy(b, yF, yR, yC, d2);\n                float xValue = getX(b, xF, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class dt{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=t-1-e.padInfo.front,u=n-1-e.padInfo.top,c=r-1-e.padInfo.left;this.userCode=`\n      const ivec3 pads = ivec3(${i}, ${u}, ${c});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d1 = coords.u;\n\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyFCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        float dotProd = 0.0;\n        for (int wF = 0; wF < ${t}; wF++) {\n          float dyF = float(dyFCorner + wF) / ${o}.0;\n\n          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {\n            continue;\n          }\n          int idyF = int(dyF);\n\n          int wFPerm = ${t} - 1 - wF;\n\n          for (int wR = 0; wR < ${n}; wR++) {\n            float dyR = float(dyRCorner + wR) / ${a}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n              fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            int wRPerm = ${n} - 1 - wR;\n\n            for (int wC = 0; wC < ${r}; wC++) {\n              float dyC = float(dyCCorner + wC) / ${s}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              int wCPerm = ${r} - 1 - wC;\n\n              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {\n                float xValue = getDy(batch, idyF, idyR, idyC, d2);\n                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ft{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int dm = coords.w;\n        int d2 = d1 * ${a} + dm;\n\n        float dotProd = 0.0;\n\n        // TO DO: Vec4 over the batch size\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yR = 0; yR < ${e.outHeight}; yR++) {\n            int xR = wR + yR * ${t} - ${r};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int yC = 0; yC < ${e.outWidth}; yC++) {\n              int xC = wC + yC * ${n} - ${o};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class pt{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a=t-1-e.padInfo.top,s=n-1-e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`\n      const ivec2 pads = ivec2(${a}, ${s});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        float dotProd = 0.0;\n\n        for (int wR = 0; wR < ${t}; wR++) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = ${t} - 1 - wR;\n\n          for (int wC = 0; wC < ${n}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = ${n} - 1 - wC;\n\n            // TO DO: Vec4 over the channelMul\n            for (int dm = 0; dm < ${i}; dm++) {\n              int d2 = d1 * ${i} + dm;\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, dm);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class gt{constructor(e,t=!1,n=null,r=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;const o=e.padInfo.top,a=e.padInfo.left,s=e.strideHeight,i=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,l=e.filterHeight,h=e.filterWidth,d=4*Math.floor(e.inChannels/4),f=e.inChannels%4,p="channelsLast"===e.dataFormat,g=p?1:2,m=p?2:3,b=p?3:1;let x="",y="";n&&(x=r?`float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:`\n          float activation(float x) {\n            ${n}\n          }\n        `,y="result = activation(result);");const v=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`\n      ${x}\n\n      const ivec2 strides = ivec2(${s}, ${i});\n      const ivec2 pads = ivec2(${o}, ${a});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords[${b}];\n\n        ivec2 xRCCorner =\n            ivec2(coords[${g}], coords[${m}]) * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${l}; wR++) {\n          int xR = xRCorner + wR * ${u};\n\n          if (xR < 0 || xR >= ${e.inHeight}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${h}; wC++) {\n            int xC = xCCorner + wC * ${c};\n\n            if (xC < 0 || xC >= ${e.inWidth}) {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < ${d}; d1 += 4) {\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              if (${p}) {\n                vec4 xValues = vec4(\n                  getX(batch, xR, xC, d1),\n                  getX(batch, xR, xC, d1 + 1),\n                  getX(batch, xR, xC, d1 + 2),\n                  getX(batch, xR, xC, d1 + 3)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec4 xValues = vec4(\n                  getX(batch, d1, xR, xC),\n                  getX(batch, d1 + 1, xR, xC),\n                  getX(batch, d1 + 2, xR, xC),\n                  getX(batch, d1 + 3, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n\n            if (${1===f}) {\n\n              if (${p}) {\n                dotProd +=\n                    getX(batch, xR, xC, ${d}) *\n                    getW(wR, wC, ${d}, d2);\n              } else {\n                dotProd +=\n                    getX(batch, ${d}, xR, xC) *\n                    getW(wR, wC, ${d}, d2);\n              }\n\n            } else if (${2===f}) {\n              vec2 wValues = vec2(\n                getW(wR, wC, ${d}, d2),\n                getW(wR, wC, ${d} + 1, d2)\n              );\n\n              if (${p}) {\n                vec2 xValues = vec2(\n                  getX(batch, xR, xC, ${d}),\n                  getX(batch, xR, xC, ${d} + 1)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec2 xValues = vec2(\n                  getX(batch, ${d}, xR, xC),\n                  getX(batch, ${d} + 1, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            } else if (${3===f}) {\n              vec3 wValues = vec3(\n                getW(wR, wC, ${d}, d2),\n                getW(wR, wC, ${d} + 1, d2),\n                getW(wR, wC, ${d} + 2, d2)\n              );\n\n              if (${p}) {\n                vec3 xValues = vec3(\n                  getX(batch, xR, xC, ${d}),\n                  getX(batch, xR, xC, ${d} + 1),\n                  getX(batch, xR, xC, ${d} + 2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec3 xValues = vec3(\n                  getX(batch, ${d}, xR, xC),\n                  getX(batch, ${d} + 1, xR, xC),\n                  getX(batch, ${d} + 2, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            }\n          }\n        }\n\n        float result = dotProd;\n        ${v}\n        ${y}\n        setOutput(result);\n      }\n    `}}class mt{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;const t=e.padInfo.front,n=e.padInfo.top,r=e.padInfo.left,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.filterDepth,h=e.filterHeight,d=e.filterWidth,f=4*Math.floor(e.inChannels/4),p=e.inChannels%4;this.userCode=`\n      const ivec3 strides = ivec3(${o}, ${a}, ${s});\n      const ivec3 pads = ivec3(${t}, ${n}, ${r});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d2 = coords.u;\n\n        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xFCorner = xFRCCorner.x;\n        int xRCorner = xFRCCorner.y;\n        int xCCorner = xFRCCorner.z;\n\n        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get\n        // y(yF, yR, yC, d2). ? = to be determined. : = across all\n        // values in that axis.\n        float dotProd = 0.0;\n        for (int wF = 0; wF < ${l}; wF++) {\n          int xF = xFCorner + wF * ${i};\n\n          if (xF < 0 || xF >= ${e.inDepth}) {\n            continue;\n          }\n\n          for (int wR = 0; wR < ${h}; wR++) {\n            int xR = xRCorner + wR * ${u};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${d}; wC++) {\n              int xC = xCCorner + wC * ${c};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              for (int d1 = 0; d1 < ${f}; d1 += 4) {\n                vec4 xValues = vec4(\n                  getX(batch, xF, xR, xC, d1),\n                  getX(batch, xF, xR, xC, d1 + 1),\n                  getX(batch, xF, xR, xC, d1 + 2),\n                  getX(batch, xF, xR, xC, d1 + 3)\n                );\n                vec4 wValues = vec4(\n                  getW(wF, wR, wC, d1, d2),\n                  getW(wF, wR, wC, d1 + 1, d2),\n                  getW(wF, wR, wC, d1 + 2, d2),\n                  getW(wF, wR, wC, d1 + 3, d2)\n                );\n\n                dotProd += dot(xValues, wValues);\n              }\n\n              if (${1===p}) {\n                dotProd +=\n                  getX(batch, xF, xR, xC, ${f}) *\n                  getW(wF, wR, wC, ${f}, d2);\n              } else if (${2===p}) {\n                vec2 xValues = vec2(\n                  getX(batch, xF, xR, xC, ${f}),\n                  getX(batch, xF, xR, xC, ${f} + 1)\n                );\n                vec2 wValues = vec2(\n                  getW(wF, wR, wC, ${f}, d2),\n                  getW(wF, wR, wC, ${f} + 1, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else if (${3===p}) {\n                vec3 xValues = vec3(\n                  getX(batch, xF, xR, xC, ${f}),\n                  getX(batch, xF, xR, xC, ${f} + 1),\n                  getX(batch, xF, xR, xC, ${f} + 2)\n                );\n                vec3 wValues = vec3(\n                  getW(wF, wR, wC, ${f}, d2),\n                  getW(wF, wR, wC, ${f} + 1, d2),\n                  getW(wF, wR, wC, ${f} + 2, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class bt{constructor(e,t=!1,n=null,r=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;const o=e.inHeight,a=e.inWidth,s=e.padInfo.top,i=e.padInfo.left,u=e.strideHeight,c=e.strideWidth,l=e.dilationHeight,h=e.dilationWidth,d=e.filterHeight,f=e.filterWidth,p=e.outChannels/e.inChannels;let g="",m="";n&&(g=r?`float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:`\n          float activation(float x) {\n            ${n}\n          }\n        `,m="result = activation(result);");const b=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`\n      ${g}\n\n      const ivec2 strides = ivec2(${u}, ${c});\n      const ivec2 pads = ivec2(${s}, ${i});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / ${p};\n        int q = d2 - d1 * ${p};\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < ${d}; wR++) {\n          int xR = xRCorner + wR * ${l};\n\n          if (xR < 0 || xR >= ${o}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${f}; wC++) {\n            int xC = xCCorner + wC * ${h};\n\n            if (xC < 0 || xC >= ${a}) {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n\n        float result = dotProd;\n        ${b}\n        ${m}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class xt{constructor(e,t=!1,n=null,r=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.outShape;const a=e.inHeight,s=e.inWidth,i=e.padInfo.top,u=e.padInfo.left,c=e.strideHeight,l=e.strideWidth,h=e.dilationHeight,d=e.dilationWidth,f=e.filterHeight,p=e.filterWidth,g=p;let m="int xR; int xC; int xCOffset;";for(let e=0;e<f;e++)for(let t=0;t<p;t++)m+=`\n          vec4 xTexelR${e}C${2*t} = vec4(0.);\n          vec4 wR${e}C${t} = vec4(0.);\n          vec4 xR${e}C${t} = vec4(0.);`;for(let e=0;e<f;e++)for(let t=0;t<g;t++){const n=2*t;if(m+=`\n          xR = xRCorner + ${e*h};\n          xC = xCCorner + ${n*d};\n        `,1===l){if(n<p&&(m+=u%2==1?`\n                xCOffset = xC + 1;\n                if(xR >= 0 && xR < ${a} && xCOffset >= 0 && xCOffset < ${s}) {\n                  xTexelR${e}C${n} = getX(batch, xR, xCOffset, d1);\n\n                  // Need to manually clear unused channels in case\n                  // we're reading from recycled texture.\n                  if(xCOffset + 1 >= ${s}) {\n                    xTexelR${e}C${n}.zw = vec2(0.);\n                  }\n                } else {\n                  xTexelR${e}C${n} = vec4(0.);\n                }\n\n                xCOffset = xC + 1 - 2;\n                if(xR >= 0 && xR < ${a} && xCOffset >= 0 && xCOffset < ${s}) {\n                  vec4 previous = getX(batch, xR, xCOffset, d1);\n\n                  // Need to manually clear unused channels in case\n                  // we're reading from recycled texture.\n                  if(xCOffset + 1 >= ${s}) {\n                    previous.zw = vec2(0.);\n                  }\n\n                  xR${e}C${n} = vec4(previous.zw, xTexelR${e}C${n}.xy);\n                } else {\n                  xR${e}C${n} = vec4(0, 0, xTexelR${e}C${n}.xy);\n                }\n              `:`\n                if(xR >= 0 && xR < ${a} && xC >= 0 && xC < ${s}) {\n                  xTexelR${e}C${n} = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR${e}C${n} = vec4(0.);\n                }\n\n                xR${e}C${n} = xTexelR${e}C${n};\n              `,n+1<p)){const t=u%2==0?o.Lb.nearestLargerEven(d):d;d%2==0&&u%2==1||d%2!=0&&u%2!=1?(m+=`\n                  xCOffset = xC + ${u%2} + ${t};\n\n                  if(xR >= 0 && xR < ${a} &&\n                    xCOffset >= 0 && xCOffset < ${s}) {\n                    xTexelR${e}C${n+2} = getX(batch, xR, xCOffset, d1);\n                  }\n                `,d>1&&(m+=`\n                    xCOffset -= 2;\n                    if(xR >= 0 && xR < ${a} &&\n                      xCOffset >= 0 && xCOffset < ${s}) {\n                      xTexelR${e}C${n} = getX(batch, xR, xCOffset, d1);\n                    } else {\n                      xTexelR${e}C${n} = vec4(0.);\n                    }\n                  `),m+=`\n                  xR${e}C${n+1} = vec4(\n                    xTexelR${e}C${n}.zw, xTexelR${e}C${n+2}.xy);\n                `):m+=`\n                  xCOffset = xC + ${t};\n\n                  if(xR >= 0 && xR < ${a} &&\n                    xCOffset >= 0 && xCOffset < ${s}) {\n                    xTexelR${e}C${n+2} = getX(batch, xR, xCOffset, d1);\n                  }\n\n                  xR${e}C${n+1} = xTexelR${e}C${n+2};\n                `}}else n<p&&(m+=`\n              if(xR >= 0 && xR < ${a}) {\n            `,u%2==1?(m+=`\n                xCOffset = xC + 1 - ${l};\n                if(xCOffset >= 0 && xCOffset < ${s}) {\n                  xTexelR${e}C${n} = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR${e}C${n} = vec4(0.);\n                }\n\n                if(xC + 1 >= 0 && xC + 1 < ${s}) {\n                  xTexelR${e}C${n+2} = getX(batch, xR, xC + 1, d1);\n                } else {\n                  xTexelR${e}C${n+2} = vec4(0.);\n                }\n\n                xR${e}C${n} = vec4(\n                  xTexelR${e}C${n}.zw, xTexelR${e}C${n+2}.zw);\n              `,n+1<p&&(m+=`\n                  vec4 final = vec4(0.);\n                  xCOffset = xC + 1 + ${l};\n                  if(xCOffset >= 0 && xCOffset < ${s}) {\n                    final = getX(batch, xR, xCOffset, d1);\n                  }\n                  xR${e}C${n+1} = vec4(xTexelR${e}C${n+2}.xy, final.xy);\n                `)):(m+=`\n                if(xC >= 0 && xC < ${s}) {\n                  xTexelR${e}C${n} = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR${e}C${n} = vec4(0.);\n                }\n\n                xCOffset = xC + ${l};\n                if(xCOffset >= 0 && xCOffset < ${s}) {\n                  xTexelR${e}C${n+2} = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR${e}C${n+2} = vec4(0.);\n                }\n\n                xR${e}C${n} = vec4(\n                  xTexelR${e}C${n}.xy, xTexelR${e}C${n+2}.xy);\n              `,n+1<p&&(m+=`\n                  xR${e}C${n+1} = vec4(\n                    xTexelR${e}C${n}.zw, xTexelR${e}C${n+2}.zw);\n                `)),m+="}");n<p&&(m+=`\n            vec4 wTexelR${e}C${n} = getW(${e}, ${n}, d1, q);\n            wR${e}C${n} = vec4(wTexelR${e}C${n}.xz, wTexelR${e}C${n}.xz);\n          `,n+1<p&&(m+=`\n              vec4 wTexelR${e}C${n+1} = getW(${e}, ${n+1}, d1, q);\n              wR${e}C${n+1} =\n                vec4(wTexelR${e}C${n+1}.xz, wTexelR${e}C${n+1}.xz);`))}for(let e=0;e<f;e++)for(let t=0;t<p;t++)m+=`dotProd += xR${e}C${t} * wR${e}C${t};`;let b="",x="";n&&(b=r?`vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:`vec4 activation(vec4 x) {\n          ${n}\n        }`,x="result = activation(result);");const y=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`\n      ${b}\n\n      const ivec2 strides = ivec2(${c}, ${l});\n      const ivec2 pads = ivec2(${i}, ${u});\n\n      void main() {\n\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2;\n        int q = 0;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        vec4 dotProd = vec4(0.);\n\n        ${m}\n\n        vec4 result = dotProd;\n        ${y}\n        ${x}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class yt{constructor(e,t,n,r,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];const[a,s,i,u]=e,[c]=t,[l,h]=n;this.outputShape=[c,l,h,u];const d="bilinear"===r?1:0,[f,p]=[s-1+".0",i-1+".0"],[g,m,b]=l>1?[""+(s-1)/(l-1),"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0","0.5 * (y1+y2) * "+f],[x,y,v]=h>1?[""+(i-1)/(h-1),"(x2-x1) * width_ratio",`x1*${p} + float(x)*(width_scale)`]:["0.0","0.0","0.5 * (x1+x2) * "+p];this.userCode=`\n      const float height_ratio = float(${g});\n      const float width_ratio = float(${x});\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int y = coords[1];\n        int x = coords[2];\n        int d = coords[3];\n\n        // get box vals\n        float y1 = getBoxes(b,0);\n        float x1 = getBoxes(b,1);\n        float y2 = getBoxes(b,2);\n        float x2 = getBoxes(b,3);\n\n        // get image in batch index\n        int bInd = round(getBoxInd(b));\n        if(bInd < 0 || bInd >= ${a}) {\n          return;\n        }\n\n        float height_scale = ${m};\n        float width_scale = ${y};\n\n        float in_y = ${b};\n        if( in_y < 0.0 || in_y > ${f} ) {\n          setOutput(float(${o}));\n          return;\n        }\n        float in_x = ${v};\n        if( in_x < 0.0 || in_x > ${p} ) {\n          setOutput(float(${o}));\n          return;\n        }\n\n        vec2 sourceFracIndexCR = vec2(in_x,in_y);\n        if(${d} == 1) {\n          // Compute the four integer indices.\n          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);\n          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));\n\n          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);\n          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);\n          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);\n          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);\n\n          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);\n\n          float top = topLeft + (topRight - topLeft) * fracCR.x;\n          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;\n          float newValue = top + (bottom - top) * fracCR.y;\n          setOutput(newValue);\n        } else {\n          // Compute the coordinators of nearest neighbor point.\n          ivec2 sourceNearestCR = ivec2(floor(\n            sourceFracIndexCR + vec2(0.5,0.5)));\n          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);\n          setOutput(newValue);\n        }\n      }\n    `}}class vt{constructor(e,t,n){this.variableNames=["x"],this.outputShape=e;const r=e.length,o=t?"0.0":`getX(${wt(r,"coords")})`,a=e[e.length-1];let s="",i="";t?(s=n?"end != "+(a-1):"end != 0",i=n?"end + 1":"end - 1"):(s=n?"end + pow2 < "+a:"end >= pow2",i=n?"end + pow2":"end - pow2"),this.userCode=`\n      uniform float index;\n      void main() {\n        ${Ye(r)} coords = getOutputCoords();\n        int end = ${Ct(r,"coords")};\n        float val = ${o};\n        int pow2 = int(pow(2.0, index));\n        if (${s}) {\n          int idx = ${i};\n          ${Ct(r,"coords")} = idx;\n          val += getX(${wt(r,"coords")});\n        }\n        setOutput(val);\n      }\n    `}getCustomSetupFunc(e){return(t,n)=>{null==this.index&&(this.index=t.getUniformLocation(n,"index")),t.gl.uniform1f(this.index,e)}}}function wt(e,t){if(1===e)return""+t;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative sum for rank ${e} is not yet supported`)}function Ct(e,t){if(1===e)return""+t;if(2===e)return t+".y";if(3===e)return t+".z";if(4===e)return t+".w";throw Error(`Cumulative sum for rank ${e} is not yet supported`)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class It{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=u.DENSE;const t=d(e),n=je();this.outputShape=e,this.userCode=`\n      ivec3 outCoordsFromFlatIndex(int index) {\n        ${De(["r","c","d"],e)}\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2(${t[0]}, ${t[1]}));\n        int index = 4 * (resTexRC.x * ${t[1]} + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getA(rc.x, rc.y, rc.z);\n        }\n\n        ${n.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Et{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=u.DENSE;const t=d(e),n=je();this.outputShape=e,this.userCode=`\n      ivec3 outCoordsFromFlatIndex(int index) {\n        ${De(["r","c","d"],e)}\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2(${t[0]}, ${t[1]}));\n        int index = 4 * (resTexRC.x * ${t[1]} + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));\n        }\n\n        ${n.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class $t{constructor(e,t,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`\n    void main() {\n      ivec4 coords = getOutputCoords();\n      int b = coords[0];\n      int h = ${this.getHeightCoordString()};\n      int w = ${this.getWidthCoordString()};\n      int d = ${this.getDepthCoordString()};\n\n      int in_h = h / ${t};\n      int offset_h = imod(h, ${t});\n      int in_w = w / ${t};\n      int offset_w = imod(w, ${t});\n      int offset_d = (offset_h * ${t} + offset_w) *\n        ${this.getOutputDepthSize()};\n      int in_d = d + offset_d;\n\n      float result = ${this.getInputSamplingString()};\n      setOutput(result);\n    }\n  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ot{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode="\n      void main() {\n          ivec2 coords = getOutputCoords();\n          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;\n          setOutput(val);\n      }\n    "}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class kt{constructor(e){this.variableNames=["A"],this.outTexUsage=c.DOWNLOAD;const t=je();this.outputShape=e,this.userCode=`\n      ${Be}\n\n      void main() {\n        float x = getAAtOutCoords();\n        ${t.output} = encode_float(x);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Rt{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=c.DOWNLOAD;const t=je();this.outputShape=e,this.userCode=`\n      ${Be}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));\n        ${t.output} = encode_float(x);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class St{constructor(e,t,n=!1){this.variableNames=["A"];const r=je(),[o,a]=t;this.outputShape=e;let s="result";n&&(s="floor(result * 255. + 0.5)"),this.userCode=`\n      ${Le(e)}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        int flatIndex = getFlatIndex(coords);\n        int offset = imod(flatIndex, 4);\n\n        flatIndex = idiv(flatIndex, 4, 1.);\n\n        int r = flatIndex / ${a};\n        int c = imod(flatIndex, ${a});\n        vec2 uv = (vec2(c, r) + halfCR) / vec2(${a}.0, ${o}.0);\n        vec4 values = ${r.texture2D}(A, uv);\n\n        float result;\n\n        if(offset == 0) {\n          result = values[0];\n        } else if(offset == 1) {\n          result = values[1];\n        } else if(offset == 2) {\n          result = values[2];\n        } else {\n          result = values[3];\n        }\n\n        ${r.output} = vec4(${s}, 0., 0., 0.);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class At{constructor(e,t,n=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const r=je(),[o,a]=t;this.outputShape=e;let s="",i="result";n&&(i="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){const i=2*t+n;s+=`\n          localCoords = coords;\n          if(localCoords[2] + ${n} < ${e[2]}) {\n            localCoords[2] += ${n};\n            if(localCoords[1] + ${t} < ${e[1]}) {\n              localCoords[1] += ${t};\n\n              flatIndex = getFlatIndex(localCoords);\n              offset = imod(flatIndex, 4);\n\n              flatIndex = idiv(flatIndex, 4, 1.);\n\n              r = flatIndex / ${a};\n              c = imod(flatIndex, ${a});\n              uv = (vec2(c, r) + halfCR) / vec2(${a}.0, ${o}.0);\n              values = ${r.texture2D}(A, uv);\n\n              if(offset == 0) {\n                result[${i}] = values[0];\n              } else if(offset == 1) {\n                result[${i}] = values[1];\n              } else if(offset == 2) {\n                result[${i}] = values[2];\n              } else {\n                result[${i}] = values[3];\n              }\n            }\n          }\n        `}this.userCode=`\n      ${Le(e)}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        vec4 result = vec4(0.);\n        int flatIndex, r, c, offset;\n        ivec3 localCoords;\n        vec2 uv;\n        vec4 values;\n\n        ${s}\n\n        ${r.output} = ${i};\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Tt{constructor(e,t){this.outputShape=[],this.variableNames=["x"],this.outputShape=e,this.userCode="\n      uniform float value;\n      void main() {\n        // Input can be obtained from uniform value.\n        setOutput(value);\n      }\n    "}getCustomSetupFunc(e){return(t,n)=>{null==this.valueLoc&&(this.valueLoc=t.getUniformLocationNoThrow(n,"value")),t.gl.uniform1f(this.valueLoc,e)}}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class _t{constructor(e,t,n){this.variableNames=["A","indices"];const r=e.slice();r[n]=t,this.outputShape=r,this.rank=r.length;const o=Ye(this.rank),a=function(e,t){const n=e.length;if(n>4)throw Error(`Gather for rank ${n} is not yet supported`);if(1===n)return"int(getIndices(resRC))";const r=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[];for(let n=0;n<e.length;n++)n===t?o.push(`int(getIndices(${r[n]}))`):o.push(""+r[n]);return o.join()}(e,n);this.userCode=`\n      void main() {\n        ${o} resRC = getOutputCoords();\n        setOutput(getA(${a}));\n      }\n    `}}class Nt{constructor(e,t,n){this.sliceDim=e,this.strides=t,this.variableNames=["x","indices"],this.outputShape=n;const r=Ye(t.length),o=Ye(n.length),a=this.sliceDim>1?"strides[j]":"strides";this.userCode=`\n        ${r} strides = ${r}(${this.strides});\n         void main() {\n          ${o} coords = getOutputCoords();\n          int flattenIndex = 0;\n          for (int j = 0; j < ${this.sliceDim}; j++) {\n            int index = round(getIndices(coords[0], j));\n            flattenIndex += index * ${a};\n          }\n          setOutput(getX(flattenIndex, coords[1]));\n        }\n      `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ft(e){const t=je();return function(e,t){const n=O(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(g(e,()=>e.shaderSource(n,t)),g(e,()=>e.compileShader(n)),!1===e.getShaderParameter(n,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(n)),new Error("Failed to compile vertex shader.");return n}(e,`${t.version}\n    precision highp float;\n    ${t.attribute} vec3 clipSpacePos;\n    ${t.attribute} vec2 uv;\n    ${t.varyingVs} vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }`)}function jt(e){return function(e,t){const n=O(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return g(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),g(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),n}(e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Dt(e){return function(e,t){const n=O(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return g(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n)),g(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),n}(e,new Uint16Array([0,1,2,2,1,3]))}function Lt(e,t,n,r,a,s){!function(e,t){const n=Object(o.jb)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0){throw new Error("Requested texture size "+`[${e}x${t}]`+" is invalid.")}if(e>n||t>n){throw new Error("Requested texture size "+`[${e}x${t}]`+" greater than WebGL maximum on this browser / GPU "+`[${n}x${n}]`+".")}}(t,n);const i=function(e){return O(e,()=>e.createTexture(),"Unable to create WebGLTexture.")}(e),u=e.TEXTURE_2D;return g(e,()=>e.bindTexture(u,i)),g(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),g(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),g(e,()=>e.texParameteri(u,e.TEXTURE_MIN_FILTER,e.NEAREST)),g(e,()=>e.texParameteri(u,e.TEXTURE_MAG_FILTER,e.NEAREST)),g(e,()=>e.texImage2D(u,0,r,t,n,0,a,s,null)),g(e,()=>e.bindTexture(e.TEXTURE_2D,null)),i}function Bt(e){return e.internalFormatFloat}function Pt(e){return e.internalFormatHalfFloat}function Mt(e){return e.downloadTextureFormat}function Ut(e){return e.internalFormatPackedFloat}function Vt(e){return e.internalFormatPackedHalfFloat}function zt(e,t,n,r,o,a,s,i){const u=e,c=new Float32Array(function(e,t){const[n,r]=f(e,t);return n*r*4}(a,s));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Wt{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];const t=Object(o.jb)().getNumber("WEBGL_VERSION");null!=e?(this.gl=e,function(e,t){a[e]=t}(t,e)):this.gl=i(t);let n="WEBGL_color_buffer_float";if(1===Object(o.jb)().getNumber("WEBGL_VERSION")){const e="OES_texture_float",t="OES_texture_half_float";if(this.textureFloatExtension=b(this.gl,e),j(this.gl,t))this.textureHalfFloatExtension=b(this.gl,t);else if(Object(o.jb)().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),j(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=b(this.gl,"EXT_color_buffer_half_float");else if(Object(o.jb)().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",j(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!j(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=jt(this.gl),this.indexBuffer=Dt(this.gl),this.framebuffer=function(e){return O(e,()=>e.createFramebuffer(),"Unable to create WebGLFramebuffer.")}(this.gl),this.textureConfig=p(this.gl,this.textureHalfFloatExtension)}get debug(){return Object(o.jb)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");const e=this.gl;g(e,()=>e.finish()),g(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),g(e,()=>e.deleteFramebuffer(this.framebuffer)),g(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),g(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),g(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=h(t,n);return Lt(e,o,a,Bt(r),r.textureFormatFloat,e.FLOAT)}(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=h(t,n);return Lt(e,o,a,Pt(r),r.textureFormatFloat,r.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=h(t,n);return Lt(e,o,a,Mt(r),e.RGBA,e.UNSIGNED_BYTE)}(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),function(e,t,n){g(e,()=>e.bindTexture(e.TEXTURE_2D,t)),n.data instanceof Uint8Array?g(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data)):g(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)),g(e,()=>e.bindTexture(e.TEXTURE_2D,null))}(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,n,r){this.throwIfDisposed(),function(e,t,n,r,o,a){let s,i,u;g(e,()=>e.bindTexture(e.TEXTURE_2D,t)),o instanceof Uint8Array?(s=new Uint8Array(n*r*4),i=e.UNSIGNED_BYTE,u=e.RGBA):(s=new Float32Array(n*r*4),i=e.FLOAT,u=a.internalFormatPackedFloat),s.set(o),g(e,()=>e.texImage2D(e.TEXTURE_2D,0,u,n,r,0,e.RGBA,i,s)),g(e,()=>e.bindTexture(e.TEXTURE_2D,null))}(this.gl,e,t,n,r,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=f(t,n);return Lt(e,o,a,Vt(r),e.RGBA,r.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=f(t,n);return Lt(e,o,a,Ut(r),e.RGBA,e.FLOAT)}(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(E(this.gl,this.framebuffer),this.outputTexture=null),g(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,n){return this.downloadMatrixDriver(e,()=>function(e,t,n,r){const[o,a]=h(t,n),s=new Uint8Array(t*n*4);return g(e,()=>e.readPixels(0,0,o,a,r.downloadTextureFormat,e.UNSIGNED_BYTE,s)),new Float32Array(s.buffer)}(this.gl,t,n,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,n,r,o,a){return zt(this.gl,e,0,0,0,o,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return function(e,t,n){const r=e,o=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,o),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),o}(this.gl,e,t)}createBufferFromTexture(e,t,n){this.bindTextureToFrameBuffer(e);const r=function(e,t,n,r){const o=e.createBuffer();g(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,o));const a=16*t*n;return g(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,a,e.STREAM_READ)),g(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,0)),g(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),o}(this.gl,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r}createAndWaitForFence(){const e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n;if(Object(o.jb)().getBool("WEBGL_FENCE_API_ENABLED")){const r=e,o=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=()=>{const e=r.clientWaitSync(o,0,0);return e===r.ALREADY_SIGNALED||e===r.CONDITION_SATISFIED},t=o}else Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),n=()=>this.isQueryAvailable(t,Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):n=()=>!0;return{query:t,isFencePassed:n}}downloadMatrixFromPackedTexture(e,t,n){return this.downloadMatrixDriver(e,()=>function(e,t,n){const r=new Float32Array(t*n*4);return g(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,r)),r}(this.gl,t,n))}createProgram(e){this.throwIfDisposed();const t=this.gl,n=x(t,e),r=Ft(t),o=function(e){return O(e,()=>e.createProgram(),"Unable to create WebGLProgram.")}(t);return g(t,()=>t.attachShader(o,r)),g(t,()=>t.attachShader(o,n)),function(e,t){if(g(e,()=>e.linkProgram(t)),!1===e.getProgramParameter(t,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}(t,o),this.debug&&v(t,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=function(e,t,n){return g(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),w(e,t,"clipSpacePos",n,3,20,0)&&w(e,t,"uv",n,2,20,12)}(t,this.program,this.vertexBuffer)),o}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&g(this.gl,()=>this.gl.deleteProgram(e))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&v(this.gl,this.program),g(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,n=!0){return this.throwIfDisposed(),n?function(e,t,n){return O(e,()=>e.getUniformLocation(t,n),'uniform "'+n+'" not present in program.')}(this.gl,e,t):function(e,t,n){return e.getUniformLocation(t,n)}(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),g(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),C(this.gl,e,t,n)}setOutputMatrixTexture(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)}setOutputPackedMatrixTexture(e,t,n){this.throwIfDisposed();const[r,o]=f(t,n);this.setOutputMatrixTextureDriver(e,r,o)}setOutputMatrixWriteRegion(e,t,n,r){this.setOutputMatrixWriteRegionDriver(n,e,r,t)}setOutputPackedMatrixWriteRegion(e,t,n,r){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&v(this.gl,this.program),$(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();const e=this.gl;this.debug&&this.debugValidate(),g(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),g(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=b(this.gl,2===Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){const e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}const e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){const e=this.gl,t=this.getQueryTimerExtensionWebGL2();return void e.endQuery(t.TIME_ELAPSED_EXT)}const e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await o.Lb.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){const t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}{const t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){const t=this.gl,n=this.getQueryTimerExtensionWebGL2(),r=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),r&&!this.disjoint}{const t=this.getQueryTimerExtensionWebGL1(),n=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){const e=function(e){let t=0;for(;t<e.length;++t){if(!e[t]())break}return t-1}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){const{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||o.Lb.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),I(this.gl,e,this.framebuffer),this.debug&&$(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(I(this.gl,this.outputTexture,this.framebuffer),this.debug&&$(this.gl)):E(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);const n=t();return this.unbindTextureToFrameBuffer(),n}setOutputMatrixTextureDriver(e,t,n){this.throwIfDisposed();const r=this.gl;I(r,e,this.framebuffer),this.debug&&$(r),this.outputTexture=e,g(r,()=>r.viewport(0,0,t,n)),g(r,()=>r.scissor(0,0,t,n))}setOutputMatrixWriteRegionDriver(e,t,n,r){this.throwIfDisposed(),g(this.gl,()=>this.gl.scissor(e,t,n,r))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw new Error("No GPU program is currently set.")}}function Gt(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,n)=>{const r=e.logicalShape,a=t[n],s=a.shape;if(!o.Lb.arraysEqual(r,s))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${r} and ${s} must match`);if(e.isUniform&&a.isUniform)return;const i=e.texShape,u=a.isUniform?null:a.texData.texShape;if(!o.Lb.arraysEqual(i,u))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${i} and ${u} must match`)})}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Xt{constructor(e,t,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;const{filterWidth:r,inChannels:o,strideWidth:a,strideHeight:s,padInfo:i,outWidth:u,dilationWidth:c,dilationHeight:l,dataFormat:h}=n,{left:d,top:f}=i,p=o*r,g=je(),m="channelsLast"===h,b=m?0:1,x=m?1:2;let y="";for(let n=0;n<=1;n++)for(let r=0;r<=1;r++)y+=`\n          blockIndex = rc.y + ${r};\n          pos = rc.x + ${n};\n\n          if(blockIndex < ${e[1]} && pos < ${e[0]}) {\n            offsetY = int(blockIndex / (${u})) * ${s} - ${f};\n            d0 = offsetY + ${l} * (pos / ${p});\n\n            if(d0 < ${t[b]} && d0 >= 0) {\n\n              offsetX = int(mod(float(blockIndex), ${u}.) * ${a}. - ${d}.);\n              d1 = offsetX + ${c} * (int(mod(float(pos), ${p}.) / ${o}.));\n\n              if(d1 < ${t[x]} && d1 >= 0) {\n\n                ch = int(mod(float(pos), ${o}.));\n\n                if (${m}) {\n                  innerDims = vec2(d1, ch);\n                  result[${2*n+r}] = getChannel(\n                    getA(d0, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                } else {\n                  innerDims = vec2(d0, d1);\n                  result[${2*n+r}] = getChannel(\n                    getA(ch, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                }\n              }\n            }\n          }\n        `;this.userCode=`\n      void main() {\n        ivec2 rc = getOutputCoords();\n\n        vec4 result = vec4(0);\n\n        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;\n        vec2 innerDims;\n\n        ${y}\n\n        ${g.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class qt{constructor(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[];const a=t,s=e[3]-1;let i;this.outputShape=e;const u=`float(${n}) + float(${r}) * sum`;i=.5===o?`inversesqrt(${u})`:1===o?`1.0/(${u})`:`exp(log(${u}) * float(-${o}));`,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -${a}; j <= ${a}; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  ${s}) {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * ${i};\n        setOutput(val);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ht{constructor(e,t,n,r,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=n,this.alpha=r,this.beta=o,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n\n        float result = 0.0;\n        for (int d = 0; d < ${this.depth}; ++d) {\n          int depthBegin = int(max(0.0, float(d - ${t})));\n          int depthEnd = int(min(float(${this.depth}),\n              float(d + ${t} + 1)));\n\n          const int MIN_DEPTH_BEGIN = 0;\n          const int MAX_DEPTH_END = ${this.depth};\n\n          float norm = 0.0;\n          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd) {\n              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);\n            }\n            else {\n              break;\n            }\n          }\n\n          norm = float(${r}) * norm + float(${n});\n\n          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd){\n              float dyi = -2.0 * float(${r})\n                * float(${o})\n                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)\n                / norm;\n              if (k == d) {\n                dyi += pow(norm, -1.0 * ${o});\n              }\n              if (k == coords[3]) {\n                dyi *= getDy(b, r, c, d);\n                result += dyi;\n              }\n            }\n            else {\n              break;\n            }\n          }\n      }\n      setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Kt{constructor(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;const a=t,s=e[3]-1;let i;this.outputShape=e;const u=`float(${n}) + float(${r}) * sum`;i=.5===o?`inversesqrt(${u})`:1===o?`1.0/(${u})`:`exp(log(${u}) * float(-${o}));`,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords.x;\n        int r = coords.y;\n        int c = coords.z;\n        int d = coords.w;\n\n        bool hasNextCol = d < ${this.outputShape[3]};\n        bool hasNextRow = c < ${this.outputShape[2]};\n\n        vec4 sum = vec4(0.);\n        vec4 xFragAtOutputCoords = getX(b, r, c, d);\n\n        vec4 xAtOutputCoords = vec4(\n          getChannel(xFragAtOutputCoords, vec2(c, d)),\n          hasNextCol ?\n            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,\n          hasNextRow ?\n            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0\n        );\n\n        int firstChannel = d - ${a};\n        vec2 cache = vec2(0.);\n        if(firstChannel >= 0){\n          vec4 firstChannelFrag = getX(b, r, c, firstChannel);\n          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));\n            if(hasNextRow){\n              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));\n            }\n        }\n\n        ivec2 depth = ivec2(d, d + 1);\n        for (int j = - ${a}; j <= ${a}; j++) {\n          ivec2 idx = depth + j;\n          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));\n          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${s}));\n\n          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;\n          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;\n\n          if(depthInRange || depthPlusOneInRange){\n            vec4 z = vec4(0.);\n            vec4 xFragAtCurrentDepth;\n            z.xz = cache.xy;\n            if(depthPlusOneInRange && hasNextCol){\n              xFragAtCurrentDepth = idx.y != d ?\n                getX(b, r, c, idx.y) : xFragAtOutputCoords;\n              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));\n              if(hasNextRow){\n                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));\n              }\n            }\n            cache.xy = z.yw;\n            sum += z * z;\n          }\n        }\n        vec4 result = xAtOutputCoords * ${i};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Yt{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideHeight,n=e.strideWidth,r=e.dilationHeight,o=e.effectiveFilterHeight,a=e.effectiveFilterWidth,s=o-1-e.padInfo.top,i=a-1-e.padInfo.left,u=o*a-1;this.userCode=`\n      const ivec2 pads = ivec2(${s}, ${i});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${o};\n          wR += ${r}) {\n          float dyR = float(dyRCorner + wR) / ${t}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < ${a}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${n}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = ${u} - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * ${a} + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class Qt{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.dilationDepth,a=e.dilationHeight,s=e.dilationWidth,i=e.effectiveFilterDepth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=i-1-e.padInfo.front,h=u-1-e.padInfo.top,d=c-1-e.padInfo.left,f=i*u*c-1;this.userCode=`\n      const ivec3 pads = ivec3(${l}, ${h}, ${d});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < ${i};\n           wD += ${o}) {\n          float dyD = float(dyDCorner + wD) / ${t}.0;\n\n          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < ${u};\n              wR += ${a}) {\n            float dyR = float(dyRCorner + wR) / ${n}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < ${c};\n                wC += ${s}) {\n              float dyC = float(dyCCorner + wC) / ${r}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n              int maxPosValue = ${f} -\n                  int(getMaxPos(batch, idyD, idyR, idyC, ch));\n\n              // Get the current value, check it against the value from the\n              // position matrix.\n              int curPosValue =\n                  wD * ${u} * ${c} +\n                  wR * ${c} + wC;\n              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n              dotProd += dyValue * mask;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Jt{constructor(e,t,n,r=!1,o=!1,a=!1,s=null,i=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n;const u=r?e[1]:e[2],c=Math.ceil(u/2),l=r?"i * 2, rc.y":"rc.y, i * 2",h=o?"rc.z, i * 2":"i * 2, rc.z",d=r?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=o?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"];let p="",g="";s&&(p=i?`vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          ${s}\n        }`:`vec4 activation(vec4 x) {\n          ${s}\n        }`,g="result = activation(result);");const m=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights");let b="rc.x",x="rc.x";e[0]<t[0]?b=`int(min(float(rc.x), ${e[0]-1}.))`:t[0]<e[0]&&(x=`int(min(float(rc.x), ${t[0]-1}.))`),this.userCode=`\n      ${p}\n\n      const float sharedDimension = ${c}.0;\n\n      vec4 dot2x2ARowBCol(ivec3 rc) {\n        vec4 result = vec4(0);\n        for (int i = 0; i < ${c}; i++) {\n          int batchA = ${b};\n          int batchB = ${x};\n          vec4 a = getMatrixA(batchA, ${l});\n          vec4 b = getMatrixB(batchB, ${h});\n\n          // These swizzled products need to be separately added.\n          // See: https://github.com/tensorflow/tfjs/issues/1735\n          result += (${d[0]} * ${f[0]});\n          result += (${d[1]} * ${f[1]});\n        }\n        return result;\n      }\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n        vec4 result = dot2x2ARowBCol(rc);\n\n        ${m}\n\n        ${g}\n\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zt{constructor(e,t,n){this.variableNames=["probs"],this.outputShape=[e,n],this.userCode=`\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < ${t-1}; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(${t-1}));\n      }\n    `}getCustomSetupFunc(e){return(t,n)=>{null==this.seedLoc&&(this.seedLoc=t.getUniformLocation(n,"seed")),t.gl.uniform1f(this.seedLoc,e)}}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class en{constructor(e,t,n,r){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(${r}), float(${n}),\n                      float(index == coords.y)));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class tn{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e;const t=e.length;if(0===t)this.userCode="\n        void main() {\n          setOutput(vec4(getA(), 0., 0., 0.));\n        }\n      ";else{const n=Fe("rc",t),r=Ye(t),o=function(e,t,n){if(1===e)return"rc > "+t[0];let r="";for(let o=e-2;o<e;o++)r+=`${n[o]} >= ${t[o]}`,o<e-1&&(r+="||");return r}(t,e,n),a=function(e,t,n,r){if(1===e)return"";const o=r.slice(-2);return`\n    int r = ${o[0]};\n    int c = ${o[1]};\n    int rp1 = r + 1;\n    int cp1 = c + 1;\n\n    bool cEdge = cp1 >= ${t};\n    bool rEdge = rp1 >= ${n};\n  `}(t,e[e.length-1],e[e.length-2],n),s=function(e,t){const n=e.length,r=function(e,t){const n=[];for(let r=0;r<=1;r++)for(let o=0;o<=1;o++){let a=`${0===r?"r":"rp1"}, ${0===o?"c":"cp1"}`;for(let n=2;n<e;n++)a=t[t.length-1-n]+","+a;n.push(a)}return n}(n,t);if(1===n)return`getA(rc),\n            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),\n            0, 0`;return`getA(${r[0]}),\n          cEdge ? 0. : getA(${r[1]}),\n          rEdge ? 0. : getA(${r[2]}),\n          rEdge || cEdge ? 0. : getA(${r[3]})`}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,n);this.userCode=`\n        void main() {\n          ${r} rc = getOutputCoords();\n\n          if(${o}) {\n            setOutput(vec4(0));\n          } else {\n            ${a}\n\n            setOutput(vec4(${s}));\n          }\n        }\n      `}}}class nn{constructor(e,t,n){this.variableNames=["x"],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Ye(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r);this.userCode=1!==r?`\n      ${o} start = ${o}(${a});\n      ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outC = getOutputCoords();\n        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {\n          setOutput(float(${n}));\n        } else {\n          ${o} coords = outC - start;\n          setOutput(getX(${i}));\n        }\n      }\n    `:`\n        int start = ${a};\n        int end = ${s};\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start || outC >= end) {\n            setOutput(float(${n}));\n          } else {\n            setOutput(getX(outC - start));\n          }\n        }\n      `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class rn{constructor(e,t,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Ye(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=Fe("rc",r),u=Fe("source",r),c=`${i[r-1]} < ${this.outputShape[r-1]}`,l=1===r?"source":`vec2(${u.slice(-2).join()})`,h=[o+" rc = outputLoc;",`${i[r-1]} += 1;\n       if(${c}) {\n      `,1===r?"":`}\n       rc = outputLoc;\n       ${i[r-2]} += 1;\n       if(${i[r-2]} < ${this.outputShape[r-2]}) {`,1===r?"":`  ${i[r-1]} += 1;\n         if(${c}) {`],d=1===r?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))";let f="";for(let e=0,t=1===r?2:4;e<t;e++)f+=`\n        ${h[e]}\n        if (${d}) {\n          result[${e}] = float(${n});\n        } else {\n          ${o} source = rc - start;\n          result[${e}] = getChannel(getX(${u.join()}), ${l});\n        }\n      `;f+=1===r?"} ":"}}",this.userCode=`\n      const ${o} start = ${o}(${a});\n      const ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        ${f}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class on{constructor(e,t,n,r=!1,o=!1){if(this.variableNames=["x"],"avg"===t&&n)throw new Error("Cannot compute positions for average pool.");const a=e.filterWidth,s=e.strideHeight,i=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterHeight,h=e.effectiveFilterWidth,d=e.padInfo.top,f=e.padInfo.left;this.outputShape=e.outShape;const p="avg"===t,g=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,m=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`;let b="0.0";if(p||(b="-1.0 / 1e-20"),n){const t=">=";return void(this.userCode=`\n        const ivec2 strides = ivec2(${s}, ${i});\n        const ivec2 pads = ivec2(${d}, ${f});\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < ${l};\n              wR += ${u}) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${h};\n                wC += ${c}) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value ${t} currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = ${r?o?g:m:`wR * ${h} + wC`};\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      `)}let x=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(x="avgValue / count");const y=4*Math.floor(a/4),v=a%4,w=`\n      if (${p}) {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    `;this.userCode=`\n      const ivec2 strides = ivec2(${s}, ${i});\n      const ivec2 pads = ivec2(${d}, ${f});\n      const float initializationValue = ${b};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= ${e.inWidth}) {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(${b});\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < ${l};\n            wR += ${u}) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= ${e.inHeight}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${y}; wC += 4) {\n            int xC = xCCorner + wC * ${c};\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              getValue(batch, xR, xC + 2 * ${c}, d),\n              getValue(batch, xR, xC + 3 * ${c}, d)\n            );\n\n            ${w}\n          }\n\n          int xC = xCCorner + ${y};\n          if (${1===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            ${w}\n          } else if (${2===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              initializationValue,\n              initializationValue\n            );\n\n            ${w}\n          } else if (${3===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              getValue(batch, xR, xC + 2 * ${c}, d),\n              initializationValue\n            );\n\n            ${w}\n          }\n        }\n        setOutput(${x});\n      }\n    `}}class an{constructor(e,t,n,r=!1,o=!1){if(this.variableNames=["x"],"avg"===t&&n)throw new Error("Cannot compute positions for average pool.");const a=e.filterWidth,s=e.strideDepth,i=e.strideHeight,u=e.strideWidth,c=e.dilationDepth,l=e.dilationHeight,h=e.dilationWidth,d=e.effectiveFilterDepth,f=e.effectiveFilterHeight,p=e.effectiveFilterWidth,g=e.padInfo.front,m=e.padInfo.top,b=e.padInfo.left;this.outputShape=e.outShape;const x="avg"===t;let y="0.0";if(x||(y="-1.0 / 1e-20"),n){const t=">=";return void(this.userCode=`\n        const ivec3 strides =\n            ivec3(${s}, ${i}, ${u});\n        const ivec3 pads = ivec3(${g}, ${m}, ${b});\n\n        void main() {\n          ivec5 coords = getOutputCoords();\n          int batch = coords.x;\n          int ch = coords.u;\n\n          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n          int xDCorner = xCorner.x;\n          int xRCorner = xCorner.y;\n          int xCCorner = xCorner.z;\n\n          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n\n          for (int wD = 0; wD < ${d};\n              wD += ${c}) {\n            int xD = xDCorner + wD;\n\n            if (xD < 0 || xD >= ${e.inDepth}) {\n              continue;\n            }\n\n            for (int wR = 0; wR < ${f};\n                wR += ${l}) {\n              int xR = xRCorner + wR;\n\n              if (xR < 0 || xR >= ${e.inHeight}) {\n                continue;\n              }\n\n              for (int wC = 0; wC < ${p};\n                  wC += ${h}) {\n                int xC = xCCorner + wC;\n\n                if (xC < 0 || xC >= ${e.inWidth}) {\n                  continue;\n                }\n\n                float value = getX(batch, xD, xR, xC, ch);\n\n                // If a min / max value has already been found, use it. If not,\n                // use the current value.\n                float currMinMaxValue = mix(\n                    value, minMaxValue, minMaxValueFound);\n                if (value ${t} currMinMaxValue) {\n                  minMaxValue = value;\n                  minMaxValueFound = 1.0;\n                  minMaxPosition = ${r?o?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${f} * ${p} +\n                      wR * ${p} + wC`};\n                }\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      `)}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / count");const w=4*Math.floor(a/4),C=a%4,I=`\n      if (${x}) {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    `;this.userCode=`\n      const ivec3 strides =\n        ivec3(${s}, ${i}, ${u});\n      const ivec3 pads = ivec3(${g}, ${m}, ${b});\n      const float initializationValue = ${y};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xD, int xR, int xC, int ch) {\n        if (xC < 0 || xC >= ${e.inWidth}) {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xD, xR, xC, ch);\n      }\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xDCorner = xCorner.x;\n        int xRCorner = xCorner.y;\n        int xCCorner = xCorner.z;\n\n        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(${y});\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wD = 0; wD < ${d};\n            wD += ${c}) {\n          int xD = xDCorner + wD;\n\n          if (xD < 0 || xD >= ${e.inDepth}) {\n            continue;\n          }\n\n          for (int wR = 0; wR < ${f};\n            wR += ${l}) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${w}; wC += 4) {\n              int xC = xCCorner + wC * ${h};\n\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${h}, ch),\n                getValue(batch, xD, xR, xC + 2 * ${h}, ch),\n                getValue(batch, xD, xR, xC + 3 * ${h}, ch)\n              );\n\n              ${I}\n            }\n\n            int xC = xCCorner + ${w};\n            if (${1===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                initializationValue,\n                initializationValue,\n                initializationValue\n              );\n\n              ${I}\n            } else if (${2===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${h}, ch),\n                initializationValue,\n                initializationValue\n              );\n\n              ${I}\n            } else if (${3===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${h}, ch),\n                getValue(batch, xD, xR, xC + 2 * ${h}, ch),\n                initializationValue\n              );\n\n              ${I}\n            }\n          }\n          setOutput(${v});\n        }\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class sn{constructor(e,t){this.variableNames=["x"];const{windowSize:n,batchSize:r,inSize:o,outSize:a}=e;this.outputShape=[r,a];let s="0.0",i="";"prod"===t?s="1.0":"min"===t?(s="1.0 / 1e-20",i="min"):"max"===t&&(s="-1.0 / 1e-20",i="max");let u=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?u="sumValue":"prod"===t?u="prodValue":"all"===t?u="allValue":"any"===t&&(u="anyValue");const c=4*Math.floor(n/4),l=n%4;let h=`\n      if (${"sum"===t}) {\n        sumValue += dot(values, ones);\n      } else if (${"prod"===t}) {\n        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);\n        prodValue *= tmp[0] * tmp[1];\n      } else {\n        minMaxValue = ${i}(values, minMaxValue);\n      }\n    `,d="vec4";"all"===t?(s="1.0",h="\n        bool reducedAllValue = all(values);\n        float floatedReducedAllValue = float(reducedAllValue);\n        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);\n      ",d="bvec4"):"any"===t&&(s="0.0",h="\n        bool reducedAnyValue = any(values);\n        float floatedReducedAnyValue = float(reducedAnyValue);\n        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);\n      ",d="bvec4");let f="";o%n>0&&(f=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return initializationValue;\n        }\n      `),this.userCode=`\n      const float initializationValue = ${s};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        ${f}\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${n};\n\n        vec4 minMaxValue = vec4(${s});\n        float prodValue = 1.0;\n        float sumValue = 0.0;\n        float allValue = 1.0;\n        float anyValue = 0.0;\n\n        for (int i = 0; i < ${c}; i += 4) {\n          int inIdx = inOffset + i;\n          ${d} values = ${d}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          ${h}\n        }\n\n        int inIdx = inOffset + ${c};\n        if (${1===l}) {\n          ${d} values = ${d}(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          ${h}\n        } else if (${2===l}) {\n          ${d} values = ${d}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          ${h}\n        } else if (${3===l}) {\n          ${d} values = ${d}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          ${h}\n        }\n        setOutput(${u});\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class un{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;let n="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),n+=`\n        ${t}\n        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}\n          int flatIndex = getFlatIndex(thisRC);\n\n          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);\n          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));\n\n          result[${e}] =\n            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);\n        ${e>0?"}":""}\n      `}var r;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */this.userCode=`\n      ${r=t,`\n    ivec3 inputCoordsFromReshapedOutCoords(int index) {\n      ${De(["r","c","d"],r)}\n      return ivec3(r, c, d);\n    }\n  `}\n      ${Le(e)}\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n\n        vec4 result = vec4(0.);\n\n        ivec3 thisRC;\n        int rows = ${e[1]};\n        int cols = ${e[2]};\n\n        ${n}\n\n        setOutput(result);\n      }\n    `}}class cn{constructor(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;const[,r,o]=t.shape,[,a,s]=e.shape,i=[n&&a>1?r-1:r,n&&s>1?o-1:o],u=[n&&a>1?a-1:a,n&&s>1?s-1:s],c=i[0]/u[0],l=i[1]/u[1],h=1/c,d=1/l,f=2*Math.ceil(h)+2,p=2*Math.ceil(d)+2;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(${c});\n        const float widthScale = float(${l});\n\n        const float invHeightScale = float(${h});\n        const float invWidthScale = float(${d});\n\n        const int winHeight = int(${f});\n        const int winWidth = int(${p});\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(startRLerp - float(winHeight / 2));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(startCLerp - float(winWidth / 2));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= ${a}) {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= ${s}) {\n              continue;\n            }\n\n            float dxR = float(dyR) * heightScale;\n            int topDxRIndex = int(floor(dxR));\n            int bottomDxRIndex = int(min(ceil(dxR), ${r-1}.0));\n            float dxRLerp = dxR - float(topDxRIndex);\n            float inverseDxRLerp = 1.0 - dxRLerp;\n\n            float dxC = float(dyC) * widthScale;\n            int leftDxCIndex = int(floor(dxC));\n            int rightDxCIndex = int(min(ceil(dxC), ${o-1}.0));\n            float dxCLerp = dxC - float(leftDxCIndex);\n            float inverseDxCLerp = 1.0 - dxCLerp;\n\n            if (r == topDxRIndex && c == leftDxCIndex) {\n              // topLeft\n              accumulator +=\n                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;\n            }\n\n            if (r == topDxRIndex && c == rightDxCIndex) {\n              // topRight\n              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == leftDxCIndex) {\n              // bottomLeft\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == rightDxCIndex) {\n              // bottomRight\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ln{constructor(e,t,n,r){this.variableNames=["A"],this.outputShape=[];const[o,a,s,i]=e;this.outputShape=[o,t,n,i];const u=[r&&t>1?a-1:a,r&&n>1?s-1:s],c=[r&&t>1?t-1:t,r&&n>1?n-1:n];this.userCode=`\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          ${u[0]/c[0]},\n          ${u[1]/c[1]});\n      const vec2 inputShapeRC = vec2(${a}.0, ${s}.0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class hn{constructor(e,t,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[o,a,s,i]=e;this.outputShape=[o,t,n,i];const u=[r&&t>1?a-1:a,r&&n>1?s-1:s],c=[r&&t>1?t-1:t,r&&n>1?n-1:n];this.userCode=`\n      const vec3 effectiveInputOverOutputRatioRC = vec3(\n          ${u[0]/c[0]},\n          ${u[1]/c[1]},\n          ${u[1]/c[1]});\n      const vec3 inputShapeRC = vec3(${a}.0, ${s}.0,\n                                     ${s}.0);\n\n      float getAValue(int b, int r, int c, int d) {\n        return getChannel(getA(b, r, c, d), vec2(c, d));\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        // Calculate values for next column in yRC.z.\n        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);\n\n        // Fractional source index.\n        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);\n        ivec3 sourceCeilRC = ivec3(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        // Should we calculate next column and row elements in 2x2 packed cell.\n        bool hasNextCol = d < ${i-1};\n        bool hasNextRow = coords.z < ${n-1};\n\n        // In parallel, construct four corners for all four components in\n        // packed 2x2 cell.\n        vec4 topLeft = vec4(\n          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 bottomLeft = vec4(\n          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 topRight = vec4(\n          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec4 bottomRight = vec4(\n          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);\n\n        vec4 top = mix(topLeft, topRight, fracRC.yyzz);\n        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);\n        vec4 newValue = mix(top, bottom, fracRC.x);\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class dn{constructor(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;const[,r,o]=t.shape,[,a,s]=e.shape,i=[n&&a>1?r-1:r,n&&s>1?o-1:o],u=[n&&a>1?a-1:a,n&&s>1?s-1:s],c=i[0]/u[0],l=i[1]/u[1],h=1/c,d=1/l,f=2*Math.ceil(h)+2,p=2*Math.ceil(d)+2;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(${c});\n        const float widthScale = float(${l});\n\n        const float invHeightScale = float(${h});\n        const float invWidthScale = float(${d});\n\n        const int winHeight = int(${f});\n        const int winWidth = int(${p});\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(floor(startRLerp - float(winHeight / 2)));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(floor(startCLerp - float(winWidth / 2)));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= ${a}) {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= ${s}) {\n              continue;\n            }\n\n            float sourceFracRow =\n              float(${i[0]}) *\n                (float(dyR) / float(${u[0]}));\n\n            float sourceFracCol =\n                float(${i[1]}) *\n                  (float(dyC) / float(${u[1]}));\n\n            int sourceNearestRow = int(min(\n                float(int(${r}) - 1),\n                ${n} ? float(round(sourceFracRow)) :\n                                  float(floor(sourceFracRow))));\n\n            int sourceNearestCol = int(min(\n                float(int(${o}) - 1),\n                ${n} ? float(round(sourceFracCol)) :\n                                  float(floor(sourceFracCol))));\n\n            if (r == sourceNearestRow && c == sourceNearestCol) {\n              accumulator += getDy(b, dyR, dyC, d);\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class fn{constructor(e,t,n,r){this.variableNames=["A"],this.outputShape=[];const[o,a,s,i]=e;this.outputShape=[o,t,n,i];const u=[r&&t>1?a-1:a,r&&n>1?s-1:s],c=[r&&t>1?t-1:t,r&&n>1?n-1:n],l=r?"0.5":"0.0";this.userCode=`\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          ${u[0]/c[0]},\n          ${u[1]/c[1]});\n      const vec2 inputShapeRC = vec2(${a}.0, ${s}.0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${l})));\n\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class pn{constructor(e,t){this.variableNames=["x"];const n=e.length;if(n>4)throw new Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);if(this.outputShape=e,1===n)return void(this.userCode=`\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX(${e[0]} - coord - 1));\n        }\n      `);const r=e.map((n,r)=>(n=>-1!==t.indexOf(n)&&1!==e[n]?`${e[n]} - coords[${n}] - 1`:`coords[${n}]`)(r)).join(","),o=Ye(n);this.userCode=`\n      void main() {\n        ${o} coords = getOutputCoords();\n        setOutput(getX(${r}));\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class gn{constructor(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;const n=e.length;if(n>4)throw new Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);this.outputShape=e;const r=Fe("rc",n),o=`${r[n-1]} + 1 < ${this.outputShape[n-1]}`,a=`${r[n-2]} + 1 < ${this.outputShape[n-2]}`,s=Ye(n);function i(n){const r=e.map((r,o)=>function(n,r){return-1!==t.indexOf(n)&&1!==e[n]?`${e[n]} - ${r[n]} - 1`:""+r[n]}(o,n));return`getChannel(getX(${r.join(",")}), vec2(${r.slice(-2).join(",")}))`}this.userCode=1===n?`\n        void main(){\n          int rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = getChannel(getX(${e[0]} - rc - 1),\n            ${e[0]} - rc - 1);\n          if(${o}){\n              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),\n                ${e[0]} - (rc  + 1) - 1);\n          }\n          setOutput(result);\n        }\n      `:`\n        void main() {\n          ${s} rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = ${function(e){return i(e)}(r.slice())};\n          if(${o}){\n            result.g = ${function(e){return e[n-1]="("+e[n-1]+" + 1)",i(e)}(r.slice())};\n          }\n          if(${a}) {\n            result.b = ${function(e){return e[n-2]="("+e[n-2]+" + 1)",i(e)}(r.slice())};\n            if(${o}) {\n              result.a = ${function(e){return e[n-1]="("+e[n-1]+" + 1)",e[n-2]="("+e[n-2]+" + 1)",i(e)}(r.slice())};\n            }\n          }\n          setOutput(result);\n        }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class mn{constructor(e,t,n,r,o,a,s=!0){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;const i=Ye(o.length),u=Ye(a.length);let c="";1===n?c="i":2===n&&(c="i, j");const l=`getIndices(${c})`;let h="";1===r?h="i":2===r&&(h="i, coords[1]");const d=`getUpdates(${h})`,f=t>1?"strides[j]":"strides";this.userCode=`\n        ${i} strides = ${i}(${o});\n\n        void main() {\n          ${u} coords = getOutputCoords();\n          float sum = 0.0;\n          bool found = false;\n          for (int i = 0; i < ${e}; i++) {\n            int flattenedIndex = 0;\n            for (int j = 0; j < ${t}; j++) {\n              int index = round(${l});\n              flattenedIndex += index * ${f};\n            }\n            if (flattenedIndex == coords[0]) {\n              sum += ${d};\n              found = true;\n            }\n          }\n          setOutput(mix(getDefaultValue(), sum, float(found)));\n        }\n      `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class bn{constructor(e,t){this.variableNames=["x","segmentIds"];const n=e.windowSize,r=e.batchSize,o=e.inSize,a=e.numSegments,s=a*Math.ceil(o/n);this.outputShape=[r,s];const i=4*Math.floor(n/4),u=n%4,c="\n        sumValue += dot(values, segFilter);\n    ";let l="";o%n>0&&(l=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return initializationValue;\n        }\n      `);let h="";o%n>0&&(h=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return -1.0;\n        }\n      `),this.userCode=`\n      const float initializationValue = 0.0;\n\n      float getValue(int batch, int inIdx) {\n        ${l}\n        return getX(batch, inIdx);\n      }\n\n      float getSegmentIdAtIndex(int inIdx) {\n        ${h}\n        return getSegmentIds(inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = int(floor(float(outIdx) / float(\n          ${a})) * float(${n}));\n        int currentSeg = int(mod(float(outIdx), float(${a})));\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < ${i}; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0\n          );\n\n          ${c}\n        }\n\n        int inIdx = inOffset + ${i};\n        if (${1===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            0,\n            0,\n            0\n          );\n\n          ${c}\n        } else if (${2===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n              0,\n              0\n          );\n\n          ${c}\n        } else if (${3===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            0\n          );\n\n          ${c}\n        }\n        setOutput(sumValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class xn{constructor(e,t,n){let r,o;if(this.variableNames=["c","a","b"],this.outputShape=t,n>4)throw Error(`Where for rank ${n} is not yet supported`);if(1===n)o="resRC",r="resRC";else{const n=["resRC.x","resRC.y","resRC.z","resRC.w"],a=[],s=[];for(let r=0;r<t.length;r++)s.push(""+n[r]),r<e&&a.push(""+n[r]);r=a.join(),o=s.join()}const a=Ye(n);this.userCode=`\n      void main() {\n        ${a} resRC = getOutputCoords();\n        float cVal = getC(${r});\n        if (cVal >= 1.0) {\n          setOutput(getA(${o}));\n        } else {\n          setOutput(getB(${o}));\n        }\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class yn{constructor(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;const t=Ye(this.rank),n=`uniform int start[${this.rank}];`,r=function(e){if(1===e)return"sourceLoc";if(e<=6)return vn.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(this.rank);let o;o=`\n        ${t} sourceLoc;\n        ${t} coords = getOutputCoords();\n        ${e.map((e,t)=>`sourceLoc.${vn[t]} = start[${t}] + coords.${vn[t]};`).join("\n")}\n      `,this.userCode=`\n      ${n}\n      void main() {\n        ${o}\n        setOutput(getSource(${r}));\n      }\n    `}getCustomSetupFunc(e){if(e.length!==this.rank)throw Error(`The rank (${this.rank}) of the program must match the length of start (${e.length})`);return(t,n)=>{null==this.startLoc&&(this.startLoc=t.getUniformLocationNoThrow(n,"start"),null==this.startLoc)||t.gl.uniform1iv(this.startLoc,e)}}}const vn=["x","y","z","w","u","v"];class wn{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length;const t=Ye(this.rank),n=Fe("coords",this.rank),r=Fe("sourceLoc",this.rank),o=1===this.rank?"sourceLoc":`vec2(${r.slice(-2).join()})`,a=`getChannel(getSource(${r.join()}), ${o})`,s=`\n      result.x = ${a};\n      if (++${n[this.rank-1]} < ${e[this.rank-1]}) {\n        ++${r[this.rank-1]};\n        result.y = ${a};\n        --${r[this.rank-1]};\n      }\n    `,i=1===this.rank?"":`\n      --${n[this.rank-1]};\n      if (++${n[this.rank-2]} < ${e[this.rank-2]}) {\n        ++${r[this.rank-2]};\n        result.z = ${a};\n        if (++${n[this.rank-1]} < ${e[this.rank-1]}) {\n          ++${r[this.rank-1]};\n          result.w = ${a};\n        }\n      }\n    `,u=this.rank<=4?`sourceLoc = coords +\n            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${r[t]} = ${n[t]} + start[${t}];`).join("\n");this.userCode=`\n      uniform int start[${this.rank}];\n      void main() {\n        ${t} coords = getOutputCoords();\n        ${t} sourceLoc;\n        ${u}\n        vec4 result = vec4(0.);\n        ${s}\n        ${i}\n        setOutput(result);\n      }\n    `}getCustomSetupFunc(e){if(e.length!==this.rank)throw Error(`The rank (${this.rank}) of the program must match the length of start (${e.length})`);return(t,n)=>{null==this.startLoc&&(this.startLoc=t.getUniformLocationNoThrow(n,"start"),null==this.startLoc)||t.gl.uniform1iv(this.startLoc,e)}}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Cn{constructor(e,t,n){this.variableNames=["x"],this.outputShape=n;const r=n.length,o=Ye(n.length),a=Ye(n.length);let s="";if(1===r)s="coords * strides + begin";else{let e=0;s=n.map((t,r)=>(e++,1===n.length?`coords * strides[${r}] + begin[${r}]`:`coords[${e-1}] * strides[${r}] + begin[${r}]`)).join(",")}this.userCode=`\n      ${o} begin = ${o}(${e});\n      ${o} strides = ${o}(${t});\n\n      void main() {\n        ${a} coords = getOutputCoords();\n        setOutput(getX(${s}));\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class In{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}acquireTexture(e,t,n){const r=$n(t,n),o=On(e,r,n);o in this.freeTextures||(this.freeTextures[o]=[]),o in this.usedTextures||(this.usedTextures[o]=[]);const a=En(e,r,this.gpgpu.gl,this.gpgpu.textureConfig,n);if(this.freeTextures[o].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();const e=this.freeTextures[o].shift();return this.usedTextures[o].push(e),e}let s;return r===l.PACKED_2X2_FLOAT32?s=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):r===l.PACKED_2X2_FLOAT16?s=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):r===l.UNPACKED_FLOAT32?s=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):r===l.UNPACKED_FLOAT16?s=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):r===l.PACKED_4X1_UNSIGNED_BYTE&&(s=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[o].push(s),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),s}releaseTexture(e,t,n,r){if(null==this.freeTextures)return;const a=$n(n,r),s=On(t,a,r);s in this.freeTextures||(this.freeTextures[s]=[]);const i=En(t,a,this.gpgpu.gl,this.gpgpu.textureConfig,r),u=Object(o.jb)().get("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==u&&this._numBytesAllocated>u?(this.gpgpu.deleteMatrixTexture(e),this._numBytesAllocated-=i):(this.freeTextures[s].push(e),this.numFreeTextures++,this._numBytesFree+=i),this.numUsedTextures--;const c=this.usedTextures[s],l=c.indexOf(e);if(l<0)throw new Error("Cannot release a texture that was never provided by this texture manager");c.splice(l,1),this.log()}log(){if(!this.logEnabled)return;const e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);const t=this._numBytesFree/this._numBytesAllocated;console.log("Bytes allocated: "+this._numBytesAllocated),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(const e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e)});for(const e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function En(e,t,n,r,o){const a=function(e,t){switch(e){case l.PACKED_2X2_FLOAT32:return Ut(t);case l.PACKED_2X2_FLOAT16:return Vt(t);case l.UNPACKED_FLOAT32:return Bt(t);case l.UNPACKED_FLOAT16:return Pt(t);case l.PACKED_4X1_UNSIGNED_BYTE:return Mt(t);default:throw new Error("Unknown physical texture type "+e)}}(t,r);let s;if(o){const[t,n]=f(e[0],e[1]);s=t*n}else{const[t,n]=h(e[0],e[1]);s=t*n}return s*function(e,t){const n=e;if(t===n.R32F)return 4;if(t===n.R16F)return 2;if(t===n.RGBA32F)return 16;if(t===e.RGBA)return 16;if(t===n.RGBA16F)return 8;throw new Error("Unknown internal format "+t)}(n,a)}function $n(e,t){if(e===c.UPLOAD)return l.PACKED_2X2_FLOAT32;if(e===c.RENDER||null==e)return function(e){return Object(o.jb)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?e?l.PACKED_2X2_FLOAT32:l.UNPACKED_FLOAT32:e?l.PACKED_2X2_FLOAT16:l.UNPACKED_FLOAT16}(t);if(e===c.DOWNLOAD||e===c.PIXELS)return l.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+e)}function On(e,t,n){return`${e[0]}_${e[1]}_${t}_${n}`}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class kn{constructor(e,t){this.variableNames=["A"];const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[r]*t[r];this.outputShape=n,this.rank=n.length;const r=Ye(this.rank),o=function(e){const t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;const n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],r=[];for(let t=0;t<e.length;t++)r.push(`imod(${n[t]}, ${e[t]})`);return r.join()}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e);this.userCode=`\n      void main() {\n        ${r} resRC = getOutputCoords();\n        setOutput(getA(${o}));\n      }\n    `}}class Rn{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.userCode=`\n      float unaryOperation(float x) {\n        ${t}\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    `}}const Sn="return abs(x);",An="if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : x;\n",Tn="if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : min(6.0, x);\n",_n="return (x >= 0.0) ? x : (exp(x) - 1.0);",Nn=`\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = ${o.X.SELU_SCALEALPHA};\n  float scale = ${o.X.SELU_SCALE};\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n`;const Fn="return -x;",jn="return ceil(x);",Dn="return floor(x);",Ln="return exp(x);",Bn="return exp(x) - 1.0;",Pn=`\n  // Error function is calculated approximately with elementary function.\n  // See "Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables", Abramowitz and Stegun.\n  float p = ${o.X.ERF_P};\n  float a1 = ${o.X.ERF_A1};\n  float a2 = ${o.X.ERF_A2};\n  float a3 = ${o.X.ERF_A3};\n  float a4 = ${o.X.ERF_A4};\n  float a5 = ${o.X.ERF_A5};\n\n  float sign = sign(x);\n  x = abs(x);\n  float t = 1.0 / (1.0 + p * x);\n  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));\n`,Mn="return x;",Un="\n  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n",Vn="\n  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n",zn="\n  vec4 result;\n\n  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);\n  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);\n  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);\n  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);\n\n  return result;\n";class Wn{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode=`\n      vec4 unaryOperation(vec4 x) {\n        ${t}\n      }\n\n      void main() {\n        vec4 x = getAAtOutCoords();\n        vec4 y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Gn{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e;const t=e.length,n=Fe("rc",t),r=Ye(t),o=function(e,t){if(1===e)return"rc";let n="";for(let r=0;r<e;r++)n+=t[r],r<e-1&&(n+=",");return n}(t,n),a=n.slice(-2),s=t<=1?"rc":`vec2(${a.join(",")})`;this.userCode=`\n      void main() {\n        ${r} rc = getOutputCoords();\n        vec4 packedInput = getA(${o});\n\n        setOutput(getChannel(packedInput, ${s}));\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const{segment_util:Xn}=o.X,qn=o.lb.split,Hn=o.lb.tile,Kn=o.lb.topkImpl,Yn=o.lb.whereImpl,Qn={};function Jn(e,t=!1){if("linear"===e)return"return x;";if("relu"===e)return t?Un:An;if("elu"===e)return t?zn:_n;if("relu6"===e)return t?Vn:Tn;if("prelu"===e)return t?ot:nt;throw new Error(`Activation ${e} has not been implemented for the WebGL backend.`)}class Zn extends o.w{constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.warnedAboutMemory=!1,this.warnedAboutCPUBackend=!1,this.pendingDeletes=0,this.disposed=!1,!Object(o.jb)().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(null==e){const e=i(Object(o.jb)().getNumber("WEBGL_VERSION"));this.binaryCache=((t=Object(o.jb)().getNumber("WEBGL_VERSION"))in Qn||(Qn[t]={}),Qn[t]),this.gpgpu=new Wt(e),this.canvas=e.canvas,this.gpgpuCreatedLocally=!0}else this.gpgpu=e,this.binaryCache={},this.gpgpuCreatedLocally=!1,this.canvas=e.gl.canvas;var t;this.textureManager=new In(this.gpgpu),this.numMBBeforeWarning=null==Object(o.jb)().global.screen?1024:Object(o.jb)().global.screen.height*Object(o.jb)().global.screen.width*window.devicePixelRatio*600/1024/1024,this.texData=new o.k(this,Object(o.ib)())}numDataIds(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes}write(e,t,n){if((Object(o.jb)().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||Object(o.jb)().getBool("DEBUG"))&&this.checkNumericalProblems(e),"complex64"===n&&null!=e)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");const r={};return this.texData.set(r,{shape:t,dtype:n,values:e,usage:c.UPLOAD,refCount:1,complexParentRefCount:0}),r}incRef(e){this.texData.get(e).refCount++}decRef(e){if(this.texData.has(e)){this.texData.get(e).refCount--}}move(e,t,n,r){if(Object(o.jb)().getBool("DEBUG")&&this.checkNumericalProblems(t),"complex64"===r)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:n,dtype:r,values:t,usage:c.UPLOAD,refCount:1,complexParentRefCount:0})}disposeIntermediateTensorInfo(e){const t=e.dataId;if(this.texData.has(t)){const e=this.texData.get(t);e.refCount--,e.refCount<1&&this.disposeData(t)}}readSync(e){const t=this.texData.get(e),{values:n,dtype:r,complexTensorInfos:a,slice:s,shape:i,isPacked:u}=t;if(null!=s){let t;t=u?new Wn(i,Mn):new Rn(i,Mn);const n=this.runWebGLProgram(t,[{dataId:e,shape:i,dtype:r}],r),o=this.readSync(n.dataId);return this.disposeIntermediateTensorInfo(n),o}if(null!=n)return this.convertAndCacheOnCPU(e);if("string"===r)return n;const c=null!=this.activeTimers;let l,h;if(c&&(l=o.Lb.now()),"complex64"===r){const e=this.readSync(a.real.dataId),t=this.readSync(a.imag.dataId);h=o.X.mergeRealAndImagArrays(e,t)}else h=this.getValuesFromTexture(e);return c&&(this.downloadWaitMs+=o.Lb.now()-l),this.convertAndCacheOnCPU(e,h)}async read(e){if(this.pendingRead.has(e)){const t=this.pendingRead.get(e);return new Promise(e=>t.push(e))}const t=this.texData.get(e),{values:n,shape:r,slice:a,dtype:s,complexTensorInfos:i,isPacked:u}=t;if(null!=a){let t;t=u?new Wn(r,Mn):new Rn(r,Mn);const n=this.runWebGLProgram(t,[{dataId:e,shape:r,dtype:s}],s),o=this.read(n.dataId);return this.disposeIntermediateTensorInfo(n),o}if(null!=n)return this.convertAndCacheOnCPU(e);if(!Object(o.jb)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&2===Object(o.jb)().getNumber("WEBGL_VERSION"))throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let c,l,h=null;if("complex64"!==s&&Object(o.jb)().get("WEBGL_BUFFER_SUPPORTED")){c=this.decode(e);const t=this.texData.get(c.dataId);h=this.gpgpu.createBufferFromTexture(t.texture,...d(r))}if(this.pendingRead.set(e,[]),"complex64"!==s&&await this.gpgpu.createAndWaitForFence(),"complex64"===s){const e=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),t=e[0],n=e[1];l=o.X.mergeRealAndImagArrays(t,n)}else if(null==h)l=this.getValuesFromTexture(e);else{const e=o.Lb.sizeFromShape(r);l=this.gpgpu.downloadFloat32MatrixFromBuffer(h,e)}null!=c&&this.disposeIntermediateTensorInfo(c);const f=this.convertAndCacheOnCPU(e,l),p=this.pendingRead.get(e);return this.pendingRead.delete(e),p.forEach(e=>e(f)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e),this.pendingDeletes--),f}checkNumericalProblems(e){if(null!=e)for(let t=0;t<e.length;t++){const n=e[t];if(!m(n)){if(Object(o.jb)().getBool("WEBGL_RENDER_FLOAT32_CAPABLE"))throw Error(`The value ${n} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`);throw Error(`The value ${n} cannot be represented on this device.`)}}}getValuesFromTexture(e){const{shape:t,dtype:n,isPacked:r}=this.texData.get(e),a=o.Lb.sizeFromShape(t);if(Object(o.jb)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){const n=this.decode(e),r=this.texData.get(n.dataId),o=this.gpgpu.downloadMatrixFromPackedTexture(r.texture,...d(t)).subarray(0,a);return this.disposeIntermediateTensorInfo(n),o}const s=Object(o.jb)().getBool("WEBGL_PACK")&&!0===r,i=s?A(t):t,u=s?new Rt(i):new kt(i),c=this.runWebGLProgram(u,[{shape:i,dtype:n,dataId:e}],"float32"),l=this.texData.get(c.dataId),h=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture,l.texShape[0],l.texShape[1]).subarray(0,a);return this.disposeIntermediateTensorInfo(c),h}async time(e){const t=this.activeTimers,n=[];let r=!1;null==this.programTimersStack?(this.programTimersStack=n,r=!0):this.activeTimers.push(n),this.activeTimers=n,e();const a=o.Lb.flatten(this.activeTimers.map(e=>e.query)).filter(e=>null!=e),s=o.Lb.flatten(this.activeTimers.map(e=>e.name)).filter(e=>null!=e);this.activeTimers=t,r&&(this.programTimersStack=null);const i={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};if(Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){const e=await Promise.all(a);i.kernelMs=o.Lb.sum(e),i.getExtraProfileInfo=()=>e.map((e,t)=>({name:s[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(", ")}else i.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,i}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:o.Lb.now(),endMs:null}}endTimer(e){return Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=o.Lb.now(),e)}async getQueryTime(e){if(Object(o.jb)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(e);const t=e;return t.endMs-t.startMs}disposeData(e){if(this.pendingDisposal.has(e))return;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),void this.pendingDeletes++;if(!this.texData.has(e))return;if(this.texData.get(e).complexParentRefCount>0)return void this.texData.get(e).refCount--;this.releaseGPUData(e);const{complexTensorInfos:t}=this.texData.get(e);null!=t&&(this.texData.get(t.real.dataId).complexParentRefCount--,this.disposeIntermediateTensorInfo(t.real),this.texData.get(t.imag.dataId).complexParentRefCount--,this.disposeIntermediateTensorInfo(t.imag)),this.texData.delete(e)}releaseGPUData(e){const{texture:t,dtype:n,texShape:r,usage:o,isPacked:a,slice:s}=this.texData.get(e),i=s&&s.origDataId||e,u=this.dataRefCount.get(i);u>1?this.dataRefCount.set(i,u-1):(this.dataRefCount.delete(i),null!=t&&(this.numBytesInGPU-=this.computeBytes(r,n),this.textureManager.releaseTexture(t,r,o,a)));const c=this.texData.get(e);c.texture=null,c.texShape=null,c.isPacked=!1,c.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture}getDataInfo(e){return this.texData.get(e)}getCPUBackend(){return Object(o.jb)().getBool("WEBGL_CPU_FORWARD")?(null==this.cpuBackend&&(this.cpuBackend=Object(o.ib)().findBackend("cpu")),this.cpuBackend):null}shouldExecuteOnCPU(e,t=128){const n=this.getCPUBackend();return this.warnedAboutCPUBackend||null!=n||(console.warn("Your application contains ops that are small enough to be executed on the CPU backend, however the CPU backend cannot be found. Consider importing the CPU backend (@tensorflow/tfjs-backend-cpu) for better performance."),this.warnedAboutCPUBackend=!0),null!=n&&e.every(e=>null==this.texData.get(e.dataId).texture&&o.Lb.sizeFromShape(e.shape)<t)}getGPGPUContext(){return this.gpgpu}slice(e,t,n){if(this.shouldExecuteOnCPU([e])){const r=Oe(this.texData.get(e.dataId).values,t,n,e.shape,e.dtype);return this.makeOutput(n,e.dtype,r)}if(0===o.Lb.sizeFromShape(n))return Object(o.Gb)([],n,e.dtype);const{isPacked:r}=this.texData.get(e.dataId),a=o.Ab.isSliceContinous(e.shape,t,n);if(r||!a){const r=Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new wn(n):new yn(n),a=r.getCustomSetupFunc(t);return this.compileAndRun(r,[e],null,a)}return this.uploadToGPU(e.dataId),this.shallowSlice(e,t,n)}shallowSlice(e,t,n){const r=this.texData.get(e.dataId),a=this.makeOutput(n,e.dtype),s=this.texData.get(a.dataId);Object.assign(s,r),s.shape=n,s.dtype=e.dtype;let i=o.Ab.computeFlatOffset(t,e.strides);r.slice&&(i+=r.slice.flatOffset),s.slice={flatOffset:i,origDataId:r.slice&&r.slice.origDataId||e.dataId};const u=this.dataRefCount.get(s.slice.origDataId)||1;return this.dataRefCount.set(s.slice.origDataId,u+1),a}stridedSlice(e,t,n,r){const a=this.tryRunOnCpuOrThrow([e],()=>this.cpuBackend.stridedSlice(e,t,n,r));if(a)return a;const s=o.Ab.computeOutShape(t,n,r);if(s.some(e=>0===e))return Object(o.Gb)([],s);const i=new Cn(t,r,s);return this.compileAndRun(i,[e])}reverse(e,t){const n=Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new gn(e.shape,t):new pn(e.shape,t);return this.compileAndRun(n,[e])}neg(e){const t=this.tryRunOnCpuOrThrow([e],()=>this.cpuBackend.neg(e));if(t)return t;if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Fn,e.dtype);const n=new Rn(e.shape,Fn);return this.compileAndRun(n,[e])}batchMatMul(e,t,n,r){const a=n?e.shape[2]:e.shape[1],s=r?t.shape[1]:t.shape[2],i=n?e.shape[1]:e.shape[2],u=Math.max(e.shape[0],t.shape[0]);if((1===a||1===s)&&i>1e3){n&&(e=Object(o.Jb)(e,[0,2,1])),r&&(t=Object(o.Jb)(t,[0,2,1]));const a=1===s?e:e.as3D(u,i,1),c=1===s?2:1,l=1===s?t.as3D(u,1,i):t;return o.pb(a,l).sum(c,!0)}const c=Object(o.Kb)(e.dtype,t.dtype),l=new Jt(e.shape,t.shape,[u,a,s],n,r);return this.compileAndRun(l,[e,t],c)}fusedBatchMatMul({a:e,b:t,transposeA:n,transposeB:r,bias:a,activation:s,preluActivationWeights:i}){const u=n?e.shape[2]:e.shape[1],c=r?t.shape[1]:t.shape[2],l=Math.max(e.shape[0],t.shape[0]),h=Object(o.Kb)(e.dtype,t.dtype),d=null!=a,f=null!=i,p=s?Jn(s,!0):null,g=new Jt(e.shape,t.shape,[l,u,c],n,r,d,p,f),m=[e,t];return a&&m.push(a),i&&m.push(i),this.compileAndRun(g,m,h)}localResponseNormalization4D(e,t,n,r,a){const s=Object(o.jb)().getBool("WEBGL_PACK_NORMALIZATION")?new Kt(e.shape,t,n,r,a):new qt(e.shape,t,n,r,a);return this.compileAndRun(s,[e])}LRNGrad(e,t,n,r,o,a,s){const i=new Ht(t.shape,r,o,a,s);return this.compileAndRun(i,[t,n,e])}tile(e,t){if("string"===e.dtype){const n=this.readSync(e.dataId).map(e=>o.Lb.decodeString(e)),r=Object(o.Z)(e.shape,e.dtype,n);return Hn(r,t)}const n=new kn(e.shape,t);return this.compileAndRun(n,[e])}pad(e,t,n){const r=Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new rn(e.shape,t,n):new nn(e.shape,t,n);return this.compileAndRun(r,[e])}gather(e,t,n){const r=this.tryRunOnCpuOrThrow([e,t],()=>this.cpuBackend.gather(e,t,n));if(r)return r;const o=new _t(e.shape,t.size,n);return this.compileAndRun(o,[e,t])}batchToSpaceND(e,t,n){o.Lb.assert(e.rank<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");const r=t.reduce((e,t)=>e*t),a=o.X.getReshaped(e.shape,t,r),s=o.X.getPermuted(a.length,t.length),i=o.X.getReshapedPermuted(e.shape,t,r),u=o.X.getSliceBeginCoords(n,t.length),c=o.X.getSliceSize(i,n,t.length);return Object(o.Jb)(e.reshape(a),s).reshape(i).slice(u,c)}spaceToBatchND(e,t,n){o.Lb.assert(e.rank<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");const r=t.reduce((e,t)=>e*t),a=[[0,0]];a.push(...n);for(let n=1+t.length;n<e.shape.length;++n)a.push([0,0]);const s=e.pad(a),i=o.X.getReshaped(s.shape,t,r,!1),u=o.X.getPermuted(i.length,t.length,!1),c=o.X.getReshapedPermuted(s.shape,t,r,!1),l=Object(o.Jb)(s.reshape(i),u);return Object(o.xb)(l,c)}reduce(e,t,n){const r=e.shape[0],a=e.shape[1],s=o.X.computeOptimalWindowSize(a),i=Math.ceil(a/s),u=new sn({windowSize:s,inSize:a,batchSize:r,outSize:i},t),c=this.compileAndRun(u,[e],n);return 1===c.shape[1]?c:this.reduce(c,t,n)}argReduce(e,t,n=null){let r=e.shape[0],a=e.shape[1];null!=n&&(r=n.shape[0],a=n.shape[1]);const s=o.X.computeOptimalWindowSize(a),i={windowSize:s,inSize:a,batchSize:r,outSize:Math.ceil(a/s)},u=new _e(i,t,null==n),c=[e];null!=n&&c.push(n);const l=this.compileAndRun(u,c,"int32");return 1===l.shape[1]?l:this.argReduce(e,t,l)}argReducePacked(e,t,n=null){const r=null!=n?n.shape:e.shape,a=r[r.length-1],s=o.X.computeOptimalWindowSize(a),i=new Ze(r,s,t,null==n),u=null==n?[e]:[e,n],c=this.compileAndRun(i,u,"int32");return c.rank===e.rank?this.argReducePacked(e,t,c):c}sum(e,t){o.X.assertAxesAreInnerMostDims("sum",t,e.rank);const[n,r]=o.X.computeOutAndReduceShapes(e.shape,t),a=o.Lb.sizeFromShape(r),s=e.as2D(-1,a),i=o.Fb(e.dtype);return this.reduce(s,"sum",i).reshape(n)}prod(e,t){const n=this.tryRunOnCpuOrThrow([e],()=>this.cpuBackend.prod(e,t));if(n)return n;const[r,a]=o.X.computeOutAndReduceShapes(e.shape,t),s=o.Lb.sizeFromShape(a),i=e.as2D(-1,s),u=o.Fb(e.dtype);return this.reduce(i,"prod",u).reshape(r)}unsortedSegmentSum(e,t,n){let r=0;const a=o.X.getAxesPermutation([r],e.rank);let s=e;null!=a&&(s=Object(o.Jb)(e,a),r=o.X.getInnerMostAxes(1,e.rank)[0]);const i=Xn.computeOutShape(s.shape,r,n),u=o.Lb.sizeFromShape([s.shape[r]]),c=s.as2D(-1,u),l=o.Fb(e.dtype);let h=this.segOpCompute(c,"unsortedSegmentSum",t,l,n).reshape(i);return null!=a&&(h=Object(o.Jb)(h,o.X.getUndoAxesPermutation(a))),h}segOpCompute(e,t,n,r,a){const s=e.shape[0],i=e.shape[1],u=Xn.segOpComputeOptimalWindowSize(i,a),c=new bn({windowSize:u,inSize:i,batchSize:s,numSegments:a},t),l=this.compileAndRun(c,[e,n],r);return l.shape[1]===a?l:(n=Object(o.ub)(0,a).tile([i/u]),this.segOpCompute(l,t,n,r,a))}argMinMaxReduce(e,t,n){const r=[t];if(o.X.assertAxesAreInnerMostDims("arg"+n.charAt(0).toUpperCase()+n.slice(1),r,e.rank),!Object(o.jb)().getBool("WEBGL_PACK_REDUCE")||e.rank<=2){const[t,a]=o.X.computeOutAndReduceShapes(e.shape,r),s=o.Lb.sizeFromShape(a),i=e.as2D(-1,s);return this.argReduce(i,n).reshape(t)}return this.argReducePacked(e,n)}argMin(e,t){return this.argMinMaxReduce(e,t,"min")}argMax(e,t){return this.argMinMaxReduce(e,t,"max")}cumsum(e,t,n,r){if(t!==e.rank-1)throw new Error(`WebGL cumsum shader expects an inner-most axis=${e.rank-1} but got axis=`+t);const o=e.shape[t];let a=e;for(let t=0;t<=Math.ceil(Math.log2(o))-1;t++){const n=new vt(e.shape,!1,r),o=n.getCustomSetupFunc(t),s=a;a=this.compileAndRun(n,[a],a.dtype,o),s.dispose()}if(n){const t=new vt(e.shape,n,r),o=a;a=this.compileAndRun(t,[a]),o.dispose()}return a}equal(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(equal(a, b));\n","bool");const n=new rt("return float(a == b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")}less(e,t){const n=this.tryRunOnCpuOrThrow([e,t],()=>this.cpuBackend.less(e,t));if(n)return n;if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(lessThan(a, b));\n","bool");const r=new rt("return float(a < b);",e.shape,t.shape);return this.compileAndRun(r,[e,t],"bool")}lessEqual(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(lessThanEqual(a, b));\n","bool");const n=new rt("return float(a <= b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")}greater(e,t){const n=this.tryRunOnCpuOrThrow([e,t],()=>this.cpuBackend.greater(e,t));if(n)return n;if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(greaterThan(a, b));\n","bool");const r=new rt("return float(a > b);",e.shape,t.shape);return this.compileAndRun(r,[e,t],"bool")}greaterEqual(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(greaterThanEqual(a, b));\n","bool");const n=new rt("return float(a >= b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")}logicalNot(e){const t=new Rn(e.shape,"return float(!(x >= 1.0));");return this.compileAndRun(t,[e])}logicalAnd(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return vec4(\n    vec4(greaterThanEqual(a, vec4(1.0))) *\n    vec4(greaterThanEqual(b, vec4(1.0))));\n","bool");const n=new rt("return float(a >= 1.0 && b >= 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")}logicalOr(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  return min(\n    vec4(greaterThanEqual(a, vec4(1.0))) +\n    vec4(greaterThanEqual(b, vec4(1.0))),\n    vec4(1.0));\n","bool");const n=new rt("return float(a >= 1.0 || b >= 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")}select(e,t,n){const r=new xn(e.rank,t.shape,t.rank);return this.compileAndRun(r,[e,t,n],Object(o.Kb)(t.dtype,n.dtype))}where(e){o.X.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");const t=e.dataSync();return Yn(e.shape,t)}topk(e,t,n){const r=e.dataSync();return Kn(r,e.shape,e.dtype,t,n)}min(e,t){o.X.assertAxesAreInnerMostDims("min",t,e.rank);const[n,r]=o.X.computeOutAndReduceShapes(e.shape,t),a=o.Lb.sizeFromShape(r),s=e.as2D(-1,a);return this.reduce(s,"min",s.dtype).reshape(n)}minimum(e,t){const n=this.tryRunOnCpuOrThrow([e,t],()=>this.cpuBackend.minimum(e,t));if(n)return n;const r=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at("\n  vec4 result = vec4(min(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",e.shape,t.shape):new rt("\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return min(a, b);\n",e.shape,t.shape);return this.compileAndRun(r,[e,t])}mod(e,t){const n=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at("\n  vec4 result = mod(a, b);\n  vec4 isNaN = vec4(equal(b, vec4(0.0)));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",e.shape,t.shape):new rt("if (b == 0.0) return NAN;\n  return mod(a, b);",e.shape,t.shape);return this.compileAndRun(n,[e,t])}maximum(e,t){const n=this.tryRunOnCpuOrThrow([e,t],()=>this.cpuBackend.maximum(e,t));if(n)return n;const r=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at("\n  vec4 result = vec4(max(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",e.shape,t.shape):new rt("\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return max(a, b);\n",e.shape,t.shape);return this.compileAndRun(r,[e,t])}all(e,t){o.X.assertAxesAreInnerMostDims("all",t,e.rank);const[n,r]=o.X.computeOutAndReduceShapes(e.shape,t),a=o.Lb.sizeFromShape(r),s=e.as2D(-1,a);return this.reduce(s,"all",s.dtype).reshape(n)}any(e,t){o.X.assertAxesAreInnerMostDims("any",t,e.rank);const[n,r]=o.X.computeOutAndReduceShapes(e.shape,t),a=o.Lb.sizeFromShape(r),s=e.as2D(-1,a);return this.reduce(s,"any",s.dtype).reshape(n)}floorDiv(e,t){if(Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,"\n  ivec4 ia = round(a);\n  ivec4 ib = round(b);\n  bvec4 cond = notEqual(ib, ivec4(0));\n  ivec4 result = ivec4(0);\n  vec4 s = sign(a) * sign(b);\n\n  // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n  if (cond[0]) {\n    result[0] = idiv(ia[0], ib[0], s[0]);\n  }\n  if (cond[1]) {\n    result[1] = idiv(ia[1], ib[1], s[1]);\n  }\n  if (cond[2]) {\n    result[2] = idiv(ia[2], ib[2], s[2]);\n  }\n  if (cond[3]) {\n    result[3] = idiv(ia[3], ib[3], s[3]);\n  }\n  return vec4(result);\n","int32");const n=new rt("\n  float s = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  if (ib != 0) {\n    // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n    return float(idiv(ia, ib, s));\n  } else {\n    return NAN;\n  }\n",e.shape,t.shape);return this.compileAndRun(n,[e,t],"int32")}packedUnaryOp(e,t,n){const r=new Wn(e.shape,t);return this.compileAndRun(r,[e],n)}packedBinaryOp(e,t,n,r,o=!1){const a=new at(n,e.shape,t.shape,o);return this.compileAndRun(a,[e,t],r)}makeComplexComponentTensorInfo(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}addN(e){if(1===e.length)return e[0];if(e.length>Object(o.jb)().get("WEBGL_MAX_TEXTURES_IN_SHADER")){const t=Math.floor(e.length/2),n=this.addN(e.slice(0,t)),r=this.addN(e.slice(t));return this.addN([n,r])}const t=e.map(e=>e.dtype).reduce((e,t)=>Object(o.Kb)(e,t)),n=e.map(e=>e.shape),r=Object(o.jb)().getBool("WEBGL_PACK")?new Te(e[0].shape,n):new Ae(e[0].shape,n);return this.compileAndRun(r,e,t)}pow(e,t){const n=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at("\n  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.\n  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));\n  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);\n  vec4 result = multiplier * pow(abs(a), b);\n\n  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS\n  bvec4 isExpZero = equal(b, vec4(0.0));\n  result.r = isExpZero.r ? 1.0 : result.r;\n  result.g = isExpZero.g ? 1.0 : result.g;\n  result.b = isExpZero.b ? 1.0 : result.b;\n  result.a = isExpZero.a ? 1.0 : result.a;\n\n  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",e.shape,t.shape):new rt("\nif(a < 0.0 && floor(b) < b){\n  return NAN;\n}\nif (b == 0.0) {\n  return 1.0;\n}\nreturn (round(mod(b, 2.0)) != 1) ?\n    pow(abs(a), b) : sign(a) * pow(abs(a), b);\n",e.shape,t.shape),r=Object(o.Kb)(e.dtype,t.dtype);return this.compileAndRun(n,[e,t],r)}ceil(e){if(this.shouldExecuteOnCPU([e])){const t=xe(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,jn,e.dtype);const t=new Rn(e.shape,jn);return this.compileAndRun(t,[e])}floor(e){if(this.shouldExecuteOnCPU([e])){const t=we(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Dn,e.dtype);const t=new Rn(e.shape,Dn);return this.compileAndRun(t,[e])}sign(e){const t=new Rn(e.shape,"\n  if (isnan(x)) { return 0.0; }\n  return sign(x);\n");return this.compileAndRun(t,[e])}isNaN(e){const t=new Rn(e.shape,"return float(isnan(x));");return this.compileAndRun(t,[e],"bool")}isInf(e){const t=new Rn(e.shape,"return float(isinf(x));");return this.compileAndRun(t,[e],"bool")}isFinite(e){const t=new Rn(e.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(t,[e],"bool")}round(e){const t=new Rn(e.shape,"\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n");return this.compileAndRun(t,[e])}exp(e){if(this.shouldExecuteOnCPU([e])){const t=ye(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ln,e.dtype);const t=new Rn(e.shape,Ln);return this.compileAndRun(t,[e])}expm1(e){if(this.shouldExecuteOnCPU([e])){const t=ve(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Bn,e.dtype);const t=new Rn(e.shape,Bn);return this.compileAndRun(t,[e])}softmax(e,t){const n=o.Lb.parseAxisParam([t],e.shape),r=Object(o.nb)(e,n),a=o.X.expandShapeToKeepDim(r.shape,n),s=o.Eb(e,r.reshape(a)),i=this.exp(s),u=this.sum(i,n).reshape(a);return Object(o.hb)(i,u)}log(e){if(this.shouldExecuteOnCPU([e])){const t=Ce(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,"\n  vec4 result = log(x);\n  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));\n  result.r = isNaN.r == 1.0 ? NAN : result.r;\n  result.g = isNaN.g == 1.0 ? NAN : result.g;\n  result.b = isNaN.b == 1.0 ? NAN : result.b;\n  result.a = isNaN.a == 1.0 ? NAN : result.a;\n\n  return result;\n",e.dtype);const t=new Rn(e.shape,"if (x < 0.0) return NAN;\n  return log(x);");return this.compileAndRun(t,[e])}log1p(e){const t=new Rn(e.shape,"return log(1.0 + x);");return this.compileAndRun(t,[e])}sqrt(e){const t=new Rn(e.shape,"return sqrt(x);");return this.compileAndRun(t,[e])}rsqrt(e){if(this.shouldExecuteOnCPU([e])){const t=$e(this.texData.get(e.dataId).values,e.dtype);return this.makeOutput(e.shape,e.dtype,t)}const t=new Rn(e.shape,"return inversesqrt(x);");return this.compileAndRun(t,[e])}reciprocal(e){const t=new Rn(e.shape,"return 1.0 / x;");return this.compileAndRun(t,[e])}relu(e){let t;return t=Object(o.jb)().getBool("WEBGL_PACK")?new Wn(e.shape,Un):new Rn(e.shape,An),this.compileAndRun(t,[e])}relu6(e){let t;return t=Object(o.jb)().getBool("WEBGL_PACK")?new Wn(e.shape,Vn):new Rn(e.shape,Tn),this.compileAndRun(t,[e])}prelu(e,t){const n=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at(ot,e.shape,t.shape):new rt(nt,e.shape,t.shape);return this.compileAndRun(n,[e,t])}elu(e){if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,zn,e.dtype);const t=new Rn(e.shape,_n);return this.compileAndRun(t,[e])}eluDer(e,t){const n=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at("\n  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));\n  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));\n",e.shape,t.shape):new rt("return (b >= 1.0) ? a : a * (b + 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t])}selu(e){const t=new Rn(e.shape,Nn);return this.compileAndRun(t,[e])}clip(e,t,n){let r;r=Object(o.jb)().getBool("WEBGL_PACK_CLIP")?new it(e.shape):new st(e.shape);const a=r.getCustomSetupFunc(t,n);return this.compileAndRun(r,[e],null,a)}abs(e){if(this.shouldExecuteOnCPU([e])&&"complex64"!==e.dtype){const t=me(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if(Object(o.jb)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Sn,e.dtype);const t=new Rn(e.shape,Sn);return this.compileAndRun(t,[e])}complexAbs(e){const t=this.texData.get(e.dataId),n=new ut(e.shape),r=[this.makeComplexComponentTensorInfo(e,t.complexTensorInfos.real),this.makeComplexComponentTensorInfo(e,t.complexTensorInfos.imag)];return this.compileAndRun(n,r)}sigmoid(e){const t=new Rn(e.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(t,[e])}softplus(e){const t=new Rn(e.shape,"\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n");return this.compileAndRun(t,[e])}asin(e){const t=new Rn(e.shape,"if (isnan(x)) return x;\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return asin(x);\n");return this.compileAndRun(t,[e])}acos(e){const t=new Rn(e.shape,"if (isnan(x)) return x;\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return acos(x);\n");return this.compileAndRun(t,[e])}atan(e){const t=new Rn(e.shape,"if (isnan(x)) return x;\n  return atan(x);\n");return this.compileAndRun(t,[e])}sinh(e){const t=new Rn(e.shape,"\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n");return this.compileAndRun(t,[e])}cosh(e){const t=new Rn(e.shape,"\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n");return this.compileAndRun(t,[e])}tanh(e){const t=new Rn(e.shape,"\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n");return this.compileAndRun(t,[e])}asinh(e){const t=new Rn(e.shape,"if (isnan(x)) return x;return log(x + sqrt(x * x + 1.0));");return this.compileAndRun(t,[e])}acosh(e){const t=new Rn(e.shape,"if (isnan(x)) return x;\n  if (x < 1.0) return NAN;\n  return log(x + sqrt(x * x - 1.0));");return this.compileAndRun(t,[e])}atanh(e){const t=new Rn(e.shape,"if (isnan(x)) return x;\n  if ((x < -1.0) || (x > 1.0)) return NAN;\n  return (log(1.0 + x) - log(1.0 - x)) / 2.0;");return this.compileAndRun(t,[e])}erf(e){const t=new Rn(e.shape,Pn);return this.compileAndRun(t,[e])}step(e,t){const n=new Rn(e.shape,function(e=0){return`if (isnan(x)) return x;\n    return x > 0.0 ? 1.0 : float(${e});\n  `}(t));return this.compileAndRun(n,[e])}conv2dByMatMul(e,t,n,r,a,s){const i=e.shape,u=this.texData.get(e.dataId),c=n.inChannels,l=i[0]*i[1]*i[2],h=n.outChannels,d="channelsLast"===n.dataFormat,f=(1===l||1===h)&&c>1e3,p=i[2]%2!=0&&!!u.isPacked;if(f||!Object(o.jb)().getBool("WEBGL_LAZILY_UNPACK")||!Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!p){const u=d?i[0]*i[1]*i[2]:i[0]*i[2]*i[3],c=Object(o.xb)(e,[1,u,n.inChannels]),l=Object(o.xb)(t,[1,n.inChannels,n.outChannels]),h=this.fusedBatchMatMul({a:c,b:l,transposeA:!1,transposeB:!1,bias:r,activation:a,preluActivationWeights:s});return Object(o.xb)(h,n.outShape)}const g=d?i[0]*i[1]*(i[2]+1):i[0]*i[2]*(i[3]+1),m={dataId:e.dataId,shape:[1,g,n.inChannels],dtype:e.dtype},b=u.shape;u.shape=u.shape.slice(),u.shape[u.shape.length-2]++,o.Lb.assert(_(u.shape,m.shape),()=>`packed reshape ${u.shape} to ${m.shape} isn't free`);const x=Object(o.xb)(t,[1,n.inChannels,n.outChannels]),y=this.fusedBatchMatMul({a:m,b:x,transposeA:!1,transposeB:!1,bias:r,activation:a,preluActivationWeights:s}),v=this.texData.get(y.dataId);return o.Lb.assert(v.isPacked,()=>"batchMatMul result is expected to be packed"),u.shape=b,v.shape=n.outShape,Object(o.ib)().makeTensorFromDataId(y.dataId,n.outShape,y.dtype)}conv2dWithIm2Row(e,t,n,r,o,a){const{filterWidth:s,filterHeight:i,inChannels:u,outWidth:c,outHeight:l,dataFormat:h}=n,d="channelsLast"===h,f=s*i*u,p=l*c,g=[f,p],m=e.squeeze([0]),b=t.reshape([1,f,-1]),x=new Xt(g,m.shape,n),y=this.compileAndRun(x,[m]).reshape([1,g[0],g[1]]),v=null!=r,w=null!=a,C=o?Jn(o,!0):null,I=new Jt(y.shape,b.shape,[1,p,n.outChannels],!0,!1,v,C,w),E=[y,b];r&&E.push(r),w&&E.push(a);const $=this.compileAndRun(I,E);return d?$.reshape([1,l,c,n.outChannels]):$.reshape([1,n.outChannels,l,c])}fusedConv2d({input:e,filter:t,convInfo:n,bias:r,activation:a,preluActivationWeights:s}){if(1===n.filterHeight&&1===n.filterWidth&&1===n.dilationHeight&&1===n.dilationWidth&&1===n.strideHeight&&1===n.strideWidth&&("SAME"===n.padInfo.type||"VALID"===n.padInfo.type))return this.conv2dByMatMul(e,t,n,r,a,s);if(Object(o.jb)().getBool("WEBGL_CONV_IM2COL")&&1===e.shape[0])return this.conv2dWithIm2Row(e,t,n,r,a,s);const i=null!=r,u=null!=s,c=a?Jn(a,!1):null,l=new gt(n,i,c,u),h=[e,t];return r&&h.push(r),s&&h.push(s),this.compileAndRun(l,h)}conv2d(e,t,n){if(1===n.filterHeight&&1===n.filterWidth&&1===n.dilationHeight&&1===n.dilationWidth&&1===n.strideHeight&&1===n.strideWidth&&("SAME"===n.padInfo.type||"VALID"===n.padInfo.type))return this.conv2dByMatMul(e,t,n);if(Object(o.jb)().getBool("WEBGL_CONV_IM2COL")&&1===e.shape[0])return this.conv2dWithIm2Row(e,t,n);const r=new gt(n);return this.compileAndRun(r,[e,t])}conv2dDerInput(e,t,n){const r=new lt(n);return this.compileAndRun(r,[e,t])}conv2dDerFilter(e,t,n){const r=new ct(n);return this.compileAndRun(r,[e,t])}fusedDepthwiseConv2D({input:e,filter:t,convInfo:n,bias:r,activation:a,preluActivationWeights:s}){const i=Object(o.jb)().getBool("WEBGL_PACK_DEPTHWISECONV")&&n.strideWidth<=2&&n.outChannels/n.inChannels==1,u=a?Jn(a,i):null,c=[e,t],l=null!=r,h=null!=s;let d;return l&&c.push(r),h&&c.push(s),i?(d=new xt(n,l,u,h),this.compileAndRun(d,c)):(d=new bt(n,l,u,h),this.compileAndRun(d,c))}depthwiseConv2D(e,t,n){let r;return Object(o.jb)().getBool("WEBGL_PACK_DEPTHWISECONV")&&n.strideWidth<=2&&n.outChannels/n.inChannels==1?(r=new xt(n),this.compileAndRun(r,[e,t])):(r=new bt(n),this.compileAndRun(r,[e,t]))}depthwiseConv2DDerInput(e,t,n){const r=new pt(n);return this.compileAndRun(r,[e,t])}depthwiseConv2DDerFilter(e,t,n){const r=new ft(n);return this.compileAndRun(r,[e,t])}conv3d(e,t,n){const r=new mt(n);return this.compileAndRun(r,[e,t])}conv3dDerInput(e,t,n){const r=new dt(n);return this.compileAndRun(r,[e,t])}conv3dDerFilter(e,t,n){const r=new ht(n);return this.compileAndRun(r,[e,t])}unstack(e,t){const n=e.shape[t],r=new Array(e.rank-1);let o=0;for(let n=0;n<e.rank;n++)n!==t&&(r[o++]=e.shape[n]);const a=new Array(e.rank).fill(0),s=e.shape.slice();s[t]=1;const i=new Array(n);for(let n=0;n<i.length;n++)a[t]=n,i[n]=this.slice(e,a,s).reshape(r);return i}avgPool3d(e,t){const n=new an(t,"avg",!1);return this.compileAndRun(n,[e],"float32")}avgPool3dBackprop(e,t,n){const r=new tt(n);return this.compileAndRun(r,[e],t.dtype)}maxPool3d(e,t){const n=new an(t,"max",!1);return this.compileAndRun(n,[e],"float32")}maxPool3dBackprop(e,t,n,r){const o=new an(r,"max",!0),a=this.compileAndRun(o,[t]),s=new Qt(r),i=this.compileAndRun(s,[e,a],t.dtype);return a.dispose(),i}resizeBilinear(e,t,n,r){const a=Object(o.jb)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new hn(e.shape,t,n,r):new ln(e.shape,t,n,r);return this.compileAndRun(a,[e],"float32")}resizeBilinearBackprop(e,t,n){const r=new cn(e,t,n);return this.compileAndRun(r,[e])}resizeNearestNeighbor(e,t,n,r){const o=new fn(e.shape,t,n,r);return this.compileAndRun(o,[e])}resizeNearestNeighborBackprop(e,t,n){const r=new dn(e,t,n);return this.compileAndRun(r,[e])}multinomial(e,t,n,r){const a=t?e:Object(o.Bb)(e),s=a.shape[0],i=a.shape[1],u=new Zt(s,i,n),c=u.getCustomSetupFunc(r);return this.compileAndRun(u,[a],"int32",c)}oneHot(e,t,n,r){const o=new en(e.size,t,n,r);return this.compileAndRun(o,[e])}diag(e){const t=new Ot(e.size);return this.compileAndRun(t,[e])}cropAndResize(e,t,n,r,o,a){const s=new yt(e.shape,t.shape,r,o,a);return this.compileAndRun(s,[e,t,n],"float32")}depthToSpace(e,t,n){o.Lb.assert(t>1,()=>"blockSize should be > 1 for depthToSpace, but was: "+t);const r=e.shape[0],a="NHWC"===n?e.shape[1]:e.shape[2],s="NHWC"===n?e.shape[2]:e.shape[3],i="NHWC"===n?e.shape[3]:e.shape[1],u=a*t,c=s*t,l=i/(t*t),h=new $t("NHWC"===n?[r,u,c,l]:[r,l,u,c],t,n);return this.compileAndRun(h,[e])}split(e,t,n){return qn(e,t,n)}scatterND(e,t,n){const{sliceRank:r,numUpdates:a,sliceSize:s,strides:i,outputSize:u}=o.X.calculateShapes(t,e,n),c=[u/s,s],l=e.reshape([a,r]),h=t.reshape([a,s]);if(0===u)return o.X.reshapeTensor(Object(o.Gb)([]),n);const d=Object(o.yb)(0),f=new mn(a,r,l.rank,h.rank,i,c);return this.compileAndRun(f,[h,l,d]).reshape(n)}sparseToDense(e,t,n,r){const{sliceRank:a,numUpdates:s,strides:i,outputSize:u}=o.X.calculateShapes(t,e,n),c=new mn(s,a,e.rank,t.rank,i,[u,1],!1);return this.compileAndRun(c,[t,e,r]).reshape(n)}gatherND(e,t){const n=t.shape,r=n[n.length-1],[a,s,i,u]=o.X.prepareAndValidate(e,t),c=t.reshape([s,r]),l=e.reshape([e.size/i,i]),h=new Nt(r,u,[s,i]);return this.compileAndRun(h,[l,c]).reshape(a)}fill(e,t,n){if("string"===(n=n||o.Lb.inferDtype(t))){const r=o.Lb.getArrayFromDType(n,o.Lb.sizeFromShape(e));return r.fill(t),Object(o.ib)().makeTensor(r,e,n,this)}{const r=new Tt(e,t),o=r.getCustomSetupFunc(t);return this.compileAndRun(r,[],n,o)}}onesLike(e){if("string"===e.dtype)throw new Error("onesLike is not supported under string dtype");return this.fill(e.shape,1,e.dtype)}zerosLike(e){return this.fill(e.shape,"string"===e.dtype?"":0,e.dtype)}linspace(e,t,n){return o.X.linspaceImpl(e,t,n)}makeTensorInfo(e,t,n){const r=this.write(n,e,t);return this.texData.get(r).usage=null,{dataId:r,shape:e,dtype:t}}makeOutput(e,t,n){const{dataId:r}=this.makeTensorInfo(e,t,n);return Object(o.ib)().makeTensorFromDataId(r,e,t,this)}unpackTensor(e){const t=new Gn(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){const t=new tn(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){const n=[R(e.shape),...S(e.shape)],r={dtype:e.dtype,shape:n,dataId:e.dataId},o=[R(t),...S(t)],a=new un(o,n),s=this.runWebGLProgram(a,[r],e.dtype,null,!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}decode(e){const t=this.texData.get(e),{isPacked:n,shape:r,dtype:o}=t,a=A(r);let s;s=n?new Et(a):new It(a);return{dtype:o,shape:r,dataId:this.runWebGLProgram(s,[{shape:a,dtype:o,dataId:e}],o,null,!0).dataId}}runWebGLProgram(e,t,n,r,a=!1){const s=this.makeTensorInfo(e.outputShape,n),i=this.texData.get(s.dataId);if(e.packedOutput&&(i.isPacked=!0),e.outPackingScheme===u.DENSE){const t=d(e.outputShape);i.texShape=t.map(e=>2*e)}if(null!=e.outTexUsage&&(i.usage=e.outTexUsage),0===o.Lb.sizeFromShape(s.shape))return i.values=o.Lb.getTypedArrayFromDType(s.dtype,0),s;const c=[],l=t.map(t=>{if("complex64"===t.dtype)throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let n=this.texData.get(t.dataId);if(null==n.texture){if(!e.packedInputs&&o.Lb.sizeFromShape(t.shape)<=Object(o.jb)().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:n.values};e.packedInputs&&(n.isPacked=!0,n.shape=t.shape)}else if(!!n.isPacked!=!!e.packedInputs)t=n.isPacked?this.unpackTensor(t):this.packTensor(t),c.push(t),n=this.texData.get(t.dataId);else if(n.isPacked&&!_(n.shape,t.shape)){const e=t,r=t.shape;t.shape=n.shape,t=this.packedReshape(t,r),c.push(t),n=this.texData.get(t.dataId),e.shape=r}return this.uploadToGPU(t.dataId),{shape:t.shape,texData:n,isUniform:!1}});this.uploadToGPU(s.dataId);const h={shape:s.shape,texData:i,isUniform:!1},f=function(e,t,n){let r="";t.concat(n).forEach(e=>{const t=null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0,n=e.isUniform?"uniform":e.texData.texShape;r+=`${e.shape}_${n}_${t}`});const o=e.userCode;let a=e.constructor.name;return a+="_"+r+"_"+o,a}(e,l,h),p=this.getAndSaveBinary(f,()=>function(e,t,n,r){const a=t.userCode,s=n.map((e,n)=>{const r={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(r.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[n],shapeInfo:r}}),i=s.map(e=>e.shapeInfo),u={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},c=Me(s,u,a,t.packedInputs),l=e.createProgram(c);let h=null;const d=e.getUniformLocation(l,"NAN",!1);1===Object(o.jb)().getNumber("WEBGL_VERSION")&&(h=e.getUniformLocation(l,"INFINITY",!1));const f={};for(let n=0;n<t.variableNames.length;n++){const r=t.variableNames[n],o=!1;f[r]=e.getUniformLocation(l,r,o),f["offset"+r]=e.getUniformLocation(l,"offset"+r,o)}return{program:t,source:c,webGLProgram:l,uniformLocations:f,inShapeInfos:i,outShapeInfo:u,infLoc:h,nanLoc:d}}(this.gpgpu,e,l,h)),g=null!=this.activeTimers;let m;if(g&&(m=this.startTimer()),function(e,t,n,r,a){Gt(t.inShapeInfos,n),Gt([t.outShapeInfo],[r]);const s=r.texData.texture,i=r.texData.texShape;r.texData.isPacked?e.setOutputPackedMatrixTexture(s,i[0],i[1]):e.setOutputMatrixTexture(s,i[0],i[1]),e.setProgram(t.webGLProgram),1===Object(o.jb)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN),n.forEach((n,r)=>{const a=t.program.variableNames[r],s=t.uniformLocations[a],i=t.uniformLocations["offset"+a];if(null!=s)if(n.isUniform)if(o.Lb.sizeFromShape(n.shape)<2)e.gl.uniform1f(s,n.uniformValues[0]);else{let t=n.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(s,t)}else null!=n.texData.slice&&null!=i&&e.gl.uniform1i(i,n.texData.slice.flatOffset),e.setInputMatrixTexture(n.texData.texture,s,r)}),null!=a&&a(e,t.webGLProgram),e.executeProgram()}(this.gpgpu,p,l,h,r),c.forEach(e=>this.disposeIntermediateTensorInfo(e)),g&&(m=this.endTimer(m),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(m)})),!Object(o.jb)().getBool("WEBGL_LAZILY_UNPACK")&&i.isPacked&&!1===a){const e=this.unpackTensor(s);return this.disposeIntermediateTensorInfo(s),e}return s}compileAndRun(e,t,n,r,a=!1){n=n||t[0].dtype;const s=this.runWebGLProgram(e,t,n,r,a);return Object(o.ib)().makeTensorFromDataId(s.dataId,s.shape,s.dtype)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){if(!this.disposed){if(!Object(o.jb)().getBool("IS_TEST")){Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]})}this.textureManager.dispose(),null!=this.canvas&&"undefined"!=typeof HTMLCanvasElement&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0}}floatPrecision(){return null==this.floatPrecisionValue&&(this.floatPrecisionValue=Object(o.Hb)(()=>{if(!Object(o.jb)().get("WEBGL_RENDER_FLOAT32_ENABLED")){const e=Object(o.jb)().getBool("DEBUG");Object(o.jb)().set("DEBUG",!1);const t=this.abs(Object(o.yb)(1e-8)).dataSync()[0];if(Object(o.jb)().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}uploadToGPU(e){const t=this.texData.get(e),{shape:n,dtype:r,values:a,texture:s,usage:i,isPacked:u}=t;if(null!=s)return;const l=null!=this.activeTimers;let h;l&&(h=o.Lb.now());let d=t.texShape;if(null==d&&(d=function(e,t=!1){let n=Object(o.jb)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(n*=2,1===(e=e.map((t,n)=>n>=e.length-2?o.Lb.nearestLargerEven(e[n]):e[n])).length&&(e=[2,e[0]])),2!==e.length){const t=o.Lb.squeezeShape(e);e=t.newShape}let r=o.Lb.sizeFromShape(e);if(e.length<=1&&r<=n)return[1,r];if(2===e.length&&e[0]<=n&&e[1]<=n)return e;if(3===e.length&&e[0]*e[1]<=n&&e[2]<=n)return[e[0]*e[1],e[2]];if(3===e.length&&e[0]<=n&&e[1]*e[2]<=n)return[e[0],e[1]*e[2]];if(4===e.length&&e[0]*e[1]*e[2]<=n&&e[3]<=n)return[e[0]*e[1]*e[2],e[3]];if(4===e.length&&e[0]<=n&&e[1]*e[2]*e[3]<=n)return[e[0],e[1]*e[2]*e[3]];if(t){const t=R(e);let n=2,a=2;return e.length&&([n,a]=S(e)),r=t*(n/2)*(a/2),o.Lb.sizeToSquarishShape(r).map(e=>2*e)}return o.Lb.sizeToSquarishShape(r)}(n,u),t.texShape=d),null!=a){const e=A(n);let s,i=d[1],p=d[0];const g=a instanceof Uint8Array;u?([i,p]=f(d[0],d[1]),s=new At(e,[p,i],g)):s=new St(e,[p,i],g);const m=this.makeTensorInfo([p,i],r);this.texData.get(m.dataId).usage=g?c.PIXELS:c.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(m.dataId),i,p,a);const b=!0,x=this.runWebGLProgram(s,[m],r,null,b),y=this.texData.get(x.dataId);t.texture=y.texture,t.texShape=y.texShape,t.isPacked=y.isPacked,t.usage=y.usage,this.disposeIntermediateTensorInfo(m),this.texData.delete(x.dataId),t.values=null,l&&(this.uploadWaitMs+=o.Lb.now()-h)}else{const e=this.acquireTexture(d,i,r,u);t.texture=e}}convertAndCacheOnCPU(e,t){const n=this.texData.get(e),{dtype:r}=n;return this.releaseGPUData(e),null!=t&&(n.values=function(e,t){if("float32"===t||"complex64"===t)return e;if("int32"===t||"bool"===t){const n="int32"===t?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<n.length;++t)n[t]=Math.round(e[t]);return n}throw new Error("Unknown dtype "+t)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(t,r)),n.values}acquireTexture(e,t,n,r){if(this.numBytesInGPU+=this.computeBytes(e,n),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){const e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,r)}computeBytes(e,t){return e[0]*e[1]*o.Lb.bytesPerElement(t)}tryRunOnCpuOrThrow(e,t){if(this.shouldExecuteOnCPU(e))try{return t()}catch(e){if(Object(o.jb)().getBool("IS_TEST"))throw new Error("CPU forwarding failed")}return null}}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
o.fb.isBrowser()&&Object(o.vb)("webgl",()=>new Zn,2);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function er(e){const{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}const tr={kernelName:o.u,backendName:"webgl",kernelFunc:er};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nr(e){const{inputs:t,backend:n}=e,{real:r,imag:o}=t,a=n.makeTensorInfo(r.shape,"complex64"),s=n.texData.get(a.dataId),i=er({inputs:{x:r},backend:n});n.texData.get(i.dataId).complexParentRefCount++;const u=er({inputs:{x:o},backend:n});return n.texData.get(u.dataId).complexParentRefCount++,s.complexTensorInfos={real:i,imag:u},a}const rr={kernelName:o.h,backendName:"webgl",kernelFunc:nr};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function or(e){return({inputs:t,backend:n})=>{const{x:r}=t,o=n,a=new Rn(r.shape,e);return o.runWebGLProgram(a,[r],r.dtype)}}function ar({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:n=!1,supportsComplex:r=!1,cpuKernelImpl:a,dtype:s}){return({inputs:i,backend:u})=>{const{a:c,b:l}=i,h=u;if(r&&"complex64"===c.dtype){const t=h.texData.get(c.dataId),n=h.texData.get(l.dataId),[r,a]=[[t.complexTensorInfos.real,n.complexTensorInfos.real],[t.complexTensorInfos.imag,n.complexTensorInfos.imag]].map(t=>{const[n,r]=t,a={dataId:n.dataId,dtype:n.dtype,shape:c.shape},s={dataId:r.dataId,dtype:r.dtype,shape:l.shape},i=new rt(e,c.shape,l.shape);return h.runWebGLProgram(i,[a,s],Object(o.Kb)(n.dtype,r.dtype))}),s=nr({inputs:{real:r,imag:a},backend:h});return h.disposeIntermediateTensorInfo(r),h.disposeIntermediateTensorInfo(a),s}const d=s||Object(o.Kb)(c.dtype,l.dtype);if(h.shouldExecuteOnCPU([c,l])&&null!=a){const e=h.texData.get(c.dataId),t=h.texData.get(l.dataId),[n,r]=a(c.shape,l.shape,e.values,t.values,d),o=h.makeTensorInfo(r,d);return h.texData.get(o.dataId).values=n,o}let f;return f=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t?new at(t,c.shape,l.shape,n):new rt(e,c.shape,l.shape),h.runWebGLProgram(f,[c,l],d)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sr="return a + b;",ir=ar({opSnippet:sr,packedOpSnippet:sr,supportsComplex:!0,cpuKernelImpl:be}),ur={kernelName:o.b,backendName:"webgl",kernelFunc:ir},cr=ar({opSnippet:"\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return atan(a, b);\n",packedOpSnippet:"\n  vec4 result = atan(a, b);\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n"}),lr={kernelName:o.c,backendName:"webgl",kernelFunc:cr};const hr={kernelName:o.d,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n,attrs:r}=e,{x:a}=t;P(a,"avgPool");const{filterSize:s,strides:i,pad:u,dimRoundingMode:c}=r;o.Lb.assert(o.X.eitherStridesOrDilationsAreOne(i,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);const l=o.X.computePool2DInfo(a.shape,s,i,1,u,c);if(1===l.filterWidth&&1===l.filterHeight&&o.Lb.arraysEqual(l.inShape,l.outShape))return er({inputs:{x:a},backend:n});const h=new on(l,"avg",!1);return n.runWebGLProgram(h,[a],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dr={kernelName:o.e,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:a,input:s}=t,i=s;P([a,s],"avgPoolBackprop");const{filterSize:u,strides:c,pad:l}=r,h=o.X.computePool2DInfo(i.shape,u,c,1,l),d=new et(h);return n.runWebGLProgram(d,[a],i.dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class fr{constructor(e,t,n,r,a,s){this.outputShape=[],this.variableNames=["x","mean","variance"],o.X.assertAndGetBroadcastShape(e,t),o.X.assertAndGetBroadcastShape(e,n);let i="0.0";null!=r&&(o.X.assertAndGetBroadcastShape(e,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let u="1.0";null!=a&&(o.X.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = ${i};\n        float scale = ${u};\n        float inv = scale * inversesqrt(variance + float(${s}));\n        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class pr{constructor(e,t,n,r,a,s){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],o.X.assertAndGetBroadcastShape(e,t),o.X.assertAndGetBroadcastShape(e,n);let i="vec4(0.0)";null!=r&&(o.X.assertAndGetBroadcastShape(e,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let u="vec4(1.0)";null!=a&&(o.X.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`\n      void main() {\n        vec4 offset = ${i};\n        vec4 scale = ${u};\n\n        vec4 x = getXAtOutCoords();\n        vec4 mean = getMeanAtOutCoords();\n        vec4 variance = getVarianceAtOutCoords();\n\n        vec4 inv = scale * inversesqrt(variance + vec4(${s}));\n\n        setOutput((x - mean) * inv + offset);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gr={kernelName:o.s,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:r,mean:a,variance:s,offset:i,scale:u}=e;o.Lb.assert(a.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),o.Lb.assert(null==i||a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),o.Lb.assert(null==u||a.shape.length===u.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:c}=n;null==c&&(c=.001);const l=[r,a,s];let h=null;null!=i&&(h=i.shape,l.push(i));let d=null;null!=u&&(d=u.shape,l.push(u));const f=Object(o.jb)().getBool("WEBGL_PACK_NORMALIZATION")?new pr(r.shape,a.shape,s.shape,h,d,c):new fr(r.shape,a.shape,s.shape,h,d,c);return t.runWebGLProgram(f,l,l[0].dtype)}},mr=ar({opSnippet:"return float(a != b);",dtype:"bool"}),br={kernelName:o.I,backendName:"webgl",kernelFunc:mr};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function xr(e){const{inputs:t,backend:n}=e,{input:r}=t;return er({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.real},backend:n})}const yr={kernelName:o.J,backendName:"webgl",kernelFunc:xr};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vr={kernelName:o.f,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function e(t){const{inputs:n,backend:r,attrs:a}=t,{x:s}=n,{dtype:i}=a;if("complex64"===i){if("complex64"===s.dtype)return er({inputs:{x:s},backend:r});const t=o.Nb(s.shape),n=e({inputs:{x:s},backend:r,attrs:{dtype:"float32"}}),a=nr({inputs:{real:n,imag:t},backend:r});return t.dispose(),r.disposeIntermediateTensorInfo(n),a}if("complex64"===s.dtype){const t=xr({inputs:{input:s},backend:r}),n=e({inputs:{x:t},backend:r,attrs:{dtype:i}});return r.disposeIntermediateTensorInfo(t),n}if(!o.Lb.hasEncodingLoss(s.dtype,i)){const e=er({inputs:{x:s},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:i}}if("int32"===i)return function(e,t){const n=new Rn(e.shape,"return float(int(x));"),r=t.runWebGLProgram(n,[e],"int32");return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}(s,r);if("bool"===i){const e=r.makeTensorInfo([],"bool",o.Lb.getTypedArrayFromDType("bool",1)),t=mr({inputs:{a:s,b:e},backend:r});return r.disposeIntermediateTensorInfo(e),t}throw new Error(`Error in Cast: failed to cast ${s.dtype} to ${i}`)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class wr{constructor(e){this.outputShape=[],this.outputShape=o.X.computeOutShape(e,1),this.variableNames=e.map((e,t)=>"T"+t);const t=new Array(e.length-1);t[0]=e[0][1];for(let n=1;n<t.length;n++)t[n]=t[n-1]+e[n][1];const n=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){const r=t[e-1];n.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${r}));`)}const r=t.length,a=t[t.length-1];n.push(`else setOutput(getT${r}(yR, yC-${a}));`),this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int yR = coords.x;\n        int yC = coords.y;\n\n        ${n.join("\n        ")}\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Cr{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=o.X.computeOutShape(e,t);const n=this.outputShape,r=n.length,a=Ye(r),s=Fe("coords",r),i=["x","y","z","w","u","v"].slice(0,r);this.variableNames=e.map((e,t)=>"T"+t);const u=new Array(e.length-1);u[0]=e[0][t];for(let n=1;n<u.length;n++)u[n]=u[n-1]+e[n][t];const c=i[t],l=i.slice(-2),h=i.join();let d=`if (${c} < ${u[0]}) {\n        return getChannel(\n            getT0(${h}), vec2(${l.join()}));\n        }`;for(let e=1;e<u.length;e++){const t=u[e-1];d+=`\n        if (${c} < ${u[e]}  && ${c} >= ${u[e-1]}) {\n          return getChannel(\n            getT${e}(${Ir(i,c,t)}),\n            vec2(${Ir(l,c,t)}));\n        }`}const f=u.length,p=u[u.length-1];d+=`\n        return getChannel(\n          getT${f}(${Ir(i,c,p)}),\n          vec2(${Ir(l,c,p)}));`,this.userCode=`\n      float getValue(${i.map(e=>"int "+e)}) {\n        ${d}\n      }\n\n      void main() {\n        ${a} coords = getOutputCoords();\n        vec4 result = vec4(getValue(${s}), 0., 0., 0.);\n\n        ${s[r-1]} = ${s[r-1]} + 1;\n        if (${s[r-1]} < ${n[r-1]}) {\n          result.g = getValue(${s});\n        }\n\n        ${s[r-2]} = ${s[r-2]} + 1;\n        if (${s[r-2]} < ${n[r-2]}) {\n          result.a = getValue(${s});\n        }\n\n        ${s[r-1]} = ${s[r-1]} - 1;\n        if (${s[r-2]} < ${n[r-2]} &&\n            ${s[r-1]} < ${n[r-1]}) {\n          result.b = getValue(${s});\n        }\n        setOutput(result);\n      }\n    `}}function Ir(e,t,n){const r=e.indexOf(t);return e.map((e,t)=>t===r?`${e} - ${n}`:e).join()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Er(e){const{inputs:t,backend:n}=e,{input:r}=t;return er({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.imag},backend:n})}const $r={kernelName:o.v,backendName:"webgl",kernelFunc:Er};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Or(e){const{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{shape:s}=r,i=n,u=o.Lb.sizeFromShape(a.shape),c=o.Lb.inferFromImplicitShape(s,u),l=o.Lb.sizeFromShape(c);o.Lb.assert(u===l,()=>`The new shape (${c}) has ${l} elements and the old shape (${a.shape}) has ${u} elements. The new shape and old shape must have the same number of elements.`);const h=i.texData.get(a.dataId);return!h.isPacked||_(a.shape,c)||null!==h.texture&&_(h.shape,c)?(i.incRef(a.dataId),{dataId:a.dataId,shape:c,dtype:a.dtype}):function(e,t,n){const r=[R(e.shape),...S(e.shape)],o={dtype:e.dtype,shape:r,dataId:e.dataId},a=[R(t),...S(t)],s=new un(a,r),i=n.runWebGLProgram(s,[o],e.dtype,null,!0);return{dataId:i.dataId,shape:t,dtype:i.dtype}}(a,c,i)}const kr={kernelName:o.K,backendName:"webgl",kernelFunc:Or};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rr={kernelName:o.i,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n,attrs:r}=e,{axis:a}=r,s=o.Lb.parseAxisParam(a,t[0].shape)[0],i=o.X.computeOutShape(t.map(e=>e.shape),s);if(0===o.Lb.sizeFromShape(i))return n.makeTensorInfo(i,t[0].dtype,[]);const u=t.filter(e=>o.Lb.sizeFromShape(e.shape)>0);if(1===u.length)return u[0];const c=u.map(e=>e.shape);return o.X.assertParamsConsistent(c,s),function e(t,n,r){const a=t[0].dtype;if("complex64"===a){const o=t.map(e=>xr({inputs:{input:e},backend:r})),a=t.map(e=>Er({inputs:{input:e},backend:r})),s=e(o,n,r),i=e(a,n,r),u=nr({inputs:{real:s,imag:i},backend:r});return o.forEach(e=>r.disposeIntermediateTensorInfo(e)),a.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(i),u}if(t.length>Object(o.jb)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){const o=Math.floor(t.length/2),a=e(t.slice(0,o),n,r),s=e(t.slice(o),n,r),i=e([a,s],n,r);return r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(s),i}if(Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&t[0].shape.length>1){const e=new Cr(t.map(e=>e.shape),n);return r.runWebGLProgram(e,t,a)}const s=o.X.computeOutShape(t.map(e=>e.shape),n),i=t.map(e=>Or({inputs:{x:e},attrs:{shape:[-1,o.Lb.sizeFromShape(e.shape.slice(n))]},backend:r})),u=new wr(i.map(e=>e.shape)),c=r.runWebGLProgram(u,i,a);i.forEach(e=>r.disposeIntermediateTensorInfo(e));const l=Or({inputs:{x:c},attrs:{shape:s},backend:r});return r.disposeIntermediateTensorInfo(c),l}(u,s,n)}},Sr=or("if (isnan(x)) return x;\n  return cos(x);\n"),Ar={kernelName:o.j,backendName:"webgl",kernelFunc:Sr},Tr=ar({opSnippet:"\nif (a == b) {\n  return 1.0;\n};\nreturn a / b;",packedOpSnippet:"\n  // vec4 one = vec4(equal(a, b));\n  // return one + (vec4(1.0) - one) * a / b;\n  vec4 result = a / b;\n  if(a.x == b.x) {\n    result.x = 1.;\n  }\n  if(a.y == b.y) {\n    result.y = 1.;\n  }\n  if(a.z == b.z) {\n    result.z = 1.;\n  }\n  if(a.w == b.w) {\n    result.w = 1.;\n  }\n\n  return result;\n",checkOutOfBounds:!0}),_r={kernelName:o.l,backendName:"webgl",kernelFunc:Tr};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Nr{constructor(e,t,n){this.variableNames=["real","imag"];const r=t[1];this.outputShape=t;const o=n?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,a=n?r+".0":"1.0";let s;if("real"===e)s="return real * expR - imag * expI;";else{if("imag"!==e)throw new Error(`FFT component must be either "real" or "imag", got ${e}.`);s="return real * expI + imag * expR;"}this.userCode=`\n      const float exponentMultiplier = ${o};\n\n      float unaryOpComplex(float real, float expR, float imag, float expI) {\n        ${s}\n      }\n\n      float mulMatDFT(int batch, int index) {\n        float indexRatio = float(index) / float(${r});\n        float exponentMultiplierTimesIndexRatio =\n            exponentMultiplier * indexRatio;\n\n        float result = 0.0;\n\n        for (int i = 0; i < ${r}; i++) {\n          // x = (-2|2 * PI / N) * index * i;\n          float x = exponentMultiplierTimesIndexRatio * float(i);\n          float expR = cos(x);\n          float expI = sin(x);\n          float real = getReal(batch, i);\n          float imag = getImag(batch, i);\n\n          result +=\n              unaryOpComplex(real, expR, imag, expI) / ${a};\n        }\n\n        return result;\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        setOutput(mulMatDFT(coords[0], coords[1]));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fr(e,t,n){const r=n.texData.get(e.dataId),a=o.Lb.sizeFromShape(e.shape),s=e.shape[e.shape.length-1],i=Or({inputs:{x:e},backend:n,attrs:{shape:[a/s,s]}}).shape,u=new Nr("real",i,t),c=new Nr("imag",i,t),l=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:i},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:i}],h=n.runWebGLProgram(u,l,"float32"),d=n.runWebGLProgram(c,l,"float32"),f=nr({inputs:{real:h,imag:d},backend:n});n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(d);const p=Or({inputs:{x:f},backend:n,attrs:{shape:e.shape}});return n.disposeIntermediateTensorInfo(p),p}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jr={kernelName:o.o,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{input:r}=t;return Fr(r,!1,n)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Dr{constructor(e){this.variableNames=["Image"],this.outputShape=[];const t=e[2];this.outputShape=e,this.userCode=`\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int x = coords[2];\n\n          int coordX = ${t} - x;\n          float outputValue;\n          if(coordX >= 0 && coordX < ${t}) {\n            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);\n          } else {\n            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);\n          }\n          setOutput(outputValue);\n        }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lr={kernelName:o.p,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{const{image:n}=e,r=t,o=new Dr(n.shape);return r.runWebGLProgram(o,[n],n.dtype)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Br{constructor(e){this.variableNames=["A"];const t=je(),[n,r]=e;this.outputShape=e,this.userCode=`\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}.0, ${n}.0);\n\n        vec4 values = ${t.texture2D}(A, uv);\n        float value;\n        if (depth == 0) {\n          value = values.r;\n        } else if (depth == 1) {\n          value = values.g;\n        } else if (depth == 2) {\n          value = values.b;\n        } else if (depth == 3) {\n          value = values.a;\n        }\n\n        setOutput(floor(value * 255.0 + 0.5));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Pr{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const t=je(),[n,r]=e;this.outputShape=e,this.userCode=`\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n\n        vec4 result = vec4(0.);\n\n        for(int row=0; row<=1; row++) {\n          for(int col=0; col<=1; col++) {\n            texC = coords[1] + row;\n            depth = coords[2] + col;\n\n            vec2 uv = (vec2(texC, texR) + halfCR) /\n                       vec2(${r}.0, ${n}.0);\n            vec4 values = ${t.texture2D}(A, uv);\n            float value;\n            if (depth == 0) {\n              value = values.r;\n            } else if (depth == 1) {\n              value = values.g;\n            } else if (depth == 2) {\n              value = values.b;\n            } else if (depth == 3) {\n              value = values.a;\n            }\n\n            result[row * 2 + col] = floor(value * 255.0 + 0.5);\n          }\n        }\n\n        ${t.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mr={kernelName:o.r,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e;let{pixels:a}=t;const{numChannels:s}=r,i="undefined"!=typeof HTMLVideoElement&&a instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&a instanceof HTMLImageElement,[l,h]=i?[a.videoWidth,a.videoHeight]:[a.width,a.height],d=[h,l],f=[h,l,s];(u||i)&&(null==Ur&&(Ur=document.createElement("canvas").getContext("2d")),Ur.canvas.width=l,Ur.canvas.height=h,Ur.drawImage(a,0,0,l,h),a=Ur.canvas);const p=n.makeTensorInfo(d,"int32");n.texData.get(p.dataId).usage=c.PIXELS,n.gpgpu.uploadPixelDataToTexture(n.getTexture(p.dataId),a);const g=Object(o.jb)().getBool("WEBGL_PACK")?new Pr(f):new Br(f),m=n.runWebGLProgram(g,[p],"int32");return n.disposeData(p.dataId),m}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */};let Ur;const Vr={kernelName:o.t,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{input:r}=t;return Fr(r,!0,n)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class zr{constructor(e,t){this.variableNames=["x"];const{windowSize:n,batchSize:r,inSize:a,outSize:s}=e;this.outputShape=[r,s];const i=4*Math.floor(n/4),u=n%4;let c="sumValue += dot(values, ones);";if(null!=t){const e=1/t;c=`sumValue += dot(values * ${o.Lb.isInt(e)?e.toPrecision(2):e}, ones);`}let l="";a%n>0&&(l=`\n        if (inIdx < 0 || inIdx >= ${a}) {\n          return 0.0;\n        }\n      `),this.userCode=`\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        ${l}\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${n};\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < ${i}; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          ${c}\n        }\n\n        int inIdx = inOffset + ${i};\n        if (${1===u}) {\n          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);\n\n          ${c}\n        } else if (${2===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1), 0.0, 0.0);\n\n          ${c}\n        } else if (${3===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2), 0.0);\n\n          ${c}\n        }\n        setOutput(sumValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wr(e,t,n,r){const a=function(e){const t=[];for(;0===t.length||1!==t[t.length-1].outSize;){const n=t.length?t[t.length-1].outSize:e[1],r=o.X.computeOptimalWindowSize(n);t.push({inSize:n,windowSize:r,outSize:Math.ceil(n/r)})}return t}(e.shape);let s=e;for(let o=0;o<a.length;o++){const{inSize:i,windowSize:u,outSize:c}=a[o];let l,h;l="mean"===n?0===o?new zr({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c},i):new zr({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c}):new sn({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c},n),h=s,s=r.runWebGLProgram(l,[s],t),h.dataId!==e.dataId&&r.disposeIntermediateTensorInfo(h)}return s}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Gr{constructor(e,t){this.variableNames=["A"];const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];this.outputShape=n,this.rank=n.length;const r=Ye(this.rank),o=function(e){const t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);const n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],r=new Array(t);for(let t=0;t<e.length;t++)r[e[t]]=n[t];return r.join()}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(t);this.userCode=`\n    void main() {\n      ${r} resRC = getOutputCoords();\n      setOutput(getA(${o}));\n    }\n    `}}class Xr{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];if(this.outputShape=n,this.rank=n.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);const r=Ye(this.rank),o=Ne("rc",this.rank),a=new Array(this.rank);for(let e=0;e<t.length;e++)a[t[e]]=o[e];const s=`vec2(${a.slice(-2).join()})`,i=`++${o[this.rank-1]} < ${n[this.rank-1]}`,u=`getChannel(getA(${a.join()}), ${s})`;this.userCode=`\n    void main() {\n      ${r} rc = getOutputCoords();\n      vec4 result = vec4(0.);\n      result[0] = ${u};\n      if(${i}) {\n        result[1] = ${u};\n      }\n      --${o[this.rank-1]};\n      if(++${o[this.rank-2]} < ${n[this.rank-2]}) {\n        result[2] = ${u};\n        if(${i}) {\n          result[3] = ${u};\n        }\n      }\n      setOutput(result);\n    }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qr(e,t,n){const r=Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Xr(e.shape,t):new Gr(e.shape,t);return n.runWebGLProgram(r,[e],e.dtype)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hr={kernelName:o.y,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{reductionIndices:a,keepDims:s}=t,i=n,u=r.shape.length,c=o.Lb.parseAxisParam(a,r.shape);let l=c;const h=o.X.getAxesPermutation(l,u),d=null!=h,f=i.shouldExecuteOnCPU([r]);let p=r;if(d){if(f){const e=i.texData.get(p.dataId).values,t=new Array(u);for(let e=0;e<t.length;e++)t[e]=r.shape[h[e]];const n=Re(e,r.shape,r.dtype,h,t);p=i.makeTensorInfo(t,r.dtype);i.texData.get(p.dataId).values=n}else p=qr(r,h,i);l=o.X.getInnerMostAxes(l.length,u)}o.X.assertAxesAreInnerMostDims("max",l,u);const[g,m]=o.X.computeOutAndReduceShapes(p.shape,l);let b,x=g;if(s&&(x=o.X.expandShapeToKeepDim(g,c)),f){const e=i.texData.get(p.dataId).values,t=Ie(e,o.Lb.sizeFromShape(m),x,r.dtype);b=i.makeTensorInfo(x,r.dtype);i.texData.get(b.dataId).values=t}else b=function(e,t,n,r){const a=o.Lb.sizeFromShape(t),s=Or({inputs:{x:e},attrs:{shape:[o.Lb.sizeFromShape(e.shape)/a,a]},backend:r}),i=Wr(s,e.dtype,"max",r),u=Or({inputs:{x:i},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(i),u}(p,m,x,i);return d&&i.disposeIntermediateTensorInfo(p),b}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kr={kernelName:o.z,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:a}=t;P(a,"maxPool");const{filterSize:s,strides:i,pad:u,dimRoundingMode:c}=r;o.Lb.assert(o.X.eitherStridesOrDilationsAreOne(i,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);const l=o.X.computePool2DInfo(a.shape,s,i,1,u,c);if(1===l.filterWidth&&1===l.filterHeight&&o.Lb.arraysEqual(l.inShape,l.outShape))return er({inputs:{x:a},backend:n});const h=new on(l,"max",!1);return n.runWebGLProgram(h,[a],a.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yr={kernelName:o.A,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:a,input:s,output:i}=t,u=s;P([s,i],"maxPoolBackprop");const{filterSize:c,strides:l,pad:h,dimRoundingMode:d}=r,f=o.X.computePool2DInfo(u.shape,c,l,1,h,d),p=new on(f,"max",!0),g=n.runWebGLProgram(p,[u],u.dtype),m=new Yt(f),b=n.runWebGLProgram(m,[a,g],u.dtype);return n.disposeIntermediateTensorInfo(g),b}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const Qr={kernelName:o.B,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{filterSize:a,strides:s,pad:i,includeBatchInIndex:u}=t,c=n;o.Lb.assert(4===r.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);const l=[1,1];o.Lb.assert(o.X.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);const h=o.X.computePool2DInfo(r.shape,a,s,l,i),[d,f]=function(e,t,n,r){let o=new on(n,"max",!1);const a=r.runWebGLProgram(o,[e],"float32");return o=new on(n,"max",!0,!0,t),[a,r.runWebGLProgram(o,[e],"float32")]}(r,u,h,c);return[d,f]}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const Jr={kernelName:o.C,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{keepDims:a,axis:s}=t,i=n,u=r.shape.length,c=o.Lb.parseAxisParam(s,r.shape);let l=c;const h=o.X.getAxesPermutation(l,u),d=null!=h,f=i.shouldExecuteOnCPU([r]),p=[];let g=r;if(d){if(f){const e=i.texData.get(g.dataId).values,t=new Array(u);for(let e=0;e<t.length;e++)t[e]=r.shape[h[e]];const n=Re(e,r.shape,r.dtype,h,t);g=i.makeTensorInfo(t,r.dtype);i.texData.get(g.dataId).values=n}else g=qr(r,h,i);p.push(g),l=o.X.getInnerMostAxes(l.length,u)}o.X.assertAxesAreInnerMostDims("sum",l,u);const[m,b]=o.X.computeOutAndReduceShapes(g.shape,l);let x=m;a&&(x=o.X.expandShapeToKeepDim(m,c));const y=function(e,t,n,r){const a=o.Lb.sizeFromShape(t),s=Or({inputs:{x:e},attrs:{shape:[o.Lb.sizeFromShape(e.shape)/a,a]},backend:r}),i=Wr(s,"float32","mean",r),u=Or({inputs:{x:i},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(i),u}(g,b,x,i);for(const e of p)i.disposeIntermediateTensorInfo(e);return y}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zr{constructor(e,t,n){this.variableNames=["x"],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Ye(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r),u="reflect"===n?0:1;this.userCode=1!==r?`\n      ${o} start = ${o}(${a});\n      ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outC = getOutputCoords();\n        for (int i = 0; i < ${r}; i++) {\n          if (outC[i] < start[i]) {\n            outC[i] = start[i] * 2 - outC[i] - ${u};\n          } else if(outC[i] >= end[i]) {\n            outC[i] = (end[i] - 1) * 2 - outC[i] + ${u};\n          }\n        }\n        ${o} coords = outC - start;\n        setOutput(getX(${i}));\n      }\n    `:`\n        int start = ${a};\n        int end = ${s};\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start) {\n            outC = start * 2 - outC - ${u};\n          } else if(outC >= end) {\n            outC = (end - 1) * 2 - outC + ${u};\n          }\n          setOutput(getX(outC - start));\n        }\n      `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class eo{constructor(e,t,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Ye(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=Fe("rc",r),u=Fe("source",r),c=`${i[r-1]} < ${this.outputShape[r-1]}`,l=1===r?"source":`vec2(${u.slice(-2).join()})`,h="reflect"===n?0:1;let d="";if(1===r){const e=`\n        ${o} source = rc;\n        if (source < start) {\n          source = start * 2 - source - ${h};\n        } else if (source >= end) {\n          source = (end - 1) * 2 - source + ${h};\n        }\n        source -= start;\n      `;d=`\n        ${o} rc = outputLoc;\n        ${e}\n        result[0] = getChannel(getX(${u.join()}), ${l});\n        ${i[r-1]} += 1;\n        if(${c}) {\n          ${e}\n          result[1] = getChannel(getX(${u.join()}), ${l});\n        }\n      `}else{const e=`\n        ${o} source = rc;\n        ${o} lt = ${o}(lessThan(source, start));\n        ${o} gte = ${o}(greaterThanEqual(source, end));\n        ${o} orig = 1 - (lt + gte);\n        source = orig * source +\n                lt * (start * 2 - source - ${h}) +\n                gte * ((end - 1) * 2 - source + ${h});\n        source -= start;\n      `;d=`\n        ${o} rc = outputLoc;\n        ${e}\n        result[0] = getChannel(getX(${u.join()}), ${l});\n        ${i[r-1]} += 1;\n        if(${c}) {\n          ${e}\n          result[1] = getChannel(getX(${u.join()}), ${l});\n        }\n        rc = outputLoc;\n        ${i[r-2]} += 1;\n        if(${i[r-2]} < ${this.outputShape[r-2]}) {\n          ${e}\n          result[2] = getChannel(getX(${u.join()}), ${l});\n          ${i[r-1]} += 1;\n          if(${c}) {\n            ${e}\n            result[3] = getChannel(getX(${u.join()}), ${l});\n          }\n        }\n      `}this.userCode=`\n      const ${o} start = ${o}(${a});\n      const ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        ${d}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const to={kernelName:o.D,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:r}=e,{paddings:a,mode:s}=n,i=Object(o.jb)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new eo(r.shape,a,s):new Zr(r.shape,a,s);return t.runWebGLProgram(i,[r],r.dtype)}},no="return areal * breal - aimag * bimag;",ro="return areal * bimag + aimag * breal;";class oo{constructor(e,t,n){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=o.X.assertAndGetBroadcastShape(t,n),this.userCode=`\n      float binaryOpComplex(\n          float areal, float aimag, float breal, float bimag) {\n        ${e}\n      }\n\n      void main() {\n        float areal = getARealAtOutCoords();\n        float aimag = getAImagAtOutCoords();\n        float breal = getBRealAtOutCoords();\n        float bimag = getBImagAtOutCoords();\n        setOutput(binaryOpComplex(areal, aimag, breal, bimag));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ao="return a * b;";const so={kernelName:o.E,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{a:r,b:a}=t,s=o.X.upcastType(r.dtype,a.dtype);if("complex64"===r.dtype){const e=n.texData.get(r.dataId),t=n.texData.get(a.dataId),o=new oo(no,r.shape,a.shape),s=new oo(ro,r.shape,a.shape),i=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:r.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:a.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:a.shape}],u=n.runWebGLProgram(o,i,"float32"),c=n.runWebGLProgram(s,i,"float32"),l=nr({inputs:{real:u,imag:c},backend:n});return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(c),l}if(n.shouldExecuteOnCPU([r,a])){const e=n.texData.get(r.dataId),t=n.texData.get(a.dataId),[o,i]=Ee(r.shape,a.shape,e.values,t.values,s),u=n.makeTensorInfo(i,s);return n.texData.get(u.dataId).values=o,u}let i;return i=Object(o.jb)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new at(ao,r.shape,a.shape):new rt(ao,r.shape,a.shape),n.runWebGLProgram(i,[r,a],s)}},io={kernelName:o.F,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{o.X.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{boxes:r,scores:a}=e,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u}=n,c=t,l=c.readSync(r.dataId),h=c.readSync(a.dataId),d=s,f=i,p=u;return o.lb.nonMaxSuppressionV3Impl(l,h,d,f,p)}},uo=o.lb.nonMaxSuppressionV4Impl,co={kernelName:o.G,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{o.X.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{boxes:r,scores:a}=e,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u,padToMaxOutputSize:c}=n,l=t,h=l.readSync(r.dataId),d=l.readSync(a.dataId),{selectedIndices:f,validOutputs:p}=uo(h,d,s,i,u,c);return[f,p]}},lo=o.lb.nonMaxSuppressionV5Impl,ho={kernelName:o.H,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{o.X.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{boxes:r,scores:a}=e,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u,softNmsSigma:c}=n,l=t,h=l.readSync(r.dataId),d=l.readSync(a.dataId),f=s,p=i,g=u,m=c,{selectedIndices:b,selectedScores:x}=lo(h,d,f,p,g,m);return[b,x]}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class fo{constructor(e,t,n,r){this.variableNames=["Image"],this.outputShape=[];const a=e[1],s=e[2],i=Math.sin(t).toFixed(3),u=Math.cos(t).toFixed(3);this.outputShape=e;const[c,l]=o.X.getImageCenter(r,a,s),h=c.toFixed(3),d=l.toFixed(3);let f="";f="number"==typeof n?`float outputValue = ${n.toFixed(2)};`:`\n        vec3 fill = vec3(${n.join(",")});\n        float outputValue = fill[coords[3]];`,this.userCode=`\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int x = coords[2];\n          int y = coords[1];\n          float coordXFloat = (float(x) - ${h}) * ${u} - (float(y) - ${d}) * ${i};\n          float coordYFloat = (float(x) - ${h}) * ${i} + (float(y) - ${d}) * ${u};\n          int coordX = int(round(coordXFloat + ${h}));\n          int coordY = int(round(coordYFloat + ${d}));\n          ${f}\n          if(coordX >= 0 && coordX < ${s} && coordY >= 0 && coordY < ${a}) {\n            outputValue = getImage(coords[0], coordY, coordX, coords[3]);\n          }\n          setOutput(outputValue);\n        }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const po={kernelName:o.L,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:r}=e,{radians:o,fillValue:a,center:s}=t,i=n,u=new fo(r.shape,o,a,s);return i.runWebGLProgram(u,[r],r.dtype)}},go=or("if (isnan(x)) return x;\n  return sin(x);\n"),mo={kernelName:o.N,backendName:"webgl",kernelFunc:go},bo=or("return x * x;"),xo={kernelName:o.P,backendName:"webgl",kernelFunc:bo},yo=ar({opSnippet:"return (a - b) * (a - b);",packedOpSnippet:"return (a - b) * (a - b);"}),vo={kernelName:o.Q,backendName:"webgl",kernelFunc:yo},wo="return a - b;",Co=ar({opSnippet:wo,packedOpSnippet:wo,supportsComplex:!0,cpuKernelImpl:ke}),Io={kernelName:o.R,backendName:"webgl",kernelFunc:Co},Eo=or("return tan(x);");
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $o=[ur,lr,hr,dr,gr,vr,rr,Rr,Ar,_r,jr,Lr,Mr,tr,Vr,$r,Hr,Kr,Yr,Qr,Jr,to,so,io,co,ho,br,yr,kr,po,mo,xo,Io,vo,{kernelName:o.S,backendName:"webgl",kernelFunc:Eo},{kernelName:o.U,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{perm:o}=t,a=n,s=r.shape.length,i=new Array(s);for(let e=0;e<i.length;e++)i[e]=r.shape[o[e]];let u;if(a.shouldExecuteOnCPU([r])){const e=a.texData.get(r.dataId).values,t=Re(e,r.shape,r.dtype,o,i);u=a.makeTensorInfo(i,r.dtype);a.texData.get(u.dataId).values=t}else u=qr(r,o,a);return u}},{kernelName:o.V,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,attrs:n,backend:r}=e,{axis:o}=n,{x:a}=t;P(a,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");const s=r.readSync(a.dataId),{outputValues:i,outputShape:u,indices:c}=Se(s,o,a.shape,a.dtype);return[r.makeTensorInfo(u,a.dtype,i),r.makeTensorInfo([c.length],"int32",c)]}}];
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */for(const e of $o)Object(o.wb)(e);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Oo=n(2),ko=n(9),Ro=n(21),So=n(43),Ao=n(25);const To=(e,t,n)=>{const r=e.createBuffer(1,t.length,n);return r.copyToChannel(t,0),r};function _o(e,t,n,r,o){return new Promise(a=>{const s={loudness_db:[0],f0_hz:[0]};let i=0;for(let a=t;a<n;a++)r&&a>=o?(s.loudness_db[i]=-120,s.f0_hz[i]=-1):(s.loudness_db[i]=e.loudness_db[a],s.f0_hz[i]=e.f0_hz[a]),i+=1;a(s)})}function No(e){return e*Ao.b}function Fo(e){return e/Ao.b}class jo{constructor(e,t){this.checkpointUrl=e,t&&(this.settings=t)}async initialize(){let e;Oo.registerOp("Roll",e=>{const t=Oo.split(e.inputs[0],2,2),n=Oo.concat([t[1],t[0]],2);return t.forEach(e=>e.dispose()),n}),Oo.env().set("WEBGL_PACK",!1),Oo.env().set("WEBGL_CONV_IM2COL",!1),Oo.env().set("WEBGL_DELETE_TEXTURE_THRESHOLD",104857600),this.model=await async function(e){return await Oo.loadGraphModel(e)}(this.checkpointUrl+"/model.json");try{e=await fetch(this.checkpointUrl+"/settings.json").then(e=>e.json())}finally{if(null===this.settings)throw new Error("Passing settings is required if you do not have a settings.json file.")}this.settings={...e,...this.settings},this.initialized=!0}dispose(){this.initialized&&(this.model.dispose(),this.checkpointUrl=null,this.initialized=!1)}isInitialized(){return this.initialized}async memCheck(){return await async function(){const e=window.screen.availWidth*window.screen.availHeight,t=window.devicePixelRatio,n=Math.round(e*t*600/1048576);if(!isNaN(n)&&n<50)throw new Error(`Insufficient memory! Your device has ${n} and recommended memory is 50`);try{if(await Oo.ready(),"webgl"!==Oo.getBackend())throw new Error("It looks like your browser does not support webgl.")}catch(e){throw new Error("insufficient memory - "+e)}return!0}()}async synthesize(e,t){null!==t&&(this.settings={...this.settings,...t});const{f0_hz:n,loudness_db:r,confidences:o}=e,a=Object(So.c)(n,r.length,this.settings.modelMaxFrameLength),s=Object(So.c)(o,r.length,this.settings.modelMaxFrameLength),i=await async function(e,t){const n=t.averageMaxLoudness,r=t.meanLoudness,o=t.loudnessThreshold,a=t.meanPitch;let s,i=[];if(e.loudness_db.length>0){const t=Oo.tidy(()=>{const t=Oo.tensor1d(e.loudness_db,"float32"),r=t.max(),o=Oo.sub(n,r),a=Oo.add(t,o);return t.dispose(),r.dispose(),o.dispose(),a}),a=t.greater(o),u=await Oo.booleanMaskAsync(t,a),c=await u.array(),l=Oo.tidy(()=>{const e=c>0?u.mean():t.mean(),o=Oo.sub(r,e),a=t.add(o).add(0).clipByValue(-120,n),s=a.min(),i=e.sub(s);return a.sub(s).div(i).mul(r- -120).add(-120)}),h=Oo.reshape(e.confidences,[-1,1,1]),d=Oo.pool(h,[100,1],"avg","same"),f=d.reshape([-1]),p=Oo.lessEqual(f,.7);s=Oo.tidy(()=>{const e=p.mul(-25),t=l.add(e),n=Oo.maximum(t,-120);return e.dispose(),t.dispose(),n}),i=await s.array(),a.dispose(),t.dispose(),l.dispose(),u.dispose(),d.dispose(),f.dispose(),h.dispose(),p.dispose()}let u=[];if(e.f0_hz.length>0){const t=await Object(Ro.c)(e.f0_hz),n=Oo.tidy(()=>{for(let e=0,n=t.length;e<n;++e)t[e]===-1/0&&(t[e]=0);return t}),r=Oo.lessEqual(e.confidences,.7),i=s.greater(o),c=Oo.logicalOr(r,i),l=await Oo.booleanMaskAsync(n,c),h=l.mean(),d=await Oo.sub(a,h),f=await d.array(),p=Oo.tidy(()=>{let t=f/12;t=Math.round(t);return Object(So.b)(e.f0_hz,t)});u=await p.array(),s.dispose(),h.dispose(),l.dispose(),d.dispose(),p.dispose(),i.dispose(),c.dispose(),r.dispose()}return{f0_hz:u,loudness_db:i}}({f0_hz:a,loudness_db:r,confidences:s},this.settings),u=[],c=i.loudness_db.length,l=Fo(c);let h=!1;const d=Fo(this.settings.modelMaxFrameLength);let f;const p=1*Ao.c;for(let e=0;e<l;e+=d-1){const t=Math.floor(No(e)),n=No(e+d);n>c&&(h=!0);const{f0_hz:r,loudness_db:o}=await _o(i,t,n,h,c),a=Oo.tensor1d(r,"float32"),s=Oo.tensor1d(o,"float32"),l=await this.model.predict({f0_hz:a,loudness_db:s}),f=await l.data();u.push(f),l.dispose(),a.dispose(),s.dispose()}if(l<=d)f=u[0];else{const e=[];for(let t=0;t<u.length;t++){const n=u[t];e.push(n)}f=function(e,t){const n=e.reduce((e,t)=>e+t.length,0),r=new Float32Array(n);let o=0;for(let n=0;n<e.length;n++){const u=e[n],c=n<e.length-1;if(0===n&&(r.set(u,o),o+=u.length),c){const c=e[n+1],l=o-t;for(let e=l,n=0,h=u.length-t;e<o&&n<c.length;e++,n++,h++){const t=(e-l)/(o-l);r[e]=(a=u[h],s=c[n],a*(1-(i=t))+s*i)}r.set(c.slice(t),o),o+=c.slice(t).length}}var a,s,i;return r}(e,p)}const g=f.slice(0,e.originalRecordedBufferLength).map(e=>e*(this.settings.postGain||1)),m=new ko.Context,b=To(m,g,Ao.c),x=await Object(Ro.j)(b,48e3);return await async function({audioCtx:e,arrayBuffer:t,sampleRate:n}){let r;ko.setContext(e);let o=To(e,t,n);const a=ko.Offline(()=>{const e=new ko.Compressor({attack:.001,release:.001,threshold:-6}).toDestination(),t=new ko.Reverb({wet:.3,decay:3}).connect(e),n=new ko.Filter(8e3,"lowpass",-24).connect(t);return new ko.Player({url:o}).connect(n).start(),t.ready},t.length/n);r=await a;const s=r.getChannelData(0);return o=null,r.dispose(),r=null,s}({audioCtx:m,arrayBuffer:x,sampleRate:48e3})}}}])}));