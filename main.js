document.addEventListener("DOMContentLoaded", () => {
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
        accordion.classList.remove("is-open");
        body.style.height = "0px";
      } else {
        // 他を閉じる
        accordions.forEach((other) => {
          if (other === accordion) return;

          const otherBody = other.querySelector(".lesson-accordion__body");
          if (!otherBody) return;

          other.classList.remove("is-open");
          otherBody.style.height = "0px";
        });

        const panelHeight = panel.offsetHeight;
        accordion.classList.add("is-open");
        body.style.height = panelHeight + "px";
      }
    });
  });
});
