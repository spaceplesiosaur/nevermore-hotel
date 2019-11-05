// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/raven-logo-2.jpg';
import './images/pngtree-feather.png';
import './images/disco-lounge.png';
import './images/disco-gardens.png';
import './images/disco-pool.png'

console.log('This is the JavaScript entry file - your code begins here.');

  $('#logInButton').click((event) => {
    console.log($('#username-input'))
    if ($('#username-input').val().includes('manager') ) {
      $('#managerPage').removeClass('hidden');
    }
    if ($('#username-input').val().includes('customer') ) {
      $('#userPage').removeClass('hidden');
    }
    $('#loginPage').addClass('hidden');
    

  });


// const userFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
//   .then(response => response.json())
//   .then(data => {
//     console.log((data.users))
//     return (data.users)})
//   .catch(data => console.log('Fetch error - user data. User may not be defined.', data));
//
// const roomFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.rooms)
//     return (data.rooms)})
//   .catch(data => console.log('Fetch error - room data. Room info may not be defined.', data));
//
//
// const bookingFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.bookings)
//     return (data.bookings)})
//   .catch(data => console.log('Fetch error - booking data. Booking info may not be defined.', data));
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
