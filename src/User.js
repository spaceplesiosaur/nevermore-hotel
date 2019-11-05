class User {
  constructor(userData, bookings, username) {
    this.userData = userData;
    this.bookings = bookings;
    this.userID = parseInt(username.slice(8));
  }
  getUserInfoFromId(id) {
    return this.userData.find(user => {
      return user.id === id
    });
  }
  getBookingsById(id) {
    return this.bookings.filter(booking => {
      return booking.userID === id;
    });
  }
  getRevenueById(id, roomList) {
    return this.getBookingsById(id).reduce(function(sumSoFar, booking) {
      return sumSoFar += roomList.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight;
    }, 0)
  }
}

export default User;
