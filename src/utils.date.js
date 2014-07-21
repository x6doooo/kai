(function() {
    var Time = function(date) {
        return new Time.prototype.init(date);
    };

    Time.prototype = {
        constructor: Time,
        init: function(date) {
            var type = Object.prototype.toString.call(date);
            if (date instanceof Time) {
                return date;
            }
            if (type == '[object Date]') {
                this.initDate(date);
            }
            if (type == '[object String]') {
                this.parse(date);
            }
            return this;
        },
        initDate: function(date) {
            this._offset = -date.getTimezoneOffset() * 60 * 1000;
            this._date = date.getTime() - this._offset;
        },
        parse: function(str) {
            
            //  2014-07-21 13:32:24.012 GMT+0800
            //  2014-07-21 13:32:24
            //  2014-07-21
            var tem;
            if (/(\d+-\d+-\d+)/.test(str)) {
                tem = RegExp.$1.split('-');
            } else {
                throw new Error('TIME解析失败');
                return;
            }

            if (/(\d+:\d+:\d+)/.test(str)) {
                tem = tem.concat(RegExp.$1.split(':'));
            } else {
                tem = tem.concat([0, 0, 0]);
            }

            if (/\.(\d+)/.test(str)) {
                tem.push(RegExp.$1);
            } else {
                tem.push(0);
            }
            
            var tz;
            if (/GMT((\+\d+)|(\-\d+))/.test(str)) {
                tz = RegExp.$1;
            }
            tem[1]--;

            var t = Date.UTC.apply(null, tem);
            t = new Date(t);
            this.initDate(t);

            if (tz) {
                this.timezone(tz);
            }
            this._date -= this._offset;

            return this;
        },
        timezone: function(tz) {
            if (tz) {
                return this._setTZ(tz);
            }
            return this._offset2tz();
        },
        _offset2tz: function() {
            var src_t = this._offset / 60 / 1000;
            var t = Math.abs(src_t);
            h = ~~(t / 60);
            m = t - h * 60;
            h < 10 && (h = '0' + h);
            m < 10 && (m = '0' + m);
            if (src_t >= 0) {
                return '+' + h + m;
            } else {
                return '-' + h + m;
            }
        },
        _setTZ: function(tz) {
            this._tz = tz;
            var h = ~~(tz / 100);
            var m = tz - h * 100;
            tz = (h * 3600 + m * 60) * 1000;
            this._offset = tz;
            return this;
        },
        toString: function(fmt) {
            var self = this;
            var date = new Date(this._date + this._offset);
            fmt = fmt || 'yyyy-MM-dd hh:mm:ss.S';
            if (/(y+)/.test(fmt)) {
                var fullYear = date.getFullYear();
                fmt = fmt.replace(RegExp.$1, (fullYear + "").substr(4 - RegExp.$1.length));
            }
            if (/(Z)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, 'GMT' + self._offset2tz());
            }
            if (/(A)/.test(fmt)) {
                var op = 'PM';
                if (date.getHours() < 13) {
                    op = 'AM';
                }
                fmt = fmt.replace(RegExp.$1, op);
            }
                
            var k, v;
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'h+': (function() {
                    var t = date.getHours();
                    if(t > 12) {
                        t -= 12;
                    }
                    return t;
                })(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds() 
            };
            for (k in o) {
                v = o[k];
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? v : (("00" + v).substr(("" + v).length)));
                }
            }
            return fmt;
        },
        add: function(pos, num) {
            var o = {
                d: 24 * 3600000,
                h: 3600000,
                m: 60000,
                s: 1000,
                S: 1
            };
            if (arguments.length == 1) {
                num = pos;
                pos = 'S';
            }
            this._date += o[pos] * num;
            return this;
        }
    };
    Time.prototype.init.prototype = Time.prototype;

    // Class Methods
    Time.offset = function(from, to) {
        if (!from instanceof Time) {
            from = Time(from);
        }
        if (!to instanceof Time) {
            to = Time(to);
        }
        return to._date - from._date;
    };

    

