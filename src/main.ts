// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/cauldron.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;
app.style.textAlign = "center";

const heading = document.createElement("h1");
heading.textContent = "Cauldron Clicker";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A cauldron with pink bubbles.";
image.width = 500;
image.height = 500;

const message = document.createElement("p");
message.textContent = "Click on the Cauldron to make potions!";

// Counts the amount of times the image has been clicked
let counter: number = 0;
const counterText = document.createElement("p");
counterText.textContent = "Ounces of potion: ";
const counterElement = document.createElement("span");
counterText.appendChild(counterElement); // puts counter element number on the page
refreshText();

// how to add buttons VVVVVVV
// const button = document.createElement("button");
// button.textContent = "Testing";
// button.type = "button";

function refreshText() {
  counterElement.textContent = counter.toString() + " oz";
}

function count() {
  counter++;
}

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
app.append(heading, image, message, counterText);
