// script.js

let items = [];

function addItem() {
  const clientName = document.getElementById("client-name").value;
  const item = document.getElementById("item").value;
  const price = parseFloat(document.getElementById("price").value);

  if (!item || isNaN(price)) {
    alert("Please enter valid item and price.");
    return;
  }

  items.push({ item, price });

  // Update preview
  document.getElementById("display-client-name").innerText = clientName;

  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  let total = 0;

  items.forEach(({ item, price }) => {
    const li = document.createElement("li");
    li.textContent = `${item} - $${price.toFixed(2)}`;
    itemList.appendChild(li);
    total += price;
  });

  document.getElementById("total").innerText = total.toFixed(2);

  // Clear inputs
  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
}

// PDF download using jsPDF
function downloadPDF() {
  const client = document.getElementById("display-client-name").innerText;
  const total = document.getElementById("total").innerText;

  let content = `Invoice for ${client}\n\n`;

  items.forEach(({ item, price }) => {
    content += `${item} - $${price.toFixed(2)}\n`;
  });

  content += `\nTotal: $${total}`;

  const doc = new window.jspdf.jsPDF();
  doc.text(content, 10, 10);
  doc.save("invoice.pdf");
}
