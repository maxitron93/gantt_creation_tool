// Toggles main gridlines on and off
export const toggleMainGridlines = () => {
  // Toggles the borders of .major-gridline on and off
  let gridlinesArray = Array.from(document.querySelectorAll('.major-gridline'));
  gridlinesArray.forEach((current, index, array) => {
    let currentStyle = current.style.borderRight
    if (currentStyle === "1px solid transparent") {
      current.style.borderRight="1px solid #4F4F4F"
    } else {
      current.style.borderRight="1px solid transparent"
    }   
  })

  // Toggles the borders of .spacing on and off
  let element = document.querySelector('.spacing')
  let currentStyleElement = element.style.borderRight
  if (currentStyleElement === "1px solid transparent") {
    element.style.borderRight="1px solid #4F4F4F"
  } else {
    element.style.borderRight="1px solid transparent"
  }   
}

export const toggleMainBox = () => {
  let element = document.querySelector('.btn-main-gridlines') 
  if (element.name === "square-outline") {
    element.name="checkbox"
  } else {
    element.name="square-outline"
  }
}

// Toggles sub gridlines on and off
export const toggleSubGridlines = () => {
  // Toggles the borders of .minor-gridline on and off
  let gridlinesArray = Array.from(document.querySelectorAll('.minor-gridline'));
  gridlinesArray.forEach((current, index, array) => {
    let currentStyle = current.style.borderRight
    if (currentStyle === "1px solid transparent") {
      current.style.borderRight="1px solid rgb(209, 209, 209)"
    } else {
      current.style.borderRight="1px solid transparent"
    }   
  })
}

export const toggleSubBox = () => {
  let element = document.querySelector('.btn-sub-gridlines') 
  if (element.name === "square-outline") {
    element.name="checkbox"
  } else {
    element.name="square-outline"
  }
}






export const renderGridlines = (numberOfMainGridlines, numberOfSubGridlines) => {

  // Delete all sub gridlines
  let subGrildinesArray = Array.from(document.querySelectorAll('.sub-gridline'))
  subGrildinesArray.forEach((current) => {
    current.parentElement.removeChild(current)
  }) 

  // Delete all main gridlines
  let mainGrildinesArray = Array.from(document.querySelectorAll('.main-gridline'))
  mainGrildinesArray.forEach((current) => {
    current.parentElement.removeChild(current)
  })

  // Calculate main gridline width
  let mainGridlineWidth = (Math.floor((100 / numberOfMainGridlines) * 1000)) / 1000

  // Calculate sub gridline width
  let subGridlineWidth = (Math.floor((100 / (numberOfSubGridlines + 1)) * 1000)) / 1000

  // Render new main gridlines
  for(let i = 0; i < numberOfMainGridlines; i++) {
    let mainGridlineMarkup = `
    <div class="main-gridline" style="width: ${mainGridlineWidth}%;"></div>
    `
    document.querySelector('.gridlines-inner').insertAdjacentHTML('afterbegin', mainGridlineMarkup)

    // Render new sub gridlines
    for(let i = 0; i < numberOfSubGridlines; i++) {
      let subGridlineMarkup = `
      <div class="sub-gridline" style="width: ${subGridlineWidth}%;"></div>
      `
      document.querySelector('.main-gridline').insertAdjacentHTML('beforeend', subGridlineMarkup)
    }

    // Render new date labels
    let dateMarkup = `
    <div class="label-date">asd</div>
    `
    document.querySelector('.main-gridline').insertAdjacentHTML('beforeend', dateMarkup)
  }
}

export const updateDateLabels = (daysBetweenMajorGridlines) => {
  let dateLabelArray = Array.from(document.querySelectorAll('.label-date'))
  dateLabelArray.forEach((current, index, array) => {
    
    // Remove existing text
    current.textContent = ""
    
    // Update the first label
    if (index === 0) {
      let startDate = new Date(document.querySelector('.date-field-start').value)
      current.textContent = startDate.toString().split(" ").slice(1, 4).join(" ")
      // current.textContent = startDate
    }
    
    // Update the last label
    else if (index === (array.length - 1)) {
      let endDate = new Date(document.querySelector('.date-field-end').value)
      current.textContent = endDate.toString().split(" ").slice(1, 4).join(" ")
    }

    // Update other labels
    else {
      let startDateInMS = Date.parse(new Date(document.querySelector('.date-field-start').value))
      let dateInMS = startDateInMS + (daysBetweenMajorGridlines * (1000*60*60*24) * index)
      let dateAsString = new Date(dateInMS).toString()
      current.textContent = dateAsString.split(" ").slice(1, 4).join(" ")
    }
  })
}

