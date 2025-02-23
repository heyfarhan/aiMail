const Draft = require("../model/draft.model");

const saveDraft = async (req, res) => {

    const { body, to, subject } = req.body;
    const draft = new Draft({
        body,
        to,
        subject
    });
    try {
        await draft.save();
        res.status(200).json({ success: true, message: "Draft saved successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err });
    }

}
module.exports = saveDraft