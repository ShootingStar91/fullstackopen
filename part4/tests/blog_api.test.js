const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Allin muistelmat 1',
    author: 'Alli Paasikivi',
    url: 'http://allin.blogi.fi',
    likes: 4
  }, 
  {
    title: 'Allin muistelmat 2',
    author: 'Alli Paasikivi',
    url: 'http://allin.blogi.fi',
    likes: 7
  }, 
  {
    title: 'Allin muistelmat 3',
    author: 'Alli Paasikivi',
    url: 'http://allin.blogi.fi',
    likes: 2
  },
  {
    title: 'Harri Potter',
    author: 'Jo Row',
    url: 'http://wizardinworld.fi',
    likes: 210
  }, 
]

beforeEach(async () => {
  await Blog.deleteMany({})
  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
})

test('blogs api get request returns right amount', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog object id with no underscore', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog can be posted through api', async () => {

  const newBlog = {
    title: 'Harri Potter 8',
    author: 'Jo Row',
    url: 'http://wizardinworld.fi',
    likes: 81032
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body).toContainEqual({...newBlog, id: expect.any(String)})
})

test('new blog likes automatically set to 0 if not given', async () => {

  const newBlog = {
    title: 'Harri Potter 8',
    author: 'Jo Row',
    url: 'http://wizardinworld.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body[initialBlogs.length]).toEqual({...newBlog, id: expect.any(String), likes: 0})
})

test('missing title leads to status 400', async () => {
  const newBlog = {
    author: 'Jo Row',
    url: 'http://wizard.fi'
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('missing url leads to status 400', async () => {
  const newBlog = {
    author: 'Jo Row',
    title: 'Harri Potterin Muistelmat 9'
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  
  expect(400)

})


afterAll(() => {
  mongoose.connection.close()
})
