/**
 * Created by dx.yang on 15/4/23.
 */


describe('ipHandlerService', function () {
    var ipHandlerService;
    beforeEach(module('kai'));
    beforeEach(inject(function (_ipHandlerService_) {
        ipHandlerService = _ipHandlerService_;
    }));

    var ip = '106.186.23.81';
    var num = 1790580561;

    var ipnet = '192.168.0.1';
    var netmask = 25;
    var ipStart = '192.168.0.1';
    var ipEnd = '192.168.0.126';
    describe('convert', function () {
        it('IP -> Number', function () {
            //console.log(globalConfig)
            expect(ipHandlerService.IP2Num(ip)).toEqual(num);
            //expect().to.have.property('name', 'Ben');
        });
        it('Nubmer -> IP', function() {
            expect(ipHandlerService.Num2IP(num)).toEqual(ip);
        });
        it('get range', function() {
            var ipnetNum = ipHandlerService.IP2Num(ipnet);
            var range = ipHandlerService.getIpRange(ipnetNum, netmask);
            expect(range.start).toEqual(ipStart);
            expect(range.end).toEqual(ipEnd);
        })
    });

});
