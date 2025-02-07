let navBarButton = document.querySelector(".navBar button");
secondNav = document.querySelector(".nav-ul-2");

navBarButton.addEventListener("click", () => {
  secondNav.classList.toggle("secondNav");
});

let carouselInerCont = document.querySelector(".up-section .carousel-inner");
let carouselExampleIndicatorsCont = document.querySelector(
  ".up-section .carousel-indicators"
);
let roomIdFromSessionStorage = sessionStorage.getItem("room-id");
let roomInfoPrice = document.querySelector(".roomInfo-price");
let form = document.querySelector("form");
render(roomIdFromSessionStorage);

function render(id) {
  fetch(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${id}`)
    .then((res) => res.json())
    .then((data) => {
      carouselInerCont.innerHTML = carouselExampleIndicatorsCont.innerHTML = ''
      let carouselIner = "";
      let carouselExampleIndicators = "";
      data.images.forEach((img, index) => {
        carouselIner += `
          <div class="carousel-item ${index ? "" : "active"}">
              <img src="${img.source}" class="d-block w-100" alt="...">
          </div>
          `;
        carouselExampleIndicators += `
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${
          index ? "" : "active"
        }" aria-current="true" aria-label="Slide ${index + 1}"></button>
          `;
      });
      carouselInerCont.innerHTML += `
      ${carouselIner}
      `;
      carouselExampleIndicatorsCont.innerHTML += `
      ${carouselExampleIndicators}
      `;
      roomInfoPrice.innerHTML = `
          <p class="text-center align-content-center py-2 m-0">
              <span>${data.name}</span>
              <span class="price-style fw-bold h5 text-info">&#8364; ${data.pricePerNight},-</span>
              <small class="text-secondary">a night</small>
          </p>
      `;
    })
    .catch((err) => err);
}

function bookRoom(e) {
  let bookingForm = new FormData(form);
  let formObj = Object.fromEntries(bookingForm);
  formObj.roomID = roomIdFromSessionStorage;
  if (formObj.checkInDate < formObj.checkOutDate) {
    fetch("https://hotelbooking.stepprojects.ge/api/Booking", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
      })
      .catch((err) => err);
  } else {
    alert("The room could not be reserved");
  }
  e.preventDefault();
}

function showText(num) {
  let texts = document.querySelectorAll(".texts-area p");
  texts.forEach((el, index) => {
    if (index === num) {
      el.classList.remove("hide");
    } else {
      el.classList.add("hide");
    }
  });
}

fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
  .then((res) => res.json())
  .then(data => data.slice(0, 3))
  .then((data) => {
    let otherRoomCardsArea = document.querySelector(".other-room-cards");
    data.forEach((el) => {
      otherRoomCardsArea.innerHTML += `
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
                  <div class="align-content-center"><b>${el.name}</b></div>
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

function goToRoomBooking(roomId) {
  sessionStorage.setItem("room-id", roomId);
  render(sessionStorage.getItem("room-id"));
  scrollPageUp()
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
