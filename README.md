# D1 Cauldron Clicker

A minimal TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

## Link to Deployed App:

[Deployed app](https://bluzcluez2317.github.io/D1-CMPM121/)

## How to play:

- Click on the cauldron image to get ounces of potion
- Then click the "sell potions" button to get money for your potions
- Once you have enough money, you can buy either a witch helper or a dropper
- A witch helper grants you one more ounce per click and a dropper gets you 0.1 ounces per second.

## How to run or build the project

- Clone this project in VS Code
- Run `deno task setup`
- Run `deno task dev` to play!

## Developer Section

[Upgrade Data](https://github.com/bluzcluez2317/D1-CMPM121/blob/main/src/main.ts#L21-L41)

[Shared purchase loop](https://github.com/bluzcluez2317/D1-CMPM121/blob/main/src/main.ts#L128-L152)

## Sound revision

The fixed sound revision was needed because the bubble sounds wasn't working with the background music so we got rid of the soundPlay() function and added an if statement to make the background music started on the first click and like that the bubble sound was able to be heard along with the background music.
[Fixed sound](https://github.com/bluzcluez2317/D1-CMPM121/commit/7f0484d8b026f16b1853a9bb1c4e81a4586e5399)

## Credits

[Bubble Sound](https://freesound.org/people/ristooooo1/sounds/539823/)

[Background Music](https://freesound.org/people/ViraMiller/sounds/742735/)

[Cauldron Image](https://pngtree.com/freepng/whimsical-halloween-witch-s-cauldron-bubbling-with-magical-potion-and-glowing-orbs_23123521.html)

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
