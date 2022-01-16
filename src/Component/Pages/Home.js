import {BASE_API} from "../../Constant";
import {useEffect, useState} from "react";

export const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(BASE_API+'publication', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {console.log(res[0].image);setPosts(res)})
            .catch((res) => {console.log(res)})
    }, [])
    useEffect(() => {
        fetch(BASE_API+'event', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setEvents(res)})
            .catch((res) => {console.log(res)})
    }, [])

    return (
        <div className={'min-h-3/4'}>
            <h1 className="text-3xl font-bold">taverne du troll</h1>
            { posts.map((a, k) => <div key={k}><img className={'w-1/6'} alt={a.name} src={a.imageUrl}/><p>{a.name}</p></div>) }
            { events.map((a, k) => <div key={k}><img className={'w-1/6'} alt={a.name} src={a.imageUrl}/><p>{a.name}</p></div>) }
        </div>
    );
}