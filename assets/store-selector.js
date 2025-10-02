 // --- 商品タグのチェック ---
const productTagCache = {};
//api url
const apiUrl="https://www.merida.jp/shopsearch";

async function getProductTags(handle) {
  if (productTagCache[handle]) return productTagCache[handle];
  try {
    const res = await fetch(`/products/${handle}.js`);
    const product = await res.json();
    productTagCache[handle] = product.tags;
    return product.tags;
  } catch (e) {
    console.error('商品データの取得に失敗:', handle);
    return [];
  }
}

async function checkCartForStorePickup() {
  const button = document.getElementById('store-selector-button');
  const modal = document.getElementById('store-selector-modal');
  const pickupInfo = document.getElementById('pickup-info');
 const checkout_b = document.getElementById("checkout");
  const div_comment_store = document.getElementById("comment-store");
  if (!button || !modal) return;

  try {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    const storePickupHandles = window.storePickupProductHandles || [];

    const hasStorePickup = cart.items.some(item =>
      storePickupHandles.includes(item.handle)
    );
    
    //送料無料計算機能
    calc_freeDelivery(cart.total_price);
    
    if (hasStorePickup) {
      button.style.display = 'inline-block';
      if(pickupInfo)
        pickupInfo.style.display = 'inline-block';
    } else {
      button.style.display = 'none';
      modal.style.display = 'none';
      if(pickupInfo)
         pickupInfo.style.display = 'none';
      if(checkout_b){
        checkout_b.disabled=false;
      }
      div_comment_store.style.display = 'none'

    }
  } catch (err) {
    console.error('checkCartForStorePickup エラー:', err);
  }
}

//送料無料計算機能
function calc_freeDelivery(t_price) {
  const freeShippingThreshold = window.freeShippingThreshold;;
    const currentSubtotal = t_price / 100; // 単位が「円」に変換
    const messageBox = document.getElementById('free-shipping-message');
    if (!messageBox) return;

    if (currentSubtotal >= freeShippingThreshold) {
         messageBox.innerHTML = '🎉<span style="color: red;">送料無料</span>でお買い物いただけます。';
    } else {
         const remaining = freeShippingThreshold - currentSubtotal;
         messageBox.textContent = `🚚 あと ${remaining.toLocaleString()}円で送料無料になります。`;
    }
}

function observeCartDomChanges() {
  const cartItems = document.querySelector('cart-items');
  if (!cartItems) {
    console.warn('🔍 <cart-items> が見つかりません。監視できません。');
    return;
  }

  const observer = new MutationObserver(() => {
    console.log('🔁 cart-items内のDOM変更を検知 → 再チェック実行');
    checkCartForStorePickup();
  });

  observer.observe(cartItems, {
    childList: true,
    subtree: true,
  });
}

// --- モーダルの開閉 ---
function openStoreSelector() {
  loadPrefectures();
  const modal = document.getElementById('store-selector-modal');
  if (modal) {
    modal.style.display = 'flex'; // flexで表示
  }
}

