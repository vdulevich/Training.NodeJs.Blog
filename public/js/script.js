
(function ($) {
    var oldHandler = $.validator.prototype.showLabel;
    $.validator.prototype.showLabel = function(element, message){
        if(message == ""){
            return;
        } else {
            oldHandler.apply(this, arguments);
        }
    }
})(jQuery);


(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);