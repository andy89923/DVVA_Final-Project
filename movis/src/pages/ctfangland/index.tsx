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
  ArcElement,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  ChartOptions,
  convertDicttoChartData,
  getTopElementCount,
} from "../../utils/chartUtils";

import { Carousel, ListGroup } from "flowbite-react";
import { getCountDict } from "../../utils/relationUtils";
import { Company } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
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
  const movies: MovieData[] = props.data.reduce((a, b) => {
    return a.concat(b);
  });

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
const MyLinePlot: React.FC<{
  companies: Company[];
  data: CompanyData[];
  title: string;
  attr: string;
}> = (props) => {
  const options = {
    spanGaps: true,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
        text: "Line Chart",
      },
    },
  };

  const dateToStr = (date: Date | undefined) => {
    if (date == undefined) return "1900-00-00";
    return `${date.getFullYear()}-${("0" + (1 + date.getMonth())).slice(-2)}-${(
      "0" + date.getDay()
    ).slice(-2)}`;
  };

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  const all_labels = props.data.map((val) => {
    return val.map((movie) => {
      return dateToStr(movie.release_date);
    });
  });

  const labels = all_labels
    .reduce((a, b) => {
      return a.concat(b);
    })
    .filter(onlyUnique);

  labels.sort();

  const data = {
    labels: labels,
    datasets: props.data.map((com, idx) => {
      return {
        label: props.companies[idx]?.name,
        data: labels.map((date) => {
          for (var i = 0; i < com.length; i++) {
            if (Object.is(dateToStr(com[i]?.release_date), date)) {
              if (props.attr === "averageRating") return com[i]?.averageRating;
              if (props.attr === "budget")
                return com[i]?.budget === 0 ? NaN : com[i]?.budget;
              if (props.attr === "revenue")
                return com[i]?.revenue === 0 ? NaN : com[i]?.revenue;
              if (props.attr === "popularity") return com[i]?.popularity;
            }
          }
          return NaN;
        }),
        borderColor: brdr_color_maps[idx],
        backgroundColor: back_color_maps[idx],
        borderWidth: 1,
        stepped: false,
      };
    }),
  };

  return (
    <div className="h-full w-full">
      <h1>{props.title}</h1>
      <Line options={options} data={data} />
    </div>
  );
};

const back_color_maps: string[] = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
];

const brdr_color_maps: string[] = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
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
      <Bar data={data} options={ChartOptions(null, true, false)} />
    </div>
  );
};

const MyDoughnut: React.FC<{
  companies: Company[];
  data: CompanyData[];
  title: string;
  attr: string;
}> = (props) => {
  const labels: string[] = props.companies.map((data) => {
    return data.name;
  });

  const count: number[] = props.data.map((data) => {
    const tmp = data.filter((mov) => {
      return mov["averageRating"] >= 7;
    });
    return tmp.length;
  });

  const config = {
    rotation: true,
    spacing: 0,
    hoverOffset: 50,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Count#",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Movies",
        data: count,
        backgroundColor: back_color_maps,
        borderColor: brdr_color_maps,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut options={config} data={data} />
    </>
  );
};

const MyListGroupElement: React.FC<{
  selected: Company[];
  setSelected: any;
}> = (props) => {
  return (
    <>
      <ListGroup>
        {props.selected.map((data) => {
          return <ListGroup.Item>{data.name}</ListGroup.Item>;
        })}
      </ListGroup>
    </>
  );
};

const CTFHome: NextPage = () => {
  const { data: companies } = api.getAll.company.useQuery();
  const [selected, setSelected] = useState<Company[]>([
    { id: 1, name: "Pixar" },
    { id: 1947, name: "DreamWorks Animation" },
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
                <MyListGroupElement
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
                  <MyLinePlot
                    companies={selected}
                    data={companyData}
                    title="Movie Ratings"
                    attr="averageRating"
                  />
                </div>
              </ZoomCard>

              <div className="flex flex-col gap-4">
                <ZoomCard title="Movie Budget">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot
                      companies={selected}
                      data={companyData}
                      title="Movie Budget"
                      attr="budget"
                    />
                  </div>
                </ZoomCard>

                <ZoomCard title="Movie Revenue">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot
                      companies={selected}
                      data={companyData}
                      title="Movie Revenue"
                      attr="revenue"
                    />
                  </div>
                </ZoomCard>
              </div>

              <div className="flex flex-col gap-4">
                <ZoomCard title="Movie Popularity">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyLinePlot
                      companies={selected}
                      data={companyData}
                      title="Movie Popularity"
                      attr="popularity"
                    />
                  </div>
                </ZoomCard>

                <ZoomCard title="Rating 7+ Movies">
                  <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                    <MyDoughnut
                      companies={selected}
                      data={companyData}
                      title="Movie Popularity"
                      attr="popularity"
                    />
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
