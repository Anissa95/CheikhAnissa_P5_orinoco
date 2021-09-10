// affichage des produits du panier
const cadet = JSON.parse(localStorage.getItem("nounours"));
console.log(cadet);

const orderForm = document.getElementById("formulaire");
const emptyBasket = document.getElementById("panierVide");

// indique que le panier est vide
if (cadet === null) {
    orderForm.classList.add("d-none");


    // sinon affiche le tableau avec les produits
} else {
    orderForm.classList.add("d-none");
    emptyBasket.classList.add("d-none");
    const fullBasket = document.getElementById("cadet");
    fullBasket.classList.toggle("d-none");
    for (product of cadet) {
        console.log("je suis ici" + cadet.length)
        displayProductListTable(product);

    }
}
//ajoute le tableau de commande
function displayProductListTable(product) {
    const indexProduit = cadet.indexOf(product);
    const listProduits = document.getElementById("produitsPanier");
    listProduits.innerHTML += `
    <tr class="text-center fs-6">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.colors}</span>
        </td>
        <td class="align-middle p-0 productQuantity">
        <button type="button" class=" btn rounded minus p-0  data-index="${indexProduit}"><span class="fas fa-minus-square text-danger" data-index="${indexProduit}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class=" btn rounded plus p-0" data-index="${indexProduit}"><span class="fas fa-plus-square text-success" data-index="${indexProduit}"></span></button>
        </td>
        <td class="align-middle">
            <span>${(product.quantity * product.price)+"€"}</span>
        </td>
        
    </tr>`;

}

// ajouter produit
function plusProduct(event) {

    const index = event.target.getAttribute("data-index");
    cadet[index].quantity++;
    localStorage.setItem("nounours", JSON.stringify(cadet));
    location.reload();
}

const btn_ajouter = document.getElementsByClassName("plus");
for (ajouter of btn_ajouter) {
    ajouter.addEventListener("click", plusProduct);

}

//supprimer un produit
function minusProduct(event) {
    const index = event.target.getAttribute("data-index");

    if (cadet[index].quantity > 1) {
        cadet[index].quantity--;
    } else {
        cadet.splice(index, 1);
    }
    localStorage.setItem("nounours", JSON.stringify(cadet));
    location.reload();
}

const btn_supprimer = document.getElementsByClassName("minus");
for (supprimer of btn_supprimer) {
    supprimer.addEventListener("click", minusProduct);


}


//vide le panier
const buttonClearBASKET = document.getElementById("viderPanier");
buttonClearBASKET.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//affiche le totalBasket
function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${"Total :"+(displayTotalBasket())+ " €"}`;
}
totalPrice();
// calcul du total
function displayTotalBasket() {
    let totalBasket = 0;
    cadet.forEach((ours) => {
        totalBasket = totalBasket + ours.price * ours.quantity;
        console.log("je suis la " + totalBasket);
    });
    return totalBasket;

};
//affiche le formulaire et cache les boutons valider/supprimer panier
const validationBasket = document.getElementById("validationPanier");
const cacheButton = document.getElementById("cacheButton");
validationBasket.addEventListener("click", () => {
    orderForm.classList.toggle("d-none");
    cacheButton.classList.add("d-none");
});
// calcul du basketPreview
function basketPreview() {
    if (cadet.length == 0) {} else {
        let addBasketPreview = document.getElementById("basketPreview");
        let calculBasketPreview = 0;
        for (product of cadet) {
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = ` <span class="badge rounded-pill bg-secondary align-middle  ">${calculBasketPreview}</span>` + `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
      </svg>`;
    }
}
basketPreview()