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
//   document.addEventListener('DOMContentLoaded', function() {
//     // Your function code here
//     loadingComplete()
// });
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


var categoryRef = firebase.database().ref('Users');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#user_data').innerHTML += `
        <tr>
            <td>${obj[key].userName}</td>
            <td>${obj[key].userMail}</td>
            <td><button class = "btn btn-danger btn-sm" onclick = "delete_user('${key}')" >Delete</button></td>
        </tr>
        `
    })
} )

function select_user(e){
    firebase.database().ref('Users/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('user_no').value = snapshot.val().name;
    })
}

var selectedId;

function update_user(){
    firebase.database().ref('Users/' + selectedId).update({
        name : document.getElementById('user_no').value
    })
    location.reload();
}

function delete_user(e){
    firebase.database().ref('Users/' + e).remove();
    location.reload()
}