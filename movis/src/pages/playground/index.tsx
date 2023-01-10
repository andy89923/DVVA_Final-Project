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
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "../../utils/chartUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  // autocolors
);

type KeyMap = {
  [key: string]: number;
};

const MyBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const genreCountDict = props.data.reduce(
    (acc: KeyMap, movie) => {
      movie.genres.forEach((genre) => {
        const genreType = genre.name;
        if (acc[genreType] == null) {
          acc[genreType] = 1;
        } else {
          acc[genreType] += 1;
        }
      });
      return acc;
    },
    AllGenres.reduce((acc: KeyMap, name) => ((acc[name] = 0), acc), {})
  );
  const sorted = Object.entries(genreCountDict).sort((a, b) => b[1] - a[1]);
  const sortedLabels = sorted.map((entry) => entry[0]);
  const sortedData = sorted.map((entry) => entry[1]);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "2001 Movies",
        data: sortedData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={ChartOptions("Genre Count", true)} />;
};

const Playground: NextPage = () => {
  // const { data: movies } = api.movie.getAll.useQuery();
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001,
  });

  // const { data: genres } = api.getAll.genre.useQuery();
  // console.log(genres?.map((d) => d.name));

  const [subsets, setSubsets] = useState<Subset[]>([]);
  const [selected, setSelected] = useState<MovieData[]>([]); // test for combobox

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-center font-extrabold tracking-tight text-white">
            <h1 className="text-5xl sm:text-[5rem]">Welcome</h1>
            <h2 className="text-3xl sm:text-[3rem]">
              <span className="text-[hsl(295,32%,69%)]">to My Playground</span>
            </h2>
          </div>
        </div>
        {movies != null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <ZoomCard title="Fuzzy Search Movies">
              <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
                <MyCombobox
                  data={movies}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </ZoomCard>
            <ZoomCard title="Add New Subset">
              <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
                <button
                  className="rounded bg-[#2e026d] py-2 px-4 font-bold text-white hover:bg-[#15162c]"
                  onClick={() => {
                    const newSubset: Subset = {
                      name: "New Subset",
                      data: movies,
                      selected: false,
                    };
                    setSubsets([...subsets, newSubset]);
                  }}
                >
                  Add a Subset With Full Movie Data
                </button>
              </div>
            </ZoomCard>
            <ZoomCard title="Multi-select Subsets">
              <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
                <SubsetPicker subsets={subsets} setSubsets={setSubsets} />
              </div>
            </ZoomCard>

            <ZoomCard title="Genre Count">
              <div className="flex flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
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

export default Playground;
