
class CatSelector{    
    constructor(catImages,fighter,info,parents,buttons){
        this.catImages = catImages;
        this.fighterImg = fighter;
        this.info = info;
        this.parents = parents;
        this.buttons = buttons;
        this.fighters = [];
        this.enabled = true;
        this.fighted = false;
        
    }
    init(){
        document.querySelector(this.buttons.fight).disabled = true;
        this._catsClickHandler(this.catImages);
        this._buttonsClickHandler(this.buttons);
        this.firstImg =document.querySelector(POM.parents.first).firstElementChild.querySelector(POM.fighter).querySelector("img");
        this.secondImg = document.querySelector(POM.parents.second).firstElementChild.querySelector(POM.fighter).querySelector("img");
        this.winnerTitle = document.querySelector("h2");
    }

    _buttonsClickHandler(buttons){
        const fightBtn = document.querySelector(buttons.fight);
        const randomBtn = document.querySelector(buttons.randomFighters);        
        fightBtn.addEventListener("click",(e)=>{
            this._disableAll();           
            document.querySelector("h2").textContent = 3;
            var counter = 2;               
            let timer = setInterval(function(){
            if(counter>=1){                
                document.querySelector("h2").textContent = counter
                counter--                 
            }            
            }, 1000);
            var firstScore = this.fisrtFighter.wins/(this.fisrtFighter.wins+ this.fisrtFighter.loss);
                var secondScore = this.secondFighter.wins/(this.secondFighter.wins+ this.secondFighter.loss);            
                const score = Math.ceil(Math.random() * 100);                                                
                
                this.fighted = true;       
            setTimeout(function(args) { 
                if(firstScore>secondScore){
                    if(firstScore>secondScore+0.1){                    
                        if(score>70){
                            args._secondWins();                        
                        } 
                        else {
                            args._firstWins();                        
                        }
                    }else{
                        if(score>60){
                            args._secondWins();                         
                        } 
                        else{
                            args._firstWins();  
                        } 
                    }                     
                }else{
                    if(secondScore>firstScore+0.1){                
                        if(score>70){
                            args._firstWins();  
                        } 
                        else{
                            args._secondWins(); 
                            } 
                    }else {
                        if(score>60) {
                            args._firstWins();  
                        }
                        else {
                            args._secondWins(); 
                        }
                    }                              
                }                                          
                args.winnerTitle.textContent ="WINNER: "+  args.winner.name;
                args._setNewAttributes(args.winner,args.looser); 
                //ajax zahtjev za php skriptu koja ce azurirati broj wins/loss
                $.ajax({
                    data: {winner: args.winner.name, loser: args.looser.name},
                    url: './includes/afterFight.inc.php',
                    method: 'POST',
                    success: function(msg){                       
                        
                    }
                })                 
                args._enableAll(); 
            }, (4000),this);                
        });     
        
        randomBtn.addEventListener("click",(e)=>{
            var left = document.querySelector(POM.parents.first);
            var right = document.querySelector(POM.parents.second);       
            var cats =  document.querySelectorAll(POM.image)
            var numOfCats = cats.length/2  
            
            var first = Math.ceil(Math.random() * numOfCats-1);
            var second =  Math.ceil(Math.random() * numOfCats-1);
            while(first==second){
                second =  Math.ceil(Math.random() * numOfCats-1);
            }
            
            const id1 = JSON.parse(cats[first].dataset.info).id;
            const id2 = JSON.parse(cats[second].dataset.info).id;           

            this._setCatById(id1,left);
            this._setCatById(id2,right);
        });
    }
    _firstWins(){
        this.winner = this.fisrtFighter;
        this.looser = this.secondFighter;
        this.firstImg.style.border = "thick solid #00FF00";
        this.secondImg.style.border = "thick solid #FF0000";
        this.fisrtFighter.wins++;
        this.secondFighter.loss++;
        this._updateFightersAfterFight();
    }
    _secondWins(){
        this.winner = this.secondFighter;
        this.looser = this.fisrtFighter;
        this.secondImg.style.border = "thick solid #00FF00";
        this.firstImg.style.border = "thick solid #FF0000";
        this.secondFighter.wins++;
        this.fisrtFighter.loss++;        
        this._updateFightersAfterFight();
    }
    _updateFightersAfterFight(){
        this._setFighter(this.fisrtFighter,document.querySelector(POM.parents.first),POM.infos,POM.image);
        this._setFighter(this.secondFighter,document.querySelector(POM.parents.second),POM.infos,POM.image);
    }
    _setNewAttributes(winner,looser){
        const cats = document.querySelectorAll(POM.image);
        for(let key in cats){
            if(cats.hasOwnProperty(key)){
                let cat = cats[key];    
                const data = JSON.parse(cat.dataset.info);
                if(data.id===winner.id){                    
                    data.record.wins ++;
                    const update = JSON.stringify(data);
                    cat.setAttribute("data-info",update);    
                }else if(data.id === looser.id){                    
                    data.record.loss ++;
                    const update = JSON.stringify(data);
                    cat.setAttribute("data-info",update);                   
                }
            }
        }

    }
    _disableAll(){        
        this.enabled = false;
        var editBtns = document.querySelectorAll(this.buttons.edit);
        editBtns.forEach(btn => {
            btn.disabled = true;
        });
        var linkBtn = document.querySelector(this.buttons.addNew);
        linkBtn.classList.add("disabled");
        document.querySelector(this.buttons.fight).disabled = true;
        document.querySelector(this.buttons.randomFighters).disabled = true;
    }
    _enableAll(){
        this.enabled = true;
        var editBtns = document.querySelectorAll(this.buttons.edit);
        editBtns.forEach(btn => {
            btn.disabled = false;
        });
        var linkBtn = document.querySelector(this.buttons.addNew);
        linkBtn.classList.remove("disabled");
        document.querySelector(this.buttons.randomFighters).disabled = false;
        document.querySelector(this.buttons.fight).disabled = false;
    }
    _catsClickHandler(catImages){
        const images = document.querySelectorAll(catImages);
        for(let key in images){   
            if(images.hasOwnProperty(key)){
                let image = images[key];                     
                image.addEventListener("click",(e) => {
                    console.log("json: " +image.dataset.info)
                    const data = JSON.parse(image.dataset.info);
                    const imgUrl = image.querySelector("img").src;   
    
                    if(!this.fighters.includes(data.id) && this.enabled ){        
                        const choosenCat = new Cat(data.id,data.name,data.age,data.catInfo,data.record.wins,data.record.loss,imgUrl);                    
                        this.fighters.push(choosenCat.id);                    
                        const parent = image.parentNode.parentNode.parentNode.parentNode; 
                        this._setFighter(choosenCat,parent,this.info,catImages);                    
                        this._disableFighter(choosenCat, parent.parentNode,this.parents);   
                        if(this.fighters.length >= 2 || this.fighted){
                            document.querySelector(this.buttons.fight).disabled = false;
                        }else{
                            document.querySelector(this.buttons.fight).disabled = true;
                        }                                                  
                    }                
                });
            }            
        }        
    }    
    _disableFighter(fighter, parent,parents){   
        const winImg =document.querySelector(POM.parents.first).firstElementChild.querySelector(POM.fighter).querySelector("img");
        const redImg = document.querySelector(POM.parents.second).firstElementChild.querySelector(POM.fighter).querySelector("img");
        winImg.style.border = "";
        redImg.style.border = "";
        var otherSide;            
        for(let key in parents){
            const id = parents[key].substring(1);
            if(id !== parent.id){
                otherSide = document.querySelector(parents[key]);      
                if(id === "firstSide"){
                    this.secondFighter	 = fighter;
                }else
                    this.fisrtFighter   = fighter;          
            }
        }        
        const thisSideCats = this._getCatsFromParent(parent);
        const otherSideCats = this._getCatsFromParent(otherSide);
        
        Array.from(thisSideCats).forEach((cat)=>{
            const id = JSON.parse(cat.dataset.info).id;
            if(id === fighter.id){
                cat.querySelector("img").style.border = "thick solid #000000"
            }else{
                cat.querySelector("img").style.border = ""
            }
        })
        Array.from(otherSideCats).forEach((cat)=>{
            const id = JSON.parse(cat.dataset.info).id;
            if(id === fighter.id){
                cat.querySelector("img").style.opacity = 0.3;
            }else{
                cat.querySelector("img").style.opacity = 1;
            }
        })
    }
    _getCatsFromParent(parent){
        var cats = parent.firstElementChild.lastElementChild.lastElementChild;
        cats = cats.querySelectorAll(POM.image);
        return cats;
    }
    _setFighter(cat, container, info, catImages){        
        const fighterImg = container.querySelector(this.fighterImg).querySelector("img"); 
        fighterImg.src = cat.imgUrl;       
        const infoContainer = container.querySelector(".cat-info");
        const name = infoContainer.querySelector(info.name);
        const age = infoContainer.querySelector(info.age);
        const catInfo = infoContainer.querySelector(info.info);
        const record = infoContainer.querySelector(info.record);
        const wins = record.querySelector(info.wins);
        const loss = record.querySelector(info.loss);

        if(name.textContent !== "Cat Name"){
            const id = this._getCatByName(name.textContent,catImages)
            const removeIndex = this.fighters.indexOf(id);
            this.fighters.splice(removeIndex,1);            
        }        
        name.textContent = cat.name;
        age.textContent = cat.age;
        catInfo.textContent = cat.catInfo;
        wins.textContent = cat.wins;
        loss.textContent = cat.loss;            
    }
    _getCatByName(name,catImages){
        const cats = document.querySelectorAll(catImages);
        for(let key in cats){
            let cat = cats[key];
            const catData = JSON.parse(cat.dataset.info); 
            if(catData.name === name){
                return catData.id;
            }
        }
    }
    _setCatById(catId,parent){
       var cats = this._getCatsFromParent(parent);       
       Array.from(cats).forEach((cat)=>{
            const id = JSON.parse(cat.dataset.info).id;            
            if(id === catId){                
                const imgUrl = cat.querySelector("img").src;  
                const data = JSON.parse(cat.dataset.info);
                const choosenCat = new Cat(data.id,data.name,data.age,data.catInfo,data.record.wins,data.record.loss,imgUrl);
                this.fighters.push(choosenCat.id);                                
                if(this.fighters.length >= 2 || this.fighted){
                    document.querySelector(POM.buttons.fight).disabled = false;
                }else{
                    document.querySelector(POM.buttons.fight).disabled = true;
                }                                                  
                this._disableFighter(choosenCat,parent,POM.parents);
                this._setFighter(choosenCat,parent,POM.infos,POM.image);                
            }
        })
    }       
}
class Cat{
    constructor(id, name, age, catInfo,wins,loss,imgUrl){
        this.id = id;
        this.name = name;
        this.age = age;
        this.catInfo = catInfo;
        this.wins = wins;
        this.loss = loss;
        this.imgUrl = imgUrl;
    }
}
let POM = {
    image : ".fighter-box",
    buttons: {
        fight : "#generateFight",
        randomFighters: "#randomFight",
        addNew: "#addNew",
        edit: ".editBtn"
    },
    fighter: ".featured-cat-fighter",
    infos:{
        name: ".name",
        age : ".age",
        info : ".skills",
        record : ".record",
        wins : ".wins",
        loss : ".loss"
    }, 
    parents:{
        first: "#firstSide",
        second: "#secondSide"
    }   
}

class Counter{
    constructor(time){
        this.duration = time;                
    }
    init(){
        this.counterLabel = document.querySelector("h2");
        this._count();        
    }
    _count(){
        
    }    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const catSelectorObj = new CatSelector(POM.image,POM.fighter,POM.infos,POM.parents,POM.buttons);
catSelectorObj.init();