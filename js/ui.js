// import { getDataLocaleSorage, setDataLocaleSorage } from "./storage.js";
import { checkTrueFalse, checkFavorite, ajouteChannelApi, deleteFromeApi, modifierApi } from "./api.js";

const channelsSpace = document.getElementById('channel-space')
const spaceCategory = document.getElementById('space-catregory');
const btnRemove = document.getElementById('btn-remove')
const catregoryPlace = document.getElementById('category-place')
const search = document.querySelector('#search-search')
// const showPlace = document.getElementById('show-place')
const detailsPlace = document.getElementById('detais-space')
const header = document.querySelector('header')
const video = document.getElementById('videoPlayer')
const blacklistBtn = document.getElementById('blacklist-btn')
const popUpList = document.getElementById('popUp-list')
const popUp = document.getElementById('popUp')
const space = document.getElementById('space')
// pop up --------------------------------------------------
const popUpAjoute = document.getElementById('ajouteNouveau')
const bgPopUpAjoute = document.getElementById('space-popUp')
const btnAjoute = document.getElementById('btn-ajoute')
const titrePopUp = document.getElementById('titre')
const form = document.getElementById('form')
// inputs : -------------------------------------------
const btnSubmit = document.getElementById('btn-submit')
const nameInput = document.getElementById('name')
const categoryInput = document.getElementById('category')
const LogoInput = document.getElementById('logo')
const numberInput = document.getElementById('numero')
const message1 = document.getElementById('message1')
const message2 = document.getElementById('message2')
const message3 = document.getElementById('message3')


// const data = getDataLocaleSorage()

function afficher(arry, parent) {

    parent.innerHTML = ''
    arry.forEach(element => {
        if (element.isBlackliste === false) {
            const list = document.createElement('li')
            list.dataset.id = element.id
            list.className = `list flex flex-row justify-between  px-8 text-2xl text-amber-50 border-amber-50 border text-center`
            list.innerHTML = ` <span data-id="${element.id}">${element.channelNumber}</span><span data-id="${element.id}">${element.name}</span><div class="btns flex  gap-2 "><button title="ajouter aux favoris" class="btn-str" data-action="favorite" data-id="${element.id}"><img src="${element.isFavorite ? '/assest/star-fill.svg' : '/assest/star.svg'}" data-id="${element.id}" class="img-str" id="star-icon${element.id}"></button><button data-action="modifier"  class="btn-modifier" title="modifier" data-id="${element.id}"><img src="assest/edit.svg"  id="modifier-icon${element.id}"><button><button data-action="blacklist"  class="btn-report" title="ajouter à la liste noire" data-id="${element.id}"><img src="assest/report.svg"  id="report-icon${element.id}"><button></div>`
            parent.appendChild(list)
            //  changeBgChannel()
        }
    });
    changeBgChannel()
    // filterBlackList(getDataLocaleSorage())
    //  changeStrIcon(data)
    // changeStrIcon(data)



}

export function showChannels(data) {

    afficher(data, channelsSpace)
    // checkStrIcon(getDataLocaleSorage())
    gereerFavorite(data)
    // afficherBlacklist()
    search.addEventListener('input', () => {
        let x = search.value.toLowerCase()
        console.log(x)
        const filtered = data.filter(p => p.name.toLowerCase().includes(x));
        afficher(filtered, channelsSpace)
        // checkStrIcon(filtered)
        gereerFavorite(filtered)
        // filterBlackList(filtered)

    })


}
export function showCategory(data) {

    data.forEach(e => {
        const list = document.getElementById(`${e.category}`)
        if (!list) {
            const list = document.createElement('li')
            list.setAttribute('id', `${e.category}`)
            list.className = "text-2xl text-amber-50 border-amber-50 border text-center"
            list.dataset.id = e.id
            list.innerHTML = `${e.category}`

            catregoryPlace.appendChild(list)
        }
    })
}
export function removeHidden() {


    btnRemove.addEventListener('click', () => {

        spaceCategory.classList.toggle('hidden')
        btnRemove.classList.toggle('bg-[url(/assest/right_panel.svg)]')
        btnRemove.classList.toggle('bg-[url(/assest/left_panel.svg)]')

    })
    channelsSpace.addEventListener('click', () => {
        spaceCategory.classList.add('hidden')
        btnRemove.classList.add('bg-[url(/assest/right_panel.svg)]')
        btnRemove.classList.remove('bg-[url(/assest/left_panel.svg)]')

    })

}

