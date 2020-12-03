define(function (require) {
  var
  tmpl = require('text!./tmpl.html'),
  common = require('common'),
  Component = require('component'),
  store = require('./store'),
  $ = require('jquery');

  var $view = $(tmpl),
  $root = $('body'),
  $name = $view.find('#name'),
  $commit = $view.find('#commit');
  $dispatch = $view.find('#dispatch');

  var viewInstance = new Component({
    element: $view,
    store: store,
    render: function () {
      // render는 store.commit() 시 변경을 감지하고 실행된다.
      $name.html(store.state.info.name);
    },
  });
  
  $dispatch.on('click', function () {
    store.dispatch('setName', 'dispatch Name!');
  });

  $commit.on('click', function () {
    store.commit('setName', 'commit Name!');
  });

  viewInstance.render(); // paint전 element 세팅
  $root.append($view); // 실제 paint!
  return viewInstance; // component로 사용하는 경우 viewinstance 리턴
});