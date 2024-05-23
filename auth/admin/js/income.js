const firebaseConfig = {
    apiKey: "AIzaSyCiAwI1hnkwOitWqCxLq4xETOlnEpBAPdQ",
    authDomain: "fithub-4b209.firebaseapp.com",
    projectId: "fithub-4b209",
    storageBucket: "fithub-4b209.appspot.com",
    messagingSenderId: "70189627018",
    appId: "1:70189627018:web:c15fd06c868bd128c29f73",
    measurementId: "G-Y9KKNK3PKT"
  };
  function loadingComplete(){
    const content_data = document.getElementById("category_data");
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.display = "block";
    content_data.style.display = 'none';
    console.log("Loading");
    setTimeout(function() {
      // Hide loading overlay after a delay (simulate login process completion)
      loadingOverlay.style.display = "none";
      content_data.style.display = 'block';
      // Here you can redirect or perform other actions after logging in
    }, 3000);
  }
  document.addEventListener('DOMContentLoaded', function() {
    // Your function code here
    //loadingComplete()
});
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// function add_category(){
//     var id = document.getElementById('item_id').value;
//     var name = document.getElementById('item_name').value;
//     var price = document.getElementById('item_price').value;

//     var postListRef = firebase.database().ref('Allparts');
//     var newPostRef = postListRef.push();
//     newPostRef.set({
//         id : id,
//         name : name,
//         price : price
//     });
//     location.reload();
// }


// Reference to the 'user' object in the database
// Assume you have initialized Firebase app and have reference to the database

// Reference to the 'user' object in the database
var usersRef = database.ref('users');

// Array to store user data
var usersArray = [];
var planData ={
    "premium": 0,
    "standard": 0,
    "basic" : 0,
};

function drawChart(planData) {
    var donut = document.getElementById('donut-chart');
    var chart = bb.generate({
        data: {
            columns: [
                ["Premium", planData.premium],
                ["Standard", planData.standard],
                ["Basic", planData.basic]
            ],
            type: "donut"
        },
        donut: {
            title: "Subscription Plan"
        },
        bindto: donut
    });
}
// Retrieving data from Firebase
usersRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    // Accessing unique key
    var key = childSnapshot.key;
    
    // Accessing user data
    var userData = childSnapshot.val();
    var signUpPlan = userData.signUpPlan;
    if(signUpPlan) planData[signUpPlan] ++;

    
    // Creating an object with required user data and key
    var userObject = {
      key: key,
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      subscriptionPlan: userData.signUpPlan,
      fitnessLevel: userData.fitnessLevel,
      subscriptionFees: userData.monthlySubscription
    };
    console.log(planData);
    // Adding user object to array
    usersArray.push(userObject);
  });
  
  // Now usersArray contains an array of objects, each with the required attributes and user data

  // Get reference to tbody element
  var tbody = document.getElementById('items_data');

  // Loop through the usersArray to populate the table
  usersArray.forEach(function(user) {
    var row = document.createElement('tr');
    row.innerHTML = `
      <td></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.subscriptionPlan}</td>
      <td>${user.fitnessLevel}</td>
      <td>${user.subscriptionFees}</td>
    `;
    tbody.appendChild(row);
  });
  
var tim = 0;
  var tableDiv = document.getElementById('table-donut-chart');
            var table = document.createElement('table');
            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');
            var headerRow = document.createElement('tr');

            // Create header row
            Object.keys(planData).forEach(function(plan) {
                var th = document.createElement('th');
                th.textContent = plan;
                headerRow.appendChild(th);
                tim += 1;
                
            });
            thead.appendChild(headerRow);

            // Create data row
            var dataRow = document.createElement('tr');
            Object.keys(planData).forEach(function(plan) {
                var td = document.createElement('td');
                td.textContent = planData[plan];
                dataRow.appendChild(td);
            });
            tbody.appendChild(dataRow);

            // Append elements to table
            table.appendChild(thead);
            table.appendChild(tbody);
            
            table.classList.add('table', 'table-striped');

            // Center the table
            tableDiv.classList.add('d-flex', 'justify-content-center');
            // Append table to tableDiv
            tableDiv.appendChild(table);


});
var tableCells = document.querySelectorAll('td, th');

// Adding the align-top class to each td and th element
tableCells.forEach(function(cell) {
  cell.classList.add('align-top');
});

document.getElementById('draw-button').addEventListener('click', function() {
    drawChart(planData);
});

// Function to create and populate the table with planData


// Add event listener to the draw button


// function drawChard() {
   
//     var donut = document.getElementById('donut-chart');
//     var chart = bb.generate({
//         data: {
//             columns: [
//                 ["Primium", premiumP],
//                 ["Standard", standardP],
//                 ["Basic", basicP],
//             ],
//             type: "donut",
//             onclick: function(d, i) {
//                 console.log("onclick", d, i);
//             },
//             onover: function(d, i) {
//                 console.log("onover", d, i);
//             },
//             onout: function(d, i) {
//                 console.log("onout", d, i);
//             },
//         },
//         donut: {
//             title: "Stats",
//         },
//         bindto: donut,
//     });
// }


// function select_category(e){
//     firebase.database().ref('Cart/' + e).once("value", (snapshot) => {
//         selectedId = e;
//         document.getElementById('item_name').value = snapshot.val().name;
//         document.getElementById('item_price').value = snapshot.val().price;
//     })
// }

// var selectedId;

// function update_category(){
//     firebase.database().ref('Cart/' + selectedId).update({
//         name : document.getElementById('item_name').value,
//         price : document.getElementById('item_price').value
//     })
//     location.reload();
// }

// function delete_category(e){
//     firebase.database().ref('Cart/' + e).remove();
//     location.reload()
// }
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = "../../../index.html"; // Redirect to the login page
      }).catch(function(error) {
        // An error happened.
        console.error("Error signing out:", error);
      });
}