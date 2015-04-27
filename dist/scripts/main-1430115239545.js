/**
 * Created by dx.yang on 15/3/31.
 */
angular.module("kai",["ngAnimate","ngCookies","ngSanitize","ngRoute","ui.bootstrap","formly","highcharts-ng"]),angular.module("kai").controller("kai.TableCtrl",["$scope","tableSortService",function(t,e){t.init=function(){t.options=t.options||{},t.options.pagination=t.options.pagination||{};var e={totalItems:1,maxSize:5,itemsPerPage:20,boundaryLinks:!0,rotate:!1,previousText:"上一页",nextText:"下一页",firstText:"首页",lastText:"尾页",numberPerPage:1,totalRows:1,action:function(){}};_.each(e,function(e,i){"undefined"==typeof t.options.pagination[i]&&(t.options.pagination[i]=e)})},t.checkboxHandler=function(e){if(e){var i=!0;_.each(t.rows,function(t){t.checked||(i=!1)}),t.allChecked=i}else _.each(t.rows,function(e){e.checked=t.allChecked})},t.sort=function(i){e.sort(i,t,"rows")}}]),angular.module("kai").controller("kai.SiderNavCtrl",["$scope","$location","$routeParams",function(t,e,i){function n(){t.currentTab=i.which}t.init=function(){},t.$on("$routeChangeStart",function(){n()}),n()}]),angular.module("kai").controller("kai.NavbarCtrl",["$scope","$location","kai.mainNavList",function(t,e,i){function n(){var i=e.path();i&&(i=i.match(/^\/([^/]+)/)[1],t.currentTab=i)}t.list=i,t.$on("$routeChangeStart",function(){n()}),n()}]),angular.module("kai").controller("AlertDialogCtrl",["$scope","$modalInstance","messageDialogOptions",function(t,e,i){var n={success:"fa fa-check-circle text-success",info:"fa fa-info-circle text-info",warning:"fa fa-exclamation-circle text-warning",error:"fa fa-times-circle text-error"},a={icon:"success"};_.merge(a,i),t.type=a.type,t.title=a.title,t.content=a.content,t.icon=n[a.icon],t.ok=function(){e.close()},t.cancel=function(){e.dismiss("cancel")}}]),angular.module("kai").service("tableSortService",[function(){var t=this;t.sort=function(t,e,i){if(!t.sort)return!1;var n=e.sortKey=t.key;e.sortType={desc:"asc",asc:"desc"}[e.sortType||"asc"];var a,o={desc:-1,asc:1}[e.sortType];"string"===t.sort&&(a=function(t,e){return t[n].localeCompare(e[n])*o}),"number"===t.sort&&(a=function(t,e){return(t[n]-e[n])*o}),"array"===t.sort&&(a=function(t,e){return(t[n].length-e[n].length)*o}),e[i].sort(a)}}]),angular.module("kai").service("ipHandlerService",[function(){var t=this;t.IP2Num=function(t){t=t.split(".");var e=256*t[0]*256*256+256*t[1]*256+256*t[2]+1*t[3];return e>>>=0},t.Num2IP=function(t){var e=[];e[0]=t>>>24>>>0,e[1]=t<<8>>>24>>>0,e[2]=t<<16>>>24,e[3]=t<<24>>>24;var i=e[0]+"."+e[1]+"."+e[2]+"."+e[3];return i},t.calcNeeded=function(t){var e=parseInt(t,10);if(isNaN(e)||e>4294967294||1>e)return"";var i=parseInt(Math.log(e)/Math.log(2))+1,n=Math.pow(2,i);return 2>n-e&&(i+=1),32-i},t.getIpRange=function(e,n){var a=t.Num2IP(e),o=a.split("."),r=0;for(i=1;i<=n;i++)r>>>=1,r+=2147483648;var s=255&r,l=r>>8&255,c=r>>16&255,p=r>>24&255,d=255&o[0]&(255&p),u=255&o[1]&(255&c),g=255&o[2]&(255&l),m=255&o[3]&(255&s),f=255&o[0]|255&~p,h=255&o[1]|255&~c,v=255&o[2]|255&~l,b=255&o[3]|255&~s,y=[d,u,g,m+1],k=[f,h,v,b-1];return{start:y.join("."),end:k.join(".")}}}]),angular.module("kai").service("highchartsConfigService",["colorService",function(t){this.New=function(t){var e={size:{},options:{navigation:{enabled:!0,buttonOptions:{enabled:!0,align:"right"}},chart:{zoomType:"x",spacingLeft:10,spacingRight:10,spacingTop:20,spacingBottom:20,type:"line"},tooltip:{dateTimeLabelFormats:{second:"%H:%M:%S",minute:"%b月%e日 %H:%M",hour:"%b月%e日 %H:%M",day:"%b月%e日",week:"%b月%e",month:"%y年%b月",year:"%Y"},shared:!0,crosshairs:!0,borderRadius:0,style:{padding:10},valueDecimals:2,pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>'},plotOptions:{pie:{dataLabels:{distance:20}},series:{cursor:"pointer",events:{},states:{hover:{enabled:!0}}},area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,Highcharts.getOptions().colors[0]],[1,Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]]},marker:{enabled:!1,radius:2},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null},column:{shadow:!1},line:{shadow:!1,lineWidth:1.5,states:{hover:{enabled:!0,lineWidth:1.5}},marker:{enabled:!1,symbol:"circle",radius:1,states:{hover:{enabled:!0}}}}}},series:[]};return t?_.merge(e,t):e},this.globalConfig={global:{useUTC:!1},exporting:{enabled:!1},lang:{noData:"暂无数据",thousandsSep:"",months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],shortMonths:["1","2","3","4","5","6","7","8","9","10","11","12"]},yAxis:{title:"",tickColor:"#eee",gridLineColor:"#eee"},xAxis:{title:"",lineColor:"transparent",tickWidth:0,startOnTick:!0,endOnTick:!0,showFirstLabel:!0,showLastLabel:!0,gridLineColor:"#eee",tickColor:"#eee",gridLineWidth:1,type:"datetime",dateTimeLabelFormats:{second:"%H:%M:%S",minute:"%b-%e %H:%M",hour:"%H:%M",day:"%b月%e",week:"%b月%e",month:"%y-%b",year:"%Y"}},credits:{enabled:!1,text:"",href:"",position:{align:"center"}},title:{style:{fontSize:"14px",fontWeight:"800"},align:"left",text:""},subtitle:{text:""},colors:t.colors()},Highcharts.setOptions(this.globalConfig)}]),angular.module("kai").service("dialogService",["$modal","$q",function(t,e){function i(){var t=e.defer();return t.promise.done=function(e){return t.promise.then(function(t){e(t)}),t.promise},t.promise.fail=function(e){return t.promise.then(null,function(t){e(t)}),t.promise},t}function n(e){return t.open({templateUrl:e.templateUrl||"components/alertDialog/alertDialog.html",controller:e.controller||"AlertDialogCtrl",size:e.size||"sm",resolve:{messageDialogOptions:function(){return e}}})}var a=this;a.alert=function(t){t.type="alert";var e=n(t),a=i();return e.result.then(function(t){a.resolve(t)},function(t){a.resolve(t)}),a.promise},a.prompt=function(t){t.type="prompt";var e=n(t),a=i();return e.result.then(function(t){a.resolve(t)},function(t){a.reject(t)}),a.promise},a.custom=function(t){var e=n(t),a=i();return e.result.then(function(t){a.resolve(t)},function(t){a.reject(t)}),a.promise}}]),angular.module("kai").service("colorService",[function(){var t=this;t.colors=function(){return["#058DC7","#50B432","#ED561B","#C4C508","#21AEC3","#63A069","#9D3E03","#C66BE2","#E48627","#2AB481","#9013FE","#C31B00"]}}]),angular.module("kai").service("checkRouteService",[function(){var t=this;t.get=function(){}}]),angular.module("kai").directive("kaiSiderNav",function(){return{restrict:"A",scope:{list:"=list"},templateUrl:"components/siderNav/siderNav.html",controller:"kai.SiderNavCtrl"}}),angular.module("kai").directive("kaiNavbar",function(){return{restrict:"A",replace:!0,scope:{},templateUrl:"components/navbar/navbar.html",controller:"kai.NavbarCtrl"}}),angular.module("kai").directive("kaiTable",function(){return{restrict:"A",scope:{options:"=",fields:"=",rows:"="},templateUrl:"components/table/table.html",controller:"kai.TableCtrl"}}),angular.module("macchiato").run(["$templateCache",function(t){t.put("components/alertDialog/alertDialog.html",'<div><div ng-show="title" class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><div class="row"><div class="col-sm-2"><span style="font-size:40px;"><i class="{{icon}}"></i></span></div><div style="padding:15px" class="col-sm-9"><storng style="word-wrap:break-word">{{content}}</storng></div></div></div><div class="modal-footer"><button ng-click="ok()" class="btn btn-primary">OK</button> <button ng-if="type==\'prompt\'" ng-click="cancel()" class="btn btn-warning">Cancel</button></div></div>'),t.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><div href="https://github.com/Swiip/generator-gulp-angular" class="navbar-brand"><img src="assets/images/kai-logo-black.png" style="height:22px"></div></div><div id="bs-example-navbar-collapse-6" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li ng-repeat="item in list" ng-class="{true: \'active\'}[currentTab == item.key]"><a ng-href="{{item.url}}"><i style="margin-right: 5px;" class="{{item.icon}}"></i>&nbsp;{{item.title}}</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></div></div>'),t.put("components/siderNav/siderNav.html",'<div ng-init="init()" class="kai-sider-nav"><ul class="nav-list"><li ng-repeat="item in list" ng-class="{true:\'active\'}[item.key==currentTab]"><a href="{{item.url}}"><i class="pull-left {{item.icon}}"></i><span class="pull-left">{{item.title}}</span><i class="fa fa-angle-right pull-right"></i></a></li></ul></div>'),t.put("components/table/table.html",'<div ng-init="init()" class="row col-md-12 kai-table-wrap"><div style="margin-bottom:10px" class="clearfix"><div style="padding-left:0" class="col-md-5"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span> <input ng-model="searchFilter" type="text" class="form-control"></div></div><div style="padding-right:0" class="col-md-7"><button ng-repeat="b in options.topButtons" style="margin-left:5px;padding-left:20px;padding-right:20px" class="{{b.className}} pull-right">{{b.title}}</button></div></div><table style="border:1px solid #ddd;margin-bottom:0" class="table table-condensed table-hover"><thead><tr><th ng-show="options.checkbox" width="30px"><input type="checkbox" ng-click="checkboxHandler()" ng-model="allChecked"></th><th ng-repeat="f in fields" style="cursor:pointer;" ng-click="sort(f)">{{f.title}} &nbsp;<span ng-if="f.sort"><span ng-if="sortKey != f.key" class="text-muted"><i class="fa fa-sort"></i></span><span ng-if="sortKey == f.key &amp;&amp; sortType == \'asc\'"><i class="fa fa-sort-asc text-primary"></i></span><span ng-if="sortKey == f.key &amp;&amp; sortType == \'desc\'"><i class="fa fa-sort-desc text-primary"></i></span></span></th><th ng-if="options.buttons"></th></tr></thead><tbody><tr ng-repeat="r in theRows=(rows | filter: searchFilter)"><td ng-if="options.checkbox"><input type="checkbox" ng-click="checkboxHandler(r)" ng-model="r.checked"></td><td ng-repeat="f in fields" bind-html-unsafe="f.valueHandler &amp;&amp; f.valueHandler(r[f.key]) || r[f.key]"></td><td ng-if="options.buttons" style="text-align:right"><a href="javascript:;" ng-repeat="btn in options.buttons" ng-click="btn.action(r)" style="margin-right:10px" class="{{btn.className}}"><i ng-if="btn.icon" style="margin-right:2px" class="{{btn.icon}}"></i>{{btn.title}}</a></td></tr></tbody></table><div ng-show="theRows.length === 0" style="border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd;"><div style="padding:10px;" ng-show="!isLoading" class="text-muted"><i class="fa fa-info-circle"></i>&nbsp;no data</div><div style="padding:10px" ng-show="isLoading"><span><i class="fa fa-spin fa-spinner"></i>&nbsp; loading...</span></div></div><div style="margin-bottom:10px" class="clearfix"><div style="padding-left:0" class="col-md-6"><pagination ng-show="options.pagination.current" total-items="options.pagination.totalItems" ng-model="options.pagination.current" max-size="options.pagination.maxSize" boundary-links="options.pagination.boundaryLinks" rotate="options.pagination.rotate" previous-text="{{options.pagination.previousText}}" next-text="{{options.pagination.nextText}}" first-text="{{options.pagination.firstText}}" last-text="{{options.pagination.lastText}}" num-pages="options.pagination.numPages" ng-change="options.pagination.action(options.pagination.current)" class="pagination-sm"></pagination></div><div style="padding-right:0" class="col-md-6"><p style="margin:16px 0" class="text-muted text-right">每页 {{options.pagination.itemsPerPage}} 条记录 / 共 {{options.pagination.totalItems}} 条记录</p></div></div></div>')}]);