//Navbar component
import React from "react";
import Link from "next/link";

import { api } from "../utils/api";

export default function Navbar() {
  const { data: hello, isLoading: helloIsLoading } = api.example.hello.useQuery(
    { text: "from tRPC" }
  );

  return (
    <div className="flex flex-row items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-row gap-4">
        <Link href="/" className="px-4 py-2 text-2xl font-bold text-white">
          MoVis
        </Link>
        <Link href="/v2" className="px-4 py-2 text-xl font-bold text-white">
          v2
        </Link>
        <Link href="/qqq" className="px-4 py-2 text-xl font-bold text-white">
          qqq
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="/login" className="px-4 py-2 text-xl font-bold text-white">
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-xl font-bold text-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
