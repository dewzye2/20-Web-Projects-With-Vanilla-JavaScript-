const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'ASSASSIN’S CREED I',
  'ASSASSIN’S CREED II',
  'ASSASSIN’S CREED: BROTHERHOOD',
  'ASSASSIN’S CREED: REVELATIONS',
  'ASSASSIN’S CREED III',
  'ASSASSIN’S CREED: BLACK FLAG',
  'ASSASSIN’S CREED: ROGUE',
  'ASSASSIN’S CREED: UNITY',
  'ASSASSIN’S CREED: SYNDICATE',
  'ASSASSIN’S CREED: ORIGINS ',
  'ASSASSIN’S CREED: ODYSSEY',
  'ASSASSIN’S CREED: VALHALLA',
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list into DOM
function createList() {
  [...richestPeople]
  .map(a => ({ value: a, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((person, index) => {    
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
  `;

    listItems.push(listItem);

    draggable_list.appendChild(listItem);
  });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart')
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter')
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave')
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover')
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop')
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check order of list item  
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if(personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }

  });
}


function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  
  draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item =>{
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

check.addEventListener('click', checkOrder);

// // array sort
// const numbers = [2, 36, 1210, 240, 320, 35, 1, 26]
// console.log(numbers.sort(function(a, b) {
//   return a - b;
// }));