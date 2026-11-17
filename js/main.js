import { fetchData } from "./api.js";
import { showChannels , removeHidden, showCategory , filterByCategory ,changeBgChannel, showDetailsChannel,playStream , pannelDeBlacklist , afficherBlacklist} from "./ui.js";
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
}
document.addEventListener('DOMContentLoaded', app);