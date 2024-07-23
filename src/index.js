

// index.js
const url = "http://localhost:3000/ramen"

const displayRamens = () => {
  // Add code
  fetch(url)
  .then((res) => res.json())
  .then((data) =>{
    

    const display = document.querySelector("#ramen-menu")
    display.innerHTML = " "

    data.forEach(ramen => {
     const img = document.createElement("img")
     img.className = "displayImg"
    img.src = ramen.image
    display.appendChild(img)

    img.addEventListener("click", () => clickImg(ramen))
    })
  })

};



function clickImg(ramen){
 
const detailImg = document.querySelector("#ramen-detail .detail-image")
const detailName = document.querySelector("#ramen-detail .name")
const detailHotel = document.querySelector("#ramen-detail .restaurant")
const detailRating = document.querySelector("#rating-display")
const detailComments = document.querySelector("#comment-display")

detailImg.src = ramen.image
detailName.textContent = ramen.name
detailHotel.textContent = ramen.restaurant
detailRating.textContent = ramen.rating 
detailComments.textContent = ramen.comment   
}

function addRamen(){
  const addNew = document.querySelector("#new-ramen")
  addNew.addEventListener("submit", function (e){
    e.preventDefault()

    const formData = new FormData(addNew);
	const data = Object.fromEntries(formData);
	postData(url, data);
	e.target.reset();
  console.log(data);

  })

}

displayRamens()
addRamen()

function postData(url, data){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data),

  })
  .then((res) => res.json())
  .then(()  => {
    fetchData(url)
  })
  .catch((error) => {
    console.error(error)
  })
}