import { type NextPage } from "next";
import React, { useMemo } from "react";

import Head from "next/head";
import type { LinkObject, NodeObject } from "react-force-graph-3d";
import ForceGraph3D from "../../components/ForceGraph3DWrapper";
import Navbar from "../../components/Navbar";
import { useWindowSize } from "@react-hook/window-size";
// import SpriteText from "three-spritetext";

import { api } from "../../utils/api";
import type { MovieData } from "../../utils/myClasses";
import { getCountDictV2 } from "../../utils/relationUtils";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { GrStatusGood, GrStatusGoodSmall } from "react-icons/gr";

const toCompareMap = {
  spoken_languages: "Language",
  keywords: "Keyword",
  crew: "Actor",
  genres: "Genre",
  countries: "Country",
  companies: "Company",
} as { [key: string]: string };
const toCompareKeys = Object.keys(toCompareMap);

const SelectionCard: React.FC<{
  title: string;
  max: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  hide: boolean;
  setHide: () => void;
  disable: boolean;
  setDisable: () => void;
}> = (props) => {
  return (
    <div className="flex items-center space-x-5 rounded-2xl bg-white/50 px-5 py-3">
      <h1>{props.title}</h1>
      <input
        type="range"
        min="0"
        step="1"
        max={props.max.toString()}
        defaultValue="0"
        list="tickmarks"
        value={props.value.toString()}
        className="h-2 w-full bg-blue-100"
        onChange={(e) => props.setValue(parseInt(e.target.value))}
      />
      {/* <h1>{props.value}</h1> */}
      <input
        type="text"
        className="h-6 w-16 rounded-md bg-blue-100"
        value={props.value.toString()}
        onChange={(e) => props.setValue(parseInt(e.target.value))}
      />
      <button className="h-6 w-6 rounded-md " onClick={() => props.setHide()}>
        {props.hide ? <BiShow /> : <BiHide />}
      </button>
      <button
        className="h-6 w-6 rounded-md "
        onClick={() => props.setDisable()}
      >
        {props.disable ? <GrStatusGoodSmall /> : <GrStatusGood />}
      </button>
    </div>
  );
};

