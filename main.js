/* ================================
   ビューポート安定化（iOS対策）
================================ */
const setAppHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

document.addEventListener("DOMContentLoaded", () => {
  /* 初期設定 */
  setAppHeight();
  window.addEventListener("resize", setAppHeight);

  /* ================================
       TOPへロボ（スムーススクロール）
  ================================ */
  const topHelperBtn = document.querySelector(".top-helper");

  if (topHelperBtn) {
    topHelperBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ================================
        アコーディオン処理
  ================================ */
  const accordions = document.querySelectorAll(".lesson-accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".lesson-accordion__trigger");
    const body = accordion.querySelector(".lesson-accordion__body");
    const panel = accordion.querySelector(".lesson-accordion__panel");

    /* 必須要素が欠けていたら無視 */
    if (!trigger || !body || !panel) return;

    /* 初期状態：閉じる */
    body.style.height = "0px";

    trigger.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("is-open");

      if (isOpen) {
        /* 自分を閉じる */
        accordion.classList.remove("is-open");
        body.style.height = "0px";
      } else {
        /* 他のアコーディオンを全部閉じる */
        accordions.forEach((other) => {
          if (other === accordion) return;
          const otherBody = other.querySelector(".lesson-accordion__body");
          if (!otherBody) return;

          other.classList.remove("is-open");
          otherBody.style.height = "0px";
        });

        /* 開く前にパネルの高さを取得 */
        const panelHeight = panel.offsetHeight;

        /* 開く */
        accordion.classList.add("is-open");
        body.style.height = panelHeight + "px";
      }
    });
  });
});
