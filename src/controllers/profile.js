const controller = {}
const Profile = require('../models/profile')
const profileValidator = require("../validations/profile")

controller.getProfiles = async (req, res) => {
    const search = req.query.search
    const startDate = req.query.startDate
    const endDate = req.query.endDate

    let query = {}
    if (search || (startDate && endDate)) {
        query.filters = []
    }
    if (search) {
        query.filters.push({ fullname: new RegExp(search, 'i') })
    }
    if (startDate && endDate) {
        query.filters.push({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })
    }
    try {
        if (!query.filters || query.filters.length == 0) {
            const profiles = await Profile.find()
            res.json(profiles)
        } else {
            const profiles = await Profile.aggregate([
                { $addFields: { fullname: { $concat: ["$name", " ", "$surname"] } } },
                {
                    $match: {
                        $and: query.filters
                    }
                }
            ])
            res.json(profiles)
        }


    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

controller.getProfile = async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const profile = await Profile.findById(id)
            res.json(profile)
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(400).send({ message: "No se ha encontrado el perfil" })
    }
}

controller.saveProfile = async (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const picture = req.body.picture
    const date = req.body.date
    const profession = req.body.profession
    const biography = req.body.biography

    const validation = profileValidator.validate(req.body)
    if (validation.error) {
        const error = validation.error.details[0].message
        res.status(400).send(error)
        return
    }

    try {
        const profile = new Profile({ name: name, surname: surname, picture: picture, date: date, profession: profession, biography: biography })
        await profile.save()

        return res.status(201).send({})
    } catch (error) {
        res.status(500).send(error)
    }

}

controller.updateProfile = async (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const picture = req.body.picture
    const date = req.body.date
    const profession = req.body.profession
    const biography = req.body.biography
    const id = req.params.id

    const validation = profileValidator.validate(req.body)
    if (validation.error) {
        const error = validation.error.details[0].message
        res.status(400).send(error)
        return
    }

    if (id) {
        try {
            await (
                await Profile.findByIdAndUpdate(id, { name: name, surname: surname, picture: picture, date: date, profession: profession, biography: biography, updatedAt: Date.now() })
            )
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(400).send()
    }
}

controller.deleteProfile = async (req, res) => {
    let id = req.params.id
    if (id) {
        try {
            await Profile.findByIdAndDelete(id)
            res.status(200).send()
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(400).send()
    }
}


module.exports = controller
