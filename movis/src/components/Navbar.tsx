//Navbar component
import React from "react";
import Link from "next/link";

import { api } from "../utils/api";

// Navigation Element
const Navigation: React.FC<{ title: string; url: string }> = (props) => {
  return (
    <Link
      href={props.url}
      className="font-bold hover:text-[hsl(295,32%,69%)]"
      key={props.title}
    >
      {props.title}
    </Link>
  );
};

export default function Navbar() {
  const { data: hello, isLoading: helloIsLoading } = api.example.hello.useQuery(
    { text: "from tRPC" }
  );

  return (
    <div className="sticky top-0 flex h-20 flex-row items-center justify-between bg-black px-20 text-white">
      <div className="page-nav flex flex-row items-center gap-6">
        <div className="brand mr-4">
          <Link href="/" className="text-2xl font-bold">
            Mo<span className="text-[hsl(280,100%,70%)]">Vis</span>
          </Link>
        </div>
        <Navigation title="Overview" url="/overview" />
        <Navigation title="Comparison" url="/compare" />
        <Navigation title="Crew Analysis" url="/crew" />
        <Navigation title="Relation Analysis" url="/relation" />
        <Navigation title="Playground" url="/playground" />
        <Navigation title="CTFangLand" url="/ctfangland" />
        <Navigation title="F315" url="/f315" />
      </div>
      <div className="user-settings flex flex-row gap-4">
        <Navigation title="Login" url="/login" />
        <Navigation title="Register" url="/register" />
      </div>
    </div>
  );
}
