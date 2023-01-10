import { Keyword } from "@prisma/client";
import { KeyMap, MovieData } from "./myClasses";


type Link = {
  source: number;
  target: number;
}

type Node = {
  id: number | string;
  name: string;
  val?: number;
}
type Graph = {nodes: Node[]; links: Link[]}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCountDict = (dataArr: any[], toEntry: string[], toObject: string[], key: string, start:number|undefined = undefined, end:number|undefined = undefined)  => { 
  const countDict = dataArr.reduce((acc, data) => {
    const entry = toEntry.reduce((value, entry) => value[entry], data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entry.forEach((d: any) => {
      const value = toObject.reduce((obj, to) => obj[to], d); 
      if (acc[value[key]] == null) {
        const cntMap = {data: value, count: 1};
        acc[value[key]] = cntMap;
      } else {
        acc[value[key]] = {...acc[value[key]], count: acc[value[key]].count + 1};
      }
    });
    return acc;
  }, {})
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries = Object.entries(countDict) as [string, {data: any, count: number}] [];
  const sortedEntries = entries.sort((a, b) => b[1].count - a[1].count).slice(start, end);
  return Object.fromEntries(sortedEntries);
}

const getKeywordGraph = (movies: MovieData[]) => {
  const keywordsDict = getCountDict(movies, ["keywords"], [], "id", 0, 500) as KeyMap<{data: Keyword, count: number}>;
  const movieNodes = movies.map((movie) => ({
      id: movie.id,
      name: movie.title,
      val: 0.1//10,

  })) satisfies Node[];
  const keywordNodes = Object.values(keywordsDict).map((d) => ({
      id: d.data.id + movieNodes.length,
      name: d.data.name,
      val: 10,
  })) satisfies Node[];

  const links = movies.reduce((links, movie) => {
    movie.keywords.forEach((keyword) => {
      if (keywordsDict[keyword.id] != null){
        links.push({
          source: keyword.id + movieNodes.length,
          target: movie.id
        })
      }
      
    });
    return links;
  }, [] as Link[]) satisfies Link[];

  const graph = {
    nodes: [...movieNodes, ...keywordNodes],
    links: links,
  } satisfies Graph

  return graph
}

export { getKeywordGraph, getCountDict };