(function() {

    var utils = Kai.utils = {};

    var limit = 65535;

    function createBaseArray() {
        return [0, 0];
    }

    var cacheNums = {};

    utils.uniqID = function(key) {

        // undefined可以用作object的key, so 不做排除
        var nums = cacheNums[key];
        if (!nums) {
            nums = cacheNums[key] = createBaseArray();
        }

        var idx = 0;
        var len = nums.length;
        while(idx < len) {
            if (++nums[idx] > limit) {
                nums[idx] = 0;
                idx++;
            } else {
                break;
            }
        }

        var id = nums.join('-');
        
        if (key) {
            id = key + '-' + id;
        }

        return id;
    };
})();
