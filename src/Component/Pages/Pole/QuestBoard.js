import {useEffect, useState} from "react";
import {BASE_API} from "../../../Constant";
import target from "../../../images/target.png";
import contact from "../../../images/contact.png";
import nb from "../../../images/nbplayer.png";
import note from "../../../images/descr.png";

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
                            <div key={k} className={'flex w-3/4 border pb-4 mb-4 border-l-8 border-l-tdt-brown rounded flex-col items-start'}>
                                <h2 className={'text-2xl m-4'}>{quest['name']}</h2>
                                <div className={'grid grid-cols-3 divide-x w-full gap-2 ml-24 mr-14'}>
                                    <div className={'flex flex-row items-center'}>
                                        <img alt={'univers'} src={target} className={'object-cover h-10'}/>
                                        <p className={'ml-3'}>{quest['jeux']}</p>
                                    </div>
                                    <div className={'flex flex-row col-span-2 items-center'}>
                                        <img alt={'contatct'} src={contact} className={'object-cover h-10'}/>
                                        <p className={'ml-3'}>{quest['discordId']}</p>
                                    </div>
                                    <div className={'flex flex-row items-center'}>
                                        <img alt={'univers'} src={nb} className={'object-cover h-10'}/>
                                        <p className={'mr-2 ml-3'}>{quest['player']} joueurs</p>
                                    </div>
                                    <div className={'flex flex-row col-span-2 items-center'}>
                                        <img alt={'contatct'} src={note} className={'object-cover h-10'}/>
                                        <p className={'ml-3'}>{quest['description']}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}