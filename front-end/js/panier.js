// affichage des produits du panier
const cadet = JSON.parse(localStorage.getItem("nounours"));
console.log(cadet);


//selection de la id ou je vais injecter mon code html
const positionEmenet = document.querySelector("panierVide");

const orderForm = document.getElementById("formulaire");
const emptyBasket = document.getElementById("panierVide");

// indique que le panier est vide
if (cadet === null) {
    orderForm.classList.add("d-none");
    positionEmenet.innerHTML = emptyBasket;
    console.log("")

    // sinon affiche le tableau avec les produits
} else {
    orderForm.classList.add("d-none");
    emptyBasket.classList.add("d-none");
    const fullBasket = document.getElementById("cadet");
    fullBasket.classList.toggle("d-none");


}