import guid from 'guid';

var getGuid = function() {
    return guid.create();
};

exports.getGuid = getGuid;
