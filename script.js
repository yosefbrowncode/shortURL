function littleLink() {
  let geegle = document.getElementById("shortForm").value;
  const Yes = `https://api.shrtco.de/v2/shorten?url=${geegle}`;
  axios.get(Yes).then((response) => {
    let addLink = document.getElementById("addToList");
    console.log(response.data.result.full_short_link);
    console.log(response.data.result.original_link);

    const li = document.createElement("li");
    li.classList.add("mb-4");
    const newLink = ` 
    <div class="card border-0 linkCard">
        <div class="card-body d-flex">
          <h4 class="my-auto longLink">https://www.frontendmentor.io...</h4>
          <h4 class="my-auto coloredLink">https://rel.ink/k41kyK</h4>
          <button  type="button" class="btn btn-primary float-right linkBtn me-4" >copy</button>
        </div>
      </div>
 `;
    li.innerHTML = newLink;
    addLink.prepend(li);
    console.log(geegle);
  });
}
