/**
 * element toggle function
 */

const elemToggleFunc = (elem) => {
  elem.classList.toggle("monkey24")
}

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]")
const overlay = document.querySelector("[data-overlay]")
const navCloseBtn = document.querySelector("[data-nav-close-btn]")
const navOpenBtn = document.querySelector("[data-nav-open-btn]")
const navbarLinks = document.querySelectorAll("[data-nav-link]")

const navElemArr = [overlay, navCloseBtn, navOpenBtn]

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) {
  navElemArr.push(navbarLinks[i])
}

/**
 * add event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", () => {
    elemToggleFunc(navbar)
    elemToggleFunc(overlay)
  })
}

/**
 * header active state
 */

const header = document.querySelector("[data-header]")

window.addEventListener("scroll", () => {
  window.scrollY >= 400 ? header.classList.add("monkey24") : header.classList.remove("monkey24")
})
