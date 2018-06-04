// Add task row
export const addTask = (title, rowSpacing, xStart, xWidth, color) => {
  let markup = `
  <div class="row row-task" tabindex="-1" style="padding-top: ${rowSpacing}px; padding-bottom: ${rowSpacing}px;">
    <ion-icon name="close-circle" class="btn-delete"></ion-icon>
    <div class="color-picker"></div>
    <div class="color-pallete">
      <div class="color-option color-blue"></div>
      <div class="color-option color-green"></div>
      <div class="color-option color-purple"></div>
      <div class="color-option color-dark-blue"></div>
      <div class="color-option color-yellow"></div>
      <div class="color-option color-orange"></div>
      <div class="color-option color-red"></div>
      <div class="color-option color-grey"></div>
    </div>
    
    <div class=text-area>
      <input class="text-field" type="text" value="${title}">
    </div>
    <div class="timing-area">
      <div class="container-timeline">
        <div class="timeline" style="width: ${xWidth}px; transform: translate(${xStart}px, 0px); background: ${color};" data-x="${xStart}"></div>
      </div>
    </div>
  </div>
  `

  document.querySelector('.container-rows').insertAdjacentHTML('beforeend', markup)
}

// Add deadline row
export const addDeadline = (title, rowSpacing, xStart, color) => {
  let markup = `
  <div class="row row-deadline" tabindex="-1" style="padding-top: ${rowSpacing}px; padding-bottom: ${rowSpacing}px;">
    <ion-icon name="close-circle" class="btn-delete"></ion-icon>
    <div class="color-picker"></div>
    <div class="color-pallete">
      <div class="color-option color-blue"></div>
      <div class="color-option color-green"></div>
      <div class="color-option color-purple"></div>
      <div class="color-option color-dark-blue"></div>
      <div class="color-option color-yellow"></div>
      <div class="color-option color-orange"></div>
      <div class="color-option color-red"></div>
      <div class="color-option color-grey"></div>
    </div>
    <div class=text-area>
      <input class="text-field-deadline" type="text" value="${title}">
    </div>
    <div class="timing-area">
      <div class="container-deadline">
        <div class="deadline" style="transform: translate(${xStart}px, 0px); background: ${color};" data-x="${xStart}"></div>
      </div>
    </div>
  </div>
  `
  document.querySelector('.container-rows').insertAdjacentHTML('beforeend', markup)
}

// Delete row
export const deleteRow = (button) => {
  // Tests is there are are least two or more rows
  if (Array.from(document.querySelectorAll('.row')).length >= 2) {
    let row = button.parentNode
    row.parentNode.removeChild(row)
  }
}

export const increaseRowSpacing = () => {
  let firstRow = document.querySelector('.row')
  let currentSpacingTop = parseInt(window.getComputedStyle(firstRow, null).paddingTop);
  let currentSpacingBottom = parseInt(window.getComputedStyle(firstRow, null).paddingBottom);
  if (currentSpacingTop < 20 && currentSpacingBottom < 20) {
    let rowsArray = Array.from(document.querySelectorAll('.row'))
    rowsArray.forEach((current, index, array) => {
      current.style.paddingTop = `${currentSpacingTop + 1}px`
      current.style.paddingBottom = `${currentSpacingBottom + 1}px`
    })
  }
}

export const reduceRowSpacing = () => {
  let firstRow = document.querySelector('.row')
  let currentSpacingTop = parseInt(window.getComputedStyle(firstRow, null).paddingTop);
  let currentSpacingBottom = parseInt(window.getComputedStyle(firstRow, null).paddingBottom);
  if (currentSpacingTop > 1 && currentSpacingBottom > 1) {
    let rowsArray = Array.from(document.querySelectorAll('.row'))
    rowsArray.forEach((current, index, array) => {
      current.style.paddingTop = `${currentSpacingTop - 1}px`
      current.style.paddingBottom = `${currentSpacingBottom - 1}px`
    })
  }
}

export const setRowSpacing = (spacing) => {
  let rowsArray = Array.from(document.querySelectorAll('.row'))
  rowsArray.forEach((current) => {
    current.style.paddingTop = `${spacing}px`
    current.style.paddingBottom = `${spacing}px`
  })
}

export const updateColor = (row, color) => {
  if (row.querySelector('.timeline')) {
    row.querySelector('.timeline').style.background = `${color}`
  } else if (row.querySelector('.deadline')) {
    row.querySelector('.deadline').style.background = `${color}`
  }
}