const inputField = document.getElementById("input")
const shortenBtn = document.querySelector(".shortenBtn")
const shortLinksContainer = document.querySelector(".shortLinkContainer")
const error = document.querySelector(".error")
const menuBar = document.querySelector(".menuBar")
const menu = document.querySelector(".menu")

window.addEventListener("resize",function(){
  if(this.window.innerWidth<375){
    menuBar.classList.remove("hidden")
  }
  else{
    menuBar.classList.add("hidden")
  }
})

window.addEventListener("load",()=>{
  if(this.window.innerWidth<375){
    menuBar.classList.remove("hidden")
  }
  else{
    menuBar.classList.add("hidden")
  }
})

menuBar.addEventListener("click",function(){
  menu.classList.toggle("hidden")
})

async function shorten(longUrl) {
    const API_TOKEN = "o4gpGGBQotTZAyfGIVMF64ccOMx9wXE6bTosWqK2gqLQzA2fKNzWtqpqbC5c"
  try {
    const response = await fetch("https://api.tinyurl.com/create",{
        method : "POST",
        headers:{
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
        url: longUrl
      })
    })

    const data = response.json()
    if(!response.ok){
        console.log("error"+response.status)
        return null
    }
    return data

  } catch (err) {
    console.error("Network/API error:", err.message);
  }
}


shortenBtn.addEventListener("click",async function() {
    if(inputField.value.length === 0){
    inputField.style.border = "3px solid hsl(0, 87%, 67%)"
    error.textContent = "Please add a link"
    error.style.color = "hsl(0, 87%, 67%)"
    return
    }
    const res = await shorten(inputField.value)
    console.log(res.data.tiny_url)
    const div = document.createElement("div")
    div.classList.add("shortUrlItem")
    div.innerHTML = `
            <p class="longUrl">${inputField.value}</p>
               <div class="shortUrl">
                  <p>${res.data.tiny_url}
                  </p>
                  <button class="copyBtn">Copy</button>
               </div>
 `;
 shortLinksContainer.append(div)
 inputField.value = ""
})

inputField.addEventListener("input",function(){
    if(inputField.value.length === 0){
    inputField.style.border = "3px solid hsl(0, 87%, 67%)"
    error.textContent = "Please add a link"
    error.style.color = "hsl(0, 87%, 67%)"
    }else{
       inputField.style.border = "none"
    error.textContent = ""
    error.style.color = "none" 
    }
})

document.addEventListener("click",function(e){
    if(e.target.classList.contains("copyBtn")){
        const p = e.target.previousElementSibling.textContent;
        e.target.textContent = "Copied!"
        e.target.style.backgroundColor = "hsl(257, 27%, 26%)"
        navigator.clipboard.writeText(p)
    }
})