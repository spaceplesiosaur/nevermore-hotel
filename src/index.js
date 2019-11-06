
import $ from 'jquery';

import './css/base.scss';

import User from "./User";
import Manager from "./Manager";
import Roombooker from "./Rooms";


import './images/raven-logo-2.jpg';
import './images/pngtree-feather.png';
import './images/disco-lounge.png';
import './images/disco-gardens.png';
import './images/disco-pool.png'

console.log('This is the JavaScript entry file - your code begins here.');

let today = new Date();
let day = today.getDate().toString().padStart(2, '0');
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let year = today.getFullYear().toString();
today = `${year}/${month}/${day}`;

console.log(today);

const userFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => {
    return (data.users)})
  .catch(data => console.log('Fetch error - user data. User may not be defined.', data));

const roomFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => {
    return (data.rooms)})
  .catch(data => console.log('Fetch error - room data. Room info may not be defined.', data));


const bookingFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => {
    return (data.bookings)})
  .catch(data => console.log('Fetch error - booking data. Booking info may not be defined.', data));

  $('#logInButton').click((event) => {

    Promise.all([userFetch, roomFetch, bookingFetch]).then((requiredData) => {
      const users = requiredData[0];
      const rooms = requiredData[1];
      const bookings = requiredData[2];
    if ($('#username-input').val().includes('manager') ) {
      $('#managerPage').removeClass('hidden');
      const manager = new Manager(users, bookings, rooms, $('#username-input').val());
      hydrateManagerPage(manager, today);
      $('#managerFormButton').click(openSearchPage);
      $('#managerSearchButton').click((event) => {
        $('#newUserInfo').removeClass('hidden');
        const newUserId = manager.getUserIdByName($('#newUserInput').val());
        hydrateManagerSearch(manager, today, newUserId);
      });
      $('#newUserBookings').click(event => {
        console.log('EVENT TARGET', event.target);
        const bookingDelete = {}
        bookingDelete.id = parseInt(event.target.id);
        manager.cancelRoom(bookingDelete);
      })
    }
    if ($('#username-input').val().includes('customer') ) {
      $('#userPage').removeClass('hidden');
      const user = new User(users, bookings, rooms, $('#username-input').val());
      hydrateUserPage(user, today);
    }
    $('#loginPage').addClass('hidden');
    })
  });

function hydrateManagerPage(manager, today) {
  $('#managerDate').text(`Date: ${today}`);
  $('#managerTotalRooms').text(`Open Rooms: ${manager.getNumberOpenRoomsByDate(today)}`);
  $('#managerPecentOcc').text(`Percent Occupied: ${manager.getPercentOccupiedByDate(today).toFixed()}%`);
  $('#managerTotalRevenue').text(`Total Revenue: $${manager.getTotalRevenueByDate(today)}`);
};

function openSearchPage(event) {
  $('#managerSearchBox').removeClass('hidden');
  $('#managerCenterpiece').addClass('hidden');
};

// function openNewUserInfo(event) {  
//   $('#newUserInfo').removeClass('hidden');
//   const newUserId = manager.getUserIdByName($('#newUserInput').val());
//   hydrateManagerSearch(manager, today, newUserId);
// }

function hydrateManagerSearch(manager, today, newUserId) {
  $('#newUserName').text($('#newUserInput').val());
  $('#newUserTotal').text(`$${manager.getRevenueById(newUserId).toFixed(2)}`);
  $('#newUserBookings').html(getUserBookings(manager, newUserId))
}

function hydrateUserPage(user, today) {
  $('#userGreet').text(`Hello, ${user.getUserInfoFromId(user.userID).name}!`);
  $('#userDate').text(`Date: ${today}`);
  $('#userBookings').html(getUserBookings(user, user.userID));
  $('#userTotalSpent').text(`$${user.getRevenueById(user.userID).toFixed(2)}`);
};

function getUserBookings(userType, id) {
  return userType.getBookingsById(id).sort(
    (a, b) => {return new Date(b.date) - new Date(a.date)}
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

// $('#newUserBookings').click(event) => {
//   manager.roomBook.id = event.target.id;
//   manager.cancelRoom();
// }

//
//
//
// const bookingItem = {
//   userID: 20,
//   date: "2019/11/07",
//   roomNumber: 13,
// }
//
//
//
// function postBooking(bookingObj) {
//   console.log("booking", bookingObj);
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': "application/json"
//     },
//     body: JSON.stringify(bookingObj)
//   }).then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log('There was an error submitting your booking', error))
//   }


// postBooking(bookingItem);
