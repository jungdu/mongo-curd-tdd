const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');
const BlogPost = require('../src/blogPost');

describe('Middle ware', ()=> {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({
      title: 'JS is Great', 
      content: 'Yeap really it is'
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  })

  it('users clean up danglin gblogposts on delete', done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0)
        done();
      })
  })
})