// Music
var tempMusic = "";
song = document.querySelector(".music");
if (tempMusic) {
    song.src = tempMusic;
}

// Door Start
function openDoor() {
    // Back to Top
    window.scrollTo(0, 0);

    // Sound Door
    var soundDoor = document.querySelector(".sound-door");
    soundDoor.play();

    // Door Section
    var doorSection = $("#door-section");
    var doors = document.querySelectorAll(".door");
    doors.forEach(function (door, index) {
        var direction = index === 0 ? -1 : 1;
        door.style.transform = "rotateY(" + 70 * direction + "deg)";
    });

    // Set Timeout
    setTimeout(function () {
        // Music Play
        song.play();
        doorSection.css("transform", "scale(6)");
    }, 600);

    // SetTimeout DoorSection
    setTimeout(function () {
        doorSection.css("opacity", 0);
        $("body").removeClass("overflow-hidden");
        $("body").addClass("transition");
        doorSection.css("display", "none");
    }, 2000);
}

// Button Music
var isPlaying = true;

function toogleMusic(event) {
    event.preventDefault();
    const musicButton = document.getElementById("music-button");
    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
        musicButton.classList.remove("rotate");
        musicButton.style.transform = "translateY(0)";
        song.pause();
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
        musicButton.classList.add("rotate");
        song.play();
    }

    isPlaying = !isPlaying;
}

// Countdown
var countdownDate = new Date("Sep, 27, 2025 10:00:00").getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countdownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-wedding").innerHTML = `
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Menit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5> Detik</div></div>
    `;


    if(distance < 0) {
        clearInterval(x)
        document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Already Started</h2></span>"
    }
}, 1000);

// Nama Sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama}`