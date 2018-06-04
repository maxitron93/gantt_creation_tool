export const calculateMainGridlines = (daysBetweenDates) => {
  let numberOfMainGridlines = 0

  // Calculates the number of gridlines required
  if (daysBetweenDates % 7 === 0) {
    numberOfMainGridlines = 7;
  } else if(daysBetweenDates % 6 === 0) {
    numberOfMainGridlines = 6;
  } else if(daysBetweenDates % 5 === 0) {
    numberOfMainGridlines = 5;
  } else if(daysBetweenDates % 4 === 0) {
    numberOfMainGridlines = 4;
  } else if (daysBetweenDates % 3 === 0) {
    numberOfMainGridlines = 3;
  } 

  // Calculates the number of gridlines required for all daysBetweenDates that don't return a result from above
  else if ((daysBetweenDates - 1) % 7 === 0) {
    numberOfMainGridlines = 7;
  } else if((daysBetweenDates - 1) % 6 === 0) {
    numberOfMainGridlines = 6;
  } else if((daysBetweenDates - 1) % 5 === 0) {
    numberOfMainGridlines = 5;
  } else if((daysBetweenDates - 1) % 4 === 0) {
    numberOfMainGridlines = 4;
  } else if ((daysBetweenDates - 1) % 3 === 0) {
    numberOfMainGridlines = 3;
  } else if ((daysBetweenDates + 1) % 7 === 0) {
    numberOfMainGridlines = 7;
  } else if((daysBetweenDates + 1) % 6 === 0) {
    numberOfMainGridlines = 6;
  } else if((daysBetweenDates + 1) % 5 === 0) {
    numberOfMainGridlines = 5;
  } else if((daysBetweenDates + 1) % 4 === 0) {
    numberOfMainGridlines = 4;
  } else if ((daysBetweenDates + 1) % 3 === 0) {
    numberOfMainGridlines = 3;
  } else if ((daysBetweenDates - 2) % 7 === 0) {
    numberOfMainGridlines = 7;
  } else if((daysBetweenDates - 2) % 6 === 0) {
    numberOfMainGridlines = 6;
  } else if((daysBetweenDates - 2) % 5 === 0) {
    numberOfMainGridlines = 5;
  } else if((daysBetweenDates - 2) % 4 === 0) {
    numberOfMainGridlines = 4;
  } else if ((daysBetweenDates - 2) % 3 === 0) {
    numberOfMainGridlines = 3;
  } else if ((daysBetweenDates + 2) % 7 === 0) {
    numberOfMainGridlines = 7;
  } else if((daysBetweenDates + 2) % 6 === 0) {
    numberOfMainGridlines = 6;
  } else if((daysBetweenDates + 2) % 5 === 0) {
    numberOfMainGridlines = 5;
  } else if((daysBetweenDates + 2) % 4 === 0) {
    numberOfMainGridlines = 4;
  } else if ((daysBetweenDates + 2) % 3 === 0) {
    numberOfMainGridlines = 3;
  }

  return(numberOfMainGridlines)

}

export const calculateSubGridlines = (daysBetweenDates, numberOfMainGridlines) => {
  let numberOfSubGridlines = 0
  let daysBetweenMainGridlines = Math.round(daysBetweenDates / numberOfMainGridlines)
  
  if (daysBetweenMainGridlines < 2) {
    numberOfSubGridlines = 4
  } 
  
  else if (daysBetweenMainGridlines % 7 === 0) {
    numberOfSubGridlines = 6
  } else if (daysBetweenMainGridlines % 6 === 0) {
    numberOfSubGridlines = 5
  } else if (daysBetweenMainGridlines % 5 === 0) {
    numberOfSubGridlines = 4
  } else if (daysBetweenMainGridlines % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines + 1) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines + 1) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines + 1) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines + 1) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines - 1) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines - 1) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines - 1) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines - 1) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines + 2) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines + 2) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines + 2) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines + 2) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines - 2) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines - 2) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines - 2) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines - 2) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines + 3) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines + 3) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines + 3) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines + 3) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  else if ((daysBetweenMainGridlines - 3) % 7 === 0) {
    numberOfSubGridlines = 6
  } else if ((daysBetweenMainGridlines - 3) % 6 === 0) {
    numberOfSubGridlines = 5
  } else if ((daysBetweenMainGridlines - 3) % 5 === 0) {
    numberOfSubGridlines = 4
  } else if ((daysBetweenMainGridlines - 3) % 4 === 0) {
    numberOfSubGridlines = 3
  }

  return(numberOfSubGridlines)

}