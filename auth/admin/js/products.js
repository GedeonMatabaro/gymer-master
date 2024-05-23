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
   // loadingComplete()
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

var categoryRef = firebase.database().ref('Allparts');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#items_data').innerHTML += `
        <tr>
            <th scope="row">${key}</th>
            <td>${obj[key].name}</td>
            <td>${obj[key].price}</td>
            <td><button class = "btn btn-primary btn-sm" onclick = "select_category('${key}')" >Select</button></td>
            <td><button class = "btn btn-danger btn-sm" onclick = "delete_category('${key}')" >Delete</button></td>
        </tr>
        `
    })
} )

function select_category(e){
    firebase.database().ref('Allparts/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('item_name').value = snapshot.val().name;
        document.getElementById('item_price').value = snapshot.val().price;
    })
}

var selectedId;

function update_category(){
    firebase.database().ref('Allparts/' + selectedId).update({
        name : document.getElementById('item_name').value,
        price : document.getElementById('item_price').value
    })
    location.reload();
}

function delete_category(e){
    firebase.database().ref('Allparts/' + e).remove();
    location.reload()
}