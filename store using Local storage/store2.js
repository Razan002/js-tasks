const cart = JSON.parse(localStorage.getItem('cart')) || []; // استرجاع السلة أو البدء بسلة فارغة
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');

// تحديث السلة في Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // تحويل السلة إلى نص JSON
}

// تحديث واجهة السلة
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <span>${item.name} (${item.imageName})</span>
            <span>Quantity: ${item.quantity}</span>
            <span>Price: ${item.quantity * item.price}jd</span>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        total += item.quantity * item.price;
    });

    totalPriceElement.textContent = total;

    // حفظ السلة في Local Storage
    saveCartToLocalStorage( );

    // إضافة حدث إزالة المنتج
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// إضافة المنتجات إلى السلة
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const name = productCard.getAttribute('data-name');
        const price = parseFloat(productCard.getAttribute('data-price'));
        const image = productCard.getAttribute('data-image');
        const imageName = productCard.getAttribute('data-image-name');

        // تحقق مما إذا كان المنتج موجودًا في السلة
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1, image, imageName });
        }

        updateCart();
    });
});

// استرجاع البيانات عند تحميل الصفحة
window.addEventListener('load', () => {
    updateCart(); // تحديث واجهة المستخدم
});


