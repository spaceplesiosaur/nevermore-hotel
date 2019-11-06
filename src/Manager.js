import User from "./User";
import Roombooker from "./Rooms";

class Manager extends Roombooker {
  constructor(userData, bookings, roomList, username) {
    super(userData, bookings, roomList, username);
    this.userID = null;
  }
  getNumberOpenRoomsByDate(date) {
    return this.findOpenRoomsByDate(date, this.roomList).length
  }
  getTotalRevenueByDate(date) {
    let roomList = this.roomList;
    return Math.round(this.findBookingsByDate(date).reduce(function(sumSoFar, booking) {
      return sumSoFar += roomList.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight;
    }, 0)*100)/100
  }
  getPercentOccupiedByDate(date) {
    return (1 - this.getNumberOpenRoomsByDate(date, this.roomList)/this.roomList.length)* 100
  }
  getUserIdByName(name) {
    return this.userData.find(user => user.name === name).id
  }
}

export default Manager;
