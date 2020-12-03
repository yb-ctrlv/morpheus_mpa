define(function (require) {
  return {
    httpSend: function httpSend(options) {
      var callback = options.callback || function () {};
      var errorCallback = options.errorCallback || function () {};
      M.net.http.send({
        server: CONSTANT.SERVER_NAME,
        path: options.path,
        timeout: options.timeout || 15000,
        data: sendData,
        indicator: {
          show: false,
        },
        success: function (data, setting) {
          callback(data);
        },
        error: function (code, msg, setting) {
          errorCallback(code, msg);
        }
      })
    },
  }
});