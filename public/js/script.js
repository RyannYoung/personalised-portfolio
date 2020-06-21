/*jshint esversion: 6 */

// PRELOADER SECTION
$(document).ready(function () {

  $(".preloader").addClass("animated fadeOut").one('animationend webkitAnimationEnd oAnimationEnd', function () {
    $(".preloader").css("display", "none");
  });

});


// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyDtMpFZ9j-aMbtN85bdPI4XM8ouydDKeSY",
  authDomain: "my-portfolio-1c322.firebaseapp.com",
  databaseURL: "https://my-portfolio-1c322.firebaseio.com/",
  storageBucket: "my-portfolio-1c322.appspot.com"
};

firebase.initializeApp(config);



// Get a reference to the database service
var database = firebase.database();

function email(leadFirstName, leadLastName, leadEmail, leadPhone, leadReason, leadSubject) {
  firebase.database().ref('users/' + leadFirstName + leadLastName).set({
    name: leadFirstName + " " + leadLastName,
    email: leadEmail,
    phone: leadPhone,
    reason: leadReason,
    subject: leadSubject
  });

  var templateparams = {
    name: leadFirstName + " " + leadLastName,
    email: leadEmail,
    phone: leadPhone,
    reason: leadReason,
    subject: leadSubject
  };

  emailjs.send('gmail', 'template_bXkjvURu', templateparams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      $(".container-contact").addClass("animated slideOutLeft").one('animationend webkitAnimationEnd oAnimationEnd', function () {
        $(".container-contact").hide();
      });



      $(".container-successful").show();

    }, function (error) {
      console.log('FAILED...', error);
    });


}

document.getElementById('submit').addEventListener('click', event => {

  // Hide the container from view
  $(".container-contact").addClass("animated slideOutLeft").one('animationend webkitAnimationEnd oAnimationEnd', function () {
    $(".container-contact").hide();
    $(".container-successful").addClass("animated slideInUp");
    $(".container-successful").show();

  });



  console.log("Successful");
  var leadFirstName = document.getElementById('firstName').value;
  var leadLastName = document.getElementById('lastName').value;
  var leadEmail = document.getElementById('email').value;
  var leadPhone = document.getElementById('phone').value;
  var leadReason = document.getElementById('reason').value;
  var leadSubject = document.getElementById('subject').value;

  if (leadFirstName == "" || leadEmail == "" || leadPhone == "" || leadSubject == "") {
    window.alert("Invalid Entry! Please make sure you have provided information on all elements marked with *");
  } else {
    email(leadFirstName, leadLastName, leadEmail, leadPhone, leadReason, leadSubject);
  }
});

console.log(document.getElementById('submit').value);
console.log(document.getElementById('firstName').value);

// Scroll method
$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("nav").addClass("navbar-opaque");

  } else {
    $("nav").removeClass("navbar-opaque");
  }
});

// Bounce the object on click
$(".btn").click(function () {
  var animation = "animated " + "pulse";
  $(this).addClass(animation).one('animationend webkitAnimationEnd oAnimationEnd', function () {
    $(this).removeClass(animation);
  });
});