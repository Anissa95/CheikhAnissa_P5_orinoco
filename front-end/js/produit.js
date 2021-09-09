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
            selectionProductPrice.innerHTML += `<h2 class="card-title">${product.price/100 }€</h2>`;
            const selectionProductDescription = document.getElementById("descriptionProduct");
            selectionProductDescription.innerHTML += `<p class="card-text">${product.description}</p>`;
            addColors(product);
        }
        //fonction récuperation de la couleur des nounours 
        function addColors(product) {
            const choixCouleur = document.getElementById("color");
            for (let colors of product.colors) {
                choixCouleur.innerHTML += `<option value="${colors}">${colors}</option>`;
            }
        }



        // créer un evenement d'ecoute sur le bouton ajouter au panier
        const btnAddBasket = document.getElementById("btnAddBasket");
        btnAddBasket.addEventListener("click", (e) => {
            e.preventDefault();

            // création de la class produit
            class Product {
                constructor(id, name, description, price, colors, quantity, imgurl) {
                    this.id = id;
                    this.name = name;
                    this.description = description;
                    this.price = +price;
                    this.colors = colors;
                    this.quantity = +quantity;
                    this.imgurl = imgurl;
                }
            }
            const list = document.getElementById("color");
            const quantity = document.getElementById("quantity");
            // créer un nouveau produit
            let oursChoisi = new Product(
                newId,
                product.name,
                product.description,
                product.price / 100,
                list.value,
                quantity.value,
                product.imageUrl
            );
            console.log(oursChoisi);

            // vérifie s'il est déja présent
            // si il deja Present en true et sauvegarde sa place dans le localStorage
            let isPresent = false;
            let indexModification;
            const cadet = JSON.parse(localStorage.getItem("nounours")) || [];
            for (products of cadet) {
                switch (products.colors) {
                    case oursChoisi.colors:
                        isPresent = true;
                        indexModification = cadet.indexOf(products);
                }
            }
            //fonction fenetre pop up 
            function popupConfirmation() {
                if (window.confirm(product.name + " " + list.value + `a bien été ajouté au panier 
Consulter le panier OK ou revenir à l'acceuil ANNULER !!! `)) {
                    window.location.href = "./panier.html"
                } else {
                    window.location.href = "../index.html"
                }
            }
            // si le produit existe deja on incrémente seulement la quantité
            if (isPresent) {
                cadet[indexModification].quantity = +cadet[indexModification].quantity + +oursChoisi.quantity;
                localStorage.setItem("nounours", JSON.stringify(cadet));
                popupConfirmation();
                // si le produit n'existe pas on l'ajoute au localStorage
            } else {

                // ajout dans le tableau de  l'objet avec les valeurs que l'utilisateur a choisi   
                cadet.push(oursChoisi);
                // transformation en format json
                localStorage.setItem("nounours", JSON.stringify(cadet));
                popupConfirmation();
            }
        });
    });