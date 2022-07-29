var tiles = [];
var treasure = [];
let width = 11, height = 11;
let time = 0, score = 0;

var player = {
  x: Math.floor(width / 2),
  y: Math.floor(height / 2)
};

for (let row = 0; row < height; row += 1) {
  treasure[row] = new Array;
  for (let t = 0; t < width; t += 1) {
    if (Math.random() < 0.1)
      treasure[row].push(true);
    else
      treasure[row].push(false);
  }
}

function drawMap() {
  let map = document.getElementById("map");
  map.textContent = "";

  for (let row = 0; row < height; row += 1) {
    tiles[row] = new Array;
    for (let t = 0; t < width; t += 1) {
      if (treasure[row][t]) {
        tiles[row].push("💰"); 
      } else {
        tiles[row].push("◻️");
      }
    }
  }

  tiles[player.x][player.y] = "😃";

  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      map.append(tiles[j][i]);
    }
    map.append(document.createElement('br'));
  }
}

drawMap();

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case "s":
    case "ArrowDown":
      move("down");
      break;
    case "w":
    case "ArrowUp":
      move("up");
      break
    case "a":
    case "ArrowLeft":
      move("left")
      break;
    case "d":
    case "ArrowRight":
      move("right")
      break;
    case ".":
      move();
      break;
  }
}, true);

function move(direction) {
  switch (direction) {
    case "up-left":
      if (player.y > 0)
        player.y -= 1;
      if (player.x > 0)
        player.x -= 1;
      break;
    case "up":
      if (player.y > 0)
        player.y -= 1;
      break;
    case "up-right":
      if (player.y > 0)
        player.y -= 1;
      if (player.x < width - 1)
        player.x += 1;
      break;
    case "left":
      if (player.x > 0)
        player.x -= 1;
      break;
    case "right":
      if (player.x < width - 1)
        player.x += 1;
      break;
    case "down-left":
      if (player.y < height - 1)
        player.y += 1;
      if (player.x > 0)
        player.x -= 1;
      break;
    case "down":
      if (player.y < height - 1)
        player.y += 1;
      break;
    case "down-right":
      if (player.y < height - 1)
        player.y += 1;
      if (player.x < width - 1)
        player.x += 1;
      break;
  }
  if (treasure[player.x][player.y]) {
    treasure[player.x][player.y] = false;
    score += 100;
  }

  time += 1;
  document.getElementById("time").textContent = "time: " + time;
  document.getElementById("score").textContent = "score: " + score;
  drawMap();
}