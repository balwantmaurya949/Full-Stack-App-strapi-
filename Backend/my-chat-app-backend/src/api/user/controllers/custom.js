// ./api/user/controllers/custom.js

module.exports = {
  async getMe(ctx) {
    try {
      // Here, you can implement logic to fetch user data
      // For example, fetching the currently logged-in user's info
      const user = ctx.state.user; // Get the authenticated user
      ctx.send(user);
    } catch (err) {
      ctx.send({ error: 'Failed to retrieve user information' }, 500);
    }
  },
};
