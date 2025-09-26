const menu = [
   

    {name: 'Pizza', price: '$12', rating: '4.5⭐', shop: 'Pizza Hut', img: 'https://via.placeholder.com/150?text=Pizza'},
    {name: 'Burger', price: '$8', rating: '4.2⭐', shop: 'McDonalds', img: 'https://via.placeholder.com/150?text=Burger'},
    {name: 'Sushi', price: '$15', rating: '4.8⭐', shop: 'Sushi World', img: 'https://via.placeholder.com/150?text=Sushi'},
    {name: 'Pasta', price: '$10', rating: '4.3⭐', shop: 'Italiano', img: 'https://via.placeholder.com/150?text=Pasta'},
    {name: 'Sandwich', price: '$6', rating: '4.1⭐', shop: 'Subway', img: 'https://via.placeholder.com/150?text=Sandwich'},
    {name: 'Tacos', price: '$9', rating: '4.4⭐', shop: 'Taco Bell', img: 'https://via.placeholder.com/150?text=Tacos'},
    {name: 'Dosa', price: '$5', rating: '4.6⭐', shop: 'Indian Spice', img: 'https://via.placeholder.com/150?text=Dosa'},
    {name: 'Paneer Butter Masala', price: '$11', rating: '4.7⭐', shop: 'Curry House', img: 'https://via.placeholder.com/150?text=Paneer'},
    {name: 'Ice Cream', price: '$4', rating: '4.9⭐', shop: 'Cold Stone', img: 'https://via.placeholder.com/150?text=Ice+Cream'},
    {name: 'Fried Rice', price: '$7', rating: '4.3⭐', shop: 'Wok & Roll', img: 'https://via.placeholder.com/150?text=Fried+Rice'},
    {name: 'Noodles', price: '$6', rating: '4.2⭐', shop: 'Noodle House', img: 'https://via.placeholder.com/150?text=Noodles'},
    {name: 'Chicken Wings', price: '$12', rating: '4.5⭐', shop: 'Buffalo Grill', img: 'https://via.placeholder.com/150?text=Wings'},
];




const suggestions = [
    {
        id: 101,
        name: "Paneer Tikka",
        price: 199,
        shop: "Punjabi Dhaba",
        img: "https://images.unsplash.com/photo-1505250463726-0d238b6b09b0?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 102,
        name: "Chicken Biryani",
        price: 249,
        shop: "Hyderabad House",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 103,
        name: "Masala Dosa",
        price: 99,
        shop: "South Spice",
        img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 104,
        name: "Veg Burger",
        price: 149,
        shop: "Burger Hub",
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 105,
        name: "French Fries",
        price: 99,
        shop: "Snack Point",
        img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 106,
        name: "Chocolate Shake",
        price: 129,
        shop: "Cool Cafe",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 107,
        name: "Pizza Margherita",
        price: 299,
        shop: "Pizza Palace",
        img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 108,
        name: "Fish & Chips",
        price: 399,
        shop: "Western Dine",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 109,
        name: "Pasta Alfredo",
        price: 249,
        shop: "Italiano",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80"
    },
    {
        id: 110,
        name: "Samosa",
        price: 49,
        shop: "Street Bites",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80"
    }
];

let order = [];

const DEFAULT_IMG = "https://via.placeholder.com/40?text=No+Image";
let currentCategory = "all";
let currentSort = "default";

