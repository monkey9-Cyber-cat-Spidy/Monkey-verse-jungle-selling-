document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("[data-navbar]")
  const overlay = document.querySelector("[data-overlay]")
  const navOpenBtn = document.querySelector("[data-nav-open-btn]")
  const navCloseBtns = document.querySelectorAll("[data-nav-close-btn]")
  const navbarLinks = document.querySelectorAll("[data-nav-link]")
  const mobileNavBtns = document.querySelectorAll(".mobile-bottom-nav button")
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
  const cartNotification = document.querySelector(".cart-notification")
  const cartCountElement = document.querySelector(".cart-count")
  const cartItemsList = document.querySelector(".cart-items")
  const cartEmptyMessage = document.querySelector(".cart-empty-message")
  const cartSummary = document.querySelector(".cart-summary")
  const cartTotalElement = document.querySelector(".cart-total strong")
  const form = document.getElementById('contact-form');
  const thankYouMessage = document.getElementById('thank-you-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Use fetch to submit the form data to Netlify
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(() => {
      form.style.display = 'none';
      thankYouMessage.style.display = 'block';
    })
    .catch(error => alert('Oops! There was a problem submitting your form'));
  });
  // Sticky header
  const header = document.querySelector("[data-header]")

  // Cart functionality
  let cartItems = []
  let cartCount = 0

  // Open menu function
  const openMenu = () => {
    navbar?.classList.add("active")
    overlay?.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
  }

  // Close menu function
  const closeMenu = () => {
    navbar?.classList.remove("active")
    overlay?.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }

  // Event listeners for menu toggle
  navOpenBtn?.addEventListener("click", openMenu)

  // Close button event listeners
  navCloseBtns.forEach((btn) => {
    btn?.addEventListener("click", closeMenu)
  })

  overlay?.addEventListener("click", closeMenu)

  // Close menu when clicking on nav links - ensure this works for all menu items
  navbarLinks.forEach((link) => link.addEventListener("click", closeMenu))

  // Mobile bottom nav functionality
  mobileNavBtns.forEach((btn) => {
    if (btn.getAttribute("data-nav-open-btn") !== null) {
      btn.addEventListener("click", openMenu)
    } else {
      // For other bottom nav buttons, add click handler to navigate to sections
      btn.addEventListener("click", function () {
        const targetSection = this.getAttribute("data-target")
        if (targetSection) {
          const targetElement = document.querySelector(targetSection)
          if (targetElement) {
            const headerOffset = header.offsetHeight
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })

            // Set active state
            mobileNavBtns.forEach((navBtn) => navBtn.classList.remove("active"))
            this.classList.add("active")

            // Close menu if open - ensure this happens for all navigation items
            closeMenu()
          }
        }
      })
    }
  })

  // Add to cart functionality
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      // Get property details
      const propertyCard = this.closest(".monkey54")
      const propertyTitle = propertyCard.querySelector(".monkey62 a").textContent
      const propertyPrice = propertyCard.querySelector(".monkey61").textContent
      const propertyImage = propertyCard.querySelector(".monkey55 img").src

      // Add to cart
      addToCart({
        id: Date.now(),
        title: propertyTitle,
        price: propertyPrice,
        image: propertyImage,
      })

      // Show notification
      showCartNotification()
    })
  })

  // Add to cart function
  function addToCart(item) {
    cartItems.push(item)
    cartCount++
    updateCartUI()
  }

  // Remove from cart function
  function removeFromCart(id) {
    cartItems = cartItems.filter((item) => item.id !== id)
    cartCount--
    updateCartUI()
  }

  // Update cart UI
  function updateCartUI() {
    // Update cart count
    cartCountElement.textContent = cartCount

    // Update cart items list
    if (cartCount === 0) {
      cartEmptyMessage.style.display = "block"
      cartItemsList.style.display = "none"
      cartSummary.style.display = "none"
    } else {
      cartEmptyMessage.style.display = "none"
      cartItemsList.style.display = "flex"
      cartSummary.style.display = "flex"

      // Clear current items
      cartItemsList.innerHTML = ""

      // Add items to list
      cartItems.forEach((item) => {
        const cartItem = document.createElement("li")
        cartItem.className = "cart-item"
        cartItem.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}" class="monkey29">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">${item.price}</p>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        `
        cartItemsList.appendChild(cartItem)

        // Add remove event listener
        cartItem.querySelector(".cart-item-remove").addEventListener("click", function () {
          const itemId = Number.parseInt(this.getAttribute("data-id"))
          removeFromCart(itemId)
        })
      })

      // Update total
      let totalBananas = 0
      cartItems.forEach((item) => {
        const priceMatch = item.price.match(/(\d+)/)
        if (priceMatch) {
          totalBananas += Number.parseInt(priceMatch[0])
        }
      })

      cartTotalElement.textContent = `${totalBananas} Bananas`
    }
  }

  // Show cart notification
  function showCartNotification() {
    cartNotification.classList.add("show")
    setTimeout(() => {
      cartNotification.classList.remove("show")
    }, 3000)
  }

  // Set active state for the current section
  const setActiveNavButton = () => {
    const sections = ["#home", "#property", "#cart", "#service"]
    let currentSectionIndex = 0

    sections.forEach((section, index) => {
      const element = document.querySelector(section)
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top <= 100 && position.bottom >= 100) {
          currentSectionIndex = index
        }
      }
    })

    // Set active class on the corresponding button
    mobileNavBtns.forEach((btn) => btn.classList.remove("active"))
    const targetBtn = mobileNavBtns[currentSectionIndex]
    if (targetBtn && !targetBtn.hasAttribute("data-nav-open-btn")) {
      targetBtn.classList.add("active")
    }
  }

  // Call on scroll
  window.addEventListener("scroll", setActiveNavButton)

  // Smooth scroll for anchor links - ensure this closes the menu for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = header.offsetHeight
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Close menu if open - ensure this happens for all links
        closeMenu()
      }
    })
  })

  // Sticky header
  const makeHeaderSticky = () => {
    if (window.scrollY > 100) {
      header?.classList.add("sticky")
    } else {
      header?.classList.remove("sticky")
    }
  }

  window.addEventListener("scroll", makeHeaderSticky)

  // Copyright year
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Initialize header state on page load
  makeHeaderSticky()

  // Initialize active nav button
  setActiveNavButton()

  // Initialize cart UI
  updateCartUI()
})
