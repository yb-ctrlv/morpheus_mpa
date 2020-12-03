requirejs.config({
  baseUrl: '/res/www/js/lib',
  paths: {
      mcore: 'core/mcore.min',
      wnif: 'core/wnInterface',
      proxy: 'polyfill/proxy.min',
      promise: 'polyfill/promise.min',
      store: 'store/store',
      component: 'component',
      pubsub: 'store/pubsub',
      text: 'text',
      jquery: 'jquery-3.5.1.min',
      app: '../app',
      common: '../common',
      views: '../app/views',
      MAPI: '../MAPI',
  }
});