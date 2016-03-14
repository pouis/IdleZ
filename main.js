var resources = 0;
var clickIncome = 10;
var crawlSpeed = 1, crawlSpeedMultiple = 1;
var areaLevel = 1;
var progress = 0;
var crawlLevel=1;
var previousTarget=100;
var timeCounter = 0;
var gold = 0;
var encount = 0;
var sentou = 0;
var tekiHP=100, tekiTotalHP=100, tekiAtt=1;
var exp=0;
var myHP=100, myAtt=1;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function manualClick(){
    resources = resources + clickIncome;
};

function autoClick(){
    resources = resources + crawlSpeed*crawlSpeedMultiple;
};

function buyInvestments(){
    var investmentCost = Math.floor( 10 * Math.pow(1.1, crawlLevel));
    if(exp >= investmentCost){
        crawlLevel=crawlLevel+1;
        exp = exp - investmentCost;
        crawlSpeed = Math.round(crawlSpeed * 1.5 * 100)/100; // the "* 100 / 100" is to allow 2 digits after 0
        document.getElementById("crawlLevel").innerHTML = crawlLevel;
    //    document.getElementById("resources").innerHTML = resources;
        //areaLevel = 1;
        //resources=0;
        //previousTarget=100;
    
    
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, crawlLevel));
    document.getElementById("investmentCost").innerHTML = nextCost;
    //crawlLevel=crawlLevel+1;
    //crawlSpeed = Math.round(crawlSpeed * 1.5 * 100)/100; // the "* 100 / 100" is to allow 2 digits after 0
    document.getElementById("crawlLevel").innerHTML = crawlLevel;
    //areaLevel = 1;
    //resources=0;
    //previousTarget=100;
    document.getElementById("exp").innerHTML = exp;
};

function buyW(){
    var purchaseCost = 5;
    if(gold>=purchaseCost){
        gold = gold - purchaseCost;
        myAtt += 1;
        areaLevel = 1;
        resources=0;
        previousTarget=100;
    };
    document.getElementById("gold").innerHTML = gold;
    
};

function crawling(){
    var target = Math.floor(previousTarget * 1.5)
    progress = Math.min(Math.floor(resources / target * 100),100);
    if(resources >= target){
        previousTarget = target;
        areaLevel = areaLevel+1;
        resources = resources - target
        gold=gold+Math.floor((Math.random() * areaLevel) + 1)
        document.getElementById("gold").innerHTML = gold;
    };
        
    document.getElementById("target").innerHTML = target;
    document.getElementById("areaLevel").innerHTML = areaLevel;
    document.getElementById("progress").innerHTML = "Search in progress... "+progress;
};

function barUpdate(){
    var areaBar = document.getElementById("areaBar");
    areaBar.style.width = progress + '%';
    var areaLabel = document.getElementById("areaLabel");
    document.getElementById("areaLabel").innerHTML=progress+'%';
    
    var batBar = document.getElementById("batBar");
    batBar.style.width = Math.floor(tekiHP/tekiTotalHP*100) + '%';
    var batLabel = document.getElementById("batLabel");
    document.getElementById("batLabel").innerHTML=tekiHP+' / '+tekiTotalHP;
};


function timecount(){
    timeCounter += 1 ;
    document.getElementById("time").innerHTML = 30-Math.floor(timeCounter/100);
};

function encounter(){
    if(sentou==0){
        var encountTest=Math.floor((Math.random() * 100) + 1);
        if (encountTest == 1){
            encount += 1 ;
            document.getElementById("encount").innerHTML = encount;
            sentou = 1;
            tekiTotalHP=Math.floor( 100 * Math.pow(areaLevel,1.2) * getRandomInt(50,150) / 100);
            tekiHP=tekiTotalHP;
        };
    } else{
        tekiHP=tekiHP-myAtt;
        if(tekiHP<=0){
            sentou=0;
            tekiHP=0;
            exp += Math.floor(tekiTotalHP/100);
            document.getElementById("exp").innerHTML = exp;
        };
    };
};

window.setInterval(function(){
    if(sentou==0){
        autoClick();
        crawling();
    };
    timecount();
    barUpdate();
    encounter();
}, 10);