var players = [];
var teamlist = [];

var visited = localStorage.getItem('visited');
var max = 5;


//if the site has not been visited show the welcome screen
if(visited != 'True'){
    unhideWelcome()
}

var teamcount = 0;

/*sets a localstorage variable so the welcome screen will not be shown on the next visit or on refresh*/ 
function handleActionClick(){
    localStorage.setItem('visited', 'True');
    hideWelcome();
    unhideHome();
    removeWelcome();
}

/*unhides the welcome screen*/
function unhideWelcome(){
    var bg = document.getElementsByClassName('bg');
    var welcometext = document.getElementsByClassName('welcome-text');
    var welcome = document.getElementsByClassName('welcome');
    welcome[0].classList.remove('hidden');
    bg[0].classList.remove('hidden');
    welcometext[0].classList.remove('hidden');

}

/*shows the home screen*/
function unhideHome(){
    var home = document.getElementsByClassName('home');
    home[0].classList.remove('hidden');
}

/*hides the welcome screen*/
function hideWelcome(){
    var bg = document.getElementsByClassName('bg');
    var welcometext = document.getElementsByClassName('welcome-text');
    welcometext[0].classList.add('hidden');
    bg[0].classList.add('hidden');
}

/*removes the welcome from the dom*/
function removeWelcome(){
    var welcome = document.getElementsByClassName('welcome');
    welcome[0].parentNode.removeChild(welcome[0]);
}

var open = false;
function openMenu(e){

    if(!open){
        e.target.src='/images/x.svg';
        open = true;
    } else{
        e.target.src='/images/Group 7.svg';
        open = false;
    }
    document.getElementById('menu').classList.toggle('slide');
}



var skill = document.getElementById('skill_list');
var rates = skill.getElementsByTagName('IMG');
/*event listener for changing the current chosen rating for new player*/
for (var i = 0; i < rates.length; i++) {
    rates[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
        this.className += "active";
    });
}

var submitArrow = document.getElementById('submitArrow');

function checkEmpty(event){

    if (document.getElementById('player_name').value.length != 0){
        submitArrow.classList.remove('clear');
        if (event.keyCode === 13){
            addPlayer();
        }
    }else{
        submitArrow.classList.add('clear');
    }
}



var playername = document.getElementById('player_name');

/*adds a player object and markup if the input is not null*/
function addPlayer(){
    var player = {name: '', skill: 0 }
    if (playername.value.length != 0){
        player["name"] = playername.value;

        for (var i = 0; i < rates.length; i++) {
            if (rates[i].className === 'active'){
                player["skill"] = i+1;
            }
        }

        var playerDiv = document.getElementsByClassName('players');
        var newDiv = document.createElement("div");
        var nametextnode = document.createTextNode(player["name"]); 
        var skillHolder = document.createElement("h3");
        var skilltextnode = document.createTextNode(player["skill"]);
    
    
        newDiv.appendChild(nametextnode);
        skillHolder.appendChild(skilltextnode);
        newDiv.appendChild(skillHolder);
        playerDiv[0].appendChild(newDiv);
        newDiv.classList.add('playerstyle');
    
    }
    players.push(player);
    playername.value = '';
    submitArrow.classList.add('clear');

}


var numteam = document.getElementById('teamcount');

/*adds a team to the list of teams*/
function addTeam(){

    if (teamcount< 10){
        teamcount += 1;

        var team = {number: teamcount, total: 0, players:[]};
        teamlist.push(team);

        var teamsDiv = document.getElementsByClassName('teams');
        var teamDiv = document.createElement("div");
        var teamNum = document.createElement('h3');
        var totalRank = document.createElement('h3');
        var playerContain = document.createElement('div');

        teamNum.innerHTML = "Team " + teamcount;
        totalRank.innerHTML = 0;

        teamDiv.addEventListener("click", toggle, false);
   

        teamDiv.classList.add('teamstyle', 'min');
        teamNum.classList.add('teamnum');
        totalRank.classList.add('total');
        playerContain.classList.add('teamplayers');

        teamDiv.appendChild(teamNum);
        teamDiv.appendChild(totalRank);
        teamDiv.appendChild(playerContain);

        teamsDiv[0].appendChild(teamDiv);

        if(teamcount >= max){
            var teamsList = document.getElementsByClassName('teamstyle');

            for (i=0; i< teamsList.length; i++){
                console.log(teamsList[i]);
                teamsList[i].classList.add('min');
            }
        }



    }

    numteam.innerHTML = teamcount.toString();


}

