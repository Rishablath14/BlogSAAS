import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/home1.png";
import { Cover } from "@/components/ui/cover";
export function Hero() {
  return (
    <>
      <section
        className="relative pt-20 flex items-center px-2 sm:px-4 md:px-6 justify-center"
        id="home"
      >
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-2 sm:px-4 py-2 rounded-full">
              ✨ Create. Manage. Grow Your Blog Effortlessly.
            </span>

            <h1 className="mt-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none">
              RLexicon - Setup your Blog{" "}
              <Cover className="block">in Minutes</Cover>
            </h1>

            <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base font-medium lg:text-lg text-muted-foreground tracking-tighter">
              Unleash the power of content creation with RLexicon—the ultimate
              Blog SaaS platform for writers and creators. Manage blogs,
              collaborate with your team, and grow your audience—all in one
              place.
            </p>
            <div className="flex items-center gap-x-5 w-full justify-center mt-5 ">
              <Button variant="secondary" className="font-bold">
                <Link href={"/blogs"}>Explore as Reader</Link>
              </Button>
              <Button className="font-bold">
                <Link href={"/dashboard"}>Sign Up as Author</Link>
              </Button>
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto mt-12">
            <svg
              className="absolute -mt-14 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#f77103"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#f77103"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#f77103"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#f77103"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-180.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="60.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
            <Image
              src={HeroImage}
              alt="Hero image"
              priority
              fetchPriority="high"
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
