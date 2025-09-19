const withPWA = require('next-pwa')({
  dest: 'public', // where the service worker will go
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  productionBrowserSourceMaps: true,

  images: {
    domains: [
      "storage.googleapis.com",
      "example.com",
      "api.dicebear.com",
      "res.cloudinary.com",
      "randomuser.me",
      "https://api.dicebear.com",
      "via.placeholder.com",
      "images.unsplash.com",
      "images.unsplash.com",
    ],
  },
});
