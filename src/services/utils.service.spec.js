/**
 * Created by dx.yang on 15/4/27.
 */


describe('utilsService', function () {
    var utilsService;
    beforeEach(module('kai'));
    beforeEach(inject(function (_utilsService_) {
        utilsService = _utilsService_;
    }));


    describe('object utils', function () {
        var obj = {
            key00: 0,
            key01: 1,
            key02: {
                key11: 2,
                key12: 3,
                key13: {
                    key14: 5
                }
            }
        };
        it('getObjectValueByKeyChain', function () {
            expect(utilsService.getObjectValueByKeyChain(obj, 'key00')).toEqual(0);
            expect(utilsService.getObjectValueByKeyChain(obj, 'key01')).toEqual(1);
            expect(utilsService.getObjectValueByKeyChain(obj, 'key02.key11')).toEqual(2);
            expect(utilsService.getObjectValueByKeyChain(obj, 'key02.key12')).toEqual(3);
            expect(utilsService.getObjectValueByKeyChain(obj, 'key02.key13.key14')).toEqual(5);
            expect(utilsService.getObjectValueByKeyChain(obj, 'key02.key15')).toEqual(undefined);
        });

    });

});
