const functions = require('firebase-functions');
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onCall((data, context) => {

  const fakedata = {
    title: "test",
    imageURL: "https://i.redd.it/xaj97fukmxw41.jpg"
  }
  
  const fakefetchfromReddit = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakedata);
    }, 1000);
  })

  return fetch("https://www.reddit.com/r/memes/top.json")
    .then(res => res.json())
    .then(json => json)
    .catch(err => console.err(err));
});
