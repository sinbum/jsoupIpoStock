
//변수,모듈선언부 ------------------------------------------------------------------------------------------


var CLIENT_ID = '774051343533-o785lh5kimdbmecde7b1ktqdfqtd0mtc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD2ZABO2fldEAf40_DPyNduUnG-Zm9Szwc';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// let colorIdA = 5;
// let startTimeA = new Date().toISOString;
// let endTimeA = "2021-11-28T10:00:00+09:00";
// let descriptionA = "설명";
// let summaryA = "제목쓰기";

// 함수 선언부 ------------------------------------------------------------------------------------------
/**
 * 캘린더 이벤트객체 생성
 * 빨강 11,노랑 5, 초록 10
 */
function createJsonEvent(colorId, startTime, endTime, summary, description) {
  var ceo = new Object();
  var endO = new Object();
  var startO = new Object;
  //"dateTime": "2021-11-29T10:00:00+09:00",
  //"timeZone": "Asia/Seoul"
  startO.dateTime = startTime;
  startO.timeZone = "Asia/Seoul";
  endO.dateTime = endTime;
  endO.timeZone = "Asia/Seoul";

  ceo.summary = summary;
  ceo.description = description;
  ceo.end = endO;
  ceo.start = startO;

  //색상 테스트
  ceo.colorId = colorId;

  var eventJson = JSON.stringify(ceo);

  return eventJson;
}

/**
 * 데이터 삽입에 대한 요청 객체
 */

function insertRequestObjectCreate(colorId, startTime, endTime, summary, description) {
  var insertRequestObject =
  {
    "calendarId": "primary",
    //"resource": calendarEvent  //eventJson
    "resource": createJsonEvent(colorId, startTime, endTime, summary, description)
  }
  return insertRequestObject;
}

/*
 * 
 * @returns 일정 등록을 하고 성공시 성공알림을 반환
 * 
 */
function EventInsertexecute(colorId, startTime, endTime, summary, description) {
  return gapi.client.calendar.events.insert(insertRequestObjectCreate(colorId, startTime, endTime, summary, description))
    .then(function (response) {
      appendPre(colorId + startTime + endTime + summary + description + "등록 성공")
    },
      function (err) { console.error("Execute error", err); appendPre(colorId + "등록 실패 : 이벤트 등록중 문제가 발생하였습니다. 관리자에게 문의하세요."); });
}

/**
 * 공모일 이벤트 등록 함수
 */
function redEventInsert(ipoData) {
  ipoData.colorId = 11;
 
  EventInsertexecute(colorId, startTime, endTime, description, summary);
}

/**
 * 환불일 이벤트 등록 함수
 */
function yellowEventInser(ipoData) {
  ipoData.colorId = 5;
 
  EventInsertexecute(colorId, startTime, endTime, description, summary);
}


/**
 * 상장일 이벤트 등록 함수
 */
function greenEventInser(ipoData) {
  ipoData.colorId = 10;

  EventInsertexecute(colorId, startTime, endTime, description, summary);
}

/**  
 * 공모데이터를 한번에 등록함. parameter값 수정 필요.
 */
function ipoEventInsertExe(event) {
  
  redEventInsert();
  yellowEventInser();
  greenEventInser();
}


/**
 * ipo 데이터를 제이슨 형태의 구글 이벤트 양시긍로 변환.
 * 
 * 
 * 
        <td th:text="${ipo.date}"></td>
        <td th:text="${ipo.wantedPrice}"></td>
        <td th:text="${ipo.price}"></td>
        <td th:text="${ipo.wantedTotal}"></td>
        <td th:text="${ipo.OpenDate}"></td>
        <td th:text="${ipo.refundedDate}"></td>
        <td th:text="${ipo.competitionRate}"></td>
        <td th:text="${ipo.StockCoName}"></td>

 */