export function filterByCategory(data) {
    spaceCategory.addEventListener('click', (e) => {



        let id = e.target.id

       
        if (e.target.id === 'tout') {
            afficher(data, channelsSpace)
            // checkStrIcon(getDataLocaleSorage())
            gereerFavorite(data)
            // filterBlackList(getDataLocaleSorage())
            console.log('eeeee')

        }
        else if (e.target.id === 'Favorite' || e.target.id === "img-favor") {
            channelsSpace.innerHTML = ''
            data.forEach(element => {

                if (element.isFavorite === true) {
                    // makhdamch icon f favorite !!!!!!!!!!!!!!!!!!!!!!!!!
                    // let strIcon = document.getElementById(`star-icon${element.id}`)
                    // console.log(strIcon)
                    const list = document.createElement('li')
                    list.dataset.id = element.id
                    list.className = `list flex flex-row justify-between  px-8 text-2xl text-amber-50 border-amber-50 border text-center`
                    list.innerHTML = ` <span>${element.channelNumber}</span><span>${element.name}</span><div  class="btns flex gap-3"><button title="ajouter aux favoris" class="btn-str" data-action="favorite" data-id="${element.id}"><img src="/assest/star-fill.svg"  data-id="${element.id} id="star-icon${element.id}"></button><button class="btn-report" data-action="blacklist" title="ajouter à la liste noire" data-id="${element.id}"><img src="assest/report.svg"  id="report-icon${element.id}"></button></div>`
                    channelsSpace.appendChild(list)
                    changeBgChannel()
                    // if (strIcon === null) return
                    // strIcon.src = '/assest/star-fill.svg'


                }

            });


        }
        else {
            const channels = data.filter(e => e.category == id)


            afficher(channels, channelsSpace)
            // checkStrIcon(channels)

            gereerFavorite(channels)
            // filterBlackList(channels)



        }

    })
}

export function AddloadingSpin() {
    const spin = document.getElementById('spin')
    spin.classList.add('loader')
    video.classList.add('hidden')

}
export function loadingSearch() {
    const loadingSearch = document.getElementById('loading-search')
    loadingSearch.classList.add('loader1')
    localStorage.clear()

}
export function changeBgChannel() {
    const channels = document.querySelectorAll('.list')
    channels.forEach(channel => {
        channel.addEventListener('click', (e) => {

            channels.forEach(chann => {
                chann.classList.remove('bg-red-600')
            })
            channel.classList.add('bg-red-600')
        })
    })
}

export function showDetailsChannel(data) {

    channelsSpace.addEventListener('click', (e) => {
        let channelsClass = e.target.closest('.list')
        data.forEach(element => {
            if (element.id === channelsClass.dataset.id) {
                detailsPlace.innerHTML = ` <div class="flex items-center justify-center rounded-2xl">
                <img src="${element.logo}" alt="" class="w-40  h-40 rounded-2xl max-sm:w-20 max-sm:h-20">
            </div>
            <div class="flex flex-col justify-around ">
                <div class="flex flex-col gap-8 max-sm:gap-4">

                    <h2 class="text-2xl max-sm:text-xl">${element.name}</h2>


                    <div class=" font-roboto font-normal text-xl max-sm:text-lg">
                        <p>${element.epg.currentProgram}</p>

                    </div>
                </div>
                <div class="font-roboto font-normal text-xl flex gap-8 max-sm:text-lg">
                    <p>start : ${element.epg.startTime}</p>
                    <p>end : ${element.epg.endTime}</p>
                </div>
            </div>
            <div class="flex items-center max-sm:w-30">
                <div class="flex flex-col justify-center gap-2 h-20 pl-15 border-l border-l-white max-sm:pl-5">
                    <p class="border bg-amber-50 rounded-xl p-1 text-[#080808] text-center italic">FHD</p>
                    <P class="border border-[#FF1010] rounded-xl p-1 text-[#FF1010]   ">ch. ${element.channelNumber}</P>
                </div>
            </div>`

            }
        })
    })

}


export function pannelDeBlacklist() {
    blacklistBtn.addEventListener('click', (e) => {
        popUp.classList.toggle('hidden')
        space.classList.toggle('hidden')
        // returnChannelFromBlacklist()
    })
    space.addEventListener('click', () => {
        popUp.classList.add('hidden')
        space.classList.add('hidden')
    })
}
export function afficherBlacklist(datas) {

    popUpList.innerHTML = ''

    datas.forEach(element => {


        if (element.isBlackliste === true) {

            const list = document.createElement('li')
            list.dataset.id = element.id
            list.className = `blacklist-place flex flex-row justify-between  px-8 text-2xl text-amber-50 border-amber-50 border text-center`
            list.innerHTML = ` <span>${element.channelNumber}</span><span>${element.name}</span><div class="flex gap-3"> <button data-action=""return title="ajouter aux favoris" class="btn-return" data-id="${element.id}"><img src="assest/return.svg" classs="h-30" id="return-icon${element.id}"></button></button><button data-action="delete"  class="btn-delete" title="suppremer" data-id="${element.id}"><img src="assest/delete.svg"  id="delete-icon${element.id}"></button></div>`
            popUpList.appendChild(list)
        }

    })
}
export function returnChannelFromBlacklist(data) {
    popUpList.addEventListener('click', (e) => {
        data.forEach(element => {
            if (e.currentTarget.dataset.action === 'return' || e.target.id === `return-icon${element.id}`) {
                checkTrueFalse(element, false)
                e.target.parentElement.closest('LI').remove()

            }
            if (e.currentTarget.dataset.action === 'delete' || e.target.id === `delete-icon${element.id}`) {
                deleteFromeApi(element.id)
                e.target.parentElement.closest('LI').remove()


            }
        })
    })
}

