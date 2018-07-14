/**
 * Support modules used by SketchRNN
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * deals with decompressing b64 models to uint8 arrays.
 *
 * @param b64encoded String of b64 encoded data.
 * @returns uint8 version of data.
 */
export function string_to_uint8array(b64encoded: string) {
  const u8: Uint8Array = new Uint8Array(atob(b64encoded)
    .split("")
    .map((c: string): number => {
      return c.charCodeAt(0);
    }));
  return u8;
}

/**
 * Converts b64 data into int16 array version.
 *
 * @param b64encoded String of b64 encoded data.
 * @returns int16 version of data.
 */
export function string_to_array(b64encoded: string) {
  const u: Uint8Array = string_to_uint8array(b64encoded);
  const result: Int16Array = new Int16Array(u.buffer);
  return result;
}

// functions for sampling normal or bi-normals

// Random numbers util (from https://github.com/karpathy/recurrentjs)
let returnV = false;
let vVal = 0.0;
export function gaussRandom(): number {
  if (returnV) {
    returnV = false;
    return vVal;
  }
  const u = 2 * Math.random() - 1;
  const v = 2 * Math.random() - 1;
  const r = u * u + v * v;
  if (r === 0 || r > 1) {
    return gaussRandom();
  }
  const c = Math.sqrt(-2 * Math.log(r) / r);
  vVal = v * c; // cache this
  returnV = true;
  return u * c;
}
export function randf(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}
export function randi(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a) + a);
}
export function randn(mu: number, std: number): number {
  return mu + gaussRandom() * std;
}
// from http://www.math.grin.edu/~mooret/courses/math336/bivariate-normal.html
export function birandn(
  mu1: number,
  mu2: number,
  std1: number,
  std2: number,
  rho: number): number[] {
  const z1 = randn(0, 1);
  const z2 = randn(0, 1);
  const x = Math.sqrt(1 - rho * rho) * std1 * z1 + rho * std1 * z2 + mu1;
  const y = std2 * z2 + mu2;
  return [x, y];
}

/**
 * sample from a categorial distribution
 */
export function sample_softmax(zSample: number[]): number {
  const x = randf(0, 1);
  const N = zSample.length;
  let accumulate = 0;
  let i: number;
  for (i = 0; i < N; i++) {
    accumulate += zSample[i];
    if (accumulate >= x) {
      return i;
    }
  }
  console.log('error sampling pi index');
  return -1;
}

// Data Tool Functions

