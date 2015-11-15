angular.module('app.services', [])

  .factory('authService', [function () {

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function getUserId() {
      if (window.localStorage) {
        if (!window.localStorage.getItem('userid')) {
          window.localStorage.setItem('userid', guid());
        }
        return window.localStorage.getItem('userid');
      }
    }

    function getPasword() {
      if (window.localStorage) {
        if (!window.localStorage.getItem('userpassword')) {
          window.localStorage.setItem('userpassword', guid());
        }
        return window.localStorage.getItem('userpassword');
      }
    }

    function signupToParse(userid, userpassword) {
      var user = new Parse.User();
      user.set("username", userid);
      user.set("password", userpassword);

      user.signUp(null, {
        success: function (user) {
          console.log('debug: 初回ログイン、ユーザー作ったよ');
        },
        error: function (user, error) {
          // Show the error message somewhere and let the user try again.
          console.log("Error: " + error.code + " " + error.message);
        }
      });
    }

    function loginToParse(userid, password) {
      Parse.User.logIn(userid, password, {
        success: function (user) {
          console.log('debug: 再ログイン、ログインしたよ');
          console.log('success');
        },
        error: function (user, error) {
          console.log("Error: " + error.code + " " + error.message);
        }
      });
    }

    function isUserExist(userid) {
      var query = new Parse.Query(Parse.User);
      query.equalTo("username", userid);
      return query.find({
        success: function (result) {
          if (result.length === 0) {
            return false;
          } else {
            return true;
          }
        },
        error: function (error) {
          console.log("Error:" + error.code + " " + error.message);
        }
      });
    }

    return {
      login: function () {
        // window.localStorage.clear();
        var userid = getUserId();
        var userpassword = getPasword();
        console.log("UserId: " + userid);
        isUserExist(userid).then(function (result) {
          if (result.length !== 0) {
            loginToParse(getUserId(), getPasword());
          } else {
            signupToParse(userid, userpassword);
          }
        });
      }
    };
  }])


  .factory('locationService', ['$q', '$rootScope', function ($q, $rootScope) {

    var locationName = '読込中';
    var position;
    var posOptions = {timeout: 5000, enableHighAccuracy: false, maximumAge: 60000};
    var id;

    function getCurrentLatLng() {
      var deferred = $q.defer();
      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, posOptions);
      return deferred.promise;
    }

    function startWatchLocation(){
      id = navigator.geolocation.watchPosition( successWatchLocation , errorWatchLocation , posOptions);
      console.log(id);
    }

    function successWatchLocation(position){
      this.position = position;
      getLocation(position)
      .then(function(results){
        locationName = getLocationString(results[0].address_components);
        console.log(locationName);
        $rootScope.$broadcast('locationChange', position);
      });
    }

    function errorWatchLocation(err){
      console.error(err);
    }

    function getLocation(position) {
      var deferred = $q.defer();
      var latlng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': latlng}, deferred.resolve);
      return deferred.promise;
    }

    // Googleから取得した現在地をいい感じに加工する
    function getLocationString(address) {
      var locality = address.filter(function (item, index) {
        if (item.types.indexOf('locality') >= 0) return true;
      })[0].short_name;

      var sublocality = address.filter(function (item, index) {
        if (item.types.indexOf('sublocality_level_1') >= 0) return true;
      })[0].short_name;

      return locality + sublocality + " 付近";
    }

    return {
      getCurrentLocation: function () {
        return $q.when(getCurrentLatLng())
          .then(getLocation);
      },

      getCurrentLatLng: function () {
        return getCurrentLatLng();
      },

      getLocationName: function () {
        return locationName;
      },

      debug: function () {
        //$q.when(getCurrentLatLng())
        //  .then(getLocation)
        //  .then(function (results) {
        //    locationName = getLocationString(results[0].address_components);
        //  });
        startWatchLocation();
      }

    };
  }])


  .factory('parseService', ['locationService', '$ionicLoading', function (locationService, $ionicLoading) {

    // 書き込み時日付とUserのオブジェクトIDから表示IDを作る
    // サービスに移す
    function getMaskId() {
      var currentUser = Parse.User.current();
      var d = new Date();

      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();

      var seed = currentUser.id + year.toString() + month.toString() + day.toString();
      var shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(seed);
      var hash = shaObj.getHash("HEX");
      return hash.slice(-7);
    }

    return {
      savePost: function (content) {
        $ionicLoading.show({
          template: '送信中'
        });
        locationService.getCurrentLatLng()
          .then(function (position) {
            var point = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
            var currentUser = Parse.User.current();
            var Post = Parse.Object.extend("Post");
            var post = new Post();
            post.set("maskid", getMaskId());
            post.set("content", content);
            post.set("location", point);
            post.set("user", currentUser);
            post.save()
              .then(function (savedpost) {
                console.log(JSON.stringify(savedpost));
                $ionicLoading.hide();
              });
          });
      }
    };
  }]);
