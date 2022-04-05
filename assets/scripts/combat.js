let battleWIDTH=310;
let battleHEIGHT=150;
let battleGRID_WIDTH=31; //number of grid cells
let battleGRID_HEIGHT=15;
let battleINV_GRID_WIDTH = 1 / (battleWIDTH / battleGRID_WIDTH);
let battleINV_GRID_HEIGHT = 1 / (battleHEIGHT / battleGRID_HEIGHT);

let battleLEFTSHIPS=200;
let battleRIGHTSHIPS=200;

let battleMAXSPEED = 2;
let battleDEATH_THRESHOLD = 0.5; //used to calculate battles
let battleLEFTCOLOR = "#ffffff"
let battleRIGHTCOLOR = "#000000"
let battleEXPLODECOLOR = "#ffffff"

let ships = [];
let numShips = 0;
let grid = new Array(battleGRID_HEIGHT);
let numLeftShips = 0;
let numRightShips = 0;

let probeCombat = 0;
let probeCombatBaseRate = .15;
let attackSpeed = .2;
let battleSpeed = .2;
let attackSpeedFlag = 0;
let attackSpeedMod = .1;
let battles = [];
let battleID = 0;
let battleName = "foo";
let battleNameFlag = 0;
let maxBattles = 1;
let battleClock = 0;
let battleAlarm = 10;
let outcomeTimer = 150;
let drifterCombat = 1.75;
let warTrigger = 1000000;

let unitSize = 0;
let driftersKilled = 0;
let battleEndDelay = 0;
let battleEndTimer = 100;
let masterBattleClock = 0;

let honorCount = 0;
let threnodyTitle = "Durenstein 1";
let bonusHonor = 0;
let honorReward = 0;



//NON-CANVAS BATTLE LOGIC

function checkForBattles(){
    if (drifterCount>warTrigger && probeCount > 0 && battles.length < maxBattles){
        let r = (Math.random()*100); 
        if (r>=50){
            if (battleFlag === 0){battleFlag = 1}
            createBattle();
        }
    }
}

let battleNames = ["Aboukir", "Abensberg", "Acre", "Alba de Tormes", "la Albuera", "Algeciras Bay", "Amstetten", "Arcis-sur-Aube", "Aspern-Essling", "Jena-Auerstedt", "Arcole", "Austerlitz", "Badajoz", "Bailen", "la Barrosa", "Bassano", "Bautzen", "Berezina", "Bergisel", "Borodino", "Burgos", "Bucaco", "Cadiz", "Caldiero", "Castiglione", "Castlebar", "Champaubert", "Chateau-Thierry", "Copenhagen", "Corunna", "Craonne", "Dego", "Dennewitz", "Dresden", "Durenstein", "Eckmuhl", "Elchingen", "Espinosa de los Monteros", "Eylau", "Cape Finisterre", "Friedland", "Fuentes de Onoro", "Gevora River", "Gerona", "Hamburg", "Haslach-Jungingen", "Heilsberg", "Hohenlinden", "Jena-Auerstedt", "Kaihona", "Kolberg", "Landshut", "Leipzig", "Ligny", "Lodi", "Lubeck", "Lutzen", "Marengo", "Maria", "Medellin", "Medina de Rioseco", "Millesimo", "Mincio River", "Mondovi", "Montebello", "Montenotte", "Montmirail", "Mount Tabor", "The Nile", "Novi", "Ocana", "Cape Ortegal", "Orthez", "Pancorbo", "Piave River", "The Pyramids", "Quatre Bras", "Raab", "Raszyn", "Rivoli", "Rolica", "La Rothiere", "Rovereto", "Saalfeld", "Schongrabern", "Salamanca", "Smolensk", "Somosierra", "Talavera", "Tamames", "Trafalgar", "Trebbia", "Tudela", "Ulm", "Valls", "Valmaseda", "Valutino", "Vauchamps", "Vimeiro", "Vitoria", "Wagram", "Waterloo", "Wavre", "Wertingen", "Zaragoza"];

let battleNumbers = [];

for (let i=0; i<battleNames.length; i++){
    battleNumbers.push(1);
}

function generateBattleName(){
    let x = Math.floor(Math.random()*battleNames.length);
    let name = battleNames[x] + " " + battleNumbers[x];
    battleNumbers[x] = battleNumbers[x] + 1;
    return name
}


