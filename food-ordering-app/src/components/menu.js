const menuItems = [
    { id: 1, name: "Pizza", price: 9.99 },
    { id: 2, name: "Burger", price: 5.99 },
    { id: 3, name: "Pasta", price: 7.99 },
    { id: 4, name: "Salad", price: 4.99 },
];

function renderMenu() {
    const menuContainer = document.getElementById("menu");
    menuContainer.innerHTML = "";

    menuItems.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        console.log(`${item.name} added to cart.`);
        // Here you can add functionality to update the cart state
    }
}

export { renderMenu, addToCart };