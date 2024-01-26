import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const inputDelay = parseInt(formEl.elements.delay.value);
  const inputState = formEl.elements.state.value;

  createTimedPromise(inputDelay, inputState)
    .then(value => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight',
      });
    });
}

function createTimedPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}