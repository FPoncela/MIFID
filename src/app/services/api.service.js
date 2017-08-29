(function() {
	'use strict';

	angular
	.module('ab-util')
	.factory('api', api);
	/* @ngInject */
	function api(environment, utils) {

		var apiBase = environment.endpointClient;

		var service = {
			getListaImporteCyG: getListaImporteCyG,
			getSearchImporteCyG: getSearchImporteCyG,
			
			getListaInstrumentoImporte: getListaInstrumentoImporte,
			getSearchInstrumentoImporte: getSearchInstrumentoImporte,
								
			getListaInstFinanciero: getListaInstFinanciero,
			getSearchInstFinanciero: getSearchInstFinanciero
		};

		return service;
		
		/** Listado de CyG o Incentivo **/
		function getListaImporteCyG(data) {
			var url = '/importecyg';
			var query = {				
        		paginacionV2: data.paginacion
			};
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'post',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "fakeimpcyg.json": url
			};
			return _api;
		}		
		
		/** Búsqueda por Nº CyG o Incentivo **/
		function getSearchImporteCyG(params) {
			var url = '/importecygSearch';
			var query = {
				ncygi: params.ncygi		        
			}
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'get',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "importecygSearch.mock.json" : url
			};
			return _api;
		}
		
		
		
		
		
		
		
		/** Listado de Instrumento / Importe **/
		function getListaInstrumentoImporte(data) {
			var url = '/insimporte';
			var query = {				
        		paginacionV2: data.paginacion
			};
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'post',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "fakeinsimp.json": url
			};
			return _api;
		}		
		
		/** Búsqueda por Instrumento / Importe **/
		function getSearchInstrumentoImporte(params) {
			var url = '/insimporteSearch';
			var query = {
				ninsfin: params.ninsfin,
				ncygi: params.ncygi
			}
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'get',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "insimporteSearch.mock.json" : url
			};
			return _api;
		}
		
		
		
		
		
		
		
		/** Listado de Instrumento Financiero **/
		function getListaInstFinanciero(data) {
			var url = '/insfinanciero';
			var query = {				
        		paginacionV2: data.paginacion
			};
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'post',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "fakeinsfinanc.json": url
			};
			return _api;
		}		
		
		/** Búsqueda por Nº Instrumento Financiero **/
		function getSearchInstFinanciero(params) {
			var url = '/insfinancieroSearch';
			var query = {
				ninsfin: params.ninsfin		        
			}
			var _api = {
				fail: _errorDefault,
				error: _errorDefault,
				method: 'get',
				query: query,
				restBase: utils.isMock? utils.fakeBase : apiBase,
				url: utils.isMock? "insfinancSearch.mock.json" : url
			};
			return _api;
		}
		
		
		
	}
})();
