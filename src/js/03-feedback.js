import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form textarea'),
};
const formData = {};
initPage();

const onFormInput = event => {
  formData[event.target.name] = event.target.value;
  const { name, value } = event.target;
  try {
    let saveData = localStorage.getItem('feedback-form-state');
    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }
    saveData[name] = value;
    const stringifyData = JSON.stringify(saveData);
    localStorage.setItem('feedback-form-state', stringifyData);
  } catch (error) {
    console.log(error);
  }
};
refs.form.addEventListener('input', throttle(onFormInput, 500));
function initPage() {
  const saveData = localStorage.getItem('feedback-form-state');
  if (saveData) {
    try {
      const parseData = JSON.parse(saveData);
      Object.entries(parseData).forEach(([name, value]) => {
        refs.form.elements[name].value = value;
      });
      console.log(parseData);
    } catch (error) {
      console.error(error);
    }
  }
}
refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
}
