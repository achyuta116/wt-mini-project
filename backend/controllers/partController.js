const Part = require('../models/Part');
module.exports.part_get = (req, res) => {
    const category = req.params.category;
    Part.find({ partType: category }).sort({createdAt: 1})
    .then((result) => {
        console.log(result);
        res.json({ result });
    })
    .catch(err => console.log(err)); 
}

module.exports.part_post = async (req, res) => {
    const { vendorEmail, partType, partName, partDescription } = req.body;
    const part = await Part.create({ vendorEmail, partType, partName, partDescription });
    res.status(200).json({ part });
}

module.exports.part_delete = (req, res) => {
    const id = req.params.id;
    Part.findByIdAndDelete(id)
        .then(result => {
            res.json({ result });
        })
        .catch(err => {
            console.log(err)
        });
}