/* 【ビューポート安定化】ブラウザの安定した高さを取得し、CSS変数にセットする関数 */
/* ※今のCSSでは --app-height を使っていませんが、将来用に残しています */
const setAppHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

document.addEventListener("DOMContentLoaded", () => {
  /* ページロード時とリサイズ時に呼び出し（必要なければ削除してもOK） */
  setAppHeight();
  window.addEventListener("resize", setAppHeight);

  /* ===== TOPへロボ：ページ最上部へスクロール ===== */
  const topHelperBtn = document.querySelector(".top-helper");

  if (topHelperBtn) {
    topHelperBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ===== アコーディオン ===== */
  const accordions = document.querySelectorAll(".lesson-accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".lesson-accordion__trigger");
    const body = accordion.querySelector(".lesson-accordion__body");
    const panel = accordion.querySelector(".lesson-accordion__panel");

    if (!trigger || !body || !panel) return;

    // 初期は閉じる
    body.style.height = "0px";

    trigger.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("is-open");

      if (isOpen) {
        // すでに開いている自分を閉じるだけ
        accordion.classList.remove("is-open");
        body.style.height = "0px";
      } else {
        // まず「他のアコーディオン」を全部閉じる
        accordions.forEach((other) => {
          if (other === accordion) return; // 自分はスキップ

          const otherBody = other.querySelector(".lesson-accordion__body");
          if (!otherBody) return;

          other.classList.remove("is-open");
          otherBody.style.height = "0px";
        });

        // 自分だけ開く（パネル画像の高さを取得）
        const panelHeight = panel.offsetHeight;
        accordion.classList.add("is-open");
        body.style.height = panelHeight + "px";
      }
    });
  });
});
