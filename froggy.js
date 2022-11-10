var blockHeight = 40, blockWidth = 40;
var grid = document.querySelector('.grid');
var froggy = document.createElement('div');
froggy.classList.add('froggy');
grid === null || grid === void 0 ? void 0 : grid.appendChild(froggy);
var froggtStartIndex = [160, 0];
froggy.style.left = froggtStartIndex[0] + 'px';
froggy.style.bottom = froggtStartIndex[1] + 'px';
var moveX = froggtStartIndex[0], moveY = froggtStartIndex[1];
function youLose() {
    document.removeEventListener('keydown', move);
    clearInterval(timerID);
    clearInterval(spawnTimer);
    console.log('you lose');
}
function checkForCollaigen() {
    for (var i = 0; i < obsticals.length; i++) {
        if (obsticals[i].getAttribute('class') == 'car') {
            var frogX = +froggy.style.left.valueOf().slice(0, -2);
            var frogY = +froggy.style.bottom.valueOf().slice(0, -2);
            var obsticalX = +obsticals[i].style.left.valueOf().slice(0, -2);
            var obsticalY = +obsticals[i].style.bottom.valueOf().slice(0, -2);
            if (obsticalX <= frogX + 40
                && frogX <= obsticalX + 50
                && (frogY + 10 == obsticalY || frogY - 30 == obsticalY)
                && frogY != 120 && frogY < 200
                && frogY != 0) {
                youLose();
                console.log('check For Collaigen');
            }
        }
    }
}
function jumpOnLog() {
    var frogX = +froggy.style.left.valueOf().slice(0, -2);
    var frogY = +froggy.style.bottom.valueOf().slice(0, -2);
    if (frogY == 360) {
        document.removeEventListener('keydown', move);
        clearInterval(timerID);
        clearInterval(spawnTimer);
        alert('you Won !!!');
    }
    if (frogY > 200 && frogY != 360) {
        if (obsticals.some(function (a) { return frogY == +a.style.bottom.valueOf().slice(0, -2) - 5 && +a.style.left.valueOf().slice(0, -2) <= frogX
            && frogX <= +a.style.left.valueOf().slice(0, -2) + 80; })) {
            console.log('work');
        }
        else {
            youLose();
            console.log('jump on log');
        }
    }
}
function move(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (moveX > 0) {
                moveX -= 40;
            }
            break;
        case 'ArrowRight':
            if (moveX < 280) {
                moveX += 40;
            }
            break;
        case 'ArrowUp':
            if (moveY < 360) {
                moveY += 40;
            }
            break;
        case 'ArrowDown':
            if (moveY > 0) {
                moveY -= 40;
            }
            break;
    }
    froggy.style.left = moveX + 'px';
    froggy.style.bottom = moveY + 'px';
}
document.addEventListener('keydown', move);
var obsticals = [];
var obstical = /** @class */ (function () {
    function obstical() {
        this.start = 0;
    }
    obstical.prototype.spawn = function (Xaxis, yaxis, cla) {
        var diva = document.createElement('div');
        diva.classList.add('car');
        if (cla != undefined) {
            diva.classList.remove('car');
            diva.classList.add('log');
        }
        grid === null || grid === void 0 ? void 0 : grid.appendChild(diva);
        diva.style.left = Xaxis + 'px';
        diva.style.bottom = yaxis + 'px';
        obsticals.push(diva);
    };
    return obstical;
}());
function movement() {
    for (var i = 1; i < obsticals.length; i += 2) {
        var Xaxis = obsticals[i].style.left.valueOf();
        var scale = +Xaxis.slice(0, -2);
        if (scale < 360) {
            scale += 1;
            obsticals[i].style.left = scale + 'px';
        }
    }
    for (var i = 0; i < obsticals.length; i += 2) {
        var Xaxis = obsticals[i].style.left.valueOf();
        var scale = +Xaxis.slice(0, -2);
        if (scale <= 360 && scale > -90) {
            scale -= 1;
            obsticals[i].style.left = scale + 'px';
        }
    }
    for (var i = 0; i < obsticals.length; i++) {
        if (obsticals[i].style.left.valueOf() == '-90px' || obsticals[i].style.left.valueOf() == '360px') {
            obsticals[i].remove();
        }
    }
    checkForCollaigen();
    jumpOnLog();
}
var timerID = setInterval(movement, 15);
var spawnTimer = setInterval(function () {
    new obstical().spawn(360, 50);
    new obstical().spawn(-70, 170);
    new obstical().spawn(360, 245, 'log');
    new obstical().spawn(-90, 285, 'log');
    new obstical().spawn(360, 325, 'log');
}, 2000);
var block = /** @class */ (function () {
    function block(Xaxis, yaxis) {
        this.bottomLeft = [Xaxis, yaxis];
        this.bottomRight = [Xaxis + blockWidth, yaxis];
        this.topLeft = [Xaxis, yaxis + blockHeight];
        this.topRight = [Xaxis + blockWidth, yaxis + blockHeight];
    }
    return block;
}());
function blocking(className, Xaxis, yaxis) {
    var block = document.createElement('div');
    block.classList.add("" + className);
    block.classList.add('block');
    grid === null || grid === void 0 ? void 0 : grid.appendChild(block);
    block.style.left = Xaxis + 'px';
    block.style.bottom = yaxis + 'px';
}
var blocks = [
    [
        new block(0, 0), new block(40, 0), new block(80, 0), new block(120, 0), new block(160, 0), new block(200, 0), new block(240, 0), new block(280, 0)
    ],
    [new block(0, 40), new block(40, 40), new block(80, 40), new block(120, 40), new block(160, 40), new block(200, 40), new block(240, 40), new block(280, 40)
    ],
    [new block(0, 80), new block(40, 80), new block(80, 80), new block(120, 80), new block(160, 80), new block(200, 80), new block(240, 80), new block(280, 80)
    ],
    [new block(0, 120), new block(40, 120), new block(80, 120), new block(120, 120), new block(160, 120), new block(200, 120), new block(240, 120), new block(280, 120)
    ],
    [new block(0, 160), new block(40, 160), new block(80, 160), new block(120, 160), new block(160, 160), new block(200, 160), new block(240, 160), new block(280, 160)
    ],
    [new block(0, 200), new block(40, 200), new block(80, 200), new block(120, 200), new block(160, 200), new block(200, 200), new block(240, 200), new block(280, 200)
    ],
    [new block(0, 240), new block(40, 240), new block(80, 240), new block(120, 240), new block(160, 240), new block(200, 240), new block(240, 240), new block(280, 240)
    ],
    [new block(0, 280), new block(40, 280), new block(80, 280), new block(120, 280), new block(160, 280), new block(200, 280), new block(240, 280), new block(280, 280)
    ],
    [new block(0, 320), new block(40, 320), new block(80, 320), new block(120, 320), new block(160, 320), new block(200, 320), new block(240, 320), new block(280, 320)
    ],
    [new block(0, 360), new block(40, 360), new block(80, 360), new block(120, 360), new block(160, 360), new block(200, 360), new block(240, 360), new block(280, 360)
    ],
    [new block(0, 400), new block(40, 400), new block(80, 400), new block(120, 400), new block(160, 400), new block(200, 400), new block(240, 400), new block(280, 400)
    ]
];
for (var i = 0; i < 8; i++) {
    blocking('grass', blocks[0][i].bottomLeft[0], blocks[0][i].bottomLeft[1]);
    blocking('street', blocks[1][i].bottomLeft[0], blocks[1][i].bottomLeft[1]);
    blocking('street', blocks[2][i].bottomLeft[0], blocks[2][i].bottomLeft[1]);
    blocking('grass', blocks[3][i].bottomLeft[0], blocks[3][i].bottomLeft[1]);
    blocking('street', blocks[4][i].bottomLeft[0], blocks[4][i].bottomLeft[1]);
    blocking('street', blocks[5][i].bottomLeft[0], blocks[5][i].bottomLeft[1]);
    blocking('river', blocks[6][i].bottomLeft[0], blocks[6][i].bottomLeft[1]);
    blocking('river', blocks[7][i].bottomLeft[0], blocks[7][i].bottomLeft[1]);
    blocking('river', blocks[8][i].bottomLeft[0], blocks[8][i].bottomLeft[1]);
    blocking('grass', blocks[9][i].bottomLeft[0], blocks[9][i].bottomLeft[1]);
}
export {};
