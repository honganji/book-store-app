import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
	const [book, setBook] = useState({
		title: "",
		desc: "",
		price: null,
		cover: "",
	});
	const navigate = useNavigate();
	const location = useLocation();

	const handleChange = (e) => {
		setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			await axios.put("http://localhost:8800/books/" + location.pathname.split("/")[2], book);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		const fetchBook = async () => {
			try {
				const res = await axios.get("http://localhost:8800/books/" + location.pathname.split("/")[2])
				setBook(res.data[0]);
			} catch (err) {
				console.log(err)
			}
		}
		fetchBook();
	}, []);
  return (
	  <div className='form'>
		  <h1>Update a Book</h1>
		  <input type='text' value={book.title} onChange={handleChange} name='title'/>
		  <input type='text' value={book.desc} onChange={handleChange} name='desc'/>
		  <input type='text' value={book.price ? book.price : 0} onChange={handleChange} name='price'/>
		  <input type='text' value={book.cover} onChange={handleChange} name='cover' />
		  <button className='formButton' onClick={handleClick}>Update</button>
	</div>
  )
}

export default Update
