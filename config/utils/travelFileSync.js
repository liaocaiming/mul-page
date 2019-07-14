const fs = require('fs');
const path = require('path');
module.exports = function (root) {
    const filesList = [];

    function travelFileSync (dir) {
      const files =  fs.readdirSync(dir);
      files.forEach((file) => {
        const pathname = path.join(dir, file);
        const stat = fs.statSync(pathname);
        if (stat.isDirectory()) {
            travelFileSync(pathname)
        } else {
            filesList.push({
                fileName: path.basename(file),
                pathname
            });
        }
      })
    }

    travelFileSync(root);

    return filesList;
}