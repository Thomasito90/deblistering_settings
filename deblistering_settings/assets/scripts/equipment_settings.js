import drugs from '/assets/database/drugs.json' assert {type: 'json'};

const settings = document.getElementById('settings');
const electricStripfoilTable = document.getElementById('electricStripfoilTable');
const electricMangleTable = document.getElementById('electricMangleTable');
const manualMangleTable = document.getElementById('manualMangleTable');
const deblisterByHandTable = document.getElementById('deblisterByHandTable');
const scanBtn = document.getElementById('scanBtn');
const scanBarcode = document.getElementById('scanBarcode');
const userInput = document.getElementById('userInput');
const findBtn = document.getElementById('findBtn');
const electricStripfoilBtn = document.getElementById('electricStripfoilBtn');
const electricMangleBtn = document.getElementById('electricMangleBtn');
const manualMangleBtn = document.getElementById('manualMangleBtn');

let drugName = document.getElementById('drugName');

let magazineWidth = document.getElementById('magazineWidth');
let brushHeight = document.getElementById('brushHeight');
let toeSlidePosition = document.getElementById('toeSlidePosition');
let rollerNumber = document.getElementById('rollerNumber');
let rollerCarriageNipDrum = document.getElementById('rollerCarriageNipDrum');
let speed = document.getElementById('speed');

let electricManglePosition = document.getElementById('electricManglePosition');
let electricMangleRoller = document.getElementById('electricMangleRoller');
let electricMangleRollerGap = document.getElementById('electricMangleRollerGap');

let manualManglePosition = document.getElementById('manualManglePosition');
let manualMangleRoller = document.getElementById('manualMangleRoller');
let manualMangleRollerGap = document.getElementById('manualMangleRollerGap');


scanBtn.style.display = 'none';
settings.style.display = 'none';

function showHidden() {
    findBtn.style.display = 'block';
    userInput.style.display = 'block';
    scanBarcode.style.display = 'block';
    scanBtn.style.display = 'none';
    settings.style.display = 'none';
    userInput.value = '';
    userInput.focus();
    return userInput;

}

function getUserInput() {
  return userInput.value;
}

function showStripfoil() {
    electricStripfoilTable.style.display = 'table';
    electricMangleTable.style.display = 'none';
    manualMangleTable.style.display = 'none';
    deblisterByHandTable.style.display = 'none';
}

function showElectricMangle() {
    electricStripfoilTable.style.display = 'none';
    electricMangleTable.style.display = 'table';
    manualMangleTable.style.display = 'none';
    deblisterByHandTable.style.display = 'none';
}

function showManualMangle() {
    electricStripfoilTable.style.display = 'none';
    electricMangleTable.style.display = 'none';
    manualMangleTable.style.display = 'table';
    deblisterByHandTable.style.display = 'none';
}

function showByHand() {
    electricStripfoilTable.style.display = 'none';
    electricMangleTable.style.display = 'none';
    manualMangleTable.style.display = 'none';
    deblisterByHandTable.style.display = 'block';
}

function find() {
    const barcode = getUserInput();

    let drugFound = false;

    for (let i = 0; i < drugs.length; i++) {

        let drug = drugs[i];
        
        if (drug.gtin === barcode) {

            drugFound = true;

            findBtn.style.display = 'none';
            userInput.style.display = 'none';
            scanBarcode.style.display = 'none';
            scanBtn.style.display = 'block';
            settings.style.display = 'block';

            drugName.textContent = drug.drugName;
            console.log(drug.gtin + " = " + barcode);

            magazineWidth.textContent = drug.electricStripfoil.magazineWidth + "mm";
            brushHeight.textContent = drug.electricStripfoil.brushHeight + "mm";
            toeSlidePosition.textContent = drug.electricStripfoil.toeSlidePosition + "mm";
            rollerNumber.textContent = drug.electricStripfoil.rollerNumber;
            rollerCarriageNipDrum.textContent = drug.electricStripfoil.rollerCarriageNipDrum + "mm";
            speed.textContent = drug.electricStripfoil.speed;

            electricManglePosition.textContent = drug.electricMangle.position;
            electricMangleRoller.textContent = drug.electricMangle.rollerNumber;
            electricMangleRollerGap.textContent = drug.electricMangle.rollerGap + "mm";

            manualManglePosition.textContent = drug.manualMangle.position;
            manualMangleRoller.textContent = drug.manualMangle.rollerNumber;
            manualMangleRollerGap.textContent = drug.manualMangle.rollerGap + "mm";

            let electricStripfoilLength = Object.keys(drug.electricStripfoil).length;
            let electricMangleLength = Object.keys(drug.electricMangle).length;
            let manualMangleLength = Object.keys(drug.manualMangle).length;

            if (electricStripfoilLength == 0) {
                electricStripfoilBtn.setAttribute("disabled", "");
            } else {
                electricStripfoilBtn.removeAttribute("disabled", "");
            }

            if (electricMangleLength == 0) {
                electricMangleBtn.setAttribute("disabled", "");
            } else {
                electricMangleBtn.removeAttribute("disabled", "");
            }

            if (manualMangleLength == 0) {
                manualMangleBtn.setAttribute("disabled", "");
            } else {
                manualMangleBtn.removeAttribute("disabled", "");
            }

            if (drugs[i].firstChoiceMachine === "none") {
                showByHand();
            }

            else if (drugs[i].firstChoiceMachine === "electricStripfoil") {
                showStripfoil();
            }

            else if (drugs[i].firstChoiceMachine === "electricMangle") {
                showElectricMangle();
            }

            else if (drugs[i].firstChoiceMachine === "manualMangle") {
                showManualMangle();
            }

        }
    }

    if (drugFound === false) {
        console.log('Drug not found');
        drugNotFound.removeAttribute("hidden", "");
    } else {
        console.log('Drug found');
        drugNotFound.setAttribute("hidden", "");
    }
}

findBtn.addEventListener('click', find);
scanBtn.addEventListener('click', showHidden);
electricStripfoilBtn.addEventListener('click', showStripfoil);
electricMangleBtn.addEventListener('click', showElectricMangle);
manualMangleBtn.addEventListener('click', showManualMangle);
