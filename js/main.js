import { fetchData } from "./api.js";
import { showChannels , removeHidden, showCategory , filterByCategory ,changeBgChannel, showDetailsChannel,playStream , pannelDeBlacklist , afficherBlacklist, returnChannelFromBlacklist} from "./ui.js";
function app(){
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
}
document.addEventListener('DOMContentLoaded', app);