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
    loadingComplete()
});
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function add_category() {
    loadingComplete();
    var id = document.getElementById('category_id').value;
    var name = document.getElementById('category_name').value;

    var postListRef = firebase.database().ref('categories');
    var newPostRef = postListRef.push();
    newPostRef.set({
        id : id,
        name : name
    });
    location.reload();
    
    
}
var tbody = document.getElementById('category_data');

var categoryRef = firebase.database().ref('categories');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{

        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${obj[key].id}</td>

        <td>${obj[key].name}</td>

        <td>
            <button class = "btn btn-primary btn-sm mr-2" onclick = "select_category('${key}')" >Select</button>
            <button class = "btn btn-danger btn-sm" onclick = "delete_category('${key}')" >Delete</button>
        </td>
        `
    tbody.appendChild(row);     
        
    })
} )

function select_category(e){
    firebase.database().ref('categories/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('category_id').value = snapshot.val().id;
        document.getElementById('category_name').value = snapshot.val().name;
    })
}

var selectedId;

function update_category(){
    firebase.database().ref('categories/' + selectedId).update({
        id : document.getElementById('category_id').value,
        name : document.getElementById('category_name').value
    })
    location.reload();
    loadingComplete();
}

function delete_category(e){
    firebase.database().ref('categories/' + e).remove();
    location.reload()
    loadingComplete();
}
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = "../../../index.html"; // Redirect to the login page
      }).catch(function(error) {
        // An error happened.
        console.error("Error signing out:", error);
      });
}