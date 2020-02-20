self.addEventListener('push', function (event) {
  var data = event.data.json();
  var title = data.title;
  var options = {
    body: data.message,
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    actions: [
      {
        action: 'view-action',
        title: 'View',
        // icon: '/images/viewIcon.png'
      },
      {
        action: 'dismiss-action',
        title: 'Dismiss',
        // icon: '/images/dismissIcon.png'
      }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  switch (event.action) {
    case 'view-action':
      console.log('view-action clicked');
      var path = event.target.location.host;
      var promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      })
        .then((windowClients) => {
          var matchingClient = null;
          for (var i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            if (windowClient.url.indexOf(path)) {
              matchingClient = windowClient;
              break;
            }
          }

          if (matchingClient) {
            return matchingClient.focus();
          } else {
            return clients.openWindow(path);
          }
        });
      event.waitUntil(promiseChain);
      break;
    case 'dismiss-action':
      console.log('dismiss-action clicked');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});
