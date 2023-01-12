import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { api } from "../utils/api";
import { useState } from "react";

import DataRangeComp from "../components/DataRangeComp";

const Home: NextPage = () => {
  const [value, setValue] = useState([new Date(), new Date()]);

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
                The Movies Dataset Visualization
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <DataRangeComp />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
