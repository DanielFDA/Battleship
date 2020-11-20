
function init() {
  console.log('js is up and running')
  // ! elements

  const width = 11
  const trackingGrid = document.querySelector('#trackingGrid')
  const oceanGrid = document.querySelector('#oceanGrid')
  const cellCount = width * width 
  const oceanGridCells =  []
  const trackingGridCells = []
  console.log(trackingGridCells)



  function createTrackingGridsCells() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      trackingGrid.appendChild(cell).classList.add('gridsCells')
      trackingGridCells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      oceanGrid.appendChild(cell).classList.add('gridsCells')
      oceanGridCells.push(cell)
    }
  }

  createTrackingGridsCells()
































}

window.addEventListener('DOMContentLoaded', init)