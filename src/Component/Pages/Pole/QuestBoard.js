import {useEffect, useState} from "react";
import {BASE_API_URL, QUESTS_URL} from "../../../Constant";
import {Item} from "../../Item";

export const QuestBoard = (props) => {
    const [quests, setQuests] = useState([]);
    const [questsLoad, setQuestsLoad] = useState(false);

    useEffect(() => {
        fetch(BASE_API_URL+'quest', {method: 'GET',})
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
                            <Item call={"object"} item={quest} button={"Rejoindre"} content={false} link={QUESTS_URL+'/'+quest.id}/>
                        );
                    })
                }
            </div>
        </div>
    );
}