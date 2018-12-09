/**
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
import * as mi from '../src/index';

const model = new mi.ArbitraryStyleTransferNetwork();
const stylizeBtn = document.getElementById('stylize') as HTMLButtonElement;
const canvas = document.getElementById('stylized') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('content') as HTMLImageElement;
const styleImg = document.getElementById('style') as HTMLImageElement;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font="36px Roboto";
  ctx.textAlign="center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.fillText("...", canvas.width / 2, canvas.height / 2);
}

async function stylize() {
  await mi.tf.nextFrame();
  clearCanvas();
  await mi.tf.nextFrame();
  const styleRepresentation = await mi.tf.tidy(() => {
    return model.predictStyleParameters(styleImg);
  });
  const stylized = await mi.tf.tidy(() => {
    return model.stylize(contentImg, styleRepresentation);
  });
  await mi.tf.toPixels(stylized, canvas);
  styleRepresentation.dispose();
  stylized.dispose();
}

function setupDemo() {
  stylizeBtn.addEventListener('click', stylize);
  model.initialize().then(() => {
    stylizeBtn.disabled = false;
  });
}

setupDemo();