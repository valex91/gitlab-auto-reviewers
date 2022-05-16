export const appendButtonToEdit = (nodeToAppend) => {
  const editReviewersButton = Array.from(document.querySelector('.reviewer').querySelectorAll('a')).find(n => n.textContent = 'Edit') 
  editReviewersButton.parentElement.appendChild(nodeToAppend)
};