function ipoDataTransfer(ipoDocData) {

  // ipoDocDatas.company         =td[0].firstChild.data;
  // ipoDocDatas.date            =td[1].firstChild.data;
  // ipoDocDatas.wantedPrice     =td[2].firstChild.data;
  // ipoDocDatas.price           =td[3].firstChild.data;
  // ipoDocDatas.wantedTotal     =td[4].firstChild.data;
  // ipoDocDatas.openDate        =td[5].firstChild.data;
  // ipoDocDatas.refundedDate    =td[6].firstChild.data;
  // ipoDocDatas.competitionRate =td[7].firstChild.data;
  // ipoDocDatas.stockCoName     =td[8].firstChild.data;


  //회사명,공모일,상장일,환불일,경쟁률,주간사,상세보기
  var googleipoEvent = new Object;

  googleipoEvent.colorId = 5;

  //예) 제목 : '신범주식회사 공모일'
  googleipoEvent.getSummary = ipoDocData.company + " 공모일";

  //공모 시작날짜
  googleipoEvent.getStartTime = getStartIpoDate(ipoDate);
  //공모 마감날짜
  googleipoEvent.getEndTime = getEndIpoDate(ipoDate);
  //환불일
  googleipoEvent.getRefundedDate = getRefundedDate(refundedDate);
  //상장일
  googleipoEvent.getOpenDate = getOpenDate(openDate);

  //상세설명
  googleipoEvent.getDescription =
    "희망공모 : " + wantedPrice + "\n" +
    "공모가   : " + price + "\n" +
    "공모규모 : " + wantedTotal + "\n" +
    "경쟁률   : " + competitionRate + "\n" +
    "주간사   : " + stockCoName + "\n"
  "상세링크 : " + "https://www.naver.com";

  //환불일,상장일은 하루종일
  return googleipoEvent;
}

function getDocumentIpoDatas(){
  //var str = document.getElementById("ipoData").childNodes[3].childNodes[1].childNodes[0].nodeValue;
  var rows = document.getElementById("ipoData").getElementsByTagName("tr");
  // tr 만큼 루프돌면서 컬람값 접근
  var i;
  // 배열 객체생성
  var ipoDocDatas = new Array();
  
  for(i=0; i < rows.length; i++){
    var td = rows[i].getElementsByTagName("td");
    
    // 회사명	공모일	희망공모가	공모가	공모금액	상장일	환불일	경쟁률	주간사
    var ipoData = new Object;
    if (!(td[1].firstChild.data === "공모철회")){ 
      
      ipoDocDatas.company         =td[0].firstChild.data;
      ipoDocDatas.date            =td[1].firstChild.data;
      ipoDocDatas.wantedPrice     =td[2].firstChild.data;
      ipoDocDatas.price           =td[3].firstChild.data;
      ipoDocDatas.wantedTotal     =td[4].firstChild.data;
      ipoDocDatas.openDate        =td[5].firstChild.data;
      ipoDocDatas.refundedDate    =td[6].firstChild.data;
      ipoDocDatas.competitionRate =td[7].firstChild.data;
      ipoDocDatas.stockCoName     =td[8].firstChild.data;
    
    ipoDatas.push(ipoData);
    }
  }
  return ipoDocDatas;
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
  var dateValue = new Date(startDate.year, startDate.month, startDate.day, 9, 00);
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
  var dateValue = new Date(endDate.year, endDate.month, endDate.day, 9, 00);
  return dateValue.toISOString();
}

/**
* 환불일을 iso date 형식으로 반환합니다
*/
function getRefundedDate(refundedDate) { 
  var date = parseDate(refundedDate);
  var dateValue = new Date(date.year, date.month, date.day, 9, 00);
  return dateValue.toISOString();
}

/**
* 상장일을 iso date 형식으로 반환합니다.
*/     
function getOpenDate(openDate) { 
  var date = parseDate(openDate);
  var dateValue = new Date(date.year, date.month, date.day, 9, 00);
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


function btnInsertAllClick() { 
  var docIpoDatas = getDocumentIpoDatas();
  var i;
  for(i=0;i<docIpoDatas.length;i++){
    var googleIpoEvent = ipoDataTransfer(docIpoDatas[i])



  }
}
