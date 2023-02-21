import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useHttp } from '../src/hooks/http.hook';
import { useState, useEffect } from 'react';
import '../src/pages/Book.css';

function App() {
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [inpValue] = useOutletContext();
  const { loading, request } = useHttp()

  const search = async (str) => {
    let books = await request('http://localhost:5000/api/books')
    if (str === "") {
      setFilteredBooks(books)
      return
    }

    const newBooks = books.filter(el => el.title.toLowerCase().includes(str.toLowerCase()))
    setFilteredBooks(newBooks)
  }

  useEffect(() => {
    search(inpValue)
  }, [inpValue])
  return (
    <div className='books'>
      {
        filteredBooks && filteredBooks.map(el => {
          return (
            <div style={{ border: "2px solid grey" }} className='book' key={el['_id']}><a href={el.link}>{el.title}<br />{el.ganre.name}<br />{el.description}</a></div>
          )
        })
      }
    </div>
  )
}

export default App;
