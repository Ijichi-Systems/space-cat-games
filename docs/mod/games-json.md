---
icon: terminal
---

# games.json

## Adding Games

Run: `node scripts/add-game.js`

Follow the instructions in the Terminal.



### Formatting of games.json

At the top of the file, metadata is stored.

```json
"generatedAt": "2026-03-06T14:54:55.192Z",
"count": 151,
"games": {...}
```

`generatedAt` stores the last time the file was edited by the script.

`count` stores the total number of games.

`games` is an array of all current games.



Games are stored as follows:

```json
{
  "title": "Wordle",
  "url": "/games/wordle.html",
  "img": "https://i.ibb.co/SXZymjyS/images.png",
  "alt": "Wordle"
},
```

`title`  is the name of the game.

`url`  points to where the game is

`img`  points to the icon location.

`alt`  is alt text to be attached.
