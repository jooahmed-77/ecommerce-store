// 1. مصفوفة المنتجات (Products Data)
const products = [
    {
        id: 1,
        title: "تيشيرت أداء رياضي (Gym Compression Shirt)",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600"
    },
    {
        id: 2,
        title: "بنطال رياضي مريح (Training Joggers)",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=600"
    },
    {
        id: 3,
        title: "سترة رياضية هودي (Gym Oversized Hoodie)",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600"
    },
    {
        id: 4,
        title: "شورت تمارين ضغط (Pro Training Shorts)",
        price: 30.00,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600"
    }
];

// سلة الشراء (Cart Array)
let cart = [];

// 2. تحديد عناصر الـ DOM
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// 3. عرض المنتجات في الصفحة
function renderProducts() {
    if (!productsContainer) return;
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    إضافة للسلة <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// 4. فتح وإغلاق السلة الجانبية
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });
}

function closeCart() {
    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (overlay) overlay.addEventListener('click', closeCart);

// 5. إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    if (cartSidebar && overlay) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    }
}

// 6. حذف منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 7. تحديث واجهة السلة (UI) والحسابات
function updateCartUI() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#64748b; margin-top:20px;">السلة فارغة حالياً</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <span>$${item.price.toFixed(2)} × ${item.quantity}</span>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) cartCountElement.textContent = totalCount;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// تشغيل دالة عرض المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});