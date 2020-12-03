# Morpheus MPA Template (with requirejs)

모피어스 MPA 템플릿으로 require.js(AMD)를 사용하였습니다.
## description
pub/sub 패턴을 통한 컴포넌트 단위 개발
비어있는 body 상태로 시작하여 data를 set한 후 paint 되도록 코드를 작성해야한다.
불필요한 렌더링을 최소화하기 위함.
``` js
var $root = $('body');
var $div = $('<div></div>');
$div.html('값을 전달한 후!');
$root.append($div);
```

www/js/app/views : html파일 기준으로 하나의 html과 대응되는 폴더
 - controller.js: view 컨트롤러
 - tmpl.html : body 태그내에 삽입될 html 소스파일
 - store.js: component 내 관리될 상태(state)

tmpl.html
``` html
<div>
  <button id="commit">commit</button>
  <button id="dispatch">dispatch</button>
  <h1 id="name"></h1>
</div>
```

controller.js
```js
define(function (require) {
  var
  tmpl = require('text!./tmpl.html'),
  common = require('common'),
  Component = require('component'),
  store = require('./store'),
  $ = require('jquery');

  var $view = $(tmpl), // template을 dom 객체로 생성
  $root = $('body'), 
  $name = $view.find('#name'), // template 내 객체를 캐시
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
```

store.js
``` js
define(function(require) {
  var Store = require('store');
  return new Store({
    state: {
      info: {
        name: 'default', // 기본값을 세팅
      },
    },
    mutations: {
      setName: function (state, payload) {
        state.info.name = payload; //state에 설정
        return state; // return 하여도 되고 안하여도 됨
      },
    },
    actions: {
      setName: function (context, payload) {
        return new Promise(function (resolve, reject) { // return 하여도 되고 안해도 됨
          setTimeout(function () { // api통신을 가정
            context.commit('setName', payload); // 결과값을 mutaions에게 넘김
            resolve(payload);
          }, 1000);
        });
      },
    },
  });
});
```


### tips
css 파일 로드
``` js
var common = require('common');
common.loadCss('css파일 경로');
```

다른 컴포넌트 접근하기
``` js
var anotherComp = require('@comp/another/controller');
anotherComp.element; // 해당 컴포넌트 element
anotherComp.store // 해당 컴포넌트 store로 commit, dispatch를 통해 제어한다
anotherComp.render // render를 통해 element를 세팅한다.
```

부분적 SPA로 사용 시
``` js
// detach를 통해 엘리먼트를 제거해야 event bind가 풀리지 않는다.
// 캐시된 element는 사라지지 않는다.
$('body').detach('.components');
```


lazyload처럼 사용하기
``` js
// something.. 첫번째 페이지를 로드하여 paint까지 마친 후
require(['2component', '3component'], function () {
    // 컴포넌트 별 화면전환 이벤트 바인딩
})
```

Activity 생명주기별 특정 이벤트
``` js
requirejs(['../config'], function (config) {
  requirejs(['mcore','wnif','promise','proxy','component','pubsub','store'], function () {
    requirejs(['views/base/controller'], function (base) {
        M.onStore(function () {
        // onStore시 데이터 새로고침이 필요한경우!
            base.store.dispatch('action');
        });
    });
  });
});
```