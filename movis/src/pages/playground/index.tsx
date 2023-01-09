import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import MyCombobox from "../../components/MyCombobox";
import Navbar from "../../components/Navbar";
import SubsetPicker from "../../components/SubsetPicker";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";
import type { MovieData, Subset } from "../../utils/myClasses";

const Playground: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001,
  });
  // const { data: movies } = api.movie.getAll.useQuery();

  const testSubsets: Subset[] =
    movies != null
      ? [
          {
            name: "Test Subset 1",
            data: movies,
            selected: false,
          },
          {
            name: "Test Subset 2",
            data: movies,
            selected: false,
          },
          {
            name: "Test Subset 3",
            data: movies,
            selected: false,
          },
        ]
      : [];

  const [subsets, setSubsets] = useState<Subset[]>(testSubsets);
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <ZoomCard title="Link 1">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">First Steps →</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </Link>
            </ZoomCard>
            <ZoomCard title="Link 2">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="https://create.t3.gg/en/introduction"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">Documentation →</h3>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </ZoomCard>
          </div>
        </div>
        {movies != null && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold">Create Subsets:</h3>
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
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
              <MyCombobox
                data={movies}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
              <SubsetPicker subsets={subsets} setSubsets={setSubsets} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Playground;
