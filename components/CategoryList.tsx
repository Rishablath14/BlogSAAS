import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/utils/db";

const CategoryList = async () => {
  const data = await prisma.category.findMany();
  const bgColors = ["#57c4ff31","#7fb88133","#f8b26a33","#f2d27f33","#f4a26133","#e76f51"];
  return (
    <div>
      <h1 className="my-12">Popular Categories</h1>
      <div className="flex flex-wrap justify-between gap-5">
        {data && data?.map((item) => (
          <Link
            href="/blog?cat=style"
            style={{ backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)] }}
            className="capitalize flex items-center gap-3 rounded-[12px] justify-center w-1/6"
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt="Category Image"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
