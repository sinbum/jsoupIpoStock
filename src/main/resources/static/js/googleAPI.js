// Client ID and API key from the Developer Console
var CLIENT_ID = '774051343533-o785lh5kimdbmecde7b1ktqdfqtd0mtc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD2ZABO2fldEAf40_DPyNduUnG-Zm9Szwc';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function (error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function (response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}

var calendarEvent =
{
  'summary': '공모주 등록테스트',  
  'description': '이것이 된다 면 진짜 대박입니다. http://naver.com',
  "end": {
    "date": "2021-11-27",
    "timeZone": "Asia/Seoul"
  },
  "start": {
    "date": "2021-11-25",
    "timeZone": "Asia/Seoul"
  }
}

var insertRequestObject = {
  "calendarId": "primary",
  "resource": calendarEvent
}



// Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return gapi.client.calendar.events.insert({
//     "calendarId": "primary",
//     "resource": {
//       "end": {
//         "date": "2021-11-26",
//         "timeZone": "Asia/Seoul"
//       },
//       "start": {
//         "date": "2021-11-25",
//         "timeZone": "Asia/Seoul"
//       }
//     }
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);

//               gapi.load("client:auth2", function() {
//                 gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//               });

//             },
//             function(err) { console.error("Execute error", err); });
// }

var description = "이것이 한글로 된다면 변수 description이 가능한것입니다.";

//제이슨데이터를 담은 이벤트 객체를 넣은 버전
function execute() {
  return gapi.client.calendar.events.insert(insertRequestObject)
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);

      gapi.load("client:auth2", function () {
        gapi.auth2.init({ client_id: CLIENT_ID });
      });

    },
      function (err) { console.error("Execute error", err); });
}



