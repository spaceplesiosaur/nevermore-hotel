import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";
import users from '../data/user-test-data';
import bookings from '../data/bookings-test-data';
import rooms from '../data/rooms-test-data';

import Manager from '../src/Manager';

chai.use(spies);

describe('Manager', function() {

  let manager1;

  beforeEach(() => {

  manager1 = new Manager(users, bookings, rooms, 'manager');

});

  it('should return the number of open rooms on a date', function() {
    chai.spy.on(manager1, 'findOpenRoomsByDate', () => {
      return [{
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
      }, {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 13,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      }];
    });
    expect(manager1.getNumberOpenRoomsByDate('2019/11/06', rooms)).to.eql(6);
  });
  it('should return the total revenue on a date', function() {
    chai.spy.on(manager1, 'findBookingsByDate', () => {
      return [{
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 4,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
      }];
    });
    expect(manager1.getTotalRevenueByDate('2019/11/06', rooms)).to.eql(698.57)
  })
  it('should give the percentage of occupied rooms by date', function() {
    chai.spy.on(manager1, 'findOpenRoomsByDate', () => {
      return [{
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
      }, {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 13,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      }];
    });
    expect(manager1.getPercentOccupiedByDate('2019/11/06', rooms)).to.eql(25)
  })
  it('should return a user id from a name', function() {
    expect(manager1.getUserIdByName('Anastasia Beaverhousen')).to.equal(1);
  })

});
