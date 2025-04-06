const board = document.getElementById("board");

let pieces = [
  {
    type: "torre",
    img: "https://down-br.img.susercontent.com/file/b6591f6ec3be17f8e861e86a588b0c77",
    row: 7,
    col: 0
  },
  {
    type: "cavalo",
    img: "https://cdn.pixabay.com/photo/2016/06/27/19/11/chess-1483089_960_720.jpg",
    row: 7,
    col: 1
  },
  {
    type: "peao",
    img: "https://img.freepik.com/vetores-premium/peca-de-xadrez-preta-peao-3d-no-fundo-branco-jogo-de-tabuleiro-peca-de-xadrez-3d-rendervector_535532-178.jpg",
    row: 6,
    col: 4
  }
];

let selectedPiece = null;

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = pieces.find(p => p.row === row && p.col === col);
      if (piece) {
        const img = document.createElement("img");
        img.src = piece.img;
        img.style.width = "100%";
        img.style.height = "100%";
        square.appendChild(img);
      }

      square.addEventListener("click", () => handleClick(row, col));
      board.appendChild(square);
    }
  }
}

function handleClick(row, col) {
  if (selectedPiece) {
    const valid = validMoves(selectedPiece).some(pos => pos.row === row && pos.col === col);
    if (valid) {
      selectedPiece.row = row;
      selectedPiece.col = col;
    }
    selectedPiece = null;
    createBoard();
  } else {
    const piece = pieces.find(p => p.row === row && p.col === col);
    if (piece) {
      selectedPiece = piece;
      highlight(validMoves(piece));
    }
  }
}

function validMoves(piece) {
  let moves = [];
  if (piece.type === "peao") {
    if (piece.row > 0) moves.push({ row: piece.row - 1, col: piece.col });
  } else if (piece.type === "torre") {
    for (let i = 0; i < 8; i++) {
      if (i !== piece.row) moves.push({ row: i, col: piece.col });
      if (i !== piece.col) moves.push({ row: piece.row, col: i });
    }
  } else if (piece.type === "cavalo") {
    let offsets = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    offsets.forEach(([dx, dy]) => {
      let r = piece.row + dx, c = piece.col + dy;
      if (r >= 0 && r < 8 && c >= 0 && c < 8) moves.push({ row: r, col: c });
    });
  }
  return moves;
}

function highlight(moves) {
  createBoard();
  moves.forEach(({ row, col }) => {
    const index = row * 8 + col;
    board.children[index].classList.add("highlight");
  });
}

createBoard();
