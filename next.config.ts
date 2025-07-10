const withPWA = require('next-pwa')({
  dest: 'public', // where the service worker will go
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  
    images:{
      domains:["storage.googleapis.com","api.dicebear.com","res.cloudinary.com","randomuser.me",'via.placeholder.com']
    }
})
