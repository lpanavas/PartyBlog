
console.log('hello');
// const myDB = require('../../db/myMongoDb.js');
// console.log(myDB);

document.getElementById("content").innerHTML = "whaasfdasdfasdfadsfdsafdsafdsatever";

// cardContainer = document.getElementById('card-container');
// const results = await myDB.getParties();
// console.log(results);
// cardContainer.innerHTML = results;

// let cardContainer;

// let createTaskCard = (task) => {

//     let card = document.createElement('div');
//     card.className = 'card shadow cursor-pointer';

//     let cardBody = document.createElement('div');
//     cardBody.className = 'card-body';

//     let title = document.createElement('h5');
//     title.innerText = task.title;
//     title.className = 'card-title';

//     let color = document.createElement('div');
//     color.innerText = task.color;
//     color.className = 'card-color';


//     cardBody.appendChild(title);
//     cardBody.appendChild(color);
//     card.appendChild(cardBody);
//     cardContainer.appendChild(card);

// }

// let initListOfTasks = async() => {
//     if (cardContainer) {
//         document.getElementById('card-container').replaceWith(cardContainer);
//         return;
//     }

//     cardContainer = document.getElementById('card-container');
//     const results = await myDB.getParties();
//     cardContainer.innerHTML = results;
//     // tasks.forEach((task) => {
//     //     createTaskCard(task);
//     // });
// };