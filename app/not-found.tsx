import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11100e] px-4 py-8 text-white sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(173,119,67,0.18),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(217,185,141,0.12),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_bottom,transparent,rgba(217,185,141,0.08))]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col items-center justify-center gap-8">
        <div className="max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#d8c7b4]/80">
            404
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-5xl md:text-6xl">
            This path wandered off.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#d8c7b4]/80 sm:text-base">
            The page you were looking for is not here, but the trail back to the portfolio is still lit.
          </p>
        </div>

        <div className="relative h-[390px] w-full max-w-5xl sm:h-[430px]">
          <div className="absolute inset-x-4 bottom-14 h-px bg-gradient-to-r from-transparent via-[#d8c7b4]/18 to-transparent" />

          <div className="absolute bottom-24 left-0 z-10 flex w-[44%] min-w-[160px] flex-col items-end gap-3 sm:left-[4%] sm:w-[32%]">
            <div className="relative mr-4 h-32 w-36 drop-shadow-[0_16px_24px_rgba(0,0,0,0.35)] sm:h-40 sm:w-44">
              <img
                src="/Leader-rafiki.svg"
                alt="Leader illustration"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="relative max-w-[15.5rem] rounded-md border border-white/10 bg-[#161514]/95 px-4 py-3 text-left text-xs leading-5 text-[#d8c7b4]/82 shadow-2xl shadow-black/30 backdrop-blur sm:text-sm">
              <span className="absolute -top-2 right-12 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-[#161514]/95" />
              Hmm... this page must have wandered off.
            </p>
          </div>

          <div className="absolute bottom-24 right-0 z-10 flex w-[44%] min-w-[160px] flex-col items-start gap-3 sm:right-[10%] sm:w-[30%]">
            <div className="relative ml-4 h-36 w-40 drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] sm:h-44 sm:w-52">
              <img
                src="/Lost-amico (1).svg"
                alt="Guide with a map illustration"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="relative max-w-[15.5rem] rounded-md border border-white/10 bg-[#161514]/95 px-4 py-3 text-right text-xs leading-5 text-[#d8c7b4]/82 shadow-2xl shadow-black/30 backdrop-blur sm:text-sm">
              <span className="absolute -top-2 left-12 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-[#161514]/95" />
              Don&apos;t worry, I&apos;ll help you find your way.
            </p>
          </div>

          <div className="absolute bottom-12 right-0 hidden h-36 w-36 sm:block">
            <div className="absolute bottom-0 left-5 h-32 w-3 rounded-full bg-[#8d6040]" />
            <Link
              href="/"
              prefetch={false}
              className="absolute left-7 top-0 inline-flex h-10 w-28 items-center gap-2 rounded-md bg-[#9a6240] px-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ab714b]"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/projects"
              prefetch={false}
              className="absolute left-12 top-16 inline-flex h-10 w-32 items-center gap-2 rounded-md bg-[#b9784d] px-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#c8885c]"
            >
              <Compass className="h-4 w-4" />
              Explore
            </Link>
          </div>

          <div className="absolute bottom-0 left-1/2 flex w-full max-w-sm -translate-x-1/2 flex-col gap-3 px-6 sm:flex-row sm:px-0">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[#151311] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f1ede7]"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <Link
              href="/projects"
              prefetch={false}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-[#11100e] px-5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#1d1a17]"
            >
              <Compass className="h-4 w-4" />
              View projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
