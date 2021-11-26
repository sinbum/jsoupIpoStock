
//변수,모듈선언부 ------------------------------------------------------------------------------------------


var CLIENT_ID = '774051343533-o785lh5kimdbmecde7b1ktqdfqtd0mtc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD2ZABO2fldEAf40_DPyNduUnG-Zm9Szwc';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');



/**
 * 데이터 삽입에 대한 요청 객체
 */

function insertRequestObjectCreate(colorId) {
  var insertRequestObject =
  {
    "calendarId": "primary",
    //"resource": calendarEvent  //eventJson
    "resource": createJsonEvent(colorId)
  }
  return insertRequestObject;
}


// 함수 선언부 ------------------------------------------------------------------------------------------

//슬립.
function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

/*
 * 
 * @returns 일정 등록을 하고 성공시 성공알림을 반환
 * 
 */
function EventInsertexecute(colorId) {
  return gapi.client.calendar.events.insert(insertRequestObjectCreate(colorId))
    .then(function (response) {
      appendPre(colorId+"등록 성공")
    },
      function (err) { console.error("Execute error", err);appendPre(colorId+"등록 실패 : 이벤트 등록중 문제가 발생하였습니다. 관리자에게 문의하세요.");});
}



/**
 * 캘린더 이벤트객체 생성
 */
function createJsonEvent(colorId) {
  var ceo = new Object();
  var endO = new Object();
  var startO = new Object;
  //"dateTime": "2021-11-29T10:00:00+09:00",
  //"timeZone": "Asia/Seoul"
  startO.dateTime = "2021-11-29T18:00:00+09:00";
  startO.timeZone = "Asia/Seoul";
  endO.dateTime = "2021-11-29T20:00:00+09:00";
  endO.timeZone = "Asia/Seoul";

  ceo.summary = colorId;
  ceo.description = "이제 핸드폰에 모든 ipo 정보가 다담긴다!!!";
  ceo.end = endO;
  ceo.start = startO;

  //색상 테스트
  ceo.colorId = colorId;

  var eventJson = JSON.stringify(ceo);

  return eventJson;
}

function testColorCheck() {
  alert("ee");
  var i;
  var colorId = i;
  for (i = 0; i < 13; i++) {
    console.log(i);
    EventInsertexecute(i).then(function (){
      sleep(300);
    });
    
  }
}

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
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
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
    'timeMax': (getNextMonth()),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 20,
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

function getNextMonth() {
  var endOfMonth = new Date();
  endOfMonth.setMonth((new Date().getMonth()) + 1);
  return endOfMonth.toISOString();
}




//이벤트 처리영역 ------------------------------------------------------------------------------------------


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






