
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    venues: [{
        type: Schema.Types.ObjectId,
        ref: 'Venue'
    }]
});

module.exports = mongoose.model('Category', categorySchema);



