import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input'),
  messageInput: document.querySelector('.feedback-form textarea'),
};

let formData = {};
const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

refs.form.addEventListener('input', throttle(onInputChange, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!refs.emailInput.value || !refs.messageInput.value) {
    alert('Unable to submit your feedback. Please fill all the fields!');
    return;
  }
  console.log(`Email: ${formData.email}`);
  console.log(`Message: ${formData.message}`);
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function populateFormData() {
  if (savedFormData) {
    const { email, message } = savedFormData;
    refs.emailInput.value = email;
    refs.messageInput.value = message;
    formData.email = email;
    formData.message = message;
  }
}

populateFormData();
