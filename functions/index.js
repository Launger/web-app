const functions = require('firebase-functions');
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onCall((data, context) => {
  return fetch("https://www.reddit.com/r/memes/top.json")
          .then(res => res.json())
          .catch(err => console.error(err));
});
