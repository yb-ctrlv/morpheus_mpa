define(function(require) {
  var Store = require('store');
  return new Store({
    state: {
      info: {
        name: 'default',
      },
    },
    mutations: {
      setName: function (state, payload) {
        state.info.name = payload;
        return state;
      },
    },
    actions: {
      setName: function (context, payload) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            context.commit('setName', payload);
            resolve(payload);
          }, 1000);
        });
      },
    },
  });
});
