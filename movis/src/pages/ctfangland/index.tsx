import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import MyCombobox from "../../components/MyCombobox";
import Navbar from "../../components/Navbar";
import SubsetPicker from "../../components/SubsetPicker";
import ZoomCard from "../../components/ZoomCard";

import { api } from "../../utils/api";
import type { MovieData, Subset } from "../../utils/myClasses";
import { AllGenres } from "../../utils/myClasses";

import { Carousel } from "flowbite";
import type { CarouselItem, CarouselOptions, CarouselInterface } from "flowbite";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ChartOptions, getTopElementCount } from "../../utils/chartUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


// const carousel: CarouselInterface = new Carousel(items, options);

// carousel.cycle()

// // set event listeners for prev and next buttons
// const $prevButton = document.getElementById('data-carousel-prev');
// const $nextButton = document.getElementById('data-carousel-next');

// $prevButton.addEventListener('click', () => {
//     carousel.prev();
// });

// $nextButton.addEventListener('click', () => {
//     carousel.next();
// });

const MyCarousel = () => {

  return (
    <div id="default-carousel" class="relative" data-carousel="static">
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div id="carousel-item-1" class="hidden duration-700 ease-in-out">
                <span class="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                <img src="https://m.media-amazon.com/images/I/71aBLaC4TzL._AC_SL1330_.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"  alt="..."></img>
            </div>
            <div id="carousel-item-2" class="duration-700 ease-in-out">
                <span class="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                <img src="https://m.media-amazon.com/images/I/61QPrqydVoL._AC_SY679_.jpg"  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"  alt="..."></img>
            </div>
            <div id="carousel-item-3" class="hidden duration-700 ease-in-out">
                <span class="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                <img src="https://m.media-amazon.com/images/I/714hR8KCqaL.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
            </div>
            
            
        </div>
        
        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
        
        <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>
  );
}


const MyBarPlot: React.FC<{ data: MovieData[] }> = (props) => {
  // get genre counts
  const { labels, data: countArr } = getTopElementCount(
    props.data,
    ["genres"],
    [],
    "name",
    10
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "2001 Movies",
        data: countArr,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={ChartOptions("Genre Count", true)} />;
};

const CTFHome: NextPage = () => {
  const { data: movies } = api.movie.betweenYearRange.useQuery({
    minYear: 2001,
    maxYear: 2001,
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-left font-extrabold tracking-tight text-white">
            <span className="text-[hsl(295,32%,69%)]">CTFang</span>
          </div>
        </div>

        {movies != null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold">Fixed</h3>

              <MyCarousel />

            </div>

            <ZoomCard title="Movies Genres Compare">
              <div className="flex flex-col gap-4 rounded-xl bg-white/95 p-4 text-lg text-black hover:bg-white/100">
                <MyBarPlot data={movies} />
              </div>
            </ZoomCard>
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-white">Querying Data...</h1>
        )}
      </main>
    </>
  );
};

export default CTFHome;
