const authentificationRoutes = require('./routes/authentificationroutes');

describe('App', () => {
  it('should import authentificationRoutes successfully', () => {
    expect(authentificationRoutes).toBeDefined();
  });
});