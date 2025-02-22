import React, { useState } from 'react';
import handleGenerate from '../utils/handleGenerate';
import handleSendMail from '../utils/handleSendMail';

const App = () => {

    const [form, setForm] = useState({ to: '', subject: null, body: '' })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGenerate = async (e) => {
        e.preventDefault();

        let response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: form.body
            })
        })
        let data = await response.json();

        const formattedBody = data?.body?.replace(/\\n/g, '\n');
        const formattedSubject = data?.subject?.replace(/\\n/g, '\n');

        setForm({ ...form, subject: `${formattedSubject}`, body: `${formattedBody}` })

    }

    const handleSendMail = async (e) => {

        e.preventDefault();

        let response = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: form.body,
                to: form.to,
                subject: form.subject
            })
        })
        let data = await response.json();
        if (data.success === true) {
            alert("Mail Send Successfully 🎉")
        }
    }


    return (
        <div className=" min-h-screen justify-items-center items-center bg-gray-900 p-5 text-gray-400 flex gap-2 flex-col">
            <h1 className="text-4xl font-serif text-gray-300 pt-2">AI Mail Generator</h1>
            <form className="flex flex-col justify-center h-2/3 w-1/2 p-5 gap-2" >

                <label htmlFor='to' className="text-2xl">To :</label>
                <textarea name="to" id='to' value={form.to} onChange={handleChange}
                    rows={2} maxLength={1000} placeholder='eg: hey.farhan03@gmail.com , abc@company.in , user@mail.com '
                    className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                {(form.subject !== null) ? (true &&
                    <>
                        <label htmlFor='subject' className="text-2xl">Subject :</label>
                        <textarea name="subject" id='subject' value={`${form.subject}`} onChange={handleChange}
                            rows={2} maxLength={1000}
                            className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                    </>
                )
                    : (false)
                }
                <label htmlFor='body' className="text-2xl">Body :</label>
                <textarea name="body" id='body' value={`${form.body}`} onChange={handleChange}
                    rows={10} cols={50} maxLength={1000} placeholder={`Write Important Key Points or an Overview \nFor What ? You Want to Generate a Email \neg: Job Application Post Mern Stack with I have 2 Yr Expreince ....`}
                    className="overflow-auto whitespace-pre-line p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                <div className='flex'>

                    <button onClick={handleGenerate}
                        className="w-1/2 bg-blue-500 text-white p-2 rounded-lg m-2 hover:bg-blue-800 hover:text-gray-50"
                    >
                        Generate
                    </button>
                    <button onClick={handleSendMail}
                        className="w-1/2 bg-green-500 text-white p-2 rounded-lg m-2 hover:bg-green-600 hover:text-gray-50"
                    >
                        Send
                    </button>

                </div>
            </form>
        </div >
    )
}
export default App;