export function simplify_line(V: number[][], tolerance?: number): number[][] {
  // from https://gist.github.com/adammiller/826148
  // V ... [[x1,y1],[x2,y2],...] polyline
  // tol  ... approximation tolerance
  // ==============================================
  // Copyright 2002, softSurfer (www.softsurfer.com)
  // This code may be freely used and modified for any purpose
  // providing that this copyright notice is included with it.
  // SoftSurfer makes no warranty for this code, and cannot be held
  // liable for any real or imagined damage resulting from its use.
  // Users of this code must verify correctness for their application.
  // http://softsurfer.com/Archive/algorithm_0205/algorithm_0205.htm

  let tol = 2.0;
  if (tolerance) {
    tol = tolerance;
  }

  /*function sum(u: number[], v: number[]): number {
    return [u[0] + v[0], u[1] + v[1]];
  }*/
  function diff(u: number[], v: number[]): number[] {
    return [u[0] - v[0], u[1] - v[1]];
  }
  /*function prod(u: number[], v: number[]): number[] {
    return [u[0] * v[0], u[1] * v[1]];
  }*/
  function dot(u: number[], v: number[]): number {
    return u[0] * v[0] + u[1] * v[1];
  }
  function norm2(v: number[]): number {
    return v[0] * v[0] + v[1] * v[1];
  }
  /*function norm(v: number[]): number {
    return Math.sqrt(norm2(v));
  }*/
  function d2(u: number[], v: number[]): number {return norm2(diff(u, v));}
  /*function d(u: number[], v: number[]): number {return norm(diff(u, v));}*/

  function simplifyDP(tol: number, v: number[][],
    j: number, k: number, mk: number[]) {
    //  This is the Douglas-Peucker recursive simplification routine
    //  It just marks vertices that are part of the simplified polyline
    //  for approximating the polyline subchain v[j] to v[k].
    //  mk[] ... array of markers matching vertex array v[]
    if (k <= j + 1) { // there is nothing to simplify
      return;
    }
    // check for adequate approximation by segment S from v[j] to v[k]
    let maxi = j;          // index of vertex farthest from S
    let maxd2 = 0;         // distance squared of farthest vertex
    const tol2 = tol * tol;  // tolerance squared
    const S: number[][] = [v[j], v[k]];  // segment from v[j] to v[k]
    const u: number[] = diff(S[1], S[0]);   // segment direction vector
    const cu: number = norm2(u);     // segment length squared
    // test each vertex v[i] for max distance from S
    // compute using the Feb 2001 Algorithm's dist_Point_to_Segment()
    // Note: this works in any dimension (2D, 3D, ...)
    let w: number[];           // vector
    let pb: number[];          // point, base of perpendicular from v[i] to S
    let b: number, cw: number, dv2: number; // dv2 = distance v[i] to S squared
    for (let i: number = j + 1; i < k; i++) {
      // compute distance squared
      w = diff(v[i], S[0]);
      cw = dot(w, u);
      if (cw <= 0) {
        dv2 = d2(v[i], S[0]);
      } else if (cu <= cw) {
        dv2 = d2(v[i], S[1]);
      } else {
        b = cw / cu;
        pb = [S[0][0] + b * u[0], S[0][1] + b * u[1]];
        dv2 = d2(v[i], pb);
      }
      // test with current max distance squared
      if (dv2 <= maxd2) {
        continue;
      }
      // v[i] is a new max vertex
      maxi = i;
      maxd2 = dv2;
    }
    if (maxd2 > tol2) {      // error is worse than the tolerance
      // split the polyline at the farthest vertex from S
      mk[maxi] = 1;      // mark v[maxi] for the simplified polyline
      // recursively simplify the two subpolylines at v[maxi]
      simplifyDP(tol, v, j, maxi, mk);  // polyline v[j] to v[maxi]
      simplifyDP(tol, v, maxi, k, mk);  // polyline v[maxi] to v[k]
    }
    // else the approximation is OK, so ignore intermediate vertices
    return;
  }

  const n = V.length;
  const sV: number[][] = [];
  let i: number, k: number, m: number, pv: number; // misc counters
  const tol2: number = tol * tol;          // tolerance squared
  const vt: number[][] = [];                       // vertex buffer, points
  const mk: number[] = [];                       // marker buffer, ints

  // STAGE 1.  Vertex Reduction within tolerance of prior vertex cluster
  vt[0] = V[0];              // start at the beginning
  for (i = k = 1, pv = 0; i < n; i++) {
    if (d2(V[i], V[pv]) < tol2) {
      continue;
    }
    vt[k++] = V[i];
    pv = i;
  }
  if (pv < n - 1) {
    vt[k++] = V[n - 1];      // finish at the end
  }

  // STAGE 2.  Douglas-Peucker polyline simplification
  mk[0] = mk[k - 1] = 1;       // mark the first and last vertices
  simplifyDP(tol, vt, 0, k - 1, mk);

  // copy marked vertices to the output simplified polyline
  for (i = m = 0; i < k; i++) {
    if (mk[i]) {
      sV[m++] = vt[i];
    }
  }
  return sV;
}

/**
 * Clean wrapper method to use RDP function.
 */
export function simplify_lines(lines: number[][][],
  tolerance?: number): number[][][] {
  const result: number[][][] = [];
  let tol = 2.0;
  if (tolerance) {
    tol = tolerance;
  }
  for (let i = 0; i < lines.length; i++) {
    result.push(simplify_line(lines[i], tol));
  }
  return result;
}

/**
 * convert from polylines to stroke-5 format that sketch-rnn uses
 */
export function lines_to_strokes(rawData: number[][][]): number[][] {
  let x: number, y: number;
  let px = 0, py = 0;
  let dx: number, dy: number;
  let pon: number, poff: number;
  const stroke: number[][] = [];
  let i: number, j: number;
  let len: number;
  let p: number[];
  for (i = 0; i < rawData.length; i++) {
    len = rawData[i].length;
    if (len > 1) {
      for (j = 0; j < len; j++) {
        p = rawData[i][j];
        x = p[0];
        y = p[1];
        if (j === len - 1) {
          poff = 1;
          pon = 0;
        } else {
          poff = 0;
          pon = 1;
        }
        dx = x - px;
        dy = y - py;
        px = x;
        py = y;
        stroke.push([dx, dy, pon, poff, 0]);
      }
    }
  }
  stroke.push([0, 0, 0, 0, 1]);
  return stroke.slice(1);
}

/**
 * convert to stroke-5 format to polyline
 */
export function line_to_stroke(line: number[][],
  lastPoint: number[]): number[][] {

  let pon: number, poff: number;
  const stroke: number[][] = [];
  let len: number;
  let p: number[];
  let dx: number, dy: number;
  let x: number, y: number;
  let px: number, py: number;
  let j: number;
  px = lastPoint[0];
  py = lastPoint[1];
  len = line.length;
  if (len > 1) {
    for (j = 0; j < len; j++) {
      p = line[j];
      x = p[0];
      y = p[1];
      if (j === len - 1) {
        poff = 1;
        pon = 0;
      } else {
        poff = 0;
        pon = 1;
      }
      dx = x - px;
      dy = y - py;
      px = x;
      py = y;
      stroke.push([dx, dy, pon, poff, 0]);
    }
  }

  return stroke;

}
