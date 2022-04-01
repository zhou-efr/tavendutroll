import {useState} from "react";
import {BASE_API_URL, BASE_IMAGE_API_URL, IMAGE_UPLOAD_API_URL} from "../../../../Constant";
import {useAuth0} from "@auth0/auth0-react";

export const Quest = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [quest, setQuest] = useState({
        name: '',
        discordId: '',
        jeux: '',
        thumbnail: null,
        description: '',
        content: '',
        player: 3,
        startDate: '',
    })

    const onSubmit = async (e, target) => {
        if (isLoading || !isAuthenticated){
            quest['author'] = "killian.zhou";
        }else{
            quest['author'] = user.nickname;
        }
        let data = new FormData();
        data.append('file', quest.thumbnail[0])

        await fetch(IMAGE_UPLOAD_API_URL, {method: 'POST', body: data}).catch(e => console.log(e))
        // thumbnail = await thumbnail.json();

        data = quest;
        data.imageUrl = BASE_IMAGE_API_URL + quest.thumbnail[0].name;
        let res = await fetch(BASE_API_URL+target, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).catch(e => console.log(e))
        res = await res.json();

        if (!res){
            alert("fail to create quest");
        }else {
            alert("create quest");
        }

        setQuest({
            name: '',
            discordId: '',
            jeux: '',
            thumbnail: null,
            description: '',
            content: '',
            startDate: '',});
    };
    // TODO: add quest as user
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 w-full"}>
            <h2 className={'text-2xl'}>
                Add Quest
            </h2>
            <div className={"w-1/2 ml-3"}>
                <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'quest')}>
                    Submit
                </button>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Name
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Post Name"}
                    value={quest.name}
                    onChange={(e) => setQuest({...quest, name: e.target.value})}/>
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Author discord id
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Author Discord Id"}
                    value={quest.discordId}
                    onChange={(e) => setQuest({...quest, discordId: e.target.value})}/>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg"}>
                    Game
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Game name"}
                    value={quest.jeux}
                    onChange={(e) => setQuest({...quest, jeux: e.target.value})}/>
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Thumbnail
                </h3>
                <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className={" p-1 w-full bg-white"}
                    // value={post.thumbnail[0]}
                    onChange={(e) => {console.log(quest.thumbnail);setQuest({...quest, thumbnail: e.target.files});}}/>
            </div>

            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Description
                </h3>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    cols="33"
                    placeholder={"Lorem ipsum dolor sit amet"}
                    value={quest.description}
                    onChange={(e) => setQuest({...quest, description: e.target.value})}/>
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Content
                </h3>
                <textarea
                    id="content"
                    name="content"
                    rows="5"
                    cols="33"
                    placeholder={"Lorem ipsum dolor sit amet"}
                    value={quest.content}
                    onChange={(e) => setQuest({...quest, content: e.target.value})}/>
            </div>

            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Number of players
                </h3>
                <input
                    type={'number'}
                    name={"player"}
                    value={quest.player}
                    onChange={(e) => {console.log(quest.player);setQuest({...quest, player: e.target.value});}}
                />
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Start at
                </h3>
                <input
                    type={'datetime-local'}
                    name={"time"}
                    value={quest.startDate}
                    onChange={(e) => {console.log(quest.startDate);setQuest({...quest, startDate: e.target.value});}}
                />
            </div>
        </div>
    );
}