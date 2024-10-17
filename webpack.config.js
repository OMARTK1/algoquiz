const path = require('path');

module.exports = {
  // Other Webpack configuration...
  devServer: {
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware logic, if any
      middlewares.unshift((req, res, next) => {
        // Custom before middleware
        next();
      });

      middlewares.push((req, res, next) => {
        // Custom after middleware
        next();
      });

      return middlewares;
    },
  },
};
