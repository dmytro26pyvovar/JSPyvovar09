function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
 const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstDelay = parseInt(document.querySelector('[name="delay"]').value);
  const step = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * step;

     try {
      const result = await createPromise(position, delay);
      console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }
});
  