const MyMovieGraph: React.FC<{
  data: MovieData[];
  val1: number;
  val2: number;
}> = (props) => {
  const [width, height] = useWindowSize();
  const [vLang, setVLang] = useState<number>(0);
  const [vWord, setVWord] = useState<number>(0);
  const [vCrew, setVCrew] = useState<number>(0);
  const [vGnre, setVGnre] = useState<number>(0);
  const [vCtry, setVCtry] = useState<number>(0);
  const [vComp, setVComp] = useState<number>(0);
  const [toHide, setToHide] = useState<boolean[]>(Array(7).fill(false));
  const [toDisable, setToDisable] = useState<boolean[]>(Array(7).fill(false));

  const { countDict: langDict, uniqueCount: langCnt } = useMemo(
    () => getCountDictV2(props.data, ["spoken_languages"], [], "id", 0, vLang),
    [props.data, vLang]
  );
  const { countDict: wordDict, uniqueCount: wordCnt } = useMemo(
    () => getCountDictV2(props.data, ["keywords"], [], "id", 0, vWord),
    [props.data, vWord]
  );
  const { countDict: crewDict, uniqueCount: crewCnt } = useMemo(
    () => getCountDictV2(props.data, ["crew"], [], "id", 0, vCrew),
    [props.data, vCrew]
  );
  const { countDict: gnreDict, uniqueCount: gnreCnt } = useMemo(
    () => getCountDictV2(props.data, ["genres"], [], "id", 0, vGnre),
    [props.data, vGnre]
  );
  const { countDict: ctryDict, uniqueCount: ctryCnt } = useMemo(
    () => getCountDictV2(props.data, ["countries"], [], "id", 0, vCtry),
    [props.data, vCtry]
  );
  const { countDict: compDict, uniqueCount: compCnt } = useMemo(
    () => getCountDictV2(props.data, ["companies"], [], "id", 0, vComp),
    [props.data, vComp]
  );

  const langNodes = useMemo(
    () =>
      Object.values(langDict).map((d) => {
        return {
          id: `Language_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [langDict]
  );
  const wordNodes = useMemo(
    () =>
      Object.values(wordDict).map((d) => {
        return {
          id: `Keyword_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [wordDict]
  );
  const actrNodes = useMemo(
    () =>
      Object.values(crewDict).map((d) => {
        return {
          id: `Actor_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [crewDict]
  );
  const gnreNodes = useMemo(
    () =>
      Object.values(gnreDict).map((d) => {
        return {
          id: `Genre_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [gnreDict]
  );
  const ctryNodes = useMemo(
    () =>
      Object.values(ctryDict).map((d) => {
        return {
          id: `Country_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [ctryDict]
  );
  const compNodes = useMemo(
    () =>
      Object.values(compDict).map((d) => {
        return {
          id: `Company_${d.data.id}`,
          name: d.data.name,
          val: 15,
        };
      }),
    [compDict]
  );

  const movieNodes = useMemo(
    () =>
      props.data.map((data) => {
        return {
          id: `Movie_${data.id}`,
          name: data.title,
          val: 0.01,
        };
      }),
    [props.data]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = props.data.reduce((links, movie) => {
    const entry1 = movie.spoken_languages;
    const entry2 = movie.keywords;
    const entry3 = movie.crew;
    const entry4 = movie.genres;
    const entry5 = movie.countries;
    const entry6 = movie.companies;

    if (!toDisable[1]) {
      entry1.forEach((d) => {
        if (langDict[d.id] != null) {
          links.push({
            source: `Language_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }
    if (!toDisable[2]) {
      entry2.forEach((d) => {
        if (wordDict[d.id] != null) {
          links.push({
            source: `Keyword_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }
    if (!toDisable[3]) {
      entry3.forEach((d) => {
        if (crewDict[d.id] != null) {
          links.push({
            source: `Actor_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }
    if (!toDisable[4]) {
      entry4.forEach((d) => {
        if (gnreDict[d.id] != null) {
          links.push({
            source: `Genre_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }
    if (!toDisable[5]) {
      entry5.forEach((d) => {
        if (ctryDict[d.id] != null) {
          links.push({
            source: `Country_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }
    if (!toDisable[6]) {
      entry6.forEach((d) => {
        if (compDict[d.id] != null) {
          links.push({
            source: `Company_${d.id}`,
            target: `Movie_${movie.id}`,
          });
        }
      });
    }

    return links;
  }, [] as { source: string; target: string }[]);

  const nodes = [];
  !toDisable[0] && nodes.push(...movieNodes);
  !toDisable[1] && nodes.push(...langNodes);
  !toDisable[2] && nodes.push(...wordNodes);
  !toDisable[3] && nodes.push(...actrNodes);
  !toDisable[4] && nodes.push(...gnreNodes);
  !toDisable[5] && nodes.push(...ctryNodes);
  !toDisable[6] && nodes.push(...compNodes);

  const graph = {
    nodes,
    links,
  };

  const nodeComp = (node: NodeObject, comp: string) =>
    node.id?.toString().split("_")[0] === comp;

  const toggleIdx = (idx: number, setState: Dispatch<SetStateAction>) => {
    setState((prev: boolean[]) => {
      const temp = Array.from(prev);
      temp[idx] = !temp[idx];
      return temp;
    });
  };

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
          if (nodeComp(node, "Movie")) {
            return !toHide[0];
          } else if (nodeComp(node, "Language")) {
            return !toHide[1];
          } else if (nodeComp(node, "Keyword")) {
            return !toHide[2];
          } else if (nodeComp(node, "Actor")) {
            return !toHide[3];
          } else if (nodeComp(node, "Genre")) {
            return !toHide[4];
          } else if (nodeComp(node, "Country")) {
            return !toHide[5];
          } else if (nodeComp(node, "Company")) {
            return !toHide[6];
          } else {
            return true;
          }
        }}
        nodeColor={(node: NodeObject) => {
          if (nodeComp(node, "Movie")) {
            return "#4caf50";
          } else if (nodeComp(node, "Language")) {
            return "#f44336";
          } else if (nodeComp(node, "Keyword")) {
            return "#2196f3";
          } else if (nodeComp(node, "Actor")) {
            return "#ff9800";
          } else if (nodeComp(node, "Genre")) {
            return "#9c27b0";
          } else if (nodeComp(node, "Country")) {
            return "#795548";
          } else if (nodeComp(node, "Company")) {
            return "#607d8b";
          }
          return "#000";
        }}
        linkColor={(link: LinkObject) => {
          if (link.source?.toString().split("_")[0] === "Movie") {
            return "#4caf50";
          } else if (link.source?.toString().split("_")[0] === "Language") {
            return "#f44336";
          } else if (link.source?.toString().split("_")[0] === "Keyword") {
            return "#2196f3";
          } else if (link.source?.toString().split("_")[0] === "Actor") {
            return "#ff9800";
          } else if (link.source?.toString().split("_")[0] === "Genre") {
            return "#9c27b0";
          } else if (link.source?.toString().split("_")[0] === "Country") {
            return "#795548";
          } else if (link.source?.toString().split("_")[0] === "Company") {
            return "#607d8b";
          }
          return "#000";
        }}
        linkWidth={1}
      />
      {/* absolute side bar */}
      <div className="absolute top-0 right-0 h-screen w-1/4 bg-white/30">
        <div className="flex flex-col items-center space-y-5">
          <h1>Side Bar</h1>
          <SelectionCard
            title="Language"
            max={langCnt}
            value={vLang}
            setValue={setVLang}
            hide={toHide[1] ?? false}
            setHide={() => toggleIdx(1, setToHide)}
            disable={toDisable[1] ?? false}
            setDisable={() => toggleIdx(1, setToDisable)}
          />
          <SelectionCard
            title="Keyword"
            max={wordCnt}
            value={vWord}
            setValue={setVWord}
            hide={toHide[2] ?? false}
            setHide={() => toggleIdx(2, setToHide)}
            disable={toDisable[2] ?? false}
            setDisable={() => toggleIdx(2, setToDisable)}
          />
          <SelectionCard
            title="Actor"
            max={crewCnt}
            value={vCrew}
            setValue={setVCrew}
            hide={toHide[3] ?? false}
            setHide={() => toggleIdx(3, setToHide)}
            disable={toDisable[3] ?? false}
            setDisable={() => toggleIdx(3, setToDisable)}
          />
          <SelectionCard
            title="Genre"
            max={gnreCnt}
            value={vGnre}
            setValue={setVGnre}
            hide={toHide[4] ?? false}
            setHide={() => toggleIdx(4, setToHide)}
            disable={toDisable[4] ?? false}
            setDisable={() => toggleIdx(4, setToDisable)}
          />
          <SelectionCard
            title="Country"
            max={ctryCnt}
            value={vCtry}
            setValue={setVCtry}
            hide={toHide[5] ?? false}
            setHide={() => toggleIdx(5, setToHide)}
            disable={toDisable[5] ?? false}
            setDisable={() => toggleIdx(5, setToDisable)}
          />
          <SelectionCard
            title="Company"
            max={compCnt}
            value={vComp}
            setValue={setVComp}
            hide={toHide[6] ?? false}
            setHide={() => toggleIdx(6, setToHide)}
            disable={toDisable[6] ?? false}
            setDisable={() => toggleIdx(6, setToDisable)}
          />
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
