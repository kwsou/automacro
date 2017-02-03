
var write = function(msg) {
    process.stdout.write(msg);
};

var writeLine = function(msg) {
    write(msg + '\n');
};

var writeEmptyLine = function() {
    writeLine('');
};

exports.write = write;
exports.writeLine = writeLine;
exports.writeEmptyLine = writeEmptyLine;
