
function init() {
  console.log('js is up and running')
  // ! elements

  const width = 10
  const trackingGrid = document.querySelector('#trackingGrid')
  const oceanGrid = document.querySelector('#oceanGrid')
  const startBtn = document.querySelector('#startBtn')
  const cellCount = width * width
  const oceanGridCells = []
  const trackingGridCells = []
  const ships = [
    {
      name: 'patrol-boat',
      directions: [
        [0, 1],
        [0, width]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'destroyer',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4]
      ]
    }
  ]

  // ! Functions


  

  function createGridsCells(grid, cells) {                  
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.id = i
      cell.textContent = i
      grid.appendChild(cell).classList.add('gridsCells')
      cells.push(cell)
    }
  }
  createGridsCells(oceanGrid, oceanGridCells)
  createGridsCells(trackingGrid, trackingGridCells)


  function oceanGridShipsGenerator(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    let direction 
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * oceanGridCells.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => oceanGridCells[randomStart + index].classList.contains('cellTaken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => oceanGridCells[randomStart + index].classList.add('cellTaken', ship.name))

    else oceanGridShipsGenerator(ship)
  }

  oceanGridShipsGenerator(ships[0])
  oceanGridShipsGenerator(ships[1])
  oceanGridShipsGenerator(ships[2])
  oceanGridShipsGenerator(ships[3])
  oceanGridShipsGenerator(ships[4])
  
  function trackingGridShipsGenerator(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    let direction 
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * trackingGridCells.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => trackingGridCells[randomStart + index].classList.contains('cellTaken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => trackingGridCells[randomStart + index].classList.add('cellTakenByAI', ship.name))

    else trackingGridShipsGenerator(ship)
  }

  trackingGridShipsGenerator(ships[0])
  trackingGridShipsGenerator(ships[1])
  trackingGridShipsGenerator(ships[2])
  trackingGridShipsGenerator(ships[3])
  trackingGridShipsGenerator(ships[4])





































}

window.addEventListener('DOMContentLoaded', init)