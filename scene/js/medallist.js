var medalList = {
    init: function(){
        this.addEvent()
    },
    addEvent: function(){
        var r = document.getElementById('js-return');
        r.addEventListener('touchstart', function (event) {
            history.back();
        }, { passive: true });
    }
}
var Config = {
    designW: 2048,
    designH: 1536,
    designFS: 100
}
util.setFontSize(Config);
medalList.init();