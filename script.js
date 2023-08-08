var ul = document.querySelector("ul");

function ADD(e) {
  var add_input = document.getElementById("add_input");
  if (add_input.value !== "") {
    e.preventDefault();
    var li = document.createElement("li");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var icon1 = document.createElement("i");
    var icon2 = document.createElement("i");
    var icon3 = document.createElement("i");
    var input = document.createElement("input");
    input.setAttribute("type", "text");

    li.className = "w3-text-black";
    icon1.className = "fa fa-pencil-square";
    icon1.style.padding = "2px";
    icon2.className = "fa fa-remove";
    icon2.style.padding = "2px";
    icon3.className = "fa fa-check";
    icon3.style.paddingLeft = "2px";
    p1.textContent = add_input.value;
    p2.className = "w3-right";
    p2.style.cursor = "pointer";
    input.style.width = "70%";
    input.style.display = "none";

    p2.appendChild(icon1);
    p2.appendChild(icon2);
    p2.appendChild(icon3);

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(input);

    ul.appendChild(li);
  }
  add_input.value = "";
}

document.getElementById("add").addEventListener("click", function(e) {
  if (add_input.value !== "") {
    ADD(e);
  }
});

document.getElementById("add_input").addEventListener("keypress", function(e) {
  if (add_input.value !== "" && e.keyCode === 13) {
    ADD(e);
  }
});

ul.addEventListener("click", function(e) {
  if (e.target.classList[1] === "fa-pencil-square") {
    var parentPar = e.target.parentNode;
    parentPar.style.display = "none";
    var note = parentPar.previousElementSibling;
    var input = parentPar.nextElementSibling;
    input.style.display = "block";
    input.value = note.textContent;
    input.addEventListener("keypress", function(e) {
      if (e.keyCode === 13) {
        if (input.value !== "") {
          note.textContent = input.value;
          parentPar.style.display = "block";
          input.style.display = "none";
        } else {
          var li = input.parentNode;
          li.parentNode.removeChild(li);
        }
      }
    });
  } else if (e.target.classList[1] === "fa-remove") {
    var list = e.target.parentNode.parentNode;
    list.parentNode.removeChild(list);
  } else if (e.target.classList[1] === "fa-check") {
    var checkBox = e.target.parentNode.parentNode;
    var doneCheck = checkBox.firstElementChild;
    if (doneCheck.className.indexOf("done") == -1) {
      doneCheck.className += " done";
    } else {
      doneCheck.className = doneCheck.className.replace("done", "");
    }
  }
});

var hide = document.getElementById("hide");
hide.addEventListener("click", function(e) {
  if (ul.style.display === "none") {
    hide.textContent = "Hide Notes";
    ul.style.display = "block";
  } else {
    hide.textContent = "Unhide Notes";
    ul.style.display = "none";
  }
});

var search = document.getElementById("search");

search.addEventListener("keyup", function(e) {
  var searchChar = e.target.value.toUpperCase();

  var notes = ul.getElementsByTagName("li");
  Array.from(notes).forEach(function(note) {
    var parText = note.firstElementChild.textContent;
    if (parText.toUpperCase().indexOf(searchChar) !== -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
