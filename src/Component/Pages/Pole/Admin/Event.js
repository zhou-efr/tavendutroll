import {BASE_API_URL, BASE_IMAGE_API_URL, IMAGE_UPLOAD_API_URL} from "../../../../Constant";
import {useState} from "react";

export const Event = (props) => {
    const [event, setEvent] = useState({name: '', author: '', pole: 'common', thumbnail: null, description: '', content: ''});

    const onSubmit = async (e, target) => {
        let data = new FormData();
        data.append('file', event.thumbnail[0])

        await fetch(IMAGE_UPLOAD_API_URL + 'upload', {method: 'POST', body: data}).catch(e => null)
        // thumbnail = await thumbnail.json();

        data = event;
        data.thumbnail = BASE_IMAGE_API_URL + event.thumbnail[0].name;
        let res = await fetch(BASE_API_URL+target, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).catch(e => null)
        res = await res.json();

        if (!res){
            alert("fail to create post");
        }else {
            alert("create post");
        }

        setEvent({name: '', author: '', pole: 'common', thumbnail: null, description: '', content: ''});
    };

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 w-full"}>
            <h2 className={'text-2xl'}>
                Add Event
            </h2>
            <div className={"w-1/2 ml-3"}>
                <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'event')}>
                    Submit
                </button>
            </div>

            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Name
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Event Name"}
                    value={event.name}
                    onChange={(e) => setEvent({...event, name: e.target.value})}/>
            </div>
            <div className={"w-1/2 ml-3"}>
                <h3 className={"text-lg"}>
                    Author
                </h3>
                <input
                    className={" p-1 w-full"}
                    placeholder={"Author Name"}
                    value={event.author}
                    onChange={(e) => setEvent({...event, author: e.target.value})}/>
            </div>


            <div className={"w-1/2 "}>
                <h3 className={"text-lg mr-3"}>
                    Pole
                </h3>
                <select
                    className={" p-1 w-full bg-white"}
                    name="pole"
                    id="pole-select"
                    value={event.pole}
                    onChange={(e) => setEvent({...event, pole: e.target.value})}>
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
                    // value={event.thumbnail[0]}
                    onChange={(e) => {console.log(event.thumbnail);setEvent({...event, thumbnail: e.target.files});}}/>
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
                    value={event.description}
                    onChange={(e) => setEvent({...event, description: e.target.value})}/>
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
                    value={event.content}
                    onChange={(e) => setEvent({...event, content: e.target.value})}/>
            </div>
        </div>
    );
}