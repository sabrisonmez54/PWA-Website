
var pwa = document.querySelector('#pwa')
pwa.addEventListener('click', pwaClick)
var strongarm = document.querySelector('#strongarm')
strongarm.addEventListener('click', strongarmClick)

function pwaClick() {

    window.location.assign("/pwa");
    //openCreatePostModal()
}


function strongarmClick() {

    window.location.assign("/sat");
    //openCreatePostModal()
}


