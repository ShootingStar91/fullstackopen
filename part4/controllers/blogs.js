const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.send(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  let blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: request.user._id
  })


  const result = await blog.save()

  request.user.blogs = request.user.blogs.concat(blog._id)
  await request.user.save()

  response.send(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  // Check if user owns this blog
  if ((blog.user) && blog.user.toString() === request.user._id.toString()) {
    blog.remove()
    response.status(204).end()
  } else {
    response.status(401).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).end()
})



module.exports = blogsRouter