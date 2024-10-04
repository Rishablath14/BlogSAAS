"use client"
import { useState } from 'react'
import { Menu, Search, X, User, ChevronRight, Heart, MessageCircle, Share2, Bell } from 'lucide-react'
import prisma from '@/utils/db'

const blogPosts = [
  { id: 1, title: 'The Future of Web Development', category: 'Web Development', excerpt: 'Explore the cutting-edge technologies shaping the future of web development.', author: 'John Doe', date: '2023-05-15', likes: 120, comments: 15, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80' },
  { id: 2, title: 'Mastering Responsive Design', category: 'CSS', excerpt: 'Learn the secrets to creating truly responsive and adaptive web layouts.', author: 'Jane Smith', date: '2023-05-12', likes: 95, comments: 8, image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80' },
  { id: 3, title: 'The Power of React Hooks', category: 'React', excerpt: 'Dive deep into React Hooks and revolutionize your component logic.', author: 'Alex Johnson', date: '2023-05-10', likes: 150, comments: 22, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 4, title: 'Optimizing Web Performance', category: 'Performance', excerpt: 'Discover techniques to significantly boost your website\'s speed and efficiency.', author: 'Emily Brown', date: '2023-05-08', likes: 88, comments: 10, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80' },
  { id: 5, title: 'The Art of Clean Code', category: 'Best Practices', excerpt: 'Learn how to write clean, maintainable, and efficient code.', author: 'Chris Wilson', date: '2023-05-05', likes: 132, comments: 18, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
]

const allCategories = ['All', ...new Set(blogPosts.map(post => post.category))]
const topBlogs = blogPosts.sort((a, b) => b.likes - a.likes).slice(0, 3)


export default function BlogApplication({blogs}: {blogs: any}) {
  console.log(blogs);
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-950 dark:to-zinc-900 text-gray-800 font-sans">
      {/* Category boxes */}
      <div className="bg-white dark:bg-zinc-950 shadow-md py-4 overflow-x-auto">
        <div className="container mx-auto px-4 flex space-x-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'All' ? 'bg-orange-500' : 'bg-gray-200'} hover:bg-orange-500 transition-colors duration-300`}
          >
            All
          </button>
          {allCategories.filter(cat => cat !== 'All').map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-orange-500' : 'bg-gray-200'} hover:bg-orange-500 transition-colors duration-300`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        {/* Sidebar for mobile */}
        <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-orange-600">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-orange-500 transition-colors duration-300">
              <X size={24} />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li><a href="#" className="block py-2 px-4 text-gray-600 hover:bg-orange-100 rounded transition-colors duration-300">Home</a></li>
              <li><a href="#" className="block py-2 px-4 text-gray-600 hover:bg-orange-100 rounded transition-colors duration-300">About</a></li>
              <li><a href="#" className="block py-2 px-4 text-gray-600 hover:bg-orange-100 rounded transition-colors duration-300">Contact</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="w-full lg:w-2/3">
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-orange-600 transition-colors duration-300">{post.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">By {post.author} | {post.date}</p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center"><Heart size={16} className="mr-1 text-red-500" /> {post.likes}</span>
                    <span className="flex items-center"><MessageCircle size={16} className="mr-1 text-blue-500" /> {post.comments}</span>
                    <button className="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
                      Read more <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Side section for top blogs */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Blogs</h2>
            <div className="space-y-4">
              {topBlogs.map(blog => (
                <div key={blog.id} className="flex items-start space-x-4 group">
                  <img src={blog.image} alt={blog.title} className="w-20 h-20 rounded-md object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">{blog.title}</h3>
                    <p className="text-sm text-gray-500">By {blog.author}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span className="flex items-center"><Heart size={12} className="mr-1 text-red-500" /> {blog.likes}</span>
                      <span className="flex items-center"><MessageCircle size={12} className="mr-1 text-blue-500" /> {blog.comments}</span>
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