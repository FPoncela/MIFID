(function(){
    "use strict";
    describe("api service mock", function(){
        var api;
        beforeEach(module("ab-util"));
        beforeEach(inject(function(_api_){
            api = _api_;
        }));
        it("api's properties'names has to start as its request method", function(){
            for(var k in api){
                var fakeParams = {};
                var apiReturned = api[k](fakeParams);
                
                if(k !== 'getClientSearchName') expect(k.indexOf(apiReturned.method)).toBe(0);
            }
        });
    });
})();