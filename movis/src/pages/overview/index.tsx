import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";

interface IProps {
  title?: string;
  number?: number;
  prefix?: string;
}

const NumCard: React.FC<IProps> = (props) => {
  const number = 123456;

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

const Overview: NextPage = () => {
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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
              <div>Movies in between 19XX ~ 20XX</div>
            </div>
            <div className="flex gap-6">
              <NumCard title="Total Number of Movies:" number={123456} />
              <NumCard title="Total Revenue:" prefix="US$" number={123456} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Overview;
