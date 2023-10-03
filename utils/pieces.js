import { BOARD_WIDTH } from './constants.js'

const pieces = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 1, 1, 1]
  ]
]

// ramdom piece generator
export function createRandomPiece () {
  const newPiece = {
    position: {
      x: Math.floor(BOARD_WIDTH / 2 - 2),
      y: 0
    },
    shape: rotatePiece(
      pieces[Math.floor(Math.random() * pieces.length)] || pieces[0],
      Math.floor(Math.random() * 3 + 1)
    )
  }
  return newPiece
}

// rotate piece
export function rotatePiece (piece, numberOfRotations = 1) {
  let newPiece = piece

  for (let i = 0; i < numberOfRotations; i++) {
    const rotate = []
    for (let y = 0; y < newPiece[0].length; y++) {
      const newRow = []
      for (let x = 0; x < newPiece.length; x++) {
        newRow.push(newPiece[x][y])
      }
      rotate.push(newRow.reverse())
    }
    newPiece = rotate
  }

  return newPiece
}
