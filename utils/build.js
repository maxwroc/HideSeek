/**
 * This is a build script.
 *
 * It automates some tedious tasks which have to be done before sending PR.
 *
 * Usage:
 *   Execute the following command in project root:
 *   npm run build
 */
const fs = require("fs");
const path = require("path");
const uglifyjs = require("uglify-js");

const targetDir = "dist";

const mainFileName = "jquery.hideseek-mod.js"
const minFileName = mainFileName.replace(".js", ".min.js");
const mapFileName = minFileName + ".map";

const bundleFilePath = path.join(targetDir, mainFileName);
const minFilePath = path.join(targetDir, minFileName);
const mapFilePath = path.join(targetDir, mapFileName);

const jqueryConfigFileName = "hideseek-mod.jquery.json";

const version = require('../package.json').version;

// make sure version is correct in all files
const jqueryPluginConfig = require("../" + jqueryConfigFileName);
if (jqueryPluginConfig.version != version) {
    console.log(" * updating version in " + jqueryConfigFileName + " file");
    jqueryPluginConfig.version = version;
    fs.writeFileSync(jqueryConfigFileName, JSON.stringify(jqueryPluginConfig, null, 4), "utf8");
}

const mainFileContent = fs.readFileSync(mainFileName).toString();
const versionPattern = /@version(\s+v)([0-9.]+)/gm;
const mainFileVersionHeader = versionPattern.exec(mainFileContent);
if (mainFileVersionHeader && mainFileVersionHeader.length == 3 && mainFileVersionHeader[2] != version) {
    console.log(" * updating version in " + mainFileName + " source file");
    fs.writeFileSync(mainFileName, mainFileContent.replace(versionPattern, "@version$1" + version), "utf8");
}

const filesToBundle = [
    "jquery.hideseek-mod.js",
    "jquery.highlight.js",
    "hideseek.helpers.js",
];

const uglifyOptions = {
    output: {
        // preserving only documentation headers
        comments: "some"
    },
    sourceMap: {
        filename: minFileName,
        root: "https://raw.githubusercontent.com/maxwroc/HideSeek-Mod/" + version + "/dist/",
        url: mapFileName
    }
};

// reading file data
const fileToContentMap = filesToBundle.reduce((result, fileName) => {
    result[fileName] = fs.readFileSync(fileName, "utf8");
    return result;
}, {})

// saving bundle
fs.writeFileSync(
    path.join(targetDir, "jquery.hideseek-mod.js"),
    Object.keys(fileToContentMap).map(k => fileToContentMap[k]).join("\r\n"),
    "utf8"
);

var min = uglifyjs.minify(fileToContentMap, uglifyOptions);
// saving minified code
fs.writeFileSync(minFilePath, min.code, "utf8");
// saving map
fs.writeFileSync(mapFilePath, min.map, "utf8");

// copy files to demo page dir
fs.createReadStream(bundleFilePath).pipe(fs.createWriteStream(path.join("docs/javascripts/vendor", mainFileName)));
fs.createReadStream(minFilePath).pipe(fs.createWriteStream(path.join("docs/javascripts/vendor", minFileName)));
fs.createReadStream(mapFilePath).pipe(fs.createWriteStream(path.join("docs/javascripts/vendor", mapFileName)));
