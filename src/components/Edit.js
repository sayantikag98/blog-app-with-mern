import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Edit({url}){
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const {id} = useParams();
    let navigate = useNavigate();

    const fetchData = async (url, id) => {
        try{
            const response = await axios.get(`${url}/${id}`);
            if(response.statusText !== "OK"){
                throw new Error("Something wrong... Please check and try again!!!");
            }
            else{
                const data = await response.data;
                setTitle(data.title);
                setAuthor(data.author);
                setBody(data.body);
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData(url, id);
    }, [url, id]);



    const HandleOnTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const HandleOnAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const HandleOnBodyChange = (event) => {
        setBody(event.target.value);
    };

    const dataPost = async (url, id) => {
        try{
            const response = await axios.patch(`${url}/${id}`, {title, author, body});
            if(response.statusText !== "OK"){
                throw new Error("Something wrong... Please check and try again!!!");
            }
            else{
                const data = await response.data;
                console.log(data);
                navigate(`/${id}`);
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    const HandleSubmit = (event) => {
        event.preventDefault();
        dataPost(url, id);
    };

    return (
        <form id = "create-form" onSubmit = {HandleSubmit}>
            <label htmlFor = "title">
                Title
            </label>
            <input id = "title" required autoFocus value = {title} onChange = {HandleOnTitleChange} name = "title"/>
            <label htmlFor = "author">
                Author
            </label>
            <input id = "author" required value = {author} onChange = {HandleOnAuthorChange} name = "author"/>
            <label htmlFor = "body">
                Body
            </label>
            <textarea id = "body" required value = {body} onChange = {HandleOnBodyChange} name = "body"></textarea>
            <button id = "create-submit-btn">Submit</button>
        </form>
    );
}