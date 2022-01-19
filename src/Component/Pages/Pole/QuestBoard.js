import {useEffect, useState} from "react";
import {BASE_API} from "../../../Constant";

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
        <div className={'w-full flex flex-col justify-center items-center m-24'}>
            <div className={'w-3/4 flex flex-col justify-center '}>
                {
                    questsLoad && quests.map((quest, k) => {
                        return (
                            <div key={k} className={'flex flex-row items-center'}>
                                <h2 className={'text-2xl m-4'}>{quest['name']}</h2>
                                <p className={'text-center'}>{quest['description']}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}