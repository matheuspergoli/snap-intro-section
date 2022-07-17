const navigation = document.querySelector('.navigation')
const submenus = document.querySelectorAll('.submenu')
const images = document.querySelectorAll('.navigation__img')
const btnMobile = document.querySelector('.btn-mobile')
const events = ['touchstart', 'click']

function showMenuMobile() {
  this.nextElementSibling.classList.toggle('active')

  outsideClick(this, events, () => {
    this.nextElementSibling.classList.remove('active')
  })
}
btnMobile.addEventListener('click', showMenuMobile)

function showSubmenu({ target }) {

  // Verificando se o target possui a classe navigation__link
  if (target.classList.contains('navigation__link')) {

    // Verificando se o target que possui a classe navigation__link
    // Também possui um submenu como sibling
    if (target.nextElementSibling) {
      
      // Removendo a classe active de todos os submenus
      // Em que o target não está clicando
      submenus.forEach(submenu => {
        if (!target.nextElementSibling.contains(submenu)) {
          submenu.classList.remove('active')
        }
      })

      // E adicionando a classe active apenas no sibling do link clicado
      target.nextElementSibling.classList.toggle('active')

      // Despachando o evento de click nas duas imagens
      images.forEach(image => image.dispatchEvent(new Event('click')))

      outsideClick(this, events, () => {
        target.nextElementSibling.classList.remove('active')
        images.forEach(image => image.dispatchEvent(new Event('click')))
      })
    }
  }
}
navigation.addEventListener('click', showSubmenu)

function changeArrow({ target }) {

  // Verificando se o submenu tem a classe active
  if (target.parentNode.nextElementSibling.classList.contains('active')) {

    // Se tiver a classe active, colocar a seta pra cima
    target.src = 'images/icon-arrow-up.svg'
  } else {

    // Se não tiver a classe active, colocar a seta pra baixo
    target.src = 'images/icon-arrow-down.svg'
  }
}
images.forEach(image => image.addEventListener('click', changeArrow))

function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      html.addEventListener(userEvent, handleOutsideClick)
    })
    element.setAttribute(outside, '')
  }

  function handleOutsideClick({ target }) {
    if (!element.contains(target)) {
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOutsideClick)
      })
      element.removeAttribute(outside)
      callback()
    }
  }
}
