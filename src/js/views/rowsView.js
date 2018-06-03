// Add task row
export const addTask = () => {
  let markup = `
  <div class="row row-task">
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
      <input class="text-field" type="text">
    </div>
    <div class="timing-area">
      <div class="container-timeline">
        <div class="timeline" style="width: 200px; transform: translate(0px, 0px);" data-x="0"></div>
      </div>
    </div>
  </div>
  `

  document.querySelector('.container-rows').insertAdjacentHTML('beforeend', markup)
}

// Add deadline row
export const addDeadline = () => {
  let markup = `
  <div class="row row-deadline" tabindex="-1">
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
      <input class="text-field-deadline" type="text">
    </div>
    <div class="timing-area">
      <div class="container-deadline">
        <div class="deadline" style="transform: translate(0px, 0px);" data-x="0"></div>
      </div>
    </div>
  </div>
  `
  document.querySelector('.container-rows').insertAdjacentHTML('beforeend', markup)
}

// Delete row
export const deleteRow = (button) => {
let row = button.parentNode
row.parentNode.removeChild(row)
}