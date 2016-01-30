var url = require('url');

module.exports = function(req, res, next){
        var parsedUrl = url.parse(req.url),
            tabName = 'home';

        if (parsedUrl.pathname.indexOf('profile') > 0) {
            tabName = 'profile';
        } else if (parsedUrl.pathname.indexOf('article') > 0) {
            tabName = 'article';
        }
        req.tabName = res.locals.tabName = tabName;
        res.locals.tabClassFn = function(name){
            return tabName == name ? "nav-selected" : "";
        };
        next();
}