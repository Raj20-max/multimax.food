// Main JavaScript file for the food ordering application

// Function to initialize the application
function initApp() {
    // Fetch menu items and render them
    fetchMenuItems();
}

// Function to fetch menu items from the menu component
function fetchMenuItems() {
    // Assuming menu.js exports a function called getMenuItems
    import('./components/menu.js')
        .then(module => {
            const menuItems = module.getMenuItems();
            renderMenu(menuItems);
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
        });
}

// Function to render the menu items on the page
function renderMenu(menuItems) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = ''; // Clear existing menu items

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span>$${item.price}</span>
            <button onclick="addToOrder('${item.id}')">Add to Order</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function placeOrder() {
    const foodName = document.getElementById('popup-name').innerText;
    alert(`Order placed successfully for ${foodName}!`);
    closePopup();
}





// Function to handle adding items to the order
function addToOrder(itemId) {
    // Logic to add the selected item to the order
    console.log(`Item ${itemId} added to order.`);
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Array to store orders
let orderList = [];

function placeOrder() {
    const foodName = document.getElementById('popup-name').innerText;
    const price = document.getElementById('popup-price').innerText;
    const shop = document.getElementById('popup-shop').innerText;

    // Add to order list
    orderList.push({foodName, price, shop});

    // Show success message
    alert(`Order Successful!\nYou ordered: ${foodName}`);

    // Close popup
    closePopup();

    // Update order list in menu page if exists
    updateOrderListUI();
}

// Array to store orders
let orderList = [];

function placeOrder() {
    const foodName = document.getElementById('popup-name').innerText;
    const price = document.getElementById('popup-price').innerText;
    const shop = document.getElementById('popup-shop').innerText;

    // Add to order list
    orderList.push({foodName, price, shop});

    // Show success message
    alert(`Order Successful!\nYou ordered: ${foodName}`);

    // Close popup
    closePopup();

    // Update order list in menu page if exists
    updateOrderListUI();
}

function updateOrderListUI() {
    const orderContainer = document.getElementById('order-list');
    if (!orderContainer) return; // skip if menu page doesn't have order list

    orderContainer.innerHTML = ''; // clear previous
    orderList.forEach((order, index) => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = `
            <p><strong>${index + 1}. ${order.foodName}</strong> - ${order.price} (${order.shop})</p>
        `;
        orderContainer.appendChild(div);
    });
}
// Array to store orders
let orderList = [];

// Add order function
function placeOrder() {
    const foodName = document.getElementById('popup-name').innerText;
    const priceText = document.getElementById('popup-price').innerText; // e.g. "$12"
    const price = parseFloat(priceText.replace('$',''));
    const shop = document.getElementById('popup-shop').innerText;

    // Check if this food is already in orderList
    const existing = orderList.find(item => item.foodName === foodName);
    if(existing){
        existing.qty += 1;
    } else {
        orderList.push({foodName, price, shop, qty: 1});
    }

    alert(`Order Successful!\nYou ordered: ${foodName}`);
    closePopup();
    updateOrderListUI();
}

// Update Order List UI
function updateOrderListUI() {
    const orderContainer = document.getElementById('order-list');
    if (!orderContainer) return;

    orderContainer.innerHTML = '';
    let totalPrice = 0;

    orderList.forEach((order, index) => {
        totalPrice += order.price * order.qty;

        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = `
            <p><strong>${order.foodName}</strong> - ${order.shop}</p>
            <p>Price: $${order.price} x <span id="qty-${index}">${order.qty}</span> = $<span id="subtotal-${index}">${(order.price * order.qty).toFixed(2)}</span></p>
            <button onclick="changeQty(${index}, -1)">−</button>
            <button onclick="changeQty(${index}, 1)">+</button>
        `;
        orderContainer.appendChild(div);
    });

    // Show total price
    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '1rem';
    totalDiv.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
    orderContainer.appendChild(totalDiv);
}

// Change quantity function
function changeQty(index, delta) {
    orderList[index].qty += delta;
    if(orderList[index].qty < 1) orderList[index].qty = 1;
    updateOrderListUI();
}

function placeOrder() {
    const foodName = document.getElementById('popup-name').innerText;
    const priceText = document.getElementById('popup-price').innerText;
    const price = parseFloat(priceText.replace('$',''));
    const shop = document.getElementById('popup-shop').innerText;

    // Get existing orders from localStorage
    let orderList = JSON.parse(localStorage.getItem('orders')) || [];

    // Check if this food is already ordered
    const existing = orderList.find(item => item.foodName === foodName);
    if(existing){
        existing.qty += 1;
    } else {
        orderList.push({foodName, price, shop, qty: 1});
    }

    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(orderList));

    alert(`Order Successful!\nYou ordered: ${foodName}`);
    closePopup();
}

function loadOrders() {
    const orderContainer = document.getElementById('order-list');
    let orderList = JSON.parse(localStorage.getItem('orders')) || [];

    if(orderList.length === 0){
        orderContainer.innerHTML = '<p>No orders yet.</p>';
        return;
    }

    orderContainer.innerHTML = '';
    let totalPrice = 0;

    orderList.forEach((order, index) => {
        totalPrice += order.price * order.qty;
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = `
            <p><strong>${order.foodName}</strong> - ${order.shop}</p>
            <p>Price: $${order.price} x <span id="qty-${index}">${order.qty}</span> = $<span id="subtotal-${index}">${(order.price * order.qty).toFixed(2)}</span></p>
            <button onclick="changeQty(${index}, -1)">−</button>
            <button onclick="changeQty(${index}, 1)">+</button>
        `;
        orderContainer.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '1rem';
    totalDiv.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
    orderContainer.appendChild(totalDiv);
}

// Update qty and save back to localStorage
function changeQty(index, delta) {
    let orderList = JSON.parse(localStorage.getItem('orders')) || [];
    orderList[index].qty += delta;
    if(orderList[index].qty < 1) orderList[index].qty = 1;

    localStorage.setItem('orders', JSON.stringify(orderList));
    loadOrders();
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadOrders);