/*

function battleWrite(newBattle){
    
    let element = document.getElementById("battleReportsDiv"); 
    let reference = document.getElementById("battleListTop");
    
    let newBattleReport = document.createElement("div");
    newBattleReport.setAttribute("id", "battleReport"+newBattle.id);
    
    let battleNameP = document.createElement("p");
    battleNameP.setAttribute("class", "clean");
    
    if (battleNameFlag === 0){
        battleName = document.createTextNode("Battle "+newBattle.id);

        }
    
    if (battleNameFlag === 1){
        battleName = document.createTextNode(generateBattleName());
        }
    
    battleNameP.appendChild(battleName);
    
    newBattleReport.appendChild(battleNameP);
    
    let battleDetailsP = document.createElement("p");
    battleDetailsP.setAttribute("class", "clean");
    
    let clipsLabelSpan = document.createElement("span");
    clipsLabelSpan.style.fontWeight = "bold";
    
    let clipsLabel = document.createTextNode("Clips: ");
    clipsLabelSpan.appendChild(clipsLabel);
    
    battleDetailsP.appendChild(clipsLabelSpan);
    
    let clipProbeCountSpan = document.createElement("span");
    clipProbeCountSpan.setAttribute("id", "battle"+newBattle.id+"clipCount")
    let clipProbeCount = document.createTextNode(numberCruncher(newBattle.clipProbes));
    clipProbeCountSpan.appendChild(clipProbeCount);
    battleDetailsP.appendChild(clipProbeCountSpan);
    
    let driftersLabelSpan = document.createElement("span");
    driftersLabelSpan.style.fontWeight = "bold";
    
    let driftersLabel = document.createTextNode(" Drifters: ");
    driftersLabelSpan.appendChild(driftersLabel);
    
    battleDetailsP.appendChild(driftersLabelSpan);
    
    let drifterProbeCountSpan = document.createElement("span");
    drifterProbeCountSpan.setAttribute("id", "battle"+newBattle.id+"drifterCount")    
    let drifterProbeCount = document.createTextNode(numberCruncher(newBattle.drifterProbes));
    drifterProbeCountSpan.appendChild(drifterProbeCount);
    battleDetailsP.appendChild(drifterProbeCountSpan);
    
    newBattleReport.appendChild(battleDetailsP);
    
    let territoryP = document.createElement("p");
    territoryP.setAttribute("class", "clean");
    let t = (newBattle.territory/availableMatter);
    let territoryDisplay = document.createTextNode("Territory at stake: "+Math.ceil(t*100)+"% of available matter");
    territoryP.appendChild(territoryDisplay);
    
    newBattleReport.appendChild(territoryP);
   
    let line = document.createElement("hr");
    newBattleReport.appendChild(line);
    
    reference.insertBefore(newBattleReport, reference.childNodes[0]);
        
    }

function updateBattles(){
    
    let combatEffectiveness = probeCombatBaseRate;
    
    if (battleNameFlag === 1) {
        combatEffectiveness = combatEffectiveness*2
    }
    
    if (attackSpeedFlag === 1){
        battleSpeed = attackSpeed * .85;
        if (battleSpeed > .99){
            battleSpeed = .99;
        }
    }
    
    for(let i = 0; i < battles.length; i++){
        r = Math.random();
        if (r>=battleSpeed) {
            let clipCasualties = battles[i].drifterProbes * drifterCombat * (1-battleSpeed);
                if (clipCasualties>battles[i].clipProbes){
                    clipCasualties=battles[i].clipProbes;
                    }
            
            battles[i].clipProbes = battles[i].clipProbes - clipCasualties;
            probeCount = probeCount - clipCasualties;
            probesLostCombat = probesLostCombat + clipCasualties;
            document.getElementById('probesLostCombatDisplay').innerHTML = numberCruncher(probesLostCombat);
            
//            document.getElementById('battle'+battles[i].id+"clipCount").innerHTML = numberCruncher(battles[i].clipProbes);
            
            } else {
            let drifterCasualties = battles[i].clipProbes * Math.pow(probeCombat, 1.7) * combatEffectiveness;
                if (drifterCasualties>battles[i].drifterProbes){
                    drifterCasualties=battles[i].drifterProbes;
                    }
            
                battles[i].drifterProbes = battles[i].drifterProbes - drifterCasualties;
                drifterCount = drifterCount - drifterCasualties;
                
//                document.getElementById('battle'+battles[i].id+"drifterCount").innerHTML = numberCruncher(battles[i].drifterProbes);
            }
        
        if (battles[i].drifterProbes < 1){
            battles[i].victory = true;
        }
    
        if (battles[i].clipProbes < 1 && battles[i].victory === false){
            battles[i].loss = true;
        }

        if (battles[i].loss === true && battles[i].whiteFlag === 0){
            availableMatter = availableMatter - battles[i].territory;
            battles[i].whiteFlag = 1;
        }     
        
        if (battles[i].loss === true){
            
//            document.getElementById("battleReport"+battles[i].id).style.backgroundColor = "LightGrey";
            
            battles[i].reportCount++;
            if (battles[i].reportCount > outcomeTimer){
                battles[i].garbageFlag = 1;
            }
        }
        
        if (battles[i].victory === true){
            battles[i].reportCount++;
            if (battles[i].reportCount > outcomeTimer){
                battles[i].garbageFlag = 1;
            }
        }
    }
}

function battleCleanUp(){
    for(let i = battles.length-1; i >= 0; i--){
        if (battles[i].garbageFlag === 1){
            let element = document.getElementById('battleReport'+battles[i].id);
            element.parentNode.removeChild(element);
            battles.splice(i,1);
        }
    }
    
}



function updateBattleDisplay(battle){
    
    

 let element = document.getElementById("battleListTop"); 
    
    let newBattle = document.createElement("div");
    newBattle.setAttribute("id", battle.id);
    element.appendChild(newBattle, element.firstChild);
    
    let span = document.createElement("span");
    span.setAttribute("class", "clean");    
    span.style.fontWeight = "bold";
    newBattle.appendChild(span);
    
    let hed = document.createTextNode("Combatants");
    span.appendChild(hed);    
    
    let clipsCount = document.createElement("span");
    clipsCount = battle.clipProbes;
    element.appendChild(span);
    
}

*/

