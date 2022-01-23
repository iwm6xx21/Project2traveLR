const openMenuButton = document.querySelectorAll('[data-modal-target]')
const closeMenuButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')



openMenuButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.menu.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeMenuButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.menu')
        closeModal(modal)
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}