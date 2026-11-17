import { getDataLocaleSorage, setDataLocaleSorage, getBlacklistLocaleSorage, setBlacklistLocaleSorage } from "./storage.js";

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
const blackList = [] || getBlacklistLocaleSorage() 
const data = getDataLocaleSorage()

function afficher(arry, parent) {
    parent.innerHTML = ''
    arry.forEach(element => {

        const list = document.createElement('li')
        list.dataset.id = element.id
        list.className = `list flex flex-row justify-between  px-8 text-2xl text-amber-50 border-amber-50 border text-center`
        list.innerHTML = ` <span>${element.channelNumber}</span><span>${element.name}</span><div class="flex gap-3"><button title="ajouter aux favoris" class="btn-str" data-id="${element.id}"><img src="assest/star.svg" id="star-icon${element.id}"></button><button class="btn-report" title="ajouter à la liste noire" data-id="${element.id}"><img src="assest/report.svg"  id="report-icon${element.id}"></button></div>`
        parent.appendChild(list)
        //  changeBgChannel()

    });
    changeBgChannel()
    filterBlackList(getDataLocaleSorage())

}

export function showChannels() {
    afficher(data, channelsSpace)
    changeStrIcon(data)

    search.addEventListener('input', () => {
        let x = search.value.toLowerCase()
        const filtered = getDataLocaleSorage().filter(p => p.name.toLowerCase().includes(x) || p.channelNumber.toLowerCase().includes(x));
        afficher(filtered, channelsSpace)
        changeStrIcon(filtered)
        filterBlackList(filtered)

    })

}
export function showCategory() {
    data.forEach(e => {
        const list = document.querySelector(`#${e.category}`)
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

export function filterByCategory() {
    spaceCategory.addEventListener('click', (e) => {



        let id = e.target.id


        if (e.target.id === 'tout') {
            afficher(data, channelsSpace)
            changeStrIcon(data)
            filterBlackList(getDataLocaleSorage())

        }
        else {
            const channels = getDataLocaleSorage().filter(e => e.category == id)


            afficher(channels, channelsSpace)

            changeStrIcon(channels)
            filterBlackList(channels)



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

export function showDetailsChannel() {

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
function changeStrIcon(datas) {

    const btnStr = document.querySelectorAll('.btn-str')

    btnStr.forEach(element => {
        element.addEventListener('click', (e) => {
            datas.forEach(p => {
                const strIcon = document.querySelector(`#star-icon${p.id}`)

                if (e.target.id === strIcon.id) {


                    if (strIcon.src === 'http://127.0.0.1:5500/assest/star-fill.svg') {

                        strIcon.src = '/assest/star.svg'
                    }
                    else {
                        strIcon.src = '/assest/star-fill.svg'

                    }
                }
            })

        })
    })

}
function filterBlackList(datas) {
    
    
    const btnReport = document.querySelectorAll('.btn-report')
    btnReport.forEach(element => {
        element.addEventListener('click', (e) => {
            const x = datas.find(p => e.currentTarget.dataset.id === p.id)
            blackList.push(x)
            const y = datas.filter(pro => pro.id !== x.id)
            setDataLocaleSorage(y)
            afficher(y, channelsSpace)
            console.log(blackList)
            setBlacklistLocaleSorage(blackList)
            afficherBlacklist() 
            
        })
        
    })
   
}
export function pannelDeBlacklist(){
      blacklistBtn.addEventListener('click' , (e) =>{
        popUp.classList.toggle('hidden')
        space.classList.toggle('hidden')
    })
}
export function afficherBlacklist(){
    popUpList.innerHTML=''
   blackList.forEach(element => {
        const list = document.createElement('li')
        list.dataset.id = element.id
        list.className = `list flex flex-row justify-between  px-8 text-2xl text-amber-50 border-amber-50 border text-center`
        list.innerHTML = ` <span>${element.channelNumber}</span><span>${element.name}</span><div class="flex gap-3">`
        popUpList.appendChild(list)
    })
}
// afficherBlacklist()
export function playStream() {
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
