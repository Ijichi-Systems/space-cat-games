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
  // SAFETY CHECK: Prevents error when clicking "Run" button in the editor
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput("Error: No data received. Note: This script must be triggered by a game play on the website, not the 'Run' button.").setMimeType(ContentService.MimeType.TEXT);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Analytics') || ss.insertSheet('Analytics');
  
  // Set up headers if new sheet
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
    // Check if game title matches (ignoring case and extra spaces)
    if (String(rows[i][0]).trim().toLowerCase() === gameTitle.toLowerCase()) {
      var total = Number(rows[i][1]) + 1;
      var lastTodayStr = rows[i][5];
      var lastMonthStr = rows[i][6];
      
      var todayCount = (lastTodayStr === todayStr) ? Number(rows[i][2]) + 1 : 1;
      var monthCount = (lastMonthStr === monthStr) ? Number(rows[i][3]) + 1 : 1;
      
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
5. Who has access: **Anyone**. (This is required for the website to send data).
6. Click **Deploy**.
7. Click "Authorize access", select your Google account, click "Advanced" -> "Go to Game Analytics Backend (unsafe)", and click "Allow".
8. Copy the **Web App URL** provided.

## 4. Update Website Configuration

1. Open `src/utils/analytics.js` in your project.
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with the URL you copied:

```javascript
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
```

3. Save the file and rebuild your project.

## 5. How to Verify It's Working

To confirm that your analytics are correctly set up, follow these steps:

### A. Check the Browser Console
1. Open your website in your browser.
2. Press `F12` or right-click and select **Inspect**, then go to the **Console** tab.
3. Click on a game to play it.
4. You should see a message like: `[Analytics] Tracking play for: Minecraft`.
5. If there is an error, it will appear in red (e.g., `401 Unauthorized` or `404 Not Found`).

### B. Check Google Apps Script Executions
1. Go back to your [Google Apps Script editor](https://script.google.com/).
2. On the left sidebar, click the **Executions** icon (looks like a clock).
3. You should see a list of recent `doPost` executions.
4. If the status is **Completed**, the data was received and processed.
5. If it says **Failed**, click on it to see the error message.

### C. Check the Google Sheet
1. Open your Google Sheet.
2. You should see a sheet named **Analytics** (it will be created automatically if it didn't exist).
3. A new row should appear with the game title you clicked, or the numbers in an existing row should increase.

## Troubleshooting

*   **"TypeError: Cannot read properties of undefined (reading 'postData')"**: This happens if you click the **"Run"** button inside the Apps Script editor. This is normal behavior! The script is designed to be triggered by the website, not manually run in the editor.
*   **"NetworkError when attempting to fetch resource"**: This is almost always caused by an **AdBlocker**, **Brave Shield**, or **Firefox Enhanced Tracking Protection**. These tools see the request to `script.google.com` as a "tracker" and block the connection entirely.
    *   **To fix/test**: Disable your AdBlocker or try opening the site in a **Private/Incognito window** where extensions are disabled. If it works there, the code is fine!
*   **"Cross-Origin Request Blocked" / CORS Error**: You might still see a CORS warning in your browser console. This is **normal** when using Google Apps Script with `no-cors` mode. As long as the data appears in your spreadsheet, you can ignore this warning.
*   **Sheet not updating**: Ensure "Who has access" was set to **Anyone** during deployment. 
*   **Important**: If you change the code in Apps Script, you must go to **Deploy > Manage Deployments**, click the **Edit** icon, choose **New Version**, and click **Deploy** again.
