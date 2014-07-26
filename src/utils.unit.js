(function() {

    function byteUnit(v) {
        var levels = [
            [1, 'B'],
            [1024, 'KB'],
            [1048576, 'MB'],
            [1073741824, 'GB'],
            [1099511627776, 'TB']  //Math.pow(2, 40)
        ];

        if (v === null || v === undefined) return;
        
        var i = levels.length;
        while(i--) {
            if (v >= levels[i][0]) break;
        }
        return (v / levels[i][0]).toFixed(2) + ' ' + levels[i][1];
    }

})();
