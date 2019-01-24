const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({
      title: 'JS is Great', 
      content: 'Yeap really it is'
    });
    comment = new Comment({
      content: 'Congrats on great post'
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  })

  // 다른 테스트를 무시하고 하나의 테스트만  실행 시킬 때는 
  // it.only('', done => {}) 형태로 사용
  it('saves a relation between a user and a blogpost', done => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great')
        done();
      });
  })

  it('saves a full relation tree', done => {
    User.findOne({name: 'Joe'})
      .populate({
        path:'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.blogPosts[0].content === 'Yeap really it is');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  })
})
