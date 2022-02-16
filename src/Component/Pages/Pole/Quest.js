import {useParams} from "react-router";
import {BASE_API} from "../../../Constant";
import {useEffect, useState} from "react";

export const Quest = (props) => {
    let { id } = useParams() || props['id'];
    const [quest, setQuest] = useState([]);
    const [containerCss, setContainerCss] = useState("");
    const [questLoad, setQuestLoad] = useState(false);

    // TODO: make quest component universal (target url in props ?)

    useEffect(() => {
        if(!props.id){
            console.log("id way");
            setContainerCss("w-screen h-2/3 flex justify-center items-center");
            fetch(BASE_API+'quest/'+(id+1), {method: 'GET',})
                .then(res => res.json())
                .then((res) => {setQuest(res[0]);setQuestLoad(res.length);})
                .catch((res) => {console.log(res)})
        }else{
            console.log("props way");
            setQuest(props.quest);
            setQuestLoad(true);
        }
    }, [])
    return (
        <div className={containerCss}>
            {
                questLoad?(
                    <div className={"flex flex-wrap border p-6 rounded-xl gap-12"}>
                        <img className={"rounded-xl"} src={quest.imageUrl} alt={"quest"}/>
                        <div className={"flex flex-col justify-center"}>
                            <div className={"flex flex-wrap gap-5 items-center m-6"}>
                                <p className={"text-4xl font-zelda"}>{quest.name}</p>

                                <button className={"shadow-md rounded p-2 bg-tdt-brown text-white"} onClick={() => console.log()}>
                                    Rejoindre
                                </button>
                            </div>
                            <p className={'ml-3 font-bold'}>{quest['discordId']} - {quest['player']} joueurs</p>
                            <p className={'ml-3'}><span className="font-bold">système / jeux : </span>{quest['jeux']}</p>
                            <p className={'ml-3 max-w-md break-words'}><span className="font-bold">description :</span> {quest['description']}</p>
                        </div>
                    </div>
                ):(
                    <div>
                        Loading
                    </div>
                )
            }
        </div>
    );
}