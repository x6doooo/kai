/**
 * Created by dx.yang on 15/4/27.
 */

angular.module('kai').service('colorService', [

    function() {

        var self = this;
        self.colors = function() {
            return [
                '#058DC7', '#50B432', '#ED561B',
                '#C4C508', '#21AEC3', '#63A069',
                '#9D3E03', '#C66BE2', '#E48627',
                '#2AB481', '#9013FE', '#C31B00'
            ];
        };

    }

]);
