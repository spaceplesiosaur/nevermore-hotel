import User from "./User";

class Roombooker extends User {
  constructor(userData, bookings, roomList, username) {
    super(userData, bookings, roomList, username)
    this.roomBook = {};
  }
  findBookingsByDate(date) {
    return this.bookings.filter(booking => {
      return booking.date === date;
    })
  }
  findOpenRoomsByDate(date) {
      let bookedRooms = this.findBookingsByDate(date).map(booking => {
        return this.roomList.find(room => room.number === booking.roomNumber)
      })

      let openRooms = this.roomList.filter(room => {
        return !bookedRooms.includes(room);
      })
    return openRooms;
  }
  showOpenRoomDetails(date, chosenDetail) {
    let detailsList = [];
    let openRooms = this.findOpenRoomsByDate(date);
    openRooms.forEach(room => {
      if (!detailsList.includes(room[chosenDetail])) {
        detailsList.push(room[chosenDetail]);
      }
    })
    return detailsList;
  }
  showOpenRoomFeatures(date) {
    let featureList = [];
    let openRooms = this.findOpenRoomsByDate(date);
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
  filterBookingsByType(roomsList, roomInfo, roomDetail) {
    return this.roomList.filter(roomItem => {
      return roomItem[roomDetail] === roomInfo;
    })
  }
  bookRoom() {
    console.log("booking", this.roomBook);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(this.roomBook)
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('There was an error submitting your booking', error))
  }
  cancelRoom() {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: {id: this.roomBook.id}
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('There was an error deleting your booking', error))
  }
}

export default Roombooker;
