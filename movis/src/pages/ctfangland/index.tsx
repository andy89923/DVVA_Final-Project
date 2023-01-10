import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import MyCombobox from "../../components/MyCombobox";
import Navbar from "../../components/Navbar";
import SubsetPicker from "../../components/SubsetPicker";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";
import type { MovieData, Subset } from "../../utils/myClasses";
import { AllGenres } from "../../utils/myClasses";

import { Bar } from "react-chartjs-2";
import { ChartOptions, ElementCount } from "../../utils/chartUtils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const MyBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const { labels, data: countArr } = ElementCount(
    props.data,
    ["genres"],
    ["name"]
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "2001 Movies",
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={ChartOptions("Genre Count", true)} />;
};

const Home: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001,
  });



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
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-center font-extrabold tracking-tight text-white">
            <h1 className="text-5xl sm:text-[5rem]">
              Mo
              <span className="text-[hsl(280,100%,70%)]">Vis</span>
            </h1>
            <h2 className="text-3xl sm:text-[3rem]">
              <span className="text-[hsl(295,32%,69%)]">
                The Movies Dataset Visualization from CTFang
              </span>
            </h2>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Fixed</h3>
          </div>
        </div>

        <ZoomCard title="Movies Genres">
          <div className="flex flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">

            <MyBarPlot data={movies} />

          </div>
        </ZoomCard>



      </main>
    </>
  );
};

export default Home;
