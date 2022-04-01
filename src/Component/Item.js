import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Item = (props) => {
    let { id } = useParams() || props['id'];
    const [item, setItem] = useState([]);
    const [button, setButton] = useState(props.button || false);
    const [containerCss, setContainerCss] = useState("");
    const [itemLoad, setItemLoad] = useState(false);
    const [content, setContent] = useState(true);
    const [link, setLink] = useState("#");

    useEffect(() => {
        if(Object.keys(props).includes("content")){
            setContent(props.content);
        }
        if(props.link){
            setLink(props.link);
        }

        if(props.call === "id"){
            setContainerCss("w-screen flex justify-center items-center mb-6 mt-6");
            fetch(props.url+'/'+id, {method: 'GET',})
                .then(res => res.json())
                .then((res) => {setItem(res);setItemLoad(!!res);})
                .catch((res) => {console.log(res)})
        }else{
            console.log("props way");
            setItem(props.item);
            setItemLoad(true);
        }
        setButton(false);
    }, [id, props.call, props.item, props.url, props])

    let portrait = window.innerHeight > window.innerWidth;

    return (
        <div className={containerCss}>
            {
                itemLoad?(
                    <div className={`border p-6 rounded-xl flex flex-col justify-start p-6 items-center ${portrait?"w-screen-90":(containerCss? "w-3/4": "")}`}>
                        <div className={"flex flex-wrap w-full md:flex-nowrap md:gap-12 justify-center"}>
                            <Link to={link}><img className={`rounded-xl object-cover max-w-md ${portrait?"home-picture-size-phone":"home-picture-size"}`} src={item.imageUrl} alt={"quest"}/></Link>
                            <div className={"flex flex-col justify-center"}>
                                <div className={"flex flex-wrap md:flex-row gap-5 items-center m-6 md:m-0 justify-center"}>
                                    <Link to={link}><p className={"text-4xl font-zelda"}>{item.name}</p></Link>
                                    {!!button && <button className={"shadow-md rounded p-2 bg-tdt-brown text-white"}
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
                                        if(objectKey === "available"){
                                            return (
                                                <p className={""} key={k}>
                                                    <span className={"font-bold"}>{objectKey} : </span> {item[objectKey]?"":"not "} available
                                                </p>
                                            );
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
                        {content && <p className={'break-words text-justify mt-3'}>{item['content']}</p>}
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