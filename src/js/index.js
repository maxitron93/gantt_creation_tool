require('!style-loader!css-loader!../css/style.css')

import { sortable, draggable } from './views/draggable'
import { timelineInteraction, deadlineInteraction } from './views/interact'
import { addTask, addDeadline, deleteRow, increaseRowSpacing, reduceRowSpacing, setRowSpacing, updateColor } from './views/rowsView'
import { toggleMainGridlines, toggleSubGridlines, toggleMainBox, toggleSubBox, renderGridlines, updateDateLabels } from './views/gridlinesView'
import { calculateMainGridlines, calculateSubGridlines } from './models/GridlineModel'

const formatDate = (dateInMS) => {
  let year = ((new Date(dateInMS)).getYear() + 1900).toString()
  let month = ((new Date(dateInMS)).getMonth() + 1).toString()
  if (month.length === 1) {
    month = ["0", month].join("")
  }
  let date = ((new Date(dateInMS)).getDate()).toString()
  if (date.length === 1) {
    date = ["0", date].join("")
  }
  return(`${year}-${month}-${date}`)
}

let saveObject = {
  containerWidth: null,
  projectName: "",
  startDate: null,
  endDate: null,
  rowSpacing: null,
  rows: []
}

let loadObject = {
  containerWidth: 1188,
  projectName: "Test project load",
  startDate: 1534204800000,
  endDate: 1547596800000,
  rowSpacing: 4,
  rows: [
    {type: "task", title: "kjhjkhkkjhjkh", xStart: 763, xWidth: 107, color: "rgb(187, 107, 217)"},
    {type: "task", title: "v8i56v7i65v", xStart: 331, xWidth: 220, color: "rgb(63, 169, 229)"},
    {type: "deadline", title: "ovol8v", xStart: 0, color: "rgb(243, 200, 67)"},
    {type: "task", title: "ov85v", xStart: 0, xWidth: 99, color: "rgb(130, 130, 130)"},
    {type: "task", title: "678457", xStart: 113, xWidth: 440, color: "rgb(243, 200, 67)"},
    {type: "deadline", title: "cvo86vc5l86", xStart: 1108, color: "rgb(55, 188, 111)"},
    {type: "deadline", title: "v5l87iv6", xStart: 1108, color: "rgb(39, 114, 215)"},
    {type: "task", title: "lv876l786v87v6", xStart: 477, xWidth: 651, color: "rgb(55, 188, 111)"},
    {type: "task", title: "l876b78b6o76", xStart: 996, xWidth: 132, color: "rgb(187, 107, 217)"},
    {type: "task", title: "asd`asd`asd", xStart: 0, xWidth: 1129, color: "rgb(55, 188, 111)"},
    {type: "deadline", title: "buyiv", xStart: 429, color: "rgb(187, 107, 217)"},
    {type: "deadline", title: "vtiuy", xStart: 881, color: "rgb(187, 107, 217)"},
    {type: "task", title: "vt", xStart: 254, xWidth: 436, color: "rgb(63, 169, 229)"},
    {type: "deadline", title: "fcghfgh", xStart: 654, color: "rgb(187, 107, 217)"},
    {type: "task", title: "ghfghdht", xStart: 724, xWidth: 403, color: "rgb(242, 153, 74)"},
    {type: "deadline", title: "", xStart: 36, color: "rgb(229, 74, 74)"}
  ]
}



// Load chart
const loadChart = () => {
  // Send request

  // Update loadObject with requested information

  // Render chart
  let currentContainerWidth = (document.querySelector('.container-rows').offsetWidth - 330)
  // 1. Set project name
  document.querySelector('.project-name').value = loadObject.projectName
  // 2. Set dates
  document.querySelector('.date-field-start').value = formatDate(loadObject.startDate)
  document.querySelector('.date-field-end').value = formatDate(loadObject.endDate)
  // 3. Render rows
  loadObject.rows.forEach((current) => {
    if (current.type === "task") {
      let xStart = current.xStart * ( currentContainerWidth / loadObject.containerWidth)
      let xWidth = current.xWidth * ( currentContainerWidth / loadObject.containerWidth)
      addTask(current.title, loadObject.rowSpacing, xStart, xWidth, current.color);
    } else if (current.type === "deadline") {
      let beforeAdjustment = current.xStart * ( currentContainerWidth / loadObject.containerWidth)
      let xStart = beforeAdjustment - ((1 - currentContainerWidth / loadObject.containerWidth) * 23)
      addDeadline(current.title, loadObject.rowSpacing, xStart, current.color);
    }
  })
  // 4. Set gridlines
  updateGridlines();
}

