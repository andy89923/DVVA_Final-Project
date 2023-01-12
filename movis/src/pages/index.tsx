import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { api } from "../utils/api";
import { useContext } from "react";
import { MdAnalytics } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";

import DataRangeComp from "../components/DataRangeComp";
import { DateContext } from "../utils/DataContext";

const Home: NextPage = () => {
  const { dateRange } = useContext(DateContext);
  const { data: movies } = api.movie.dateRange.useQuery({
    minDate: dateRange.startDate,
    maxDate: dateRange.endDate,
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
      {/* <Navbar /> */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-center font-extrabold tracking-tight text-white">
            <h1 className="text-5xl sm:text-[5rem]">
              Mo
              <span className="text-[hsl(280,100%,70%)]">Vis</span>
            </h1>
            <h2 className="text-3xl sm:text-[3rem]">
              <span className="text-[hsl(295,32%,69%)]">
                The Movies Dataset Visualization
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-center text-2xl font-bold text-white">
              Analyze Movies <br /> Between the Data Range:
            </h3>
            <DataRangeComp />
          </div>

          <div
            className="align-center inline-flex h-32 rounded-md text-2xl shadow-sm"
            role="group"
          >
            <button
              type="button"
              className="inline-flex items-center rounded-l-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
            >
              <MdAnalytics className="mr-2 h-4 w-4" />
              Profile
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-r-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
            >
              <IoMdAnalytics className="mr-2 h-4 w-4" />
              Downloads
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