//CANVAS BATTLE DISPLAY


function Battle(){
    
  let canvas;
  let context;
  let interval;
  //let sign;
    
  battleRestart();    
	
	this.initialize = function(){
    canvas  = document.getElementById("canvas");

		context = canvas.getContext('2d');
			
		canvas.width = battleWIDTH;
		canvas.height = battleHEIGHT;
        
		interval = setInterval(Update, 16);
        
		battleRestart();
	}

	let Update = function(){
		
        ClearFrame();
        UpdateGrid();
        MoveShips();
        DoCombat();
		
	}
    
function checkForBattleEnd(){
    
    if (battles.length>0){
    
      if (numLeftShips === 0 || numRightShips === 0){
          
          if (project121.flag === 1){
            document.getElementById("victoryDiv").style.visibility = "visible";    
         
          if (numLeftShips === 0){
            if (honorCount === 0){  
            bonusHonor = 0;    
            honor = honor - battleLEFTSHIPS;
            honorCount =  1;   
            }    
            document.getElementById("battleResult").innerHTML = "DEFEAT";
            document.getElementById("battleResultSign").innerHTML = "-";
            document.getElementById("honorAmount").innerHTML = battleLEFTSHIPS; 
            document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();
            threnodyTitle = battleName;
            }
              
          if (numRightShips === 0){
            if (honorCount === 0){  
            honorReward = battleRIGHTSHIPS + bonusHonor;     
            document.getElementById("honorAmount").innerHTML = honorReward;
            honor = honor + honorReward;    
                
                if (project134.flag === 1){    
                bonusHonor = bonusHonor + 10;
                }      
                
            honorCount =  1;  
            } 
              
            document.getElementById("battleResult").innerHTML = "VICTORY";
            document.getElementById("battleResultSign").innerHTML = "+";
            document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();  
              
            }              
        
          }      
          
          battleEndDelay++;

        } else if (numLeftShips <= 4 || numRightShips <= 4) { 
          battleClock = battleClock + 1;    
            if (battleClock>2000){
                endBattle();
            }
        }       
        
        if (battleEndDelay >= battleEndTimer){
          endBattle();
        }
        
        masterBattleClock++;
        if (masterBattleClock >= 8000){
            endBattle();
        }
        
      }    
}    
  
function endBattle(){
    document.getElementById("victoryDiv").style.visibility = "hidden";
    honorCount = 0;
    battleClock = 0;
    masterBattleClock = 0;
    battleEndDelay = 0;
    battles.splice(0,1);    
}    
    
function battleRestart(){
    
    numLeftShips = 0;
    numRightShips = 0;
    numShips=0;	
    ships = [];
    grid = new Array(battleGRID_HEIGHT);
      
    //reset the grid
      
    let row, col;
		for (row = 0; row < battleGRID_HEIGHT; row++)
		{
      grid[row]= [];
			for (col = 0; col < battleGRID_WIDTH; col++)
			{
		    grid[row][col]= new Cell();
			}	
		}    
    
    
    //create ships... alternate left team and right team so there's no advantage
    //for array position
      
    let leftShipTurn = false;
    let i=0;
    while ((numLeftShips<battleLEFTSHIPS)||(numRightShips<battleRIGHTSHIPS)){
      if (leftShipTurn){
        ships[i] = new Ship(0);
        numLeftShips++;
        numShips++;
        if (numRightShips < battleRIGHTSHIPS) leftShipTurn = false;
      }
      else{
        ships[i] = new Ship(1);
        numRightShips++;
        numShips++;
        if (numLeftShips < battleLEFTSHIPS) leftShipTurn = true;
      }
      i++;
    }  
}        
    
  
  let UpdateGrid = function(){
    
    //First clear grid out
      
    let p;
		let row,col;
		for (row = 0; row < battleGRID_HEIGHT; row++){
			for (col = 0; col < battleGRID_WIDTH; col++){
				grid[row][col].ships.length=0;
				grid[row][col].numShips = 0;
			}	
		}
		
    //Update Grid cells with ships in each cell
      
		for (let i = 0; i < numShips; i++){

			p = ships[i];
			if (!ships[i].alive) continue;
			
      //figure out which grid cell the ship is in
            
			p.gx = Math.floor(p.x * battleINV_GRID_WIDTH);
			p.gy = Math.floor(p.y * battleINV_GRID_HEIGHT);
			
			if (p.gx < 0){
				p.gx = 0;
			}
			if (p.gy < 0){
				p.gy = 0;
			}
			if (p.gx > battleGRID_WIDTH - 1){
				p.gx = battleGRID_WIDTH - 1;	
			}
			if (p.gy > battleGRID_HEIGHT - 1){
				p.gy = battleGRID_HEIGHT - 1;
			}

      grid[p.gy][p.gx].add(p); //add ship to this grid cell
		}
  }
	

  let DoCombat = function(){
      
    let pX = probeCombat * probeCombatBaseRate; 
      
//        if (battleNameFlag === 1){
//        pX = pX*2;
//        }
      
    let dX = drifterCombat;
      
    let p;
    let row,col,i;
    let numLeftTeam, numRightTeam;
    let diceRoll;
    let ooda = 0;
      
      if (attackSpeedFlag === 1){
          ooda = probeSpeed * .2;
      }

		for (row = 0; row < battleGRID_HEIGHT; row++){
            
			for (col = 0; col < battleGRID_WIDTH; col++){
                
        //First Check if there are enough ships in this cell to do combat
                
  		if (grid[row][col].numShips < 2) continue;
                
        numLeftTeam=0;
        numRightTeam=0;
                
        //Now count how many ships for each team in this cell;
                
        for (i=0;i<grid[row][col].numShips;i++){
          p = grid[row][col].ships[i];
          if (!p.alive) continue;
          if (p.team === 0) numLeftTeam++;
          else numRightTeam++;
        }
                
        if ((numLeftTeam === 0)||(numRightTeam===0)) continue;
        
        //now we have at least one ship of each team in this cell. 
        //roll a weighted die to see if each ship gets killed
                
        for (i=0;i<grid[row][col].numShips;i++){
          p = grid[row][col].ships[i];
          if (p.team === 0) {
              diceRoll = Math.random() * dX * ((numRightTeam/numLeftTeam)*.5);
              battleDEATH_THRESHOLD = battleDEATH_THRESHOLD + ooda;
              // console.log("Probe Death Check. dX = "+dX+". diceRoll = "+diceRoll+". deathThreshold = "+battleDEATH_THRESHOLD);
              }
          else {
              diceRoll = ((Math.random() * pX) + (probeCombat * .1)) * ((numLeftTeam/numRightTeam)*.5);
              // console.log("Drifter Death Check. pX = "+pX+". diceRoll = "+diceRoll+". deathThreshold = "+battleDEATH_THRESHOLD);
              }
          if (diceRoll > battleDEATH_THRESHOLD) {
            p.alive = false;
            if (p.team===0) {
                numLeftShips--;
                if (unitSize>probeCount){unitSize=probeCount;}
                probeCount = probeCount - unitSize;
                probesLostCombat = probesLostCombat + unitSize;
                document.getElementById('probesLostCombatDisplay').innerHTML = numberCruncher(probesLostCombat);
                } else {
                numRightShips--;
                if (unitSize>drifterCount){unitSize=drifterCount;}
                drifterCount = drifterCount - unitSize;
                driftersKilled = driftersKilled + unitSize;  
                document.getElementById('driftersKilled').innerHTML = numberCruncher(driftersKilled);
                document.getElementById('drifterCount').innerHTML = numberCruncher(drifterCount);
            }
          }
            
        battleDEATH_THRESHOLD = .5;  
            
        }
			}	
		}
      
        checkForBattleEnd();
      
  }
  
	let MoveShips = function(){

        let i, p;
        let centroid = FindCentroid(); 
		
		for (i = 0; i < numShips; i++){    
			p = ships[i];
			if (!p.alive) {
        if (p.framesDead<10){
        //draw explosion
        context.fillStyle=battleEXPLODECOLOR;
        if (p.framesDead<1){
          context.fillRect(p.x -3, p.y -3,7,7); //big square for one frame
        }
        else if (p.framesDead<2){
          context.fillRect(p.x -1, p.y -1,3,3); //little square for 1 frame
        }
        //4 little pixel squares moving out from the point of explosion
        context.fillRect(p.x + p.framesDead, p.y + p.framesDead,1,1);
        context.fillRect(p.x - p.framesDead, p.y + p.framesDead,1,1);
        context.fillRect(p.x + p.framesDead, p.y - p.framesDead,1,1);
        context.fillRect(p.x - p.framesDead, p.y - p.framesDead,1,1);
        p.framesDead++;
        }
			}    
			else {
        MoveSingleShip(p,centroid);
        context.fillStyle = p.color;  
        context.fillRect(p.x - 1, p.y - 1, 2, 2);  	
			}
      
      
		}			
    
	}
	
  let FindCentroid=function(){
      
    //find the statistical center of all the ships
      
    let i;
    let centroid = { x: 0, y: 0};
    let shipsAlive = 0;
      
    for (i = 0; i < numShips; i++){    
      if (!ships[i].alive) continue;
      centroid.x += ships[i].x;
      centroid.y += ships[i].y;
      shipsAlive++;
    }
      
    centroid.x /= shipsAlive;
    centroid.y /= shipsAlive;
    
    //give some tendency to center, so they bunch in the middle
    centroid.x = (centroid.x * 0.8) + (battleWIDTH/2 * 0.2);
    centroid.y = (centroid.y * 0.8) + (battleHEIGHT/2 * 0.2);
    return centroid;
  }
	
	let MoveSingleShip = function(p, centroid){
    
		//accelerate to group centroid
    p.vx += (centroid.x-p.x)*0.001;
    p.vy += (centroid.y-p.y)*0.001;
    
    //accelerate to enemy ships in adjacent grid cells
    let row,col,i;
    let othership;
    let teammatesConsidered=0;
    for (row=Math.max(p.gy-1,0); row<Math.min(p.gy+2,battleGRID_HEIGHT);row++){
      for(col=Math.max(p.gx-1,0);col<Math.min(p.gx+2,battleGRID_WIDTH);col++){
        if (grid[row][col].ships.length<2) continue;
        for (i=0;i<grid[row][col].ships.length; i++){
          othership = grid[row][col].ships[i];
          if (!othership.alive) continue; //ignore dead ships
          if (othership.team === p.team) { 
            teammatesConsidered++;

            if (teammatesConsidered>3) continue;//don't fixate on teammates

            //mild acceleration to match teammates
            p.vx += othership.vx * 0.01;
            p.vy += othership.vy * 0.01;
            
            //mild acceleration to get space from teammates
            p.vx -= (othership.x - p.x) * .1;
            p.vy -= (othership.y - p.y) * .1;
          }
          else {
            p.vx += othership.vx * 0.2;
            p.vy += othership.vy * 0.2;
            p.vx += (othership.x - p.x) *0.2; // acceleration toward enemies
            p.vy += (othership.y - p.y) * 0.2;
          }
        }
      }
    }

    //limit speed to max
    if (Math.abs(p.vx) > battleMAXSPEED) p.vx = p.vx < 0 ? -battleMAXSPEED : battleMAXSPEED;
    if (Math.abs(p.vy) > battleMAXSPEED) p.vy = p.vy < 0 ? -battleMAXSPEED : battleMAXSPEED;
    
    //move the ship
    /*p.vx += Math.random() * .1;
    p.vx += Math.random() * .1;
    p.vx -= Math.random() * .1;
    p.vx -= Math.random() * .1;*/
        
		p.x += p.vx;
		p.y += p.vy;
		
    //bounce off edges
    if (p.x > battleWIDTH) {
      p.x = battleWIDTH;
      p.vx = -battleMAXSPEED;
    }
    else if (p.x < 0){
      p.x = 0;
      p.vx = battleMAXSPEED;
    }
    if (p.y > battleHEIGHT) {
      p.y = battleHEIGHT;
      p.vy = -battleMAXSPEED;
    }
    else if (p.y < 0){
      p.y = 0;
      p.vy = battleMAXSPEED;
    }		
	}
	
	//Clear the screen, 
//	let MouseDown = function(e) {
//		e.preventDefault();
//		battleRestart();
//	}
	
	let ClearFrame = function(){
        let tempWidth = canvas.width
		canvas.width = tempWidth
        
//        let ctx = canvas.getContext("2d");
//        ctx.font = "16px Times";
//        ctx.fillStyle="white";
//        ctx.fillText("Combat",10,20);

        
	}
}

