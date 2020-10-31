const form = document.querySelector('form')
const GIFContainer = document.querySelector('[data-js="gif-container"]')

const APIKey = 'CtU0j5T8dIKY2E2bvFswt4AEDeTrnOkF'

const getGIPHYSApiUrl = GIFName => 
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`


const fetchGIF = async GIFName => {
  try {
    const GIPHYSApiUrl = getGIPHYSApiUrl(GIFName)
    const response = await fetch(GIPHYSApiUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const generateGIFImage = ({ images, title }) => {
  const img = `<img src="${images.downsized.url}" alt="${title}"/>`

  return img
}

const insertGIFIntoDOM = async GIFName => {
  const GIFData = await fetchGIF(GIFName)

  const img = generateGIFImage(GIFData.data[0])
  GIFContainer.innerHTML = img
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value 

  insertGIFIntoDOM(inputValue)
})