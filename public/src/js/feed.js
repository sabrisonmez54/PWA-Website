
var pwa = document.querySelector('#pwa')
pwa.addEventListener('click', pwaClick)
var strongarm = document.querySelector('#strongarm')
strongarm.addEventListener('click', strongarmClick)
var numbersense = document.querySelector('#numbersense')
numbersense.addEventListener('click', numbersenseClick)

function pwaClick() {

    window.location.assign("/pwa");
    //openCreatePostModal()
}


function strongarmClick() {

    window.location.assign("/sat");
    //openCreatePostModal()
}

function numbersenseClick() {

    window.location.assign("/numbersense");
    //openCreatePostModal()
}


