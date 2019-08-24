const fs = require('fs');

function readJson(filename) {
  const contents = fs.readFileSync(filename, { encoding: 'utf8' });

  try {
    var obj = JSON.parse(contents);
  } catch(ex) {
    console.error(`JSON parsing error while reading ${filename}:`);
    console.error(ex);
    throw ex;
  }

  return obj;
}

module.exports = { readJson };
