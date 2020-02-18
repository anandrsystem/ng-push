self.addEventListener('push', function(event) {
    // console.log('[Service Worker] Push Received.');
    // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const data = event.data.json();
    const title = data.title;
    const message = data.message;
    const options = {
      body: message,
      icon: 'images/icon.png',
      badge: 'images/badge.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });