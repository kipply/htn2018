const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const SpellChecker = require('spellchecker');
const request = require('request');

const twilioClient = require('twilio')('AC3324bca0089ba9842b477895d375d247', '2526e73dd9b5ad7bfdb4a9984ecadf3e');

exports.main = functions.https.onRequest((req, res) => {
  var text = req.query.sentence;

  // spell check
  text.split(" ").forEach(word => {
    if (SpellChecker.isMisspelled(word)) {
      const corrected = SpellChecker.getCorrectionsForMisspelling(word);
      if (corrected !== []) {
        text = text.replace(word, corrected[0]);
      }
    }
  });

  // Twilio
  // twilio = twilioClient.messages.create({
  //    body: text,
  //    from: '+16479579528',
  //    to: '+14168756163'
  //  }).catch(err => { return err })
  const twilio = Promise.resolve()

  // Slack
  const slack = request.post(
    "https://hooks.slack.com/services/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",
    { "json": { "text": text } }
  )

  // Store on firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://banana-a5779.firebaseio.com/"
  });
  var db = admin.database();
  var ref = db.ref("hackthenorth");
  const fb = ref.push().set({
    sentence: text
  });

  return res.status(418).send("Hi Thomas. I'm not a coffee pot. I'm a teapot")
});
