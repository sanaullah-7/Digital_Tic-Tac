const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector(".reset-btn")
const newGameBtn = document.getElementById("new-btn")
const msg = document.getElementById("msg")
const msgContainer = document.querySelector(".msg-container")
const toggleDarkBtn = document.getElementById("toggle-dark")

let turnO = true;
let count = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function resetGame() {
    boxes.forEach(box => {  // yeah boexs ,ay har box par loop chalta ha
        box.disabled = false;//Enables the box again (player can click)
        box.innerHTML = "" //field ya box say (jaise "X" ya "O") hata deta hai
    });
    msgContainer.style.display = "none"; // message hide karo
    turnO = true;
    count = 0
}
newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "<span class='o'>O</span>"
        } else {
            box.innerHTML = "<span class='x'>X</span>"
        }
        //If it was O’s turn, it becomes X’s turn.
        //If it was X’s turn, it becomes O’s turn
        turnO = !turnO;//Jo automatically turn ko ulta kar deta hai (true → false(X ki baari), false → true (O ki baari)).
        box.disabled = true;// Prevent clicking this box again
        count++;

        checkWinner()
    })

});

function checkWinner() {
    for (let pattern of winningConditions) {

        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val)

                msg.innerHTML = `🏆 Congratulation! Winner is  "${pos1Val}"`;
                msgContainer.style.display = "block";

                return;  // ⬅️ agr winner milgaya Yahaan pe function ruk jaayega  aur aagay ka code skip kar deta hai.
            }
            else if (count === 9) {
                msg.innerHTML = ` No winner,  It's a <strong>Tie</strong>🤝 ! `;
                msgContainer.style.display = "block";
            }
        };
    };
};

// 🌗 Toggle Dark Mode
const on = document.querySelector(".fa-toggle-on")
const off = document.querySelector(".fa-toggle-off")
toggleDarkBtn.addEventListener("click", () => {

    document.body.style.backgroundColor = //Yeh batata hai ke abhi page ka background color kya hai (jo JavaScript ne set kiya ho).
        document.body.style.backgroundColor === 'black' ? 'rgb(37, 37, 92)' : 'black';//first click par yeah black hujyga
    //Agar background color black hai, to usay darkblue kar do 2nd button click par... Agar background color black nahi hai koi aur ha, to usay black kar do.

    document.body.style.backgroundColor === 'black' ? on.style.display = " block" : on.style.display = "none";
    document.body.style.backgroundColor === 'black' ? off.style.display = "none" : off.style.display = "block";
});