# HideSeek-Mod

[![npm version](https://badge.fury.io/js/hideseek-mod.png)](http://badge.fury.io/js/hideseek-mod)

A simple, yet customizable quick/live search jQuery plugin.

This is a forked and modified version of the original library. The original project seems to be dead for a while (2 years now) and author is not responsive. Aim of this fork is to keep it active and open for new features and fixes.

* [Demonstration page][1]
* [Documentation (wiki)][3]

## Features

* Search in text or title/alt attribute
* Highlight
* Navigation
* Ignore elements
* Ignore accented characters
* Custom events
* Custom messages
* Hidden mode
* Support lists with headings
* Throttling

## Compatibility

Compatible with IE7+, Chrome, Firefox, Safari
and jQuery 1.8.x, 1.9.x, 1.11.x, 1.12.x, 2.1.x, 2.2.x.

## Questions/Answers and Enhancements

Do you have any questions? First, take a look [here][6].

Or if you are looking for enhancements, [here][7].

## CDN
Served using [RawGit][8]:
* [Production URL][9]
* [Development URL][10]

## Credits
* [Stevy.gr][4]
* [Prince.gr][5]

## Changelog
### v0.8.1
* Throttling - delayed search with cancellation if the next keystroke arrives
### v0.8.2
* Slovak accents support
* Polish accents support

## Development
To test your changes and prepare pull request you need to update bundles. The easiest way to do it is via build script.

First you need to install node dependencies (trying to keep low number of them - currently 3 are being installed).
```
npm install
```

To generate bundles and copy them in all required places use the following command.
```
npm run build
```

### Testing
Use index.html page to test your code locally.
```
docs/index.html
```

### Pull request
Before sending PR make sure your change is not breaking any functionality. Please test all of the features carefully.

If you add a new functionality please update index.html and add the new secion for it.

## Copyright and license

Copyright 2015 Dimitris Krestos

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0][2]

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

  [1]: http://maxwroc.github.io/HideSeek-Mod/
  [2]: http://www.apache.org/licenses/LICENSE-2.0
  [3]: https://github.com/maxwroc/HideSeek/wiki
  [4]: http://stevy.gr/
  [5]: http://prince.gr/
  [6]: https://github.com/maxwroc/HideSeek-Mod/issues?utf8=%E2%9C%93&q=label%3Aquestion
  [7]: https://github.com/maxwroc/HideSeek-Mod/issues?utf8=%E2%9C%93&q=label%3Aenhancement
  [8]: https://rawgit.com/
  [9]: https://unpkg.com/hideseek-mod/bundle/jquery.hideseek-mod.min.js
  [10]: https://unpkg.com/hideseek-mod/bundle/jquery.hideseek-mod.js
