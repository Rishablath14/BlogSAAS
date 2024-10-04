"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { CalendarIcon, CircleUser, ClockIcon, ShareIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { RenderArticle } from './dashboard/RenderArticle'
import { JSONContent } from 'novel'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { useParams} from 'next/navigation'
import { useUserInfo } from '@/components/AppContext'
type data = {
    title: string;
    articleContent: JsonValue;
    smallDescription: string;
    image: string;
    createdAt: Date;
    catSlug: string;
    User: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    comments: {
        id: string;
        desc: string;
        createdAt: Date;
        User: {
            email: string;
            firstName: string;
            lastName: string;
            profileImage: string;
        } | null;
    }[]
} | null
const Blog = ({ blog } : {blog:data}) => {
  const {userInfo}:any = useUserInfo();
  const params = useParams();
  return (
    <div>
        <article className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <Image src={blog?.image ?? ""} alt="Blog post cover image" width={1200}
          height={630}
          className="h-full w-full object-contain"
          priority/>
          </div>
          <div className="p-4 sm:p-8">
          <div className='mb-4'>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 ">{blog?.title}</h1>
              <div className="flex flex-wrap items-center text-sm text-gray-200">
                <span className="flex items-center mr-1 sm:mr-4 mb-1 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <p className="m-auto w-10/12 text-sm font-light md:text-base">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(blog?.createdAt)}
          </p>
                </span>
                <span className="flex items-center text-muted-foreground mr-1 sm:mr-4 mb-1">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  4 min read
                </span>
                <span className="flex items-center mb-1 text-muted-foreground">
                  <UserIcon className="w-4 h-4 mr-1" />
                  {blog?.User?.firstName + " " + blog?.User?.lastName}
                </span>
              </div>
            </div>
          <RenderArticle json={blog?.articleContent as JSONContent} />
          </div>
        </article>

        {/* Interactive Elements */}
        <div className="mt-8 flex justify-end items-center">
          <div className="flex space-x-4">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600"
            >
              <ShareIcon className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <section className="mt-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 sm:p-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="space-y-6 mb-8">
            {/* Another Comment */}
            <div className="flex space-x-4 items-center">
              {blog?.comments[0]?.User?.profileImage ? <Image
                      src={blog?.comments[0]?.User?.profileImage}
                      alt="logo"
                      width={50}
                      height={50}
                      className="rounded-full w-auto h-auto"
                    />:<CircleUser className="h-5 w-5" />}
              <div>
                <p className="font-semibold">Alex Johnson</p>
                <p className=" mt-1 text-gray-400 text-sm">WebAssembly is definitely a game-changer. I&apos;ve been experimenting with it in some of my projects, and the performance.</p>
              </div>
            </div>
          </div>
          {/* Comment Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Leave a comment</label>
              <Textarea id="comment" placeholder="Share your thoughts..." className="w-full p-2 border rounded" />
            </div>
            {userInfo===null
             ?<Button className="w-full sm:w-auto bg-orange-600  hover:bg-orange-700 transition-colors duration-200" asChild>
             <LoginLink postLoginRedirectURL={`/blog/${params?.name}/${params?.slug}`}>
             Login to Comment
              </LoginLink> 
           </Button>
             :<Button type="submit" className="w-full sm:w-auto bg-orange-600  hover:bg-orange-700 transition-colors duration-200">
              Post Comment
            </Button>
            }
          </form>
        </section>
    </div>

  )
}

export default Blog