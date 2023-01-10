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
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ChartOptions, ElementCount } from "../../utils/chartUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const { labels, data: countArr } = ElementCount(
    props.data,
    ["genres"],
    ["name"],
    10
  );

  const data = {
    labels: labels,
    datasets: [{
        label: "2001 Movies",
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        borderWidth: 1,
      }
    ],
  };

  return <Bar data={data} options={ChartOptions("Genre Count", true)} />;
};

const CTFHome: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001
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
              <h3 className="text-2xl font-bold">Fixed</h3>
              

            </div>

            <ZoomCard title="Movies Genres Compare">
              <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                <MyBarPlot data={movies} />
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
