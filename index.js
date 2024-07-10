document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');

    // Loading items from my localStorage
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    renderList(items);

    addItemButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            items.push({ text: itemText, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList(items);
        }
    });

    clearListButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList(items);
    });

    shoppingList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains('purchase-button')) {
            const index = e.target.dataset.index;
            items[index].purchased = !items[index].purchased;
            updateLocalStorage();
            renderList(items);
        }
    });

    function renderList(items) {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.dataset.index = index;

            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = item.purchased ? 'Unmark' : 'Mark as Purchased';
            purchaseButton.classList.add('purchase-button');
            purchaseButton.dataset.index = index;

            li.appendChild(purchaseButton);
            if (item.purchased) {
                li.classList.add('purchased');
            }

            shoppingList.appendChild(li);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
});