export function gereerFavorite(data) {
    // const btnStr = document.querySelectorAll('.btn-str')

    const btns = document.querySelectorAll(".btns")

    btns.forEach(element => {
        element.addEventListener('click', (e) => {
            data.forEach(tes => {
                const strIcon = document.getElementById(`star-icon${tes.id}`)

                if (e.currentTarget.dataset.action === 'favorite' || e.target.dataset.id == tes.id) {
                    if (tes.isFavorite === false) {
                        checkFavorite(tes.id, true)
                        strIcon.src = '/assest/star-fill.svg'

                    }
                    else {
                        tes.isFavorite === false
                        //  strIcon.src = '/assest/star.svg'
                        checkFavorite(tes.id, false)

                    }
                }

                if (e.currentTarget.dataset.action === 'blacklist' || e.target.id === `report-icon${tes.id}`) {
                    if (tes.isBlackliste === false) {
                        checkTrueFalse(tes, true)
                        e.target.parentElement.closest('LI').remove()

                    }

                }
                if (e.currentTarget.dataset.action === 'modifier' || e.target.id === `modifier-icon${tes.id}`) {
                    console.log('modifier')
                    titrePopUp.textContent = "modifier channel"
                    btnSubmit.textContent = "Modifier"

                    popUpAjoute.classList.remove('hidden')
                    bgPopUpAjoute.classList.toggle('hidden')
                    nameInput.value = tes.name
                    numberInput.value = tes.channelNumber
                    categoryInput.value = tes.category
                    LogoInput.value = tes.logo
                    btnSubmit.addEventListener('click', (e) => {

                        const objet = {
                            channelNumber: numberInput.value,
                            name: nameInput.value,
                            category: categoryInput.value,
                            logo: LogoInput.value
                        }
                        console.log(nameInput.value)
                        e.preventDefault()
                        
                        regex(() => modifierApi(tes.id, objet))

                    })
                    console.log('mdmdmdm')
                }

            })

        })
    })



}
export function ajouteSpace() {

    btnAjoute.addEventListener('click', () => {
        popUpAjoute.classList.toggle('hidden')
        bgPopUpAjoute.classList.toggle('hidden')
    })
    bgPopUpAjoute.addEventListener('click', () => {
        popUpAjoute.classList.add('hidden')
        bgPopUpAjoute.classList.add('hidden')
    })
}
export function playStream(data) {
    channelsSpace.addEventListener('click', (e) => {
        let channelsClass = e.target.closest('.list')
        let url = data.find(element => element.id === channelsClass.dataset.id)
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(url.streamUrl)
            hls.attachMedia(video)
        }
    })
}
export function popUpAjouteChannel(data) {



    btnAjoute.addEventListener('click', () => {
        form.reset()
        titrePopUp.textContent = "Ajoute nouveau channel"
        btnSubmit.textContent = "Ajouter"

        form.addEventListener('submit', (e) => {
            console.log(nameInput.value)

            e.preventDefault()
          
            regex(() => ajouteChannelApi(nameInput.value, categoryInput.value, LogoInput.value, numberInput.value, data))
        })
    })
}
function regex(func) {
    const regexNom = /^.{2,30}$/
    const regexNum = /^[0-9]{1,}$/
    const regexLogo = /^[^ ]{10,50}$/

    let x = false
    let y = false
    let z = false
    if (!regexNom.test(nameInput.value)) {

        message1.textContent = 'Le nom doit contenir entre 2 et 30 caractères '


    }
    else { message1.textContent = '', x = true }
    if (!regexNum.test(numberInput.value)) {
        message2.textContent = 'Le numéro doit contenir uniquement des chiffres.'
    }
    else { message2.textContent = '', y = true }
    if (!regexLogo.test(LogoInput.value)) {
        message3.textContent = 'Le lien du logo doit contenir entre 10 et 50 caractères sans espaces.'
    }
    else { message3.textContent = '', z = true }
    if (x === true && y === true && z === true) {
        console.log('ccccccccccccc')
        func();
        popUpAjoute.classList.add('hidden')
        bgPopUpAjoute.classList.add('hidden')
    }
    x = false
    y = false
    z = false
}

function lastCategry(){
    spaceCategory.addEventListener('click' , (e) =>{
        if(e.target.id !== 'category-place'){
            const x = e.target.id
            console.log(x)
           localStorage.setItem('catregory' , JSON.stringify(x))
        }
        let y = JSON.parse(localStorage.getItem('catregory'))
    })
}
lastCategry()