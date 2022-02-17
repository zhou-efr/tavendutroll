import {
    EVENT_API,
    EVENTS_URL,
    QUEST_API,
    QUESTS_URL,
    RECORD_API,
    RECORDS_URL,
    RPG_URL,
    TCG_URL,
    WARGAME_URL
} from "../../Constant";
import {useEffect, useState} from "react";
import wargame from "../../images/wargame.png";
import TCG from "../../images/tcg.png";
import jdr from "../../images/jdr.png";
import frame from "../../images/Frame.png";
import {Link} from "react-router-dom";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [postsLoad, setPostsLoad] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventsLoad, setEventsLoad] = useState(false);
    const [quests, setQuests] = useState([]);
    const [questsLoad, setQuestsLoad] = useState(false);

    // TODO: responsive

    useEffect(() => {
        document.title = "taverne du troll";
    }, [])
    useEffect(() => {
        fetch(QUEST_API, {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setQuests(res);setQuestsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    useEffect(() => {
        fetch(RECORD_API, {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setPosts(res);setPostsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    useEffect(() => {
        fetch(EVENT_API, {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setEvents(res);setEventsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])

    let a = posts.length-1;
    let b = Math.floor(Math.random() * events.length);
    let c = Math.floor(Math.random() * posts.length);
    let d = Math.floor(Math.random() * quests.length);

    return (
        <div className={'min-h-screen w-5/6'}>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between h-1/4 w-full m-10">
                    { postsLoad &&
                        <Link to={RECORDS_URL+'/'+a.toString()}>
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
                        </Link>
                    }
                    <div className={"flex flex-col border border-tdt-brown h-1/2 w-1/5"} >
                        <Link to={WARGAME_URL}>
                                <img className={"w-full h-1/2 object-contain"} src={wargame} alt={"wargame"} />
                                <div className={"w-full h-1/2 p-8 overflow-hidden"}>
                                    <h2 className={"text-2xl"}>Pole Wargame</h2>
                                    <p className={"p-2 h-1/2 overflow-hidden"}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>
                                </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between items-center ml-24 h-1/4 w-full m-10">
                    <div className={"flex flex-col border border-tdt-brown h-1/2 w-1/5"} >
                        <Link to={RPG_URL}>
                            <img className={"w-full h-1/2 object-cover"} src={jdr} alt={"wargame"} />
                            <div className={"w-full h-1/2 p-8 overflow-hidden"}>
                                <h2 className={"text-2xl"}>Pole jdr</h2>
                                <p className={"p-2 h-1/2 overflow-hidden"}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                        </Link>
                    </div>
                    { questsLoad &&
                        <Link to={QUESTS_URL+'/'+d.toString()}>
                            <div className="flex flex-row justify-center p-24 pl-8 pr-60">
                                    <img className={"w-48 h-full overflow-hidden object-cover"} alt={"post"} src={quests[d].imageUrl}/>
                                    <div className={"flex flex-col ml-9 w-1/5 justify-center items-start"}>
                                        <h2 className={"text-xl font-bold"}>
                                            {quests[d].name}
                                        </h2>
                                        <p className={"text-base"}>
                                            {quests[d].description}
                                        </p>
                                    </div>
                            </div>
                        </Link>
                    }
                    <div className={"flex flex-col border border-tdt-brown h-1/2 w-1/4 rounded-l"} >
                        <iframe src="https://discord.com/widget?id=357854383985393665&theme=dark"
                                allowTransparency="true"
                                frameBorder="0"
                                height={350}
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
                    </div>
                    {/*<div className={"flex flex-col border border-tdt-brown h-1/2 w-1/4"} >*/}
                    {/*    <img className={"w-full h-1/2 object-contain"} src={posts[c].imageUrl} alt={"wargame"} />*/}
                    {/*    <div className={"w-full h-1/2 p-8 overflow-hidden"}>*/}
                    {/*        <h2 className={"text-2xl"}>{posts[c].name}</h2>*/}
                    {/*        <p className={"p-2 h-1/2 overflow-hidden"}>*/}
                    {/*            {posts[c].description}*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
            {
                eventsLoad &&
                <Link to={EVENTS_URL+'/'+b.toString()}>
                    <div className="flex flex-col justify-center relative items-start h-96 w-screen">
                        <img className={"absolute h-full w-screen object-cover top-0 left-0 z-0"} src={events[b].imageUrl} alt={events[b].name}/>
                        <div className="flex flex-col m-8 justify-center relative items-start">
                            <img className={"absolute h-full w-screen object-contain top-0 left-0 z-0"} src={frame} alt={'frame'}/>
                            <h3 className={"text-5xl p-40 m-16 z-10"}>{events[b].name}</h3>
                        </div>
                    </div>
                </Link>
            }
            <div className="flex flex-col justify-center pt-10">
                <div className="flex flex-row justify-between h-1/4 w-full m-10">
                    { postsLoad &&
                        <Link to={RECORDS_URL+'/'+a.toString()}>
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
                        </Link>
                    }
                    <div className={"flex flex-col border border-tdt-brown h-1/2 w-1/5"} >
                        <Link to={TCG_URL}>
                            <img className={"w-full h-1/2 object-contain "} src={TCG} alt={"wargame"} />
                            <div className={"w-full h-1/2 p-8 overflow-hidden"}>
                                <h2 className={"text-2xl"}>Pole Jeux de Cartes</h2>
                                <p className={"p-2 h-1/2 overflow-hidden"}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}