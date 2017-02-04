var nodeEnv = process.env.NODE_ENV || 'development';
var isDevMode = nodeEnv === 'development' || process.execPath.match(/[\\/]electron/);

exports.NODE_ENV = nodeEnv;
exports.IS_DEV_MODE = isDevMode;
