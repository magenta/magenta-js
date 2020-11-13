# DDSP

## Preset Checkpoints

There are [4 DDSP Preset models](../../checkpoints) you can use, you can also create and use your own.

Each of these models need some settings to be passed. You can tweak these settings, but these are the defaults:

```
  // violin
  {
    averageMaxLoudness: -48.6,
    loudnessThreshold: -100.0,
    meanLoudness: -68.5,
    meanPitch: 62.0,
    postGain: 2,
    modelMaxFrameLength: 1250,
  }

  // tenor_saxophone
  {
    averageMaxLoudness: -44.7,
    loudnessThreshold: -100.0,
    meanLoudness: -56,
    meanPitch: 58.9,
    postGain: 0.9,
    modelMaxFrameLength: 1250,
  }

  // trumpet
  {
    averageMaxLoudness: -61.7,
    loudnessThreshold: -100.0,
    meanLoudness: -72.5,
    meanPitch: 68.6,
    postGain: 1.5,
    modelMaxFrameLength: 1250,
  }

  // flute
  {
    averageMaxLoudness: -45.9,
    loudnessThreshold: -100.0,
    meanLoudness: -70.6,
    meanPitch: 63.2,
    postGain: 4,
    modelMaxFrameLength: 1250,
  }
```

## Using DDSP

To start using DDSP, create a new instance of DDSP and initialize it:

```
const violinDDSP = new DDSP(
  "https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin/model.json",
  {
    averageMaxLoudness: -48.6,
    loudnessThreshold: -100.0,
    meanLoudness: -68.5,
    meanPitch: 62.0,
    postGain: 2,
    modelMaxFrameLength: 1250,
  }
);

await violinDDSP.initialize();
```

To start synthesizing, you'll need to pass in AudioFeatures (derived from the [SPICE](../spice) class).

```
violinDDSP.synthesize(audioFeatures);
```

Once you're done with the model, make sure to dispose it.

```
violinDDSP.dispose();
```

## Demo

Check out a working demo [here](../../demos/ddsp_tone_transfer.html).
