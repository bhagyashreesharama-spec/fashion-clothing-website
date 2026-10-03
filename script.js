/* =========================
   VÉLORA FASHION WEBSITE
   ========================= */


/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });

});


/* =========================
   SEARCH
   ========================= */

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

  searchBox.classList.toggle("show");

  if (searchBox.classList.contains("show")) {
    searchInput.focus();
  }

});

closeSearch.addEventListener("click", () => {
  searchBox.classList.remove("show");
  searchInput.value = "";
});


/* =========================
   PRODUCT FILTER
   ========================= */

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    productCards.forEach(card => {

      if (
        filter === "all" ||
        card.dataset.category === filter
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* =========================
   CATEGORY CARDS
   ========================= */

document.querySelectorAll(".category-card").forEach(card => {

  card.addEventListener("click", () => {

    const category = card.dataset.category;

    document.querySelector("#new").scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {

      const filter = document.querySelector(
        `.filter[data-filter="${category}"]`
      );

      if (filter) {
        filter.click();
      }

    }, 500);

  });

});


/* =========================
   SHOPPING CART
   ========================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


function openCart() {

  cartDrawer.classList.add("open");
  overlay.classList.add("show");

}


function closeCartDrawer() {

  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

overlay.addEventListener("click", closeCartDrawer);


/* ADD TO CART */

document.querySelectorAll(".add-btn").forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    cart.push({
      name: name,
      price: price
    });

    updateCart();

    showToast(`${name} added to your bag`);

  });

});


/* UPDATE CART */

function updateCart() {

  cartCount.textContent = cart.length;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>♡</span>
        <p>Your bag is empty.</p>
        <small>Add something you love.</small>
      </div>
    `;

    cartTotal.textContent = "₹0";

    return;
  }


  cartItems.innerHTML = "";


  let total = 0;


  cart.forEach((item, index) => {

    total += item.price;

    const itemElement = document.createElement("div");

    itemElement.className = "cart-item";

    itemElement.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price.toLocaleString("en-IN")}</p>
      </div>

      <button
        class="remove-item"
        data-index="${index}">
        ×
      </button>
    `;

    cartItems.appendChild(itemElement);

  });


  cartTotal.textContent =
    `₹${total.toLocaleString("en-IN")}`;


  document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();

    });

  });

}


/* =========================
   QUICK VIEW
   ========================= */

const quickModal = document.getElementById("quickModal");
const closeModal = document.getElementById("closeModal");

const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalVisual = document.getElementById("modalVisual");
const modalAdd = document.getElementById("modalAdd");


let currentProduct = null;


document.querySelectorAll(".quick-view").forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.product;
    const price = Number(button.dataset.price);

    currentProduct = {
      name: name,
      price: price
    };

    modalName.textContent = name;

    modalPrice.textContent =
      `₹${price.toLocaleString("en-IN")}`;

    /* Visual based on product */

    if (name.includes("Dress")) {

      modalVisual.className =
        "product-visual dress-visual";

    } else if (name.includes("Overshirt")) {

      modalVisual.className =
        "product-visual shirt-visual";

    } else if (name.includes("Top")) {

      modalVisual.className =
        "product-visual top-visual";

    } else if (name.includes("Bag")) {

      modalVisual.className =
        "product-visual bag-visual";

    } else if (name.includes("Polo")) {

      modalVisual.className =
        "product-visual polo-visual";

    } else {

      modalVisual.className =
        "product-visual sunglasses-visual";

    }


    quickModal.classList.add("show");

  });

});


closeModal.addEventListener("click", () => {

  quickModal.classList.remove("show");

});


quickModal.addEventListener("click", event => {

  if (event.target === quickModal) {

    quickModal.classList.remove("show");

  }

});


/* ADD FROM QUICK VIEW */

modalAdd.addEventListener("click", () => {

  if (!currentProduct) return;

  cart.push(currentProduct);

  updateCart();

  quickModal.classList.remove("show");

  showToast(
    `${currentProduct.name} added to your bag`
  );

});


/* =========================
   HEART BUTTON
   ========================= */

document.querySelectorAll(".heart-btn").forEach(button => {

  button.addEventListener("click", () => {

    if (button.textContent === "♡") {

      button.textContent = "♥";

    } else {

      button.textContent = "♡";

    }

  });

});


/* =========================
   NEWSLETTER
   ========================= */

const newsletterForm =
  document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", event => {

  event.preventDefault();

  const email =
    document.getElementById("emailInput").value;

  if (email) {

    showToast("You're on the VÉLORA list ✓");

    newsletterForm.reset();

  }

});


/* =========================
   CHECKOUT
   ========================= */

const checkoutBtn =
  document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    showToast("Your bag is empty");

    return;

  }

  showToast("Checkout demo — coming soon");

});


/* =========================
   VIEW ALL
   ========================= */

document.getElementById("viewAllBtn")
  .addEventListener("click", () => {

    document.querySelectorAll(".product-card")
      .forEach(card => {
        card.classList.remove("hidden");
      });

    document.querySelectorAll(".filter")
      .forEach(button => {
        button.classList.remove("active");
      });

    document
      .querySelector('.filter[data-filter="all"]')
      .classList.add("active");

  });


/* =========================
   TOAST
   ========================= */

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    quickModal.classList.remove("show");

    closeCartDrawer();

    searchBox.classList.remove("show");

  }

});


/* =========================
   SEARCH DEMO
   ========================= */

searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase().trim();

  productCards.forEach(card => {

    const productName =
      card.querySelector("h3")
        .textContent
        .toLowerCase();

    const category =
      card.dataset.category.toLowerCase();

    if (
      value === "" ||
      productName.includes(value) ||
      category.includes(value)
    ) {

      card.classList.remove("hidden");

    } else {

      card.classList.add("hidden");

    }

  });

});
