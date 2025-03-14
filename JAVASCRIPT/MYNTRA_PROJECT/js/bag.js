const CONVINIENCE_FEE = 99; 
let bagItemObjects = [];
onLoad();

function onLoad(){
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItems = bagItemsObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemsObject.forEach(bagItems => {
    totalMRP += bagItems.original_price;
    totalDiscount += bagItems.original_price - bagItems.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVINIENCE_FEE;


  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹${CONVINIENCE_FEE}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
  `;
}

function loadBagItemObjects(){
  bagItemsObject = bagItems.map(itemId => {
    for (let i = 0; i < item.length; i++){
      if (item[i].id == itemId){
        return item[i];
      }
    }
  });
  console.log(bagItemsObject)
}

function displayBagItems(){
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemsObject.forEach(bagItems => {
    innerHTML += generateItemHTML(bagItems);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item){
  return `
  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="product_name">${item.product_name}</div>
      <div class="price">
        <span class="current_price">${item.current_price}</span>
        <span class="original_price">${item.original_price}</span>
        <span class="discount">(${item.discount_percent}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details"> Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick ="removeFromBag(${item.id})">X</div>
  </div>` ;

}