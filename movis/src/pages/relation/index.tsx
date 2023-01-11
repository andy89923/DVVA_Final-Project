import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import Navbar from "../../components/Navbar";
import ZoomCard from "../../components/ZoomCard";
// import SpriteText from "three-spritetext";

import { api } from "../../utils/api";
import { getKeywordGraph } from "../../utils/relationUtils";

const Overview: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // const { data: graph } = api.graph.linkRatingBetween.useQuery({
  //   minRating: 10,
  //   maxRating: 10,
  // });
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2018,
    maxYear: 2020,
  });

  const graph = movies != null ? getKeywordGraph(movies, 0, 50) : null;

  console.log(graph);

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
          {graph != null && <ForceGraph3D graphData={graph} />}
          {/* <ForceGraph2D graphData={graph} /> */}
        </div>
      </main>
    </>
  );
};

export default Overview;
