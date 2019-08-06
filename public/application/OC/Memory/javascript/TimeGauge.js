OC.Memory.TimeGauge = function()
{
    this.value = 100;
};



OC.Memory.TimeGauge.prototype.render = function(board) {
    this.board = board;

   this.container = board.timeGaugeContainer;

   if(this.element) {
       this.element.parentNode.removeChild(this.element);
   }


   var size = Math.max(
       board.getHypotenuse()+32,
       800
   );

    this.element = document.createElement('div');
    this.element.className = 'oc-memory-timegauge'
    this.element.style.left = (size-this.board.getInnerWidth())/-2+'px';
    this.element.style.top = (size-this.board.getInnerHeight())/-2+'px';

    this.container.appendChild(this.element);


    this.board.element.style.top = (size-this.board.getInnerHeight())/2+'px';
    this.board.element.style.left = (size-this.board.getInnerHeight())/2+'px';

    this.gauge = new Donutty( this.element, {
        max: 100,
        value: 100,
        radius: size/2,
        transition: "all 0.2"
    });
};


OC.Memory.TimeGauge.prototype.setValue = function(value) {
    this.value = value;
    this.gauge.set('value', this.value);
    return this;
};

