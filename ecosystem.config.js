module.exports = {
  apps: [
    {
      name: 'planet-iris-site',
      script: '/var/www/planet-iris-website/dist/server/server.mjs',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
        // Remplacer par les vrais domaines du site (séparés par des virgules)
        ALLOWED_HOSTS: 'www.planet-iris.com,planet-iris.com',
        GOOGLE_API_KEY: 'REMPLACER_PAR_LA_VRAIE_CLE',
        DEEPL_API_KEY: 'REMPLACER_PAR_LA_VRAIE_CLE',
      },
      out_file: '/var/log/pm2/planet-iris-site.out.log',
      error_file: '/var/log/pm2/planet-iris-site.error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
