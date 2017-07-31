(function(){
	'use strict';
	angular
		.module('eCommerce')
		.controller('HomeController', HomeController);

		HomeController.$inject = ['$http', '$rootScope']

		function HomeController($http, $rootScope){
			var homeCtrl = this;
			homeCtrl.signIn = true;
			homeCtrl.dashboard = false;
			homeCtrl.singInTwitter = singInTwitter
			homeCtrl.profileData = {};
			homeCtrl.profileDataArray = [];
			homeCtrl.display = false;
			
			function singInTwitter() {
				$http.get('/twitter/token')
				.then(function(response){
					
					getProfileData();
				}).catch(function(error) {
					console.log(error);
				});
			}

			function getProfileData() {
				$http.get('/twitter/profile')
				.then(function(response){
					homeCtrl.profileData = response.data.data;
					homeCtrl.signIn = false;
					homeCtrl.dashboard = true;
					homeCtrl.display = true;
					getRandomUsersData();
				}).catch(function(error) {
					console.log(error);
				});
			}

			function getRandomUsersData() {
				$http.get('/follower/list')
				.then(function(response){
					homeCtrl.display = false;
					homeCtrl.profileDataArray = response.data.data;
					console.log(response.data.data);
				}).catch(function(error) {
					console.log(error);
				});
			}

		};
})();