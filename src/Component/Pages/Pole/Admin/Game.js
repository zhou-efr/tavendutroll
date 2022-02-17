import {useState} from "react";
import {BASE_API_URL} from "../../../../Constant";

export const Game = (props) => {
    const [game, setGame] = useState({name: '', support: '', pole: 'common', thumbnail: null, description: '', content: '', available: false})

    const onSubmit = async (e, target) => {
        let data = new FormData();
        data.append('file', game.thumbnail[0])

        let thumbnail = await fetch(BASE_API_URL + 'upload', {method: 'POST', body: data}).catch(e => null)
        thumbnail = await thumbnail.json();

        if (!thumbnail){
            return
        }

        data = game;
        data.thumbnail = thumbnail.fileUrl;
        let res = await fetch(BASE_API_URL+target, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).catch(e => null)
        res = await res.json();
        console.log(res);
        if (!res){
            alert("fail to create game");
        }else {
            alert("create game");
        }

        setGame({name: '', support: '', pole: 'common', thumbnail: null, description: '', content: '', available: false});
    };

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 w-full"}>
            <h2 className={'text-2xl'}>
                Add Game
            </h2>
            <div className={"w-1/2 ml-3"}>
                <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'game')}>
                    Submit
                </button>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Name
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Game Name"}
                    value={game.name}
                    onChange={(e) => setGame({...game, name: e.target.value})}/>
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Support
                </h3>
                <select
                    className={" p-1 w-full bg-white"}
                    name="pole"
                    id="pole-select"
                    value={game.support}
                    onChange={(e) => setGame({...game, support: e.target.value})}>
                    <option value="">--Select A Support Type--</option>
                    <option value="Physical">Physical</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Other">Other</option>
                </select>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Pole
                </h3>
                <select
                    className={" p-1 w-full bg-white"}
                    name="pole"
                    id="pole-select"
                    value={game.pole}
                    onChange={(e) => setGame({...game, pole: e.target.value})}>
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
                    onChange={(e) => {console.log(game.thumbnail);setGame({...game, thumbnail: e.target.files});}}/>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Description
                </h3>
                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    cols="33"
                    placeholder={"Lorem ipsum dolor sit amet"}
                    value={game.description}
                    onChange={(e) => setGame({...game, description: e.target.value})}/>

                <div className={"mt-4"}>
                    <input
                        type="checkbox"
                        value={game.available}
                        onChange={(e) => setGame({...game, available: e.target.checked})}
                        name={"available"}
                    />
                    <label className={"ml-2"} htmlFor="available">Available</label>
                </div>
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
                    value={game.content}
                    onChange={(e) => setGame({...game, content: e.target.value})}/>
            </div>
        </div>
    );
}