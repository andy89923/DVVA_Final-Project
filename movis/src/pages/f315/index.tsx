import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { api } from "../../utils/api";
import Map from "./geo-map";
import ZoomCard from "../../components/ZoomCard";
import WordCloud from "./word-cloud";
import { getCountDict } from "../../utils/relationUtils";
import type { MovieData } from "../../utils/myClasses";

// ChartJS stuff
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ChartOptions, convertDicttoChartData } from "../../utils/chartUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  // autocolors
);

interface IProps {
  title?: string;
  number?: number;
  prefix?: string;
}

const NumCard: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="flex flex-col justify-center rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
        <div>{props.title}</div>
        <div className="text-4xl font-bold">
          {props.prefix}
          {props.number?.toLocaleString("en-US")}
        </div>
      </div>
    </>
  );
};

const GenreBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const TOP_COUNT = 20;
  const countDict = getCountDict(
    props.data,
    ["genres"],
    [],
    "name",
    0,
    TOP_COUNT
  );
  const { labels, data: countArr } = convertDicttoChartData(countDict);

  const data = {
    labels: labels,
    datasets: [
      {
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    ...ChartOptions(null, false, false),
    indexAxis: "y" as const,
    scales: {},
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

const TopXHorizontalBarChart: React.FC<{
  movies: MovieData[];
  topN: number;
  chosenKey: string;
}> = (props) => {
  const { movies, topN: TOP_COUNT, chosenKey: key } = props;

  console.log("movies", movies);
  const countDict = getCountDict(
    movies,
    [key], // ["genres"]
    [],
    "name",
    0,
    TOP_COUNT
  );
  const { labels, data: countArr } = convertDicttoChartData(countDict);
  const data = {
    labels: labels,
    datasets: [
      {
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    ...ChartOptions(null, false, false),
    indexAxis: "y" as const,
    scales: {},
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

const Home: NextPage = () => {
  const minYear = 2010,
    maxYear = 2011;

  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: minYear,
    maxYear: maxYear,
  });

  let movieCount = 0,
    totalRevenue = 0;
  let keywordsDict = {};
  // Horizontal Bar Chart
  const topN = 20;

  if (movies === undefined) {
    console.log("waiting for data");
  } else {
    // compute movie count
    movieCount = movies.length;

    // compute total revenue
    totalRevenue = movies.reduce(
      (accumulator, currentMovie) => accumulator + currentMovie.revenue,
      0
    );
    // parse keywords
    keywordsDict = getCountDict(movies, ["keywords"], [], "name", 0, 100);
  }

  return (
    <>
      <Head>
        <title>MoVis</title>
        <meta
          name="description"
          content="A Comprehensive Visualization System for The Movies Dataset"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {movies != null ? (
          <>
            <div className="container flex flex-col py-6">
              <div className="top-section flex w-full flex-row justify-between gap-3">
                <div className="text-left font-extrabold text-white">
                  <div className="text-3xl sm:text-5xl">
                    Mo
                    <span className="text-[hsl(280,100%,70%)]">Vis</span>
                  </div>
                  <div className="text-3xl text-[hsl(295,32%,69%)] sm:text-[2rem]">
                    Trends Visualization
                  </div>
                  <div>
                    Movies in between {minYear} ~ {maxYear}
                  </div>
                </div>
                <div className="flex gap-6">
                  <NumCard
                    title="Total Number of Movies:"
                    number={movieCount}
                  />
                  <NumCard
                    title="Total Revenue:"
                    prefix="US$"
                    number={totalRevenue}
                  />
                </div>
              </div>
            </div>
            <div className="grow-1 grid h-full w-full grid-cols-6 grid-rows-4 gap-4">
              <ZoomCard
                title="Production count by Country"
                className="col-span-3 row-span-2"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
                  <Map data={movies} />
                </div>
              </ZoomCard>
              <ZoomCard
                title="Most frequent keyword in movie"
                className="col-span-3 row-span-2"
              >
                <div className="flex h-full flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
                  <WordCloud keywordsCountDict={keywordsDict} />
                </div>
              </ZoomCard>
              <ZoomCard title="Genres Count" className="col-span-2 row-span-2">
                <div className="flex h-full flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
                  <GenreBarPlot data={movies} />
                </div>
              </ZoomCard>
              <ZoomCard
                title="Top 10 Actors With the Most Movies"
                className="col-span-2 row-span-2"
              >
                <div className="flex h-full flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
                  <TopXHorizontalBarChart
                    movies={movies}
                    chosenKey="crew"
                    topN={topN}
                  />
                </div>
              </ZoomCard>
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-white">Querying Data...</h1>
        )}
      </main>
    </>
  );
};

export default Home;
