# Vidmob Calculator

Hello to whomever is reviewing this project! If you have any questions, feel free to reach out to me via my email at kmjanssen1@gmail.com. Otherise, have a good day!

This project is a calculator that supports...

- the +, -, \*, and / operations
- positive, negative, and decimal numbers
- parentheses with multiple levels

## Before Using

Please make sure you have the following installed:

- Node.js
  - Visit https://nodejs.org/en/ to install
- npm package manager
- Angular CLI
  - This can be installed by running the following command `npm install -g @angular/cli`

## Usage

### Running The Project

1. To start the project, navigate to the root directory of the cloned calculator repo .../calculator in command line
2. Run the `ng serve` command
3. This will spin up the local instance, which can be accessing by going to http://localhost:4200/ in your browser of choice
4. After navigating to http://localhost:4200/, you should see the calculator user interface with an input for equations, and a calculate and reset button.

### Using the Calculator

To evaluate your equation:

1. Enter your equation into the input box
2. Click the Calculate button
3. The result will be displayed below the Calculate and Reset buttons

### Assumptions

1. The longest equation that is supported is 255 characters. I received this guidance from Christopher Warren
2. The equation output will not exceed the maximum & minimum supported integers in JavaScript (9007199254740991 & -9007199254740991)
3. Having numbers next to parentheses does not qualify as a multiplication operation
  - For example, `3(4)` will not multiply 3 times 4. It will instead be considered invalid syntax
  - An example of an equivalent operation with valid syntax would be `3*(4)`

#### Testing

If you want to look at just the units tests by themselves, you can run the `ng test` command inside the root directory. This will run the tests and launch a browser window that will display the output.
