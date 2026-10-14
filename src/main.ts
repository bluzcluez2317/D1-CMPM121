// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/cauldron.png?no-inline";
import bubblesUrl from "./assets/bubbles.wav?no-inline";
import bgMusic from "./assets/BG.wav?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;
app.style.textAlign = "center";

const heading = document.createElement("h1");
heading.textContent = "Cauldron Clicker";

//=============== Image / Cauldron ====================
const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A cauldron with pink bubbles.";
image.width = 400;
image.height = 400;

interface upgrade {
  buttontext: string;
  price: number;
  newopc: number;
  newops: number;
  numbought: number;
}

const upgrades: upgrade[] = [{
  buttontext: "Buy a Witch Helper: $",
  price: 100,
  newopc: 1,
  newops: 0,
  numbought: 0,
}, {
  buttontext: "Buy a Dropper: $",
  price: 50,
  newopc: 0,
  newops: 0.1,
  numbought: 0,
}];

const buttons: HTMLButtonElement[] = [];

// this will eventually be used for when upgrades are added
const ouncesPerClick = document.createElement("p");
let opc: number = 1; // update this to let whenever we make the upgrades
ouncesPerClick.textContent = "Ounce per click: " + opc.toString();

const ouncesPerSecond = document.createElement("p");
let ops: number = 0; // update this to let whenever we make the upgrades
ouncesPerSecond.textContent = "Ounce per second: " + ops.toString();

// ============= Potion Text and Info =============================================
// Counts the amount of times the image has been clicked
let counter: number = 0;
const counterText = document.createElement("p");
counterText.textContent = "Ounces of potion: ";
const counterElement = document.createElement("span");
counterText.appendChild(counterElement); // puts counter element number on the page

// ========= Money ============================
let money: number = 0;
const moneyText = document.createElement("p");

// =========== Sell Button =========================
const sellButton = document.createElement("button");
sellButton.textContent = "Sell potions";
sellButton.type = "button";

const audio: HTMLAudioElement = new Audio("./assets/BG.wav");
audio.loop = true;
audio.volume = .1;
soundPlay(bgMusic);

const message = document.createElement("h3");
message.textContent = "Click on the Cauldron to make potions!";

app.append(
  heading,
  ouncesPerClick,
  ouncesPerSecond,
  image,
  message,
  counterText,
  sellButton,
  moneyText,
  // witchHelperUpgrade,
  // dropperUpgrade,
);

function refreshText() {
  counterElement.textContent = counter.toFixed(1) + " oz";
  moneyText.textContent = "Money: $" + money.toFixed(2);
  ouncesPerSecond.textContent = "Ounce per second: " + ops.toString();
  ouncesPerClick.textContent = "Ounce per click: " + opc.toString();
}

function soundPlay(url: string): void {
  const audio = new Audio(url);
  audio.play().catch((error) => {
    console.error("Playback Failed", error);
  });
}

sellButton.addEventListener("click", () => {
  money += counter;
  counter = 0;
  refreshText();
});

image.addEventListener("click", () => {
  counter += opc;
  refreshText();
  soundPlay(bubblesUrl);
  image.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, {
      transform: "scale(1)",
    }],
    { duration: 200 },
  );
});

for (let i = 0; i < upgrades.length; i++) {
  const newButton = document.createElement("button");
  newButton.innerText = upgrades[i].buttontext +
    upgrades[i].price.toString() + " ";
  newButton.disabled = true;
  app.append(newButton, document.createElement("br"));
  buttons.push(newButton);

  newButton.addEventListener("click", () => {
    if (money >= upgrades[i].price) {
      money -= upgrades[i].price;
      upgrades[i].price += upgrades[i].price / 5;
      upgrades[i].numbought += 1;

      newButton.innerText = upgrades[i].buttontext + "(" +
        upgrades[i].price.toFixed(1).toString() + ")";

      ops += upgrades[i].newops; // maybe a future error
      opc += upgrades[i].newopc;

      refreshText();
    }
  });
}

// =========== Timer ===============================
function timer() {
  let last = performance.now();
  setInterval(
    () => {
      const now = performance.now();
      const seconds = (now - last) / 1000;
      last = now;
      counter += ops * seconds;
      refreshText();
      for (let i = 0; i < buttons.length; i++) {
        if (money < upgrades[i].price) {
          buttons[i].disabled = true;
        } else {
          buttons[i].disabled = false;
        }
      }
    },
    1000, // in ms
  );
}
timer();
