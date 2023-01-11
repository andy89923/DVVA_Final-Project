import type { Keyword } from "@prisma/client";
import type { GraphData, LinkObject } from "react-force-graph-3d";
import type { KeyMap } from "./myClasses";

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
 *  hi: {id: 1, name: "a", keywords: [{id: 1, name: "a"}, {id: 2, name: "b"}]},
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGraph = (dataArr: any[], toEntry: string[], toObject: string[], key: string, start:number|undefined, end:number|undefined, val1:number, val2:number) => {
  const keyDict = getCountDict(dataArr, toEntry, toObject, key, start, end) as KeyMap<{data: Keyword, count: number}>;
  const keyNodes = Object.values(keyDict).map((d) => ({
    id: `KEY_${d.data.id}`,
    name: d.data.name,
    val: val2,
  }));
  const dataNodes = dataArr.map((data) => ({
      id: `DATA_${data.id}`,
      name: data.title,
      val: val1,
  }));

  const links = dataArr.reduce((links, data) => {
    const entry = toEntry.reduce((value, entry) => value[entry], data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entry.forEach((d: any) => {
      const value = toObject.reduce((obj, to) => obj[to], d); 
      if (keyDict[value[key]] != null){
        links.push({
          source: `KEY_${value.id}`,
          target: `DATA_${data.id}`,
        })
      }
      
    });
    return links;
  }, [] as LinkObject[]) satisfies LinkObject[];

  const graph = {
    nodes: [...dataNodes, ...keyNodes],
    links: links,
  } satisfies GraphData;

  return graph
}

export { getGraph, getCountDict };