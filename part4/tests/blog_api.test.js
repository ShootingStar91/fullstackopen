const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const loginRouter = require('../controllers/login')
const usersRouter = require('../controllers/users')
const blogsRouter = require('../controllers/blogs')

let user


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

  await User.deleteMany({})
  const testUser = { username: 'Kayttajanimi12345', password: 'abcde' }
  console.log("TEST USER: ", testUser)
  const createUserResponse = await api.post('/api/users').send(testUser)
  console.log("CreateUserResponse: ", createUserResponse)
  
  const loginResponse = await api.post('/api/login').send(testUser)


  console.log("loginResponse: ", loginResponse.body.token)
  token = loginResponse.body.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  user = await User.findById(decodedToken.id)

  await Blog.deleteMany({})
  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog({...blog, user: user })
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
    likes: 81032,
    user: user
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  //expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body).toContainEqual({...newBlog, id: expect.any(String), user: expect.anything()})
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
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const newBlogAtDatabase = response.body.find((blog) => blog.title === 'Harri Potter 8')
  expect(newBlogAtDatabase).toEqual({...newBlog, id: expect.any(String), likes: 0, user: expect.anything()})
})

test('missing title leads to status 400', async () => {
  const newBlog = {
    author: 'Jo Row',
    url: 'http://wizard.fi'
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .set('Authorization', 'bearer ' + token)

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
  .set('Authorization', 'bearer ' + token)

  expect(400)

})

test('missing token on post blog leads to status 401 unauthorized', async () => {
  const newBlog = {
    title: 'Harri Potter And The Missing Token',
    author: 'Jo Row',
    url: 'http://wizardinworld.fi',
    likes: 1,
    user: user
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ')
    .expect(401)
})


afterAll(() => {
  mongoose.connection.close()
})
