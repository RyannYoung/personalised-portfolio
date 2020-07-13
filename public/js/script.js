/*jshint esversion: 6 */

/**
 * Preloading Section
 *   Waits for the document to load the background image, then removes the loading screen
 */
$(document).ready(function () {
  var img = new Image();
  
  // When the image loads
  img.onload = () => {
    // Remove the preloader loading screen
    $(".preloader").addClass("animated fadeOut").one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $(".preloader").css("display", "none");
    });
  }
  img.src = "../assets/lg/backgroundblue.jpg"
});

/**
 * Firebase Configuration
 */
var config = {
  apiKey: "AIzaSyDtMpFZ9j-aMbtN85bdPI4XM8ouydDKeSY",
  authDomain: "my-portfolio-1c322.firebaseapp.com",
  databaseURL: "https://my-portfolio-1c322.firebaseio.com/",
  storageBucket: "my-portfolio-1c322.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();

/**
 * EmailJs Section
 *   Enables Client-side emailing
 */
function email(leadFirstName, leadLastName, leadEmail, leadPhone, leadReason, leadSubject) {

  // Create a reference to the Firebase database and store the information routed to '/users'
  firebase.database().ref('users/' + leadFirstName + leadLastName).set({
    name: leadFirstName + " " + leadLastName,
    email: leadEmail,
    phone: leadPhone,
    reason: leadReason,
    subject: leadSubject
  });

  // Import the template parameters
  var templateparams = {
    name: leadFirstName + " " + leadLastName,
    email: leadEmail,
    phone: leadPhone,
    reason: leadReason,
    subject: leadSubject
  };

  // Request to send the information
  emailjs.send('gmail', 'template_bXkjvURu', templateparams)
    .then(function (response) {
      console.log('Email Successful: ', response.status, response.text);

    }, function (error) {
      console.log('FAILED...', error);
    });
}

/**
 * EmailJs Submission Section
 */
document.getElementById('submit').addEventListener('click', event => {
  
  // Get the modal (for failed inputs)
  const modal = document.getElementById("modal-unsuccessful")
  const modalSpan = document.getElementsByClassName("close")[0]

  // Hides the modal
  modalSpan.onclick = () => {
    modal.style.display = "none";
    console.log("span lcicked")
  }

  // Store information about the DOM elements, values
  var leadFirstName = document.getElementById('firstName').value;
  var leadLastName = document.getElementById('lastName').value;
  var leadEmail = document.getElementById('email').value;
  var leadPhone = document.getElementById('phone').value;
  var leadReason = document.getElementById('reason').value;
  var leadSubject = document.getElementById('subject').value;

  // Determine if any of the required elements are empty ("")
  if (leadFirstName == "" || leadEmail == "" || leadPhone == "" || leadSubject == "") {
    // Invalid input
    modal.style.display = "block"; // Display the modal
  } else {
    // Successful
    email(leadFirstName, leadLastName, leadEmail, leadPhone, leadReason, leadSubject);
      // Hide the container from view
  $(".container-contact").addClass("animated slideOutDown").one('animationend webkitAnimationEnd oAnimationEnd', function () {
    $(".container-contact").hide();
    $(".container-successful").show();
    $(".container-successful").addClass("animated slideInUp");
  });
  }
});

// Change how the navbar displays when the user scrolls
$(window).scroll(() => {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("nav").addClass("navbar-opaque");

  } else {
    $("nav").removeClass("navbar-opaque");
  }
});

// Bounce the elemnt on click
$(".btn").click(function () {
  var animation = "animated " + "pulse";
  $(this).addClass(animation).one('animationend webkitAnimationEnd oAnimationEnd', function () {
    $(this).removeClass(animation);
  });
});

// Display more text
// todo: Improve this
function displayText(id) {

  // Get the element with the respective name based on it's id
  const dots = document.getElementById(id+"-span-dots");
  const moreText = document.getElementById(id+"-show-more")
  const btnText = document.getElementById("a-btn-show")

  // Display and hide based on the button clicks and their current set value
  if(dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
  document.getElementsByClassName("project-image").style.alignItems = "center"
}

/**
 * Display PDF section
*/
// Get the DOM elemetns for the resume, modal and the span
const modal = document.getElementById("resume-modal")
const modalButton = document.getElementById("btn-resume")
const span = document.getElementById("close-span")

// display the pdf modal
modalButton.onclick = () => {
  modal.style.display = "block";
}

// Hide the pdf modal
span.onclick = () => {
  modal.style.display = "none";
}

// Hide the modal whenever the user clicks on the window
window.onclick = () => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
