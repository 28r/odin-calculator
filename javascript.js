let disp = 0;
let mem = null;
let storedop = null;
let screen = document.getElementById("screen");
let emptyNextButtonPress = null;
let stickLol = false;
let operatorsBlocked = false;

function operate(op) {
    if (operatorsBlocked == true) {
        return 1;
    }
    if (mem == null) {
        mem = disp;
        disp = 0;
        storedop = op;
        screen.innerHTML = "0";
        operatorsBlocked = true;
        return;
    }
    else {
        if (storedop != null) {
            helper = storedop;
            storedop = null;
            operate(helper);
            mem = disp;
            disp = 0;
            emptyNextButtonPress = true;
            operatorsBlocked = true;
            return;
        }
        else {
            disp = parseFloat(disp);
            mem = parseFloat(mem);
            switch (op) {
                case '*':
                    disp = mem*disp;
                    populate(roundForPrinting(disp));
                    operatorsBlocked = true;
                    emptyNextButtonPress = true;
                    break;
                case '/':
                    if (disp == 0) {
                        screen.innerHTML = "lol";
                        stickLol = true;
                        return;
                    }
                    disp = mem/disp;
                    populate(roundForPrinting(disp));
                    operatorsBlocked = true;
                    emptyNextButtonPress = true;
                    break;
                case '+':
                    disp = mem+disp;
                    populate(roundForPrinting(disp));
                    operatorsBlocked = true;
                    emptyNextButtonPress = true;
                    break;
                case '-':
                    disp = mem-disp;
                    populate(roundForPrinting(disp));
                    operatorsBlocked = true;
                    emptyNextButtonPress = true;
                    break;
                default:
                    throw new Error("Something went badly wrong!");
            }
        }
    }
    return;
}

function clearBox() {
    disp = 0;
    mem = null;
    storedop = null;
    screen.innerHTML = "0";
    emptyNextButtonPress = null;
    operatorsBlocked = false;
    return;
}

function populate(value) {
    screen.innerHTML = "";
    screen.innerHTML = `${value}`;
    return;
}

function concatenate(digit) {
    operatorsBlocked = false;
    if (disp === '0.') {
        disp = ("" + disp + digit);
        populate(disp);
        return;
    }
    else if ((disp == 0 && emptyNextButtonPress == null) || (disp == 0 && emptyNextButtonPress == false)) {
        disp = digit;
        populate(disp);
        return;
    }
    else if (disp.toString().length > 8) {
        return 1;
    }
    else if (emptyNextButtonPress == true) {
        disp = digit;
        populate(disp);
        emptyNextButtonPress = false;
        return;
    }
    else {
        disp = ("" + disp + digit);
        populate(disp);
        return;
    }
}

function invert() {
    disp = disp*-1;
    populate(disp);
    return;
}

function addfloat() {
    if (disp == 0) {
        disp = '0.';
        populate(disp);
    }
    else if (disp.toString().includes(`.`) == true) {
        return 1;
    }
    else {
        disp = ("" + disp + '.');
        console.log(disp);
        populate(disp);
        return;
    }
}

function enter() {
    operatorsBlocked = false;
    operate(storedop);
    if (stickLol == true) {
        stickLol = false;
        return 1;
    }
    helper = mem;
    clearBox();
    disp = helper;
    screen.innerHTML = `${roundForPrinting(disp)}`;
    return;
}

function roundForPrinting(num) {
    helper = parseFloat(Math.round(num + 'e' + '15') + 'e-' + '15').toString();
    if (helper.length < 10) {
        return helper;
    }
    else {
        return helper.substring(0, 9);
    }
}

function dispToPercent() {
    disp = disp * 0.01;
    populate(roundForPrinting(disp));
}

// Support for keyboard controls
window.addEventListener('keydown', function(e){
    for (let i = 0; i < 10; i++) {
        if (e.key === `${i}`){
            let target = this.document.getElementById(`${i}`);
            target.click();
        }
    }
    if (e.key === '.' || e.key === ',') {
        let target = this.document.getElementById('dot');
        target.click();
    }
    if (e.key === 'c' || e.key === 'C') {
        let target = this.document.getElementById('clear');
        target.click();
    }
    if (e.key === '*') {
        let target = this.document.getElementById('multiply');
        target.click();
    }
    if (e.key === '+') {
        let target = this.document.getElementById('plus');
        target.click();
    }
    if (e.key === '-') {
        let target = this.document.getElementById('minus');
        target.click();
    }
    if (e.key === '/') {
        let target = this.document.getElementById('split');
        target.click();
    }
    if (e.key === 'Enter') {
        let target = this.document.getElementById('enter');
        target.click();
    }
});