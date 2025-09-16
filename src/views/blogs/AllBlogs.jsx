/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineDelete } from 'react-icons/md'
function AllBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api`)
        console.log(res.data)
        setBlogs(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API}/api/${id}`)
      setBlogs(blogs.filter((blog) => blog._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete blog')
    }
  }

  if (loading) return <p>Loading blogs...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Blogs</h2>
        <button
          onClick={() => navigate('/create-blog')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="font-semibold mb-2">{blog.title}</h3>
              <div
                className="text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              <div className="mt-2 flex justify-between text-sm text-blue-500">
                <div>Tags: {blog.tags?.join(', ')}</div>
                <div>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className=" text-red-500 hover:text-red-700 transition"
                  >
                    <MdOutlineDelete className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllBlogs
