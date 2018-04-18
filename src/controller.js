/* import helper functions */
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
        <td class="delete"><a onclick="deleteUser(${index})"><i class="far fa-trash-alt"></i></a></td>
      </tr>
    `
  }).join('');
}

/* helper function to get data from localStorage and write it to DOM */
const writeDom = () => {
  const data = JSON.parse(localStorage.getItem('bikers'));
  const output = tableData(data);
  document.getElementById('t-body').innerHTML = output;
}

/* retrieve data from bikers.js and save it to localStorage */
window.addEventListener('load', () => {
  if (localStorage.getItem('bikers') === null) {
    /* first time save data */
    localStorage.setItem('bikers', JSON.stringify(bikers));
  }
  /* write to DOM */
  writeDom();
})

/* delete users */
window.deleteUser = index => {
  const bikers = JSON.parse(localStorage.getItem('bikers'));
  bikers.splice(index, 1);
  localStorage.setItem('bikers', JSON.stringify(bikers));
  /* write to DOM */
  writeDom();
}

/*
 * Add eventlistener on the save button
 */
document.getElementById('save').addEventListener('click', () => {
  let scope = {};

  /* simple mail validation */
  const checkEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  /* get all the input text forms */
  const inputs = document.querySelectorAll('[model]');
  /* create a temp object to hold the input values */
  const temp = {}
  /* loop through all the inputs */
  inputs.forEach(input => {
    if (input.type === 'text' && input.value !== '') {
      temp[input.id] = input.value;
    }
  });
  /* if email is valid then add to scope */
  if (checkEmail(temp.email)) {
    scope = {...temp}
  }

  /* get the checked ride */
  const rides = document.querySelectorAll('input[type="radio"]');
  rides.forEach(ride => {
    if (ride.checked && scope.email) {
      scope[ride.name] = ride.value;
    }
  });

  /* get the checked days */
  const daysChecked = document.querySelectorAll('input[type="checkbox"]');
  const selectedDays = [];
  daysChecked.forEach(day => {
    if (day.checked && scope.ride) {
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
    /* write to DOM */
    writeDom();
  }
  /* reset the form after saved */
  document.getElementById('bikersForm').reset();
});

/* reset the form when cancel is clicked */
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('bikersForm').reset();
});
