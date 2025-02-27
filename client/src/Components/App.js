import React, { useState } from 'react';

const App = () => {

    const [form, setForm] = useState({ to: '', subject: null, body: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(() => true)
        try {

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

            if (data.success === true) {
                alert("Generated Mail Successfully 🎉")
            }
            else {
                throw new Error(data.message)
            }
        } catch (err) {
            alert(`${err} 😕`)
        }

        setLoading(() => false)
    }

    const handleSendMail = async (e) => {
        e.preventDefault();
        setLoading(() => true)
        try {

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
            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            alert(`${err} 😕`)

        }
        setLoading(() => false)
    }

    const handleSaveDraft = async (e) => {
        e.preventDefault();
        setLoading(() => true)
        try {

            let response = await fetch('/api/save', {
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
                alert("Draft Save Successfully 🎉")
            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            alert(`${err} 😕`)
        }
        setLoading(() => false)
    }

    return (
        <div className=" min-h-screen justify-items-center items-center bg-gray-900 p-5 text-gray-400 flex gap-2 flex-col">
            <h1 className="text-4xl font-serif text-gray-300 pt-2">AI Mail Generator</h1>
            <form className="flex flex-col justify-center h-2/3 w-[95vw] sm:w-[80vw] lg:w-[60vw] p-5 gap-2" >

                <label htmlFor='to' className="text-2xl">To :</label>
                <textarea name="to" id='to' value={form.to} onChange={handleChange}
                    rows={2} maxLength={1000} placeholder='eg: hey.farhan03@gmail.com , abc@company.in , user@mail.com '
                    className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                {(form.subject !== null) ? (true &&
                    <>
                        <label htmlFor='subject' className="text-2xl">Subject :</label>
                        <textarea name="subject" id='subject' value={`${form.subject}`} onChange={handleChange}
                            rows={2} maxLength={1000} placeholder='Subject of the Email'
                            className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                    </>
                )
                    : (false)
                }
                <label htmlFor='body' className="text-2xl">Body :</label>
                <textarea name="body" id='body' value={`${form.body}`} onChange={handleChange}
                    rows={10} cols={50} maxLength={1000} placeholder={`Write Important Key Points or an Overview \nFor What ? You Want to Generate an Email \neg: Job Application for MERN Stack....`}
                    className="overflow-auto whitespace-pre-line p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />
                {loading && <span className='self-center'>Loading..</span>}
                <div className='flex'>

                    <button onClick={handleGenerate} disabled={loading}
                        className="w-1/2 bg-blue-500 text-white p-2 rounded-lg m-2 hover:bg-blue-800 hover:text-gray-50 disabled:opacity-20"
                    >
                        Generate
                    </button>
                    <button onClick={handleSendMail} disabled={loading}
                        className="w-1/2 bg-green-500 text-white p-2 rounded-lg m-2 hover:bg-green-600 hover:text-gray-50 disabled:opacity-20"
                    >
                        Send
                    </button>
                </div>
                <button onClick={handleSaveDraft} disabled={loading}
                    className=" bg-yellow-500 text-white p-2 rounded-lg m-2 hover:bg-yellow-600 hover:text-gray-50 disabled:opacity-20"
                >
                    Save Draft
                </button>
            </form>
        </div >
    )
}
export default App;