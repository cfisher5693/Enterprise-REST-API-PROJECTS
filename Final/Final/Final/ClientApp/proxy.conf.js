const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:20582';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Item",
      "/api/Login",
   ],
    target: target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
