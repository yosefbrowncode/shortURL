let inputLink = document.getElementById("shortForm");
let errorMessageRemove = document.getElementById("errorMessage");

// Execute a function when the user presses a key on the keyboard
inputLink.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    littleLink();
    inputLink.blur();
  }
});

function littleLink() {
  let geegle = document.getElementById("shortForm").value;
  let resetVal = document.getElementById("shortForm");
  let errorMessageEmpty = document.getElementById("errorMessage");
  if (geegle.length == 0) {
    errorMessageEmpty.innerHTML = "Please add a link";

    resetVal.focus();
    resetVal.classList.add("focusChange");
  }
  const Yes = `https://api.shrtco.de/v2/shorten?url=${geegle}`;
  axios
    .get(Yes)
    .then((response) => {
      let errorMessage = document.getElementById("errorMessage");
      let addLink = document.getElementById("addToList");
      let oldLink = response.data.result.original_link;
      let shortLink = response.data.result.full_short_link;
      addLink.classList.add("giveMargin");
      const li = document.createElement("li");
      li.classList.add("mb-4");
      const newLink = ` 
    <div class="card border-0 linkCard">
        <div class="card-body d-flex row">
        <div class="col colDisplay">
        <h4 class="my-auto longLink d-inline-block text-truncate" >${oldLink}</h4>
        </div>
        <div class="col-12 d-block  d-lg-none"><hr></div>
          <div class="col colDisplay">
          <h4 id="shorty" class="my-auto coloredLink">${shortLink}</h4>
          <button  type="button" class="btn btn-primary float-right linkBtn me-0 me-lg-4 btnHover" onClick="copyLink(this); this.blur();" >Copy</button>
          </div>
        </div>
      </div>
 `;
      li.innerHTML = newLink;
      addLink.prepend(li);
      console.log(geegle);
      errorMessage.innerHTML = "";
    })
    .catch(function (error) {
      // handle error
      if (geegle.length > 0) {
        resetVal.focus();
        resetVal.classList.add("focusChange");
        errorMessage.innerHTML = "Please check your link";
      }
    });
  resetVal.value = "";
}

function copyLink(e) {
  let copyBtn = e;
  let shortCopy = e.parentNode.children[0];
  shortCopy = shortCopy.innerHTML;
  copyBtn.classList.add("copiedBtn");
  copyBtn.innerHTML = "Copied!";
  copyTextToClipboard(shortCopy);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert("Error in copying text: ", err);
  }
}

inputLink.addEventListener("input", (event) => {
  inputLink.classList.remove("focusChange");
  errorMessageRemove.innerHTML = "";
});
