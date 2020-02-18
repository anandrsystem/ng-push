angular.module("app", []).controller("PushController", function ($scope) {
  $scope.helloTo = {};
  $scope.helloTo.title = "Anand";

  const publicVapidKey = 'BFWvnvGkPJgb96RkRk2axu9X5vtTA5oIaUBneAAu2Y8MPHRuVeSlK49qDPadlAjY2Nxa_GynjRt7LwuwJNi6Fys';
  // const triggerPush = document.querySelector('.trigger-push');
  // triggerPush.addEventListener('click', () => {
  //   triggerPushNotification().catch(error => console.error(error));
  // });

  $scope.triggerPush = async function () {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      const data = {
        subscription: subscription,
        title: 'Title: Push notifications with Service Workers',
        message: 'Message: Yay it works.',
      }

      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
});
