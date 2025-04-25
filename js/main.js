
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll(
    '.step-1, .step-2, .step-3, .step-4'
  );
  const circles = document.querySelectorAll('.get-started-section .circle');
  const sideSteps = document.querySelectorAll('.get-started-section .steps');
  const lines = document.querySelectorAll('.virtical-line');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  let currentStep = 1;

  // function that update ui
  function updateUI() {
    // hide&show steps
    steps.forEach((step, i) => {
      step.style.display = i + 1 === currentStep ? 'block' : 'none';
    });

    // update side content styles
    sideSteps.forEach((step, i) => {
      step.classList.remove('active', 'done'); 
      if (i + 1 < currentStep) {
        step.classList.add('done');
      } else if (i + 1 === currentStep) {
        step.classList.add('active');
      }
    });

    // line before current step  is white.
    lines.forEach((line, i) => {
      line.classList.remove('active');
      if (i < currentStep - 1) {
        line.classList.add('active');
      } else if (i === currentStep - 1) {
        line.classList.add('active');
      }
    });

    circles.forEach((circle, i) => {
      circle.classList.remove('active', 'done');
      if (i < currentStep - 1) {
        circle.classList.add('done');
      } else if (i === currentStep - 1) {
        circle.classList.add('active');
      }
    });

    prevButton.classList.toggle('visible', currentStep > 1);
    nextButton.style.display =
      currentStep === steps.length ? 'none' : 'inline-block';
  }

  function isStepValid() {
    return true; 
  }

  nextButton.addEventListener('click', () => {
    if (isStepValid() && currentStep < steps.length) {
      currentStep++;
      updateUI();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  });

  // password toggle
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
  const eyeIcon = document.querySelector('#eyeIcon');
  const eyeSlashIcon = document.querySelector('#eyeSlashIcon');

  function updateIconState() {
    if (password.value.length > 0) {
      togglePassword.classList.remove('disabled-icon');
    } else {
      togglePassword.classList.add('disabled-icon');
 
      if (password.getAttribute('type') === 'text') {
        password.setAttribute('type', 'password');
        eyeIcon.classList.remove('d-none');
        eyeSlashIcon.classList.add('d-none');
      }
    }
  }
  password.addEventListener('input', updateIconState);

  updateIconState();

  togglePassword.addEventListener('click', () => {
    // Only toggle if icon is enabled
    if (togglePassword.classList.contains('disabled-icon')) return;

    const isPassword = password.getAttribute('type') === 'password';

    password.setAttribute('type', isPassword ? 'text' : 'password');
    eyeIcon.classList.toggle('d-none');
    eyeSlashIcon.classList.toggle('d-none');
  });

  // button Option of Step 3
  document.querySelectorAll('.btn-option').forEach(button => {
    button.addEventListener('click', () => {
      document
        .querySelectorAll('.btn-option')
        .forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      document.getElementById('selectedOption').value = button.dataset.value;
    });
  });
  updateUI();
});
