import { setDataLocaleSorage } from "./storage.js";
import { AddloadingSpin , loadingSearch} from "./ui.js";
export async function fetchData(){
    const url = 'https://6af1ff2842c6561ced38e417.mockapi.io/channels';
    try{
         let response = await fetch(url);
         if(!response.ok) throw new Error(response.status);
         
       let data = await response.json()
       console.log(data)
       
       setDataLocaleSorage(data)
  
    }
    catch(error){
        console.log('erorak')
        console.error("error     :" ,error)
        AddloadingSpin()
        loadingSearch()
    }
   
    
}
export async function ajouteToMockupApi(){
    const API_URL = 'https://6af1ff2842c6561ced38e417.mockapi.io/channels'
    const response =await fetch(API_URL);
    const channels = await response.json();

    for (const channel of channels){
        await fetch(`${API_URL}/${channel.id}`,{
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({ isFavorite: false , isBlacklisted: false}),
        
        });
       
    }
   
}