const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('invalid user creation produces correct errors', () => {
  test('username must be at least 3 characters', async () => {
    const faultyUser = {
      username: 'a',
      password: 'abcd',
      name: 'Testi Kayttaja'
    }

    await api
      .post('/api/users')
      .send(faultyUser)
      .expect(400)

  })
  test('password must be at least 3 characters', async () => {
    const faultyUser = {
      username: 'abcde',
      password: 'a',
      name: 'Testi Kayttaja'
    }

    await api
      .post('/api/users')
      .send(faultyUser)
      .expect(400)

  })
  test('username must exist', async () => {
    const faultyUser = {
      password: 'abcd',
      name: 'Testi Kayttaja'
    }

    await api
      .post('/api/users')
      .send(faultyUser)
      .expect(400)

  })
  test('password must exist', async () => {
    const faultyUser = {
      username: 'abcde',
      name: 'Testi Kayttaja'
    }

    await api
      .post('/api/users')
      .send(faultyUser)
      .expect(400)

  })

})

