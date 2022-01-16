import {BASE_API} from "../../Constant";
import {useEffect, useState} from "react";
import wargame from "../../images/wargame.jpg";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [postsLoad, setPostsLoad] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventsLoad, setEventsLoad] = useState(false);

    useEffect(() => {
        fetch(BASE_API+'publication', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setPosts(res);setPostsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    useEffect(() => {
        fetch(BASE_API+'event', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setEvents(res);setEventsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])

    let a = Math.floor(Math.random() * posts.length);
    let b = Math.floor(Math.random() * events.length);

    return (
        <div className={'min-h-screen w-5/6'}>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between h-1/4 w-full m-10">
                    { postsLoad &&
                        <div className="flex flex-row justify-center p-24">
                            <img className={"w-96 h-48 object-cover"} alt={"post"} src={posts[a].imageUrl}/>
                            <div className={"flex flex-col ml-9 w-1/5 justify-center items-start"}>
                                <h2 className={"text-xl font-bold"}>
                                    {posts[a].name}
                                </h2>
                                <p className={"text-base"}>
                                    {posts[a].description}
                                </p>
                            </div>
                        </div>
                    }
                    <div className={"flex flex-col border border-tdt-brown h-1/2 w-1/5"} >
                        <img className={"w-full h-1/2 object-contain"} src={wargame} alt={"wargame"} />
                        <div className={"w-full h-1/2 p-8 overflow-hidden"}>
                            <h2 className={"text-2xl"}>Pole Wargame</h2>
                            <p className={"p-2 h-1/2 overflow-hidden"}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                eventsLoad &&
                <div className="flex flex-col justify-center relative items-start h-96 w-screen">
                    <img className={"absolute h-full w-screen object-contain top-0 left-0 z-0"} src={events[b].imageUrl} alt={events[b].name}/>
                    <h3 className={"text-8xl m-16 z-10"}>{events[b].name}</h3>
                </div>
            }
        </div>
    );
}