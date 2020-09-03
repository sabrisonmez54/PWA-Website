var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');
var card = document.querySelector('#card1')

function openCreatePostModal() {
    createPostArea.style.display = 'block';
    // if (deferredPrompt) {
    //     deferredPrompt.prompt();

    //     deferredPrompt.userChoice.then(function (choiceResult) {
    //         console.log(choiceResult.outcome);

    //         if (choiceResult.outcome === 'dismissed') {
    //             console.log('User cancelled installation');
    //         } else {
    //             console.log('User added to home screen');
    //         }
    //     });

    //     deferredPrompt = null;
    // }
}

function closeCreatePostModal() {
    createPostArea.style.display = 'none';
}


function cardclickHandler() {

    window.location.replace("/pwa");
    //openCreatePostModal()
}

card1.addEventListener('click', cardclickHandler)
shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

function createCard() {
    // var cardWrapper = document.createElement('div');
    // cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
    // var cardTitle = document.createElement('div');
    //  cardTitle.className = 'mdl-card__title';
    //  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
    // cardTitle.style.backgroundSize = 'cover';
    // cardTitle.style.height = '180px';
    // cardWrapper.appendChild(cardTitle);
    // var cardTitleTextElement = document.createElement('h2');
    // cardTitleTextElement.style.color = 'white';
    // cardTitleTextElement.className = 'mdl-card__title-text';
    // cardTitleTextElement.textContent = 'San Francisco Trip';
    // cardTitle.appendChild(cardTitleTextElement);
    // var cardSupportingText = document.createElement('div');
    // cardSupportingText.className = 'mdl-card__supporting-text';
    // cardSupportingText.textContent = 'In San Francisco';
    // cardSupportingText.style.textAlign = 'center';
    // cardWrapper.appendChild(cardSupportingText);
    // componentHandler.upgradeElement(cardWrapper);
    // sharedMomentsArea.appendChild(cardWrapper);


    // var cardWrapper = document.createElement('div');
    // cardWrapper.className = 'w-path-card';
    // var cardInfo = document.createElement('div');
    // cardInfo.className = 'w-path-card__info';
    // cardWrapper.appendChild(cardInfo);
    // var cardInfoList = document.createElement('ul');
    // cardInfoList.className = 'w-path-card_info-list';
    // cardInfo.appendChild(cardInfoList);
    // var cardInfoListItem = document.createElement('li');
    // cardInfoListItem.className = 'w-path-card__info-listitem w-path-card__info-listitem--category';
    // cardInfoListItem.textContent = 'category';
    // cardInfoList.appendChild(cardInfoListItem);
    // var cardCover = document.createElement('div');
    // cardCover.className = 'w-path-card__cover-image';
    // cardCover.backgroundImage = 'url("/src/images/sf-boat.jpg")';
    // cardCover.style.backgroundSize = 'cover';
    // cardCover.style.height = '180px';
    // cardWrapper.appendChild(cardCover);


    // //cardWrapper.appendChild(cardSupportingText);
    // componentHandler.upgradeElement(cardWrapper);
    //sharedMomentsArea.appendChild(cardWrapper);

}

