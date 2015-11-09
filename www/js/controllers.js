angular.module('app.controllers', [])


.controller('detailCtrl', function($scope) {

})





.controller('feedbackCtrl', function($scope) {
  $scope.active = 'happy';
  $scope.setActive = function(type) {
      $scope.active = type;
  };
  $scope.isActive = function(type) {
      return type === $scope.active;
  };

  $scope.save = function(feedback){
    alert("debug: " + feedback.content + ":" + $scope.active);
  }
})





.controller('timeLineCtrl', function($scope,$ionicLoading,$timeout,$ionicPopover, locationService) {

  $scope.$on('$ionicView.enter', function() {
      $timeout(function() {
        footerBar = document.body.querySelector('#TimeLineView .bar-footer');
        scroller = document.body.querySelector('#TimeLineView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);
  }, 20000);

  var footerBar;
  var scroller;

  // 現在地更新
  $scope.location = '読込中';
  locationService.getCurrentLocation()
    .then(function(results){
      $scope.location = getLocationString(results[0].address_components);
  });


  // 書き込み時日付とUserのオブジェクトIDから表示IDを作る
  // サービスに移す
  function getMaskId(){
    var currentUser = Parse.User.current();
    var d = new Date();

    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();

    var seed = currentUser.id + year.toString() + month.toString() + day.toString();
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(seed);
    var hash = shaObj.getHash("HEX");
    return hash.slice(-7);
  }

  // Googleから取得した現在地をいい感じに加工する
  // サービスに移す
  function getLocationString(address) {
    var locality = address.filter(function(item,index){
      if (item.types.indexOf('locality') >= 0) return true;
    })[0].short_name;

    var sublocality = address.filter(function(item,index){
      if (item.types.indexOf('sublocality_level_1') >= 0) return true;
    })[0].short_name;

    return locality + sublocality + " 付近"
  }

  // 書き込みボタンをおした時に呼ばれる関数
  // 必要な情報を集めてParseにPutする
  $scope.sendMessage = function(sendMessageForm) {
    $ionicLoading.show({
      template: '送信中'
    });
    locationService.getCurrentLatLng()
    .then(function(position){
      var point = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
      var message = {
        "id": getMaskId(),
        "body": $scope.input.message,
        "location": point
      };
      console.log(JSON.stringify(message));
      $ionicLoading.hide();
    });
  }

  $scope.datas = [
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "84kakvdi", "body": "理科大内で大・ケイドロ大会開催中！！！参加希望者はコメント下さい！！", "time": "10分", "comments": [{ "id": "84kakvdi", "body": "僕も参加したいです！次参加できるタイミングはいつですか？", "time": "6分" }, { "id": "75hvbfio", "body": "イスタンブール人も参加できる？", "time": "2分" }, { "id": "84kakvdi", "body": "参加したい方はルノアール前30分でよろしくっす！", "time": "1分" }] },
        { "id": "ir93slksd", "body": "むこの授業が暇すぎる。どうしたものか。出席者で暇な人、咳してくれい", "time": "15分", "comments": [{ "id": "543kaaa", "body": "誰や、咳じゃなくてオナラしたやつ！！！", "time": "12分" }, { "id": "jk4ml4a", "body": "やめて、お茶ふいた", "time": "10分" }, { "id": "ir93slksd", "body": "ゆいちゃんペロペロ", "time": "1分" }] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] },
        { "id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments":[] }
    ];

  // 画面を引っ張った時の更新の関数
  $scope.doRefresh = function() {
    $ionicLoading.show({
                template: 'Loading entries...'
            });
    $scope.$broadcast('scroll.refreshComplete');
    $ionicLoading.hide();
  };

  // ===========================
  // 下部テキストエリアの
  // ===========================

  $scope.$on('taResize', function(e, ta) {
      if (!ta) return;

      var taHeight = ta[0].offsetHeight;

      if (!footerBar) return;

      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px';
    });

  // ===========================
  // popover関係
  // ===========================
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})