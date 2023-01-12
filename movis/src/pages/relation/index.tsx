import { type NextPage } from "next";
import Head from "next/head";
import type { LinkObject, NodeObject } from "react-force-graph-3d";
import ForceGraph3D from "../../components/ForceGraph3DWrapper";
import Navbar from "../../components/Navbar";
import { useWindowSize } from "@react-hook/window-size";
// import SpriteText from "three-spritetext";

import { api } from "../../utils/api";
import type { MovieData } from "../../utils/myClasses";
import { getGraph } from "../../utils/relationUtils";
import MySlider from "../../components/MySlider";
import { useState } from "react";
import MyCombobox from "../../components/MyCombobox";
import MyListbox from "../../components/MyListbox";
import { useMemo } from "react";

const MyMovieGraph: React.FC<{
  data: MovieData[];
  val1: number;
  val2: number;
}> = (props) => {
  //HTMLInputElement with initial value 5
  const [value, setValue] = useState<number>(5);
  const [highlight, setHighlight] = useState<string>();
  const [width, height] = useWindowSize();
  const [filterkey, setFilterkey] = useState("companies");
  //useMemo getGraph
  // const graph = getGraph(
  //   props.data,
  //   ["keywords"],
  //   [],
  //   "id",
  //   0, //props.val1,
  //   value, //props.val2,
  //   0.01,
  //   10
  // );
  const { graph, keyLength } = useMemo(
    () => getGraph(props.data, [filterkey], [], "id", 0, value, 0.01, 15),
    [filterkey, props.data, value]
  );

  return (
    <>
      <ForceGraph3D
        width={width}
        height={height}
        // backgroundColor={"rgba(0,0,0,0)"}
        // enableNodeDrag={false}
        graphData={graph}
        nodeLabel="name"
        nodeVisibility={(node: NodeObject) => {
          if (node.id?.toString().split("_")[0] === "KEY") {
            return true;
          } else {
            return true;
          }
        }}
        nodeAutoColorBy={(node: NodeObject) => {
          if (node.id?.toString().split("_")[0] === "KEY") {
            return "blue";
          } else {
            return "ghostwhite";
          }
        }}
        linkAutoColorBy={(link: LinkObject) => "red"} //{
        //   if (link?.source?.toString().split("_")[0] === "KEY") {
        //     return "red";
        //   } else {
        //     return "blue";
        //   }
        // }}
        linkWidth={1}
        // onNodeHover={(node: NodeObject | null) => {
        //   if (node == null) {
        //     setHighlight("");
        //   } else {
        //     setHighlight(node.id?.toString());
        //     console.log(node.id);
        //   }
        //   // setHighlights((prev) => [...prev, node.id]);
        // }}
      />
      {/* absolute side bar */}
      <div className="absolute top-0 right-0 h-screen w-1/4 bg-white/30">
        <div className="flex flex-col items-center space-y-5">
          <h1>Side Bar</h1>
          <div className="flex items-center space-x-5 rounded-2xl bg-white/50 px-5 py-3">
            <MyListbox
              keyMap={{
                spoken_languages: "spoken language",
                keywords: "keyword",
                crew: "person",
                genres: "genre",
                countries: "country",
                companies: "company",
              }}
              selected={filterkey}
              setSelected={(str) => {
                setFilterkey(str);
                setValue(10);
              }}
            />
            <input
              type="range"
              min="1"
              step="1"
              max={keyLength.toString()}
              defaultValue={10}
              list="tickmarks"
              value={value.toString()}
              className="h-2 w-full bg-blue-100"
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <h1>{Math.min(value, keyLength)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const Relation: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2018,
    maxYear: 2022,
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
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {movies != null ? (
          <MyMovieGraph data={movies} val1={10} val2={0.01} />
        ) : (
          // ""
          <div className="flex h-96 flex-col items-center justify-center">
            <h1 className="text-4xl text-white">Loading...</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default Relation;
