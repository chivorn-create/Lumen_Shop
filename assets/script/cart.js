//GET CART FROM LOCAL STORAGE
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

//GET HTML ELEMENTS
const cartItems =
    document.getElementById("cartItems");

const subtotalElement =
    document.getElementById("subtotal");

const grandTotalElement =
    document.getElementById("grandTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {

    window.location.href = "/product/checkout.html";

});

//SHIPPING FEE
const shippingFee = 15;

//DISPLAY CART
function displayCart() {

    cartItems.innerHTML = "";
    let subtotal = 0; // ============================
    //EMPTY CART
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        subtotalElement.textContent = "0.00$";

        grandTotalElement.textContent =
            shippingFee.toFixed(2) + "$";

        return;
    }
    //DISPLAY PRODUCTS
    cart.forEach((item, index) => {

        const price = parseFloat(item.price);
        const total = price * item.quantity;

        subtotal += total;


        cartItems.innerHTML += `

            <div class="cart-product">


                <!-- PRODUCT -->

                <div class="product-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>

                        <h2>
                            ${item.name}
                        </h2>
                        <p> Clothing </p>
                        <p> ${item.price}$ </p>
                    </div>

                </div>


                <!-- PRICE -->

                <div class="product-price">
                    ${item.price}$
                </div>


                <!-- DISCOUNT -->

                <div class="product-discount">
                 
                ${item.discount}

                </div>

                
                <!-- QUANTITY -->

                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${index})">

                        [-]

                    </button>
                    
                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        
                        onclick="increaseQuantity(${index})">

                        [+]

                    </button>

                </div>


                <!-- TOTAL -->


                <div class="product-total">

                    ${total.toFixed(2)}$

                </div>

                
            </div>

        `;

    });

    //SUBTOTAL
    subtotalElement.textContent =
        subtotal.toFixed(2) + "$";

    //GRAND TOTAL
    const grandTotal =
        subtotal + shippingFee;

    grandTotalElement.textContent = grandTotal.toFixed(2) + "$";

}

//INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}
//DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        // Remove product if quantity reaches 0

        cart.splice(index, 1);

    }

    saveCart();

}
//SAVE CART
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}
//UPDATE CART ICON

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}
// GO TO CART

function goToCart() {

    window.location.href = "/carts/cart.html";
}
// LOAD CART COUNT
updateCartCount();
displayCart();