import React, { useState } from 'react';

const App = () => {

    const [form, setForm] = useState({ to: '', prompt: '' })

    const handleGenerate = (e) => {

        e.preventDefault();

        let mailList = form.to.split(',')
        mailList = mailList.map((email) => email.trim());
        mailList = mailList.filter((email) => email.length > 0);

        console.log(mailList)

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className=" min-h-screen justify-items-center items-center bg-gray-900 p-5 text-gray-400 flex gap-2 flex-col">
            <h1 className="text-4xl font-serif text-gray-300 pt-2">AI Mail Generator</h1>
            <form className="flex flex-col justify-center h-2/3 w-1/2 p-5 gap-2" >

                <label htmlFor='to' className="text-2xl">To :</label>
                <textarea name="to" id='to' value={form.to} onChange={handleChange}
                    rows={2} maxLength={1000}
                    className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />

                <label htmlFor='prompt' className="text-2xl">Prompt :</label>
                <textarea name="prompt" id='prompt' value={form.prompt} onChange={handleChange}
                    rows={8} maxLength={1000}
                    className=" p-2 m-2 rounded-lg bg-gray-300 text-black outline-none" />

                <button onClick={handleGenerate}
                    className="w-1/2 self-center bg-blue-500 text-white p-2 rounded-lg m-2 hover:bg-blue-800 hover:text-gray-50"
                >
                    Generate
                </button>
            </form>
        </div >
    )
}
export default App;