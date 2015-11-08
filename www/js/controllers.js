angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

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

.controller('timeLineCtrl', function($scope,$ionicLoading,$timeout,$ionicPopover) {

  var footerBar;
  var scroller;

  var currentUser = Parse.User.current();

  function getMaskId(){
    var hiduke=new Date();

    var year = hiduke.getFullYear();
    var month = hiduke.getMonth()+1;
    var day = hiduke.getDate();

    var seed = currentUser.id + year.toString() + month.toString() + day.toString();
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(seed);
    var hash = shaObj.getHash("HEX");
    return hash.slice(-7);
  }

  $scope.sendMessage = function(sendMessageForm) {
    var message = {
      id: getMaskId(),
      text: $scope.input.message
    };
    alert(getMaskId());

  }

  $scope.$on('$ionicView.enter', function() {

      $timeout(function() {
        footerBar = document.body.querySelector('#TimeLineView .bar-footer');
        scroller = document.body.querySelector('#TimeLineView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);
  }, 20000);

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
  $scope.doRefresh = function() {
    $ionicLoading.show({
                template: 'Loading entries...'
            });
    $scope.$broadcast('scroll.refreshComplete');
    $ionicLoading.hide();
  };

  $scope.$on('taResize', function(e, ta) {
      if (!ta) return;

      var taHeight = ta[0].offsetHeight;

      if (!footerBar) return;

      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px';
    });

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