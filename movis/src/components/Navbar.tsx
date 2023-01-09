//Navbar component
import React from "react";
import Link from "next/link";

import { api } from "../utils/api";

// Navigation Element
function Navigation(title: string, url: string) {
  return (
      <Link href={url} className="font-bold hover:text-[hsl(295,32%,69%)]" key={title}>
        {title}
      </Link>
  );
};

export default function Navbar() {
  const { data: hello, isLoading: helloIsLoading } = api.example.hello.useQuery(
    { text: "from tRPC" }
  );

  return (
    <div className="h-20 flex flex-row justify-between items-center bg-black px-20 text-white sticky top-0">
      <div className="page-nav flex flex-row items-center gap-6">
        <div className="brand mr-4">
          <Link href="/" className="text-2xl font-bold">
            Mo<span className="text-[hsl(280,100%,70%)]">Vis</span>
          </Link>
        </div>
        {
          [
            ['Overview', '/overview'],
            ['Comparison', '/compare'],
            ['Crew Analysis', '/crew'],
            ['Relation Analysis', '/relation'],
            ['Playground', '/playground']
          ].map(([title, url]) => 
            Navigation(title!, url!)
          ) 
        }
      </div>
      <div className="user-settings flex flex-row gap-4">
      {
          [
            ['Login', '/login'],
            ['Register', '/register'],
          ].map(([title, url]) => 
            Navigation(title!, url!)
          ) 
      }
      </div>
    </div>
  );
}