//Grid cells for quicker grouping
function Cell(){
	this.ships = [];
	this.numShips = 0;
	this.add = function(ship){
		this.ships[this.numShips++] = ship;
	}
}

function Ship(team){
	
	this.alive = true;
	this.color = null;
	this.team = team;
  this.framesDead = 0;
   //grid cell coord - we'll set this later
	this.gx = 0;
	this.gy = 0;
  
	switch(team){
		
		case 0:
      this.x = (Math.random()*0.2) * battleWIDTH;
      this.y = Math.random() * battleHEIGHT;
      this.vx = Math.random() * battleMAXSPEED;
      this.vy = Math.random()-0.5;
			this.color = battleLEFTCOLOR;
			break;
		case 1:
      this.x = (Math.random()*0.2+0.8) * battleWIDTH;
      this.y = Math.random() * battleHEIGHT;
      this.vx = -1* Math.random() * battleMAXSPEED;
      this.vy =Math.random()-0.5;
			this.color = battleRIGHTCOLOR;
			break;
	}

}

function createBattle(){
    
    unitSize = 0;
    
    if (drifterCount>=probeCount) {
        unitSize = probeCount/100;
    } else {
        unitSize = drifterCount/100;
    }
    
    if (unitSize<1) {unitSize=1}
    document.getElementById('battleScale').innerHTML = numberCruncher(unitSize,0);
    
        
    let rr = Math.random()*drifterCount;
    if (rr<1){rr=1}
    let ss = Math.random()*probeCount;
    if (ss<1){ss=1}
    let tt = Math.random()*availableMatter;
    
        battleID++;
    
        let newBattle = {
        id: battleID,
        clipProbes: ss,
        drifterProbes: rr,
        victory: false,
        loss: false,
        whiteFlag: 0,
        territory: tt,  
        reportCount: 0,   
        garbageFlag: 0,
        }
    
    battleLEFTSHIPS = Math.ceil(ss / 1000000);
    if (battleLEFTSHIPS>200){
        battleLEFTSHIPS=200;
    } if (battleLEFTSHIPS === 200){
        let hinder = Math.random();
        if (hinder < .50) {
            battleLEFTSHIPS = Math.ceil(Math.random()*175);
        }
    }
    
    battleRIGHTSHIPS = Math.ceil(rr / 1000000);
    if (battleRIGHTSHIPS>200){
        battleRIGHTSHIPS=200;
    }
        
    new Battle();
    
    battleName = ("Drifter Attack "+newBattle.id);
    
        if (battleNameFlag === 1){
        battleName = generateBattleName();
        }
    
    document.getElementById('battleName').innerHTML = battleName;
    
    battles.push(newBattle);
    
//  battleWrite(newBattle);
    
    }

let app = new Battle();
app.initialize();
    

