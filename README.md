# iOS Calculator Clone
![Screenshot 2024-01-03 at 3 15 17 AM](https://github.com/andrewpols/iOS-calculator-project/assets/139817202/39dd4d77-0ca3-42ec-a19b-d29e58bb04cc)

## Background
- This program utilizes JavaScript along with HTML & CSS to provide a calculator capable of high-level decimal precision.
- The calculator achieves decimal precision through a library called [decimal.js](https://github.com/MikeMcl/decimal.js).
- The program is run non-locally with the help of JSON files built through [Node.js](https://github.com/nodejs/node).
- The original source code can be found in the index.html, main.js, and styles.cs files in the root directory.

## GitHub Pages
- [Try the calculator here!](https://andrewpols.github.io/iOS-calculator-project/)
- NOTE: The .nojekyll file is imperative if run through GitHub pages, as jekyll will ignore the node_modules folder otherwise. If Google or any browser ignores the node_modules folder, simply turn the setting off or else the calculator will not function.

## How to Use
- Simply use the operators/numbers on screen via mouse or keyboard to input calculations.
- Special Characters (keyboard): equals is '='; clear is 'C' (SHIFT + c); negative sign is '_' (SHIFT + -).
- Options to view history or copy answers are also available.

## Functionality
- The calculator works on a first-calculated first output basis.
- This means that if something can be calculated first, **it will**.
- For example, after typing 4 * 3 + ..., the calculator will automatically output 12 and await the next input (ie. 12 + ...).
- This should not happen if a calculation follows the order of operations (ie. 12 + 3 * ... will await the next input).
- If a situation occurs where repetitive multiplicity/division occurs, the calculation will continue to update (ex: 2 + 3 * 2 * --> 2 + 6 * ...).
