/**
 * Created by chang on 2017/3/4.
 */

'use strict';

var fs = require('fs');
var resolve = require('resolve');
var yaml = require('js-yaml');
var merge = require('merge-descriptors');
var chalk = require('chalk');
var path = require('path');

var G_ENV = process.env.NODE_ENV || '';
var BASEDIR =  process.cwd();
var CONFIG_DIR = 'config';

function loadConfig(filename) {
    var filepath = resolve.sync(filename, {
        basedir: BASEDIR,
        extensions: ['.js', '.json', '.node', '.yaml', '.yml'],
        moduleDirectory: CONFIG_DIR
    });
    if (/\.ya?ml$/.test(filepath)) {
        return merge({}, yaml.safeLoad(fs.readFileSync(filepath, 'utf8')), false);
    } else {
        return merge({}, require(filepath), false);
    }
}

function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}


module.exports = {
    get: function (configName) {
        var _config = null;
        try {
            _config = loadConfig(configName);

        } catch (e) {
            console.error(chalk.red('config-env load `' + configName + '` failed'));
            console.error(chalk.red(e.stack));
        }

        try {
            if(fsExistsSync(path.join(BASEDIR,CONFIG_DIR,G_ENV,configName))) {
                _config = merge(loadConfig(path.join(BASEDIR,CONFIG_DIR,G_ENV,configName)),_config, false);
            }
        } catch (e) {
            console.error(chalk.red('config-lite load `default` failed'));
            console.error(chalk.red(e.stack));
        }

        return _config;
    }
};



