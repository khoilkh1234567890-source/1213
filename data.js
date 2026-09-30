
const PRODUCTS = [
  { id: 1,  name: 'Bàn học sinh đơn Ergo',           category: 'BÀN GHẾ',      price: 1250000,  oldPrice: 0,        badge: 'best', desc: 'Chỉnh độ cao, mặt gỗ phủ laminate', rating: '4,8/5 (125)' },
  { id: 2,  name: 'Bàn ghế liền đôi Classic',        category: 'BÀN GHẾ',      price: 1890000,  oldPrice: 2150000,  badge: 'sale', desc: 'Khung thép, mặt MFC, ghế băng',      rating: '4,7/5 (98)' },
  { id: 3,  name: 'Ghế học sinh Ergo cỡ 4',          category: 'BÀN GHẾ',      price: 620000,   oldPrice: 0,        badge: '',     desc: 'Tựa lưng đúc, cỡ 4 (140–160cm)',     rating: '4,9/5 (210)' },
  { id: 4,  name: 'Bàn giáo viên có ngăn khóa',      category: 'BÀN GHẾ',      price: 3450000,  oldPrice: 0,        badge: '',     desc: 'Rộng 1200mm, 3 ngăn kéo có khóa',    rating: '4,8/5 (64)' },
  { id: 5,  name: 'Bộ máy tính để bàn phòng học',    category: 'MÁY TÍNH',     price: 11450000, oldPrice: 0,        badge: 'new',  desc: 'Core i5, RAM 8GB, SSD 256GB, màn 22"', rating: '4,8/5 (64)' },
  { id: 6,  name: 'Máy chiếu lớp học 4000 lumen',    category: 'MÁY TÍNH',     price: 9780000,  oldPrice: 0,        badge: '',     desc: 'Độ phân giải XGA, cổng HDMI, kèm giá treo', rating: '4,6/5 (37)' },
  { id: 7,  name: 'Màn hình tương tác 65 inch',      category: 'MÁY TÍNH',     price: 38500000, oldPrice: 42000000, badge: 'sale', desc: 'Cảm ứng 20 điểm, Android 11',        rating: '4,9/5 (21)' },
  { id: 8,  name: 'Bộ phát Wi-Fi 6 gắn trần',        category: 'MÁY TÍNH',     price: 2340000,  oldPrice: 0,        badge: '',     desc: 'Chuẩn AX1800, cấp nguồn POE',        rating: '4,7/5 (58)' },
  { id: 9,  name: 'Camera IP ngoài trời 4MP',        category: 'CAMERA',       price: 1980000,  oldPrice: 0,        badge: 'new',  desc: 'Hồng ngoại 30m, chống nước IP67',    rating: '4,6/5 (41)' },
  { id: 10, name: 'Camera IP trong nhà 3MP',         category: 'CAMERA',       price: 1290000,  oldPrice: 0,        badge: '',     desc: 'Góc rộng 110°, đàm thoại 2 chiều',   rating: '4,5/5 (76)' },
  { id: 11, name: 'Đầu ghi hình NVR 8 kênh',         category: 'CAMERA',       price: 5640000,  oldPrice: 6200000,  badge: 'sale', desc: 'Hỗ trợ 8 camera POE, kèm ổ 2TB',     rating: '4,7/5 (44)' },
  { id: 12, name: 'Loa hội trường 400W kèm micro',   category: 'ÂM THANH',     price: 9900000,  oldPrice: 11600000, badge: 'sale', desc: 'Loa 2 đường tiếng, 2 micro UHF',     rating: '4,7/5 (77)' }
];


const BADGES = {
  best: { text: 'BÁN CHẠY', color: '#0066cc' },
  sale: { text: 'GIẢM GIÁ', color: '#d97706' },
  new:  { text: 'MỚI',      color: '#22a06b' }
};


const CART_KEY = 'cart';


function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}


function addToCart(id, qty = 1) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      qty: qty
    });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);

  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}


function getCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function getSubtotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function getShipping() {
  const st = getSubtotal();
  if (st === 0) return 0;
  return st >= 2000000 ? 0 : 50000;
}

function getTotal() {
  return getSubtotal() + getShipping();
}


function formatPrice(n) {
  return n.toLocaleString('vi-VN') + '₫';
}

function updateBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const total = getCount();
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateBadge);