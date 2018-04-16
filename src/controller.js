/* import helper functions */
import { isEqual } from './utils';
const utils = require('./utils');

/* import bikers list */
import { bikers } from './bikers';


/* generate table data */
const tableData = data => {
  return data.map((value, index) => {
    return `
      <tr>
        <td>${value.username}</td>
        <td>${value.email}</td>
        <td>${value.city}</td>
        <td>${value.ride}</td>
        <td>${value.days}</td>
        <td>${value.date}</td>
        <td class="delete" id="delete"><a href="#" onclick="deleteUser(${index})"><i class="far fa-trash-alt"></i></a></td>
      </tr>
    `
  }).join('');
}

/* retrieve data from bikers.js and save it to localStorage */
const getBikers = () => {
  if (localStorage.getItem('bikers') === null) {
    /* first time save data */
    localStorage.setItem('bikers', JSON.stringify(bikers));
  }
  const data = JSON.parse(localStorage.getItem('bikers'));
  const output = tableData(data);
  document.getElementById('t-body').innerHTML = output;
}
/* load bikers once the page load */
window.onload = getBikers

/* delete users */
const deleteUser = index => {
  const bikers = JSON.parse(localStorage.getItem('bikers'));
  bikers.splice(index, 1);
  localStorage.setItem('bikers', JSON.stringify(bikers));
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
    if (utils.isEqual(selectedDays, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])) {
      scope['days'] = 'Week days';
    } else {
      scope['days'] = selectedDays;
    }
  } else if (selectedDays.length === 2) {
    if (utils.isEqual(selectedDays, ['Sun', 'Sat'])) {
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

    /* update the bikers */
    const bikersStore = JSON.parse(localStorage.getItem('bikers'));
    bikersStore.push(scope);
    localStorage.setItem('bikers', JSON.stringify(bikersStore));
    const data = JSON.parse(localStorage.getItem('bikers'));
    const output = tableData(data);
    document.getElementById('t-body').innerHTML = output;
  }
  /* reset the form after saved */
  document.getElementById('bikersForm').reset();
});

/* reset the form when cancel is clicked */
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('bikersForm').reset();
});
