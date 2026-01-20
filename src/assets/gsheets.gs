function doPost(e) {
  var data;
  var gameTitle = "Unknown Game";

  try {
    // 1. Try reading from the post body (JSON)
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
      gameTitle = data.game || data.title || "Unknown";
    }
    // 2. Try reading from parameters (Form data)
    else if (e && e.parameter && e.parameter.game) {
      gameTitle = e.parameter.game;
    }
  } catch (err) {
    // 3. Last resort: just take the raw content if it's a simple string
    gameTitle = e.postData.contents || "Error Parsing";
  }

  // Final cleanup of the name
  gameTitle = String(gameTitle).trim();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Analytics') || ss.insertSheet('Analytics');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Game Title', 'Total Plays', 'Plays Today', 'Plays This Month', 'Last Updated', 'Today Date', 'Month']);
  }

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

function doGet() {
  return ContentService.createTextOutput("Analytics Script is Active. Status: Online.").setMimeType(ContentService.MimeType.TEXT);
}