import React, { useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook"

function CreateBook() {
    const { loading, request } = useHttp()
    const [ganres, setGanres] = useState(null)
    // const [images, setImages] = useState([])
    // const [imageURLs, setImageURLs] = useState([])
    const [form, setForm] = useState({
        title: "",
        ganre: "",
        description: "",
        link: "",
        imageLink: ""
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createBookHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/books', 'POST', form)
        } catch (e) { }
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
                <input style={{ marginBottom: '5px' }}
                    placeholder='Enter Link To Book'
                    type='url'
                    name='link'
                    onChange={changeHandler}
                    value={form.link}
                />
                <input style={{ marginBottom: '5px' }}
                    placeholder='Enter Link Image For Book'
                    type='url'
                    name='imageLink'
                    onChange={changeHandler}
                    value={form.imageLink}
                />
                <button
                    type='submit'
                    onClick={createBookHandler}
                    disabled={loading}
                >
                    Create Book
                </button>
            </form>
        </div >
    )
}

export default CreateBook;