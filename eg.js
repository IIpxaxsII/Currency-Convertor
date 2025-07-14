const BASE_URL = "https://api.frankfurter.app/latest?amount=1&from=";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");
 let finalAmt = 0;

for (let select of dropdowns) {
  for (currCode in countryList) {
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
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  

  let amtVal = amount.value;
  let amtVal2 = toCurr.value
  console.log(amtVal);
  if (amtVal === "" || amtVal < 0) {
    amtVal = 0;
    amount.value = "Invalid!";
    msg.innerText = "Error";

  }

    //console.log(fromCurr.value,toCurr.value)
    let v1 = fromCurr.value;
    let v2 = toCurr.value;
    console.log(v1, v2);
    const URL = `${BASE_URL}${v1}&to=${v2}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[v2];
    console.log(rate);
    console.log(amount.value);
    
        let finalAmt = amount.value * rate;

        msg.innerText = `${amtVal} ${v1} = ${finalAmt} ${v2}`;
    
})


// let fromCurr = "usd";
// let toCurr = "inr"
//https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
