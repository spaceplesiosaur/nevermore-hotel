import $ from 'jquery';

import './css/base.scss';

import User from "./User";
import Manager from "./Manager";
import Roombooker from "./Rooms";


import './images/raven-logo-2.jpg';
import './images/pngtree-feather.png';
import './images/disco-lounge.png';
import './images/disco-gardens.png';
import './images/disco-pool.png';
import './images/lobby.png';
import './images/music-lounge.png';
import './images/goth-pool.png';


let today = new Date();
let day = today.getDate().toString().padStart(2, '0');
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let year = today.getFullYear().toString();
today = `${year}/${month}/${day}`;
let newUserId;

console.log(today);

const userFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => {
    return (data.users)
  })
  .catch(data => console.log('Fetch error - user data. User may not be defined.', data));

const roomFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => {
    return (data.rooms)
  })
  .catch(data => console.log('Fetch error - room data. Room info may not be defined.', data));


const bookingFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => {
    return (data.bookings)
  })
  .catch(data => console.log('Fetch error - booking data. Booking info may not be defined.', data));

$('#logInButton').click((event) => {

  Promise.all([userFetch, roomFetch, bookingFetch]).then((requiredData) => {
    const users = requiredData[0];
    const rooms = requiredData[1];
    const bookings = requiredData[2];

    if ($('#username-input').val().includes('manager') && $('#password-input').val() === 'overlook2019') {
      $('#managerPage').removeClass('hidden');
      $('#loginPage').addClass('hidden');
      const manager = new Manager(users, bookings, rooms, $('#username-input').val());
      hydrateManagerPage(manager, today);

      $('#managerFormButton').click(openSearchPage);

      $('#managerSearchButton').click((event) => {
        $('#newUserInfo').removeClass('hidden');
        newUserId = manager.getUserIdByName($('#newUserInput').val());
        hydrateManagerSearch(manager, today, newUserId);
      });

      $('#newUserBookings').click(event => {
        const bookingDelete = {}
        bookingDelete.id = parseInt(event.target.id);
        manager.cancelRoom(bookingDelete);
      });

      $('#openABookingManager').click((event) => {
        openBookingPage()
        hydrateBookingWelcome(manager);
      });

      $('#findRoomsButton').click((event) => {
        hydrateOpenRoomLists(manager, $('#bookerDate').val(), 'roomType');
      });

      $('#roomTypes').click(event => {
        $('#openRoomsList').removeClass('hidden');
        $('#openRoomsNumbers').html(hydrateRoomNumbers(manager, event.target.id, 'roomType', $('#book-date').val()));
      });
      $('#openRoomsNumbers').click(event => {
        console.log($('#bookerDate').val())
        const postInfo = {};
        postInfo.userID = parseInt(newUserId);
        postInfo.date = ($('#book-date').val()).split('-').join('/');
        postInfo.roomNumber = parseInt(event.target.id);
        manager.bookRoom(postInfo);
      });
    }


    if ($('#username-input').val().includes('customer') && $('#password-input').val() === 'overlook2019') {
      $('#userPage').removeClass('hidden');
      $('#loginPage').addClass('hidden');
      const user = new User(users, bookings, rooms, $('#username-input').val());
      const booker = new Roombooker(users, bookings, rooms, $('#username-input').val());
      hydrateUserPage(user, today);

      $('#openABookingUser').click((event) => {
        openBookingPage();
        hydrateBookingWelcome(user);
      });

      $('#findRoomsButton').click((event) => {
        hydrateOpenRoomLists(booker, $('#bookerDate').val(), 'roomType');
      });

      $('#roomTypes').click(event => {
        console.log('EVENT', event.target);
        $('#openRoomsList').removeClass('hidden');
        $('#openRoomsNumbers').html(hydrateRoomNumbers(booker, event.target.id, 'roomType', $('#book-date').val()));
      })

      $('#openRoomsNumbers').click(event => {
        console.log($('#bookerDate').val())
        const postInfo = {};
        postInfo.userID = parseInt(user.userID);
        postInfo.date = ($('#book-date').val()).split('-').join('/');
        postInfo.roomNumber = parseInt(event.target.id);
        booker.bookRoom(postInfo);
      });
    }




  })
})
//       })
//   })
// });

