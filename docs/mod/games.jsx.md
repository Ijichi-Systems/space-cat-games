# games.jsx

#### Loading games from API

Once games are added to the API, we load from the JSON API file. This is done with:

```javascript
useEffect(() => {
  fetch("/api/games.json")
    .then((r) => r.json())
    .then((data) => {
      setGames(data.games || []);
      setFilteredGames(data.games || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error loading games:", err);
      setLoading(false);
    });
```

If you want to keep the API somewhere else, you can adjust the following line:

```javascript
fetch("/path/to/your/json/file")
```

#### Loading "Recently Played"

