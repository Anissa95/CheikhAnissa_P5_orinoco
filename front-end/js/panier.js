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

    //ajoute le tableau de commande
    function displayProductListTable(product) {
        const indexProduit = cadet.indexOf(product);
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
        <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${indexProduit}"><span class="fas fa-minus-square text-danger" data-index="${indexProduit}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduit}"><span class="fas fa-plus-square text-success" data-index="${indexProduit}"></span></button>
        </td>
        <td >
            <span >${(product.quantity * product.price)+"€"}</span>
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



}