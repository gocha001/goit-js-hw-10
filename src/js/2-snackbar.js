import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const radioChecked = form.elements.state.value;

  createPromise(delay, radioChecked)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        transitionIn: 'bounceInDown',
      });
    })

    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        transitionIn: 'bounceInDown',
      });
    });

  form.reset();
}

function createPromise(delay, radioChecked) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioChecked === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
