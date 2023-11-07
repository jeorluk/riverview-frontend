// module.exports = {
//     images: {
//       domains: ['cdn.sanity.io'],
//     },
//   }

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
