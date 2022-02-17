import {useParams} from "react-router";
import {useEffect, useState} from "react";

export const Item = (props) => {
    let { id } = useParams() || props['id'];
    const [item, setItem] = useState([]);
    const [button, setButton] = useState(props.button || false);
    const [containerCss, setContainerCss] = useState("");
    const [itemLoad, setItemLoad] = useState(false);

    useEffect(() => {
        if(props.call === "id"){
            console.log("id way");
            setContainerCss("w-screen flex justify-center items-center mb-6 mt-6");
            fetch(props.url+'/'+(parseInt(id)+1).toString(), {method: 'GET',})
                .then(res => res.json())
                .then((res) => {setItem(res);setItemLoad(!!res);})
                .catch((res) => {console.log(res)})
        }else{
            console.log("props way");
            setItem(props.item);
            setItemLoad(true);
        }
    }, [id, props.call, props.item, props.url])
    return (
        <div className={containerCss}>
            {
                itemLoad?(
                    <div className={`border p-6 rounded-xl flex flex-col justify-start p-6 items-center ${containerCss? "w-3/4": ""}`}>
                        <div className={"flex flex-wrap w-full md:flex-nowrap gap-12 justify-center"}>
                            <img className={"rounded-xl max-w-md"} src={item.imageUrl} alt={"quest"}/>
                            <div className={"flex flex-col justify-center"}>
                                <div className={"flex flex-wrap md:flex-row gap-5 items-center m-6 md:m-0 justify-center"}>
                                    <p className={"text-4xl font-zelda"}>{item.name}</p>

                                    {button && <button className={"shadow-md rounded p-2 bg-tdt-brown text-white"}
                                             onClick={() => console.log()}>
                                        {button}
                                    </button>}
                                </div>
                                {item['discordId'] ? <p className={'font-bold'}>{item['discordId']} - {item['player']} joueurs</p> : <></>}
                                {
                                    Object.keys(item).map((objectKey, k) => {
                                        if(
                                            objectKey === "content" ||
                                            objectKey === "imageUrl" ||
                                            objectKey === "id" ||
                                            objectKey === "discordId" ||
                                            objectKey === "player" ||
                                            objectKey === "name"){
                                            return <></>
                                        }
                                        return (
                                            <p className={""} key={k}>
                                                <span className={"font-bold"}>{objectKey} : </span> {item[objectKey]}
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <p className={'break-words text-justify mt-3'}>{item['content']}</p>
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