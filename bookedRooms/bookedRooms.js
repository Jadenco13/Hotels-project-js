let navBarButton = document.querySelector(".navBar button");
secondNav = document.querySelector(".nav-ul-2");

navBarButton.addEventListener("click", () => {
  secondNav.classList.toggle("secondNav");
});
let bookedRooms = document.querySelector(".bookedRooms");
let bookedCards = document.querySelector(".bookedCards");
showBookedRooms();
function showBookedRooms() {
  fetch("https://hotelbooking.stepprojects.ge/api/Booking")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        bookedRooms.innerHTML += `
                <tr class="myBorder">
                    <td class="text-center">Hotel</td>
                    <td class="text-center">Room</td>
                    <td class="text-center">
                    <span>
                    Name: ${el.customerName}
                    </span>
                    <br>
                    <span>
                    Phone: ${el.customerPhone}
                    </span>
                    </td>
                    <td class="text-center"><button class="btn btn-secondary p-0 px-1" disabled>Booked</button></td>
                    <td class="text-center">${el.checkInDate.split("T")[0]}</td>
                    <td class="text-center">${
                      el.checkOutDate.split("T")[0]
                    }</td>
                    <td class="text-center">${el.totalPrice} &#8364;</td>
                    <td class="text-center"><button onclick="removeBooking(${
                      el.id
                    })" type="button" class="btn btn-outline-danger">CANCEL BOOKING</button></td>
                </tr>
            `;
        bookedCards.innerHTML += `
                    <div class="card border-success mb-3 w-100">
            <div class="card-header bg-transparent border-success">
            <p>
              <b>
              Name: ${el.customerName}
              </b> 
            </p>
            <p>
              <b>
              Phone: ${el.customerPhone}
              </b>
            </p>
            </div>
            <div class="card-body text-success">
              <button class="btn btn-secondary p-0 px-1" disabled>
                Booked
              </button>
              <p class="card-text">
                ${el.checkInDate.split("T")[0]} ${el.checkOutDate.split("T")[0]}
              </p>
            </div>
            <div class="card-footer bg-transparent border-success d-flex justify-content-between">
            <span> 
            ${el.totalPrice} &#8364;
            </span>
            <span>
            <button
              onclick="removeBooking(${el.id})"
              type="button"
              class="btn btn-outline-danger"
            >
              CANCEL BOOKING
            </button>
            </span>
            </div>
          </div>
            `;
      });
    })
    .catch((err) => err);
}

function removeBooking(bookingId) {
  fetch(`https://hotelbooking.stepprojects.ge/api/Booking/${bookingId}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
    },
  })
    .then((data) => {
      bookedRooms.innerHTML = "";
      showBookedRooms();
    })
    .catch((err) => err);
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
