class User {
  constructor(userData, bookings, username) {
    this.userData = userData;
    this.bookings = bookings;
    this.userID = parseInt(username.slice(8));
  }
  getUserInfoFromId(id) {
    this.userData.find(user => {
      return user.id === id
    });
  }
  getBookingsById(id) {
    this.bookings.filter(booking => {
      return booking.userID === id;
    });
  }
  getRevenueById(id, roomList) {
    this.getBookingsById(id).reduce(function(sumSoFar, booking) {
      sumSoFar += roomList.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight
    }, 0)
  }
  
}

export default User;
