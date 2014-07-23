(function() {

    /**
     *  @method: guid
     *  @usage: 
     *  |   Kai.guid();       //=> 0-0;
     *  |   Kai.guid();       //=> 1-0;
     *  |   Kai.guid('test'); //=> test-0-0;
     */

    // 进位上限
    var limit = 65535;

    // 数组是几位，id中就会有几个数字
    function createBaseArray() {
        return [0, 0];
    }

    // 缓存key对应的数组
    var cacheNums = {};

    Kai.guid = function(key) {

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
