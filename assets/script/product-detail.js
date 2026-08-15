const products = {
    man1: {
        name: "Man Product 1",
        image: "../img/Man/man1.jpg",
        price: "19.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Black"
    },
    man2: {
        name: "Man Product 2",
        image: "../img/Man/man2.jpg",
        price: "29.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Black"
    },
    man3: {
        name: "Man Product 3",
        image: "../img/Man/man3.jpg",
        price: "39.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Blue"
    },
    man4: {
        name: "Man Product 4",
        image: "../img/Man/man4.jpg",
        price: "25.00",
        oldPrice: "10.00",
        discount: "-40%",
        color: "White"
    },
    men5: {
        name: "Man Product 5",
        image: "../img/Man/men5.jpg",
        price: "29.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Black"
    },
    men6: {
        name: "Man Product 6",
        image: "../img/Man/men6.jpg",
        price: "39.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "White"
    },
    men7: {
        name: "Man Product 7",
        image: "../img/Man/men7.jpg",
        price: "49.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Black"
    },
    men8: {
        name: "Man Product 8",
        image: "../img/Man/men8.jpg",
        price: "50.99",
        oldPrice: "10.00",
        discount: "-40%",
        color: "Blue"
    },
/*Women*/
    women1: {
        name: "Woman Product 1",
        image: "../img/Woman/women1.jpg",
        price: "29.99",
        oldPrice: "10.99",
        discount: "-40%",
        color: "Pink"
    },
    women2: {
        name: "Woman Product 2",
        image: "../img/Woman/women2.jpg",
        price: "39.99",
        oldPrice: "10.99",
        discount: "-40%",
        color: "Pink"
    },
    women3: {
        name: "Woman Product 3",
        image: "../img/Woman/women3.jpg",
        price: "49.99",
        oldPrice: "11.99",
        discount: "-40%",
        color: "Black"
    },
    women4: {
        name: "Woman Product 4",
        image: "../img/Woman/women4.jpg",
        price: "59.99",
        oldPrice: "10.99",
        discount: "-40%",
        color: "White"
    },
    women5: {
        name: "Woman Product 5",
        image: "../img/Woman/women5.jpg",
        price: "69.99",
        oldPrice: "39.99",
        discount: "-40%",
        color: "Pink"
    },
    women6: {
        name: "Woman Product 6",
        image: "../img/Woman/women6.jpg",
        price: "79.99",
        oldPrice: "20.99",
        discount: "-40%",
        color: "Black"
    },
    women7: {
        name: "Woman Product 7",
        image: "../img/Woman/women7.jpg",
        price: "89.99",
        oldPrice: "19.99",
        discount: "-40%",
        color: "White"
    },
    women8: {
        name: "Woman Product 8",
        image: "../img/Woman/women8.jpg",
        price: "99.99",
        oldPrice: "29.99",
        discount: "-40%",
        color: "Pink"
    }
};
/* =========================
   GET ID FROM URL
========================= */
const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");
    console.log("Product ID:", productId);
    console.log("Product:", products[productId]);
/* =========================
   GET PRODUCT
========================= */
const product =
    products[productId];

/* =========================
   SHOW PRODUCT
========================= */
if (product) {
    document.getElementById("mainImage").src =
        product.image;

    document.getElementById("colorImage").src =
        product.image;

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productPrice").textContent =
        "$" + product.price;

    document.getElementById("productOldPrice").textContent =
        "$" + product.oldPrice;

    document.getElementById("productDiscount").textContent =
        product.discount;

    document.getElementById("colorName").textContent =
        product.color;
}

/* =========================
   IF PRODUCT NOT FOUND
========================= */
else {

    document.querySelector(".detail-container")
        .innerHTML = `
            <h1>Product not found</h1>
        `;

}
/* =========================
   SIZE
========================= */

let selectedSize = "";
function selectSize(size) {
    selectedSize = size;
    document.getElementById("selectedSize")
        .textContent = size;

    document
        .querySelectorAll(".size-buttons button")
        .forEach(button => {

            button.classList.remove("active");

            if (button.textContent === size) {
                button.classList.add("active");
            }
        });

}
/* =========================
   QUANTITY
========================= */
let quantity = 1;
function increaseQuantity() {
    quantity++;
    document.getElementById("quantity")
        .textContent = quantity;
}
function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById("quantity")
            .textContent = quantity;
    }
}
/* =========================
   ADD TO CART
========================= */
function addToCart() {
    if (selectedSize === "") {
        alert("Please select a size.");
        return;
    }
    console.log({
        product: product.name,
        price: product.price,
        size: selectedSize,
        quantity: quantity
    });
    alert(
        product.name +
        " added to cart!"
    );

}