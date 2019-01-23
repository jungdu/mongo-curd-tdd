const assert = require('assert');
const User = require('../src/user');

describe('Updating records', ()=> {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(()=> done())
  });

  it('instance type using set n save', done => {
    joe.set('name', 'Alex'); // 데이터 베이스에 적용되기 전.
    assertName(joe.save(),done);
  })

  it('instance type using set n save', done => {
    assertName(joe.update({name: 'Alex'}), done);
  })

  it('A model class can update', done => {
    assertName(
      User.updateOne({ name: 'Joe' }, { name: 'Alex' }),
      done
    )
  })
  
  it('A model class can find a record with an Id and update', done =>{
    assertName(
      User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
      done
    )
  });

  it('A model class can find a record with an Id and update', done => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
      done
    )
  })
})

const assertName = (pm, done) => {
  pm.then(() => User.find({}))
  .then(users => {
    assert(users.length === 1);
    assert(users[0].name === 'Alex');
    done();
  });
}