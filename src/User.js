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
  findBookingsByDate(date) {
    return this.bookings.filter(booking => {
      return booking.date === date;
    })
  }
  findOpenRoomsByDate(date, roomList) {
      let bookedRooms = this.findBookingsByDate(date).map(booking => {
        return roomList.find(room => room.number === booking.roomNumber)
      })

      let openRooms = roomList.filter(room => {
        return !bookedRooms.includes(room);
      })
    return openRooms;
  }
  showOpenRoomDetails(date, roomList, chosenDetail) {
    let detailsList = [];
    let openRooms = this.findOpenRoomsByDate(date, roomList);
    openRooms.forEach(room => {
      if (!detailsList.includes(room[chosenDetail])) {
        detailsList.push(room[chosenDetail]);
      }
    })
    return detailsList;
  }
  showOpenRoomFeatures(date, roomList) {
    let featureList = [];
    let openRooms = this.findOpenRoomsByDate(date, roomList);
    openRooms.forEach(room => {
      if (!featureList.includes('bidet') && room.bidet === true)
      featureList.push('bidet');
      if (!featureList.includes('haunted') && room.number % 13 === 0)
      featureList.push('haunted')
      if (!featureList.includes('inexpensive') && room.costPerNight < 400)
      featureList.push('inexpensive')
    });
    return featureList;
  }
  filterBookingsByType(roomList, roomInfo, roomDetail) {
    return roomList.filter(roomItem => {
      return roomItem[roomDetail] === roomInfo;
    })
  }
}

export default User;
