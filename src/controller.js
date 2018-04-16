/* import helper functions */
import { isEqual } from './utils';

/* import bikers list */
import { bikers } from './bikers';

/* generate table data */
const tableData = data => {
  return data.map((value, index) => {
    const row = document.createElement('tr');
    for (let i=0; i < 7; i++) {
      const cell = document.createElement('td')
      let cellText = ''
      switch (i) {
        case 0:
          cellText = document.createTextNode(`${value.username}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 1:
          cellText = document.createTextNode(`${value.email}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 2:
          cellText = document.createTextNode(`${value.city}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 3:
          cellText = document.createTextNode(`${value.ride}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 4:
          cellText = document.createTextNode(`${value.days}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 5:
          cellText = document.createTextNode(`${value.date}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
          break;
        case 6:
          cellText = document.createTextNode(
            `<td class="delete"><a href="#" id="delete" value="${index}"><i class="far fa-trash-alt"></i></a></td>`
          );
          cell.appendChild(cellText);
          break;
      }
    }
    return row
  })
}

/* retrieve data from bikers.js and save it to localStorage */
const getBikers = () => {
  if (localStorage.getItem('bikers') === null) {
    /* first time save data */
    localStorage.setItem('bikers', JSON.stringify(bikers));
  }
  const data = JSON.parse(localStorage.getItem('bikers'));
  const output = tableData(data);
  console.log(output)
  const tbody = document.getElementsByTagName('tbody')[0];
  tbody.appendChild(output);
  console.log(tbody)
}
/* load bikers once the page load */
window.onload = getBikers

/* Event listener for deleting a user */
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('really really');
//   const deleteId = document.getElementById('delete');
//   if (deleteId) {
//     deleteId.addEventListener('click', () => {
//       console.log('how about now');
//     })
//   }
// })
const deleteUser = index => {
  const bikers = JSON.parse(localStorage.getItem('bikers'));
  bikers.splice(index, 1);
  localStorage.setItem('bikers', JSON.stringify(bikers));

  /* call getBikers */
  getBikers();
}

/*
 * Add eventlistener on the save button
 */
document.getElementById('save').addEventListener('click', () => {
  const scope = {};

  /* get all the input text forms */
  const inputs = document.querySelectorAll('[model]');
  /* loop through all the inputs */
  inputs.forEach(input => {
    if (input.type === 'text' && input.value !== '') {
      scope[input.id] = input.value;
    }
  });

  /* get the checked ride */
  const rides = document.querySelectorAll('input[type="radio"]');
  rides.forEach(ride => {
    if (ride.checked) {
      scope[ride.name] = ride.value;
    }
  });

  /* get the checked days */
  const daysChecked = document.querySelectorAll('input[type="checkbox"]');
  const selectedDays = [];
  daysChecked.forEach(day => {
    if (day.checked) {
      selectedDays.push(day.value);
    }
  });
  if (selectedDays.length === 7) {
    scope['days'] = 'Every day';
  } else if (selectedDays.length === 5) {
    if (isEqual(selectedDays, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])) {
      scope['days'] = 'Week days';
    } else {
      scope['days'] = selectedDays;
    }
  } else if (selectedDays.length === 2) {
    if (isEqual(selectedDays, ['Sun', 'Sat'])) {
      scope['days'] = 'Weekends';
    } else {
      scope['days'] = selectedDays;
    }
  } else {
    if (selectedDays.length > 0) {
      scope['days'] = selectedDays;

    }
  }
  /* check if theres something to make date for */
  if (selectedDays.length > 0) {
    /* get the current Date */
    const today = new Date();
    // const [_, month, day, year, time] = [...today.toString().split(' ')];
    const time = today.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const [month, day, year] = [...today.toLocaleString().split(' ')[0].split('/')];
    const daTe = `${day}/${'0'+month}/${year.replace(',', '')} ${time}`;
    scope['date'] = daTe;
  }
  /* update the bikers */
  const bikersStore = JSON.parse(localStorage.getItem('bikers'));
  bikersStore.push(scope);
  localStorage.setItem('bikers', JSON.stringify(bikersStore));
  const data = JSON.parse(localStorage.getItem('bikers'));
  const output = tableData(data);
  document.getElementById('t-body').innerHTML = output;
  /* reset the form after saved */
  document.getElementById('bikersForm').reset();
});

/* reset the form when cancel is clicked */
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('bikersForm').reset();
});
