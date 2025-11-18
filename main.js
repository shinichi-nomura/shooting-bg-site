/* ===== アコーディオン操作 ===== */
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".lesson-accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".lesson-accordion__trigger");
    const body = accordion.querySelector(".lesson-accordion__body");
    const panel = accordion.querySelector(".lesson-accordion__panel");

    if (!trigger || !body || !panel) return;

    body.style.height = "0px"; // 初期値

    trigger.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("is-open");

      if (isOpen) {
        accordion.classList.remove("is-open");
        body.style.height = "0px";
      } else {
        // 他を閉じる
        accordions.forEach((other) => {
          if (other === accordion) return;
          other.classList.remove("is-open");
          const obody = other.querySelector(".lesson-accordion__body");
          if (obody) obody.style.height = "0px";
        });

        // 自分を開く
        const panelHeight = panel.offsetHeight;
        accordion.classList.add("is-open");
        body.style.height = panelHeight + "px";
      }
    });
  });

  /* ===== TOPへ戻る ===== */
  const topHelperBtn = document.querySelector(".top-helper");
  if (topHelperBtn) {
    topHelperBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
