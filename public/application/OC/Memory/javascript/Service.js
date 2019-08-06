OC.Memory.Service = function ()
{

};

OC.Memory.Service.prototype.call = function (options)
{
    $.ajax(options);
};


OC.Memory.Service.prototype.ping = function ()
{
    this.call({
        url: 'service.php?system/ping',
        method: 'get',
        success: function (response) {
            console.log(response)
        }
    });
};


OC.Memory.Service.prototype.saveGame = function (game)
{
    this.call({
        url: 'service.php?game/save',
        data: game.serialize(),
        method: 'post',
        success: function (response) {
            console.log(response);
        }
    });
};


OC.Memory.Service.prototype.getScores = function (top, callback)
{
    this.call({
        url: 'service.php?game/scores',
        data: {top: top},
        method: 'get',
        success: callback
    });
};





