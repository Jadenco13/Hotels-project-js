let navBarButton = document.querySelector(".navBar button");
let section = document.querySelector('section')
secondNav = document.querySelector(".nav-ul-2");

navBarButton.addEventListener("click", () => {
  secondNav.classList.toggle("secondNav");
});

fetch("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    data.forEach(el => {
        section.innerHTML += `
            <div class="card overflow-hidden" style="width: 20rem; height: 18:rem">
              <div class="hover-part">
                <div>
                  <img
                    src="${el.featuredImage}"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="room-info d-flex justify-content-between">
                  <div class="align-content-center p-3"><b>${el.name}</b></div>
                </div>
                <div class="hiden-part w-100">
                  <button onclick="goToRoomsPage(${el.id})" class="card-booking-button w-100 text-light">VIEW ROOMS</button>
                </div>
              </div>
            </div>
        `
    })
})
  .catch((err) => err);

function goToRoomsPage(hotelId) {
  sessionStorage.setItem('hotelId', hotelId)
  window.location.href = '../rooms/rooms.html'
}