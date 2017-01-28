
var write = function(msg) {
    process.stdout.write(msg);
};

var writeLine = function(msg) {
    write(msg + '\n');
};

exports.write = write;
exports.writeLine = writeLine;
