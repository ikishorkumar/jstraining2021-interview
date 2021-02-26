// Fetch api data fo coutnry api using xhttp request

let element = document.getElementById("container");
let request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/name/pakistan");
request.send();

request.addEventListener("load", function () {
  const [data] = JSON.parse(this.responseText);
  //   console.log(data);

  let card = {};
  let img = document.createElement("img");
  img.setAttribute("src", data.flag);
  img.setAttribute("class", "flag");

  let h1 = document.createElement("h1");
  h1.innerHTML = `Country : ${data.name}`;
  h1.setAttribute("class", "countryname");

  let h2 = document.createElement("h2");
  h2.innerHTML = `Area : ${data.area}`;
  h2.setAttribute("class", "countryarea");

  element.append(img);
  element.append(h1);
  element.append(h2);
});

// Joke fetching api using fetch and promise method
let jokes = document.getElementById("jokes");
let jokebtn = document.getElementById("jokebtn");
let joke = document.getElementById("joke");

const setheaders = {
  headers: {
    Accept: "application/json",
  },
};

function fetchJok() {
  fetch("https://icanhazdadjoke.com/", setheaders)
    .then((res) => res.json())
    .then((data) => (joke.innerHTML = data.joke))
    .catch((err) => {
      console.log(err);
    });
}

jokebtn.addEventListener("click", fetchJok);
fetchJok();

// Temp   calculator
document.getElementById("convertbtn").addEventListener("click", () => {
  let inputtemp = +document.getElementById("temp").value;
  console.log(inputtemp);
  let selecttemp = document.getElementById("temprature");
  let valuetep = selecttemp.options[selecttemp.selectedIndex].value;

  if (valuetep != "" && inputtemp != "") {
    if (valuetep == "celsius") {
      let celtofah = Math.round((inputtemp * 9) / 5 + 32);
      // console.log(celtofah);
      document.getElementById(
        "outputtemp"
      ).innerHTML = ` ${celtofah} fahrenheit `;
    } else {
      let fahtocel = Math.round(((inputtemp - 32) * 5) / 9);
      // console.log(fahtocel);

      document.getElementById("outputtemp").innerHTML = `${fahtocel}  celsius`;
    }
  } else {
    outputtemp.innerHTML = "Error, input of slecet not filled up correctly  ";
  }
});

// Add Note Application


// Saving To LocalStorage Function
const saveLSD = () => {

  const textnotes = document.querySelectorAll("textarea");
  const allNotes = [];
  // console.log(textnotes)
  textnotes.forEach((onenote) => {
    if (onenote.value !=="") {

      return allNotes.push(onenote.value);
    }
  });


  localStorage.setItem("allNotes", JSON.stringify(allNotes));
};

// Add Note

function addNoteitems(text = "") {
  // note list
  let notelist = document.getElementById("notelist");

  // note card
  let noteitem = document.createElement("div");
  noteitem.setAttribute("id", "container");
  noteitem.setAttribute("class", "tr");

  //
  let btnsave = document.createElement("button");
  btnsave.innerText = "save";
  btnsave.setAttribute("id", "save");
  btnsave.setAttribute("class", "save");
  btnsave.setAttribute("class", "hide");

  //
  let btndelete = document.createElement("button");
  btndelete.setAttribute("id", "delete");
  btndelete.setAttribute("class", "delete");
  btndelete.innerText = "delete";

  //
  let btnedit = document.createElement("button");
  btnedit.setAttribute("id", "edit");
  btnedit.setAttribute("class", "edit");
  btnedit.innerText = "edit";

  // result Div for TeXt
  let textdiv = document.createElement("div");
  textdiv.setAttribute("id", "textdiv");
  textdiv.setAttribute("class", "textdiv");
  text.value ? textdiv.setAttribute("class", "hide") : "";

  // text area
  let txtarea = document.createElement("textarea");
  txtarea.setAttribute("id", "note");
  txtarea.setAttribute("class", "note");
  txtarea.setAttribute("rows", "10");
  txtarea.setAttribute("cols", "30");
  text.value ? "" : txtarea.setAttribute("class", "hide");

  // Appending elements to Item

  noteitem.append(btnsave);
  noteitem.append(btndelete);
  noteitem.append(btnedit);
  noteitem.append(textdiv);
  noteitem.append(txtarea);

  // Delete Node item
  btndelete.addEventListener("click", function () {
    notelist.removeChild(this.parentNode);
    saveLSD();
  });

  if (text !='') {
    txtarea.value = text;
    textdiv.innerHTML = text;
  }

  // Edit Item text area value ;
  btnedit.addEventListener("click", function () {
    textdiv.setAttribute("class", "hide");
    txtarea.removeAttribute("class", "hide");
    btnsave.removeAttribute("class", "hide");
    btnedit.setAttribute("class", "hide");
  });

  // gettting Values
  let valueenterd;

  txtarea.addEventListener("change", (event) => {
    valueenterd = event.target.value;
  });

  // Save Item
  btnsave.addEventListener("click", function () {
    btnedit.removeAttribute("class", "hide");
    textdiv.removeAttribute("class", "hide");

    if(txtarea.value !=''){
      textdiv.innerHTML = valueenterd;
    }
    else{
      notelist.removeChild(this.parentNode);

    }
    
    saveLSD();

    btnsave.setAttribute("class", "hide");
    txtarea.setAttribute("class", "hide");
  });
  notelist.appendChild(noteitem);
}


// Getting Local Storage Data
const recivednotes = JSON.parse(localStorage.getItem("allNotes"));
if (recivednotes) {
  recivednotes.forEach((recivednote) => {
    if(recivednote!=''){
      addNoteitems(recivednote);

    }

  });
}


// Adding On Clock on AddNote BTN
document
  .getElementById("addnote")
  .addEventListener("click", () => addNoteitems());
