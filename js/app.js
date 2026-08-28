let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function addCart(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    let items = document.getElementById("cartItems");
    let totalElement = document.getElementById("total");

    if (!items || !totalElement) {
        return;
    }

    if (cart.length === 0) {

        items.innerHTML = "Cart is empty";
        totalElement.innerText = "0";

        return;
    }

    let total = 0;

    items.innerHTML = "";

    cart.forEach((item, index) => {

        let price = item.price * item.quantity;

        total += price;

        items.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>₹${price}</strong>

                <button onclick="removeCart(${index})">
                    ✕
                </button>

            </div>
        `;
    });

    totalElement.innerText = total;
}


function removeCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();
}


function checkout() {

    if (cart.length === 0) {

        alert("Please add food to cart first.");

        return;
    }

    window.location.href = "order.html";
}


function loadOrder() {

    let container = document.getElementById("orderItems");
    let totalElement = document.getElementById("orderTotal");

    if (!container || !totalElement) {
        return;
    }

    if (cart.length === 0) {

        container.innerHTML = "No items in order.";

        return;
    }

    let total = 0;

    container.innerHTML = "";

    cart.forEach(item => {

        let price = item.price * item.quantity;

        total += price;

        container.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>₹${price}</strong>

            </div>
        `;
    });

    totalElement.innerText = total;
}


function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    let token =
        Math.floor(Math.random() * 900) + 100;

    let order =
        "SC" + Math.floor(Math.random() * 9000 + 1000);

    localStorage.setItem("token", token);

    localStorage.setItem("orderId", order);

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(cart)
    );

    cart = [];

    saveCart();

    window.location.href = "token.html";
}


function loadToken() {

    let tokenElement =
        document.getElementById("tokenNumber");

    let orderElement =
        document.getElementById("orderId");

    if (!tokenElement || !orderElement) {
        return;
    }

    tokenElement.innerText =
        localStorage.getItem("token") || "024";

    orderElement.innerText =
        localStorage.getItem("orderId") || "SC1024";
}


function login() {

    let id =
        document.getElementById("loginId").value;

    let password =
        document.getElementById("loginPassword").value;

    if (id === "" || password === "") {

        alert("Please enter Student ID and Password.");

        return;
    }

    localStorage.setItem("studentId", id);

    window.location.href = "menu.html";
}


function register() {

    let name =
        document.getElementById("registerName").value;

    let id =
        document.getElementById("registerId").value;

    let email =
        document.getElementById("registerEmail").value;

    let password =
        document.getElementById("registerPassword").value;

    if (
        name === "" ||
        id === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill all fields.");

        return;
    }

    localStorage.setItem("studentName", name);

    localStorage.setItem("studentId", id);

    alert("Registration successful!");

    window.location.href = "menu.html";
}


function loadProfile() {

    let name =
        localStorage.getItem("studentName");

    let id =
        localStorage.getItem("studentId");

    let profileName =
        document.getElementById("profileName");

    let profileId =
        document.getElementById("profileId");

    if (profileName && name) {
        profileName.innerText = name;
    }

    if (profileId && id) {
        profileId.innerText = id;
    }
}


function showCategory(category) {

    let foods =
        document.querySelectorAll(".food-card");

    foods.forEach(food => {

        if (
            category === "all" ||
            food.dataset.category === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


document.addEventListener("DOMContentLoaded", function() {

    updateCart();

    loadOrder();

    loadToken();

    loadProfile();

});
