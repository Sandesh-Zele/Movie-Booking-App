const container = document.querySelector('.container');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const total = document.getElementById('total');

const count = document.getElementById('count');

const movieSelect = document.getElementById('movie');

const btn = document.querySelector('.btn1')

let ticketprice =+ movieSelect.value;

movieSelect.addEventListener("change", e =>{
    ticketprice =+ e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

container.addEventListener('click', e =>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        updateSelectedCount();
    }
})

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
  const seatIndex = [...selectedSeats].map(seat => seat.dataset.seat);  
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex))   
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketprice;
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedmoviePrice", moviePrice);
}

function reflectUI(){
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketprice = +movieSelect.value; 
    }
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    seats.forEach(seat => {
        if (selectedSeats.indexOf(seat.dataset.seat) > -1) {
            seat.classList.add('selected');
        }
    });
}

btn.addEventListener("click",()=>{
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    if(selectedSeats.length === 0){
        alert("Please select atleast one seat")
    } else{
        const seatNumber = [...selectedSeats].map(seat => seat.dataset.seat).join(', ');
        alert(`Booking confirmed for ${selectedSeats.length} seat: ${seatNumber}`);

        localStorage.removeItem("selectedSeats");

        setTimeout(()=>{
            location.reload();
        },100);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    reflectUI();
    updateSelectedCount();
});


