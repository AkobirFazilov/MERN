import React from 'react'
import { useHttp } from '../hooks/http.hook';
import { useState, useEffect } from 'react';
import './Book.css';
function Book() {
    const [books, setBooks] = useState(null)
    const { loading, request } = useHttp()
    const getBooks = async () => {
        const books = await request('http://localhost:5000/api/books')
        setBooks(books)
    }
    useEffect(() => {
        getBooks()
    }, [])
    return (
        <div className='books'>
            {
                books && books.map(el => {
                    return (
                        <div className='book' key={el['_id']}>
                            <a href={el.link}>
                                <img src={el.imageLink} />
                                <div className='divTitle'>{el.title}</div>
                                <br />
                                <div className='divGanre'>{el.ganre.name}</div>
                                <br />
                                <div className='divDescription'>{el.description}</div>
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Book;