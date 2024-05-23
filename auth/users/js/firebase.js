const firebaseConfig = {
    apiKey: "AIzaSyCiAwI1hnkwOitWqCxLq4xETOlnEpBAPdQ",
    authDomain: "fithub-4b209.firebaseapp.com",
    projectId: "fithub-4b209",
    storageBucket: "fithub-4b209.appspot.com",
    messagingSenderId: "70189627018",
    appId: "1:70189627018:web:c15fd06c868bd128c29f73",
    measurementId: "G-Y9KKNK3PKT"
  };
//   document.addEventListener('DOMContentLoaded', function() {
//     // Your function code here
//     loadingComplete()
// });
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
var categoryRef = firebase.database().ref('users');
categoryRef.once("value", (snapshot) => {
    var userData = snapshot.val();
    if (userData) {
        document.getElementById('nameInput').textContent = userData.name;
        document.getElementById('emailInput').textContent = userData.email;
        document.getElementById('loginTypeInput').textContent = userData.loginType;
        document.getElementById('ageInput').textContent = userData.age;
        document.getElementById('genderInput').textContent = userData.gender;
        document.getElementById('addressInput').textContent = userData.address;
        document.getElementById('fitnessLevelInput').textContent = userData.fitnessLevel;
        document.getElementById('signUpPlanInput').textContent = userData.signUpPlan;
        document.getElementById('monthlySubscriptionInput').textContent = userData.monthlySubscription;
        document.getElementById('lastLoginInput').textContent = new Date(userData.last_login).toLocaleString();
      }
} )
function updateUserData(userId, fieldName, newValue, callback){
    
}
// function updateUserData(userId, fieldName, newValue, callback) {
//     var updates = {};
//     updates['/users/' + userId + '/' + fieldName] = newValue;
//     database.ref().update(updates)
//       .then(() => {
//         console.log('Field updated successfully.');
//         callback(null);
//       })
//       .catch((error) => {
//         console.error('Error updating field:', error);
//         callback(error);
//       });
//   }

// Function to display user data

  
  // Function to handle editing of fields
//   function editField(fieldName) {
//     var fieldElement = document.getElementById(fieldName + 'Input');
//     var fieldValue = fieldElement.textContent.trim();
    
//     var inputField = document.createElement('input');
//     inputField.setAttribute('type', 'text');
//     inputField.setAttribute('class', 'form-control');
//     inputField.setAttribute('value', fieldValue);
    
//     fieldElement.textContent = '';
//     fieldElement.appendChild(inputField);
    
//     var editButton = fieldElement.nextElementSibling;
//     editButton.textContent = 'Save';
//     editButton.setAttribute('onclick', 'saveField(\'' + fieldName + '\')');
//   }
function editField(fieldName){

}
  // Function to save the edited field
//   function saveField(fieldName) {
//     var fieldElement = document.getElementById(fieldName + 'Input');
//     var newValue = fieldElement.querySelector('input').value;
    
//     // Update the field in Firebase
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         var userId = user.uid;
//         updateUserData(userId, fieldName, newValue, function(error) {
//           if (!error) {
//             fieldElement.textContent = newValue;
//             var editButton = fieldElement.nextElementSibling;
//             editButton.textContent = 'Edit';
//             editButton.setAttribute('onclick', 'editField(\'' + fieldName + '\')');
//           }
//         });
//       }
//     });
//   }
function saveField(fieldName){}
  // Function to handle changing the password
 // Function to handle changing the password
function changePassword() {
    var currentPassword = document.getElementById('currentPasswordInput').value;
    var newPassword = document.getElementById('newPasswordInput').value;
    var confirmPassword = document.getElementById('confirmPasswordInput').value;
  
    var user = auth.currentUser;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
  
    // Re-authenticate the user before changing the password
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    user.reauthenticateWithCredential(credential).then(function() {
      // Password re-authentication successful, proceed with password update
      user.updatePassword(newPassword).then(function() {
        // Password update successful
        alert("Password updated successfully.");
        $('#changePasswordModal').modal('hide');
      }).catch(function(error) {
        // Handle error during password update
        console.error("Error updating password:", error);
        alert("Error updating password. Please try again later.");
      });
    }).catch(function(error) {
      // Handle error during re-authentication
      console.error("Error re-authenticating user:", error);
      alert("Error re-authenticating user. Please check your current password.");
    });
  }