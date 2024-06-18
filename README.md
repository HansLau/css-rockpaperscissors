//TODO: Popup modal

1. Using elem.contains(e.target)
const modal = document.querySelector('.modal')

document.addEventListener('click', (e) => {
  let clickInside = modal.contains(e.target)

2. Using e.target.closest
3. event.target == modal.