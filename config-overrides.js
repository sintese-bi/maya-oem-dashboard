const { override } = require('customize-cra');

module.exports = override((config, env) => {
  // Adicione a sua configuração do Webpack aqui
  if (env === 'development') {
    config.resolve.fallback = { fs: false };
  }

  return config;
});