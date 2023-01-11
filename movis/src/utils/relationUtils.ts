import type { Keyword } from "@prisma/client";
import type { KeyMap, MovieData } from "./myClasses";


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

/**
 * @param dataArr   Obtained data array from query
 * @param toEntry   Nested keys {From: dataArr, To: the counting array}
 * @param toObject  Nested keys {From: the counting array, To: the counting object} 
 * @param key       Key for Dictionary
 * @param start     slice (start, end), remove element before top {start}
 * @param end       slice (start, end), remove element after top {end}
 * @returns         Dictionary of {key: {data: object, count: number}}
 *
 * @example
 * const dataArr = [
 *  {id: 1, name: "a", keywords: [{id: 1, name: "a"}, {id: 2, name: "b"}]},
 *  {id: 2, name: "b", keywords: [{id: 1, name: "a"}, {id: 3, name: "c"}]},
 * ]
 * const toEntry = ["keywords"];
 * const toObject = [];
 * const key = "id";
 * const start = 0;
 * const end = 2;
 * const result = { 
 *  1: {data: {id: 1, name: "a"}, count: 2}, 
 *  2: {data: {id: 2, name: "b"}, count: 1}, 
 *  3: {data: {id: 3, name: "c"}, count: 1} 
 * }
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCountDict = (dataArr: any[], toEntry: string[], toObject: string[], key: string, start:number|undefined, end:number|undefined)  => { 
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

/**
 * 
 * @param movies 
 * @param start 
 * @param end 
 * @returns 
 */
const getKeywordGraph = (movies: MovieData[], start: number|undefined, end: number|undefined) => {
  const keywordsDict = getCountDict(movies, ["keywords"], [], "id", start, end) as KeyMap<{data: Keyword, count: number}>;
  const movieNodes = movies.map((movie) => ({
      id: movie.id,
      name: movie.title,
      val: 0.1//10,
  }));
  const keywordNodes = Object.values(keywordsDict).map((d) => ({
      id: d.data.id + movieNodes.length,
      name: d.data.name,
      val: 10,
  }));

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