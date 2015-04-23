/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .service('ipHandlerService', [
        function() {
            var self = this;
            //IP转成无符号数值
            self.IP2Num = function(ip) {
                ip = ip.split('.');
                var num = ip[0] * 256 * 256 * 256 + ip[1] * 256 * 256 + ip[2] * 256 + ip[3] * 1;
                num = num >>> 0;
                return num;
            };

            //无符号转成IP地址
            self.Num2IP = function(num) {
                var tt = [];
                tt[0] = (num >>> 24) >>> 0;
                tt[1] = ((num << 8) >>> 24) >>> 0;
                tt[2] = (num << 16) >>> 24;
                tt[3] = (num << 24) >>> 24;
                var str = tt[0] + '.' + tt[1] + '.' + tt[2] + '.' + tt[3];
                return str;
            };

            // drop
            self.calcNeeded = function(value){
                var tmpvar = parseInt(value, 10);

                if (isNaN(tmpvar) || tmpvar > 0xfffffffe || tmpvar < 1){
                    return '';
                }
                var expval = parseInt(Math.log(tmpvar) / Math.log(2)) + 1;
                var maxaddrval = Math.pow(2, expval);
                if (maxaddrval - tmpvar < 2){
                    expval+=1;
                }
                return 32 - expval;
            };

            self.getIpRange = function(ipNum, prefixLength) {
                var ipnet = self.Num2IP(ipNum);
                var ipnetArr = ipnet.split('.');

                var sn = 0;

                for (i = 1; i <= prefixLength; i++) {

                    sn = sn >>> 1;

                    sn = sn + 0x80000000;

                }

                var nm4 = sn & 0xFF;
                var nm3 = (sn >> 8) & 0xFF;
                var nm2 = (sn >> 16) & 0xFF;
                var nm1 = (sn >> 24) & 0xFF;

                var s1 = (ipnetArr[0] & 0xFF) & (nm1 & 0xFF);
                var s2 = (ipnetArr[1] & 0xFF) & (nm2 & 0xFF);
                var s3 = (ipnetArr[2] & 0xFF) & (nm3 & 0xFF);
                var s4 = (ipnetArr[3] & 0xFF) & (nm4 & 0xFF);

                var b1 = (ipnetArr[0] & 0xFF) | (~nm1 & 0xFF);
                var b2 = (ipnetArr[1] & 0xFF) | (~nm2 & 0xFF);
                var b3 = (ipnetArr[2] & 0xFF) | (~nm3 & 0xFF);
                var b4 = (ipnetArr[3] & 0xFF) | (~nm4 & 0xFF);

                var ipStart = [
                    s1,
                    s2,
                    s3,
                    s4 + 1
                ];

                var ipEnd = [
                    b1,
                    b2,
                    b3,
                    b4 - 1
                ];

                return {
                    start: ipStart.join('.'),
                    end: ipEnd.join('.')
                };

            };
        }
    ]);
