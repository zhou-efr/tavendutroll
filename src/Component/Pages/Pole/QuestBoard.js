import {useEffect, useState} from "react";
import {BASE_API, QUESTS_URL} from "../../../Constant";
import target from "../../../images/target.png";
import contact from "../../../images/contact.png";
import nb from "../../../images/nbplayer.png";
import note from "../../../images/descr.png";
import {Link} from "react-router-dom";
import {Quest} from "./Quest";

export const QuestBoard = (props) => {
    const [quests, setQuests] = useState([]);
    const [questsLoad, setQuestsLoad] = useState(false);

    useEffect(() => {
        fetch(BASE_API+'quest', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setQuests(res);setQuestsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    return (
        <div className={'w-full flex flex-col justify-center items-center m-8'}>
            <h1 className={'text-6xl m-6 font-zelda'}>Tableaux des quetes</h1>
            <div className={'w-3/4 flex flex-col justify-center items-center'}>
                {
                    questsLoad && quests.map((quest, k) => {
                        return (
                            <Quest id={k+1} quest={quest} />
                        );
                    })
                }
            </div>
        </div>
    );
}