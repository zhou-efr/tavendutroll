import {BASE_API} from "../../Constant";
import {useEffect, useState} from "react";

export const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(BASE_API+'publication', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setPosts(res)})
            .catch((res) => {console.log(res)})
    }, [])
    useEffect(() => {
        fetch(BASE_API+'event', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setEvents(res)})
            .catch((res) => {console.log(res)})
    }, [])

    return (
        <div className={'h-3/4'}>
            <h1 className="text-3xl font-bold">taverne du troll</h1>
            { posts.map((a, k) => <p key={k}>{a.name}</p>) }
            { events.map((a, k) => <p key={k}>{a.name}</p>) }
        </div>
    );
}