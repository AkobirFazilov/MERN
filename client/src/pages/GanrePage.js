import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useHttp } from '../hooks/http.hook';
import "../pages/Book.css"
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
                        <div className='book' key={el['_id']}>
                            <a href={el.link}>
                                <img alt='bookImg' src={el.imageLink} />
                                <div className='metaData'>
                                    <div className='divTitle'>{el.title}</div>
                                    <br />
                                    <div className='divGanre'>{el.ganre.name}</div>
                                    <br />
                                    <div className='divDescription'>{el.description}</div>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}