/**
 * 订单查看页面业务逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
  // 检查是否选择了桌号
  const tableNumber = Storage.getCurrentTable();
  if (!tableNumber) {
    alert('请先选择桌号');
    window.location.href = 'index.html';
    return;
  }

  // 显示桌号
  document.getElementById('tableNumber').textContent = tableNumber + '号桌';

  // 加载订单数据
  loadOrders();
});

// 加载订单数据
function loadOrders() {
  const tableNumber = parseInt(Storage.getCurrentTable());
  const orders = Storage.getOrdersByTable(tableNumber);

  if (orders.length === 0) {
    document.getElementById('emptyState').classList.remove('hidden');
    document.getElementById('ordersList').classList.add('hidden');
    return;
  }

  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('ordersList').classList.remove('hidden');

  // 计算统计数据
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === '待上菜').length;
  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  document.getElementById('totalOrders').textContent = totalOrders;
  document.getElementById('pendingOrders').textContent = pendingOrders;
  document.getElementById('totalAmount').textContent = totalAmount.toFixed(0);

  // 渲染订单列表（按时间倒序）
  const ordersList = document.getElementById('ordersList');
  ordersList.innerHTML = '';

  // 倒序排列，最新的订单在上面
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

  sortedOrders.forEach(order => {
    const orderCard = createOrderCard(order);
    ordersList.appendChild(orderCard);
  });
}

// 创建订单卡片
function createOrderCard(order) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden';

  // 状态颜色
  const statusColors = {
    '待上菜': 'bg-yellow-100 text-yellow-800',
    '已上菜': 'bg-green-100 text-green-800',
    '已结账': 'bg-gray-100 text-gray-800'
  };

  card.innerHTML = `
    <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 md:p-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div class="text-xs md:text-sm opacity-90">订单号</div>
          <div class="text-base md:text-lg lg:text-xl font-bold">#${order.orderNumber}</div>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <div class="text-right">
            <div class="text-xs md:text-sm opacity-90">下单时间</div>
            <div class="text-xs md:text-base">${order.createTime}</div>
          </div>
          <span class="status-badge ${statusColors[order.status]} text-xs md:text-sm px-2 md:px-3 py-1">${order.status}</span>
        </div>
      </div>
    </div>

    <div class="p-3 md:p-4 lg:p-6">
      <!-- 菜品列表 -->
      <div class="space-y-2 md:space-y-3 mb-3 md:mb-4">
        ${order.dishes.map(dish => `
          <div class="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b">
            <img src="${dish.image}" alt="${dish.name}" class="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0">
            <div class="flex-1 min-w-0">
              <div class="text-sm md:text-base lg:text-lg font-medium text-gray-800 truncate">${dish.name}</div>
              <div class="text-xs md:text-sm text-gray-500">¥${dish.price} × ${dish.quantity}</div>
            </div>
            <div class="text-sm md:text-base lg:text-lg font-bold text-amber-600 flex-shrink-0">¥${(dish.price * dish.quantity).toFixed(0)}</div>
          </div>
        `).join('')}
      </div>

      ${order.note ? `
        <div class="bg-gray-50 p-2 md:p-3 rounded-lg mb-3 md:mb-4">
          <div class="text-xs md:text-sm text-gray-600 mb-1">备注</div>
          <div class="text-sm md:text-base text-gray-800">${order.note}</div>
        </div>
      ` : ''}

      <div class="flex items-center justify-between pt-3 md:pt-4 border-t-2">
        <div class="text-base md:text-lg lg:text-xl font-medium text-gray-700">订单总额</div>
        <div class="text-xl md:text-2xl lg:text-3xl font-bold text-amber-600">¥${order.totalPrice.toFixed(0)}</div>
      </div>
    </div>
  `;

  return card;
}

  // 格式化时间
  const createTime = new Date(order.createTime);
  const timeStr = `${createTime.getFullYear()}-${String(createTime.getMonth()+1).padStart(2,'0')}-${String(createTime.getDate()).padStart(2,'0')} ${String(createTime.getHours()).padStart(2,'0')}:${String(createTime.getMinutes()).padStart(2,'0')}`;

  // 状态颜色
  const statusClass = `status-${order.status}`;

  card.innerHTML = `
    <div class="p-6">
      <!-- 订单头部 -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-sm text-gray-500">订单编号</div>
          <div class="text-lg font-bold text-gray-800">#${order.id}</div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500 mb-1">下单时间</div>
          <div class="text-gray-700">${timeStr}</div>
        </div>
        <div>
          <span class="status-badge ${statusClass}">${order.status}</span>
        </div>
      </div>

      <!-- 菜品列表 -->
      <div class="mb-4">
        <div class="text-lg font-medium text-gray-800 mb-3">菜品清单</div>
        <div class="space-y-2">
          ${order.dishes.map(dish => `
            <div class="flex items-center justify-between py-2 border-b border-gray-100">
              <div class="flex items-center gap-3">
                <img src="${dish.image}" alt="${dish.name}" class="w-16 h-16 rounded-lg object-cover">
                <div>
                  <div class="font-medium text-gray-800">${dish.name}</div>
                  <div class="text-sm text-gray-500">¥${dish.price} x ${dish.quantity}</div>
                </div>
              </div>
              <div class="text-lg font-medium text-amber-600">¥${(dish.price * dish.quantity).toFixed(0)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 备注 -->
      ${order.note ? `
        <div class="mb-4 p-3 bg-amber-50 rounded-lg">
          <div class="text-sm font-medium text-amber-800 mb-1">备注</div>
          <div class="text-gray-700">${order.note}</div>
        </div>
      ` : ''}

      <!-- 订单总额 -->
      <div class="flex items-center justify-between pt-4 border-t-2">
        <div class="text-xl font-bold text-gray-800">订单总额</div>
        <div class="text-3xl font-bold text-amber-600">¥${order.totalPrice.toFixed(0)}</div>
      </div>
    </div>
  `;

  return card;
}

// 继续点餐
function continueShopping() {
  window.location.href = 'menu.html';
}

// 返回选桌
function goBack() {
  window.location.href = 'index.html';
}
