var deferredPrompt;
let newWorker;

function showUpdateBar() {
  let snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
}

// The click event on the pop up notification
document.getElementById("reload").addEventListener("click", function () {
  newWorker.postMessage({ action: "skipWaiting" });
  location.reload(true);
});

if ("serviceWorker" in navigator) {
  console.log("registering sw")
  navigator.serviceWorker.register("/sw.js").then((reg) => {
    reg.addEventListener("updatefound", () => {
      // A wild service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener("statechange", () => {
        // Has network.state changed?
        switch (newWorker.state) {
          case "installed":
            if (navigator.serviceWorker.controller) {
              // new update available
              console.log("update available");
              showUpdateBar();
            }
            // No update available
            console.log("no update available");
            break;
        }
      });
    });
  });

  let refreshing;
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}
if (!window.Promise) {
  window.Promise = Promise;
}

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js")
//     .then(function () {
//       console.log("Service worker registered!");
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

window.addEventListener("beforeinstallprompt", function (event) {
  console.log("beforeinstallprompt fired");
  event.preventDefault();
  deferredPrompt = event;
  //return false;
});
