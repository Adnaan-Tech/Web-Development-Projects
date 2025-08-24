// Frankfurter API is used in this project

// Selecting dropdown
const dropdowns = document.querySelectorAll(".dropdown select");

// Selecting the button of the form 'get exchange rate' and making the changes that should happen when we click on it
const btn = document.querySelector("form button");

// Below we make two objects to access from and to currency
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Below we make object so we can access final message
const msg = document.querySelector(".msg");

// Fetch supported currencies dynamically
const getSupportedCurrencies = async () => {
  try {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json(); // returns object { "USD": "US Dollar", ... }

    // Making sure all the countries appear in the options list
    for (let select of dropdowns) {
      select.innerHTML = ""; // clear existing options
      for (let currCode in data) {
        //Only including currencies present in countryList (from codes.js)
        if (!countryList[currCode]) continue;

        let newOption = document.createElement("option");
        newOption.innerText = currCode;  // Only show currency code
        newOption.value = currCode;      // value is just the code (USD, INR, etc.)

        // Default selection. Meaning USD on one side and INR on the other.
        if (select.name === "from" && currCode === "USD") {
          newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
          newOption.selected = "selected";
        }
        select.appendChild(newOption);
      }

      // Change event for updating flag and rate
      select.addEventListener("change", (evt) => {
        updateFlag(evt.target);   
        updateExchangeRate();     // auto update rate when dropdown changes
      });
    }

    // Update flags after populating dropdowns
    updateFlag(fromCurr);
    updateFlag(toCurr);

  } catch (err) {
    console.error("Failed to fetch supported currencies:", err);
  }
};

//Below we are making the function so exchange rate can be updated
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value) || 1; // ensure numeric
  if (amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const fromCurrency = fromCurr.value; // currency code like USD
  const toCurrency = toCurr.value;     // currency code like INR

  // Using free API Frankfurter
  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurrency}&to=${toCurrency}`;

  let response = await fetch(URL); // Fetch API data
  let data = await response.json();

  // Directly assign result since it will always exist
  let finalAmount = data.rates[toCurrency];
  msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
};

// Below we are making the function for flag being changed according to the currency rate we choose in option
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // this comes from codes.js
  let img = element.parentElement.querySelector("img"); 
  if (countryCode && img) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`; 
  } else if (img) {
    img.src = ""; // no flag if not in countryList
  }
};

// Now when we click on change rate, we want the rate to change
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); 
  updateExchangeRate();
});

// Update exchange rate and flags on page load
window.addEventListener("load", () => {
  getSupportedCurrencies().then(updateExchangeRate);
});
