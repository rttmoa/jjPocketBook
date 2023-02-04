'use strict';
/** @type Egg.EggPlugin */
module.exports = {
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 7.解决跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};
