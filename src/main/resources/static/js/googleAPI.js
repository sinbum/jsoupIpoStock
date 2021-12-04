
//변수,모듈선언부 ------------------------------------------------------------------------------------------


var CLIENT_ID = '774051343533-o785lh5kimdbmecde7b1ktqdfqtd0mtc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD2ZABO2fldEAf40_DPyNduUnG-Zm9Szwc';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');


// 함수 선언부 ------------------------------------------------------------------------------------------
/**
 * 캘린더 이벤트객체 생성
 * 빨강 11,노랑 5, 초록 10
 */
function createJsonEvent(ipoData) {
  var ceo = new Object();
  var endO = new Object();
  var startO = new Object();
  var originalStartTime = new Object();

  ceo.summary = ipoData.summary;
  ceo.description = ipoData.description;



  ceo.colorId = ipoData.colorId;

  //색상 공모일 : 11,환불일 : 5, 상장일 : 10
  if (ipoData.colorId == 11) {

    ceo.summary = ceo.summary + "공모일"

    startO.dateTime = ipoData.startTime;
    startO.timeZone = "Asia/Seoul";
    endO.dateTime = ipoData.endTime;
    endO.timeZone = "Asia/Seoul";

    ceo.end = endO;
    ceo.start = startO;

  } else if (ipoData.colorId == 5) {

    ceo.summary = ceo.summary + "환불일"

    startO.dateTime = ipoData.refundedDate;
    startO.timeZone = "Asia/Seoul";
    endO.dateTime = ipoData.refundedDate;
    endO.timeZone = "Asia/Seoul";

    ceo.end = endO;
    ceo.start = startO;

  } else if (ipoData.colorId == 10) {

    ceo.summary = ceo.summary + "상장일"

    startO.dateTime = ipoData.openDate;
    startO.timeZone = "Asia/Seoul";
    endO.dateTime = ipoData.openDate;
    endO.timeZone = "Asia/Seoul";

    ceo.end = endO;
    ceo.start = startO;





    //originalStartTime.date = ipoData.openDate;

    if (originalStartTime.date == "") {
      return null;
    }

    //originalStartTime.timeZone = "Asia/Seoul";

    //ceo.originalStartTime = originalStartTime;
  }



  var eventJson = JSON.stringify(ceo);

  return eventJson;
}





/**
 * 공모일 이벤트 등록 함수
 */
function eventInsert(eventType, ipoData) {
  //공모일 등록 이벤트
  if (eventType == 1) {
    ipoData.colorId = 11;
    //return(insertRequestObjectCreate(ipoData));
    EventInsertexecute(ipoData);
  }
  //환불일 등록 이벤트
  else if (eventType == 2) {
    ipoData.colorId = 5;
    //return(insertRequestObjectCreate(ipoData));

    EventInsertexecute(ipoData);
  }
  //상장일 등록 이벤트
  else if (eventType == 3) {
    ipoData.colorId = 10;
    // return(insertRequestObjectCreate(ipoData));
    EventInsertexecute(ipoData);
  }
}



/*
 * 
 * @returns 일정 등록을 하고 성공시 성공알림을 반환
 * 
 */
function EventInsertexecute(ipoData) {
  return gapi.client.calendar.events.insert(insertRequestObjectCreate(ipoData))
    .then(function (response) {
      appendPre(ipoData + "등록 성공")
    },
      function (err) { console.error("Execute error", err); appendPre(ipoData + "등록 실패 : 이벤트 등록중 문제가 발생하였습니다. 관리자에게 문의하세요." +"(상장일 미등록 확인)"); });
}

/**
 * 데이터 삽입에 대한 요청 객체
 */

function insertRequestObjectCreate(ipoData) {
  var insertRequestObject =
  {
    "calendarId": "c4b9v3dm6vvu1ge909oiuv7hs0@group.calendar.google.com",
    //"resource": calendarEvent  //eventJson
    "resource": createJsonEvent(ipoData)
  }
  return insertRequestObject;
}


/**  
 * 공모데이터를 한번에 등록함. parameter값 수정 필요.
 */
function ipoEventInsertExe(event) {

  redEventInsert();
  yellowEventInser();
  greenEventInser();
}

function getDocumentIpoDatas() {
  //var str = document.getElementById("ipoData").childNodes[3].childNodes[1].childNodes[0].nodeValue;
  var rows = document.getElementById("ipoData").getElementsByTagName("tr");
  // tr 만큼 루프돌면서 컬람값 접근
  var i;
  // 배열 객체생성
  var ipoDocDatas = new Array();

  for (i = 0; i < rows.length; i++) {
    var td = rows[i].getElementsByTagName("td");

    // 회사명	공모일	희망공모가	공모가	공모금액	상장일	환불일	경쟁률	주간사
    var ipoData = new Object;
    for (var f = 0; f < 9; f++) {
      if (td[f].firstChild == null) {
        //null값인 경우 빈값을 추가
        td[f].append("");
      }
      //console.log("td[f].firstChild : "+f+"번 : "+td[f].firstChild.data);

    }

    if (!(td[1].firstChild.data === "공모철회")) {

      ipoData.company = td[0].firstChild.data;
      ipoData.date = td[1].firstChild.data;
      ipoData.wantedPrice = td[2].firstChild.data;
      ipoData.price = td[3].firstChild.data;
      ipoData.wantedTotal = td[4].firstChild.data;
      ipoData.openDate = td[5].firstChild.data;
      //console.log("getDocumentIpoDatas() 에서의 : " + ipoData.openDate);
      ipoData.refundedDate = td[6].firstChild.data;
      ipoData.competitionRate = td[7].firstChild.data;
      ipoData.stockCoName = td[8].firstChild.data;

      ipoDocDatas.push(ipoData);
    }
  }
  return ipoDocDatas;
}

