/**
 *
 * @param {OC.Memory.Game}  game
 * @constructor
 */
OC.Memory.Board = function(game)
{
    this.game = game;


    //kind of dependency injection
    this.timeGauge = OC.Memory.Configuration.timeGaugeInstance;

    //this.container is the dom element used to encapsulate the "board"
    this.container = null;

    //this.element is the dom element used to render the board
    this.element = null;


    this.endScreen = new OC.Memory.Configuration.endScreen(this.game); //new OC.Memory.EndScreen(this.game);

};






//==================================================

OC.Memory.Board.prototype.reset = function() {

};



OC.Memory.Board.prototype.start = function() {
    $(this.startButton).hide();
    this.scoreScreen.hide();
    this.cardContainer.style.opacity = 1;
};


OC.Memory.Board.prototype.end = function() {
    this.cardContainer.style.opacity = 0;

    this.showEndScreen();

};


//==================================================

OC.Memory.Board.prototype.showEndScreen = function() {

    this.endScreen.show();
};


//==================================================

OC.Memory.Board.prototype.render = function(container, callback) {

    this.container = container;
    this.reset();
    this.container.appendChild(this.element);

    this.generateCards();



    //"squarification" of the matrix, because it is beautifull haha
    this.squarify();


    this.generateStartButton();

    this.generateScoreScreen();


    this.endScreen.render(this.element);


    this.generateTimeGauge();



    this.resize();


    window.onresize = function() {
        this.resize();
    }.bind(this);


    if(callback) {
        callback(this);
    }

};





OC.Memory.Board.prototype.generateTimeGauge = function()
{
    this.timeGauge.render(this);
};


OC.Memory.Board.prototype.reset = function()
{
    if(this.element) {
        this.element.parentNode.removeChild(
            this.element
        );
    }

    this.element = document.createElement('div');
    this.element.className = 'oc-memory-board';



    this.timeGaugeContainer = document.createElement('div');
    this.timeGaugeContainer.className = 'oc-memory-board-timegaugecontainer';
    this.element.appendChild(this.timeGaugeContainer);

    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'oc-memory-board-cardcontainer';
    this.element.appendChild(this.cardContainer);
};



OC.Memory.Board.prototype.generateScoreScreen = function()
{
    this.scoreScreen = new OC.Memory.ScoreScreen();
    this.scoreScreen.load();

    this.element.appendChild(
        this.scoreScreen.getElement()
    );

};



//==================================================
//Rendering methods
//==================================================

OC.Memory.Board.prototype.resize = function()
{


    //resize matrix depending on screen size
    var bodyWidh = document.body.offsetWidth;
    var matrixWidth = this.getOuterWidth();


    var finalWidth = Math.min(
        Math.floor(bodyWidh/1.75),
        this.getInnerHeight()-300
    );

    var ratio = finalWidth/matrixWidth;


    if(ratio<1) {
        this.element.style.zoom = ratio;
    }

    this.element.style.left = '50%';
    this.element.style.marginLeft = matrixWidth/-2+'px';

    this.element.style.top = '50%';
    this.element.style.marginTop = this.getOuterHeight()/-2+'px';

};



OC.Memory.Board.prototype.generateStartButton = function() {
    this.startButton = document.createElement('button');
    this.startButton.className = 'oc-memory-board-startbutton';
    this.startButton.innerHTML = 'Start';

    this.element.appendChild(this.startButton);


    //centering the button
    this.startButton.style.left =
        this.getInnerWidth()/2
        - this.startButton.offsetWidth/2
        +'px';

    this.startButton.style.top =
        (this.getInnerHeight()*0.75)
        +'px';

    this.startButton.addEventListener('click', function() {
        this.game.start();
    }.bind(this));

};




OC.Memory.Board.prototype.generateCards = function()
{
    var cards = this.game.getCards();
    this.shuffle(cards);

    for(var index=0; index<cards.length; index++) {
        this.renderCard(cards[index]);
    }
    return this;
};

OC.Memory.Board.prototype.renderCard = function(card) {
    card.on('click', function(card) {
        this.game.selectCard(card);
    }.bind(this));
   this.cardContainer.appendChild(card.getElement());

   return card.getElement();
};





//==================================================
//Util methods
//==================================================


OC.Memory.Board.prototype.setTimeGauge = function(value) {
    this.timeGauge.setValue(value);
};


/*
 Some css calculations to make the matrix close from a square

 */
OC.Memory.Board.prototype.squarify = function() {

    var cards = this.game.getCards();
    var card = cards[0].getElement();

    //we need computed values of css attributes ; (a little bit advenced topic, to long to explain in a comment)
    var cardStyle = window.getComputedStyle(card);

    var cardsPerRow = Math.floor(Math.sqrt(cards.length));

    var cardWidth =
        card.offsetWidth+
        parseInt(cardStyle.marginLeft) +
        parseInt(cardStyle.marginRight)
    ;
    //this.cardContainer.style.maxWidth = cardWidth * cardsPerRow+'px';
    this.element.style.maxWidth = cardWidth * cardsPerRow+'px';
    this.element.style.maxHeight = this.getInnerHeight()+'px';

};

/*
Oh yes math does not exist only to make chilren cry haha !
Compute hypotenuse of the grid, used to do some "nice" display
 */
OC.Memory.Board.prototype.getHypotenuse = function() {
    var cards = this.game.getCards();
    var card = cards[0].getElement();
    var cardStyle = window.getComputedStyle(card);

    var cardsPerRow = Math.floor(Math.sqrt(cards.length));

    var cardWidth =
        card.offsetWidth+
        parseInt(cardStyle.marginLeft) +
        parseInt(cardStyle.marginRight)
    ;

    var cardHeight =
        card.offsetHeight+
        parseInt(cardStyle.marginTop) +
        parseInt(cardStyle.marginBottom)
    ;

    var rowNumber = Math.ceil(cards.length/cardsPerRow);

    return Math.sqrt(
        Math.pow(rowNumber*cardHeight,2)+
        Math.pow(cardWidth*cardsPerRow,2)
    );

};






/*
Shuffling card deck
This code is an exemple of simple array manipulation
We permutate cards randomly
 */
OC.Memory.Board.prototype.shuffle = function(cards) {
    var index0 = 0; //index of the first card permutation
    var index1 = 1; //index of the second card permutation
    var tempCard = null; //used to save first card during permutation

    for(var permutation = 0; permutation < cards.length; permutation++) {
        //generating random indexes for permutation
        //some simple math  take care, an array in javascript start at index 0 ;
        //that why you must use Math.floor
        index0 = Math.floor(Math.random() * cards.length);
        index1 = Math.floor(Math.random() * cards.length);

        //saving first card before permutation
        tempCard = cards[index0];

        //applying permutation
        cards[index0] = cards[index1];
        cards[index1] = tempCard;
    }
};


//==================================================
//getter/setter
//==================================================
OC.Memory.Board.prototype.getInnerWidth = function()
{
    return this.cardContainer.offsetWidth;
};

OC.Memory.Board.prototype.getInnerHeight = function()
{
    return this.cardContainer.offsetHeight;
};

OC.Memory.Board.prototype.getOuterWidth = function()
{
    return this.element.offsetWidth;
};

OC.Memory.Board.prototype.getOuterHeight = function()
{
    return this.element.offsetHeight;
};

OC.Memory.Board.prototype.getCardStyle = function()
{
    return window.getComputedStyle(this.getCard().element);

};

OC.Memory.Board.prototype.getCard = function() {
    var cards = this.game.getCards();
    return cards[0];
};
