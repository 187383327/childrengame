
var Touch = function () {
    var self = this;
    document.addEventListener('touchstart', function (event) {
        self.touchStart(event);
    })
    document.addEventListener('touchmove', function (event) {
        event.preventDefault()
        self.touchMove(event);
    }, { passive: false })
    document.addEventListener('touchend', function (event) {
        self.touchEnd(event);
    })
    document.addEventListener('touchcancel', function (event) {
        self.touchEnd(event)
    })
}
Touch.prototype = {
    isTouchStart: false,
    isTouchMove: false,
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    endX: 0,
    endY: 0,
    startTime: 0,
    touchStart: function (event) {
        var event = event || window.event;
        this.startTime = new Date().getTime();
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
        this.isTouchStart = true;
        Game.trigger('touchstart');
        // console.log('touchstart', this.startX, this.startY)
    },
    touchMove: function (event) {
        if (this.isTouchStart) {
            var event = event || window.event;
            this.moveX = event.touches[0].clientX;
            this.moveY = event.touches[0].clientY;
            this.isTouchMove = true;
            Game.trigger('touchmove');
        }
        // console.log('touchmove', this.moveX, this.moveY)
    },
    touchEnd: function (event) {
        var event = event || window.event;
        this.endX = event.changedTouches[0].clientX;
        this.endY = event.changedTouches[0].clientY;
        this.isTouchStart = false;
        this.isTouchMove = false;
        var nowTime = new Date().getTime();
        Game.trigger('touchend');
        if(nowTime - this.startTime < 200){
            Game.trigger('tap',{tapx:this.endX, tapy:this.endY});
        }
        this.startTime = 0;
        // console.log('touchend', this.endX, this.endY)
    },
    reset: function () {
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.endX = 0;
        this.endY = 0;
        this.isTouchStart = false;
        this.isTouchMove = false;
    },
    releaseEvent: function (event) {
        // document.removeEventListener('touchstart');
        // document.removeEventListener('touchmove');
        // document.removeEventListener('touchend');
    }
}