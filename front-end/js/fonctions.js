// affichage des produits du panier
const caddie = JSON.parse(localStorage.getItem("nounours"));
// calcul du basketPreview
function basketPreview() {
    if (caddie && caddie.length != 0) {

        let addBasketPreview = document.getElementById("basketPreview");
        let calculBasketPreview = 0;
        for (product of caddie) {
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
      </svg>` + ` <span class="badge rounded-pill bg-secondary align-middle ">${calculBasketPreview}</span>`;
    }
}

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