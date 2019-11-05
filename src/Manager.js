import User from "./User";
import Roombooker from "./Rooms";

class Manager extends Roombooker {
  constructor(userData, bookings, roomList, username) {
    super(userData, bookings, roomList, username);
    this.userID = null;
  }
  getNumberOpenRoomsByDate(date, roomList) {
    return this.findOpenRoomsByDate(date, roomList).length
  }
  getTotalRevenueByDate(date, roomList) {
    return Math.round(this.findBookingsByDate(date).reduce(function(sumSoFar, booking) {
      return sumSoFar += roomList.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight;
    }, 0)*100)/100
  }
  getPercentOccupiedByDate(date, roomList) {
    return (1 - this.getNumberOpenRoomsByDate(date, roomList)/roomList.length)* 100
  }
}

export default Manager;
