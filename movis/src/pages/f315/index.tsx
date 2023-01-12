import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { api } from "../../utils/api";
import Map from "./geo-map";
import ZoomCard from "../../components/ZoomCard";
import WordCloud from "./word-cloud";
import { getCountDict } from "../../utils/relationUtils";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2018,
    maxYear: 2020,
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
        {movies != null ? (
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
                <WordCloud></WordCloud>
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

export default Home;
