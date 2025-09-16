import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateBlog() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    content: '',
    tags: '',
    image: null,
    linkingAnchor: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogData({ ...blogData, [name]: value })
  }

  const handleContentChange = (value) => {
    setBlogData({ ...blogData, content: value })
  }

  const handleFileChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formDataToSend = new FormData()

    // Append all fields
    Object.keys(blogData).forEach((key) => {
      if (key === 'tags') {
        formDataToSend.append(key, blogData[key]) // send as string: "tag1,tag2"
      } else if (key === 'image' && blogData[key]) {
        formDataToSend.append(key, blogData[key]) // File object
      } else {
        formDataToSend.append(key, blogData[key])
      }
    })

    try {
      console.log('Submitting blog:', blogData)

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api`,
        formDataToSend,
        // ❌ NO headers for FormData
      )

      console.log('Blog saved:', response.data)

      // Reset form
      setBlogData({
        title: '',
        slug: '',
        content: '',
        tags: '',
        image: null,
        linkingAnchor: '',
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
      })
      navigate('/blog-list')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Create Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Blog Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">Blog Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Enter blog slug"
            value={blogData.slug}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <ReactQuill
            value={blogData.content}
            onChange={handleContentChange}
            className=" text-white rounded-md"
            theme="snow"
          />
        </div>

        {/* Tags and Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. JavaScript, React"
              value={blogData.tags}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Featured Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            />
          </div>
        </div>

        {/* SEO Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              placeholder="SEO Meta Title"
              value={blogData.metaTitle}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Focus Keyword</label>
            <input
              type="text"
              name="focusKeyword"
              placeholder="Primary SEO keyword"
              value={blogData.focusKeyword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block mb-2 font-medium">Meta Description</label>
          <textarea
            name="metaDescription"
            placeholder="SEO meta description"
            value={blogData.metaDescription}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            rows={4}
          />
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md font-semibold text-gray-900 transition duration-200 ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
