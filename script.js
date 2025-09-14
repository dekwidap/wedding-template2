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
        var direction = (index === 0) ? -1 : 1;
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
var isPlaying = true

function toogleMusic(event) {
    event.preventDefault()
    const musicButton = document.getElementById('music-button')
    if(isPlaying){
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        song.pause()
    }
    else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        song.play()
    }

    isPlaying = !isPlaying
}