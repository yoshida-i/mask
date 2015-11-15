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
    var footerBar;
    var scroller;
    var txtInput;

    $scope.$on('$ionicView.enter', function () {
      $timeout(function () {
        footerBar = document.body.querySelector('#TimeLineView .bar-footer');
        scroller = document.body.querySelector('#TimeLineView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);
    }, 20000);

    $scope.location = '読込中';

    // on location of the device change
    $scope.$on('locationChange', function () {
      console.log('fire: locationChange');
      $scope.location = locationService.getLocationName();
    });

    $scope.debug = function () {
      parseService.getPost();
    };

    // 書き込みボタンをおした時に呼ばれる関数
    // 必要な情報を集めてParseにPutする
    $scope.sendMessage = function (sendMessageForm) {
      parseService.savePost($scope.input.message);
    };

    $scope.datas = [];

    // 画面を引っ張った時の更新の関数

    function getPost() {
      $ionicLoading.show({
        template: '読込中'
      });
      parseService.getPost()
        .then(function(results){
          console.log(JSON.stringify(results));
          $scope.datas = results;
        }, function(error){
          console.error(error);
          alert("投稿の取得に失敗しました");
          alert(JSON.stringify(error));
        });
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    };

    $scope.doRefresh = function () {
      getPost();
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