function closeStoreSelector() {
  const modal = document.getElementById('store-selector-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// --- 選択店舗の確定 ---
function confirmStoreSelection() {
  const select = document.getElementById('store-select');
  const selectedValue = select.value;
  if (!selectedValue) {
    alert('店舗を選択してください');
    return;
  }

  const storeInfo = JSON.parse(selectedValue);
  const displayText = `【受取店舗】\n${storeInfo.name}\n${storeInfo.address}\n${storeInfo.tel}`;
  document.getElementById('selected-store-display').innerText = displayText;
  document.getElementById('selected-store-input').value =`${storeInfo.name}｜${storeInfo.address}｜${storeInfo.tel}`; 
  
  closeStoreSelector();
}

function loadPrefectures() {
  Promise.all([
    fetch( window.prefectureDataUrl).then(res => res.json()),
    fetch(apiUrl + "/api/prefecture").then(res => res.json())
  ])
  .then(([areaJson, result]) => {
    if (result.status !== "200") {
      console.error("都道府県データ取得失敗");
      return;
    }

    const data = result.data; // 例: [{ id: "13", name: "東京都" }, ...]
    const availablePrefNames = data.map(pref => pref.name); // APIで取得できた都道府県名のみ
    const prefectureList = document.getElementById('prefecture-list');
    prefectureList.innerHTML = ''; // 前のデータをリセット

    areaJson.areas.forEach(area => {
  const matchingPrefs = area.prefectures.filter(p => availablePrefNames.includes(p));
  if (matchingPrefs.length > 0) {
    const areaLine = document.createElement('div');
    areaLine.className = 'area-line';

    const label = document.createElement('strong');
    label.className = 'area-label';
    label.textContent = area.area + '：';
    areaLine.appendChild(label);

    matchingPrefs.forEach(prefName => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'prefecture';
      checkbox.value = prefName;
      checkbox.id = `pref-${prefName}`;
      checkbox.setAttribute('data-pref-name', prefName);
      checkbox.addEventListener('change', () => updateCities(data));

      const prefLabel = document.createElement('label');
      prefLabel.htmlFor = `pref-${prefName}`;
      prefLabel.appendChild(checkbox);
      prefLabel.appendChild(document.createTextNode(prefName));

      areaLine.appendChild(prefLabel);
    });

    prefectureList.appendChild(areaLine);
  }
});

    document.getElementById('step-1').style.display = 'block';
  })
  .catch(error => {
    console.error("読み込みエラー:", error);
  });
}

function updateCities(data) {
const cityContainer = document.getElementById('city-list-container');

  // 🔸 Step 1: Save currently checked cities before clearing
  const previouslyChecked = new Set(
    Array.from(document.querySelectorAll('input[name="city"]:checked')).map(e => e.value)
  );

  // 🔸 Step 2: Clear current city list
  cityContainer.innerHTML = '';

  // 🔸 Step 3: Get selected prefectures
  const selectedPrefs = Array.from(document.querySelectorAll('input[name="prefecture"]:checked')).map(e => ({
    id: e.value,
    name: e.getAttribute('data-pref-name')
  }));

  // 🔸 Step 4: Render cities again and re-check saved ones
  selectedPrefs.forEach(pref => {
    const prefData = data.find(p => p.name === pref.name);
    if (!prefData || !Array.isArray(prefData.cities)) return;

    const section = document.createElement('div');
    section.innerHTML = `<strong>${pref.name}</strong><br>`;

    prefData.cities.forEach(city => {
      const cityCheckbox = document.createElement('input');
      cityCheckbox.type = 'checkbox';
      cityCheckbox.name = 'city';
      cityCheckbox.value = city;
      cityCheckbox.id = `city-${pref.name}-${city}`;
      cityCheckbox.setAttribute('data-pref', pref.name);
      cityCheckbox.setAttribute('data-city-name', city);

      // ✅ Re-check if previously checked
      if (previouslyChecked.has(city)) {
        cityCheckbox.checked = true;
      }

      const cityLabel = document.createElement('label');
      cityLabel.htmlFor = `city-${pref.name}-${city}`;
      cityLabel.textContent = city;
      cityLabel.style.marginRight = '10px';

      section.appendChild(cityCheckbox);
      section.appendChild(cityLabel);
    });

    cityContainer.appendChild(section);
  });
}

function selectStoreSelection() {
  document.getElementById('step-1').style.display = 'none';
  document.getElementById('step-2').style.display = 'block';
  const selectedData = {};
  const pref = document.querySelector('input[name="prefecture"]:checked');
  const city = document.querySelector('input[name="city"]:checked');
  const reqs = prepareReqsFromCheckedInputs();

  console.log("reqs："+reqs?.data);
  if (Array.isArray(reqs) && reqs.length > 0)  {
    document.getElementById('error-msg').style.display = 'none';
    fetchShopList(reqs);
      
     
  }else {
   document.getElementById('step-1').style.display = 'block';
   document.getElementById('step-2').style.display = 'none';
   document.getElementById('error-msg').style.display = 'block';

  }
  
}
async function fetchShopList(reqs) {

  try {
    const response = await fetch(apiUrl+'/api/shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reqs }) // ← オブジェクトで送信
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const shopList = await response.json();
     displayShops(shopList) 
    // ここでshopListを使って処理
    console.log(shopList);
    return shopList;
  } catch (error) {
    console.error('ショップリスト取得エラー:', error);
    return null;
  }
}
function prepareReqsFromCheckedInputs() {
  // すべてのチェックされたcityチェックボックスを取得
  const checkedInputs = document.querySelectorAll('input[name="city"]:checked');
  const prefMap = {};

  checkedInputs.forEach(input => {
    const pref = input.dataset.pref; // 例: "秋田県"
    const city = input.dataset.cityName; // 例: "由利本荘市"
    if (!prefMap[pref]) {
      prefMap[pref] = [];
    }
    prefMap[pref].push(city);
  });

  // 指定の形式に変換
  const reqs = Object.keys(prefMap).map(pref => ({
    [pref]: prefMap[pref]
  }));

  return reqs;
}


function displayShops(shopData) {
  const container = document.getElementById('shopListContainer');
  container.innerHTML = '';

  if (shopData.status !== "200" || !Array.isArray(shopData.data)) {
    container.innerText = 'ショップ情報が見つかりません。';
    return;
  }

  shopData.data.forEach(entry => {
    const prefName = entry.prefecture.name;
    const cityName = entry.city.name;

    const header = document.createElement('h3');
    header.textContent = `${prefName} - ${cityName}`;
    container.appendChild(header);

    entry.shops.forEach(shop => {
      const label = document.createElement('label');
      label.className = 'shop-item';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'shop';
      input.value = shop.id;
      input.onclick = () => seleced_radio(shop.name,shop.address,shop.tel);  // クリック時に選択処理

      const shopInfo = document.createElement('div');
      shopInfo.className = 'shop-info';

      shopInfo.innerHTML = `
        <div class="shop-name">${shop.name}</div>
        <div class="shop-address">${shop.address}</div>
        <div class="shop-tel">${shop.tel}</div>
        <div class="shop-pcode">${shop.pcode}</div>
      `;

      label.appendChild(input);
      label.appendChild(shopInfo);
      container.appendChild(label);
    });
  });
}


function closeStoreSelector() {
  document.getElementById('store-selector-modal').style.display = 'none';
}



function seleced_radio(name, address, tel){
  // document.getElementById('store-name').value = name;
//  document.getElementById('store-address').value = address;
 // document.getElementById('store-tel').value = tel;
}

function completeSelection(){
  const selectedRadio = document.querySelector('input[name="shop"]:checked');
  if (selectedRadio) {
    const label = selectedRadio.closest('label.shop-item');
    
    const shopName = label.querySelector('.shop-name')?.textContent.trim();
    const shopAddress = label.querySelector('.shop-address')?.textContent.trim();
     const shopTel = label.querySelector('.shop-tel')?.textContent.trim();
   
    const shopData = {
      id: selectedRadio.value,
      name: shopName,
      address: shopAddress,
      tel: shopTel
    };
    
    savePickupToCart(shopName, shopAddress, shopTel, selectedRadio.value).then(() => {
     
     window.location.href = '/cart';
    });
   } else {
    console.warn("店舗が選択されていません");
    return null;
  }

  
}

function savePickupToCart(shopName,shopAddress,tel,shop_id) {
  return fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      attributes: {
        '店舗名': shopName,
        '住所': shopAddress,
        'TEL': tel,
      }
    })
  })
  .then(res => res.json())
  .then(data => {
     console.log('受け取り店舗情報を保存しました:', data);
  });
}
// --- 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
  checkCartForStorePickup();
  observeCartDomChanges();
  const btn = document.getElementById('backToStep1');
  if (btn) {
    btn.onclick = () => {
      document.getElementById('step-2').style.display = 'none';
      document.getElementById('step-1').style.display = 'block';
    };
  }

  const hiddenInput = document.getElementById("store-name");
  const store_sele_btn = document.getElementById("store-selector-button");
  const checkout_c = document.getElementById("checkout");
  const div_comment_store = document.getElementById("comment-store");
  if (hiddenInput && hiddenInput.value.trim() !== "") {
    store_sele_btn.classList.add("completed");
    checkout_c.disabled = false;
    div_comment_store.style.display="none";
  }else {
    const hasStorePickupHandles =
      window.storePickupProductHandles &&
      Array.isArray(window.storePickupProductHandles) &&
      window.storePickupProductHandles.length > 0;    
    if(hasStorePickupHandles){
      checkout_c.disabled = true;
    }else {
     checkout_c.disabled = false;
     div_comment_store.style.display="none";
    }
  }

});



