import Notiflix from 'notiflix';

const delayRef = document.querySelector('input[name=delay]');
const stepRef = document.querySelector('input[name=step]');
const amountRef = document.querySelector('input[name=amount]');
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);



function onSubmitForm(evt) {
  evt.preventDefault();

  let targetDelay = Number(delayRef.value);
  let targetStep = Number(stepRef.value);
  let targetAmount = Number(amountRef.value);

  evt.currentTarget.reset();

  for (let position = 1; position <= targetAmount; position+=1) {
    createPromise(position, targetDelay)
      .then(successfulPromisMessage)
      .catch(failurePromisMessage);

      targetDelay += targetStep
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function failurePromisMessage({ position, delay }) {
  return Notiflix.Notify.failure(
    `❌ Rejected promise ${position} in ${delay} ms`
  );
}

function successfulPromisMessage({ position, delay }) {
  return Notiflix.Notify.success(
    `✅ Fulfilled promise ${position} in ${delay} ms`
  );
} 


