// src/api/health/controllers/health.js

module.exports = {
  async check(ctx) {
    ctx.send({ status: 'UP' });
  },
};
