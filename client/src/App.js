import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useHttp } from '../src/hooks/http.hook';
import { useState, useEffect } from 'react';
import '../src/pages/Book.css';

function App() {
  const [books, setBooks] = useState(null)
  const [inpValue] = useOutletContext();
  const { loading, request } = useHttp()

  const getBooks = async () => {
    const books = await request('http://localhost:5000/api/books')
    setBooks(books)
  }
  const search = (inpValue) => {
    if (inpValue === "") {
      getBooks()
      return
    }

    const newBooks = books.filter(el => el.title.toLowerCase().includes(inpValue.toLowerCase()))
    setBooks(newBooks)
  }
  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    search(inpValue)
  }, [inpValue])

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

export default App;
