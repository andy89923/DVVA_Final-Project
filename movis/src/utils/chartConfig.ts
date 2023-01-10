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

export default ChartOptions;