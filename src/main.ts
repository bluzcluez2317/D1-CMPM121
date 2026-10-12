// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

// Counts the amount of times the image has been clicked
let counter: number = 0;
const counterText = document.createElement("p");
counterText.textContent = "Counter: ";
const counterElement = document.createElement("span");
counterElement.textContent = counter.toString();
counterText.appendChild(counterElement); // puts counter element number into the
app.append(heading, image, message, counterText);

image.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  //console.log("Counter: " + counter);
});
