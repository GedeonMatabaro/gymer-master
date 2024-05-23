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
const auth = firebase.auth();
const database = firebase.database();

function storeUserData(user) {
  if (localStorage.getItem('userCredentials') !== null) {
    // If 'userCredentials' exists, remove it
    localStorage.removeItem('userCredentials');
  }
  localStorage.setItem('userCredentials', JSON.stringify(user));
}
//Function loading
function loadingOverlay(show) {
  var loadingSpinner = document.getElementById('loadingOverlay');
  if (show) {
    loadingSpinner.style.display = 'block';
    // Simulate data retrieval or storage
    setTimeout(function() {
      // Hide loading spinner after 3 seconds (simulating data retrieval/storing completion)
      loadingOverlay(false)
      // Proceed with form submission or any other action
      // For demonstration, let's log a message here
      console.log('Data retrieved or stored successfully!');
    }, 3000); // 3000 milliseconds = 3 seconds (adjust as needed)
  } else {
    loadingSpinner.style.display = 'none';
  }
}
//check if the user exist or not
function checkEmailExists(UserEmail) {
  return database.ref().child('userList').orderByChild('email').equalTo(UserEmail).once('value')
      .then(snapshot => {
          return snapshot.exists(); // Return true if email exists, false otherwise
      })
      .catch(error => {
          console.error('Error checking email:', error);
          return false; // Return false in case of an error
      });
}
function getEmail(){
 return document.getElementById('signUpEmail').value;
}
 
// Set up our register function
function register () {
  loadingOverlay(true);
  // Get all our input fields
  email = document.getElementById('signUpEmail').value;
  password = document.getElementById('signUpPassword').value;
  names = document.getElementById('signUpName').value;
  loginType = "user";
  age = document.getElementById('signUpAge').value;
  gender = document.getElementById('signUpGenre').value;
  address = document.getElementById('signUpAddress').value;
  fitnessLevel = document.getElementById('signUpFitnessLevel').value;
  signUpPlan = document.getElementById('signUpPlan').value;

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
    if (auth.currentUser) {
      storeUserData(auth.currentUser);
    }

    // Add this user to Firebase Database
    var database_ref = database.ref()
    switch(signUpPlan) {
      case "basic":
        monthlySubscription = 500;
        break;
      case "standard":
        monthlySubscription = 800;
        break;
      case "premium":
        monthlySubscription = 1000;
        break;
      default:
        monthlySubscription = 0;
        // Code to be executed if expression doesn't match any case
    }
    // Create User data
    var user_data = {
      name: names,
      email : email,
      loginType : loginType,
      age : age,
      gender : gender,
      address : address,
      fitnessLevel : fitnessLevel,
      signUpPlan : signUpPlan,
      monthlySubscription: monthlySubscription,
      last_login : Date.now()
    }
    var user_ids={
      uid: auth.currentUser.uid,
      email: email,
    }
    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);
    database_ref.child('userList/').set(user_ids);

    //TODO: Lead to the User Page where they can see the info, modifie them and see the subscription plan
    setTimeout(function() {
      // Hide loading overlay after a delay (simulate login process completion)
      window.location.href = "users/index.html"; 
      // Here you can redirect or perform other actions after logging in
    }, 2000);
    // DOne

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function validateAndRegister() {
  var password = document.getElementById('signUpPassword').value;
  var confirmPassword = document.getElementById('signUpConfirmPassword').value;

  if (password !== confirmPassword) {
    document.getElementById('passwordMismatch').classList.remove('d-none');
  } else {


    checkEmailExists(getEmail()).then(emailExists => {
      if (emailExists) {
          alert('User with this email already exists. Use another email.');
          // Handle user already exists scenario
      } else {
        register();
          // Proceed with sign up
      }
  });
  }
}



   

// Set up our login function
function login () {

  loadingOverlay(true);
  // Get all our input fields
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  var loginType = document.getElementById('loginType').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(()=> {
    if (auth.currentUser) {
      storeUserData(auth.currentUser);
    }
    // Declare user variable
    var user = auth.currentUser
    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      userType : loginType,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    //alert('User Logged In!!')
    setTimeout(function() {
      // Hide loading overlay after a delay (simulate login process completion)
     if( loginType === "admin" ){
        if(email !== "admin@gmail.com"){
          alert("You are not a valid admin");
          document.getElementById('notAdmin').classList.remove('d-none');
        } else{
          window.location.href = "admin/index.html"
        }
     } else{
      window.location.href ="users/index.html"; 
     }
      // Here you can redirect or perform other actions after logging in
    }, 2000);
     
  }) .catch((error) => {
    // Error handling
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorMessage);

    // Display error message to the user
    document.getElementById('incorrectCredentials').classList.remove('hidden');

    // Smooth fade out effect
    setTimeout(function() {
      document.getElementById('incorrectCredentials').classList.add('hidden');
    }, 3000); // Show the alert for 3 seconds
  });

// Reset input values
document.getElementById('email').value = '';
document.getElementById('password').value = '';
}

// Add click event listener to the butto



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
  if (password.length <= 5) {

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
