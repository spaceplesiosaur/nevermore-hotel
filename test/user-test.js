import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";
import users from '../data/user-test-data';
import bookings from '..data/bookings-test-data';
import rooms from '..data/rooms-test-data';

import User from '../src/User';



describe('User', function() {

  let user1;
  let user2;
  let user3;
  let user4;

  beforeEach(() => {

  user1 = new User(user, bookings, 'customer1');
  user2 = new User(user, bookings, 'customer2');
  user3 = new User(user, bookings, 'customer3');
  user4 = new User(user, bookings, 'customer4');

  // chai.spy.on(user1, 'chooseMethod', () => {
  //   return {
  //     "userID": 1,
  //     "date": "2019/06/15",
  //     "numSteps": 3577,
  //     "minutesActive": 140,
  //     "flightsOfStairs": 16
  //   }
  // }
//)
});

  it('should return a users data from their login name', function() {
    expect(user1.getUserInfoFromId(user1.userID)).to.equal({
    id: 1,
    name: "Anastasia Beaverhousen"
    });
  });
});
