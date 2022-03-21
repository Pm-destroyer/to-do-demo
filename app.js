console.log("this is app.js");
console.log('hello9');
showText();
// Add notes by clicking the button with id btnAdd

let addBtn = document.getElementById("btnAdd");
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");
addBtn.addEventListener('click', function (e) {
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else notesObj = JSON.parse(notes);
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    console.log(myObj.text);

// check whether the text is empty or not 
    
    if (myObj.text == '')
        alert('Please enter notes first...!');
    else notesObj.push(myObj);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showText();
    // console.log(notesObj);
});

// show elements from localStorage

function showText() {

    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
    <div class="card noteCard my-3 mx-3" id="notes" style="width: 21rem;">
        <div class="card-body">
            <h5 class="card-title">${index + 1}. ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
    </div>`;
    });

    noteElem = document.getElementById("notes");
    if (notesObj.length != 0)
        noteElem.innerHTML = html;
    else noteElem.innerHTML = `<h5>Nothing to show! Use "Add a Note" section above to add notes.</h5>`;
}

// delete notes

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else notesObj = JSON.parse(notes);

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(`i am deleteing ${index}`);
    showText();
}

// search suggestion

let search = document.getElementById("search");
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementById("notes");
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = document.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal))
            element.style.display = "block";
        else element.style.display = "none";
    });
});


