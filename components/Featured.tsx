import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-8 px-2 md:px-4 lg:px-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary">
        <b>Hey, Welcome!</b>
      </h1>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Discover Blogs, Stories and Much more.
      </h2>
      <div className="mt-8 flex items-center gap-12">
        <div className="flex-1 h-[450px] hidden lg:block relative">
          <Image src="/home.png" alt="HomePage" fill className="object-cover" />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-4xl text-primary">
            Lorem ipsum dolor sit amet alim yutekgruf.
          </h1>
          <p className="text-xl text-justify max-w-[90%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium soluta architecto assumenda
            incidunt ipsum optio itaque consequuntur tempora qui veritatis.
            Praesentium architecto quae recusandae nihil molestiae saepe
            dignissimos maiores hic?
          </p>
          <button className="px-4 py-3 border-none rounded-[5px] w-max bg-primary text-primary-foreground">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
