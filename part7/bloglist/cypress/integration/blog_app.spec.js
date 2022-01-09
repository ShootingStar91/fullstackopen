/* eslint-disable */
describe('Blog app', function() {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Alli Paasikivi',
      username: 'allipaasikivi',
      password: 'allipaasi123'
    }
    const user2 = {
      name: 'Viktor Krum',
      username: 'viktorkrum82',
      password: 'hermione'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page contains login form', function() {
    cy.contains('Login to bloglist app')
  })

  describe('Login', function() {
    it('fails with incorrect login input', function() {
      cy.get('#username').type('allipaasikivi')
      cy.get('#password').type('vaarasalasana')
      cy.get('#login-button').click()
      cy.contains('Login failed')
      cy.get('#error-notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
    it('succeeds with correct login input', function() {
      cy.get('#username').type('allipaasikivi')
      cy.get('#password').type('allipaasi123')
      cy.get('#login-button').click()
      cy.contains('Alli Paasikivi is logged in.')
    })
  })

  describe('When user is logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'allipaasikivi', password: 'allipaasi123' })
    })

    function postBlog(title, author, url) {
      cy.get('#show-blog-form-button').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('#post-blog-button').click()
    }

    function clickBlog(containsText, times) {
      cy.contains(containsText).within(() => {
        cy.get('[data-cy=show-button]').click()
        for (let i = 0; i < times; i++) {
          cy.get('[data-cy=like-button]').click()
          // Make cypress wait 500ms for like to refresh
          // Prevents flakiness of test but probably
          // more elegant solution exists
          cy.wait(500)
        }
      })      
    }
    
    it('a blog can be posted', function() {
      postBlog('Hermionen tonttuoikeusblogi', 'Hermione Granger', 'http://hermione.fi')

      cy.contains('Hermionen tonttuoikeusblogi')
      cy.contains('Hermione Granger')
    })

    it('a blog can be liked', function() {
      postBlog('Hermionen tonttuoikeusblogi', 'Hermione Granger', 'http://hermione.fi')

      cy.get('[data-cy=show-button]').click()
      cy.get('[data-cy=like-button]').click()
      cy.contains('Likes: 1')
    })

    it('a blog can be removed', function() {
      postBlog('Hermionen tonttuoikeusblogi', 'Hermione Granger', 'http://hermione.fi')

      cy.get('[data-cy=show-button]').click()
      cy.get('[data-cy=delete-button]').click()
      cy.contains('Hermionen tonttuoikeusblogi').should('not.exist')
    })

    it('a blog cannot be removed by a wrong user', function() {
      postBlog('Hermionen tonttuoikeusblogi', 'Hermione Granger', 'http://hermione.fi')

      cy.get('#logout-button').click()
      
      cy.login({ username: 'viktorkrum82', password: 'hermione' })

      cy.get('[data-cy=show-button]').click()
      cy.get('[data-cy=delete-button]').click()
      cy.contains('Hermionen tonttuoikeusblogi')
      cy.contains('Error with deleting blog')
    })

    it('blogs are sorted correctly by amount of likes', function() {
      
      // Post three blogs
      postBlog('Hermionen tonttuoikeusblogi', 'Hermione Granger', 'http://hermione.fi')
      postBlog('Ronin huispausblogi', 'Ron Weasley', 'http://weasley.fi')
      postBlog('Harrin hupiblogi', 'Harry Potter', 'http://potterforpresident.fi')
      
      // Click each blog different amount of times
      clickBlog('Hermionen', 1)
      clickBlog('Harrin', 2)
      clickBlog('Ronin', 3)

      // Check they are now sorted by likes
      cy.get('[data-cy=blog-root]').should(($e) => {
        expect($e).to.have.length(3)
        expect($e.first()).to.contain('3')
        expect($e.first()).to.contain('Ronin')
        expect($e.last()).to.contain('Hermionen')
        expect($e.last()).to.contain('1')
      })

    })

  })
  

})

