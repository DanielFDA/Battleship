
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

  let shotFired 
  let cellUnderFire

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
    let randomDirection = Math.floor(Math.random() * ship.directions.length) // te devuelve un valor random 0 o 1
    let current = ship.directions[randomDirection] // elige una de las dos direcciones q tiene el array
    let direction  // se usa para luego multiplicar dependiendo de si es horizontal o vertical
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * oceanGridCells.length - (ship.directions[0].length * direction)))  // agarra una cell random del oceangrid y le resta el largo de las direcciones del barco q va a crear (multiplicado por la direccion(horizontal o vertical)) ej: un destroyer seria 36 - (3 * 1(si es horizontal) o 10(si es vertical)) en el caso de ser vertical tienes 36 - 3*10 = 6, la primera posicion del barco seria la cell numero 6

    const isTaken = current.some(index => oceanGridCells[randomStart + index].classList.contains('cellTaken')) // esta funcion se encarga de revisar si la random cell ya tiene asignada la clase de cellTaken
    const isAtRightEdge = current.some(index => (randomStart + index) % width > width - 1) // esta funcion se encarga de buscar tu cell de inicio e irle agregando todas las cells del barco y comprobando q esten en el borde derecho. ej: randomStart(36) + index(depende de las vidas del barco y de si es horizontal(0,1,2) o vertical(0,width,width*2) ) en el caso del destroyer seria 36+0)%10 = 6 === 9; 36+1)%10 = 7 === 9; 36+2) %10 = 8 === 9. // ! lo cambie para que sea menor enves de estrictamente igual, de esta manera pueden aparecer barcos en la ultima fila de la derecha, pero no logro hacer que puedan aparecer tambien en la de la izquierda porque me genera un error que hace q los barcos salgan desde un extremo de una linea hasta el otro extremo en la siguiente linea
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0) // lo mismo de arriba solo que para el lado izquierdo 

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => oceanGridCells[randomStart + index].classList.add('cellTaken', ship.name)) // se asegura q todos los casos anteriores sean falsos para agregar randommente los barcos y agregarles dos clases una de celltaken y otra con su nombre

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
    const isAtRightEdge = current.some(index => (randomStart + index) % width > width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => trackingGridCells[randomStart + index].classList.add('cellTakenByAI', ship.name))

    else trackingGridShipsGenerator(ship)
  }

  trackingGridShipsGenerator(ships[0])
  trackingGridShipsGenerator(ships[1])
  trackingGridShipsGenerator(ships[2])
  trackingGridShipsGenerator(ships[3])
  trackingGridShipsGenerator(ships[4])


  trackingGridCells.forEach(cell => cell.addEventListener('click', function(e) {
    shotFired = cell.dataset.id // encontramos el dataset id de la cell que hacemos click
    // revealSquare(square.classList)
    const query = `[data-id="${shotFired}"]`    // transformamos el dataset id en un string para poder encontrarlo con queryselector
    cellUnderFire = trackingGrid.querySelector(query)  // asigna el elemnto q fue clickeado usando un queryselect para el dataset id dentro del tracking grid
    cellUnderFire.classList.add('cellShot')
    if (cellUnderFire.classList.contains('cellShot')) {
      console.log('ns')
    }
  }))
  // const query = `[data-id=${shotFired}]`
  // const resp = trackingGrid.querySelector(query)
  // console.log(resp)

































}

window.addEventListener('DOMContentLoaded', init)