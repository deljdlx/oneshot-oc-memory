OC.Memory.Card = function (value) {

    this.enable = true;

    this.value = value;
    this.element = null;

    this.validated = false;

    this.events = {
       click: function() {

       }
    };
};

OC.Memory.Card.enableGlobal = true;


OC.Memory.Card.prototype.getElement = function() {
    if(!this.element) {
        this.element = document.createElement('div');
        this.element.setAttribute('data-value',  this.value);
        this.element.className = 'oc-memory-card oc-memory-card-hidden';
        this.element.addEventListener('click', this.click.bind(this));
    }
    return this.element;
};


OC.Memory.Card.prototype.validate = function() {

    $(this.element).addClass('validated')
    this.validated = true;

    //this.element.style.opacity=0;
    //this.element.style.visibility = 'hidden';
};


OC.Memory.Card.prototype.on = function(eventName, callback) {
   this.events[eventName] = callback;
};


OC.Memory.Card.prototype.getValue = function() {
    return this.value;
};


/**
 *
 * @returns {number}
 */
OC.Memory.Card.prototype.getWidth = function() {
    return this.element.offsetWidth;
};

/**
 *
 * @returns {number}
 */
OC.Memory.Card.prototype.getHeight = function() {
    return this.element.offsetHeight;
};


OC.Memory.Card.prototype.click = function() {
    if(!this.enable || !OC.Memory.Card.enableGlobal) {
        return false;
    }
    this.reveal();
    this.events.click(this);
};

OC.Memory.Card.prototype.enableClick = function() {
    this.enable = true;
};


OC.Memory.Card.prototype.disableClick = function(){
    this.enable = false;
};



OC.Memory.Card.prototype.reveal = function() {
    this.element.className = 'oc-memory-card oc-memory-card-revealed';
    //this.element.setAttribute('data-value',  this.value);
    this.disableClick();
};

OC.Memory.Card.prototype.hide = function(delay) {

    if(!this.validated) {
        setTimeout(function() {
            this.element.className = 'oc-memory-card oc-memory-card-hidden';
            //this.element.removeAttribute('data-value');
            this.enableClick();
        }.bind(this), delay)
    }


};


