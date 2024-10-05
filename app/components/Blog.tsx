"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { JsonValue } from '@prisma/client/runtime/library'
import { CalendarIcon, CircleUser, ClockIcon,AppWindowMac,ShareIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { RenderArticle } from './dashboard/RenderArticle'
import { JSONContent } from 'novel'
import { useParams} from 'next/navigation'
import { useUserInfo } from '@/components/AppContext'
import Link from 'next/link'
import { toast } from 'sonner'
import { createComment } from '@/actions'
import { useRouter } from 'next/navigation'
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
type comment = {
  id: string;
    createdAt: Date;
    desc: string;
    User: {
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
    } | null;
}
const Blog = ({ blog,comments } : {blog:data,comments:comment[]}) => {
  const {userInfo}:any = useUserInfo();
  const params = useParams();
  const router = useRouter();
  const [userComment, setUserComment] = React.useState<string>("");
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const addComment = async () => {
    if(userComment.trim().length > 0) {
      await createComment(userComment, slug, userInfo.id);
      toast.success("Comment added successfully");
      setUserComment("");
      router.refresh();      
    }}
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
            <Link
              href={`/blog/${params.name}`}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:text-primary transition-all"
            >
              <AppWindowMac className="w-5 h-5" />
              <span>View Channel</span>
            </Link>
            <button
            onClick={() => { window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(
                blog?.title??""
              )}&summary=${encodeURIComponent(blog?.smallDescription??"")}`,
              '_blank',
            );}}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:text-primary transition-all"
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
            {comments.map((comment:any) => (
              <div className="flex space-x-4 items-center" key={comment.id}>
              {comment?.User?.profileImage ? <Image
                      src={comment?.User?.profileImage}
                      alt="logo"
                      width={50}
                      height={50}
                      className="rounded-full w-auto h-auto"
                    />:<CircleUser className="h-5 w-5" />}
              <div>
                <span>{comment?.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <p className="text-xs sm:text-sm font-semibold">{comment?.User?.firstName + " " + comment?.User?.lastName + " <"+comment?.User?.email+">"}</p>
                <p className=" mt-1 text-gray-800 dark:text-gray-200 text-sm">{comment?.desc}</p>
              </div>
            </div>
            ))}
          </div>
          {/* Comment Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Leave a comment</label>
              <Textarea id="comment" placeholder="Share your thoughts..." value={userComment} onChange={(e) => setUserComment(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            {userInfo===null
             ?<Button className="w-full sm:w-auto bg-orange-600  hover:bg-orange-700 transition-colors duration-200" disabled>
             Login to Comment
           </Button>
             :<Button onClick={addComment} type="submit" className="w-full sm:w-auto bg-orange-600  hover:bg-orange-700 transition-colors duration-200">
              Post Comment
            </Button>
            }
          </div>
        </section>
    </div>

  )
}

export default Blog