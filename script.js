var rows = 4;
var columns = 4;

var currTile;
var otherTile; // boş resim (blank tile)

var turns = 0;

var imgOrder = ["3", "1", "7", "12", "5", "8", "2", "9", "15", "13", "4", "6", "10", "14", "11", "0"];

for (var i = 1; i <= rows * columns - 1; i++) {
    imgOrder.push(i.toString());
}

imgOrder.push("");

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "resimler/" + imgOrder.shift() + ".jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    document.getElementById("resetButton").addEventListener("click", resetGame);
    document.getElementById("resetButton").style.display = "block";
}


function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("0")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (checkWin()) {
            congratulate();
        }
    }
}

function checkWin() {
    var tiles = document.querySelectorAll("#board img");

    for (var i = 0; i < tiles.length - 1; i++) {
        var tile = tiles[i];
        var tileId = tile.id.split("-");
        var expectedId = i.toString();

        if (tileId[0] !== expectedId || tile.src.includes("")) {
            return false;
        }
    }

    return true;
}

function congratulate() {
    alert("Tebrikler! Yapbozu tamamladınız!");
}
function resetGame() {
    turns = 0;
    document.getElementById("turns").innerText = turns;

    var tiles = document.querySelectorAll("#board img");

    // Resimleri yeniden karıştır
    imgOrder = shuffleArray(imgOrder);

    // Yeni resim sırasına göre resimleri güncelle
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].src = "resimler/" + imgOrder[i] + ".jpg";
    }
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "resimler/" + imgOrder.shift() + ".jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    document.getElementById("resetButton").addEventListener("click", resetGame);
    document.getElementById("resetButton").style.display = "block";
}
