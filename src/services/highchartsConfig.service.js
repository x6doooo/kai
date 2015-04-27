/**
 * Created by dx.yang on 15/4/27.
 */


angular.module('kai')
    .service('highchartsConfigService',
    [
        'colorService',
        function(
            colorService
        ) {

        this.New = function(cfg) {
            var dc =  {
                size: {
                    //height: 300
                },
                options: {
                    navigation: {
                        enabled: true,
                        buttonOptions: {
                            enabled: true,
                            align: 'right'
                        }
                    },
                    chart: {
                        zoomType: 'x',
                        //borderColor: '#ddd',
                        //borderWidth: 1,
                        spacingLeft: 10,
                        spacingRight: 10,
                        spacingTop: 20,
                        spacingBottom: 20,
                        type: 'line'
                    },
                    tooltip: {
                        dateTimeLabelFormats: {
                            second: '%H:%M:%S',
                            minute: '%b月%e日 %H:%M',
                            hour: '%b月%e日 %H:%M',
                            day: '%b月%e日',
                            week: '%b月%e',
                            month: '%y年%b月',
                            year: '%Y'
                        },
                        shared: true,
                        crosshairs: true,
                        //shadow: false,
                        borderRadius: 0,
                        style: {
                            padding: 10
                        },
                        valueDecimals: 2,
                        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
                        //'{series.name}: <b>{point.y}</b><br/>'
                        //valueSuffix: '',
                        //shared: true
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                distance: 20
                            }
                        },
                        series: {
                            cursor: 'pointer',
                            events: {
                                //click: function(ev) {
                                //}
                            },
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        },
                        area: {
                            fillColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                enabled: false,
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        },
                        column: {
                            shadow: false
                        },
                        line: {
                            shadow: false,
                            lineWidth: 1.5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineWidth: 1.5
                                }
                            },
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 1,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    }

                },
                series: []
            };

            if (cfg) {
                return _.merge(dc, cfg);
            }
            return dc;

        }; // function new

        this.globalConfig = {
            //highstock
            //useHighStocks: true,
            //rangeSelector : {
            //    selected : 1
            //},
            // highcharts
            global: {
                useUTC: false
            },
            exporting: {
                enabled: false
            },
            lang: {
                //highstock
                noData: '暂无数据',
                thousandsSep: '',
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                //min: 0,
                //minorTickInterval: 'auto',
                title: '',
                tickColor: '#eee',
                gridLineColor: '#eee'
            },
            //highcharts
            //noData: '暂无数据',
            xAxis: {
                title: '',
                lineColor: 'transparent',
                tickWidth: 0,
                startOnTick: true,
                endOnTick: true,
                showFirstLabel: true,
                showLastLabel: true,
                gridLineColor: '#eee',
                tickColor: '#eee',
                gridLineWidth: 1,
                type: 'datetime',
                dateTimeLabelFormats: {
                    second: '%H:%M:%S',
                    minute: '%b-%e %H:%M',
                    hour: '%H:%M',
                    day: '%b月%e',
                    week: '%b月%e',
                    month: '%y-%b',
                    year: '%Y'
                }
            },
            credits: {
                enabled: false,
                text: '',
                href: '',
                position: {
                    align: 'center'
                }
            },
            title: {
                style: {
                    fontSize: '14px',
                    fontWeight: '800'
                },
                align: 'left',
                text: ''
            },
            subtitle: {
                text: ''
            },
            colors: colorService.colors()
        };

        Highcharts.setOptions(this.globalConfig);
    }]);
