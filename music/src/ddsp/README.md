# DDSP

## Preset Checkpoints

There are [4 DDSP Preset models](../../checkpoints) you can use, you can also create and use your own.

## Using DDSP

To start using DDSP, create a new instance of DDSP and initialize it:

```
const violinDDSP = new DDSP(
  "https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin"
);
await violinDDSP.initialize();
```

When initializing the model, the library tries to look for a settings.json file like this one: ["https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin/settings.json"](https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin/settings.json).

If the model doesn't contain one, you can pass in your own in the constructor. By passing in your own settings in the constructor, you also overwrite any settings that would have been loading in the json file.

```
const violinDDSP = new DDSP(
  "https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin",
  {
    postGain: 1, // postGain will now be 1 instead of 2
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
