const firebaseConfig = {
  apiKey: "AIzaSyCiAwI1hnkwOitWqCxLq4xETOlnEpBAPdQ",
  authDomain: "fithub-4b209.firebaseapp.com",
  projectId: "fithub-4b209",
  storageBucket: "fithub-4b209.appspot.com",
  messagingSenderId: "70189627018",
  appId: "1:70189627018:web:c15fd06c868bd128c29f73",
  measurementId: "G-Y9KKNK3PKT"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Whoa! Kindly check your details')
    return
    // Don't continue running the code
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  console.log("button clicked");
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    //alert('User Logged In!!')
    
    setTimeout(function() {
      // Hide loading overlay after a delay (simulate login process completion)
      window.location.href = "admin/index.html"; 
      // Here you can redirect or perform other actions after logging in
    }, 2000);
     
   

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


const loadingOverlay = document.getElementById("loadingOverlay");
// const loginBtn = document.getElementById("loginBtn");
// loginBtn.addEventListener("click", function() {
//   // Show loading overlay
//   loadingOverlay.style.display = "block";
  
//   // Simulate login process
//   login();
//   setTimeout(function() {
//     // Hide loading overlay after a delay (simulate login process completion)
//     loadingOverlay.style.display = "none";
//     // Here you can redirect or perform other actions after logging in
//   }, 3000);
  
// });
// Add click event listener to the button
document.querySelector('.color-transition').addEventListener('click', function() {
  // Add a class to trigger the animation on click

});



// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}