const ChartOptions = (title: string, showLegend: boolean) => {
  return {
    // maintianAspectRatio: false,
    plugins: {
      title: {
        display: true,
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

type KeyMap = {
  [key: string]: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ElementCount = (dataArr: any[], toEntry: string[], toKey: string[], sorted: boolean=true) => { 
  const countDict = dataArr.reduce((acc: KeyMap, data) => {
    const entry = toEntry.reduce((value, entry) => value[entry], data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entry.forEach((d: any) => {
      const key = toKey.reduce((value, key) => value[key], d); 
      if (acc[key] == null) {
        acc[key] = 1;
      } else {
        acc[key] += 1;
      }
    });
    return acc;
  }, {})

  let entries = Object.entries(countDict)
  if (sorted) entries = entries.sort((a, b) => b[1] - a[1]);
  const labels = entries.map((entry) => entry[0]);
  const data = entries.map((entry) => entry[1]);
  
  return ({labels, data});
}


export {ChartOptions, ElementCount};