/**
 * ipo 데이터를 제이슨 형태의 구글 이벤트 양식으로 변환.
 */
function ipoDataTransfer(ipoDocData) {

  //회사명,공모일,상장일,환불일,경쟁률,주간사,상세보기
  var ipoData = new Object;

  ipoData.colorId = 5;

  //예) 제목 : '신범주식회사 공모일'
  ipoData.summary = ipoDocData.company;

  //공모 시작날짜
  ipoData.startTime = getStartIpoDate(ipoDocData.date);
  //공모 마감날짜
  ipoData.endTime = getEndIpoDate(ipoDocData.date);
  //환불일
  ipoData.refundedDate = getRefundedDate(ipoDocData.refundedDate);
  //상장일

  ipoData.openDate = getOpenDate(ipoDocData.openDate);

  if (ipoDocData.openDate === "") {
    ipoData.openDate = "";
  }

  //상세설명
  ipoData.description =
    "희망공모 : " + ipoDocData.wantedPrice + "\n" +
    "공모가   : " + ipoDocData.price + "\n" +
    "공모규모 : " + ipoDocData.wantedTotal + "\n" +
    "경쟁률   : " + ipoDocData.competitionRate + "\n" +
    "주간사   : " + ipoDocData.stockCoName + "\n"
  "상세링크 : " + "https://www.naver.com";

  //환불일,상장일은 하루종일
  return ipoData;
}


/**
 * '.' 으로 날짜를 파싱하여 월과 일로 구분합니다.
 * 예를 들어 '11.01' 인경우에 객체의 month는 11을 담고 day는 1을 담습니다.
 * 이 객체를 반환합니다.
*/
function parseDate(date) {
  var dateObject = new Object;
  var year = new Date().getFullYear();
  dateObject.year = year;
  //월단위 파싱        
  dateObject.monthIndex = date.indexOf(".", 0);
  dateObject.month = (date.substring(0, dateObject.monthIndex)) - 1;
  //일단위 파싱
  dateObject.dayIndex = dateObject.monthIndex + 1;
  dateObject.day = (date.substring(dateObject.dayIndex, date.length) * 1);
  return dateObject;
}

/**
* 기간을 파싱하여 시작일을 나누는 함수입니다.
* 예를들어 기간이 '11.01 ~ 11.02' 인경우 앞의 시작일을 구분하여 parseDate함수를 이용해 구분한뒤
* iso date 형식으로 반환합니다.* 
*/
function getStartIpoDate(ipoDate) {
  //var period = periodParam;
  // 들어오는 데이터 : 11.01 ~ 11.02
  // var ipoDate = period;
  //~까지의 길이
  var headDateIndex = ipoDate.indexOf("~", 0);
  //~전까지 11.01를 출력함
  var headDate = ipoDate.substring(0, headDateIndex);

  // //월단위 파싱        
  // var monthIndex = headDate.indexOf(".",0);
  // var month = (headDate.substring(0,monthIndex)) - 1;      

  // //일단위 파싱
  // var dayIndex = monthIndex + 1;
  // var day = headDate.substring(dayIndex,headDate.length);

  var startDate = parseDate(headDate);
  var dateValue = new Date(startDate.year, startDate.month, startDate.day);
  dateValue.setHours(18, 0, 0);
  return dateValue.toISOString();
}

/**
* 공모 마감날짜 생성.
* 
* 기간을 파싱하여 시작일을 나누는 함수입니다.
* 예를들어 기간이 '11.01 ~ 11.02' 인경우 뒤의 시작일을 구분하여 parseDate함수를 이용해 구분한뒤
* iso date 형식으로 반환합니다.
*/
function getEndIpoDate(ipoDate) {
  //var period = periodParam;

  //var ipoDate = period;
  // '~' 뒤에까지의 인덱스번호
  var tailDateStartIndex = (ipoDate.indexOf("~", 0)) + 1;
  //11.02
  var tailDate = ipoDate.substring(tailDateStartIndex, ipoDate.length);
  var endDate = parseDate(tailDate);
  var dateValue = new Date(endDate.year, endDate.month, endDate.day);
  dateValue.setHours(1, 0, 0);
  return dateValue.toISOString();
}

/**
* 환불일을 iso date 형식으로 반환합니다
*/
function getRefundedDate(refundedDate) {
  var date = parseDate(refundedDate);
  var dateValue = new Date(date.year, date.month, date.day);
  dateValue.setHours(18, 0, 0);
  return dateValue.toISOString();
}

/**
* 상장일을 iso date 형식으로 반환합니다.
*/
function getOpenDate(openDate) {
  var date = parseDate(openDate);
  var dateValue = new Date(date.year, date.month, date.day);
  dateValue.setHours(18, 0, 0);
  return dateValue.toISOString();
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
    'calendarId': 'c4b9v3dm6vvu1ge909oiuv7hs0@group.calendar.google.com',
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


function btnInsertAllClick() {
  var docIpoDatas = getDocumentIpoDatas();
  var i;
  for (i = 0; i < docIpoDatas.length; i++) {
    var docIpoData = ipoDataTransfer(docIpoDatas[i]);
    // console.log(eventInsert(1,docIpoData));
    // console.log(eventInsert(2,docIpoData));
    //console.log(eventInsert(3,docIpoData));



    eventInsert(1, docIpoData);
    eventInsert(2, docIpoData);
    eventInsert(3, docIpoData);

  }
}
