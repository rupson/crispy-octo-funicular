const unleash = require('unleash-server');

const unleashOptions = {
  db: {
    user: 'unleash_user',
    password: 'passord',
    host: 'localhost',
    port: 5432,
    database: 'unleash',
    ssl: false,
  },
  enableRequestLogger: true,
};

unleash.start(unleashOptions);