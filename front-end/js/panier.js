// affichage des produits du panier
const caddie = JSON.parse(localStorage.getItem("nounours"));
console.log(caddie);

const orderForm = document.getElementById("formulaire");
const emptyBasket = document.getElementById("panierVide");

//ajoute le tableau de commande
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
        <button type="button" class=" btn rounded minus p-0  data-toggle="modal" data-target="#exampleModal" data-index="${indexProduit}"><span class="fas fa-minus-square text-danger" data-index="${indexProduit}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class=" btn rounded plus p-0" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduit}"><span class="fas fa-plus-square text-success" data-index="${indexProduit}"></span></button>
        </td>
        <td class="align-middle">
            <span>${(product.quantity * product.price)+"€"}</span>
        </td>
        
    </tr>`;

}

// ajouter produit
function plusProduct(event) {

    const index = event.target.getAttribute("data-index");
    caddie[index].quantity++;
    localStorage.setItem("nounours", JSON.stringify(caddie));
    location.reload();
}

function ajouterProduit() {
    const btn_ajouter = document.getElementsByClassName("plus");
    for (ajouter of btn_ajouter) {
        ajouter.addEventListener("click", plusProduct);

    }
}
//supprimer un produit
function minusProduct(event) {
    const index = event.target.getAttribute("data-index");

    if (caddie[index].quantity > 1) {
        caddie[index].quantity--;
    } else {
        caddie.splice(index, 1);
    }
    localStorage.setItem("nounours", JSON.stringify(caddie));
    location.reload();
}

function supprimerProduit() {
    const btn_supprimer = document.getElementsByClassName("minus");
    for (supprimer of btn_supprimer) {
        supprimer.addEventListener("click", minusProduct);


    }
}


//vide le panier
function viderPanier() {
    const buttonClearBASKET = document.getElementById("viderPanier");
    buttonClearBASKET.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}
//affiche le totalBasket
function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${"Total :"+(displayTotalBasket())+ " €"}`;
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
//affiche le formulaire et cache les boutons valider/supprimer panier
function afficheFormulaire() {
    const validationBasket = document.getElementById("validationPanier");
    const cacheButton = document.getElementById("cacheButton");
    validationBasket.addEventListener("click", () => {
        // change la présence d'une classe dans la liste. Si la classe existe, alors la supprime et renvoie false,
        // dans le cas inverse, ajoute cette classe et retourne true
        orderForm.classList.toggle("d-none");
        //Ajoute les classes spécifiées. Si une classe est déjà assignée en attribut de cet élément,
        // elle est ignorée.
        cacheButton.classList.add("d-none");
    });
}
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

/// formulaire 
//validation du formulaire et envoie en POST
const commande = document.getElementById("commande");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

function validationFormulaire() {
    commande.addEventListener("click", (event) => {
        // on prépare les infos pour l'envoie en POST
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        };
        // on valide que le formulaire soit correctement rempli
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true)
        ) {
            event.preventDefault();


            //On ajoute les infos des produits a l'id de l'acheteur 
            let products = [];
            for (listId of caddie) {
                products.push(listId.id);

            }

            // -------  Envoi de la requête POST au back-end --------
            // Envoie de la requête avec l'en-tête. le local Storage contiendra les données de l'acheteur, id de la commande  ,les infos du produits

            fetch("https://teddies-api.herokuapp.com/api/teddies/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ contact, products }),
                })
                .then((response) => response.json())
                .then((data) => {
                    //Stockage de la commande dans local Storage
                    localStorage.setItem("commande", JSON.stringify(data));
                    window.confirm("Êtes-vous sûr de vouloir passer la commande");
                    document.location.href = "./recapitulatif.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert(
                "Tous les champs du formulaire sont obligatoires!!!!."
            );
        }
    });
}
// indique que le panier est vide
function affichePanier() {
    if (caddie === null) {
        orderForm.classList.add("d-none");


        // sinon affiche le tableau avec les produits
    } else {
        emptyBasket.classList.add("d-none");
        orderForm.classList.add("d-none");
        const fullBasket = document.getElementById("caddie");
        fullBasket.classList.toggle("d-none");
        for (product of caddie) {
            displayProductListTable(product);

        }
    }
    main();
}

function main() {
    displayTotalBasket();
    totalPrice();
    viderPanier();
    ajouterProduit();
    supprimerProduit();
    afficheFormulaire();
    validationFormulaire();
}
affichePanier();
basketPreview();