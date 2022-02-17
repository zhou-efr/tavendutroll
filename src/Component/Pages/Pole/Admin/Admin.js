import { useState} from "react";
import {BASE_API_URL} from "../../../../Constant";
import {Post} from "./Post";
import {Event} from "./Event";
import {Quest} from "./Quest";
import {Game} from "./Game";

export const Admin = () => {
    const [panda, setLogin] = useState(false);
    const [post, setPost] = useState(true);
    const [event, setEvent] = useState(false);
    // TODO: add game
    const [game, setGame] = useState(false);
    const [quest, setQuest] = useState(false);

    const onLogin = (value) => {
        if ('74ehjtcxjTTRjqF' === value){
            setLogin(true);
        }
    }

    const onTabChange = (target) => {
        switch (target) {
            case 1:
                setPost(false);
                setEvent(true);
                setGame(false);
                setQuest(false);
                break;
            case 2:
                setPost(false);
                setEvent(false);
                setGame(true);
                setQuest(false);
                break;
            case 3:
                setPost(false);
                setEvent(false);
                setGame(false);
                setQuest(true);
                break;
            default:
                setPost(true);
                setEvent(false);
                setGame(false);
                setQuest(false);
        }
    }

    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
        {
            panda ? (
                <div className={"w-4/6 flex flex-col items-start p-5 border rounded-xl drop-shadow-md"}>
                    <div className={"flex flex-row gap-2 justify-start mb-3"}>
                        <div className={"border-b-tdt-brown w-16".concat(post?" border-b-2":" border-b")}>
                            <p className={"text-lg text-center font-bold filter hover:text-tdt-brown"} onClick={() => onTabChange(0)}>
                                Post
                            </p>
                        </div>

                        <div className={"border-b-tdt-brown border-b w-16".concat(event?" border-b-2":" border-b")}>
                            <p className={"text-lg text-center font-bold filter hover:text-tdt-brown"} onClick={() => onTabChange(1)}>
                                Event
                            </p>
                        </div>

                        <div className={"border-b-tdt-brown border-b w-16".concat(game?" border-b-2":" border-b")}>
                            <p className={"text-lg text-center font-bold filter hover:text-tdt-brown"} onClick={() => onTabChange(2)}>
                                Game
                            </p>
                        </div>

                        <div className={"border-b-tdt-brown border-b w-16".concat(quest?" border-b-2":" border-b")}>
                            <p className={"text-lg text-center font-bold filter hover:text-tdt-brown"} onClick={() => onTabChange(3)}>
                                Quest
                            </p>
                        </div>
                    </div>
                    { post && <Post /> }
                    { event && <Event /> }
                    { game && <Game /> }
                    { quest && <Quest /> }
                </div>
            ):(
                <input type={"password"} onChange={e => onLogin(e.target.value)}/>
            )
        }
        </div>
    );
}