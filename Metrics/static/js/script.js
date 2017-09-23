var test_data;
    var legendPosition = "top";

    nv.addGraph(function() {
        var chart;
        chart = nv.models.lineChart()
            .options({
                duration: 300,
                useInteractiveGuideline: true
            })
        ;

        chart.xAxis.tickFormat(function(d) {
            return d3.time.format('%H:%M:%S')(new Date(d))
        }).showMaxMin(false);

        chart.padData(true)

        chart.yAxis
            .axisLabel('ms')
            .tickFormat(function(d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            })
        ;

        Quantilesdata = Quantiles();

        d3.select('#chart1').append('svg')
            .datum(Quantilesdata)
            .call(chart);
        nv.utils.windowResize(chart.update);

        return chart;
    });
    nv.addGraph(function() {
        var chart;
        chart = nv.models.lineChart()
            .options({
                duration: 300,
                useInteractiveGuideline: true
            })
        ;

        chart.xAxis.tickFormat(function(d) {
            return d3.time.format('%H:%M:%S')(new Date(d))
        }).showMaxMin(false);

        chart.padData(true)

        chart.yAxis
            .axisLabel('ms')
            .tickFormat(function(d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            })
        ;

        httpCodeData = httpCode();

        d3.select('#chart2').append('svg')
            .datum(httpCodeData)
            .call(chart);
        nv.utils.windowResize(chart.update);

        return chart;
    });

    function Quantiles() {
        var curve98 = [],
            curve95 = [],
            curve90 = [],
            curve85 = [],
            curve80 = [],
            curve75 = [],
            curve50 = []
            ;
        var Quantiles = [];
        function Distribution(){
            var Distribution =[];
            for (var i = 0; i < test_data.length; i++) {
                if(0 < test_data[i].data.overall.interval_real.hist.bins.length){
                    for(var j = 0; j < test_data[i].data.overall.interval_real.hist.bins.length; j++){
                        Distribution.push({test_data: test_data[i].data.overall.interval_real.hist.data[j], bins: test_data[i].data.overall.interval_real.hist.bins[j]});
                    }
                }
            }
            console.log(Distribution[0].bins);
            function compareAge(personA, personB) {
              return personA.bins - personB.bins;
            }
            Distribution.sort(compareAge);
            var dataDistribution = 0;
            var Distribution2 = [];
            for (var i = 1; i < Distribution.length; i++) {
                if (Distribution[i].bins == Distribution[i-1].bins) {
                    dataDistribution += Distribution[i-1].data;
                }else if(Distribution[i].bins != Distribution[i-1].bins || Distribution[i].bins != Distribution[i+1].bins){
                    Distribution2.push({test_data: Distribution[i].data , bins: Distribution[i].bins });
                    $(".distributio").append('<tr><td>' + Distribution[i].data + '</td><td>' + Distribution[i].bins + '</td></tr>');
                    console.log(dataDistribution + " --- " + Distribution[i].bins + "  -----------  " + i)
                    i++;
                    dataDistribution = 0;
                }else{
                    dataDistribution += Distribution[i].data;
                    Distribution2.push({test_data: dataDistribution , bins: Distribution[i-1].bins });
                    $(".distributio").append('<tr><td>' + dataDistribution + '</td><td>' + Distribution[i-1].bins + '</td></tr>');
                    dataDistribution = 0;
                }
            }
            Distribution2.push({test_data: dataDistribution , bins: Distribution[Distribution.length-1].bins });
            $(".distributio").append('<tr><td>' + dataDistribution + '</td><td>' + Distribution[Distribution.length-1].bins + '</td></tr>');
        }
        Distribution()

        console.log(test_data[0].data.overall.interval_real.q.value);
        for (var i = 0; i < test_data.length; i++) {
            Quantiles.push({ts: test_data[i].stats.ts, value : test_data[i].data.overall.interval_real.q.value});
        }

        for (var i = 0; i < Quantiles.length; i++) {
            
            curve50.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[0]});
            curve75.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[1]});
            curve80.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[2]});
            curve85.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[3]});
            curve90.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[4]});
            curve95.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[5]});
            curve98.push({x: Quantiles[i].ts*1000, y: Quantiles[i].value[6]});
        }
        //console.log(sin2);

        return [
            {
                area: true,
                values: curve98,
                key: "98%",
                color: "#00ff39",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve95,
                key: "95%",
                color: "#7ffc8a",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve90,
                key: "90%",
                color: "#fffa36",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve85,
                key: "85%",
                color: "#ff9b00",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve80,
                key: "80%",
                color: "#ff6c00",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve75,
                key: "75%",
                color: "#f8460e",
                fillOpacity: .1
            },
            {
                area: true,
                values: curve50,
                key: "50%",
                color: "#ff0000",
                fillOpacity: .1
            }
            /*{
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            },
            {
                values: rand,
                key: "Random Points",
                color: "#2222ff"
            },
            {
                values: rand2,
                key: "Random Cosine",
                color: "#667711",
                strokeWidth: 3.5
            },
            {
                area: true,
                values: sin2,
                key: "Fill opacity",
                color: "#EF9CFB",
                fillOpacity: .1
            }*/
        ];
    }
    function httpCode() {
        var cod200 = [],
            cod500 = [],
            cod404 = [],
            cod0 = []
            ;
        var httpCode = [];
        
        
        for (var i = 0; i < test_data.length; i++) {

            function prov(p){
                if(test_data[i].data.overall.proto_code.count[p] != undefined) return test_data[i].data.overall.proto_code.count[p];
                else return 0;
            }
            httpCode.push({ts: test_data[i].stats.ts, value :[prov(200), prov(404), prov(500), prov(0)]});

        }
        console.log(httpCode);
        for (var i = 0; i < httpCode.length; i++) {
            cod200.push({x: httpCode[i].ts*1000, y: httpCode[i].value[0]});
            cod500.push({x: httpCode[i].ts*1000, y: httpCode[i].value[1]});
            cod404.push({x: httpCode[i].ts*1000, y: httpCode[i].value[2]});
            cod0.push({x: httpCode[i].ts*1000, y: httpCode[i].value[3]});
        }
        console.log(cod500);

        return [
            {
                area: true,
                values: cod200,
                key: "cod200",
                color: "#00ff39",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod500,
                key: "cod500",
                color: "#7ffc8a",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod404,
                key: "cod404",
                color: "#fffa36",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod0,
                key: "cod0",
                color: "#fffa36",
                fillOpacity: .1
            }
            /*{
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            },
            {
                values: rand,
                key: "Random Points",
                color: "#2222ff"
            },
            {
                values: rand2,
                key: "Random Cosine",
                color: "#667711",
                strokeWidth: 3.5
            },
            {
                area: true,
                values: sin2,
                key: "Fill opacity",
                color: "#EF9CFB",
                fillOpacity: .1
            }*/
        ];
    }
    function netCode() {
        var cod200 = [],
            cod500 = [],
            cod404 = [],
            cod0 = []
            ;
        var httpCode = [];
        
        
        for (var i = 0; i < test_data.length; i++) {

            function prov(p){
                if(test_data[i].data.overall.proto_code.count[p] != undefined) return test_data[i].data.overall.proto_code.count[p];
                else return 0;
            }
            httpCode.push({ts: test_data[i].stats.ts, value :[prov(200), prov(404), prov(500), prov(0)]});

        }
        console.log(httpCode);
        for (var i = 0; i < httpCode.length; i++) {
            cod200.push({x: httpCode[i].ts*1000, y: httpCode[i].value[0]});
            cod500.push({x: httpCode[i].ts*1000, y: httpCode[i].value[1]});
            cod404.push({x: httpCode[i].ts*1000, y: httpCode[i].value[2]});
            cod0.push({x: httpCode[i].ts*1000, y: httpCode[i].value[3]});
        }
        console.log(cod500);

        return [
            {
                area: true,
                values: cod200,
                key: "cod200",
                color: "#00ff39",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod500,
                key: "cod500",
                color: "#7ffc8a",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod404,
                key: "cod404",
                color: "#fffa36",
                fillOpacity: .1
            },
            {
                area: true,
                values: cod0,
                key: "cod0",
                color: "#fffa36",
                fillOpacity: .1
            }
        ];
    }
