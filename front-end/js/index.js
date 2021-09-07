//fetch de l'URL
fetch('http://localhost:3000/api/teddies/')
    .then(res => res.json())
    .then(data => {
        addCards(data);
        console.log(data)
    })
    .catch((erreur) => console.log("erreur : " + erreur));

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("list");
        card.innerHTML += `
  <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
      <div class="card border bg-light shadow p-3 mb-5 ">
          <div class="card-body">
              <div class="row">
                  <a href="pageSite/produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                  <div class="col-6 col-sm-7 mt-3" >
                      <h2 class="card-title">${produit.name}</h2>
                  </div>
                  <div class="col-6 col-sm-5 text-end mt-3">
                      <h2 class="card-title">${produit.price/100}€</h2>
                  </div>
              </div>
               <p class="card-text text-truncate">${produit.description}</p>
              <a href="pageSite/produit.html?_id=${produit._id}" class="btn btn-secondary">Voir ce produit</a>
          </div>
      </div>
  </div>`;
    }
}