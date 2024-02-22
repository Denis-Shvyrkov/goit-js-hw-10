import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formField = document.querySelector('.form');

formField.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const state = e.target.elements.state.value;
  const delay = e.target.elements.delay.value;

  formField.reset();

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(`❌ Rejected promise in ${delay}ms`);
      }, delay);
    }
  });
  promise
    .then(message => {
      iziToast.show({
        message,
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        progressBar: false,
        close: false,
      });
    })
    .catch(message => {
      iziToast.error({
        message,
        position: 'topRight',
        backgroundColor: 'light red',
        messageColor: 'white',
        icon: '',
        progressBar: false,
        close: false,
      });
    });
}
