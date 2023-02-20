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
                        <div style={{ border: "2px solid grey" }} className='book' key={el['_id']}><a href={el.link}>{el.title}<br />{el.ganre.name}<br />{el.description}</a></div>
                    )
                })
            }
        </div>
    )
}

export default Book;