# Game Analytics Setup Guide

This document explains how to set up the backend for the privacy-friendly game analytics using Google Sheets.

## 1. Google Sheets Setup

1. Create a new Google Sheet.
2. Give it a name (e.g., "Space Cat Games Analytics").
3. (Optional) Rename the first sheet to `Analytics`, or the script will create it for you.

## 2. Google Apps Script Setup

1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code in the editor (`Code.gs`) and paste the following:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Analytics') || ss.insertSheet('Analytics');
  
  // Set up headers if new sheet
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Game Title', 'Total Plays', 'Plays Today', 'Plays This Month', 'Last Updated', 'Today Date', 'Month']);
  }
  
  var data = JSON.parse(e.postData.contents);
  var gameTitle = data.game;
  var now = new Date();
  var todayStr = Utilities.formatDate(now, "GMT", "yyyy-MM-dd");
  var monthStr = Utilities.formatDate(now, "GMT", "yyyy-MM");
  
  var rows = sheet.getDataRange().getValues();
  var found = false;
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === gameTitle) {
      var total = rows[i][1] + 1;
      var lastTodayStr = rows[i][5];
      var lastMonthStr = rows[i][6];
      
      var todayCount = (lastTodayStr === todayStr) ? rows[i][2] + 1 : 1;
      var monthCount = (lastMonthStr === monthStr) ? rows[i][3] + 1 : 1;
      
      sheet.getRange(i + 1, 2, 1, 6).setValues([[
        total, 
        todayCount, 
        monthCount, 
        now, 
        todayStr, 
        monthStr
      ]]);
      found = true;
      break;
    }
  }
  
  if (!found) {
    sheet.appendRow([gameTitle, 1, 1, 1, now, todayStr, monthStr]);
  }
  
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click the **Save** icon and name the project (e.g., "Game Analytics Backend").

## 3. Deployment

1. Click the **Deploy** button > **New deployment**.
2. Select type: **Web app**.
3. Description: `Initial deployment`.
4. Execute as: **Me**.
5. Who has access: **Anyone**. (This is required for the website to send data without user authentication).
6. Click **Deploy**.
7. You may be prompted to **Authorize access**. Click "Authorize access", select your Google account, click "Advanced" -> "Go to Game Analytics Backend (unsafe)", and click "Allow".
8. Copy the **Web App URL** provided.

## 4. Update Website Configuration

1. Open `src/utils/analytics.js` in your project.
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with the URL you copied in the previous step:

```javascript
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
```

3. Save the file and rebuild your project.

## Privacy Note
This analytics system only tracks the game title and the time it was played. No IP addresses, user-agent strings, or personal identifiers are sent to or stored in the Google Sheet.
