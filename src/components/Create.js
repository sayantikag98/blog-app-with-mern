import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Create({url}){
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    let navigate = useNavigate();

    const HandleOnTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const HandleOnAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const HandleOnBodyChange = (event) => {
        setBody(event.target.value);
    };

    const dataPost = async (url) => {
        try{
            const response = await axios.post(url, {title, author, body});
            if(response.statusText !== "OK"){
                throw new Error("Something wrong... Please check and try again!!");
            }
            else{
                const data = await response.data;
                console.log(data);
                navigate("/");
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    const HandleSubmit = (event) => {
        event.preventDefault();
        dataPost(url);
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