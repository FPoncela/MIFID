(function(){
    'use strict';
    
    angular.module('ab-util')
    .controller('fakeCtrl', fakeController);    //Needed for testing

    function fakeController(){}

    describe('Test utils service', function() {
        
        var utils, $mdToast, $controller, $scope, $state, $window;
        beforeEach(function() {
            module('ab-util');
            inject(function(_utils_, _$mdToast_, _$controller_, $rootScope, _$state_, _$window_) {
                utils = _utils_;
                $mdToast = _$mdToast_;
                $controller = _$controller_;
                $scope = new $rootScope.$new();
                $state = _$state_;
                $window = _$window_;
            });
        });

        xit('should append a md-toast into the DOM', function(){
            expect($mdToast).toBeDefined();
            expect($mdToast.simple).toBeDefined();
            expect($mdToast.simple()).toBeDefined();
            expect($mdToast.simple().textContent).toBeDefined();
            expect($mdToast.simple().action).toBeDefined();
            expect($mdToast.simple().hideDelay).toBeDefined();
            expect($mdToast.simple().position).toBeDefined();

            spyOn($mdToast, 'show');
            function fakeFunction(){}
            var fakeToastSimple = {
                textContent: fakeFunction,
                action: fakeFunction,
                hideDelay: fakeFunction,
                position: fakeFunction
            };
            spyOn($mdToast, 'simple').and.returnValue(fakeToastSimple); //ERROR: undefined is not an object (evaluating '$mdToast.simple().textContent').
            utils.openToastError("Un mensaje de error");

            expect($mdToast.show).toHaveBeenCalled();
            expect($mdToast.simple).toHaveBeenCalled();
        });

        it('should be able to send to "home" state and the last window history', function(){
            spyOn($state, "go");
            utils.exit();
            expect($state.go).toHaveBeenCalledWith("home");
            spyOn($window.history, "back");
            utils.goBack();
            expect($window.history.back).toHaveBeenCalled();
        });

        it('should be able to toggle any controller element value', function(){
            
            var fakeCtrl =  $controller('fakeCtrl', {$scope: $scope});
            var showHideElement = utils.showHideElement(fakeCtrl);
            var fakeAttr = "unAtributo";
            showHideElement(fakeAttr);
            expect(fakeCtrl[fakeAttr]).toBeTruthy();
            showHideElement(fakeAttr);
            expect(fakeCtrl[fakeAttr]).toBeFalsy();
            showHideElement(fakeAttr, false);
            expect(fakeCtrl[fakeAttr]).toBeFalsy();
            showHideElement(fakeAttr, true);
            expect(fakeCtrl[fakeAttr]).toBeTruthy();
        });

        it('should be able to transform a String number in a Number', function(){
            var numberOne = "1";
            expect(numberOne).toEqual(jasmine.any(String));
            numberOne = utils.toNumber(numberOne);
            expect(numberOne).toEqual(jasmine.any(Number));
            expect(numberOne).toBe(1);

            var numberDecimal = "-12.4";
            expect(numberDecimal).toEqual(jasmine.any(String));
            numberDecimal = utils.toNumber(numberDecimal);
            expect(numberDecimal).toEqual(jasmine.any(Number));
            expect(numberDecimal).toBe(-12.4);

            var numberDecimalComa = "3,14";
            expect(numberDecimalComa).toEqual(jasmine.any(String));
            numberDecimalComa = utils.toNumber(numberDecimalComa);
            expect(numberDecimalComa).toEqual(jasmine.any(Number));
            expect(numberDecimalComa).toBe(3.14);

            var numberFalse = false
            expect(numberFalse).toEqual(jasmine.any(Boolean));
            numberFalse = utils.toNumber(numberFalse);
            expect(numberFalse).toEqual(jasmine.any(Number));
            expect(numberFalse).toBe(0);
        });
    });
})();