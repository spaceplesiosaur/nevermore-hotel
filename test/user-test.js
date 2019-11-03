import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";
import users from '../data/user-test-data';
import bookings from '../data/bookings-test-data';
import rooms from '../data/rooms-test-data';

import User from '../src/User';



describe('User', function() {

  let user1;
  let user2;
  let user3;
  let user4;

  beforeEach(() => {

  user1 = new User(users, bookings, 'customer1');
  user2 = new User(users, bookings, 'customer2');
  user3 = new User(users, bookings, 'customer3');
  user4 = new User(users, bookings, 'customer4');

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
    expect(user1.getUserInfoFromId(user1.userID)).to.eql({
      id: 1,
      name: 'Anastasia Beaverhousen'
    });
    expect(user3.getUserInfoFromId(user3.userID)).to.eql({
      id: 3,
      name: "Hannah Montana"
    });
  });
  it('should return a list of bookings from a users id', function() {
    expect(user1.getBookingsById(user1.userID)).to.eql([
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130163,
        userID: 1,
        date: "2019/12/09",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130164,
        userID: 1,
        date: "2019/12/01",
        roomNumber: 2,
        roomServiceCharges: [ ]
      }
    ]);
  });
  it('should get total revenue of user from id', function() {
    expect(user4.getRevenueById(user4.userID, rooms)).to.equal(769.61);
  });
});
