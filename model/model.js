const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    ime_i_prezime: {
        required: true,
        type: String
    },
    adresa: {
        required: true,
        type: String
    },
    izborni_predmet: {
        required: true,
        type: String
    },
    nastavnik: {
        required: true,
        type: String
    },
    opisna_ocena: {
        required: false,
        type: String
    }
});

module.exports = mongoose.model("Data", dataSchema);