/*sutract a team from the display and list*/
function subtractTeam(){
    var teams = document.getElementsByClassName('teamstyle');

    if (teamcount> 0){
        teamcount -= 1;

        var lastteam = teams[teamcount];
        lastteam.outerHTML = "";
        teamlist.pop();
    }

    numteam.innerHTML = teamcount.toString();
}

/*toggles the teams to minify and maximize them in the display*/
function toggle(e){

    var teams = document.getElementsByClassName('teamstyle');
    if(screen.width < 1400){
        max = 3;
    }

    if(screen.width < 1000){
        max = 1;
    }

    for (i= 0; i<teams.length; i++) {
        if (!teams[i].classList.contains('min') && teams.length > max){
                teams[i].classList.add('min');
        }
    }

    if(e.target.classList.contains('teamstyle')){
        e.target.classList.toggle('min');
    }
}

function makeTeams(){
    /*Clear created teams if they exist */
    for(i=0;i<teamlist.length;i++){
        teamlist[i].players = [];
        teamlist[i].total = 0;
    }


    /*Make sure the number of teams is less than or equal to the number of players*/
    while (players.length < teamcount){
        subtractTeam();
    }

    /*Sort players list from highest to lowest rank*/
    var sorted = players;
    sorted.sort(function(a,b){
        return a.skill - b.skill;
    });

    console.log(sorted);

    /*Place players in teams */
    let j = 0;
    for (i=0;i<sorted.length; i++){
        teamlist[j].players.push(sorted[i]);
        teamlist[j].total += sorted[i].skill;

        if(j < teamlist.length - 1 ){
            j+=1;
        }else{
            j=0;
        }
    }

    /*clears the already displayed teams*/
    var tp = document.getElementsByClassName('teamplayers');
    for(i=0; i<tp.length; i++){
    
        while(tp[i].firstChild){
            tp[i].removeChild(tp[i].firstChild);
        }
    }


    var  listTeams = document.getElementsByClassName('teamstyle');
    var teamtotals = document.getElementsByClassName('total');

    /*create markup for players and add them into team div*/
    for (i=0; i< teamlist.length; i++){

        var target = listTeams[i].getElementsByClassName('teamplayers');
        teamtotals[i].innerHTML = teamlist[i].total;

        for(j=0; j < teamlist[i].players.length; j++){
        var newDiv = document.createElement("div");
        var nametextnode = document.createTextNode(teamlist[i].players[j].name); 
        var skillHolder = document.createElement("h3");
        var skilltextnode = document.createTextNode(teamlist[i].players[j].skill);
    
    
        newDiv.appendChild(nametextnode);
        skillHolder.appendChild(skilltextnode);
        newDiv.appendChild(skillHolder);
        newDiv.classList.add('playerstyle');
        target[0].appendChild(newDiv);
        }
    }

}

var selected = false;
function menuselect(e){
    var menuitems = document.getElementsByClassName('menuitem');
    var menucontent = document.getElementsByClassName('menucontent');
    var clicked = e.target;

    if(selected == false){
        //if none currently selected, hide all menuitems besides clicked and unhide menucontent with same i 
        for(i=0; i< menuitems.length; i++){
                if(menuitems[i] != clicked){
                    menuitems[i].classList.add('hidden');
                } else{
                    menucontent[i].classList.remove('hidden');
                    menuitems[i].classList.add('center');

                }
        }
        selected = true;
    }else{
        for(i=0; i< menuitems.length; i++){
            menuitems[i].classList.remove('hidden');
            menucontent[i].classList.add('hidden');
            menuitems[i].classList.remove('center');
        }
        selected = false;
    }

}
/*
function balanceTeams(){
    sortedteamlist = teamlist;

    sortedteamlist.sort(function(a,b){
        return a.total - b.total;
    });

    for(i= 0; i< sortedteamlist.length; i++){
        
        if(i > sortedteamlist.length && sortedteamlist[i].total > sortedteamlist[i])
    }
}*/