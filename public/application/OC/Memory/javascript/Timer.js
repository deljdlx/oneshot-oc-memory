OC.Memory.Timer = function (duration)
{

    this._timeout = null;

    //in millisecond because it is default time unit in js
    //this.defaultDuration = 12000;
    this.defaultDuration = 1000;
    this.tick = 10;    //10 game ticks per second



    //time handling========
    this.startTime = null;
    this.remaining = this.duration;
    this.ratio = 100;   this.elapsed = 0;

    this.reset();


    //events=============
    this.events = {
        end: function(instance) {
            //console.log('end timer');
        },
        start: function(instance) {
            //console.log('starting timer');
        },
        loop: function(instance) {
            //console.log(elapsed);
        }
    };
    //=================

    if (parseInt(duration)) {
        this.duration = duration;
    }
    else {
        this.duration = this.defaultDuration;
    }


};

OC.Memory.Timer.prototype.on = function(eventName, callback) {
    this.events[eventName] = callback;
};

OC.Memory.Timer.prototype.start = function () {
    this.startTime = new Date();

    if(this.events.start) {
        this.events.start(this);
    }
    this.loop();
};


//==================================================


OC.Memory.Timer.prototype.getElapsedTime = function() {
   return this.elapsed;
};


OC.Memory.Timer.prototype.reset = function () {
    clearTimeout(this._timeout);

    this.startTime = null;
    this.remaining = this.duration;
    this.ratio = 100;   this.elapsed = 0;

};

OC.Memory.Timer.prototype.stop = function () {
    clearTimeout(this._timeout);
};


OC.Memory.Timer.prototype.end = function () {
    clearTimeout(this._timeout);
    if(this.events.end) {
        this.events.end(this);
    }
};



OC.Memory.Timer.prototype.loop = function () {
    this.elapsed = (new Date().getTime()) - this.startTime;
    this.remaining = this.duration - this.elapsed;
    this.ratio = this.remaining/this.duration;

    if(this.events.loop) {
        this.events.loop(this);
    }

    if (this.elapsed < this.duration) {
        this._timeout = setTimeout(this.loop.bind(this), this.tick);
    }
    else {
        this.end();
    }
};
