(function () {
	'use strict';
	angular.module('ab-util', ['dsConfiguration', 'dsSecurity', 'ui.router']);
	angular.module('ab-util')
	.factory('utils', ['$anchorScroll', '$filter', '$q', '$rootScope', '$state', '$window', '$http', '$timeout', '$uibModal', 'auth', 'configuration', utils])
	;
	/** @ngInject */
	function utils($anchorScroll, $filter, $q, $rootScope, $state, $window, $http, $timeout, $uibModal, auth, configuration) {
		var exported = {
			accessProp: accessProp,
			checkToken: checkToken,
			exit: exit,
			openModalError: openModalError,
			openToastError: openToastError,
			showHideElement: showHideControllerElement,
			logout: logout,
			notImplemented: notImplemented,
			goBack: goBack,
			checkSession: checkSession,
			fakeBase: 'http://localhost:5000/json/',
			
			expandAll: expandAll,
			collapseAll: collapseAll,

			toNumber: toNumber,
			openToast: openToast
		};

		$rootScope.notImplemented = notImplemented;

		//Debug
		configuration.all().then(function(env) {
          exported.isMock = env.isMock;
        });

		return exported;


		function openToastError(/*message*/){
    		/*$mdToast.show(
    			$mdToast.simple()
    					.textContent(message)
						//.content(message)
						.action('OK')
        				//.hideDelay(12000)
        				.hideDelay(5000)
        				.position('top center')
        	);*/
		}

		function accessProp(obj, path) {
			var arrayData, props;

			path = path || "";
			props = path.split(".");

			while (props.length && obj) {
				var comp = props.shift();
				var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);
				if ((match !== null) && (match.length == 3)) {
					arrayData = {arrName: match[1], arrIndex: match[2]};
					if (obj[arrayData.arrName] !== undefined) {
						obj = obj[arrayData.arrName][arrayData.arrIndex];
					} else {
						obj = undefined;
					}
				} else {
					obj = obj[comp];
				}
			}

			return obj;
		}

		function checkToken() {
			var launched = false;
			setInterval(function () {
				var secToken = sessionStorage.getItem("dsToken");
				var theMoment = new Date().getTime();
				var objMoment = JSON.parse(secToken);
				var tokenMoment = objMoment ? objMoment.localExpireTime : '';
				if (!secToken && !launched || secToken === null && !launched) {
					sessionStorage.clear();
					var noTokenParams = {};
					noTokenParams = {
						message: 'TOKEN_EXPIRED',
						title: 'MOD_ALERT',
						showCancelBtn: false,
						animation: false,
						backdrop: false,
						keyboard: false,
						cancelIsOk: false,
						windowTopClass: 'lost-token-modal'
					};
					_openModalToken(noTokenParams).then(function () {});
					launched = true;
					return launched;
				} else if (theMoment > tokenMoment && !launched) {
					sessionStorage.clear();
					var noTokenParams2 = {};
					noTokenParams2 = {
						message: 'TOKEN_EXPIRED',
						title: 'MOD_ALERT',
						showCancelBtn: false,
						animation: false,
						backdrop: false,
						keyboard: false,
						cancelIsOk: false,
						windowTopClass: 'lost-token-modal'
					};
					_openModalToken(noTokenParams2).then(function () {});
					launched = true;
					return launched;
				}
			}, 10000);
		}

		function exit() {
			$state.go('main.home');
		}
		/**
		 * @description
		 * Checks if current user has the needed cookie. If not, it links him to loginUrl.
		 */
		function checkSession(){
			if(!$window.sessionStorage.getItem("dsToken")){
				configuration.all().then(function(env){
				$window.location.replace(env.security.auth.loginUrl);
				});
			}
		}
		
		function openModalError(body) {
			$uibModal.open({
				size: 'md',
				animation: false,
				backdrop: true,
				templateUrl: 'src/app/components/ab-modal/ab-modal.html',
				component: 'abModal',
				controllerAs: 'abm',
				bindToController: true,
				scope: $rootScope,
				resolve: {
					list: function () {
						return body.list;
					},
					message: function () {
						return body.message;
					},
					title: function () {
						return body.title;
					},
					data: function () {
						return body.data;
					},
					closeBtn: function(){
						return body.closeBtn;
					},
					cancelBtn: function () {
						return body.showCancelBtn;
					},
					acceptMsg: function () {
						return body.acceptMsg;
					},
					cancelMsg: function () {
						return body.cancelMsg;
					},
					cancelIsOk: function () {
						return body.cancelIsOk;
					}
				}
			});
		}

		function _openModalToken(/*body*/) {

			//var msg = typeof body === 'string' ? body : body.message;
			//var animation = body.animation === false ? false : true;
			//var backdrop = body.backdrop === false ? false : true;
			//var keyboard = body.keyboard === false ? false : true;
			//var windowTopClass = $state.current.step === 0 ? 'lost-token-modal-login' : body.windowTopClass;
			var deferred = $q.defer();

			//HEADER ZINDEX FIX FOR STILL BEING VISIBLE
			var reHeader = $state.current.step === 0 ? document.querySelector(".ofi-header") : document.querySelector(".ofi-header");
			reHeader.style.zIndex = $state.current.step === 0 ? "1100" : '';

			/*$mdUtil.open({
				component: 'ofiModal',
				size: body.size || 'md',
				animation: animation,
				backdrop: backdrop,
				keyboard: keyboard,
				windowTopClass: windowTopClass,
				resolve: {
					message: function () {
						return msg;
					},
					title: function () {
						return body.title;
					},
					innerTemplate: function () {
						return body.innerTemplate;
					},
					templateUrl: function () {
						return body.templateUrl;
					},
					data: function () {
						return body.data;
					},
					cancelBtn: function () {
						return body.showCancelBtn;
					},
					acceptMsg: function () {
						return body.acceptMsg;
					},
					cancelMsg: function () {
						return body.cancelMsg;
					},
					cancelIsOk: function () {
						return body.cancelIsOk;
					}
				}
			}).result.then(function () {
				return deferred.resolve();
			});*/

			return deferred.promise;
		}

		
		function showHideControllerElement(Ctrl){
			/**
			 * @description
			 * Shows/Hides something.
			 * @param {string} element 
			 * @param {boolean} force 
			 */
			function showHideElement(element, force){
				if(force !== undefined && force === Ctrl[element]) return false;
				Ctrl[element] = !Ctrl[element];
				//Sometimes we want to show/hide another element if we have show/hide one.
				switch(element){
					case "chartSectionShown":
						Ctrl.listSectionShown = !Ctrl.listSectionShown;
						break;
					case "listSectionShown":
						Ctrl.chartSectionShown = !Ctrl.chartSectionShown;
						break;
					case "clientEmailShown":
						if(Ctrl.clientTelfShown) Ctrl.clientTelfShown = false;
						if(Ctrl.clientAddressShown) Ctrl.clientAddressShown = false;
						break;
					case "clientTelfShown":
						if(Ctrl.clientEmailShown) Ctrl.clientEmailShown = false;
						if(Ctrl.clientTelfShown) Ctrl.clientAddressShown = false;
						break;
					case "clientAddressShown":
						if(Ctrl.clientEmailShown) Ctrl.clientEmailShown = false;
						if(Ctrl.clientTelfShown) Ctrl.clientTelfShown = false;
						break;
				}
			}
			return showHideElement;
		}

		/*
         * @description
         * Go to the previous state
        */
        function goBack(){
            $window.history.back();
		}

		/**
         * @description
         * Shows a Toast message
         */
        function notImplemented(){
			/*$mdToast.show(
				$mdToast
				.simple()
				.textContent('Funcionalidad no implementada')
				.action('OK')
				.position('top center')
			);*/
        }
        /**
         * @description
         * Removes session's cookies
         */
        function logout(){
			//TODO Debugging
			notImplemented(); return false;
			//localStorage.removeItem("abUser");
			/*auth.logOut();
			$log.log("autglogout called");*/
			//$window.close(); //Scripts may close only the windows that were opened by it

			/*configuration.all().then(function(env) {
				$log.log("configuration.all called");
				$log.log("Redirecting to: " + env.security.auth.loginUrl);
            	window.location.replace(env.security.auth.loginUrl);
        	});*/
			//$state.go("login");
        }
        
        function collapseAll() {
        	$timeout(function(){
        		$('#accordion .panel.panel-open>div>a').trigger('click');
        	});
        }
        
        function expandAll() {
        	$timeout(function(){
        		$('#accordion .panel:not(.panel-open)>div>a').trigger('click');
        	});
        }
        
        function toNumber(value) {
        	if(!value) {
        		value = 0;
        	}
        	else if(isNaN(value)) {
        		value = value.replace(',', '.');
        	}
        	return Number(value);
        }

        function openToast(/*message*/) {
        	/*$mdToast.show(
				$mdToast
					.simple()
					.textContent(message)
					.action('OK')
					.position('top center')
    		);*/
        }
	}
	utils.$inject = ['$anchorScroll', '$filter', '$q', '$rootScope', '$state', '$uibModal', /*'$mdToast',*/ '$window', '$http', 'auth', 'configuration'];
})();
