// /root/project/OwnerAI/ecosystem.config.js
module.exports = {
  apps: [{
    name: 'OwnerAI',
    script: './output/index.mjs',
    cwd: '/root/project/OwnerAI/',
    node_args: '--env-file=../.env',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: '/root/.pm2/logs/OwnerAI-error.log',
    out_file: '/root/.pm2/logs/OwnerAI-out.log',
    combine_logs: true
  }]
};