//Mise ajour du panier 
basketPreview();
//console.log(caddie);
const orderForm = document.getElementById("formulaire");
const emptyBasket = document.getElementById("panierVide");
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
            // console.log("je suis la " + totalBasket);
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
/// formulaire 
//validation du formulaire et envoie en POST
const commande = document.getElementById("commande");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){3,40}$/;
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
            //On ajoute les infos des produits a l'id de l'acheteur 
            let products = [];
            for (listId of caddie) {
                products.push(listId.id);
            }

            function confirmation() {
                if (window.confirm(`Êtes-vous sûr de vouloir passer la commande `)) {
                    window.location.href = "./confirmation.html"
                } else {
                    window.location.href = "../index.html"
                    localStorage.clear();
                }
            }
            // -------  Envoi de la requête POST au back-end --------
            // Envoie de la requête avec l'en-tête. le local Storage contiendra les données de l'acheteur, id de la commande  ,les infos du produits
            fetch("http://localhost:3000/api/teddies/order", {
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
                    confirmation()
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert(
                "Tous les champs du formulaire sont obligatoires!!!!."
            );
        }
        event.preventDefault()
    });
}
// indique que le panier est vide
function affichePanier() {
    if (caddie.length < 1) {
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
        main();
    }
}

function main() {
    totalPrice();
    viderPanier();
    ajouterProduit();
    supprimerProduit();
    afficheFormulaire();
    validationFormulaire();
}
affichePanier();