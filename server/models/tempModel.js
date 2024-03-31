// Temp model required to get server running
const { Schema, model } = require('mongoose');

const tempModelSchema = new Schema ({

});

const tempModel = model('tempModel', tempModelSchema);

module.exports = tempModel;