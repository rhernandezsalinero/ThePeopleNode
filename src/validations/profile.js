const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    surname: Joi.string().min(2).max(30).required(),
    picture: Joi.string().uri().required(),
    date: Joi.date().required(),
    profession: Joi.string().min(2).max(30).required(),
    biography: Joi.string().min(2).required()
    
})

function validate(body) {
    return schema.validate({
        name: body.name.toLowerCase(),
        surname: body.surname.toLowerCase(),
        picture: body.picture,
        date: body.date,
        profession: body.profession.toLowerCase(),
        biography: body.biography.toLowerCase()
    })
}
module.exports = {
    validate
}