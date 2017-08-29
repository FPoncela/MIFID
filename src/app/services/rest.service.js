(function() {
	'use strict';
	/**
	* @ngdoc service
	* @name ab-util.service:rest
	*
	* @description
	* Service for the rest calls with automatic error handling
	*/
	angular
		.module('ab-util')
		.factory('rest', Service);

	/** @ngInject */
	function Service(api, $http, configuration, environment, utils) {

		//var featureOnBehalfOf = environment.features.onBehalfOf || false;

		var service = {
			api: apiQuery,
			remove: remove,
			get: get,
			patch: patch,
			post: post,
			put: put,
			query: query
		};

		return service;

		/**
		* @ngdoc function
		* @name ab-util.service#apiQuery
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía el factory api (inerfaz de API)
		* que define método, construcción de la url,
		* punto de utilización de parámetros,
		* criticidad del servicio y validación de la response
		* @returns {Undefined} undefined
		*/

		function apiQuery(name, params, onSuccess, onError) {
			var _api = api[name](params);
			var _onError = !onError && !_api.error ? null : function (response) {
				if (angular.isFunction(onError)) onError(response, _api.error);
				else _api.error(response);
			};

			query({
				data: _api.query,
				error: _onError,
				fail: _api.fail,
				hasError: _api.hasError,
				hideSpinner : _api.hideSpinner || false,
				isCritical: _api.isCritical,
				method: _api.method,
				name: name,
				restBase: _api.restBase,
				success: onSuccess,
				url: _api.url
			});
		}

		/**
		* @ngdoc function
		* @name ab-util.service#put
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía REMOVE
		* @returns {Undefined} undefined
		*/
		function remove(url, callback, data, hideSpinner) {
			_polymorph(url, callback, data, 'remove', hideSpinner);
		}

		/**
		* @ngdoc function
		* @name ab-util.service#get
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía GET
		* @returns {Undefined} undefined
		*/
		function get(url, callback, params, hideSpinner) {
			_polymorph(url, callback, params, 'get', hideSpinner);
		}

		/**
		* @ngdoc function
		* @name ab-util.service#put
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía PATCH
		* @returns {Undefined} undefined
		*/
		function patch(url, callback, data, hideSpinner) {
			_polymorph(url, callback, data, 'patch', hideSpinner);
		}

		/**
		* @ngdoc function
		* @name ab-util.service#post
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía POST
		* @returns {Undefined} undefined
		*/
		function post(url, callback, data, hideSpinner) {
			_polymorph(url, callback, data, 'post', hideSpinner);
		}

		/**
		* @ngdoc function
		* @name ab-util.service#put
		* @methodOf  ab-util.service:rest
		* @description
		* Llamada rest vía PUT
		* @returns {Undefined} undefined
		*/
		function put(url, callback, data, hideSpinner) {
			_polymorph(url, callback, data, 'put', hideSpinner);
		}

		/**
		* @ngdoc function
		* @name ab-util.service#query
		* @methodOf  ab-util.service:rest
		* @description
		* Método abstracto para llamadas call con gestion centralizada de errores
		* @returns {Undefined} undefined
		*/
		function query(settings) {
			var urlTip = settings.url;
			//var isMock = utils.isInArray(urlTip, _ACTIVE_MOCKS) || utils.isInArray(settings.name, _ACTIVE_MOCKS);
			//var isMock = false;
			//var dsConfig = "";
			var method = /*isMock ? 'get' :*/ settings.method || 'get';
			var urlBase = /*isMock ? _MOCK_BASE :*/ settings.restBase || environment.endpointClient;
			var url = urlBase + urlTip;// + (isMock ? '.json' : '');
			var data = settings.data || {};
			var dataCarrier = method === 'get' ? 'params' : 'data';
			var config = {
					method: method,
					url: url,
					hideSpinner : settings.hideSpinner || false,
					headers: {
							//'X-IBM-Client-Id': '0ef5de89-12aa-47ce-b1db-3e496f8aab3d',
							'Content-Type': 'application/json'
							//'Accept': 'application/json',
							//'Authorization': 'Bearer AAEkMGVmNWRlODktMTJhYS00N2NlLWIxZGItM2U0OTZmOGFhYjNk9wK2h2JptwtIWeFTFKrbdliYWWkBh9KDmCuEJ08ACUqkDcIEWNTyfn-B32DiUVSrCiuSvhE_lrnld8kmRuWKBs150EEOvnDsdJGXq-e3C7nsve-jy8Xa8Lk5kAr-5BoP'
					}
			};

			/*configuration.get("security").then(function(security) {
		        dsConfig = security;
		    });*/
			/*
			var showSpinner = !settings.hideLoad || settings.hideLoad !== true;
			*/

			//var _token = auth.getToken({grantType: "token", credentials: {token: "12341234"}}); //Original
			//var _token = auth.getToken({grantType: "token", credentials: {token: sessionStorage.getItem("dsCorpToken")}}); //Original
			//var _token = token.get();
			var onError = settings.error || function (response) {
				//_handleError(utils.accessProp(response, _REST_ERRORCODE_PATH), settings);
				_handleError(utils.accessProp(response), settings);
				if(response.message!=null) utils.openModalError({title: 'Mensaje de error', message: response.message, data: response});//utils.openToastError(response.data.message);
				else utils.openModalError({title: 'Mensaje de error', message: "Se ha producido un error", data: response});//utils.openToastError("Se ha producido un error.");
			};
			var onSuccess = function (response) {
				_filterStatus(response, settings);
			};
			/*
			var requireUser = ['post', 'put', 'patch'];
			if ( _getSeller() && _gestor.userId !== _gestor.seller.userId ) {
				angular.extend(data, _getSeller());
			}*/
			config[dataCarrier] = data;
						
			if (angular.isFunction(settings.before)) settings.before();
			//if (showSpinner) utils.showSpinner(settings.url);
			//TODO Only Debugging!
			//config.timeout = 200000;
			$http(config)
				.then(
					function (response) {_callback(response.data, onSuccess, settings)},
					function (response) {
						_callback(response.data, onError, settings);
					}
				)
				.catch(function (response) {
					utils.openToastError("Se ha producido un error petición - catch.");
					_callback(response.data, onError, settings);
				});
		}

		function _callback(response, _case, settings) {
			if (angular.isFunction(settings.always)) settings.always(response);
			_case(response);
			//if (showSpinner) {utils.hideSpinner(settings.url);}
			if (angular.isFunction(settings.after)) settings.after(response);
		}

		function _filterStatus(response, settings) {
			var errorCode = typeof settings.hasError === 'function' ? settings.hasError(response) : utils.accessProp(response, '');
			if (!errorCode && settings.success) settings.success(response);
			else if (angular.isFunction(settings.fail)) settings.fail(response, function () {_handleError(errorCode, settings)});
			else _handleError(errorCode, settings);
		}

		/*function _getSeller() {
			var _gestor = null;// gestor.get() || {};
			//if(!_gestor.seller) return false;
			return {
				nameOf: {
					uid: _gestor.seller.userId,
					branch: _gestor.seller.branch
				}
			};
		}*/

		function _handleError(code, settings) {
			var msg = code ? 'ERR_' + code : 'ERROR_DEFAULT';
			var isCritical = angular.isDefined(settings.isCritical) ? settings.isCritical : _isCritical(code, settings);

			utils.openToastError(msg);
			if (isCritical) utils.exit();
		}

		function _isCritical(/*code, settings*/) {
			var isCritical = false;
				/*utils.isInArray(code, _CRITICAL) ||
				utils.isInArray(settings.url, _CRITICAL) ||
				utils.isInArray(settings.name, _CRITICAL)
			;*/

			return isCritical;
		}

		// Permite hacer una llamada rest pasando o bien un objeto de settings o 2-3 argumentos (url, callback, [data])
		function _polymorph(url, callback, data, method, hideSpinner) {
			var settings = typeof url === 'object' ? url : {
				url: url,
				success: callback,
				data: data,
				hideSpinner : hideSpinner || false
			};

			settings.method = method;

			query(settings);
		}
	}
})();