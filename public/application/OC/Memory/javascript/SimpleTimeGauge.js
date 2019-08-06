OC.Memory.SimpleTimeGauge = function()
{
    this.value = 100;
};

OC.Memory.SimpleTimeGauge.prototype.render = function(board) {
    this.board = board;
    var container = board.timeGaugeContainer;
   this.container = container;


   if(this.element) {
       this.element.parentNode.removeChild(this.element);
   }

    this.element = document.createElement('div');
    this.element.className = 'oc-memory-simpletimegauge'

    this.container.appendChild(this.element);

    this.gauge = document.createElement('div');
    this.gauge.className = 'oc-memory-simpletimegauge-gauge';
    this.element.appendChild(this.gauge);

};


OC.Memory.SimpleTimeGauge.prototype.setValue = function(value) {

    this.value = value;

    this.gauge.style.width = this.value+'%';

    return  this;
};

