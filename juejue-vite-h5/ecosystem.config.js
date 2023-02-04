

// 针对 PM2 配置文件 ecosystem.config.js 文件中，配置属性详细介绍：
//     https://blog.csdn.net/zz00008888/article/details/113738025

// pm2用法详解+ecosystem.config
//     https://www.cnblogs.com/lggggg/p/6970395.html

module.exports = {
  apps: [
    {
      name: 'juejue-vite-h5',
      script: 'juejue-vite-h5-server.js'
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.99.134.126',
      ref: 'origin/master',
      repo: 'git@git.zhlh6.cn:Nick930826/juejue-vite-h5.git',
      path: '/workspace/juejue-vite-h5',
      'post-deploy': 'git reset --hard && git checkout master && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}