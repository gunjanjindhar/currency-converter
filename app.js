const BASE_URL = "https://api.frankfurter.app";

const supportedCurrencies = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];

const filteredCountryList = {};

for (let code in countryList) {
  if (supportedCurrencies.includes(code)) {
    filteredCountryList[code] = countryList[code];
  }
}

const dropdownS = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdownS) {
  for (currCode in filteredCountryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = filteredCountryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amt = document.querySelector(".amount input");
  let amtValue = Number(amt.value);
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amt.value = "1";
  }

  if (fromCurr.value === toCurr.value) {
    alert("Please select two different currencies to convert.");
    return;
  }

  const URL = `${BASE_URL}/latest?amount=${amtValue}&from=${fromCurr.value}&to=${toCurr.value}`;

  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);

  let finalAmount = data.rates[toCurr.value];

  msg.innerText = `${amtValue}  ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
};
