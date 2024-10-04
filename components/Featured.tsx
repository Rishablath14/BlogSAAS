import React from "react";
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
      <div className="mt-6 lg:mt-12 flex flex-col lg:flex-row items-center gap-4">
          <Image src="/home.png" width={300} height={450} alt="HomePage" className="w-full h-full object-cover" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl text-primary">
            Lorem ipsum dolor sit amet alim yutekgruf.
          </h1>
          <p className="text-base xl:max-w-[90%] md:text-lg text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium soluta architecto assumenda
            incidunt ipsum optio itaque consequuntur tempora qui veritatis.
            Praesentium architecto quae recusandae nihil molestiae saepe
            dignissimos maiores hic?
          </p>
          <button className="px-4 py-3 mt-2 border-none rounded-[5px] w-max bg-primary text-primary-foreground">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
