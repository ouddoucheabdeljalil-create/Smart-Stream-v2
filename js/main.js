import { fetchData  } from "./api.js";
// import { getBlacklistLocaleSorage } from "./storage.js";
import { showChannels, removeHidden, showCategory , filterByCategory ,changeBgChannel, showDetailsChannel,playStream , pannelDeBlacklist  , afficherBlacklist, returnChannelFromBlacklist,ajouteSpace,popUpAjouteChannel } from "./ui.js";

async function app () {
    const data = await fetchData()
    
showChannels(data)
showCategory(data)
filterByCategory(data)

afficherBlacklist(data) 
showDetailsChannel(data)
playStream()
changeBgChannel()
removeHidden()
// ajouteToMockupApi()
pannelDeBlacklist()
returnChannelFromBlacklist(data)
ajouteSpace()
popUpAjouteChannel(data)
}

    
document.addEventListener('DOMContentLoaded', app)
// checkStrIcon(getBlacklistLocaleSorage())
