import {useEffect, useState} from "react";
import {QUEST_API_URL, QUESTS_URL} from "../../../Constant";
import {Item} from "../../Item";
import {Header} from "../../Header";

export const QuestBoard = () => {
    const [quests, setQuests] = useState([]);
    const [questsLoad, setQuestsLoad] = useState(false);

    useEffect(() => {
        console.log(QUEST_API_URL);
        fetch(QUEST_API_URL, {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setQuests(res);setQuestsLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    return (
        <>
            <Header />
            <div className={'w-full flex flex-col justify-center items-center lg:m-8'}>
                <h1 className={'text-6xl mt-6 lg:m-6 text-center font-zelda'}>Tableaux des quetes</h1>
                <div className={'w-3/4 flex flex-col justify-center items-center'}>
                    {
                        questsLoad && quests.map((quest, k) => {
                            return (
                                <Item call={"object"} item={quest} button={"Rejoindre"} content={false} link={QUESTS_URL+'/'+quest.id} key={k}/>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}