import { BOARD_HEIGHT, BOARD_WIDTH, BLOCK_SIZE } from "./constants.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const $score = document.querySelector("#score");
const $level = document.querySelector("#level");

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);

// create board
export const createBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    new Array(BOARD_WIDTH).fill(0)
  );
};

// draw
export function draw(board, piece, score, level) {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the board
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "white";
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  // Draw the ghost piece
  const ghostPiece = getGhostPosition(board, piece);
  ghostPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "rgba(255, 255, 255, 0.2)"; // Semi-transparent white
        context.fillRect(
          ghostPiece.position.x + x,
          ghostPiece.position.y + y,
          1,
          1
        );
      }
    });
  });

  // Draw the active piece
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "white";
        context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1);
      }
    });
  });

  $score.innerText = score;
  $level.innerText = level;
}

// collision detection
export function checkCollision(board, piece) {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[piece.position.y + y]?.[piece.position.x + x] !== 0
      );
    });
  });
}

export function getGhostPosition(board, piece) {
  // Create a copy of the current piece
  const ghostPiece = {
    shape: piece.shape,
    position: { ...piece.position },
  };

  // Move the ghost piece down until it collides
  while (!checkCollision(board, ghostPiece)) {
    ghostPiece.position.y++;
  }

  // Move back up one step since we found the collision
  ghostPiece.position.y--;

  return ghostPiece;
}
