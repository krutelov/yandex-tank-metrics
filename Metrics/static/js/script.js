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

        netCodeData = netCode();

        d3.select('#chart3').append('svg')
            .datum(netCodeData)
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
                        Distribution.push({data: test_data[i].data.overall.interval_real.hist.data[j], bins: test_data[i].data.overall.interval_real.hist.bins[j]});
                    }
                }
            }
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
                    Distribution2.push({data: Distribution[i].data , bins: Distribution[i].bins });
                    $(".distributio").append('<tr><td>' + Distribution[i].data + '</td><td>' + Distribution[i].bins + '</td></tr>');
                    i++;
                    dataDistribution = 0;
                }else{
                    dataDistribution += Distribution[i].data;
                    Distribution2.push({data: dataDistribution , bins: Distribution[i-1].bins });
                    $(".distributio").append('<tr><td>' + dataDistribution + '</td><td>' + Distribution[i-1].bins + '</td></tr>');
                    dataDistribution = 0;
                }
            }
            Distribution2.push({data: dataDistribution , bins: Distribution[Distribution.length-1].bins });
            $(".distributio").append('<tr><td>' + dataDistribution + '</td><td>' + Distribution[Distribution.length-1].bins + '</td></tr>');
        }
        Distribution()

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
        var httpCode = [];
        var httpCodeGraf = [];
        var obj = {};
        function get_random_color() {
        var randomcolor;
            randomcolor="#"+((1<<24)*Math.random()|0).toString(16);
            return randomcolor;
        }
        for (var i = 0; i < test_data.length; i++) {
            if (Object.keys(test_data[i].data.overall.proto_code["count"]).length == 1) {
                var str = Object.keys(test_data[i].data.overall.proto_code["count"]);
                obj[str] = "true333";
            }else{
                for(var j = 0; j < Object.keys(test_data[i].data.overall.proto_code["count"]).length; j++){
                    var str = Object.keys(test_data[i].data.overall.proto_code["count"])[j];
                    obj[str] = true;
                }
            }
        }

        var arr = Object.keys(obj);
        var bar = String(arr).split(',');
        function httpCodePush1(j){
            var ob = [];
            for (var i = 0; i < Object.keys(obj).length; i++) {
                if (Object.keys(test_data[j].data.overall.proto_code["count"]).length == 1) {
                    if (bar[i] == Object.keys(test_data[j].data.overall.proto_code["count"])) {
                        ob.push(test_data[j].data.overall.proto_code["count"][bar[i]]);
                    }else{
                        ob.push(0);
                    }
                }else{
                    for(var p = 0; p < Object.keys(test_data[j].data.overall.proto_code["count"]).length; p++){
                        //console.log(Object.keys(test_data[j].data.overall.net_code["count"]));
                    }
                }

            }
            return ob;
        }
        for (var i = 0; i < test_data.length; i++) {
            httpCode.push({ts: test_data[i].stats.ts, value : httpCodePush1(i)});
        }
        function linehttpCode (bar, o){
            lineObj = [];
            for (var i = 0; i < httpCode.length; i++) {
                lineObj.push({x: httpCode[i].ts*1000, y: httpCode[i].value[o]});
            }
            return {area: true, values: lineObj, key: "cod_" + bar, color: get_random_color(), fillOpacity: .1};
        }
        for (var i = 0; i < bar.length; i++) {
            httpCodeGraf.push(linehttpCode(bar[i], i));
        }

        return httpCodeGraf;
    }
    function netCode() {
        var netCode = [];
        var netCodeGraf = [];
        var obj = {};
        function get_random_color() {
        var randomcolor;
            randomcolor="#"+((1<<24)*Math.random()|0).toString(16);
            return randomcolor;
        }
        for (var i = 0; i < test_data.length; i++) {
            if (Object.keys(test_data[i].data.overall.net_code["count"]).length == 1) {
                var str = Object.keys(test_data[i].data.overall.net_code["count"]);
                obj[str] = "true333";
            }else{
                for(var j = 0; j < Object.keys(test_data[i].data.overall.net_code["count"]).length; j++){
                    var str = Object.keys(test_data[i].data.overall.net_code["count"])[j];
                    obj[str] = true;
                }
            }
        }

        var arr = Object.keys(obj);
        var bar = String(arr).split(',');
        function netCodPush1(j){
            var ob = [];
            for (var i = 0; i < Object.keys(obj).length; i++) {
                if (Object.keys(test_data[j].data.overall.net_code["count"]).length == 1) {
                    if (bar[i] == Object.keys(test_data[j].data.overall.net_code["count"])) {
                        ob.push(test_data[j].data.overall.net_code["count"][bar[i]]);
                    }else{
                        ob.push(0);
                    }
                }else{
                    for(var p = 0; p < Object.keys(test_data[j].data.overall.net_code["count"]).length; p++){
                        //console.log(Object.keys(test_data[j].data.overall.net_code["count"]));
                    }
                }

            }
            return ob;
        }
        for (var i = 0; i < test_data.length; i++) {
            netCode.push({ts: test_data[i].stats.ts, value : netCodPush1(i)});
        }
        function lineCod (bar, o){
            lineObj = [];
            for (var i = 0; i < netCode.length; i++) {
                lineObj.push({x: netCode[i].ts*1000, y: netCode[i].value[o]});
            }
            return {area: true, values: lineObj, key: "net_" + bar, color: get_random_color(), fillOpacity: .1};
        }
        for (var i = 0; i < bar.length; i++) {
            netCodeGraf.push(lineCod(bar[i], i));
        }

        return netCodeGraf;
    }

