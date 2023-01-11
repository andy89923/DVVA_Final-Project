import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import ComCombobox from "../../components/ComCombobox";
import Navbar from "../../components/Navbar";
import SubsetPicker from "../../components/SubsetPicker";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";
import type {
  CompanyData,
  KeyMap,
  MovieData,
  Subset,
} from "../../utils/myClasses";
import { AllGenres } from "../../utils/myClasses";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import {
  ChartOptions,
  convertDicttoChartData,
  getTopElementCount,
} from "../../utils/chartUtils";

import { Carousel } from "flowbite-react";
import { getCountDict } from "../../utils/relationUtils";
import MyListbox from "../../components/MyListbox";
import { Company } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const CarouselElement: React.FC<{ url: string; title: string }> = (props) => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <img src={props["url"]} title={props["title"]}></img>
    </div>
  );
};

// https://flowbite-react.com/carousel/
const MyCarousel: React.FC<{ data: CompanyData[]; size: number }> = (props) => {
  const test_poster_url = [
    "https://m.media-amazon.com/images/I/71aBLaC4TzL._AC_SL1330_.jpg",
    "https://m.media-amazon.com/images/I/61QPrqydVoL._AC_SY679_.jpg",
    "https://m.media-amazon.com/images/I/714hR8KCqaL.jpg",
  ];

  const movies: MovieData[] = props.data.reduce((a, b) => {
    return a.concat(b);
  });

  console.log(movies);

  movies.sort((a, b) => {
    return b["popularity"] - a["popularity"];
  });

  const posterElement = movies
    .map((d) => ({ url: d["poster_url"], title: d["title"] }))
    .slice(0, props.size);

  return (
    <Carousel slideInterval={3000}>
      {posterElement.map((val, idx) => (
        <CarouselElement key={idx} url={val["url"]} title={val["title"]} />
      ))}
    </Carousel>
  );
};

// https://react-chartjs-2.js.org/examples/line-chart/
const MyLinePlot: React.FC<{ data: MovieData[] }> = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Line Chart",
      },
    },
  };
  return (
    <div className="h-full w-full">
      <Line
        options={options}
        data={{
          labels: ["Jun", "Jul", "Aug"],
          datasets: [
            {
              label: "a",
              data: [5, 6, 7],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "b",
              data: [3, 2, 1],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

const back_color_maps: string[] = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(53, 162, 235, 0.5)",
];

const brdr_color_maps: string[] = [
  "rgba(255, 99, 132, 1)",
  "rgb(53, 162, 235)",
];

const MyBarPlot: React.FC<{ companies: Company[]; data: CompanyData[] }> = (
  props
) => {
  const [filterkey, setFilterkey] = useState("genres");

  const countDicts = props.data.map((comp) => {
    return getCountDict(comp, [filterkey], [], "name", 0, undefined);
  });

  const data = {
    labels: AllGenres,
    datasets: countDicts.map((countDict, idx) => {
      const { labels, data: countArr } = convertDicttoChartData(countDict);
      return {
        label: props.companies[idx]?.name,
        data: countArr,
        backgroundColor: back_color_maps[idx],
        borderColor: brdr_color_maps[idx],
        borderWidth: 1,
      };
    }),
  };

  return (
    <div className="h-full w-full">
      <h1>Movies Count</h1>
      <Bar data={data} options={ChartOptions(null, true)} />
    </div>
  );
};

const CTFHome: NextPage = () => {
  const { data: companies } = api.getAll.company.useQuery();
  const [selected, setSelected] = useState<Company[]>([
    { id: 1, name: "Pixar" },
    { id: 2486, name: "Studio Ghibli" },
  ]);

  const { data: companyData } = api.company.betweenYearRange.useQuery({
    companyIds: selected.map((data) => {
      return data.id;
    }),
    minYear: 1900,
    maxYear: 2100,
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {companyData != null && companies != null ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
              <ZoomCard title="Fuzzy Search Company">
                <ComCombobox
                  data={companies}
                  selected={selected}
                  setSelected={setSelected}
                />
              </ZoomCard>

              <ZoomCard title="Movies Genres">
                <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                  <MyBarPlot companies={selected} data={companyData} />
                </div>
              </ZoomCard>

              <ZoomCard title="Movie Ratings">
                <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                  <MyLinePlot data={companyData} />
                </div>
              </ZoomCard>

              <div className="flex flex-col gap-4">
                <ZoomCard title="Movie Budget">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot data={companyData} />
                  </div>
                </ZoomCard>

                <ZoomCard title="Movie Budget">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot data={companyData} />
                  </div>
                </ZoomCard>
              </div>

              <div className="flex flex-col gap-4">
                <ZoomCard title="Movie Budget">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot data={companyData} />
                  </div>
                </ZoomCard>

                <ZoomCard title="Movie Budget">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot data={companyData} />
                  </div>
                </ZoomCard>
              </div>

              <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
                <h3 className="text-2xl font-bold">Top Rating Movies</h3>
                <MyCarousel data={companyData} size={10} />
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-white">Querying Data...</h1>
        )}
      </main>
    </>
  );
};

export default CTFHome;
