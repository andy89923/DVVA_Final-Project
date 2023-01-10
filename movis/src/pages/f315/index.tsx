import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { api } from "../../utils/api";
import Map from "./geo-map";
import ZoomCard from "../../components/ZoomCard";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
        </div>
        <ZoomCard title="Production count by Country">
          <div className="flex flex-col gap-4 rounded-xl bg-white/90 p-4 text-lg text-black hover:bg-white/100">
            <Map />
          </div>
        </ZoomCard>
      </main>
    </>
  );
};

export default Home;
