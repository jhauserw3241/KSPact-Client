import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS0ozdv3p3cGgwbfqcGL3z227PqtOi4IY",
    authDomain: "ks-pact-website.firebaseapp.com",
    databaseURL: "https://ks-pact-website.firebaseio.com",
    projectId: "ks-pact-website",
    storageBucket: "ks-pact-website.appspot.com",
    messagingSenderId: "751950777978"
};
var fire = firebase.initializeApp(config);

export default fire;