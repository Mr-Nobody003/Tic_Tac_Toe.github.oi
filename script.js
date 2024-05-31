console.log("TIC TAC TOE by MR.Nobody");
console.log("Refference taken from code-with-harry yt");
console.log("Music credits: ");
console.log("Colorful Flowers by Tokyo Music Walker | https://soundcloud.com/user-356546060")
console.log("Music promoted by https://www.chosic.com/free-music/all/")
console.log("Creative Commons CC BY 3.0")
console.log("https://creativecommons.org/licenses/by/3.0/")
//music files
let music = new Audio("Colorful-Flowers(chosic.com).mp3");
music.play();
let audioTurn = new Audio("turn.WAV");
let gameover = new Audio("gameover.mp3");

let turn = 'X';
let game_over = false;
const musicButton = document.getElementById('music');

musicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        //musicButton.classList.remove('strikethrough');
        musicButton.innerHTML = '&#128266';
    } else {
        music.pause();
        //musicButton.classList.add('strikethrough');
        musicButton.innerHTML = '🔇';
    }
});

//function for winner
const checkwin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won";
            game_over = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "30vw";
            // gameover.play();
            //gameover.loop=true;
            music.pause();
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";

            gameover.addEventListener('ended', function () {
                this.currentTime = 0.1;
                this.play();
            }, false);

            gameover.play();
        }
    })
}
//funtion to change turn
const changeturn = () => {
    if (!game_over) {
        return turn === "X" ? "0" : "X"
    }
    else {
        return turn === " ";
    }
}
//Game logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if ( !game_over && boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeturn();
            audioTurn.play();
            checkwin();
            if (!game_over) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
            }
        }
    })
})
//reset
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = 'X';
    game_over = false;
    document.querySelector(".line").style.width = "0px";
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
    gameover.pause();
    music.play();
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

})

//dark mode
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})