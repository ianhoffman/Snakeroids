const commonConfig = {
  entry: './entry.js',
  output: {
    filename: './bundle.js',
  }
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    }
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
};