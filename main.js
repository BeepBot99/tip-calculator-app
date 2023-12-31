const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".button-container button, .button-container input");
const numberOfPeopleInput = document.getElementById("people");
const tipOutput = document.getElementById("tipAmountPerPerson");
const totalOutput = document.getElementById("totalAmountPerPerson");
const resetButton = document.getElementById("resetButton");
const tips = [5, 10, 15, 25, 50];
let currentTip = 0, activeButton;

function calculateTipAndTotalPerPerson(bill, tip, people) {
  tip = Number(tip);
    return [bill * tip / 100 / people, bill * (tip + 100) / 100 / people];
}
function updateValues() {
    let tipPerPerson = calculateTipAndTotalPerPerson(billInput.value, currentTip, numberOfPeopleInput.value)[0].toFixed(2).toString();
    let totalPerPerson = calculateTipAndTotalPerPerson(billInput.value, currentTip, numberOfPeopleInput.value)[1].toFixed(2).toString();
    console.log(totalPerPerson);
    tipPerPerson = isFinite(tipPerPerson) ? tipPerPerson : "0.00";
    totalPerPerson = isFinite(totalPerPerson) ? totalPerPerson : "0.00";
    tipOutput.innerText = "$" + tipPerPerson;
    totalOutput.innerText = "$" + totalPerPerson;
    if (totalOutput.innerText === "$0.00") {
        resetButton.setAttribute("emptyState", "");
    } else {
        try {resetButton.removeAttribute("emptyState")} catch (e) {};
    }
}
numberOfPeopleInput.addEventListener("keyup", () => {
    updateValues();
});
billInput.addEventListener("keyup", () => {
    updateValues();
});
resetButton.addEventListener("click", () => {
    billInput.value = "";
    numberOfPeopleInput.value = "";
    updateValues();
    resetButton.setAttribute("emptyState", "");
});
tipButtons.forEach(button => {
    if (Array.from(tipButtons).indexOf(button) <= 4) {
        button.addEventListener("click", () => {
            try { activeButton.removeAttribute("selected")} catch (e) {};
            activeButton = button;
            button.setAttribute("selected", "");
            currentTip = tips[Array.from(tipButtons).indexOf(button)];
            tipButtons[5].value = "";
            updateValues();
        });
    } else {
        button.addEventListener("keyup", () => {
            try { activeButton.removeAttribute("selected") } catch (e) { };
            activeButton = undefined;
            currentTip = button.value;
            updateValues();
        })
    }
});