const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let mark = "circle"
infoDisplay.textContent= "Circle goes first."

function createBoard(){
    //loop through the array
    startCells.forEach((_cell, index) => {
        //Create a div
        const cellElement = document.createElement('div')
        //Add div to board
        gameBoard.append(cellElement)
        //add square class to div
        cellElement.classList.add('square')
        // add index of element as id
        cellElement.id = index

        cellElement.addEventListener('click', addCircleOrCross)
       
    })
}

createBoard()

function addCircleOrCross(c){
    //console.log(c.target)
    //Add either circle or cross div
    const markDisplay = document.createElement('div')
    markDisplay.classList.add(mark)
    c.target.append(markDisplay)

    // Alternate between circle and cross
    mark = mark === "circle" ? "cross" : "circle"
    infoDisplay.textContent = `It's now ${mark}'s go.`
    c.target.removeEventListener('click', addCircleOrCross)

    checkScore()

 }

function checkScore() {
    const allSquares = document.querySelectorAll('.square')
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  
    let winner = null;
  
    winningCombos.forEach(array => {
      const circleWins = array.every(cell =>
        allSquares[cell].firstChild?.classList.contains('circle')
      )
  
      if (circleWins) {
        winner = 'circle'
      }
    })
  
    winningCombos.forEach(array => {
      const crossWins = array.every(cell =>
        allSquares[cell].firstChild?.classList.contains('cross')
      )
  
      if (crossWins) {
        winner = 'cross'
      }
    })
  
    if (winner) {
      infoDisplay.textContent = `${winner} Wins!`
      gameBoard.innerHTML = ''
      createBoard()
      return
    }
  
    // Check for a tie
    const emptySquares = [...allSquares].filter(square => !square.firstChild)
    if (emptySquares.length === 0) {
      infoDisplay.textContent = "It's a tie!"
      gameBoard.innerHTML = ''
      createBoard()
      return
    }
  }