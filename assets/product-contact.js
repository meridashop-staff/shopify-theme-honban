document.addEventListener("DOMContentLoaded", function () {
  // 商品ページ：商品情報を sessionStorage に保存し、遷移
 const inquiryLink = document.getElementById("inquiry-link");

  // 商品ページ側の処理
  if (inquiryLink && window.__productInfo) {
    inquiryLink.addEventListener("click", function (e) {
      e.preventDefault();

      // sessionStorage に保存（HTMLに出さない）
      sessionStorage.setItem("handler", window.__productInfo.h_id || "");
      sessionStorage.setItem("product_code", window.__productInfo.p_c || "");
      
      // 遷移
      setTimeout(() => {
        window.location.href = inquiryLink.href;
      }, 10);
    });
  }

  // contactページ処理
  if (window.location.pathname.includes("/contact")) {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const page_prod = params.get("_prod");
      let h_id = "";
      let code = "";
      if(params.get("contact_posted") === "true"){
        　h_id = sessionStorage.getItem("handler");
         code = sessionStorage.getItem("product_code");
         if(!h_id){
           return;
         }
      }else if (!page_prod ) {
        sessionStorage.removeItem("handler");
        sessionStorage.removeItem("product_code");
        return;
      }else{
        h_id = sessionStorage.getItem("handler");
        code = sessionStorage.getItem("product_code");
      }
      
      try {
        
        const response = await fetch(`/products/${h_id}.js`);
        const product = await response.json();

        const hiddenTitle = document.getElementById("ContactForm-product-title");
        const hiddenId = document.getElementById("ContactForm-product-id");

        if (product.title) {
          document.getElementById("product-info").style.display = "flex";
          document.getElementById("product-title").textContent = product.title;
          if (hiddenTitle) hiddenTitle.value = product.title;
        }

        if (code) {
          document.getElementById("product-code").textContent = code;
          document.getElementById("product-code-box").style.display = "block";
          if (hiddenId) hiddenId.value = code;
        }

        if (product.featured_image) {
          document.getElementById("product-image").src = product.featured_image;
        }
      } catch (err) {
        console.error("Product data fetch failed:", err);
      }
    })(); 
  }

    var form = document.getElementById("ContactForm");
    var nameField = document.getElementById("ContactForm-name");
    var bodyField = document.getElementById("ContactForm-body");
    var emailField= document.getElementById("ContactForm-email");
 　 var nameError = document.querySelector(".js-error-name");
    var bodyError = document.querySelector(".js-error-body");
    var emailError= document.querySelector(".js-error-email");

    if (form && nameField && bodyField && emailField) {
      form.addEventListener("submit", function (e) {
        var hasError = false;

        // エラー初期化
        nameError.style.display = "none";
        bodyError.style.display = "none";
        emailError.style.display = "none";

        
        if (!nameField.value.trim()) {
          hasError = true;
          nameError.style.display = "block";
        }

        if (!bodyField.value.trim()) {
          hasError = true;
         bodyError.style.display = "block";
        }

        if(!emailField.value.trim()){
            hasError = true;
            emailError.style.display = "block";
        }

        if (hasError) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, true);
    }

});
