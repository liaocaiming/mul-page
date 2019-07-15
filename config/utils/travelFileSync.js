const fs = require('fs');
const path = require('path');
function travelFiles (root)  {
    const filesList = [];

    function travelFileSync (dir) {
      if (!fs.existsSync(dir)) {
        return;
      }
      const files =  fs.readdirSync(dir);

      if (!files) {
        return;
      }

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

module.exports = travelFiles;