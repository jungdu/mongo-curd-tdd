const assert = require('assert');
const User = require('../src/user');

describe('Subdocumnets', ()=> {

  it('can create a subdocument', done => {
    const joe = new User({
      name: 'Joe', 
      posts: [{title: 'PostTitle'}]
    })

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      })
  })

  it('Can add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        assert(user.posts[0].title === 'New Post');
        done();
      })
  })

  it('can remove an existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'New Title'}]
    })

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        const post = user.posts[0];
        post.remove();  // 배열에서 해당 요소를 뻇지만 데이터베이스에 적용이 되지 않은 상태
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      })
  })
})