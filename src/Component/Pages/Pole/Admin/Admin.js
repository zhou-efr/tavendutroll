import {useEffect, useState} from "react";
import {Post} from "./Post";
import {Event} from "./Event";
import {Quest} from "./Quest";
import {Game} from "./Game";
import {useAuth0} from "@auth0/auth0-react";
import {Header} from "../../../Header";

export const Admin = () => {
    const [panda, setLogin] = useState(false);
    const [post, setPost] = useState(true);
    const [event, setEvent] = useState(false);
    const [game, setGame] = useState(false);
    const [quest, setQuest] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isAuthenticated){
            // console.log(user);
            if(user.email.split("@")[1] === "tavernedutroll.org"){
                setLogin(true);
            }
        }
    }, [isAuthenticated, user.email])

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

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <Header />
            <div className={"min-h-screen flex flex-col justify-center items-center mt-10 mb-10"}>
                {
                    panda && (
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
                    )
                }
            </div>
        </>
    );
}