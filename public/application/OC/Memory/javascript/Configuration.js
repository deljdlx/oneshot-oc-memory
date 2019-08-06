OC.Memory.Configuration = {
    gameDuration: 300000,
    //gameDuration: 1000,
    pairNumber: 18,


    timeGaugeInstance:new OC.Memory.TimeGauge(),    //circle time gauge

    //for a classical time gauge uncomment folowing line
    //timeGaugeInstance:new OC.Memory.SimpleTimeGauge(),

    endScreen: OC.Memory.EndScreen,


    cardHideDelay: 700,

    loseVideo: 'https://www.youtube.com/embed/AfiINIrFMRM?controls=0&amp;start=6&amp;autoplay=1',
    winVideo: 'https://www.youtube.com/embed/rW6M8D41ZWU?controls=0&amp;autoplay=1&amp;start=10',

};