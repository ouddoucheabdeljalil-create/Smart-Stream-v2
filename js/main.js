import { fetchData  } from "./api.js";
// import { getBlacklistLocaleSorage } from "./storage.js";
import { showChannels, removeHidden, showCategory , filterByCategory ,changeBgChannel, showDetailsChannel,playStream , pannelDeBlacklist  , afficherBlacklist, returnChannelFromBlacklist } from "./ui.js";

fetchData()
showChannels()
showCategory()
filterByCategory()
changeBgChannel()
removeHidden()
afficherBlacklist() 
showDetailsChannel()
playStream()

// ajouteToMockupApi()
pannelDeBlacklist()
returnChannelFromBlacklist()


// checkStrIcon(getBlacklistLocaleSorage())
