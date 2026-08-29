
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// =================================
// GET HTML ELEMENTS
// =================================
const checkoutItems =
    document.getElementById("checkoutItems");
const itemCount =
    document.getElementById("itemCount");
const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");
const shippingElement =
    document.getElementById("shipping");
const taxesElement =
    document.getElementById("taxes");
const checkoutTotal =
    document.getElementById("checkoutTotal");
// =================================
// SHIPPING & TAX
// =================================
const SHIPPING_FEE = 15;
const TAX_RATE = 0;
// =================================
// GET NUMBER
// =================================
function getNumber(value) {
    if (typeof value === "number") {
        return value;
    }
    if (!value) {
        return 0;
    }
    return parseFloat(
        String(value).replace(/[^0-9.-]/g, "")
    ) || 0;
}
// =================================
// GET QUANTITY
// =================================
function getQuantity(item) {
    return Number(
        item.quantity ??
        item.qty ??
        item.QTY ??
        1
    ) || 1;
}
// =================================
// GET PRODUCT NAME
// =================================
function getProductName(item) {
    return (
        item.name ||
        item.productName ||
        item.title ||
        "Product"
    );
}
// =================================
// GET IMAGE
// =================================
function getProductImage(item) {
    return (
        item.image ||
        item.img ||
        item.productImage ||
        "/assets/images/placeholder.jpg"
    );
}
// =================================
// GET PRICE
// =================================
function getProductPrice(item) {
    return getNumber(
        item.price ??
        item.salePrice ??
        item.currentPrice ??
        0
    );
}
// =================================
// GET SIZE
// =================================
function getProductSize(item) {
    return (
        item.size ||
        item.selectedSize ||
        "Not selected"
    );
}
// =================================
// GET DISCOUNT
// =================================
function getProductDiscount(item) {
    return (
        item.discount ||
        item.discountPercent ||
        "0%"
    );
}
// =================================
// DISPLAY PRODUCTS
// =================================
function displayCheckoutProducts() {
    checkoutItems.innerHTML = "";
    // No products
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="empty-checkout">
                Your cart is empty.
            </div>
        `;
        itemCount.textContent = "0";
        checkoutSubtotal.textContent = "0.00$";
        shippingElement.textContent = "0.00$";
        taxesElement.textContent = "0.00$";
        checkoutTotal.textContent = "0.00$";
        return;
    }
    let subtotal = 0;
    let totalItems = 0;
    // =================================
    // LOOP THROUGH CART
    // =================================
    cart.forEach(function(item) {
        const name =
            getProductName(item);
        const image =
            getProductImage(item);
        const price =
            getProductPrice(item);
        const quantity =
            getQuantity(item);
        const size =
            getProductSize(item);
        const discount =
            getProductDiscount(item);
        // Product total
        const productTotal =
            price * quantity;
        subtotal += productTotal;
        totalItems += quantity;
        // =================================
        // CREATE PRODUCT
        // =================================
        const productElement =
            document.createElement("div");
        productElement.className =
            "checkout-product";
        productElement.innerHTML = `
            <img
                src="${image}"
                alt="${name}"
            >
            <div class="checkout-product-info">
                <div class="checkout-product-name">
                    ${name}
                </div>
                <div class="checkout-product-detail">
                    Size: ${size}
                </div>
                <div class="checkout-product-detail">
                    Quantity: ${quantity}
                </div>
                <div class="checkout-product-detail">
                    Discount: ${discount}
                </div>
                <div class="checkout-product-price">
                    ${productTotal.toFixed(2)}$
                </div>
            </div>
        `;
        checkoutItems.appendChild(
            productElement
        );
    });
    // =================================
    // TAX
    // =================================
    const taxes =
        subtotal * TAX_RATE;
    // =================================
    // TOTAL
    // =================================
    const total =
        subtotal +
        SHIPPING_FEE +
        taxes;
    // =================================
    // SHOW VALUES
    // =================================
    itemCount.textContent =
        totalItems;
    checkoutSubtotal.textContent =
        subtotal.toFixed(2) + "$";
    shippingElement.textContent =
        SHIPPING_FEE.toFixed(2) + "$";
    taxesElement.textContent =
        taxes.toFixed(2) + "$";
    checkoutTotal.textContent =
        total.toFixed(2) + "$";
}
// =================================
// PAYMENT METHOD
// =================================
const paymentMethods =
    document.querySelectorAll(".payment-method");
const cardForm =
    document.getElementById("cardForm");
paymentMethods.forEach(function(button) {
    button.addEventListener("click", function() {
        // Remove active from all
        paymentMethods.forEach(function(btn) {
            btn.classList.remove("active");
        });
        // Add active to clicked button
        button.classList.add("active");
        const method =
            button.dataset.method;
        // Show card form for Visa
        if (method === "visa") {
            cardForm.style.display = "block";
        } else {
            cardForm.style.display = "none";
        }
    });
});
// =================================
// SAVE CARD BUTTON
// =================================
const saveCardBtn =
    document.getElementById("saveCardBtn");
saveCardBtn.addEventListener("click", function() {
    const cardHolder =
        document.getElementById("cardHolder").value;
    const cardNumber =
        document.getElementById("cardNumber").value;
    const expiry =
        document.getElementById("expiry").value;
    const cvv =
        document.getElementById("cvv").value;
    if (
        cardHolder === "" ||
        cardNumber === "" ||
        expiry === "" ||
        cvv === ""
    ) {
        alert("Please fill in all card information.");
        return;
    }
    alert("Card information saved.");
});
// =================================
// CONFIRM PAYMENT
// =================================
const confirmPayment =
    document.getElementById("confirmPayment");
confirmPayment.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const selectedMethod =
        document.querySelector(
            ".payment-method.active"
        );
    let paymentMethod =
        selectedMethod
            ? selectedMethod.dataset.method
            : "paypal";
    if (paymentMethod === "paypal") {
        alert("Payment method: PayPal");
    } else if (paymentMethod === "visa") {
        const cardNumber =
            document.getElementById("cardNumber").value;
        if (cardNumber === "") {
            alert("Please enter your card information.");
            return;
        }
        alert("Payment method: Visa");
    }
    else if (paymentMethod === "cash") {
        alert("Payment method: Cash on delivery");
    }
});
// =================================
// HAMBURGER MENU
// =================================
function toggleMenu() {
    const navbar =
        document.getElementById("navbar");
    navbar.classList.toggle("active");
}
// =================================
// CART ICON
// =================================
const cartIcon =
    document.getElementById("cartIcon");
cartIcon.addEventListener("click", function() {
    window.location.href =
        "/carts/cart.html";
});
// =================================
// LOAD CHECKOUT
// =================================
displayCheckoutProducts();