import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import * as ChartWordCloud from "chartjs-chart-wordcloud";
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
  ChartWordCloud.WordCloudController,
  ChartWordCloud.WordCloudChart,
  ChartWordCloud.WordElement
);

export default function WordCloud(props: { keywordsCountDict: any }) {
  const chartRef = useRef();
  // chart input format: label arr [] input arr[]
  console.log("props:", props);
  const { keywordsCountDict } = props;
  const labels = [],
    counts = [];
  console.log(keywordsCountDict);
  for (const keyword in keywordsCountDict) {
    labels.push(keyword);
    counts.push(keywordsCountDict[keyword].count);
  }

  return (
    <Chart
      ref={chartRef}
      type="wordCloud"
      data={{
        labels: labels,
        datasets: [
          {
            label: "",
            data: counts,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          word: {
            color: "#cb8bf3",
            hoverColor: "#a22fea",
          },
        },
      }}
    />
  );
}
