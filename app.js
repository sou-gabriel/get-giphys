const form = document.querySelector('form')
const GIFSContainer = document.querySelector('div.gifs-container')
const title = document.querySelector('h1')

const APIKey = 'CtU0j5T8dIKY2E2bvFswt4AEDeTrnOkF'

const getGIPHYApiUrl = inputValue =>
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${inputValue}`

const generateGIFImage = (downsizedGIFUrl, GIFTitle) => {
  const img = document.createElement('img')

  img.setAttribute('src', downsizedGIFUrl)
  img.setAttribute('alt', GIFTitle)

  return img
}

const showFeedbackMessage = (message, className) => {
  title.textContent = message
  title.classList.add(className)
}

const fetchGIF = async inputValue => {
  try {
    const GIPHYAPIUrl = getGIPHYApiUrl(inputValue)
    const response = await fetch(GIPHYAPIUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return response.json()
  } catch (error) {
    showFeedbackMessage(error.message, 'error')
    console.log(`Erro: ${error.message}`)
  }
}

const insertGIFIntoDOM = async inputValue => {
  const GIFData = await fetchGIF(inputValue)  

  if (GIFData) {
    const downsizedGIFUrl = GIFData.data[0].images.downsized.url
    const GIFTitle = GIFData.data[0].title
    const img = generateGIFImage(downsizedGIFUrl, GIFTitle)
  
    GIFSContainer.insertAdjacentElement('afterbegin', img)

    showFeedbackMessage('GIF Obtido com sucesso!', 'sucess')
  
    form.reset()
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value

  insertGIFIntoDOM(inputValue)
})