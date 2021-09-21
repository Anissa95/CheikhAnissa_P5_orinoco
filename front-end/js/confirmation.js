const order = JSON.parse(localStorage.getItem("commande")) || [];

// affiche Mes informations
const informations = document.getElementById("acheteur");
informations.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${order.contact.firstName}</span>, merci pour votre achat sur notre site !</p>
    <p class="fs-5">votre facture est d'un montant de : <span class="fw-bold">${(displayTotalBasket()) + ",00 €" }  </span>et enregitrée sous la réference N°: <span class="fw-bold">${order.orderId }</span> .</p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold">${order.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    `;


for (product of caddie) {
    displayProductListTable(product);
}
// calcul du total
function displayTotalBasket() {
    let totalBasket = 0;
    if (caddie != null) {
        caddie.forEach((ours) => {
            totalBasket = totalBasket + ours.price * ours.quantity;
            //console.log("je suis la " + totalBasket);
        });
    }
    return totalBasket;
};
//Vider le local Storage 
function clearBasket() {
    localStorage.clear();
}
clearBasket();