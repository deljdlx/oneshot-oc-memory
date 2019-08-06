OC.Memory.Game = function()
{
    this.timer = new OC.Memory.Timer(OC.Memory.Configuration.gameDuration);

    this.board = null;
    this.hideDelay = OC.Memory.Configuration.cardHideDelay;

    this.cardTypeNumber = OC.Memory.Configuration.pairNumber;   //how many "pairs" do we want to have in the game


    this.cardsPerAssociation = 2; //by default a memory work with pair of card, but why not more ?

    this.cards = [];

    this.selectedCards = [];
    this.validatedAssociations = 0;



    this.service = new OC.Memory.Service();


    this.service.ping();
};


//==================================================




OC.Memory.Game.prototype.reset = function() {

    this.validatedAssociations = 0;
    this.selectedCards = [];
    this.cards = [];
    this.board.reset();
    this.timer.reset();

    this.initialize();

};


OC.Memory.Game.prototype.start = function() {
    OC.Memory.Card.enableGlobal = true;
    this.board.start();
    this.timer.start();
};


OC.Memory.Game.prototype.end = function() {
    this.timer.stop();
    this.board.end();
    this.save();


};


OC.Memory.Game.prototype.save = function()
{
    this.service.saveGame(this);

};

OC.Memory.Game.prototype.serialize = function()
{
    var status = 0;

    if(this.isFinished()) {
        status = 1;
    }
    return {
        status: status,
        elapsed: this.getElapsedTime()
    }
};


OC.Memory.Game.prototype.continue = function() {

    for(var index = 0; index<this.selectedCards.length; index++) {
        this.selectedCards[index].hide(this.hideDelay);
    }
    this.selectedCards = [];

    //enabling global card clicking
    setTimeout(function() {
        OC.Memory.Card.enableGlobal = true;
    }, this.hideDelay/2);
};


//==================================================

OC.Memory.Game.prototype.isFinished = function() {

   if(this.validatedAssociations >= this.cardTypeNumber) {
       return true;
   }
   else {
       return false;
   }

   /*
   #personnal mind
   oh yes we could have used
   return this.validatedAssociations >= cardTypeNumber;
   but doing such short code just for pleasure is not something I like....
   if you like coding this, I encourage you to learn low level language
    */
};


//==================================================

OC.Memory.Game.prototype.getElapsedTime = function() {
   return this.timer.getElapsedTime();
};


/**
 * Generation of the cards deck
 */
OC.Memory.Game.prototype.generate = function()
{


    //for each different card type
    for(var index = 0; index<this.cardTypeNumber; index++) {
        //we initialise card associations (by default we have two cards per association, this is a classical memory)
        for(var association = 0; association < this.cardsPerAssociation; association++) {
            this.cards.push(new OC.Memory.Card(index));
        }
    }

    this.board = new OC.Memory.Board(this);



};




OC.Memory.Game.prototype.initialize =  function(container) {

    this.generate();



    if(container) {
        this.container = container;
    }


    this.board.render(this.container);


    this.timer.on('loop', function(timer) {
        this.board.setTimeGauge(timer.ratio*100);
    }.bind(this));

    this.timer.on('end', function(timer) {
        this.end();
    }.bind(this));

};

OC.Memory.Game.prototype.selectCard = function(card) {
    this.selectedCards.push(card);

    console.log(this.selectedCards);

    if(this.selectedCards.length >= this.cardsPerAssociation) {

        //global card clicking disabled
        OC.Memory.Card.enableGlobal = false;

        if(this.checkAssociation()) {
            this.validateAssociation();
        }

        if(this.isFinished()) {
            this.end();
        }
        else {
            this.continue();
        }
    }
};

OC.Memory.Game.prototype.validateAssociation = function() {
    for(var index = 0; index<this.selectedCards.length; index++) {
        this.selectedCards[index].validate();
    }
    this.validatedAssociations++;

};


//check if selected cards are the same
OC.Memory.Game.prototype.checkAssociation = function() {

    var value = null;

    for(var index = 0; index<this.selectedCards.length; index++) {


        if(value !== null) {
            if(this.selectedCards[index].getValue() != value) {
                return false;
            }
        }
        value = this.selectedCards[index].getValue();

    }

    return true;
};



OC.Memory.Game.prototype.getCards = function(container) {
    return this.cards;
};



