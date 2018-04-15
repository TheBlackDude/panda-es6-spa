/* import helper functions */
import { isEqual } from './utils';
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

  /* get the checked ride button */
  const rides = document.querySelectorAll('input[type="radio"]');
  rides.forEach(ride => {
    if (ride.checked) {
      scope[ride.name] = ride.value;
    }
  });

  /* get the checked checkboxes */
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
  console.log(scope);
  /* reset the form after saved */
  document.getElementById('bikersForm').reset();
});

/* reset the form when cancel is clicked */
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('bikersForm').reset();
});
