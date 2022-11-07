/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect, useState } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../../layout";
import { toAbsoluteUrl } from "../../../_helpers";
import { useSelector } from "react-redux";
import Axios from "axios";

export function StatsWidget12({ className, data }) {
  const {
    user: { accessToken, refreshToken },
  } = useSelector((state) => state.auth);

  //const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  // const getData = async () => {
  //   const { data } = await Axios.get(
  //     `${process.env.REACT_APP_API_URL}/dashboard/orderAmountAndCountLastWeek`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //         refreshToken: refreshToken,
  //       },
  //     }
  //   );

  //   if (!data.error) {
  //     setData(data.data);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

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
      colorsThemeBasePrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.base.primary"
      ),
      colorsThemeLightPrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.light.primary"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_12_chart");

    if (!element) {
      return;
    }

    if (data) {
      const options = getChartOption(layoutProps, data);
      const chartnewUsers = new ApexCharts(element, options);
      chartnewUsers.render();
      return function cleanUp() {
        chartnewUsers.destroy();
      };
    }
  }, [layoutProps, data]);

  return (
    <div
      className={`card card-custom shadow rounded ${className}`}
      //style={{ background: "#e1e9ff" }}
    >
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <div className="d-flex flex-column mr-2">
            <a
              href="#"
              className="text-dark-75 text-hover-primary font-weight-bolder font-size-h5"
            >
              Last Week Orders
            </a>
            <span className="text-muted font-weight-bold mt-2">
              Your Weekly Orders Chart
            </span>
          </div>
          <span className="badge badge-primary">
            <span className="symbol-label font-weight-bolder font-size-h2">
              {data && data.orderCount.reduce((acc, item) => item + acc, 0)}
            </span>
          </span>
        </div>
        <div
          id="kt_stats_widget_12_chart"
          className="card-rounded-bottom"
          style={{ height: "150px" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(layoutProps, data) {
  var options = {
    series: [
      {
        name: "Total Order",
        data: data.orderCount,
      },
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
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
      colors: [layoutProps.colorsThemeBasePrimary],
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
      min: 0,
      max: 55,
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
    colors: [layoutProps.colorsThemeLightPrimary],
    markers: {
      colors: [layoutProps.colorsThemeLightPrimary],
      strokeColor: [layoutProps.colorsThemeBasePrimary],
      strokeWidth: 3,
    },
  };
  return options;
}
