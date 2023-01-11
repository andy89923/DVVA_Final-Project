import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import Navbar from "../../components/Navbar";
import ZoomCard from "../../components/ZoomCard";
// import SpriteText from "three-spritetext";

import { api } from "../../utils/api";
import { MovieData } from "../../utils/myClasses";
import {
  getKeywordGraph,
  getGraph,
  getCountDict,
} from "../../utils/relationUtils";

const myMovieGraph: React.FC<{ movies: MovieData[] }> = (props) => {
  const graph =
    props.movies != null
      ? getGraph(props.movies, ["companies"], [], "id", 0, 50, 0.01, 10)
      : null;
  return <ForceGraph3D graphData={graph} />;
};

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

  // const graph =
  //   movies != null
  //     ? getGraph(movies, ["keywords"], [], "id", 0, 50, 10, 0.1)
  //     : null;

  //   const keyDict = (movies != null) ? getCountDict(movies, ["keywords"], [], "id", 0, 50) : null;
  //   const dataNodes = dataArr.map((data) => ({
  //     id: data[key],
  //     name: data.title,
  //     val: val1,
  // }));
  // const graph = keyDict != null ? getKeywordGraph(keyDict) : null;

  // const graph =
  //   movies != null
  //     ? getGraph(movies, ["companies"], [], "id", 0, 50, 0.01, 10)
  //     : null;

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
          {movies != null && <myGraph data={movies} />}
        </div>
      </main>
    </>
  );
};

export default Overview;
