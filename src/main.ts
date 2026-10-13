// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/cauldron.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;
app.style.textAlign = "center";

const heading = document.createElement("h1");
heading.textContent = "Cauldron Clicker";

// this will eventually be used for when upgrades are added
const clicksPerSecond = document.createElement("p");
let CPS: number = 1; // update this to let whenever we make the upgrades
clicksPerSecond.textContent = "Ounce per second: " + CPS.toString();

//=============== Image ====================
const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A cauldron with pink bubbles.";
image.width = 400;
image.height = 400;

const message = document.createElement("h3");
message.textContent = "Click on the Cauldron to make potions!";

// ============= Potion Text and Info =============================================
// Counts the amount of times the image has been clicked
let counter: number = 0;
const counterText = document.createElement("p");
counterText.textContent = "Ounces of potion: ";
const counterElement = document.createElement("span");
counterText.appendChild(counterElement); // puts counter element number on the page
refreshText();

// ========= Money ============================
let money: number = 0;
const moneyText = document.createElement("p");
refreshMoney();

// =========== Sell Button =========================
const sellButton = document.createElement("button");
sellButton.textContent = "Sell potions";
sellButton.type = "button";

function timer() {
  let last = performance.now();
  setInterval(
    () => {
      const now = performance.now();
      const seconds = (now - last) / 1000;
      last = now;
      counter += CPS * seconds;
      refreshText();
    },
    100,
  );
}
timer();

function refreshText() {
  counterElement.textContent = counter.toFixed(1) + " oz";
}

function refreshMoney() {
  moneyText.textContent = "Money: $" + money.toFixed(2);
}

function count() {
  counter++;
}

function sellPotion() {
  money += counter;
  counter = 0;
  refreshText();
  refreshMoney();
}

sellButton.addEventListener("click", () => {
  sellPotion();
});

image.addEventListener("click", () => {
  count();
  refreshText();
  image.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, {
      transform: "scale(1)",
    }],
    { duration: 200 },
  );
});
app.append(
  heading,
  clicksPerSecond,
  image,
  message,
  counterText,
  moneyText,
  sellButton,
);
