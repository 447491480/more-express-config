/**
 * Created by chang on 2017/3/4.
 */

'use strict';

var fs = require('fs');
var resolve = require('resolve');
var yaml = require('js-yaml');
var merge = require('merge-descriptors');
var path = require('path');

var G_ENV = process.env.NODE_ENV || '';
var BASEDIR = process.cwd();
var CONFIG_DIR = 'config';

function loadConfig(filename) {
    var filepath = null;
    try {
        filepath = resolve.sync(filename, {
            basedir: BASEDIR,
            extensions: ['.js', '.json', '.node', '.yaml', '.yml'],
            moduleDirectory: CONFIG_DIR
        });
    } catch (e) {
        return {};
    }

    if (/\.ya?ml$/.test(filepath)) {
        return merge({}, yaml.safeLoad(fs.readFileSync(filepath, 'utf8')), false);
    } else {
        return merge({}, require(filepath), false);
    }
}

module.exports = {
    get: function (configName) {
        var _config = null;
        _config = loadConfig(configName);
        _config = merge(loadConfig(path.join(BASEDIR, CONFIG_DIR, G_ENV, configName)), _config, false);
        return _config;
    }
};



