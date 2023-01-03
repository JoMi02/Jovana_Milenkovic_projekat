function ucitajUcenike(){

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        let ucenici = JSON.parse(this.responseText);
        console.log(ucenici);
        let table = generisanje_htmla(ucenici);
        
        document.getElementById("table").innerHTML = table;
    };
    xmlhttp.open("GET", "http://localhost:3000/api/getAll", true);
    xmlhttp.send();

}

function brisanjeUcenika(value){
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
    var message = xmlhttp.responseText;
    if (xmlhttp.status == "200") {
        console.table(message);
    } else {
        console.error(message);
    }
}
    xmlhttp.open("DELETE", `http://localhost:3000/api/delete/${value}`);
    xmlhttp.send();
    let button = document.querySelector(`[value="${value}"]`);
    const row = button.parentElement.closest('tr');
    row.remove();

    console.log("ID obrisanog ucenika je: " + value);

}

function generisanje_htmla(ucenici) {
var table = "<tbody>";
table += "<th>Ime i prezime</th>";
table += "<th>Adresa</th>";
table += "<th>Izborni predmet</th>";
table += "<th>Nastavnik</th>";
table += "<th>Opisna ocena</th>";


ucenici.map((ucenik, index) =>{
    delete ucenik.__v;
    const id = ucenik._id;

    delete ucenik._id;
    table += "<tr>";
        for (const key in ucenik) {
            table += "<td>" + ucenik[key] + "</td>"
        }
        table += "<td>" + `<button class="btn-delete" type='button'onclick="brisanjeUcenika(value)" value=${id}>`+ "izbrisati" +"</button>" + "</td>"
    table += "</tr>";
})


table += "</tbody>";
return table;
}


function unesiUcenika(){
const naziv = document.getElementById("ime_i_prezime").value; 
const jacina = document.getElementById("adresa").value;
const kolicina = document.getElementById("izborni_predmet").value;
const proizvodjac = document.getElementById("nastavnik").value;
const opis = document.getElementById("opisna_ocena").value;
console.log(ime_i_prezime, adresa, izborni_predmet, nastavnik, opisna_ocena);

const ucenik = {
    "ime_i_prezime" : ime_i_prezime,
    "adresa" : adresa,
    "izborni_predmet" : izborni_predmet,
    "nastavnik" : nastavnik,
    "opisna_ocena" : opisna_ocena
}

console.log(ucenik);
let xhttp = new XMLHttpRequest();

xhttp.open("POST", "http://localhost:3000/api/post");
xhttp.setRequestHeader("Accept", "application/json");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onload = () => console.log(xhttp.responseText);

xhttp.send(JSON.stringify(ucenik));
ucitajUcenike();
}

ucitajUcenike();