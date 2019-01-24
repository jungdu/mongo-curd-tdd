const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/user_test',{ useNewUrlParser: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error)
    })
})

beforeEach( done => {
  const {users, comments, blogposts} = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      })
    })
  })
})