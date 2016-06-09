(function($){
    'use strict';

    if($.validator) {
        var oldHandler = $.validator.prototype.showLabel;
        $.validator.prototype.showLabel = function (element, message) {
            if (message === "") {
                return;
            } else {
                oldHandler.apply(this, arguments);
            }
        };
    }

    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    };

    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
