import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import MyCombobox from "../../components/MyCombobox";
import Navbar from "../../components/Navbar";
import SubsetPicker from "../../components/SubsetPicker";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";
import type { MovieData, Subset } from "../../utils/myClasses";
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
  LineElement
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import { ChartOptions, getTopElementCount } from "../../utils/chartUtils";

import { Carousel } from "flowbite-react";

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

const CarouselElement = (data) => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <img src={ data['url'] }></img>
    </div>
  );
}

const test_poster_url = [
  "https://m.media-amazon.com/images/I/71aBLaC4TzL._AC_SL1330_.jpg",
  "https://m.media-amazon.com/images/I/61QPrqydVoL._AC_SY679_.jpg",
  "https://m.media-amazon.com/images/I/714hR8KCqaL.jpg"
];

const MyCarousel = () => {

  let element  = test_poster_url;

  return (
    <Carousel slideInterval={3000}>
    { element.map((val) => (
      <CarouselElement url={val} />
    ))}
    </Carousel>
  );
}

const MyLinePlot = () => {
  return (

  <Line 
    datasetIdKey='id'
    data={{
      labels: ['Jun', 'Jul', 'Aug'],
      datasets: [
        {
          id: 1,
          label: '',
          data: [5, 6, 7],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          id: 2,
          label: '',
          data: [3, 2, 1],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    }}/>
  );
};

const MyBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const { labels, data: countArr } = getTopElementCount(
    props.data,
    ["genres"],
    [],
    "name",
    10
  );


  const data = {
    labels: labels,
    datasets: [
      {
        label: "2001 Movies",
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={ChartOptions("Genre Count", true)} />;
};

const CTFHome: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001,
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-left font-extrabold tracking-tight text-white">
            <span className="text-[hsl(295,32%,69%)]">CTFang</span>
          </div>
        </div>

        {movies != null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold">Top Rating Movies</h3>
              <MyCarousel />
            </div>

            <ZoomCard title="Movies Genres Compare">
              <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                <MyBarPlot data={movies} />
              </div>
            </ZoomCard>

            <ZoomCard title="Line">
              <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                <MyLinePlot />
              </div>
            </ZoomCard>

          </div>
        ) : (
          <h1 className="text-2xl font-bold text-white">Querying Data...</h1>
        )}
      </main>
    </>
  );
};

export default CTFHome;