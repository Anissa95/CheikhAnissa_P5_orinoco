const order = JSON.parse(localStorage.getItem("commande")) || [];
const caddie = JSON.parse(localStorage.getItem("nounours")) || [];


// affiche Mes informations
const informations = document.getElementById("achteur");
informations.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${order.contact.firstName}</span>, merci pour votre achat sur notre site !</p>
    <p class="fs-5">votre facture d'un montant de : <span class="fw-bold">${(displayTotalBasket()) + ",00 €" }  </span>et enregitrée sous la réference N°: <span class="fw-bold">${order.orderId }</span> .</p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold">${order.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    `;

function displayProductListTable(product) {
    const indexProduit = caddie.indexOf(product);
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
                <span>${(product.quantity * product.price)+",00 €"}</span>
            </td>
            
        </tr>`;
}
for (product of caddie) {
    displayProductListTable(product);


}

// calcul du total
function displayTotalBasket() {
    let totalBasket = 0;
    if (caddie != null) {
        caddie.forEach((ours) => {
            totalBasket = totalBasket + ours.price * ours.quantity;
            console.log("je suis la " + totalBasket);
        });
    }
    return totalBasket;

};
//vide le localStorage
const clickHome = document.getElementById("accueil");
clickHome.addEventListener("click", () => {
    clearBasket();
});

const clickCaddie = document.getElementById("basketPreview");
clickCaddie.addEventListener("click", () => {
    clearBasket();
});