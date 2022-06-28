const search = (element) => document.querySelector(element);
let entries = JSON.parse(localStorage.getItem("diary"));
console.log(entries);

const form = document.querySelector("#diary-content-form");
const entryDiv = document.querySelector("#entries");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = document.querySelectorAll(".input");
  const [title, date, entry] = inputVal;
  if (form.dataset.action == "new") addEntry(title, date, entry);
  if (form.dataset.action == "edit") {
    updateEntry(title, date, entry, form.dataset.current);
  }
});

const addEntry = (title, date, entry) => {
  let entryObj = {
    title: title.value,
    date: date.value,
    entry: entry.value,
    status: "active",
    lastEdited: new Date(),
    id: random()(15),
  };
  entries.push(entryObj);
  try {
    localStorage.setItem("diary", JSON.stringify(entries));
  } catch (error) {
    console.log(error);
  }

  appendEntry(entryObj);
  form.reset();
};

function appendEntry(obj) {
  let hyperlink = document.createElement("a");
  hyperlink.setAttribute("href", "#");
  hyperlink.classList.add("btns", "prevEntries");
  hyperlink.innerHTML = `<div>
  <h4>${obj.title}</h4>
  </div>
  <div class="subtext">
  <h6>${obj.date}</h6>
  </div>
  <div class='controls'> 
  <span class="edit">Edit</span>
  <span class="delete">Delete</span>
  </div>
  `;
  hyperlink.dataset.id = obj.id;
  entryDiv.prepend(hyperlink);
  hyperlink.addEventListener("click", (h) => {
    let clickedElem = h.target;
    if (h.target.classList.contains("edit")) editEntry(obj.id);
    else if (h.target.classList.contains("delete")) {
      deleteEntry(obj.id, hyperlink);
    } else viewEntry(obj.id);
  });
}
const updateEntry = (title, date, entry, entryId) => {
  console.log(entries, entryId);

  let found = entries.find((entry) => entry.id === entryId);
  found.title = title.value;
  found.date = date.value;
  found.entry = entry.value;
  let newEntries = entries.filter((entry) => entry.id !== entryId);
  newEntries.push(found);
  entries = newEntries;
  localStorage.setItem("diary", JSON.stringify(newEntries));
  search("#entries").innerHTML = "";
  entries.forEach((entry) => {
    appendEntry(entry);
  });
};

const random = (
  words = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) => {
  return (num = 10) => {
    let returnString = "";
    let numOfWords = 0;
    while (numOfWords < num) {
      numOfWords++;
      returnString += words.charAt(Math.floor(Math.random() * words.length));
    }
    return returnString;
  };
};

const editEntry = (entryId) => {
  /*display the entry txt that matches  the passed in ID */
  entries = JSON.parse(localStorage.getItem("diary"));
  let foundId = entries.find((entryObj) => entryObj.id == entryId);
  search("#title").value = foundId.title;
  search("#date").value = foundId.date;
  search("#body-of-diary").value = foundId.entry;
  form.dataset.action = "edit";
  form.dataset.current = entryId;
  attributes("");
  form.classList.remove("no-border");
};
const viewEntry = (entryId) => {
  entries = JSON.parse(localStorage.getItem("diary"));
  let foundId = entries.find((entryObj) => entryObj.id == entryId);
  console.log(entries, foundId);
  search("#title").value = foundId.title;
  search("#date").value = foundId.date;
  search("#body-of-diary").value = foundId.entry;
  form.dataset.action = "view";
  form.dataset.current = entryId;
  form.classList.add("no-border");
  attributes("add");
};

const attributes = (method) => {
  Array.from(document.querySelectorAll(".input")).forEach((a) => {
    method === "add"
      ? a.setAttribute("readonly", true)
      : a.removeAttribute("readonly");
  });
};
const deleteEntry = (desiredEntry, element) => {
  let removedEntry = entries.findIndex((entry) => entry.id === desiredEntry.id);
  entries.splice(removedEntry, 1);
  localStorage.setItem("diary", JSON.stringify(entries));
  element.remove();
};
search("#newEntry").addEventListener("click", () => {
  form.classList.remove("no-border");
  attributes("");
  form.reset();
});

(function () {
  if (entries === null)
    entries = localStorage.setItem("diary", JSON.stringify([]));
  else {
    for (let i = 0; i < entries.length; i++) {
      appendEntry(entries[i]);
    }
  }
})();

//implementing search bar  functionality
search("#search").addEventListener("input", (e) => {
  let words = e.target.value;
  let filtered = entries.filter(
    (t) =>
      t.title.indexOf(words) > -1 ||
      t.entry.indexOf(words) > -1 ||
      t.date.indexOf(words) > -1
  );
  search("#entries").innerHTML = "";
  filtered.forEach((obj) => appendEntry(obj));
});

search("#delete").addEventListener("click", () => {
  entries = [];
  localStorage.setItem("diary", JSON.stringify(entries));
  search("#entries").innerHTML = "";
});
