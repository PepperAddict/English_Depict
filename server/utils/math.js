//Cashier script thanks to Brent. Altered a bit.
let cost_dollars, cost_cents, customer_dollars = 0.00;
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const {names, things} = require('./lists')


const checkAnswer = (num) => {

  const together = parseFloat(`${cost_dollars}.${cost_cents}`);
  const paid = parseFloat(`${customer_dollars}.00`);
  const minusEach = parseFloat(paid - together).toFixed(2);
  const calculateEach = minusEach - num
    let message;
  if (calculateEach == 0) {
    message = "great job. You got the correct answer!"
  } else {
      message = "please try again"
  }
  console.log(message)
}

const main = (mode) => {
  easy = mode;
  console.log(sayProblem());
  rl.question("what is your answer?", (num) => {
    checkAnswer(num);
    rl.close();
  });
}

const getRandomNum = (num) => {
  return Math.floor(Math.random() * num);
}

const setupProblem = (mode = true) => {
  let customer_scenario;
  let isCentsZero;

  customer_scenario = getRandomNum(4);
  switch (customer_scenario) {
    case 1:
      customer_dollars = 5;
      break;
    case 2:
      customer_dollars = 10;
      break;
    case 3:
      customer_dollars = 20;
      break;
    case 4:
        customer_dollars = 50;
        break;
    default:
      return;
  }

  cost_dollars = getRandomNum(customer_dollars + 1); // returns 0 to $

  if (mode) {
    cost_cents = 000;
  } else {
    cost_cents = getRandomNum(100);
  }

  //adjust in case the cost is too close
  if (mode) {
      (cost_dollars == 0) && cost_dollars++
  }
  if (cost_dollars == customer_dollars) {
    cost_dollars -= 1;
  }

  change_dollars = customer_dollars - cost_dollars;
  change_dollars -= 1;
  change_cents = 100 - cost_cents;
  return 0;
}

const sayProblem = (mode = true) => {
  // const randomName = names[Math.floor(Math.random() * names.length)];
  const randomName2 = names[Math.floor(Math.random() * names.length)];
  const easyFirst = Math.floor((Math.random()*50) + 1);
  const theObject = things[Math.floor(Math.random() * things.length)];
  const easySecond = Math.floor((Math.random() * 10) + 1)


  setupProblem(mode);
  const randomName = names[Math.floor(Math.random() * names.length)];

  const cashier = `The cashier says: "Your total is ${cost_dollars} dollars and ${cost_cents} cents."`;
  const customer = `${randomName} pays with a ${customer_dollars} dollar bill.`;
  const changeQuestion = `How much change should the cashier give back to ${randomName}?`; 
  const totalDollars = parseFloat(cost_dollars + '.' + cost_cents);
  const convertCustomerToCents = parseFloat(customer_dollars);
  const answer = convertCustomerToCents - totalDollars;
  const problem = {question: `${cashier} ${customer} ${changeQuestion}`,
                  numbers: `${convertCustomerToCents.toFixed(2)} - ${totalDollars} = ${answer.toFixed(2)}`,
                  answer: answer.toFixed( 2 ),
                
                  simpleSubtraction: `${randomName} has ${easyFirst} ${theObject}. ${randomName} sells ${easySecond}. How many ${theObject} does she have left?`,
                  simpleSubtractionNumber: `${easyFirst} - ${easySecond} = ${parseInt(easyFirst - easySecond)}`,
                  simpleSubtractionAnswer: parseInt(easyFirst - easySecond),

                  simpleAddition: `${randomName} has ${easyFirst} ${theObject}. ${randomName2} gives ${randomName} ${easySecond} ${theObject}. How many ${theObject} does ${randomName} have in all?`
                };

  return problem;
}



module.exports = {
  sayProblem,
  checkAnswer
}
