require('!style-loader!css-loader!../css/style.css')

import { sortable, draggable } from './views/draggable'
import { timelineInteraction, deadlineInteraction } from './views/interact'
import { addTask, addDeadline, deleteRow, increaseRowSpacing, reduceRowSpacing, updateColor } from './views/rowsView'
import { toggleMainGridlines, toggleSubGridlines, toggleMainBox, toggleSubBox, renderGridlines } from './views/gridlinesView'
import { calculateMainGridlines, calculateSubGridlines } from './models/GridlineModel'

// loadObject = {
//   projectName: projectName,
//   startDate: startDate,
//   endDate: endDate,
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


// All 'click' event listeners
document.addEventListener('click', event => {
  // Event listener for adding a deadline row
  if (document.querySelector('.button-deadline').contains(event.target)) {
    let firstRow = document.querySelector('.row')
    let rowSpacing = parseInt(window.getComputedStyle(firstRow, null).paddingTop)
    // Render new deadline row
    addDeadline(rowSpacing, 0, "#BB6BD9");
  }

  // Event listener for adding a task row
  else if (document.querySelector('.button-task').contains(event.target)) {
    let firstRow = document.querySelector('.row')
    let rowSpacing = parseInt(window.getComputedStyle(firstRow, null).paddingTop)
    // Render new task row
    addTask(rowSpacing, 0, 200, "#F2994A");
  }

  // Event listerenr for toggling main grid lines
  else if (document.querySelector('.btn-main-gridlines').contains(event.target)) {
    // Toggle border for major-gridline elements
    toggleMainGridlines();

    // Render new button
    toggleMainBox();
  }

  // Event listerenr for toggling sub grid lines
  else if (document.querySelector('.btn-sub-gridlines').contains(event.target)) {
    // Toggle border for major-gridline elements
    toggleSubGridlines();

    // Render new button
    toggleSubBox();
  } 

  // Event listener for increasing row spacing
  else if (document.querySelector('.btn-increase-spacing').contains(event.target)) {
    // Increase spacing if it's less than 30px
    increaseRowSpacing();
  }
  
  // Event listener for reducing row spacing
  else if (document.querySelector('.btn-reduce-spacing').contains(event.target)) {
    // Reduce spacing if it's more than 1px
    reduceRowSpacing();
  } 
  
  // Event listener for changing timeline or deadline color
  else if (event.target.tagName !== "path" && event.target.tagName !== "svg" && event.target.className.includes("color-option")) {
    let row = event.target.parentNode.parentNode
    let color = window.getComputedStyle(event.target).backgroundColor
    // Change color of task or deadline
    updateColor(row, color);
  }

  // Event listener for deleting a row
  else if(event.target.tagName === "path" || event.target.tagName === "svg") {
    let buttonsArray = Array.from(document.querySelectorAll('.btn-delete'));
    buttonsArray.forEach((current, index, array) => {
    if (current.contains(event.target)) {
      let button = current
      // Delete row
      deleteRow(button)
    }
  })
  }
})


// Event listener for updating dates
const dateElementArray = [document.querySelector('.date-field-start'), document.querySelector('.date-field-end')]
dateElementArray.forEach((current) => {
  current.addEventListener('input', updateGridlines)
})

// Function to update gridlines when a date is changed
function updateGridlines() {
  let startDate = new Date(document.querySelector('.date-field-start').value)
  let endDate = new Date(document.querySelector('.date-field-end').value)
  let daysBetweenDates = (endDate - startDate)/(1000*60*60*24)
  
  // Check if days between dates is between 2 and 1095 days
  if (daysBetweenDates >= 2 && daysBetweenDates <= 1095) {
    // Get rid of error message
    document.querySelector('.section-message').style.display = "none"

    // Calculate main gridlines
    let numberOfMainGridlines = calculateMainGridlines(daysBetweenDates);

    // Calculate sub gridlines
    let numberOfSubGridlines = calculateSubGridlines(daysBetweenDates, numberOfMainGridlines);

    // Render gridlines
    renderGridlines(numberOfMainGridlines, numberOfSubGridlines);

    // Render new dates

  } else {
    // Display error message
    let messageArea = document.querySelector('.section-message')
    messageArea.style.display = "block"
    if (daysBetweenDates < 2 && daysBetweenDates >= 0) {
      messageArea.textContent = "Minimum of two days"
    } else if (daysBetweenDates < 0 || isNaN(daysBetweenDates)) {
      messageArea.textContent = "Error. Please check that the end date is after the start date and that both dates exist"
    } else if (daysBetweenDates > 1095) {
      messageArea.textContent = "Maximum of three years"
    }
  }
}