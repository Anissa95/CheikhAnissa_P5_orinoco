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

}
order.addEventListener("click", (event) => {
    // on prépare les infos pour l'envoie en POST
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    // on valide que le formulaire soit correctement rempli
    if (
        (regexMail.test(contact.email) == true) &
        (regexName.test(contact.firstName) == true) &
        (regexName.test(contact.lastName) == true) &
        (regexCity.test(contact.city) == true) &
        (regexAddress.test(contact.address) == true) &
        (checkBox.checked == true)
    ) {
        event.preventDefault();

    }
    //envoie post 
    //Fonction permettant l'envoie des données a l'API
    const sendApi = async function(data) {
        try {
            //let reponse = await fetch ('http://localhost:3000/api/teddies/order', {
            let reponse = await fetch(`https://oc-p5-api.herokuapp.com/api/teddies/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            });



            //Si la reponse de l'API est OK alors on reccup les données, ouvre la page html confirmation avec order id dans url
            if (reponse.ok) {
                let donnees = await reponse.json();
                window.location = './recaputulatif.html?OrderId=' + donnees.orderId;
                //Si pas OK alors on affiche l'erreur en reponse
            } else {
                event.preventDefault();
                alert("L'erreur rencontrée est : " + reponse.status);
            }
        } catch (error) {
            alert("erreur : " + error);
        }
    };
});