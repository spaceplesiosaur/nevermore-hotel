import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";
import users from '../data/user-test-data';
import bookings from '../data/bookings-test-data';
import rooms from '../data/rooms-test-data';

import User from '../src/User';

chai.use(spies);

describe('User', function() {

  let user1;
  let user2;
  let user3;
  let user4;

  beforeEach(() => {

  user1 = new User(users, bookings, rooms, 'customer1');
  user2 = new User(users, bookings, rooms, 'customer2');
  user3 = new User(users, bookings, rooms, 'customer3');
  user4 = new User(users, bookings, rooms, 'customer4');

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
    chai.spy.on(user4, 'getBookingsById', () => {
      return [
        {
        id: 1572293130154,
        userID: 4,
        date: "2019/11/15",
        roomNumber: 4,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130160,
        userID: 4,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
        }]
    }
  )
    expect(user4.getRevenueById(user4.userID)).to.equal(769.61);
  });
  // it('should find bookings by date', function() {
  //   expect(user1.findBookingsByDate("2019/11/06")).to.eql([
  //   {
  //     id: 1572293130156,
  //     userID: 1,
  //     date: "2019/11/06",
  //     roomNumber: 1,
  //     roomServiceCharges: [ ]
  //   },
  //   {
  //     id: 1572293130160,
  //     userID: 4,
  //     date: "2019/11/06",
  //     roomNumber: 5,
  //     roomServiceCharges: [ ]
  //   }])
  // });
  // it('should find open rooms by date', function() {
  //   chai.spy.on(user1, 'findBookingsByDate', () => {
  //     return [{
  //       id: 1572293130156,
  //       userID: 1,
  //       date: "2019/11/06",
  //       roomNumber: 1,
  //       roomServiceCharges: [ ]
  //     },
  //     {
  //       id: 1572293130160,
  //       userID: 4,
  //       date: "2019/11/06",
  //       roomNumber: 5,
  //       roomServiceCharges: [ ]
  //     }]
  //   })
  //   expect(user1.findOpenRoomsByDate("2019/11/06", rooms)).to.eql([
  //   {
  //     number: 2,
  //     roomType: "suite",
  //     bidet: false,
  //     bedSize: "full",
  //     numBeds: 2,
  //     costPerNight: 477.38
  //   },
  //   {
  //     number: 3,
  //     roomType: "single room",
  //     bidet: false,
  //     bedSize: "king",
  //     numBeds: 1,
  //     costPerNight: 491.14
  //   },
  //   {
  //     number: 4,
  //     roomType: "single room",
  //     bidet: false,
  //     bedSize: "queen",
  //     numBeds: 1,
  //     costPerNight: 429.44
  //   }, {
  //     number: 6,
  //     roomType: "junior suite",
  //     bidet: true,
  //     bedSize: "queen",
  //     numBeds: 1,
  //     costPerNight: 397.02
  //   },
  //   {
  //     number: 7,
  //     roomType: "single room",
  //     bidet: false,
  //     bedSize: "queen",
  //     numBeds: 2,
  //     costPerNight: 231.46
  //   },
  //   {
  //     number: 13,
  //     roomType: "single room",
  //     bidet: false,
  //     bedSize: "queen",
  //     numBeds: 2,
  //     costPerNight: 231.46
  //   }]);
  // });
  // it('should filter a list of rooms by room type', function() {
  //   expect(user1.filterBookingsByType(user1.findOpenRoomsByDate("2019/11/06", rooms), "junior suite", 'roomType')).to.eql([{
  //     number: 6,
  //     roomType: "junior suite",
  //     bidet: true,
  //     bedSize: "queen",
  //     numBeds: 1,
  //     costPerNight: 397.02
  //   }])
  // });
  // it('should show available room details', function() {
  //   expect(user1.showOpenRoomDetails("2019/11/22", rooms, 'bedSize')).to.eql(['queen', 'full']);
  //   expect(user1.showOpenRoomDetails("2019/11/22", rooms, 'roomType')).to.eql(['residential suite', 'suite', 'single room'])
  // });
  // it('should show available room features', function() {
  //   expect(user1.showOpenRoomFeatures('2019/11/22', rooms)).to.eql(['bidet', 'inexpensive', 'haunted']);
  // })
});
