var installButton = document.querySelector("#install");
var enableNotificationsButtons = document.querySelectorAll(
  ".enable-notifications"
);
var captureButton = document.querySelector("#capture-btn");
var videoPlayer = document.querySelector("#player");
var canvasElement = document.querySelector("#canvas");
var captureButton = document.querySelector("#capture-btn");
var closeButton = document.querySelector("#close-btn");
let swRegistration = null;
installButton.addEventListener("click", installButtonClickHandler);

function installButtonClickHandler() {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
      }
    });

    deferredPrompt = null;
  }
}


function askForNotificationPermission() {
  Notification.requestPermission(function (result) {
    // console.log("User Choice", result);
    if (result !== "granted") {
      console.log("No notification permission granted!");
    } else {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'I am the notification that you triggered!!',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Hi There', options);
      });
    }
  });
}

if ("Notification" in window) {
  for (var i = 0; i < enableNotificationsButtons.length; i++) {
    enableNotificationsButtons[i].style.display = "inline-block";
    enableNotificationsButtons[i].addEventListener(
      "click",
      askForNotificationPermission
    );
  }
}

//image
function initializeMedia() {
  if (!("mediaDevices" in navigator)) {
    navigator.mediaDevices = {};
  }

  if (!("getUserMedia" in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      var getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error("getUserMedia is not implemented!"));
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = "block";
    })
    .catch(function (err) {
      // imagePickerArea.style.display = "block";
    });
}

captureButton.addEventListener("click", function (event) {
  // returns true if any tracks have active state of true
  closeButton.style.display = "block";
  initializeMedia();

  //   canvasElement.style.display = "block";
  //   videoPlayer.style.display = "none";
  //   captureButton.style.display = "none";
  //   var context = canvasElement.getContext("2d");
  //   context.drawImage(
  //     videoPlayer,
  //     0,
  //     0,
  //     canvas.width,
  //     videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width)
  //   );
  //   videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
  //     track.stop();
  //   });
});
window.addEventListener("load", (event) => {
  closeButton.style.display = "none";
  closeButton.style.display = "none";
  canvasElement.style.display = "none";
  videoPlayer.style.display = "none";
});
closeButton.addEventListener("click", function (event) {
  closeButton.style.display = "none";
  canvasElement.style.display = "none";
  videoPlayer.style.display = "none";

  //   var context = canvasElement.getContext("2d");
  //   context.drawImage(
  //     videoPlayer,
  //     0,
  //     0,
  //     canvas.width,
  //     videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width)
  //   );
  videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
    track.stop();
  });
});
