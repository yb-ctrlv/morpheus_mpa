requirejs(['../config'], function (config) {
  requirejs(['mcore','wnif','promise','proxy','component','pubsub','store'], function () {
    requirejs(['views/base/controller']);
  });
});