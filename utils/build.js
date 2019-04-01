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

const bundleFileName = "jquery.hideseek-mod.js"
const minFileName = bundleFileName.replace(".js", ".min.js");
const mapFileName = minFileName + ".map";

const minFilePath = path.join(targetDir, minFileName);
const mapFilePath = path.join(targetDir, mapFileName);

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
        root: "https://raw.githubusercontent.com/maxwroc/HideSeek-Mod/master/"
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

// copy minifid file to demo page dir
fs.createReadStream(minFilePath).pipe(fs.createWriteStream(path.join("docs/javascripts/vendor", "jquery.hideseek-mod.min.js")));
