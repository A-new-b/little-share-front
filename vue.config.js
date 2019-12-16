module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: false,
  devServer: {
    // development server port 8000
    port: 8083,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        ws: true,
        secure: false,
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
};
