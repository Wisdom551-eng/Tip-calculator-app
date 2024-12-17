const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-buttons button');
const customTipInput = document.getElementById('custom-tip');
const tipAmountSpan = document.getElementById('tip-amount');
const totalAmountSpan = document.getElementById('total-amount');
const resetButton = document.getElementById('reset');
const errorMessage = document.getElementById('error-message');

let tipPercentage = 0;

// Function to calculate tip and total
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (isNaN(bill) || isNaN(people) || people <= 0 || tipPercentage <= 0) {
    errorMessage.textContent = people <= 0 ? "Number of people must be greater than 0." : "";
    tipAmountSpan.textContent = `$0.00`;
    totalAmountSpan.textContent = `$0.00`;
    return;
  }

  const tipAmount = (bill * tipPercentage) / 100 / people;
  const totalAmount = (bill + (bill * tipPercentage) / 100) / people;

  tipAmountSpan.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountSpan.textContent = `$${totalAmount.toFixed(2)}`;
}

// Add event listeners to tip buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    tipPercentage = parseFloat(button.dataset.tip) || 0;
    calculateTip();
  });
});

// Add event listener to custom tip input
customTipInput.addEventListener('input', () => {
  tipButtons.forEach(btn => btn.classList.remove('active'));
  tipPercentage = parseFloat(customTipInput.value) || 0;
  calculateTip();
});

// Add event listeners to inputs
billInput.addEventListener('input', calculateTip);
peopleInput.addEventListener('input', () => {
  const people = parseInt(peopleInput.value);
  if (people <= 0) {
    errorMessage.textContent = "Number of people must be greater than 0.";
  } else {
    errorMessage.textContent = "";
  }
  calculateTip();
});

// Reset all inputs and results
resetButton.addEventListener('click', () => {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  tipButtons.forEach(btn => btn.classList.remove('active'));
  tipPercentage = 0;
  tipAmountSpan.textContent = `$0.00`;
  totalAmountSpan.textContent = `$0.00`;
  errorMessage.textContent = '';
});