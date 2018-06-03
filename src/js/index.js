require('!style-loader!css-loader!../css/style.css')

import { sortable, draggable } from './views/draggable'
import { timelineInteraction, deadlineInteraction } from './views/interact'
import { addTask, addDeadline, deleteRow } from './views/rowsView'
import { toggleMainGridlines, toggleSubGridlines, toggleMainBox, toggleSubBox } from './views/gridlinesView'

// loadObject = {
//   projectName: projectName,
//   startDate: startDate,
//   endDate: endDate,
//   showMainGridLines: showMainGridlines,
//   showSubGridLines: showSubGridLines,
//   rowSpacing: rowSpacing,
//   rows: [
//     {
//       type: "task",
//       title: "",
//       xStart: 0.00,
//       xWidth: 0.15,
//       color: "orange"
//     },
//     {
//       type: "deadline",
//       title: "",
//       xStart: 0.00,
//       color: "purple"
//     },
//   ] 
// }

// All event listeners
document.addEventListener('click', event => {
  
  // Event listener for adding a deadline row
  if(document.querySelector('.button-deadline').contains(event.target)) {
    // Render new deadline row
    addDeadline();
  }

  // Event listener for adding a task row
  if(document.querySelector('.button-task').contains(event.target)) {
    // Render new task row
    addTask();
  }

  // Event listener for deleting a row
  let buttonsArray = Array.from(document.querySelectorAll('.btn-delete'));
  buttonsArray.forEach((current, index, array) => {
    if (current.contains(event.target)) {
      let button = current
      // Delete row
      deleteRow(button)
    }
  })

  // Event listerenr for toggling main grid lines
  if(document.querySelector('.btn-main-gridlines').contains(event.target)) {
    // Toggle border for major-gridline elements
    toggleMainGridlines();

    // Render new button
    toggleMainBox();
  }

  // Event listerenr for toggling main grid lines
  if(document.querySelector('.btn-sub-gridlines').contains(event.target)) {
    // Toggle border for major-gridline elements
    toggleSubGridlines();

    // Render new button
    toggleSubBox();
  }

})