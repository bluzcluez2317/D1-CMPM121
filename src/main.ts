// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/cauldron.png?no-inline";
import bubblesUrl from "./assets/bubbles.wav?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;
app.style.textAlign = "center";

const heading = document.createElement("h1");
heading.textContent = "Cauldron Clicker";

// this will eventually be used for when upgrades are added
const ouncesPerClick = document.createElement("p");
let OPC: number = 1; // update this to let whenever we make the upgrades
ouncesPerClick.textContent = "Ounce per click: " + OPC.toString();

const ouncesPerSecond = document.createElement("p");
let OPS: number = 0; // update this to let whenever we make the upgrades
ouncesPerSecond.textContent = "Ounce per second: " + OPS.toString();

//=============== Image / Cauldron ====================
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

// =========== Sell Button =========================
const sellButton = document.createElement("button");
sellButton.textContent = "Sell potions";
sellButton.type = "button";

// ============= Upgrade Button Ounces Per Click + 1 =====================
const witchHelperUpgrade = document.createElement("button");
witchHelperUpgrade.type = "button";
let initialWitchHelperPrice: number = 100;
witchHelperUpgrade.textContent =
  `Buy a Witch Helper: $${initialWitchHelperPrice} (+1 ounce per click)`;

// ============= Upgrade Button Ounces Per Second +.1 ===================
const dropperUpgrade = document.createElement("button");
dropperUpgrade.type = "button";
let initialdropperUpgradePrice: number = 50;
dropperUpgrade.textContent =
  `Buy a Dropper: $${initialdropperUpgradePrice} (+.1 ounce per second)`;

refreshMoney();
// =========== Timer ===============================
function timer() {
  let last = performance.now();
  setInterval(
    () => {
      const now = performance.now();
      const seconds = (now - last) / 1000;
      last = now;
      counter += OPS * seconds;
      refreshText();
    },
    1000, // in ms
  );
}
timer();

//======================== Functions =====================
function refreshText() {
  counterElement.textContent = counter.toFixed(1) + " oz";
}

function refreshMoney() {
  moneyText.textContent = "Money: $" + money.toFixed(2);
  witchHelperUpgrade.disabled = money < initialWitchHelperPrice;
  dropperUpgrade.disabled = money < initialdropperUpgradePrice;
}

function count() {
  counter += OPC;
}

function sellPotion() {
  money += counter;
  counter = 0;
  refreshText();
  refreshMoney();
}

function soundPlay(url: string): void {
  const audio = new Audio(url);
  audio.play().catch((error) => {
    console.error("Playback Failed", error);
  });
}

//======================== Event Listeners =====================
sellButton.addEventListener("click", () => {
  sellPotion();
});

witchHelperUpgrade.addEventListener("click", () => {
  money -= initialWitchHelperPrice;
  OPC += 1;
  initialWitchHelperPrice = initialWitchHelperPrice * 1.5;
  console.log("OPC " + OPC);
  ouncesPerClick.textContent = "Ounce per click: " + OPC.toString();
  witchHelperUpgrade.textContent =
    `Buy a Witch Helper: $${initialWitchHelperPrice} (+1 ounce per click)`;
  refreshMoney();
});

dropperUpgrade.addEventListener("click", () => {
  money -= initialdropperUpgradePrice;
  OPS += 0.1;
  initialdropperUpgradePrice = initialdropperUpgradePrice * 1.5;
  console.log("OPS " + OPS);
  ouncesPerSecond.textContent = "Ounce per second: " + OPS.toString();
  dropperUpgrade.textContent =
    `Buy a Dropper: $${initialdropperUpgradePrice} (+.1 ounce per second)`;
  refreshMoney();
});

image.addEventListener("click", () => {
  count();
  refreshText();
  soundPlay(bubblesUrl);
  image.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, {
      transform: "scale(1)",
    }],
    { duration: 200 },
  );
});

//======================== Everything on the Page =====================

app.append(
  heading,
  ouncesPerClick,
  ouncesPerSecond,
  image,
  message,
  counterText,
  sellButton,
  moneyText,
  witchHelperUpgrade,
  dropperUpgrade,
);
