module.exports = {
  apps: [{
    name: "email-notifications",
    script: "server/email-notifications.js",
    cwd: "D:/Downloads/know_about_me/",
    watch: false,
    max_memory_restart: "300M",
    env: {
      NODE_ENV: "production",
      EMAIL_USER: "thormothe.abhishek@gmail.com",
    },
    error_file: "./logs/email-error.log",
    out_file: "./logs/email-out.log"
  }]
};