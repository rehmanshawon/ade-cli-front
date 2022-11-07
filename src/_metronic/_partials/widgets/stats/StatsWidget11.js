/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect, useState } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import { useHtmlClassService } from "../../../layout";

export function StatsWidget11({ className, data }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.base.warning"
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.light.warning"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_7_chart");

    if (!element) {
      return;
    }

    if (data) {
      const options = getChartOption(layoutProps, data);
      const chart = new ApexCharts(element, options);
      chart.render();
      return function cleanUp() {
        chart.destroy();
      };
    }
  }, [layoutProps, data]);

  return (
    <div
      className={`card card-custom shadow rounded ${className}`}
      //style={{ background: "#fef4de" }}
    >
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <div className="d-flex flex-column mr-2">
            <a
              href="#"
              className="text-dark-75 text-hover-primary font-weight-bolder font-size-h5"
            >
              Last Week Sales Amount
            </a>
            <span className="text-muted font-weight-bold mt-2">
              Your Weekly Sales Chart
            </span>
          </div>
          <span className="p-2 badge badge-warning">
            <span className="symbol-label font-weight-bolder font-size-h2">
              {data &&
                data.orderAmount
                  .reduce((acc, item) => Number(item) + acc, 0)
                  .toLocaleString()}
            </span>
          </span>
        </div>
        <div
          id="kt_stats_widget_7_chart"
          className="card-rounded-bottom"
          style={{ height: "150px" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(layoutProps, data) {
  const options = {
    series: [
      {
        name: "Sales",
        data: data.orderAmount,
      },
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBaseSuccess],
    },
    xaxis: {
      categories: data.dateArray,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        formatter: function(val) {
          return val;
        },
      },
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3,
    },
  };
  return options;
}
