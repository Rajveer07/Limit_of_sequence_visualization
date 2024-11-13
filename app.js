alert("There are two bounds yellow (L + ε) and pink (L-ε) line the depending upon epsilon (the position of yellow or the pink line) the green line shifted such that all the points right of the green line (or the terms of the sequence for all n>=N) are between the new bounds and consequently the sequence converges");

let myCanvas = document.getElementById("myCanvas");

const height = window.innerHeight;
const width = window.innerWidth;
myCanvas.width = width;
myCanvas.height = height;

var ctx = myCanvas.getContext("2d");

let epsilon = height / 8;
let L = height / 2;
let pointRadius = 3;
let maxTerms = 50;
let sequenceData = [];
let minEpsilon = 5;
let maxEpsilon = height / 2;
let epsilonStep = 2;
let N = width - (epsilon / maxEpsilon) * width;

let generateSequence = () => {
    sequenceData = [];
    for (let n = 1; n <= maxTerms; n++) {
        let x = (n / maxTerms) * width;
        let y = L - (height / 4) * (1 / n);
        sequenceData.push({ x, y, originalY: y });
    }
};

let drawCanvas = () => {
    ctx.clearRect(0, 0, width, height);

    drawLine(3, 1, 3, height, "blue");  // Adjusted x position for the blue line
    drawLine(0, L, width, L, "red");
    drawLine(N, 0, N, height, "green");
    drawLine(0, L - epsilon, width, L - epsilon, "yellow");
    drawLine(0, L + epsilon, width, L + epsilon, "pink");

    drawPoints();
};

let drawLine = (a, b, c, d, color) => {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.lineTo(c, d);
    ctx.stroke();
};

let drawPoints = () => {
    sequenceData.forEach((point) => {
        if (point.x < N) {
            ctx.fillStyle = "gray";
        } else if (point.y >= (L - epsilon) && point.y <= (L + epsilon)) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "gray";
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
        ctx.fill();
    });
};

let updateVisualization = () => {
    epsilon = Math.max(minEpsilon, Math.min(maxEpsilon, epsilon));
    N = width - (epsilon / maxEpsilon) * width;
    drawCanvas();
};

myCanvas.addEventListener("mousemove", (event) => {
    if (event.buttons === 1) {
        let deltaY = event.movementY;
        epsilon = Math.max(minEpsilon, Math.min(maxEpsilon, epsilon - deltaY / 10));
        updateVisualization();
    }
});

myCanvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    let deltaY = touch.clientY - (L - epsilon);
    epsilon = Math.max(minEpsilon, Math.min(maxEpsilon, epsilon - deltaY / 10));
    updateVisualization();
});

generateSequence();
drawCanvas();
