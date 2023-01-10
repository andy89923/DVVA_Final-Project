import { getCountDict } from "./relationUtils";

const ChartOptions = (title: string | null, showLegend: boolean) => {
  return {
    // maintianAspectRatio: false,
    plugins: {
      title: {
        display: title !== null,
        text: title,
        font: {
          size: 20,
        },
      },
      legend: {
        display: showLegend,
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 30,
          font: {
            size: 16,
          },
        },
      },
    },
  
    scales: {
      y: {
        stacked: true,
        ticks: {
          backdropColor: "transparent",
          font: {
            size: 20,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          backdropColor: "transparent",
          font: {
            size: 20,
          },
        },
      },
    },
  
    elements: {
      line: {
        borderWidth: 3,
        tension: 0.2,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTopElementCount = (dataArr: any[], toEntry: string[], toObject: string[], key:string, top=10) => { 
  const topCountDict = getCountDict(dataArr, toEntry, toObject, key, 0, top)

  const entries = Object.entries(topCountDict)
  const labels = entries.map((entry) => entry[0]);
  const data = entries.map((entry) => entry[1].count);
  return ({labels, data});
}


export {ChartOptions, getTopElementCount};