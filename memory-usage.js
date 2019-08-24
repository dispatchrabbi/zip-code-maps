const v8 = require('v8');
const heapdump = require('heapdump');

function printMemoryUsage() {
  console.log(`Memory usage:`);
  console.log(v8.getHeapStatistics());
}

function dumpHeap() {
  heapdump.writeSnapshot(function(err, filename) {
    if(err) { console.error(err); return; }
    console.info(`Wrote heap dump to ${filename}`);
  });
}

module.exports = {
  printMemoryUsage,
  dumpHeap
};
