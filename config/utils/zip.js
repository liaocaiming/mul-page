const fs = require("fs");
const archiver = require("archiver");
const helpers = require('./helpers');

module.exports = function(dir, localName) {
  const output = fs.createWriteStream(helpers.resolve(`../../dist/${localName}.zip`));
  const archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });
  archive.on("error", function(err) {
    throw err;
  });
  archive.pipe(output);
  archive.directory(dir, false);
  archive.finalize();
};
