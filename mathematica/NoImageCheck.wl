(* Base directory of the script *)
baseDir = Directory[];

(* Path to the JSON file *)
jsonPath = FileNameJoin[{baseDir, "public", "apis", "games.json"}];

(* Import JSON *)
jsonData = Import[jsonPath, "RawJSON"];

(* Filter games that have no image or a placeholder *)
gamesWithoutImages = Select[jsonData["games"],
   ! StringMatchQ[#["img"], "" | "/images/noimg.png"] & // Not
];

(* Extract their titles *)
titlesWithoutImages = gamesWithoutImages[[All, "title"]];

(* Output *)
Print["Games without proper images:"];
titlesWithoutImages