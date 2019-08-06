OC.Memory.EndScreen = function(game)
{
    this.game = game;
    this.element = document.createElement('div');
    this.element.className = 'oc-memory-enscreen'
    this.element.innerHTML='';

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'oc-memory-enscreen-closebutton';
    this.closeButton.innerHTML = 'Again !';

    this.closeButton.addEventListener('click', this.restartGame.bind(this));


};


OC.Memory.EndScreen.prototype.setContent = function(html) {


    this.$content.html(html);
};


OC.Memory.EndScreen.prototype.show = function() {

    var elapsedTime = Math.round(this.game.getElapsedTime()/1000);




    if(this.game.isFinished()) {
        var html = "<h2>Win !</h2>";
        html += "<div>You did it in "+elapsedTime+" seconds";
        html += '<div><iframe  src="'+OC.Memory.Configuration.winVideo+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';    //#dirty
    }
    else {
        var html = "<h2>Lose !</h2>";
        html += '<div><iframe  src="'+OC.Memory.Configuration.loseVideo+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }

    this.setContent(html);



    $(this.element).show();
};


OC.Memory.EndScreen.prototype.hide = function() {
    $(this.element).hide();
};


OC.Memory.EndScreen.prototype.restartGame = function() {
    this.hide();
    this.game.reset();
};


OC.Memory.EndScreen.prototype.render = function(container) {

    this.container = container;
    this.container.appendChild(this.element);

    $(this.element).html(
        '<div class="oc-memory-enscreen-content">'+
        'Content'+
        '</div>'
    );

    this.$content = $(this.element).find('.oc-memory-enscreen-content');

    this.element.appendChild(this.closeButton);



   return this;

};


OC.Memory.EndScreen.prototype.getElement = function(container) {
    return this.element;
};