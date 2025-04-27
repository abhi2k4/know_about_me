module.exports = {
  apps: [{
    name: "email-notifications",
    script: "./server/email-notifications.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "200M",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "./logs/email-notifications-error.log",
    out_file: "./logs/email-notifications-out.log",
    merge_logs: true
  }]
};