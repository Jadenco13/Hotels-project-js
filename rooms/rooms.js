// ? nav
let navBarButton = document.querySelector(".navBar button");
secondNav = document.querySelector(".nav-ul-2");

navBarButton.addEventListener("click", () => {
  secondNav.classList.toggle("secondNav");
});
let ulRoomTypes = document.querySelector(".room-types");
let showFiltredRooms = document.querySelector(".showRooms");
let mainFilterForm = document.querySelector(".mainFilterForm");

if (sessionStorage.getItem("hotelId")) {
  showFiltredRooms.innerHTML = "";
  let hotelId = sessionStorage.getItem("hotelId");
  fetch(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${hotelId}`)
    .then((res) => res.json())
    .then((data) => {
      data.rooms.forEach((el) => {
        showFiltredRooms.innerHTML += `
               <div class="card overflow-hidden" style="width: 20rem; height: 18:rem">
                <div class="hover-part">
                  <div>
                    <img
                    src="${el.images[0].source}"
                    class="card-img-top"
                      alt="..."
                      />
                      </div>
                      <div class="room-info d-flex justify-content-between">
                      <div class="align-content-center"><b class="myFont text-wrap">${el.name}</b></div>
                      <div
                      class="px-4 py-1 border-start d-flex flex-column justify-content-center align-items-center"
                    >
                    <h5 class="fw-bold text-info">&#8364; ${el.pricePerNight}</h5>
                    <small class="text-secondary">a night</small>
                    </div>
                  </div>
                  <div class="hiden-part w-100">
                    <button onclick="goToRoomBooking(${el.id})" class="card-booking-button w-100 text-light">BOOK NOW</button>
                  </div>
                  </div>
                  </div>
                  `;
      });
    })
    .catch((err) => err);
} else {
  showChoosenRooms();
}

fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((el) => {
      ulRoomTypes.innerHTML += `
        <li><button onclick="showChoosenRooms(${el.id})">${el.name}</button></li>
    `;
    });
  })
  .catch((err) => err);

function showChoosenRooms(roomTypeId) {
  showFiltredRooms.innerHTML = ``;
  if (roomTypeId) {
    fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomTypeId: roomTypeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((el) => {
          showFiltredRooms.innerHTML += `
             <div class="card overflow-hidden" style="width: 20rem; height: 18:rem">
              <div class="hover-part">
                <div>
                  <img
                    src="${el.images[0].source}"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="room-info d-flex justify-content-between">
                  <div class="align-content-center"><b class="myFont text-wrap">${el.name}</b></div>
                  <div
                    class="px-4 py-1 border-start d-flex flex-column justify-content-center align-items-center"
                  >
                    <h5 class="fw-bold text-info">&#8364; ${el.pricePerNight}</h5>
                    <small class="text-secondary">a night</small>
                  </div>
                </div>
                <div class="hiden-part w-100">
                  <button onclick="goToRoomBooking(${el.id})" class="card-booking-button w-100 text-light">BOOK NOW</button>
                </div>
              </div>
            </div>
            `;
        });
      })
      .catch((err) => err);
  } else {
    fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((el) => {
          showFiltredRooms.innerHTML += `
             <div class="card overflow-hidden" style="width: 20rem; height: 18:rem">
              <div class="hover-part">
                <div>
                  <img
                    src="${el.images[0].source}"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="room-info d-flex justify-content-between">
                  <div class="align-content-center"><b class="myFont text-wrap">${el.name}</b></div>
                  <div
                    class="px-4 py-1 border-start d-flex flex-column justify-content-center align-items-center"
                  >
                    <h5 class="fw-bold text-info">&#8364; ${el.pricePerNight}</h5>
                    <small class="text-secondary">a night</small>
                  </div>
                </div>
                <div class="hiden-part w-100">
                  <button onclick="goToRoomBooking(${el.id})" class="card-booking-button w-100 text-light">BOOK NOW</button>
                </div>
              </div>
            </div>
            `;
        });
      })
      .catch((err) => err);
  }
}

function filterRooms(e) {
  e.preventDefault();
  showFiltredRooms.innerHTML = ``;
  let myForm = new FormData(mainFilterForm);
  let finalForm = Object.fromEntries(myForm);
  let dataObj = Object.entries(finalForm).filter(
    ([_, value]) => value != null && value !== ""
  );
  fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered", {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(dataObj)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((el) => {
        showFiltredRooms.innerHTML += `
        <div class="card overflow-hidden" style="width: 20rem; height: 18:rem">
              <div class="hover-part">
                <div>
                  <img
                    src="${el.images[0].source}"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="room-info d-flex justify-content-between">
                  <div class="align-content-center"><b class="myFont text-wrap">${el.name}</b></div>
                  <div
                    class="px-4 py-1 border-start d-flex flex-column justify-content-center align-items-center"
                  >
                    <h5 class="fw-bold text-info">&#8364; ${el.pricePerNight}</h5>
                    <small class="text-secondary">a night</small>
                  </div>
                </div>
                <div class="hiden-part w-100">
                  <button onclick="goToRoomBooking(${el.id})" class="card-booking-button w-100 text-light">BOOK NOW</button>
                </div>
              </div>
            </div>
        `;
      });
    })
    .catch((err) => err);
}

function resetFilter(e) {
  e.preventDefault();
  location.reload();
}

function goToRoomBooking(roomId) {
  sessionStorage.setItem("room-id", roomId);
  window.location.assign("../roomDetails/detail-page.html");
}

function scrollPageUp() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  let upButton = document.querySelector(".up-button");
  if (scroll > 500) {
    upButton.classList.remove("hide-element");
    upButton.classList.add("show-up-button");
  } else {
    upButton.classList.remove("show-up-button");
    upButton.classList.add("hide-element");
  }
});
