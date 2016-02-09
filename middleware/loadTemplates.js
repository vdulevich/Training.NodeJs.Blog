var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var approot = require('app-root-path');

var templates = { };

function getTpl(tplPath, tplName){
    if (!templates[tplName]) {
        return templates[tplName] = fs.readFileSync(path.join(tplPath, tplName), 'utf-8');
    }
    return templates[tplName];
}

module.exports = function(tplPath) {
    var tplFullPath = path.join(approot.path, tplPath);
    return function (req, res, next) {
        res.locals.getTpl = getTpl.bind(this, tplFullPath);
        next();
    };
}


