module.exports = {
  apps: [
    {
      name: "mi-app-next",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      watch: false,
      max_memory_restart: "500M",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ]
};