var list = [
    [ 'ACDT', 'Australian Central Daylight Savings Time', '+1030' ],
    [ 'ACST', 'Australian Central Standard Time', '+0930' ],
    [ 'ACT', 'ASEAN Common Time', '+0800' ],
    [ 'ADT', 'Atlantic Daylight Time', '+0300' ],
    [ 'AEDT', 'Australian Eastern Daylight Savings Time', '+1100' ],
    [ 'AEST', 'Australian Eastern Standard Time', '+1000' ],
    [ 'AFT', 'Afghanistan Time', '+0430' ],
    [ 'AKDT', 'Alaska Daylight Time', '−0800' ],
    [ 'AKST', 'Alaska Standard Time', '−0900' ],
    [ 'AMST', 'Amazon Summer Time (Brazil)', '−0300' ],
    [ 'AMST', 'Armenia Summer Time', '+0500' ],
    [ 'AMT', 'Amazon Time (Brazil)', '−0400' ],
    [ 'AMT', 'Armenia Time', '+0409' ],
    [ 'ART', 'Argentina Time', '−0300' ],
    [ 'AST', 'Arabia Standard Time', '+0300' ],
    [ 'AST', 'Atlantic Standard Time', '−0400' ],
    [ 'AWDT', 'Australian Western Daylight Time', '+0900' ],
    [ 'AWST', 'Australian Western Standard Time', '+0800' ],
    [ 'AZOST', 'Azores Standard Time', '−0100' ],
    [ 'AZT', 'Azerbaijan Time', '+0400' ],
    [ 'BDT', 'Brunei Time', '+0800' ],
    [ 'BIOT', 'British Indian Ocean Time', '+0600' ],
    [ 'BIT', 'Baker Island Time', '−1200' ],
    [ 'BOT', 'Bolivia Time', '−0400' ],
    [ 'BRT', 'Brasilia Time', '−0300' ],
    [ 'BST', 'Bangladesh Standard Time', '+0600' ],
    [ 'BST', 'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)', '+0100' ],
    [ 'BTT', 'Bhutan Time', '+0600' ],
    [ 'CAT', 'Central Africa Time', '+0200' ],
    [ 'CCT', 'Cocos Islands Time', '+0630' ],
    [ 'CDT', 'Central Daylight Time (North America)', '−0500' ],
    [ 'CDT', 'Cuba Daylight Time', '−0400' ],
    [ 'CEDT', 'Central European Daylight Time', '+0200' ],
    [ 'CEST', 'Central European Summer Time (Cf. HAEC)', '+0200' ],
    [ 'CET', 'Central European Time', '+0100' ],
    [ 'CHADT', 'Chatham Daylight Time', '+1345' ],
    [ 'CHAST', 'Chatham Standard Time', '+1245' ],
    [ 'CHOT', 'Choibalsan', '+0800' ],
    [ 'ChST', 'Chamorro Standard Time', '+1000' ],
    [ 'CHUT', 'Chuuk Time', '+1000' ],
    [ 'CIST', 'Clipperton Island Standard Time', '−0800' ],
    [ 'CIT', 'Central Indonesia Time', '+0800' ],
    [ 'CKT', 'Cook Island Time', '−1000' ],
    [ 'CLST', 'Chile Summer Time', '−0300' ],
    [ 'CLT', 'Chile Standard Time', '−0400' ],
    [ 'COST', 'Colombia Summer Time', '−0400' ],
    [ 'COT', 'Colombia Time', '−0500' ],
    [ 'CST', 'Central Standard Time (North America)', '−0600' ],
    [ 'CST', 'China Standard Time', '+0800' ],
    [ 'CST', 'Central Standard Time (Australia)', '+0930' ],
    [ 'CST', 'Central Summer Time (Australia)', '+1030' ],
    [ 'CST', 'Cuba Standard Time', '−0500' ],
    [ 'CT', 'China time', '+0800' ],
    [ 'CVT', 'Cape Verde Time', '−0100' ],
    [ 'CWST', 'Central Western Standard Time (Australia) unofficial', '+0845' ],
    [ 'CXT', 'Christmas Island Time', '+0700' ],
    [ 'DAVT', 'Davis Time', '+0700' ],
    [ 'DDUT', 'Dumont d\'Urville Time', '+1000' ],
    [ 'DFT', 'AIX specific equivalent of Central European Time', '+0100' ],
    [ 'EASST', 'Easter Island Standard Summer Time', '−0500' ],
    [ 'EAST', 'Easter Island Standard Time', '−0600' ],
    [ 'EAT', 'East Africa Time', '+0300' ],
    [ 'ECT', 'Eastern Caribbean Time (does not recognise DST)', '−0400' ],
    [ 'ECT', 'Ecuador Time', '−0500' ],
    [ 'EDT', 'Eastern Daylight Time (North America)', '−0400' ],
    [ 'EEDT', 'Eastern European Daylight Time', '+0300' ],
    [ 'EEST', 'Eastern European Summer Time', '+0300' ],
    [ 'EET', 'Eastern European Time', '+0200' ],
    [ 'EGST', 'Eastern Greenland Summer Time', '+0000' ],
    [ 'EGT', 'Eastern Greenland Time', '−0100' ],
    [ 'EIT', 'Eastern Indonesian Time', '+0900' ],
    [ 'EST', 'Eastern Standard Time (North America)', '−0500' ],
    [ 'EST', 'Eastern Standard Time (Australia)', '+1000' ],
    [ 'FET', 'Further-eastern European Time', '+0300' ],
    [ 'FJT', 'Fiji Time', '+1200' ],
    [ 'FKST', 'Falkland Islands Standard Time', '−0300' ],
    [ 'FKST', 'Falkland Islands Summer Time', '−0300' ],
    [ 'FKT', 'Falkland Islands Time', '−0400' ],
    [ 'FNT', 'Fernando de Noronha Time', '−0200' ],
    [ 'GALT', 'Galapagos Time', '−0600' ],
    [ 'GAMT', 'Gambier Islands', '−0900' ],
    [ 'GET', 'Georgia Standard Time', '+0400' ],
    [ 'GFT', 'French Guiana Time', '−0300' ],
    [ 'GILT', 'Gilbert Island Time', '+1200' ],
    [ 'GIT', 'Gambier Island Time', '−0900' ],
    [ 'GMT', 'Greenwich Mean Time', '0000' ],
    [ 'GST', 'South Georgia and the South Sandwich Islands', '−0200' ],
    [ 'GST', 'Gulf Standard Time', '+0400' ],
    [ 'GYT', 'Guyana Time', '−0400' ],
    [ 'HADT', 'Hawaii-Aleutian Daylight Time', '−0900' ],
    [ 'HAEC', 'Heure Avancée d\'Europe Centrale francised name for CEST', '+0200' ],
    [ 'HAST', 'Hawaii-Aleutian Standard Time', '−1000' ],
    [ 'HKT', 'Hong Kong Time', '+0800' ],
    [ 'HMT', 'Heard and McDonald Islands Time', '+0500' ],
    [ 'HOVT', 'Khovd Time', '+0700' ],
    [ 'HST', 'Hawaii Standard Time', '−1000' ],
    [ 'ICT', 'Indochina Time', '+0700' ],
    [ 'IDT', 'Israel Daylight Time', '+0300' ],
    [ 'IOT', 'Indian Ocean Time', '+0300' ],
    [ 'IRDT', 'Iran Daylight Time', '+0430' ],
    [ 'IRKT', 'Irkutsk Time', '+0900' ],
    [ 'IRST', 'Iran Standard Time', '+0330' ],
    [ 'IST', 'Indian Standard Time', '+0530' ],
    [ 'IST', 'Irish Standard Time', '+0100' ],
    [ 'IST', 'Israel Standard Time', '+0200' ],
    [ 'JST', 'Japan Standard Time', '+0900' ],
    [ 'KGT', 'Kyrgyzstan time', '+0600' ],
    [ 'KOST', 'Kosrae Time', '+1100' ],
    [ 'KRAT', 'Krasnoyarsk Time', '+0700' ],
    [ 'KST', 'Korea Standard Time', '+0900' ],
    [ 'LHST', 'Lord Howe Standard Time', '+1030' ],
    [ 'LHST', 'Lord Howe Summer Time', '+1100' ],
    [ 'LINT', 'Line Islands Time', '+1400' ],
    [ 'MAGT', 'Magadan Time', '+1200' ],
    [ 'MART', 'Marquesas Islands Time', '−0930' ],
    [ 'MAWT', 'Mawson Station Time', '+0500' ],
    [ 'MDT', 'Mountain Daylight Time (North America)', '−0600' ],
    [ 'MET', 'Middle European Time Same zone as CET', '+0100' ],
    [ 'MEST', 'Middle European Saving Time Same zone as CEST', '+0200' ],
    [ 'MHT', 'Marshall Islands', '+1200' ],
    [ 'MIST', 'Macquarie Island Station Time', '+1100' ],
    [ 'MIT', 'Marquesas Islands Time', '−0930' ],
    [ 'MMT', 'Myanmar Time', '+0630' ],
    [ 'MSK', 'Moscow Time', '+0400' ],
    [ 'MST', 'Malaysia Standard Time', '+0800' ],
    [ 'MST', 'Mountain Standard Time (North America)', '−0700' ],
    [ 'MST', 'Myanmar Standard Time', '+0630' ],
    [ 'MUT', 'Mauritius Time', '+0400' ],
    [ 'MVT', 'Maldives Time', '+0500' ],
    [ 'MYT', 'Malaysia Time', '+0800' ],
    [ 'NCT', 'New Caledonia Time', '+1100' ],
    [ 'NDT', 'Newfoundland Daylight Time', '−0230' ],
    [ 'NFT', 'Norfolk Time', '+1130' ],
    [ 'NPT', 'Nepal Time', '+0545' ],
    [ 'NST', 'Newfoundland Standard Time', '−0330' ],
    [ 'NT', 'Newfoundland Time', '−0330' ],
    [ 'NUT', 'Niue Time', '−1100' ],
    [ 'NZDT', 'New Zealand Daylight Time', '+1300' ],
    [ 'NZST', 'New Zealand Standard Time', '+1200' ],
    [ 'OMST', 'Omsk Time', '+0700' ],
    [ 'ORAT', 'Oral Time', '+0500' ],
    [ 'PDT', 'Pacific Daylight Time (North America)', '−0700' ],
    [ 'PET', 'Peru Time', '−0500' ],
    [ 'PETT', 'Kamchatka Time', '+1200' ],
    [ 'PGT', 'Papua New Guinea Time', '+1000' ],
    [ 'PHOT', 'Phoenix Island Time', '+1300' ],
    [ 'PHT', 'Philippine Time', '+0800' ],
    [ 'PKT', 'Pakistan Standard Time', '+0500' ],
    [ 'PMDT', 'Saint Pierre and Miquelon Daylight time', '−0200' ],
    [ 'PMST', 'Saint Pierre and Miquelon Standard Time', '−0300' ],
    [ 'PONT', 'Pohnpei Standard Time', '+1100' ],
    [ 'PST', 'Pacific Standard Time (North America)', '−0800' ],
    [ 'PYST', 'Paraguay Summer Time (South America)', '−0300' ],
    [ 'PYT', 'Paraguay Time (South America)', '−0400' ],
    [ 'RET', 'Réunion Time', '+0400' ],
    [ 'ROTT', 'Rothera Research Station Time', '−0300' ],
    [ 'SAKT', 'Sakhalin Island time', '+1100' ],
    [ 'SAMT', 'Samara Time', '+0400' ],
    [ 'SAST', 'South African Standard Time', '+0200' ],
    [ 'SBT', 'Solomon Islands Time', '+1100' ],
    [ 'SCT', 'Seychelles Time', '+0400' ],
    [ 'SGT', 'Singapore Time', '+0800' ],
    [ 'SLST', 'Sri Lanka Time', '+0530' ],
    [ 'SRT', 'Suriname Time', '−0300' ],
    [ 'SST', 'Samoa Standard Time', '−1100' ],
    [ 'SST', 'Singapore Standard Time', '+0800' ],
    [ 'SYOT', 'Showa Station Time', '+0300' ],
    [ 'TAHT', 'Tahiti Time', '−1000' ],
    [ 'THA', 'Thailand Standard Time', '+0700' ],
    [ 'TFT', 'Indian/Kerguelen', '+0500' ],
    [ 'TJT', 'Tajikistan Time', '+0500' ],
    [ 'TKT', 'Tokelau Time', '+1300' ],
    [ 'TLT', 'Timor Leste Time', '+0900' ],
    [ 'TMT', 'Turkmenistan Time', '+0500' ],
    [ 'TOT', 'Tonga Time', '+1300' ],
    [ 'TVT', 'Tuvalu Time', '+1200' ],
    [ 'UCT', 'Coordinated Universal Time', '0000' ],
    [ 'ULAT', 'Ulaanbaatar Time', '+0800' ],
    [ 'UTC', 'Coordinated Universal Time', '0000' ],
    [ 'UYST', 'Uruguay Summer Time', '−0200' ],
    [ 'UYT', 'Uruguay Standard Time', '−0300' ],
    [ 'UZT', 'Uzbekistan Time', '+0500' ],
    [ 'VET', 'Venezuelan Standard Time', '−0430' ],
    [ 'VLAT', 'Vladivostok Time', '+1000' ],
    [ 'VOLT', 'Volgograd Time', '+0400' ],
    [ 'VOST', 'Vostok Station Time', '+0600' ],
    [ 'VUT', 'Vanuatu Time', '+1100' ],
    [ 'WAKT', 'Wake Island Time', '+1200' ],
    [ 'WAST', 'West Africa Summer Time', '+0200' ],
    [ 'WAT', 'West Africa Time', '+0100' ],
    [ 'WEDT', 'Western European Daylight Time', '+0100' ],
    [ 'WEST', 'Western European Summer Time', '+0100' ],
    [ 'WET', 'Western European Time', '0000' ],
    [ 'WIT', 'Western Indonesian Time', '+0700' ],
    [ 'WST', 'Western Standard Time', '+0800' ],
    [ 'YAKT', 'Yakutsk Time', '+1000' ],
    [ 'YEKT', 'Yekaterinburg Time', '+0600' ],
    [ 'Z', 'Zulu Time (Coordinated Universal Time)', '0000' ] 
];

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Time;
    } else if (typeof Kai !== 'undefined') {
        Kai.Time = Time;
    }

    var d = new Date();
    var t = Time(d);
    console.log('//t = Time(new Date())');
    console.log("//t.toString('yyyy-MM-dd HH:mm:ss.S Z')");
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log();

    console.log("//t.timezone('0700')");
    console.log("//t.toString('yyyy-MM-dd HH:mm:ss.S Z')");
    t.timezone('0700');
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log();


    console.log("//t.timezone('0000')");
    console.log("//t.toString('yyyy-MM-dd HH:mm:ss.S Z')");
    t.timezone('0000');
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log();

    console.log("//t.timezone('1200')");
    t.timezone('+1200');
    console.log("//t.toString('yyyy-MM-dd hh:mm:ss.S Z')");
    console.log(t.toString('yyyy-MM-dd hh:mm:ss.S Z'));
    console.log("//t.toString('yyyy-MM-dd HH:mm:ss.S Z')");
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log();
    
    t.timezone('-0200');
    console.log(t.toString('yyyy-MM-dd hh:mm:ss.S A Z'));
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));
    
    t.timezone('-1000');
    console.log(t.toString('yyyy-MM-dd h:mm:ss.S A Z'));
    console.log(t.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log(t.add('d', 20).timezone('-0600').toString('yyyy-MM-dd HH:mm:ss.S Z'));
    console.log(t.timezone('-1000').toString('yyyy-MM-dd HH:mm:ss.S Z'));

    console.log(!t instanceof Time);

    var from = Time(new Date(2014, 6, 20));
    var to = Time(new Date());
    console.log(from.toString('yyyy-MM-dd HH:mm:ss.S Z'));
    console.log(to.toString('yyyy-MM-dd HH:mm:ss.S Z'));
    var offset = Time.offset(from, to);
    console.log(Time(new Date(offset)).toString('yyyy-MM-dd HH:mm:ss.S Z'));


    var p = Time('2014-07-21 13:32:24.012 GMT+0700');
    console.log(p.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    var p = Time('2014-07-21 GMT+0600');
    console.log(p.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    var p = Time('2014-07-21 13:32:24 GMT+0700');
    console.log(p.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    var p = Time('2014-07-21 13:32:24.012');
    console.log(p.toString('yyyy-MM-dd HH:mm:ss.S Z'));

    var p = Time('2014-07-21 13:32:24 GMT-0700');
    console.log(p.toString('yyyy-MM-dd HH:mm:ss.S Z'));



    list.forEach(function(v, i, a) {
        v[2] = v[2].replace('UTC', '');
        v[2] = v[2].replace(':', '');
        if (v[2] == '') {
            v[2] = '0000'
        }
        if (v[2].length < 4) {
            v[2] = v[2] + '00';
        }
        v[1] = v[1].replace(/\[\d\]/, '');
    });

    console.log(list);
    
})();

