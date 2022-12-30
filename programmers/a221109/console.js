// const errMsg = 'the # is not even';
// for (let number = 2; number <= 5; number += 1) {
//     console.log('the # is ' + number);
//     console.assert(number % 2 === 0, { number: number, errMsg: errMsg });
// }

let user = "";

function greet() {
    console.count(user);
    return "hi " + user;
}

user = "bob";
greet();
user = "alice";
greet();
greet();
console.countReset("alice");
console.count("alice");