loadChart();




// All 'click' event listeners
document.addEventListener('click', async (event) => {
  // Event listener for save button
  if (event.target === document.querySelector('.btn-save')) {
    // Store data in saveObject
    // 1. Store container width
    saveObject.containerWidth = document.querySelector('.container-rows').offsetWidth - 330
    // 2. Store project name
    saveObject.projectName = document.querySelector('.project-name').value
    // 3. Store start date
    saveObject.startDate = Date.parse(new Date(document.querySelector('.date-field-start').value))
    // 4. Store end date
    saveObject.endDate = Date.parse(new Date(document.querySelector('.date-field-end').value))
    // 5. Store row spacing value
    saveObject.rowSpacing = parseInt(document.querySelector('.row').style.paddingTop)
    // 6. Store rows
    saveObject.rows = [] // Delete any previous save data

    let rowsArray = Array.from(document.querySelectorAll('.row'))
    rowsArray.forEach((current) => {
      // For task rows
      if (current.className.includes("row-task")) {
        saveObject.rows.push({
          type: "task",
          title: current.querySelector('.text-field').value,
          xStart: parseInt(current.querySelector('.timeline').dataset.x),
          xWidth: parseInt(current.querySelector('.timeline').offsetWidth),
          color: current.querySelector('.timeline').style.backgroundColor
        })
        // For deadline rows
      } else if (current.className.includes("row-deadline")) {
        saveObject.rows.push({
          type: "deadline",
          title: current.querySelector('.text-field-deadline').value,
          xStart: parseInt(current.querySelector('.deadline').dataset.x),
          color: current.querySelector('.deadline').style.backgroundColor
        })
      }    
    })

    // Display message
    document.querySelector('.section-message').style.display = "block"
    document.querySelector('.section-message').style.color = "green"
    document.querySelector('.section-message').textContent = "Saving your chart..."

    // Send saveObject to API
    console.log(saveObject)

    // await send data
    

    // Display return message 

  }
  
  // Event listener for adding a deadline row
  if (document.querySelector('.button-deadline').contains(event.target)) {
    let firstRow = document.querySelector('.row')
    let rowSpacing = parseInt(window.getComputedStyle(firstRow, null).paddingTop)
    // Render new deadline row
    addDeadline("", rowSpacing, 0, "#BB6BD9");
  }

  // Event listener for adding a task row
  else if (document.querySelector('.button-task').contains(event.target)) {
    let firstRow = document.querySelector('.row')
    let rowSpacing = parseInt(window.getComputedStyle(firstRow, null).paddingTop)
    // Render new task row
    addTask("", rowSpacing, 0, 200, "#F2994A");
  }

  // Event listerenr for toggling main grid lines
  else if (document.querySelector('.btn-main-gridlines').contains(event.target)) {
    // Toggle border for main-gridline elements
    toggleMainGridlines();

    // Render new button
    toggleMainBox();
  }

  // Event listerenr for toggling sub grid lines
  else if (document.querySelector('.btn-sub-gridlines').contains(event.target)) {
    // Toggle border for main-gridline elements
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
  
  // Check if days between dates is between 3 and 1095 days
  if (daysBetweenDates >= 3 && daysBetweenDates <= 1095) {
    // Get rid of error message
    document.querySelector('.section-message').style.display = "none"

    // Calculate main gridlines
    let numberOfMainGridlines = calculateMainGridlines(daysBetweenDates);

    // Calculate sub gridlines
    let numberOfSubGridlines = calculateSubGridlines(daysBetweenDates, numberOfMainGridlines);

    // Render gridlines
    renderGridlines(numberOfMainGridlines, numberOfSubGridlines);

    // Update date labels
    let daysBetweenMainGridlines = daysBetweenDates / numberOfMainGridlines
    updateDateLabels(daysBetweenMainGridlines);
  } else {
    // Display error message
    let messageArea = document.querySelector('.section-message')
    // Set text color to red
    document.querySelector('.section-message').style.color = "red"
    messageArea.style.display = "block"
    if (daysBetweenDates < 3 && daysBetweenDates >= 0) {
      messageArea.textContent = "Minimum of three days"
    } else if (daysBetweenDates < 0 || isNaN(daysBetweenDates)) {
      messageArea.textContent = "Error. Please check that the end date is after the start date and that both dates exist"
    } else if (daysBetweenDates > 1095) {
      messageArea.textContent = "Maximum of three years"
    }
  }
}