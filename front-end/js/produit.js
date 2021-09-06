//Récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");
console.log(newId)


//modification de l'adresse d'appel à l'API (Api+id )
fetch(`http://localhost:3000/api/teddies/${newId}`)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCard(data);

        // fonction pour la création de la carte du produit
        function addCard(product) {

            // Récuperation des informations du produit
            const selectionProductImage = document.getElementById("imageProduct");
            selectionProductImage.innerHTML += `<img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">`;
            const selectionProductName = document.getElementById("nameProduct");
            selectionProductName.innerHTML += `<h2 class="card-title">${product.name}</h2>`;
            const selectionProductPrice = document.getElementById("priceProduct");
            selectionProductPrice.innerHTML += `<h2 class="card-title">${product.price }€</h2>`;
            const selectionProductDescription = document.getElementById("descriptionProduct");
            selectionProductDescription.innerHTML += `<p class="card-text">${product.description}</p>`;
            addColors(product);
        }

        function addColors(product) {
            const choixCouleur = document.getElementById("color");
            for (let colors of product.colors) {
                choixCouleur.innerHTML += `<option value="${colors}">${colors}</option>`;
            }
        }


    });