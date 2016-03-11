var resources = 0;
var clickIncome = 10;
var crawlSpeed = 1;
var areaLevel = 1;
var progress = 0;
var invLevel=1;
var previousTarget=100;
var timeCounter = 0;
var material = 0;
var encount = 0;
var sentou = 0;
var tekiHP=100, tekiTotalHP=100;

function manualClick(){
    resources = resources + clickIncome;
};

function autoClick(number){
    resources = resources + number;
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
    crawlSpeed = Math.round(crawlSpeed * 1.5*100)/100;
    document.getElementById("investments").innerHTML = crawlSpeed;
    areaLevel = 1;
    resources=0;
    previousTarget=100;
};

function targeting(){
    var target = Math.floor(previousTarget * 1.5)
    progress = Math.min(Math.floor(resources / target * 100),100);
    if(resources >= target){
        previousTarget = target;
        areaLevel = areaLevel+1;
        resources = resources - target
        material=material+Math.floor((Math.random() * 10) + 1)
        document.getElementById("material").innerHTML = material;
    };
        
    document.getElementById("target").innerHTML = target;
    document.getElementById("level").innerHTML = areaLevel;
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
    document.getElementById("batLabel").innerHTML=Math.floor(tekiHP/tekiTotalHP*100)+'%';
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
            tekiTotalHP=100*areaLevel;
            tekiHP=tekiTotalHP;
        };
    } else{
        tekiHP=tekiHP-5;
        if(tekiHP<=0){
            sentou=0;
            tekiHP=0;
        };
    };
};

window.setInterval(function(){
    if(sentou==0){
        autoClick(crawlSpeed);
        targeting();
    };
    timecount();
    barUpdate();
    encounter();
}, 10);