const { Client } = require('pg');
const c = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
(async () => {
  try {
    await c.connect();
    console.log('Conectado OK');
  } catch (e) {
    console.error('Error conexión:', e.message);
  } finally {
    await c.end();
  }
})();
