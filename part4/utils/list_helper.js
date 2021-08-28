const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let indexOfFavorite = 0
  blogs.forEach((blog, index) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      indexOfFavorite = index
    }
  })
  return blogs[indexOfFavorite]
}

const mostBlogs = (blogs) => {
  // etsi lista kirjoittajasta
  // etsi kunkin kirjoittajan määrä
  // selvitä kenen määrä on isoin
  // palauta nimi ja määrä

  let authors = []
  blogs.forEach((blog, index) => {
    let authorIndex = -1
    authorIndex = authors.findIndex(author => author.name === blog.author)
    if (authorIndex > -1) {
      authors[authorIndex].amount += 1
    } else {
      authors.push({ name: blog.author, amount: 1 })
    }
  })

  let mostBlogs = 0
  let indexOfMostBlogs = 0
  authors.forEach((author, index) => {
    if (author.amount > mostBlogs) {
      mostBlogs = author.amount
      indexOfMostBlogs = index
    }
  })
  return authors[indexOfMostBlogs]
}

const mostLikes = (blogs) => {
  // Author with most likes
  let authors = []
  blogs.forEach((blog, index) => {
    let authorIndex = -1
    authorIndex = authors.findIndex(author => author.name === blog.author)
    if (authorIndex > -1) {
      authors[authorIndex].amount += blog.likes
    } else {
      authors.push({ name: blog.author, amount: blog.likes })
    }
  })

  let mostLikes = 0
  let indexOfMostLikes = 0
  authors.forEach((author, index) => {
    if (author.amount > mostLikes) {
      mostLikes = author.amount
      indexOfMostLikes = index
    }
  })
  let mostLikesAuthor = authors[indexOfMostLikes]
  return { author: mostLikesAuthor.name, likes: mostLikesAuthor.amount }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}