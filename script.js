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
}

function generateInvoice() {
    const tbody = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    items.forEach(item => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.quantity;
        row.insertCell(2).innerText = item.price + ' تومان';
        row.insertCell(3).innerText = item.total + ' تومان';
    });

    totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('totalAmount').innerText = 'مجموع کل: ' + totalAmount + ' تومان';
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
