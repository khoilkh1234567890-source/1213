
const grid = document.getElementById('productGrid');

PRODUCTS.forEach(p => {
 
  const badge = p.badge ? BADGES[p.badge] : null;
  const badgeHtml = badge
    ? `<span class="card__badge" style="background:${badge.color}">${badge.text}</span>`
    : '';


  const oldPriceHtml = p.oldPrice
    ? `<span class="card__price-old">${formatPrice(p.oldPrice)}</span>`
    : '';

  grid.innerHTML += `
    <div class="card">
      <div class="card__img">
        ${p.name}
      </div>
      ${badgeHtml}
      <div class="card__body">
        <div class="card__cat">${p.category}</div>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__price">
          <span class="card__price-now">${formatPrice(p.price)}</span>
          ${oldPriceHtml}
        </div>
        <div class="card__rating">
          <span class="stars">★★★★★</span>
          <span>${p.rating}</span>
        </div>
        <div class="card__actions">
          <button class="card__btn" onclick="addToCart(${p.id})">THÊM VÀO GIỎ</button>
          <a href="#" class="card__link">Xem nhanh</a>
        </div>
      </div>
    </div>
  `;
});