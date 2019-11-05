import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";
import users from '../data/user-test-data';
import bookings from '../data/bookings-test-data';
import rooms from '../data/rooms-test-data';

import Roombooker from '../src/Rooms';

chai.use(spies);

describe('Rooms', function() {

  let rooms1;

  beforeEach(() => {

  rooms1 = new Roombooker(users, bookings, rooms, 'customer1');

});
  it('should find bookings by date', function() {
    expect(rooms1.findBookingsByDate("2019/11/06")).to.eql([
    {
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
    }])
  });
  it('should find open rooms by date', function() {
    chai.spy.on(rooms1, 'findBookingsByDate', () => {
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
      }]
    })
    expect(rooms1.findOpenRoomsByDate("2019/11/06")).to.eql([
    {
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
    }]);
  });
  it('should filter a list of rooms by room type', function() {
    chai.spy.on(rooms1, 'findOpenRoomsByDate', () => {
      return [
      {
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
      }]
    })
    expect(rooms1.filterBookingsByType(rooms1.findOpenRoomsByDate("2019/11/06"), "junior suite", 'roomType')).to.eql([{
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
    }])
  });
  it('should show available room details', function() {
    expect(rooms1.showOpenRoomDetails("2019/11/22", 'bedSize')).to.eql(['queen', 'full']);
    expect(rooms1.showOpenRoomDetails("2019/11/22", 'roomType')).to.eql(['residential suite', 'suite', 'single room'])
  });
  it('should show available room features', function() {
    expect(rooms1.showOpenRoomFeatures('2019/11/22')).to.eql(['bidet', 'inexpensive', 'haunted']);
  });
  // it('should post a new room booking', function() {
  //   rooms1.roomBook = {
  //     userID: 20,
  //     date: "2019/11/08",
  //     roomNumber: 13,
  //   };
  //   chai.spy.on(global, 'fetch', () => {
  //     return new Promise((resolve, reject) => {
  //       resolve({message: 'booking has been posted'})
  //     })
  //   });
  //   expect(rooms1.bookRoom()).to.have.been.called(1);
  // });
  // it('should delete a room booking', function() {
  //   rooms1.roomBook = {
  //     userID: 20,
  //     date: "2019/11/08",
  //     roomNumber: 13,
  //     id: Date.now()
  //   };
  //   expect(rooms1.cancelRoom()).to.have.been.called(1);
  // });
});
