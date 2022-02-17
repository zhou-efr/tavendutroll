import {useState} from "react";
import {BASE_API_URL} from "../../../../Constant";

export const Quest = (props) => {
    const [quest, setQuest] = useState({
        name: '',
        discordId: '',
        jeux: '',
        thumbnail: null,
        description: '',
        content: ''})

    const onSubmit = async (e, target) => {
        let data = new FormData();
        data.append('file', quest.thumbnail[0])

        let thumbnail = await fetch(BASE_API_URL + 'upload', {method: 'POST', body: data}).catch(e => null)
        thumbnail = await thumbnail.json();

        if (!thumbnail){
            return
        }

        data = quest;
        data.thumbnail = thumbnail.fileUrl;
        let res = await fetch(BASE_API_URL+target, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).catch(e => null)
        res = await res.json();

        if (!res){
            alert("fail to create post");
        }else {
            alert("create post");
        }

        setQuest({
            name: '',
            discordId: '',
            jeux: '',
            thumbnail: null,
            description: '',
            content: ''});
    };

    // TODO: add quest as admin
    // TODO: add quest as user
    return (
        <div className={"grid grid-cols-2 w-full"}>
            <h2 className={'text-2xl'}>
                Add Quest
            </h2>
            <div className={"w-1/2 ml-3"}>
                <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'publication')}>
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
                    Author
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Author Name"}
                    value={quest.author}
                    onChange={(e) => setQuest({...quest, author: e.target.value})}/>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Pole
                </h3>
                <select
                    className={" p-1 w-full bg-white"}
                    name="pole"
                    id="pole-select"
                    value={quest.pole}
                    onChange={(e) => setQuest({...quest, pole: e.target.value})}>
                    <option value="">--Select A Pole--</option>
                    <option value="Common">Common</option>
                    <option value="Admin">Admin</option>
                    <option value="Wargame">Wargame</option>
                    <option value="RolePlayGame">Role Play Game</option>
                    <option value="TradingCardGame">Trading Card Game</option>
                    <option value="BoardGame">Board Game</option>
                </select>
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
        </div>
    );
}