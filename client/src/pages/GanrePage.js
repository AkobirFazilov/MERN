import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { useHttp } from '../hooks/http.hook';
import "../pages/Book.css"
export const GanrePage = () => {
    const [books, setBooks] = useState(null)
    const [filteredBooks, setFilteredBooks] = useState(null)
    const { request } = useHttp()
    const [inpValue] = useOutletContext();
    const { ganre } = useParams()

    const getBooks = async () => {
        const books = await request('http://localhost:5000/api/books')
        const f = books.filter(el => {
            console.log(el._id, ganre);
            return el.ganre._id === ganre
        })
        setBooks(f)
        setFilteredBooks(f)
        console.log(books);
    }

    useEffect(() => {
        if (inpValue === "") {
            setFilteredBooks(books)
            return
        }
        const f = books.filter(el => el.title.toLowerCase().includes(inpValue.toLowerCase()))
        setFilteredBooks(f)
    }, [inpValue])

    useEffect(() => {
        getBooks()
    }, [ganre])
    console.log(books);
    return (
        <div>
            {
                filteredBooks && filteredBooks.map(el => {
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