function getFilteredSortedMenu() {
    let filtered = menu;
    if (currentCategory !== "all") {
        if (currentCategory === "veg" || currentCategory === "nonveg") {
            filtered = filtered.filter(item => item.category === currentCategory);
        } else {
            filtered = filtered.filter(item => item.cuisine === currentCategory);
        }
    }
    if (currentSort === "low") {
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (currentSort === "high") {
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }
    return filtered;
}

function renderMenu() {
    const menuItemsDiv = document.getElementById('menu-items');
    if (!menuItemsDiv) return;
    menuItemsDiv.innerHTML = '';
    const filteredMenu = getFilteredSortedMenu();
    filteredMenu.forEach(item => {
        const imgSrc = item.img ? item.img : DEFAULT_IMG;
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${imgSrc}" alt="${item.name}" class="menu-img" onerror="this.src='${DEFAULT_IMG}'">
            <span>
                <strong>${item.name}</strong><br>
                ₹${item.price}
                <br>
                <span class="menu-cat">${item.category === "veg" ? "Veg" : "Non Veg"} | ${item.cuisine.charAt(0).toUpperCase() + item.cuisine.slice(1)}</span>
            </span>
            <button onclick="addToOrder(${item.id})">Add</button>
        `;
        menuItemsDiv.appendChild(div);
    });
}

function addToOrder(id) {
    const item = menu.find(m => m.id === id);
    if (item) {
        order.push(item);
        renderSummary();
    }
}

function renderSummary() {
    const summaryDiv = document.getElementById('summary');
    if (!summaryDiv) return;
    if (order.length === 0) {
        summaryDiv.innerHTML = '<em>No items added yet.</em>';
        return;
    }
    let total = 0;
    summaryDiv.innerHTML = order.map((item, idx) => {
        total += item.price;
        const imgSrc = item.img ? item.img : DEFAULT_IMG;
        return `<div class="order-row">
            <img src="${imgSrc}" alt="${item.name}" class="menu-img" onerror="this.src='${DEFAULT_IMG}'">
            <span>${item.name} - ₹${item.price}</span>
            <button class="plus-btn" onclick="addToOrder(${item.id})">+</button>
            <button class="remove-btn" onclick="removeFromOrder(${idx})">✕</button>
        </div>`;
    }).join('');
    summaryDiv.innerHTML += `<hr><strong>Total: ₹${total}</strong>`;
}

function removeFromOrder(idx) {
    order.splice(idx, 1);
    renderSummary();
}

function renderSuggestions() {
    const suggestionsDiv = document.getElementById('food-suggestions');
    if (!suggestionsDiv) return;
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="suggestion-img">
            <div class="suggestion-info">
                <strong>${item.name}</strong><br>
                ₹${item.price} &bull; <span class="shop">${item.shop}</span>
            </div>
        `;
        suggestionsDiv.appendChild(div);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderSummary();
    renderSuggestions();

    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    if (categoryFilter) {
        categoryFilter.onchange = function() {
            currentCategory = categoryFilter.value;
            renderMenu();
        };
    }
    if (sortFilter) {
        sortFilter.onchange = function() {
            currentSort = sortFilter.value;
            renderMenu();
        };
    }
});

const placeOrderBtn = document.getElementById('place-order-btn');
if (placeOrderBtn) {
    placeOrderBtn.onclick = function() {
        if (order.length === 0) {
            alert('Please add items to your order!');
            return;
        }
        alert('Order placed successfully!\nThank you for ordering.');
        order = [];
        renderSummary();
    };
}

function quickCategory(cat) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = cat;
        currentCategory = cat;
        renderMenu();
    }
}

const searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('input', function() {
        const query = searchBar.value.trim().toLowerCase();
        const menuItemsDiv = document.getElementById('menu-items');
        if (!menuItemsDiv) return;
        let filteredMenu = getFilteredSortedMenu();
        if (query) {
            filteredMenu = filteredMenu.filter(item =>
                item.name.toLowerCase().includes(query) ||
                (item.cuisine && item.cuisine.toLowerCase().includes(query)) ||
                (item.category && item.category.toLowerCase().includes(query))
            );
        }
        menuItemsDiv.innerHTML = '';
        filteredMenu.forEach(item => {
            const imgSrc = item.img ? item.img : DEFAULT_IMG;
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${imgSrc}" alt="${item.name}" class="menu-img" onerror="this.src='${DEFAULT_IMG}'">
                <span>
                    <strong>${item.name}</strong><br>
                    ₹${item.price}
                    <br>
                    <span class="menu-cat">${item.category === "veg" ? "Veg" : "Non Veg"} | ${item.cuisine.charAt(0).toUpperCase() + item.cuisine.slice(1)}</span>
                </span>
                <button onclick="addToOrder(${item.id})">Add</button>
            `;
            menuItemsDiv.appendChild(div);
        });
    });
}