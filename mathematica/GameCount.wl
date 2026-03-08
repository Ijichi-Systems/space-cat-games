(* Base path: directory where this notebook/script lives *)
baseDir = Directory[];

(* Path to JSON file relative to baseDir *)
jsonPath = FileNameJoin[{baseDir, "public", "api", "games.json"}];

(* Import JSON as an association *)
jsonData = Import[jsonPath, "RawJSON"];

(* Count the number of games *)
numGames = Length[jsonData["games"]]

(* Output *)
Print["Number of games: ", numGames];