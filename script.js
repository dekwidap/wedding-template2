//AOS
AOS.init();

// Music
var tempMusic = "";
song = document.querySelector(".music");
if (tempMusic) {
    song.src = tempMusic;
}
song.volume = 0.5; // nilai antara 0.0 - 1.0

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
var countdownDate = new Date("Sep, 27, 2026 10:00:00").getTime();
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

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-wedding").innerHTML =
            "<span class='text-center p-3 rounded text-light m-2'><h2>Already Started</h2></span>";
    }
}, 1000);

// Nama Sambutan
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get("p") || "";
const nama = urlParams.get("n") || "Mr./Mrs./Brother/Sister";
const namaSambutan = document.querySelector("#nama-sambutan");
namaSambutan.innerText = `${panggilan} ${nama}`;

// Copy Text
function copyText(el) {
    var content = jQuery(el)
        .siblings("div.card-container")
        .find("div.card-number")
        .text()
        .trim();
    var temp = document.createElement("textarea");

    document.body.appendChild(temp);

    temp.value = content.replace(/\s+/g, "");
    temp.select();

    document.execCommand("Copy");

    document.body.removeChild(temp);

    jQuery(el).text("Berhasil di Copy");

    setTimeout(() => {
        jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`);
    }, 1500);
}

// RSVP
window.addEventListener("load", function () {
    const form = this.document.getElementById("rsvp-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const status = document.getElementById("status").value;
        const nama = document.getElementById("nama").value.trim();

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama Harus Diisi!",
            });
            return;
        }

        if (status == "0") {
            Swal.fire({
                icon: "error",
                text: "Pilih Salah Satu Status!",
            });
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll("input, select, button");

        input.forEach((input) => {
            input.disable = true;
        });
        fetch(action, {
            method: "POST",
            body: data,
        })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text: "Konfirmasi kehadiran anda berhasil terkirim!",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: error,
                });
            })
            .finally(() => {
                input.forEach((input) => {
                    input.disable = false;
                });
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btn-get-started");
    const music = document.getElementById("bg-music");

    button.addEventListener("click", function () {
        music.volume = 0; // mulai dari pelan
        music
            .play()
            .then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    if (vol < 1) {
                        vol += 0.05;
                        music.volume = vol;
                    } else {
                        clearInterval(fade);
                    }
                }, 100); // fade-in selama ~2 detik
            })
            .catch((error) => {
                console.log("Playback failed:", error);
            });
    });
});
