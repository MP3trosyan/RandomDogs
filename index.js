const BASE_URL = "https://dog.ceo/api/breeds"
const DOG_IMAGES_URL = `${BASE_URL}/image/random`
const ALL_BREEDS_URL = `${BASE_URL}/list/all`
const button = document.getElementById('image_btn')
const dogImage = document.getElementById('dog_img')
const breedsList = document.getElementById('breeds_list')
const breedsButton = document.getElementById('breeds_btn')
const breedImageList = document.getElementById('image_list')
const closeButton = document.querySelector(".close_btn")
const secondCloseButton = document.querySelector(".close_btn_2")

let popup = document.getElementById("popup")

 
const openPopup = () => popup.classList.add("open-popup")
const closePopup = () => popup.classList.remove("open-popup")

button.addEventListener('click', () => {
    const request = new XMLHttpRequest()
    request.open('GET', DOG_IMAGES_URL)
    request.send()
    request.addEventListener('load', () => {
        openPopup()
        dogImage.src = JSON.parse(request.response).message
    })
    closeButton.addEventListener('click', () => {
        closePopup()
    })
})

const secondPopup = document.getElementById("popup_2")

const openSecondPopup = () => secondPopup.classList.add("open-popup_2")
const closeSecondPopup = () => secondPopup.classList.remove("open-popup_2")

function onBreedClick(breed) {
    const request = new XMLHttpRequest()
    request.open('GET', `https://dog.ceo/api/breed/${breed}/images`)
    request.send()
    request.addEventListener('load', () => {
        const breedImagesArray = JSON.parse(request.response).message
        openSecondPopup()
        breedImagesArray.splice(0, 9).forEach(breedImageSrc => {
            const img = document.createElement('img')
            img.classList.add("breed_img")
            img.src = breedImageSrc
            const li = document.createElement('li')
            li.append(img)
            breedImageList.append(li)
            
        })
    })
    secondCloseButton.addEventListener('click', () => closeSecondPopup())
}

function createBreedList() {
        const request = new XMLHttpRequest()
        request.open('GET', ALL_BREEDS_URL)
        request.send()
    
        request.addEventListener('load', () => {
            const breeds = JSON.parse(request.response).message
            for(let breed in breeds) {
                const li = document.createElement('li')
                li.append(breed)
                li.addEventListener('click', () => {
                    if (breedImageList.getElementsByTagName("li").length >= 1){
                        breedImageList.innerHTML = ""
                    }
                    onBreedClick(breed)
                }, {once: true})
                breedsList.append(li)
            }
            breedsButton.removeEventListener('click', createBreedList)
        })
}
breedsButton.addEventListener('click', createBreedList)