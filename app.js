const form = document.querySelector('form')
const gifContainer = document.querySelector('div.out')
const title = document.querySelector('h1')

const getUrlGif = async gifName => await
  (await fetch(`https://api.giphy.com/v1/gifs/search?api_key=CtU0j5T8dIKY2E2bvFswt4AEDeTrnOkF&limit=1&q=${gifName}`))
  .json(response => response.json())
  .then(gif => gif.data[0].images.original.url)

const showGif = async gif => {
  const gifUrl = await getUrlGif(gif)
  const img = document.createElement('img')
  img.setAttribute('src', gifUrl)
  gifContainer.prepend(img)
}

const showFeedbackMessage = (message, color) => {
  title.textContent = message
  title.style.color = color
}

const fetchGif = async event => {
  event.preventDefault()  
  const gifName = event.target.search.value

  // Verifica se o valor do input está vazio
  if (!gifName) {
    showFeedbackMessage('⚠️ Informe o nome do GIF', '#F26C66')
    return
  }
  
  showFeedbackMessage('✔️ GIF Obtido com sucesso!', '#A4CEAE')
  showGif(gifName)
}

form.addEventListener('submit', fetchGif)  