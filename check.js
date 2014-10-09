var cheerio = require('cheerio');
var request = require('request');
var colors = require('colors');
var pkg = require('./package.json');

function smaller (v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  for (var i = 0, len = v1.length; i < len; i++) {
    num = v1[i];
    if (num < v2[i]) {
      return true;
    }
  }
  return false;
};

function getOnlineVersion (cb) {
  request('http://cnpmjs.org/package/cli-sample', function (err, res) {
    if (err) {
      return cb(err);
    }
    var $ = cheerio.load(res.body);
    var version = $('h1 img').attr('title');
    cb(null, version);
  });
}

module.exports = function(cb) {
  var timeout = setTimeout(function() {
    cb();
    return cb = function() {};
  }, 1000);
  getOnlineVersion(function (err, onlineVersion) {
    clearTimeout(timeout);
    if (err) {
      return cb();
    }
    localVersion = pkg.version;
    needUpdate = smaller(localVersion, onlineVersion);
    if (needUpdate) {
      warnMessage = "cli的最新版是" + onlineVersion + ", 当前版本是" + localVersion + ", 建议更新到最新版. 更新命令:";
      cmd = 'npm install -g cli-sample';
      console.warn(warnMessage.yellow, cmd.green);
    }
    return cb();
  });
};
