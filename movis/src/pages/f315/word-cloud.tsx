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

export default function WordCloud() {
  const chartRef = useRef();
  const words = [
    { key: "word", value: 10 },
    { key: "words", value: 8 },
    { key: "sprite", value: 7 },
    { key: "placed", value: 5 },
    { key: "layout", value: 4 },
    { key: "algorithm", value: 4 },
    { key: "area", value: 4 },
    { key: "layout", value: 4 },
    { key: "algorithm", value: 4 },
    { key: "area", value: 4 },
    { key: "without", value: 3 },
    { key: "step", value: 3 },
    { key: "bounding", value: 3 },
    { key: "retrieve", value: 3 },
    { key: "operation", value: 3 },
    { key: "collision", value: 3 },
    { key: "candidate", value: 3 },
    { key: "32", value: 2 },
    { key: "placement", value: 2 },
    { key: "time", value: 2 },
    { key: "possible", value: 2 },
    { key: "even", value: 2 },
    { key: "simple", value: 2 },
    { key: "starting", value: 2 },
    { key: "previously", value: 2 },
    { key: "move", value: 2 },
    { key: "perform", value: 2 },
    { key: "hierarchical", value: 2 },
    { key: "draw", value: 2 },
    { key: "pixel", value: 2 },
    { key: "data", value: 2 },
    { key: "separately", value: 2 },
    { key: "expensive", value: 2 },
    { key: "pixels", value: 2 },
    { key: "masks", value: 2 },
    { key: "implementation", value: 2 },
    { key: "detection", value: 2 },
  ];

  return (
    <Chart
      ref={chartRef}
      type="wordCloud"
      data={{
        labels: words.map((d: any) => d.key),
        datasets: [
          {
            label: "",
            data: words.map((d) => 10 + d.value * 10),
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
