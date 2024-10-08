"use client"
import { useEffect, useState } from 'react'
import { Calendar, Search, X, User, ChevronRight } from 'lucide-react'
import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer on component unmount or when value/delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function BlogApplication({blogs,categories}: {blogs: any, categories: Category[]}) {
  const topBlogs = blogs.sort((a:{views:number}, b:{ views: number }) => b.views - a.views).slice(0, 3);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredPosts = selectedCategory === 'All'
    ? blogs.filter((post: { title: string }) => post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : blogs.filter((post: { catSlug: string }) => post.catSlug === selectedCategory).filter((post: { title: string }) => post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-950 dark:to-zinc-900 text-gray-800 font-sans pb-8">
      {/* Category boxes */}
      <div className="bg-white dark:bg-zinc-950 shadow-md py-4">
        <div className="container mx-auto px-4 flex space-x-2 overflow-x-scroll cursor-grab no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'All' ? 'bg-orange-500' : 'bg-gray-200'} hover:bg-orange-500 transition-colors cursor-pointer duration-300`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.slug ? 'bg-orange-500' : 'bg-gray-200'} hover:bg-orange-500 transition-colors cursor-pointer duration-300`}
            >
              {category.title.split("")[0].toUpperCase() + category.title.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">

        {/* Main content */}
        <main className="w-full lg:w-2/3">
          <div className="mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none dark:text-white focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filteredPosts.map((post:{
              id: number,
              title: string,
              Channel: {subdirectory:string},
              User:{firstName:string,lastName:string,email:string},
              smallDescription: string,              
              slug: string,
              catSlug: string,
              createdAt: Date,
              image: string
            }) => (
              <article key={post.id} className="rounded-lg dark:shadow-gray-700 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image src={post.image} width={200} height={200} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-2 md:p-6">
                  <h2 className="text-xl text-black dark:text-white md:text-2xl font-bold mb-2 hover:text-orange-600 transition-colors duration-300">{post.title}</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">By {post.User?.firstName +" "+post.User?.lastName+" <"+post.User?.email+">"} </p>
                  <span className='text-sm text-gray-500 mb-4 flex items-center gap-1'><Calendar size={16}/> {post.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }</span>
                  <p className=" mb-4 text-gray-900 dark:text-gray-100">{post.smallDescription}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Category: {post.catSlug.split("")[0].toUpperCase() + post.catSlug.slice(1)}</span>
                    {/* <span className="flex items-center"><Heart size={16} className="mr-1 text-red-500" /> {post.likes}</span>
                    <span className="flex items-center"><MessageCircle size={16} className="mr-1 text-blue-500" /> {post.comments}</span> */}
                    <Link href={`/blog/${post.Channel.subdirectory}/${post.slug}`} className="border border-orange-500 rounded-full px-4 py-2 flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
                      Read more <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Side section for top blogs */}
        <aside className="w-full lg:w-1/3">
          <div className="p-6 rounded-lg shadow-md dark:shadow-gray-600">
            <h2 className="text-2xl font-bold mb-4 text-primary">Top Blogs</h2>
            <div className="space-y-4">
              {topBlogs.map((blog:{
              id: number,
              title: string,
              Channel: {subdirectory:string},
              User:{firstName:string,lastName:string,email:string},
              smallDescription: string,              
              slug: string,
              catSlug: string,
              createdAt: Date,
              image: string}) => (
                <div key={blog.id} className="flex flex-col lg:flex-row items-start gap-2 group">
                  <Image width={200} height={200} src={blog.image} alt={blog.title} className="w-20 h-20 rounded-md object-cover" />
                  <div>
                    <Link href={`/blog/${blog.Channel.subdirectory}/${blog.slug}`} className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 transition-colors duration-300">{blog.title}</Link>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">By {blog.User?.firstName +" "+blog.User?.lastName+" <"+blog.User?.email+">"} </p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      {/* <span className="flex items-center"><Heart size={12} className="mr-1 text-red-500" /> {blog.likes}</span>
                      <span className="flex items-center"><MessageCircle size={12} className="mr-1 text-blue-500" /> {blog.comments}</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}