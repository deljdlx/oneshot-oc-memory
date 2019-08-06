OC.Memory.ScoreScreen = function()
{

    this.service = new OC.Memory.Service();


    this.element = document.createElement('div');
    this.element.className = 'oc-memory-scorescreen';
    this.element.innerHTML = '<h2>Best scores</h2>';

    this.scoreContainer = document.createElement('ul');
    this.element.appendChild(this.scoreContainer);

};

OC.Memory.ScoreScreen.prototype.getElement = function()
{
   return this.element;
};

OC.Memory.ScoreScreen.prototype.hide = function()
{
   $(this.element).hide();
};



OC.Memory.ScoreScreen.prototype.show = function()
{
    $(this.element).show();
};

OC.Memory.ScoreScreen.prototype.load = function()
{
    this.service.getScores(5, function(scores) {
        this.scoreContainer.innerHTML = '';

        for(var i=0; i<scores.length; i++) {
            var item = document.createElement('li');

            var durationInSecond = Math.ceil(scores[i].duration/1000);

            var minut = Math.floor(durationInSecond/60);
            var second = durationInSecond%60;

            if(minut) {
                item.innerHTML = '<span class="minut">'+minut+'</span>';
            }
            item.innerHTML += '<span class="second">'+second+'</span>';

            this.scoreContainer.appendChild(item);
        }
    }.bind(this));
};

