const loginPanel = document.querySelector('.login-panel');
const registerPanel = document.querySelector('.register-panel');
const toggleRight = document.querySelector('.toggle-panel-right');
const toggleLeft = document.querySelector('.toggle-panel-left');

const toggleToRegisterBtn = document.getElementById('toggle-to-register');
const toggleToLoginBtn = document.getElementById('toggle-to-login');

const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get("view");

if (view === "register") {
  loginPanel.classList.remove('slide-in-left', 'active');
  loginPanel.classList.add('slide-out-left');

  registerPanel.classList.remove('slide-out-right');
  registerPanel.classList.add('slide-in-right', 'active');

  toggleRight.classList.remove('active');
  toggleLeft.classList.add('active');
} else {
  registerPanel.classList.remove('slide-in-right', 'active');
  registerPanel.classList.add('slide-out-right');

  loginPanel.classList.remove('slide-out-left');
  loginPanel.classList.add('slide-in-left', 'active');

  toggleLeft.classList.remove('active');
  toggleRight.classList.add('active');
}

toggleToRegisterBtn.addEventListener('click', () => {
  loginPanel.classList.remove('slide-in-left', 'active');
  loginPanel.classList.add('slide-out-left');

  registerPanel.classList.remove('slide-out-right');
  registerPanel.classList.add('slide-in-right', 'active');

  toggleRight.classList.remove('active');
  toggleLeft.classList.add('active');
});

toggleToLoginBtn.addEventListener('click', () => {
  registerPanel.classList.remove('slide-in-right', 'active');
  registerPanel.classList.add('slide-out-right');

  loginPanel.classList.remove('slide-out-left');
  loginPanel.classList.add('slide-in-left', 'active');

  toggleLeft.classList.remove('active');
  toggleRight.classList.add('active');
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
  window.location.href = "index.html";
});

document.querySelector(".forgot").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("recoveryModal").style.display = "block";
});

document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("recoveryModal").style.display = "none";
});

window.onclick = function (e) {
  if (e.target == document.getElementById("recoveryModal")) {
    document.getElementById("recoveryModal").style.display = "none";
  }
};

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = registerForm.querySelectorAll("input, select");
  let allFilled = true;

  inputs.forEach((input) => {
    if (!input.value.trim() || (input.tagName === "SELECT" && input.selectedIndex === 0)) {
      allFilled = false;
    }
  });

  const password = registerForm.querySelector("input[placeholder='Password']").value;
  const confirmPassword = registerForm.querySelector("input[placeholder='Confirm Password']").value;

  if (!allFilled) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  toggleToLoginBtn.click();
});
