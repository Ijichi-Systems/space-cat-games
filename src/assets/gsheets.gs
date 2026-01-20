// This function handles the actual analytics data sent from the website
function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput("Error: No data received.").setMimeType(ContentService.MimeType.TEXT);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Analytics') || ss.insertSheet('Analytics');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Game Title', 'Total Plays', 'Plays Today', 'Plays This Month', 'Last Updated', 'Today Date', 'Month']);
  }

  var data = JSON.parse(e.postData.contents);
  var gameTitle = String(data.game).trim();
  var now = new Date();
  var todayStr = Utilities.formatDate(now, "GMT", "yyyy-MM-dd");
  var monthStr = Utilities.formatDate(now, "GMT", "yyyy-MM");

  var rows = sheet.getDataRange().getValues();
  var found = false;

  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === gameTitle.toLowerCase()) {
      var total = Number(rows[i][1]) + 1;
      var lastTodayStr = rows[i][5];
      var lastMonthStr = rows[i][6];
      var todayCount = (lastTodayStr === todayStr) ? Number(rows[i][2]) + 1 : 1;
      var monthCount = (lastMonthStr === monthStr) ? Number(rows[i][3]) + 1 : 1;
      sheet.getRange(i + 1, 2, 1, 6).setValues([[total, todayCount, monthCount, now, todayStr, monthStr]]);
      found = true;
      break;
    }
  }

  if (!found) {
    sheet.appendRow([gameTitle, 1, 1, 1, now, todayStr, monthStr]);
  }

  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

// NEW: This allows you to test the URL in your browser!
function doGet() {
  return ContentService.createTextOutput("Analytics Script is Active. Status: Online.").setMimeType(ContentService.MimeType.TEXT);
}