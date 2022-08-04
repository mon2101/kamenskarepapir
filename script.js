const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
goto(-250, 250);

const program = async() => {
    // NE DIRATI IZNAD OVE LINIJE
    for (let brojac = 0; brojac < 180; brojac++) {
        forward(50);
        right(60);
        await sleep(50);
    }
    // NE DIRATI ISPOD OVE LINIJE
};
// program()
//---------------------------------------------------
//---------------------------------------------------

const pobjeda = Symbol("pobjeda");
const poraz = Symbol("izgubio si");
const nerijeseno = Symbol("nerijeseno");
const lijevo = Symbol(`lijevo`);
const desno = Symbol(`desno`);

const getPlayerChoice = () => {
    const input = prompt("Unesi kamen, skare ili papir");
    return input;
};

const getComputerChoice = () => {
    const broj = Math.random();
    if (broj < 0.33) return "kamen";
    else if (broj < 0.66) return "skare";
    else return "papir";
};

const ispisiPotez = async(igrac, kompjuter) => {
    switch (igrac) {
        case "skare":
            nacrtajSkare(lijevo);
            break;
        case "kamen":
            nacrtajKamen(lijevo);
            break;
        case "papir":
            nacrtajPapir(lijevo);
            break;
    }
    await sleep(1000);
    switch (kompjuter) {
        case "skare":
            nacrtajSkare(desno);
            break;
        case "kamen":
            nacrtajKamen(desno);
            break;
        case "papir":
            nacrtajPapir(desno);
            break;
    }
};

const nacrtajSkare = (mjesto) => {
    if (mjesto === desno) {
        goto(0, 0);
    } else if (mjesto === lijevo) {
        goto(-200, 0);
    }
    right(45);
    forward(100);
    right(180);
    forward(100);
    left(45);
    right(145);
    forward(100);
    left(145);
};
const nacrtajPapir = (mjesto) => {
    if (mjesto === desno) {
        goto(0, 0);
    } else if (mjesto === lijevo) {
        goto(-200, 0);
    }
    forward(100);
    right(90);
    forward(50);
    right(90);
    forward(100);
    right(90);
    forward(50);
    right(90);
};

const nacrtajKamen = (mjesto) => {
    if (mjesto === desno) {
        goto(0, 0);
    } else if (mjesto === lijevo) {
        goto(-200, 0);
    }
    for (let brojac = 0; brojac < 360; brojac++) {
        forward(0.5);
        right(1);
    }
};

const oneRound = async(igrac, kompjuter) => {
    await ispisiPotez(igrac, kompjuter);
    console.log(igrac, kompjuter);
    if (igrac === "skare" && kompjuter === "papir") return pobjeda;
    else if (igrac === "skare" && kompjuter === "kamen") return poraz;
    else if (igrac === "skare" && kompjuter === "skare") return nerijeseno;
    else if (igrac === "papir" && kompjuter === "kamen") return pobjeda;
    else if (igrac === "papir" && kompjuter === "skare") return poraz;
    else if (igrac === "papir" && kompjuter === "papir") return nerijeseno;
    else if (igrac === "kamen" && kompjuter === "kamen") return nerijeseno;
    else if (igrac === "kamen" && kompjuter === "skare") return pobjeda;
    else if (igrac === "kamen" && kompjuter === "papir") return pobjeda;
};

const igra = async() => {
    let scoreIgrac = 0;
    let scoreKompjuter = 0;

    for (let brojac = 0; brojac < 3; brojac++) {
        const rez = await oneRound(getPlayerChoice(), getComputerChoice());
        await sleep(1);
        if (rez === poraz) {
            scoreKompjuter = scoreKompjuter + 1;
            alert("Izgubili ste");
        } else if (rez === pobjeda) {
            scoreIgrac = scoreIgrac + 1;
            alert("Pobijedili ste");
        } else {
            alert("Izjednačeno");
        }
        console.log(rez);
    }
    alert(
        `Konacni rezultat igraca je ${scoreIgrac} a konacni rezultat kopmjutera je ${scoreKompjuter}`
    );
};

igra();