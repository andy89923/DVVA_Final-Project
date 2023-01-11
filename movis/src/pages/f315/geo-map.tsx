import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import * as ChartGeo from "chartjs-chart-geo";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartGeo.ChoroplethController,
  ChartGeo.ProjectionScale,
  ChartGeo.ColorScale,
  ChartGeo.GeoFeature
);

export default function Map() {
  const chartRef = useRef();
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(
          ChartGeo.topojson.feature(data, data.objects.countries).features
        );
      });
  }, []);

  return (
    <Chart
      ref={chartRef}
      type="choropleth"
      data={{
        labels: countries.map((d: any) => d.properties.name),
        datasets: [
          {
            outline: countries,
            label: "Countries",
            data: countries.map((d: any) => ({
              feature: d,
              value: Math.random() * 10,
            })),
            // color from https://mdigi.tools/color-shades/#9417e2
            backgroundColor: [
              "#f5e8fd",
              "#e0baf8",
              "#cb8bf3",
              "#b75def",
              "#a22fea",
              "#8815d0",
            ],
          },
        ],
      }}
      options={{
        showOutline: true,
        showGraticule: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          projection: {
            axis: "x",
            projection: "equalEarth",
          },
          //   Hide color scale
        },
      }}
    />
  );
}
