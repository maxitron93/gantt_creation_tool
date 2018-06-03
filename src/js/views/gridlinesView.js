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