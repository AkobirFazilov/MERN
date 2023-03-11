import React, { useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook"

export function CreateBook() {
    const { request } = useHttp()
    const [ganres, setGanres] = useState(null)
    const [bookLoading, setBookLoading] = useState(false)
    const [form, setForm] = useState({
        title: "",
        ganre: "",
        description: "",
        image: null,
        file: null
    });

    const changeHandler = event => {

        if (event.target.type === 'file') {
            setForm({ ...form, [event.target.name]: event.target.files[0] })
            return
        }
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createBookHandler = async () => {
        setBookLoading(true)
        try {
            const formData = new FormData();

            formData.append('title', form.title);
            formData.append('ganre', form.ganre);
            formData.append('description', form.description);
            formData.append('link', form.link);
            formData.append('image', form.image);

            formData.append('file', form.file);
            console.log(Date.now());

            await fetch(
                'http://localhost:5000/api/books',
                {
                    method: 'POST',
                    body: formData,
                }
            )
            console.log(Date.now());
        } catch (e) {
            console.log(e);
        }
        setBookLoading(false)
    }

    const getGanres = async () => {
        const ganres = await request('http://localhost:5000/api/ganres')
        setGanres(ganres)
        setForm({ ...form, ganre: ganres[0]._id })
    }

    useEffect(() => {
        getGanres()
    }, [])

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Create Book</h1>
            <form style={{ display: "flex", flexDirection: "column" }}>
                <input style={{ marginBottom: '5px' }}
                    placeholder='Enter Book Title'
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    value={form.title}
                />
                <select placeholder='Enter Ganre'
                    style={{ marginBottom: '5px' }}
                    name='ganre'
                    onChange={changeHandler}
                    value={form.ganre}
                >
                    {
                        ganres && ganres.map(({ _id, name }, i) => {
                            return <option key={_id} value={_id}>{name}</option>
                        })
                    }
                </select>
                <input style={{ marginBottom: '5px' }}
                    placeholder='Enter Description'
                    type='text'
                    name='description'
                    onChange={changeHandler}
                    value={form.description}
                />
                <label htmlFor='image'>Upload Poster</label>
                <input id='image'
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={changeHandler}
                />
                <label htmlFor='file'>Upload PDF</label>
                <input id='file'
                    type='file'
                    name='file'
                    accept='application/pdf'
                    onChange={changeHandler}
                />
                <button
                    type='submit'
                    onClick={createBookHandler}
                    disabled={bookLoading}
                >
                    Create Book
                </button>
            </form>
        </div >
    )
}