
var visited = localStorage.getItem('visited');

if(visited != 'True'){
    unhideWelcome()
}

function handleActionClick(){
    localStorage.setItem('visited', 'True');
    hideWelcome();
    unhideHome();
    removeWelcome();
}

function unhideWelcome(){
    var bg = document.getElementsByClassName('bg');
    var welcometext = document.getElementsByClassName('welcome-text');
    var welcome = document.getElementsByClassName('welcome');
    welcome[0].classList.remove('hidden');
    bg[0].classList.remove('hidden');
    welcometext[0].classList.remove('hidden');

}

function unhideHome(){
    var home = document.getElementsByClassName('home');
    home[0].classList.remove('hidden');
}


function hideWelcome(){
    var bg = document.getElementsByClassName('bg');
    var welcometext = document.getElementsByClassName('welcome-text');
    welcometext[0].classList.add('hidden');
    bg[0].classList.add('hidden');
}

function removeWelcome(){
    var welcome = document.getElementsByClassName('welcome');
    welcome[0].parentNode.removeChild(welcome[0]);
}


var skill = document.getElementById('skill_list');
var rates = skill.getElementsByTagName('IMG');

for (var i = 0; i < rates.length; i++) {
    rates[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
        this.className += "active";
    });
}

function checkEmpty(){
    var submitArrow = document.getElementById('submitArrow');

    if (document.getElementById('player_name').value.length != 0){
        submitArrow.classList.remove('clear');
    }else{
        submitArrow.classList.add('clear');
    }
}
