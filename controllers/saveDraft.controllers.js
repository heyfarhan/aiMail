const Draft = require("../model/draft.model");

const saveDraft = async (req, res) => {

    const { body, to, subject } = req.body;

    try {
        if (!body?.length || !subject?.length) {
            throw new Error('Please Provide Some Details About Email !!!')
        }

        const draft = new Draft({
            body,
            to,
            subject
        });
        await draft.save();
        res.status(200).json({ success: true, message: "Draft saved successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

}
module.exports = saveDraft