# Contributing to @magenta/music

🎉 Before anything, thanks for taking the time to contribute! We really appreciate it!
We welcome contribution in all forms - either from opening issues or pull requests,
no matter how small (even if it's just fixing a typo!). So, thanks! 🙌💕

This document should help you set up your environment for any local development and
hopefully help you pick something to work on.

### Contributor License Agreement

You might notice your neighbourhood CLA-bot commenting on a pull request you
open if you haven't yet signed our CLA. We use the same CLA for all open-source
Google projects, so you only have to sign it once. Once you complete the CLA,
all your pull-requests will automatically get the `cla: yes` tag.

If you've already signed a CLA but still getting nags from the bot, it's possible
you signed it under a different username/email address. Check the [information on your CLA](https://cla.developers.google.com/clas) or see this help article on [setting the email on your git commits](https://help.github.com/articles/setting-your-email-in-git/).

[Complete the CLA](https://cla.developers.google.com/clas)

### Setting up your environment
We use VSCode for development, which should automatically make the linter and
the formatter work for you. In order for this to work correctly, you have to
use a single-root workspace, and open the `magenta/music` folder in it. Your
workspace should look something like this:

<img width="491" alt="Screen Shot 2019-10-30 at 3 15 30 PM" src="https://user-images.githubusercontent.com/1369170/67903164-20db0900-fb28-11e9-8961-2b55b2eefe03.png">

Once you run `yarn install`, this will install the `clang-format` executable
in your `npm_modules` folder, and VSCode will use this to automatically format
your files after every save. All of the rules that VSCode are using are in the
`.vscode` package of the workspace (the path is `magenta-js/music/.vscode`)

## Tests
Some, but not all of our code has tests. This is partly because a lot of
the code is hard to test (audio players, note sequence visualizers, loading large
models which would slow down testing), and partly because we missed some tests.
If you find any code in code that looks like would benefit from some tests,
feel free to add some! To run the tests, run `yarn test`.

## Demos
We try to add demos for most of the functionality in the library, so if
you're adding some new functionality, please also add a demo! To run the demos,
run `yarn run-demos`. This is a live-reload webpack server, that will rebuild
on any changes (both to the demos and the library itself).

### Issue labels
We've been trying to add useful labels to all of our issues. Here's the
ones that are the most in use:
- [good-first-issue](https://github.com/tensorflow/magenta-js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) -- these are documentation fixes, or small
bugs that don't require you to be intimately familar with magenta or our code
- [help-wanted](https://github.com/tensorflow/magenta-js/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) -- these are issues that we generally don't know
how to fix (either because we can't repro, or because they're using a library/framework
we're not familiar with). If you understand what's going on in there, we'd love
the help!
- [bug](https://github.com/tensorflow/magenta-js/issues?q=is%3Aissue+is%3Aopen+label%3Abug) --
these are straight up problems in our code that should eventually be fixed.

Hope this helps! If you run into questions setting up your developing environment,
just open an issue and mention either @adarob or @notwaldorf, and we'll try to get
you sorted!
