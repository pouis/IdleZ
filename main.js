var resources = 0;
var income = 1;
var investments = 1;
var level = 1;
var progress = 0;
var invLevel=0;
var previousTarget=0;
var timeCounter = 0;

function manualClick(){
    resources = resources + income;
    //document.getElementById("resources").innerHTML = resources;
};

function autoClick(number){
    resources = resources + number;
   //document.getElementById("resources").innerHTML = resources;
};

function buyInvestments(){
    //var investmentCost = Math.floor( 10 * Math.pow(1.1, investments));
    //if(resources >= investmentCost){
    //    investments = investments + 1;
    //    resources = resources - investmentCost;
    //    document.getElementById("investments").innerHTML = investments;
    //    document.getElementById("resources").innerHTML = resources;
    //};
    //var nextCost = Math.floor(10 * Math.pow(1.1, investments));
    //document.getElementById("investmentCost").innerHTML = nextCost;
    invLevel=invLevel+1;
    investments = Math.floor( 10 * Math.pow(1.5, invLevel)-10);
    document.getElementById("investments").innerHTML = investments;
    level = 1;
    resources=0;
};

function targeting(){
    //var target = 10 * Math.pow(level,4);
    var target = Math.floor( 10 * Math.pow(1.5, level)-14)*10;
    progress = Math.floor((resources-previousTarget) / (target-previousTarget) * 100);
    if(resources >= target){
        previousTarget = target;
        level = level+1;
    };
    document.getElementById("target").innerHTML = target;
    document.getElementById("level").innerHTML = level;
    document.getElementById("progress").innerHTML = "Search in progress... "+progress;
};

function timecount(){
    timeCounter += 1
    document.getElementById("time").innerHTML = 30-Math.floor(timeCounter/100);
};

window.setInterval(function(){
    autoClick(investments);
    targeting();
    timecount()
}, 10);