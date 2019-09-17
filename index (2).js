var doorObj = [ // represents the physical doors
    {
        open: false,
        car: false,
        picked: false,
    },
    {
        open: false,
        car: false,
        picked: false,
    },
    {
        open: false,
        car: false,
        picked: false,
    }
]; 

var playersGuess = { //records the players guess defined by playersGuess()
        guess: 0, // guess in player terms
        guessN: 0,// gues in array math aka guess -1
		firstGuess: false,
		secondChance: false, 
}

var scorekeeper = {
        wins: 'Wins ',
		winsN: 0, 
		losses: "| Losses ",
        lossesN: 0,
		winPerc: "| Win Percentage: ",
		winPercN: 0,
		total:"% of ",
		totalN: 0,
}

var gameOn = {
	turnGameOn: false, 
}

function logme(i){// logs for testing
	console.log(doorObj[i].picked);
	console.log(playersGuess.guess);
	console.log(playersGuess.guessN);
	console.log(doorObj[0].car);
	console.log(doorObj[1].car);
	console.log(doorObj[2].car);
	console.log(doorObj[0].open);
	console.log(doorObj[1].open);
	console.log(doorObj[2].open);
	console.log(doorObj[0].picked);
	console.log(doorObj[1].picked);
	console.log(doorObj[2].picked);
}

function doorPick(pick){// edits dom to diplay picked door
	pick.style.bordercolor = 'red';
	pick.childNodes[1].textContent = "You selected this door. " +"\n"+ "Select again to keep your answer.";
}

function doorHint(hint){// edits dom to diplay an open hinted door
	if(hint === 0){
		doorDom[0].style.bordercolor = 'red';
		doorDom[0].childNodes[1].textContent = "Hint:" + "\n" + "This door has goat!" + "\n" + "Do not pick this door!";
	}else if(hint === 1){
		doorDom[1].style.bordercolor = 'red';
		doorDom[1].childNodes[1].textContent = "Hint:" + "\n" + "This door has goat!" + "\n" + "Do not pick this door!";
	}else if(hint === 2){
		doorDom[2].style.bordercolor = 'red';
		doorDom[2].childNodes[1].textContent = "Hint:" + "\n" + "This door has goat!" + "\n" + "Do not pick this door!";
	}else console.log ('fuck'); 
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playersGuessdoor(guess){// edits the playersGuess object to assign the Guess
	playersGuess.guess = guess; 
    playersGuess.guessN = guess - 1;
    doorObj[playersGuess.guessN].picked = true;
    return;
}

function calculateScore(win){
	if(win ===  true){
		scorekeeper.winsN += 1;
	}else{
		scorekeeper.lossesN += 1;
	}
	scorekeeper.totalN += 1; 
	scorekeeper.winPercN = (Math.round((scorekeeper.winsN / scorekeeper.totalN) * 1000))/10; 
	displayScore();
}

function displayScore(){
	scoreCard[0].textContent = scorekeeper.wins + scorekeeper.winsN; 
	scoreCard[1].textContent = scorekeeper.losses + scorekeeper.lossesN; 
	scoreCard[2].textContent = scorekeeper.winPerc + scorekeeper.winPercN; 
	scoreCard[3].textContent = scorekeeper.total + scorekeeper.totalN + " Games|"; 
}

function revealAllDoors(){
	for(i = 0; i< 3; i ++){
		if (doorObj[i].car === true){
			doorDom[i].childNodes[1].textContent = "CAR!!!";
		}
		else if (doorObj[i].car === false){
			doorDom[i].childNodes[1].textContent = "GOAT"; 
		}
		console.log (doorDom[i].textContent + " " + doorObj[i].car); 
	}
}

function resetPicks(){
	for (i= 0; i< 3; i++){
		doorObj[i].picked = false;
	}
}

function resetAll(){
	console.log ('reset all called');
	for (i= 0; i< 3; i++){
		doorObj[i].picked = false;
		doorObj[i].open = false;
		doorObj[i].car = false;
		doorDom[i].childNodes[1].textContent = "Click to Open";
	}
	/*doorDom[0].childNodes[1].textContent = "Click to Open";
	doorDom[1].childNodes[1].textContent = "Click to Open";
	doorDom[2].childNodes[1].textContent = "Click to Open";*/
	playersGuess.firstGuess = false; 
	startGame(); 
}

function findblankdoor(){ //finds an unpicked door with no car and opens it
    var open = false; 
    while (open === false){
        var doorRemove = getRandomInt(0,2);
        if (doorObj[doorRemove].car === false && doorObj[doorRemove].picked === false){
            doorObj[doorRemove].open = true; 
            open = true; 
        }
    }
    return doorRemove;
}

function round2 (){ // intiates events once the player makes firt guess
	alert('You picked door number '+ playersGuess.guess + '! '+ "\n" +'You can keep your answer or guess again.'); 
	var opendoor = findblankdoor();
	doorHint(opendoor); 
}

function finalPrize(picked){
	if (doorObj[picked].car === true){
		alert ("You won the grand prize!!"+ "\n" +"A BRAND NEW CAR!!"); 
		calculateScore(true); 
	}else {
		alert ("Loser!!! "+ "\n" +"Get your Goat"); 
		calculateScore(false);
	}
	revealAllDoors(); 
	gameOn.turnGameOn = false; 
	for (i=0; i< 3; i++){
		console.log('door ' + i + " "+ doorObj[i].open + " "+ doorObj[i].car +" "+ doorObj[i].picked); 
	}
}

function clickHandler(n, doorN){
	if(gameOn.turnGameOn === true) {
		a = n-1; // when using array values 
		if (playersGuess.firstGuess === false ){
			playersGuessdoor(n);
			doorPick(doorN); 
			playersGuess.firstGuess = true; 
			logme(a); 
			round2();
		} else if (playersGuess.firstGuess === true && doorObj[a].open === false){
			resetPicks()
			playersGuessdoor(n);
			doorPick(doorN); // pick new door
			finalPrize(a);//award prize
		}else if (playersGuess.firstGuess === true && doorObj[a].open === true){
			alert('Why would you pick that door?' + "\n" + 'Do you want a goat?'+ "\n" +'Pick Again.' )
		}
	}
	
}

function startGame(){
	console.log("startGame called");
	alert("This is the Monty Hall game!" + "\n" + "Behind One of these doors is a brand new car." +"\n" + "Behind the other two are goats! Choose wisely.");
	var n = getRandomInt(0,2);
	doorObj[n].car = true;
}

var doorDom = [
document.getElementById('door 1'), 
document.getElementById('door 2'), 
document.getElementById('door 3')]; 

var playButton  = document.getElementById('play'); 

doorDom[0].addEventListener('click', ()=>{ 
	clickHandler(1,doorDom[0]); 
}); 
doorDom[1].addEventListener('click', ()=>{ 
	clickHandler(2,doorDom[1]); 
}); 
doorDom[2].addEventListener('click', ()=>{ 
	clickHandler(3,doorDom[2]); 
});

playButton.addEventListener('click', () => {
	gameOn.turnGameOn = true;
	resetAll(); 
	playButton.textContent = "Play Again"; 
}); 

var scoreCard = document.querySelectorAll('p');

