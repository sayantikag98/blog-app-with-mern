import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

export default function Home({url}){
    
    const [blogs, setBlogs] = useState(null);
    const [blogsCopy, setBlogsCopy] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [search, setSearch] = useState("");

    const fetchData = async (url) => {
        try{
            const response = await axios.get(url);
            if(response.statusText !== "OK"){
                throw new Error ("Something wrong... Please check and try again!!!");
            }
            else{
                const data = await response.data;
                setBlogs(data);
                setBlogsCopy(data);
            }  
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            setIsPending(false);
        }
    };

    useEffect(() => {
        fetchData(url);
    }, [url]);


    const HandleOnSearchChange = (event) => {
        setSearch(event.target.value);
        console.log(blogsCopy);
        if(blogsCopy !== "No blog to display" && event.target.value.length > 0){
            const filteredBlogs = blogsCopy.filter(blog => blog.title.toLowerCase().startsWith(event.target.value.toLowerCase()));
            if(filteredBlogs.length === 0){
                setBlogs("No such blog exists in the database");
            }
            else {
                setBlogs(filteredBlogs);
            }
        }
        else{
            setBlogs(blogsCopy);
        }
    };

    return (
        <main id = "blogs-main">
            <div id = "search-div">
                <input id = "search-input" autoFocus placeholder = "Search the blog here..." value = {search} onChange = {HandleOnSearchChange}/>
                <span>🔍</span>
            </div>
            
            {blogs && typeof blogs === "object" && blogs.map(blog => 
            <Link className = "blogs-link" to = {`/${blog._id}`} key = {blog._id}>
                <div className = "blogs-div">
                    <h1>{blog.title}</h1>
                </div>
            </Link>
            )}
            {typeof blogs === "string" && <p>{blogs}</p>}
            {isPending && <p>Loading .... </p>}
        </main>
    );
}