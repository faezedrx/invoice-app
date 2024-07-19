let items = [];
let totalAmount = 0;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemTotal = itemQuantity * itemPrice;

    items.push({ name: itemName, quantity: itemQuantity, price: itemPrice, total: itemTotal });

    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemPrice').value = '';

    generateInvoice(); // Re-generate invoice table after adding an item
}

function generateInvoice() {
    const tbody = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    items.forEach((item, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.quantity;
        row.insertCell(2).innerText = '$' + item.price;
        row.insertCell(3).innerText = '$' + item.total;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editItem(${index})" class="text-blue-500 hover:underline">Edit</button> 
                                 <button onclick="deleteItem(${index})" class="text-red-500 hover:underline">Delete</button>`;
    });

    totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('totalAmount').innerText = 'Total Amount: $' + totalAmount;
}

function editItem(index) {
    const item = items[index];
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemQuantity').value = item.quantity;
    document.getElementById('itemPrice').value = item.price;
    deleteItem(index); // Remove item from list to allow editing
}

function deleteItem(index) {
    items.splice(index, 1);
    generateInvoice();
}

function printInvoice() {
    window.print();
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.html(document.getElementById('invoice'), {
        callback: function (doc) {
            doc.save('invoice.pdf');
        },
        x: 10,
        y: 10
    });
}

function downloadImage() {
    html2canvas(document.getElementById('invoice')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'invoice.png';
        link.click();
    });
}
