
function handleActionClick(){
    slideTriangles();
    hideWelcome();
}

function slideTriangles(){
    var welcome = document.getElementsByClassName('welcome');
    welcome[0].classList.add('open');
}

function hideWelcome(){
    var bg = document.getElementsByClassName('bg');
    var welcometext = document.getElementsByClassName('welcome-text');
    welcometext[0].classList.add('hidden');
    bg[0].classList.add('hidden');

}

