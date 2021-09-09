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
    for (product of cadet) {
        console.log("je suis ici" + cadet.length)
        displayProductListTable(product);

    }

    //ajoute le tableau de commande
    function displayProductListTable(product) {
        const listProduits = document.getElementById("produitsPanier");
        listProduits.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.colors}</span>
        </td>
        <td class="align-middle productQuantity">
           
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
           
        </td>
        <td class="align-middle">
            <span>${(product.quantity * product.price)+"€"}</span>
        </td>
        
    </tr>`;

    }

}