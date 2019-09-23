// This file is used for generate resource map that used for parsing to actual online resource link on server-side.
var merge = require('lodash.merge');
var path = require("path");

function chunkmapPlugin(options) {
    this.options = merge({}, {
        serverPath: '//read.xueersi.cn',
        filename: 'webpack-assets.json',
        prefix: '',
        keyPrefix: '',
        prettyPrint: true,
        involveAll: false,
        ignore: null
    }, options);
}

chunkmapPlugin.prototype.apply = function (compiler) {
    var options = this.options,
        ignorePattern = options.ignore;

    compiler.plugin('emit', function (compilation, callback) {
        var chunks = compilation.chunks,
            mapping = {};

        chunks.forEach(function (chunk) {
            if (chunk.hasRuntime() || options.involveAll) {
                var name = chunk.name,
                    files = chunk.files;
                files.forEach(function (file) {
                    var ext = path.extname(file);
                    // var ext = file.match(/\..*$/)[0];
                    if (ignorePattern && ignorePattern.test(file)) {
                        return true;
                    }
                    mapping[(options.keyPrefix? options.keyPrefix : options.prefix) + name + ext] = options.serverPath + options.prefix + file;
                });
            }
        });

        if(compilation.assets[options.filename])
            throw new Error("This filename '" + options.filename +
                "' is already used! \n Please change another name for your map file");

        compilation.assets[options.filename] = {
            source: function () {

                if(typeof options.success === 'function') {
                    options.success.call(null, {
                        content: mapping
                    })
                }

                return JSON.stringify(mapping, null, options.prettyPrint ? 2 : null);
            },
            size  : function () {
                return JSON.stringify(mapping, null, options.prettyPrint ? 2 : null).length;
            }
        };

        callback();
    });
}

module.exports = chunkmapPlugin;
