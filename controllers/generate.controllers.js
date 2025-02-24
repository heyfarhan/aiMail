const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const generate = async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    let { body } = (req.body)
    const prompt = `Write an email with a subject and body for the following: ${body}. Respond with a JSON object containing "subject" and "body" keys.`

    let responseText;
    try {

        if (!body.length) {
            throw new Error("Please Provide Some Details About Email !!!")
        }

        let result = await model.generateContent(prompt);
        responseText = result.response.text();

        const subjectMatch = responseText.match(/"subject":\s*"([^"]+)"/);
        const bodyMatch = responseText.match(/"body":\s*"([^"]+)"/);

        if (subjectMatch && bodyMatch) {
            res.status(200).json({ success: true, subject: subjectMatch[1], body: bodyMatch[1] });
        }

    } catch (err) {
        res.status(400).json({ success: false, message: err.message, body: '', subject: '' });

    }
}

module.exports = generate