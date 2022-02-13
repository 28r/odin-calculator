let disp = 0;
let mem = null;
let storedop = null;
let screen = document.getElementById("screen");
let emptyNextButtonPress = null;
let stickLol = false;

function operate(op) {
    if (mem == null) {
        mem = disp;
        disp = 0;
        storedop = op;
        screen.innerHTML = "0";
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
            return;
        }
        else {
            disp = parseFloat(disp);
            mem = parseFloat(mem);
            switch (op) {
                case '*':
                    disp = mem*disp;
                    populate(disp);
                    break;
                case '/':
                    if (disp == 0) {
                        screen.innerHTML = "lol";
                        stickLol = true;
                        return;
                    }
                    disp = mem/disp;
                    populate(disp);
                    break;
                case '+':
                    disp = mem+disp;
                    populate(disp);
                    break;
                case '-':
                    disp = mem-disp;
                    populate(disp);
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
    return;
}

function populate(value) {
    screen.innerHTML = "";
    screen.innerHTML = `${value}`;
    return;
}

function concatenate(digit) {
    if ((disp == 0 && emptyNextButtonPress == null) || (disp == 0 && emptyNextButtonPress == false)) {
        disp = digit;
        populate(disp);
        return;
    }
    else if (disp.toString().length > 8) {
        return 1;
    }
    else if (emptyNextButtonPress == true) {
        screen.innerHTML = "";
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
    if (disp.toString().includes(`.`) == true) {
        return 1;
    }
    else {
        disp = ("" + disp + '.');
        populate(disp);
        return;
    }
}

function enter() {
    operate(storedop);
    if (stickLol == true) {
        stickLol = false;
        return 1;
    }
    helper = mem;
    clearBox();
    disp = helper;
    screen.innerHTML = `${disp}`;
    return;
}