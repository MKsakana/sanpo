const staffList = [
  {
    id: "motita",
    name: "持田あさひ",
    image: "img/mochita.png",
    description: "取材班",
    layout: "image-left",
  },
  {
    id: "momozaki",
    name: "百崎あやこ",
    image: "img/momozaki.png",
    description: "広報班",
    layout: "image-right",
  },
];

const staffContainer = document.getElementById("staff");
const miniCards = Array.from(document.querySelectorAll(".mini_card[data-staff]"));
let staffInitialized = false;

function renderStaff(staff) {
  if (!staffContainer) return;
  // `.staff_card` 自体は既にHTML側で付いているので、内部だけ差し替える
  if (staff.layout === "image-right") {
    staffContainer.innerHTML = `
      <div class="prf">
        <div class="prftext2">
          <h4 class="name">${staff.name}</h4>
          <p>${staff.description}</p>
        </div>
        <div class="momozaki">
          <img class="momozakiimg" src="${staff.image}" alt="${staff.name}">
        </div>
      </div>
    `;
    return;
  }

  // デフォルト: 画像左
  staffContainer.innerHTML = `
    <div class="prf">
      <div class="mochita">
        <img class="mochitaimg" src="${staff.image}" alt="${staff.name}">
      </div>
      <div class="prftext">
        <h4 class="name">${staff.name}</h4>
        <p>${staff.description}</p>
      </div>
    </div>
  `;
}

function setActiveStaff(staffId) {
  const staff = staffList.find((s) => s.id === staffId) ?? staffList[0];
  if (!staffContainer) return;

  // 初回はふんわりアニメーションなしで描画
  if (!staffInitialized) {
    renderStaff(staff);
    staffInitialized = true;
  } else {
    // ふんわりフェードアウト→中身差し替え→フェードイン
    staffContainer.classList.remove("staff_card--fade-in");
    staffContainer.classList.add("staff_card--fade-out");

    setTimeout(() => {
      renderStaff(staff);
      staffContainer.classList.remove("staff_card--fade-out");
      staffContainer.classList.add("staff_card--fade-in");

      // アニメーション終了後にクラスを戻しておく（次の切り替えのため）
      setTimeout(() => {
        staffContainer.classList.remove("staff_card--fade-in");
      }, 280);
    }, 180);
  }

  miniCards.forEach((el) => {
    const isActive = el.dataset.staff === staff.id;
    el.classList.toggle("is-active", isActive);
    el.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

miniCards.forEach((el) => {
  el.addEventListener("click", () => setActiveStaff(el.dataset.staff));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveStaff(el.dataset.staff);
    }
  });
});

// 初期表示
setActiveStaff(staffList[0]?.id);