function hydrateManagerPage(manager, today) {
  $('#managerDate').text(`Date: ${today}`);
  $('#managerTotalRooms').text(`Open Rooms: ${manager.getNumberOpenRoomsByDate(today)}`);
  $('#managerPecentOcc').text(`Percent Occupied: ${manager.getPercentOccupiedByDate(today).toFixed()}%`);
  $('#managerTotalRevenue').text(`Total Revenue: $${manager.getTotalRevenueByDate(today)}`);
};

function openSearchPage(event) {
  $('#managerSearchBox').removeClass('hidden');
};

function hydrateManagerSearch(manager, today, newUserId) {
  $('#newUserName').text($('#newUserInput').val());
  $('#newUserTotal').text(`$${manager.getRevenueById(newUserId).toFixed(2)}`);
  $('#newUserBookings').html(getUserBookings(manager, newUserId))
};

function hydrateUserPage(user, today) {
  $('#userGreet').text(`Hello, ${user.getUserInfoFromId(user.userID).name}!`);
  $('#userDate').text(`Date: ${today}`);
  $('#userBookings').html(getUserBookings(user, user.userID));
  $('#userTotalSpent').text(`$${user.getRevenueById(user.userID).toFixed(2)}`);
};

function getUserBookings(userType, id) {
  return userType.getBookingsById(id).sort(
    (a, b) => {
      return new Date(b.date) - new Date(a.date)
    }
  ).map(booking => {
    if (userType.userID === null && new Date(booking.date) >= new Date(today)) {
      return `<li class="booking-info-listItem">
        <button class="cancel-button" id="${booking.id}">Cancel</button>
        <section class="booking-date-room">
          <p class="booking-info-text"><span class="bold">Date:</span> ${booking.date}</p>
          <p class="booking-info-text"><span class="bold">Room:</span> ${booking.roomNumber}</p>
        </section>
      </li>`
    } else {
      return `<li class="booking-info-listItem">
      <p class="booking-info-text"><span class="bold">Date:</span> ${booking.date}</p>
      <p class="booking-info-text"><span class="bold">Room:</span> ${booking.roomNumber}</p>
      </li>`
    }
  })
};

function openBookingPage(event) {
  $('#booking-page').removeClass('hidden');
  $('#userPage').addClass('hidden');
  $('#managerSearchBox').addClass('hidden');
  $('#managerPage').addClass('hidden');
  $('#newUserInfo').addClass('hidden');
};

function chooseUser(userType) {
  if (userType.userID === null) {
    return newUserId;
  } else {
    return userType.userID;
  }
}

function hydrateBookingWelcome(userType) {
  $('#bookerName').text(`${userType.getUserInfoFromId(chooseUser(userType)).name}`)
}

function hydrateOpenRoomLists(userType, date, chosenDetail) {
  $("#listsOfRooms").removeClass('hidden');
  $("#roomTypes").html(hydrateRoomTypes(userType, date, chosenDetail));
  $("#roomFeatures").html(hydrateRoomFeatures(userType, date));
}

function hydrateRoomTypes(userType, date, chosenDetail) {
  return userType.showOpenRoomDetails(date, chosenDetail).map((detail) => {
    return `<li class="booking-info-listItem">
      <button class="cancel-button" id="${detail}">Choose</button>
      <p class="booking-info-text"><span class="bold">Roomtype:</span>${detail}</p>
    </li>`
  })
}

function hydrateRoomFeatures(userType, date) {
  return userType.showOpenRoomFeatures(date).map((detail) => {
    return `<li class="booking-info-listItem" id="${detail}">
      <p>${detail}</p>
    </li>`
  })
}

function hydrateRoomNumbers(userType, roomInfo, roomDetail, date) {
  let roomsList = userType.findOpenRoomsByDate(date);
  return userType.filterBookingsByType(roomsList, roomInfo, roomDetail).map((room) => {
    return `<li class="booking-info-listItem">
      <button class="cancel-button" id="${room.number}">Book!</button>
      <section class="booking-date-room">
        <p class="booking-info-text"><span class="bold">Room:</span> ${room.number}</p>
        <p class="booking-info-text"><span class="bold">Cost:</span> ${room.costPerNight}</p>
      </section>
    </li>`
  })
}
