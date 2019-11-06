class User {
  constructor(userData, bookings, roomList, username) {
    this.userData = userData;
    this.bookings = bookings;
    this.roomList = roomList;
    this.userID = parseInt(username.slice(8));
  }
  getUserInfoFromId(id) {
    return this.userData.find(user => {
      return user.id === id
    });
  }
  getBookingsById(id) {
    const ret = this.bookings.filter(booking => {
      return booking.userID === id;
    });
    console.log('RET', id);
    return ret;
  }
  getRevenueById(id) {
    let roomList = this.roomList;
    return this.getBookingsById(id).reduce(function(sumSoFar, booking) {
      return sumSoFar += roomList.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight;
    }, 0)
  }
}

export default User;
