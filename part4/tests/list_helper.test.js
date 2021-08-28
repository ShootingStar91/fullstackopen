const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogsWithOneAndTwoLikes = [
    {
      _id: '1234asdfa123',
      title: 'Alli Paasikiven muistelmat',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 1,
      __v: 0
    },    
    {
      _id: '123asdfasdf1af',
      title: 'Alli Paasikiven muistelmat 2',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 2,
      __v: 0
    }
  ]

  const blogWithZeroLikes = [
    {
      _id: '1234asdfa123',
      title: 'Alli Paasikiven muistelmat',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 0,
      __v: 0
    }
  ]

  test('when blogs have one and two likes totallikes is three', () => {
    const result = listHelper.totalLikes(blogsWithOneAndTwoLikes)
    expect(result).toBe(3)
  })

  test('when blog has zero likes return is zero', () => {
    const result = listHelper.totalLikes(blogWithZeroLikes)
    expect(result).toBe(0)
  })

})

describe('favorite blog', () => {
  const blogsWithOneAndFiveAndThreeLikes = [
    {
      _id: '1234asdfa123',
      title: 'Alli Paasikiven muistelmat',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 1,
      __v: 0
    },    
    {
      _id: '123asdfasdf1af',
      title: 'Alli Paasikiven muistelmat 2',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 5,
      __v: 0
    },    
    {
      _id: '123vxvssfsaa',
      title: 'Alli Paasikiven muistelmat 3',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 3,
      __v: 0
    }
  ]

  test('favorite blog is with 2 likes', () => {
    const result = listHelper.favoriteBlog(blogsWithOneAndFiveAndThreeLikes)
    expect(result).toEqual(blogsWithOneAndFiveAndThreeLikes[1])
  })

})

describe('author with most blogs', () => {
  const fiveBlogsFromTwoAuthors = [
    {
      _id: '1234asdfa123',
      title: 'Alli Paasikiven muistelmat',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 1,
      __v: 0
    },    
    {
      _id: '123asdfasdf1af',
      title: 'Alli Paasikiven muistelmat 2',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 5,
      __v: 0
    },    
    {
      _id: '123vxvssfsaa',
      title: 'Harrin Muistelmat 1',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    },    
    {
      _id: '6785456hfghfghfgh',
      title: 'Harrin Muistelmat 2',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    },    
    {
      _id: '34534dfgdfg',
      title: 'Harrin Muistelmat 3',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    }
  ]


  test('five blogs from two authors', () => {
    const result = listHelper.mostBlogs(fiveBlogsFromTwoAuthors)
    expect(result).toEqual({name: 'Jo Row', amount: 3 })

  })
})

describe('author with most likes', () => {
  const fiveBlogsFromTwoAuthors = [
    {
      _id: '1234asdfa123',
      title: 'Alli Paasikiven muistelmat',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 1,
      __v: 0
    },    
    {
      _id: '123asdfasdf1af',
      title: 'Alli Paasikiven muistelmat 2',
      author: 'Alli Paasikivi',
      url: 'http://allin.kotisivut.fi',
      likes: 5,
      __v: 0
    },    
    {
      _id: '123vxvssfsaa',
      title: 'Harrin Muistelmat 1',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    },    
    {
      _id: '6785456hfghfghfgh',
      title: 'Harrin Muistelmat 2',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    },    
    {
      _id: '34534dfgdfg',
      title: 'Harrin Muistelmat 3',
      author: 'Jo Row',
      url: 'http://wizardinworld.fi',
      likes: 3,
      __v: 0
    }
  ]


  test('jo row 9 likes vs alli with 5', () => {
    const result = listHelper.mostLikes(fiveBlogsFromTwoAuthors)
    expect(result).toEqual({ author: 'Jo Row', likes: 9 })
  })

})