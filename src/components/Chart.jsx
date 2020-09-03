import React, { useRef, useLayoutEffect } from 'react';
import 'core-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Chart = (props) => {
  const lineChart = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [{ 'count': 0, value: 0 }]

    // Create axes
    chart.xAxes.push(new am4charts.ValueAxis());

    // Create value axis
    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.valueX = "count";
    lineSeries.name = "Count";
    lineSeries.strokeWidth = 3;
    lineSeries.strokeDasharray = "5,4";

    lineChart.current = chart

    var bullet = lineSeries.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.isMeasured = false;

    lineSeries.events.on("validated", function () {
      bullet.moveTo(lineSeries.dataItems.last.point);
      bullet.validatePosition();
    });

    return () => {
      lineChart.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    lineChart.current.data = props.data;
  }, [props.data]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}

export default Chart;