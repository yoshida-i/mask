angular.module('app.controllers', [])


  .controller('detailCtrl', function ($scope) {

  })


  .controller('feedbackCtrl', function ($scope) {
    $scope.active = 'happy';
    $scope.setActive = function (type) {
      $scope.active = type;
    };
    $scope.isActive = function (type) {
      return type === $scope.active;
    };

    $scope.save = function (feedback) {
      alert("debug: " + feedback.content + ":" + $scope.active);
    }
  })


  .controller('timeLineCtrl', function ($scope, $ionicLoading, $timeout, $ionicPopover, locationService, parseService) {


    $scope.$on('$ionicView.enter', function () {
      $timeout(function () {
        footerBar = document.body.querySelector('#TimeLineView .bar-footer');
        scroller = document.body.querySelector('#TimeLineView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);
    }, 20000);

    var footerBar;
    var scroller;
    $scope.location = '読込中';

    // on location of the device change
    $scope.$on('locationChange', function () {
      $scope.location = locationService.getLocationName();
    });

    $scope.debug = function(){
      locationService.debug();
    };

    // 書き込みボタンをおした時に呼ばれる関数
    // 必要な情報を集めてParseにPutする
    $scope.sendMessage = function (sendMessageForm) {
      parseService.savePost($scope.input.message);
    };

    $scope.datas = [
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {
        "id": "84kakvdi",
        "body": "理科大内で大・ケイドロ大会開催中！！！参加希望者はコメント下さい！！",
        "time": "10分",
        "comments": [{"id": "84kakvdi", "body": "僕も参加したいです！次参加できるタイミングはいつですか？", "time": "6分"}, {
          "id": "75hvbfio",
          "body": "イスタンブール人も参加できる？",
          "time": "2分"
        }, {"id": "84kakvdi", "body": "参加したい方はルノアール前30分でよろしくっす！", "time": "1分"}]
      },
      {
        "id": "ir93slksd",
        "body": "むこの授業が暇すぎる。どうしたものか。出席者で暇な人、咳してくれい",
        "time": "15分",
        "comments": [{"id": "543kaaa", "body": "誰や、咳じゃなくてオナラしたやつ！！！", "time": "12分"}, {
          "id": "jk4ml4a",
          "body": "やめて、お茶ふいた",
          "time": "10分"
        }, {"id": "ir93slksd", "body": "ゆいちゃんペロペロ", "time": "1分"}]
      },
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []},
      {"id": "9osg4lias", "body": "あと３時間でアルバイトおおおお、めんどくさいいいいいああああ", time: "1分", "comments": []}
    ];

    // 画面を引っ張った時の更新の関数
    $scope.doRefresh = function () {
      $ionicLoading.show({
        template: 'Loading entries...'
      });
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    };

    // ===========================
    // 下部テキストエリアの
    // ===========================

    $scope.$on('taResize', function (e, ta) {
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
    }).then(function (popover) {
      $scope.popover = popover;
    });
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
      // Execute action
    });

  });
