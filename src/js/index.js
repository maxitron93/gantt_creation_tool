require('!style-loader!css-loader!../css/style.css')

import { sortable, draggable } from './views/draggable'
import { timelineInteraction, deadlineInteraction } from './views/interact'
import { addTask, addDeadline, deleteRow, increaseRowSpacing, reduceRowSpacing, setRowSpacing, updateColor } from './views/rowsView'
import { toggleMainGridlines, toggleSubGridlines, toggleMainBox, toggleSubBox, renderGridlines, updateDateLabels } from './views/gridlinesView'
import { calculateMainGridlines, calculateSubGridlines } from './models/GridlineModel'
import { module } from './modules'

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


// Get chart from api and load it
const loadChart = async () => {
  // Hide chart area
  document.querySelector('.container-rows').style.display = "none"

  // Show loader
  document.querySelector('.loader').style.display = "block"

  // Define loadObject
  let loadObject = {
    containerWidth: null,
    projectName: "",
    startDate: null,
    endDate: null,
    rowSpacing: null,
    rows: []
  }

  // Get chart name
  let chartName = window.location.href.split("=")[1]
  if (chartName === undefined) {
    chartName = "default"
  }

  // Send request
  let resultJSON =  await fetch(`http://p2pcollective.com/api/get_chart/${chartName}`);
  // Parse results
  let result = await resultJSON.json();

  // Update loadObject with requested information
  loadObject. containerWidth = result.container_width;
  loadObject.projectName = result.project_name;
  loadObject.startDate = result.start_date;
  loadObject.endDate = result.end_date;
  loadObject.rowSpacing = result.row_spacing;
  loadObject.rows = result.rows

  // Remove loader
  document.querySelector('.loader').style.display = "none"

  // Show chart area
  document.querySelector('.container-rows').style.display = "block"

  // Render chart
  let currentContainerWidth = (document.querySelector('.container-rows').offsetWidth - 330)
  // 1. Set project name
  document.querySelector('.project-name').value = loadObject.projectName
  // 2. Set dates
  document.querySelector('.date-field-start').value = formatDate(loadObject.startDate)
  document.querySelector('.date-field-end').value = formatDate(loadObject.endDate)

  // 3. Remove old rows
  let rowsArray = Array.from(document.querySelectorAll('.row'))
  rowsArray.forEach((current) => {
    current.parentNode.removeChild(current)
  })
  
  // 4. Render rows
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
    try {
      // Disable the save button
      document.querySelector('.btn-save').style.display = "none";

      // Define saveObject
      let saveObject = {
        module: module,
        containerWidth: null,
        projectName: "",
        startDate: null,
        endDate: null,
        rowSpacing: null,
        rows: []
      }
      
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

      // Hide the chart area
      document.querySelector('.container-rows').style.display = "none"

      // Show loader
      document.querySelector('.loader').style.display = "block"

      // Display saving message
      document.querySelector('.section-message').style.display = "block"
      document.querySelector('.section-message').style.color = "green"
      document.querySelector('.section-message').textContent = "Saving your chart..."

      // Open connection with API
      const xhr = new XMLHttpRequest();
      await xhr.open("POST", "http://p2pcollective.com/api/save_chart");

      // Send saveObject to API
      await xhr.setRequestHeader("Content-Type", "application/json");
      await xhr.send(JSON.stringify(saveObject));
      console.log(saveObject)

      // Await send data
      let saveReturn
      xhr.onload = function() {
        // Hide loader
        document.querySelector('.loader').style.display = "none"
        
        // Show the chart area
        document.querySelector('.container-rows').style.display = "block"

        // Display success message
        saveReturn = JSON.parse(this.responseText)
        console.log(saveReturn)
        document.querySelector('.section-message').style.color = "green"
        document.querySelector('.section-message').innerHTML = `<p>Your chart has been saved. To return to your chart, follow this link:
        </br>
        </br>
        plan.maximerrillees.com/?chart=${saveReturn.chart_key}
        </br>
        </br>
        PLEASE COPY-PASTE THAT LINK. THIS MESSAGE WILL DISSAPEAR IN 60 SECONDS.</p>
        `
        setTimeout(() => {
          document.querySelector('.section-message').style.display = "none"
          document.querySelector('.btn-save').style.display = "block";
        }, 60000)
      }
    } catch(error) {
      // Show the chart area
      document.querySelector('.container-rows').style.display = "block"

      // Display error message
      document.querySelector('.section-message').style.display = "block"
      document.querySelector('.section-message').style.color = "red"
      document.querySelector('.section-message').textContent = "Something went wrong. Your chart did not save. This message will dissapear in 30 seconds."
      setTimeout(() => {
        document.querySelector('.section-message').style.display = "none"
        document.querySelector('.btn-save').style.display = "block";
      }, 30000)
    }
        
  }
  
  // Event listener for adding a deadline row
  else if (document.querySelector('.button-deadline').contains(event.target)) {
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

  // This needs tobe here or text on the page can't be highlighted
  else {
    console.log("no event")
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