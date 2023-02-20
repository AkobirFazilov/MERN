import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useHttp } from '../hooks/http.hook';
import '../pages/Book.css'
export const GanrePage = () => {
    const [books, setBooks] = useState(null)
    const { loading, request } = useHttp()
    const { ganre } = useParams()
    const getBooks = async () => {
        const books = await request('http://localhost:5000/api/books')
        const f = books.filter(el => {
            console.log(el._id, ganre);
            return el.ganre._id === ganre
        })
        setBooks(f)
        console.log(books);
    }
    useEffect(() => {
        getBooks()
    }, [ganre])
    console.log(books);
    return (
        <div>
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