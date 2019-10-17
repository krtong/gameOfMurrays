//global variables
let wins, losses, score, goal;
let numOfMurrays = 5; //changing this may make the game run a bit slow....

//helper functions
const randomNum = (min, max) => Math.floor(min + Math.random() * (max - min));

const createMurrays = () => { //behold, my creation.
    let murrayValues = [];
    let html = "";

    while (murrayValues.length < numOfMurrays) { //create numbers unique to each Murray, no duplicates.
        let randomValue = randomNum(1, numOfMurrays + 5);
        if (murrayValues.indexOf(randomValue) === -1) murrayValues.push(randomValue);
    }

    for (let i = 0; i < numOfMurrays; i++) { //makes the game load hella slow but it's fun: random murray image generator.
        let value = murrayValues[i];
        let width = randomNum(120, 150);
        let height = randomNum(170, 200);
        let imgSrc = `https://www.fillmurray.com/${width}/${height}`;

        html += `<img src="${imgSrc}" class="murray" value="${value}">`
    }

    $("#div-of-murrays").html(html);
    initializeClickHandlers()
};

const displayScoreBoard = (s = score, g = goal, w = wins, l = losses) => {
    [score, goal, wins, losses] = [s, g, w, l]; //updating the global variables
    let scorecard = `Goal: ${g} | Score ${s} | Wins : ${w} | Losses : ${l}`;
    $("#scorecard").html(scorecard);
};


//click handlers.. click handlers must be initialized EVERY TIME a new murray is added to the document.
const initializeClickHandlers = () => {

    $("#reset").click(function () {
        $("#message").empty();
        displayScoreBoard(0, randomNum(50, 100), wins, losses);
        createMurrays(numOfMurrays);
    });

    $(".murray").click(function () {
        let secretMurphyValue = parseInt($(this)[0].attributes[2].value); //fucky workaround
        score = score + secretMurphyValue;

        if (score > goal) {
            $("#div-of-murrays").empty();
            $("#message").append("<h1>you lose!</h1>");
            losses++;
        }

        if (score === goal) {
            $("#div-of-murrays").empty();
            $("#message").append("<h1>you won!</h1>");
            wins++;
        }

        displayScoreBoard();
    });
};

displayScoreBoard(0, randomNum(50, 100), 0, 0);
createMurrays(numOfMurrays);