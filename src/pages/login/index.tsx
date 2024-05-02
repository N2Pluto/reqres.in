import Image from "next/image";
import { Inter } from "next/font/google";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });



export default function Login() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
        <div className="flex flex-col items-center">
            login
        </div>
    </main>
  );
}
