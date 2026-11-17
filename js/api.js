import { setDataLocaleSorage } from "./storage.js";
import { AddloadingSpin, loadingSearch } from "./ui.js";
const API_URL = 'https://6af1ff2842c6561ced38e417.mockapi.io/channels'
export async function fetchData() {
    // const url = 'https://6af1ff2842c6561ced38e417.mockapi.io/channels';
    try {
        let response = await fetch(API_URL);
        if (!response.ok) throw new Error(response.status);

        let data = await response.json()
        console.log(data)

        setDataLocaleSorage(data)

    }
    catch (error) {
        console.log('erorak')
        console.error("error     :", error)
        AddloadingSpin()
        loadingSearch()
    }


}
export async function ajouteToMockupApi() {

    const response = await fetch(API_URL);
    const channels = await response.json();

    for (const channel of channels) {

        await fetch(`${API_URL}/${channel.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFavorite: false, isBlacklisted: false }),
        });

    }

}
export async function checkTrueFalse(path) {
    // const response = await fetch(API_URL);
    // const channels = await response.json();


    await fetch(`${API_URL}/${path.id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
            id: path.id,
            channelNumber: path.channelNumber,
            name: path.name,
            category: path.category,
            country: path.country,
            countryCode: path.countryCode,
            logo: path.logo,
            previewImage: path.previewImage,
            streamUrl: path.streamUrl,
            isLive: path.isLive,
            epg: {
            currentProgram: path.epg.currentProgram,
            startTime: path.epg.startTime,
            endTime: path.epg.endTime,
            progressPercentage: path.epg.progressPercentage
        },
            isFavorite: path.isFavorite,
            isBlackliste: true
    }),


    })


}
