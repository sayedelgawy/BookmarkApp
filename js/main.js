/*   global variables   */
var bookmarkNameInput = document.getElementById("bookmarkName");

var bookmarkURLInput = document.getElementById("bookmarkURL");

var tableContent = document.getElementById("tableContent");

var submitBtn = document.getElementById("submitBtn");

var myErrorModal = new bootstrap.Modal(document.getElementById("myModal"));

var bookmarks;

var urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
var bookmarkNameRegex = /^[\w|\W]{3}/;

/*   end global variables   */

/*  browsing the bookmarks at the start of the app if it is there  */
if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks(bookmarks);
} else {
  bookmarks = [];
}

/*   adding bookmark   */
function addBookMark() {
  if (
    validation(urlRegex, bookmarkURLInput.value) &&
    validation(bookmarkNameRegex, bookmarkNameInput.value)
  ) {
    var bookmark = {
      bookmarkName: bookmarkNameInput.value,
      bookmarkURL: bookmarkURLInput.value,
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
    clearForm();
  } else {
    myErrorModal.show();
  }
}

/*   delete bookmark function   */
function deleteBookmark(indexOfBookmark) {
  bookmarks.splice(indexOfBookmark, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
}

/*   display bookmarks function  */
function displayBookmarks(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    content += ` <tr>
        <td>${i + 1}</td>
        <td>${arr[i].bookmarkName}</td>
        <td>
          <a class="btn btn-visit" data-index="0" role="button" target="_blank "href="${
            arr[i].bookmarkURL
          }">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <a class="btn btn-delete pe-2" data-index="0" role="button" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </a>
        </td>
      </tr>`;
  }

  tableContent.innerHTML = content;
}

/*   click event when submit button is clicked   */
submitBtn.addEventListener("click", function () {
  addBookMark();
});

/*   oninput event when typing in bookmark name input to validate in realtime  */
bookmarkNameInput.addEventListener("input", function () {
  if (validation(bookmarkNameRegex, bookmarkNameInput.value)) {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
  }
});

/*   oninput event when typing in bookmark url input to validate in realtime */
bookmarkURLInput.addEventListener("input", function () {
  if (validation(urlRegex, bookmarkURLInput.value)) {
    bookmarkURLInput.classList.add("is-valid");
    bookmarkURLInput.classList.remove("is-invalid");
  } else {
    bookmarkURLInput.classList.add("is-invalid");
    bookmarkURLInput.classList.remove("is-valid");
  }
});

/*   validation function   */
function validation(expression, value) {
  if (expression.test(value)) {
    return true;
  } else {
    return false;
  }
}

/*   clear form function   */
function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
  bookmarkURLInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-valid");
}
