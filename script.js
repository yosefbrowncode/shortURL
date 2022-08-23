let inputLink = document.getElementById("shortForm");

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
  const Yes = `https://api.shrtco.de/v2/shorten?url=${geegle}`;
  axios
    .get(Yes)
    .then((response) => {
      let errorMessage = document.getElementById("errorMessage");
      let addLink = document.getElementById("addToList");
      let oldLink = response.data.result.original_link;
      let shortLink = response.data.result.full_short_link;
      console.log(response.data.result.full_short_link);
      console.log(response.data.result.original_link);
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
          <h4 class="my-auto coloredLink">${shortLink}</h4>
          <button  type="button" class="btn btn-primary float-right linkBtn me-0 me-lg-4 btnHover" onClick="copyLink()" >copy</button>
          </div>
        </div>
      </div>
 `;
      li.innerHTML = newLink;
      addLink.prepend(li);
      console.log(geegle);
    })
    .catch(function (error) {
      // handle error
      errorMessage.innerHTML = "* Please check your link";
    });
  resetVal.value = "";
}
