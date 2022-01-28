import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>Blogs</h1>
            <div id = "links-div">
                <Link className = "link" to = "/">
                    🏠
                </Link>
                <Link className = "link" to = "/create">
                    ➕
                </Link>
            </div>
        </header>
    );
}