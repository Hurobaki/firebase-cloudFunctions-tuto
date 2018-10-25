const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
    const text = req.query.text;
    const snapshot = await admin
        .database()
        .ref('/messages')
        .push({ original: text });
    return res.redirect(303, snapshot.ref.toString());
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite((change, context) => {
    const original = change.after.val();
    const upperCase = original.toUpperCase();
    return change.after.ref.parent.child('uppercase').set(upperCase);
});
