import {useRef, useState} from "react";
import {BASE_API} from "../../Constant";

export const Admin = (props) => {
    const [post, setPost] = useState({name: '', author: '', pole: 'common', thumbnail: null, description: '', content: ''})
    const [event, setEvent] = useState({name: '', author: '', pole: 'common', thumbnail: null, description: '', content: ''})

    const onSubmit = async (e, target) => {
        let data = new FormData();
        data.append('file', post.thumbnail[0])

        let thumbnail = await fetch(BASE_API + 'upload', {method: 'POST', body: data}).catch(e => null)
        thumbnail = await thumbnail.json();

        if (!thumbnail){
            return
        }

        data = post;
        data.thumbnail = thumbnail.fileUrl;
        let res = await fetch(BASE_API+target, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).catch(e => null)
        res = await res.json();

        if (!res){
            alert("fail to create post");
        }else {
            alert("create post");
        }

        setPost({name: '', author: '', pole: 'common', thumbnail: null, description: '', content: ''});
    };

    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
            <div className={"flex flex-col justify-center items-start w-1/2"}>
                <div className={"flex flex-row w-full justify-between"}>
                    <h2 className={'text-2xl'}>
                        Add Post
                    </h2>
                    <div className={"w-1/2 ml-3"}>
                        <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'publication')}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={"w-1/2 "}>
                        <h3 className={"text-lg mr-3"}>
                            Name
                        </h3>
                        <input
                            className={" p-1 w-full"}
                            placeholder={"Post Name"}
                            value={post.name}
                            onChange={(e) => setPost({...post, name: e.target.value})}/>
                    </div>
                    <div className={"w-1/2 ml-3"}>
                        <h3 className={"text-lg"}>
                            Author
                        </h3>
                        <input
                            className={" p-1 w-full"}
                            placeholder={"Author Name"}
                            value={post.author}
                            onChange={(e) => setPost({...post, author: e.target.value})}/>
                    </div>
                </div>
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={"w-1/2 "}>
                        <h3 className={"text-lg mr-3"}>
                            Pole
                        </h3>
                        <select
                            className={" p-1 w-full bg-white"}
                            name="pole"
                            id="pole-select"
                            value={post.pole}
                            onChange={(e) => setPost({...post, pole: e.target.value})}>
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
                            onChange={(e) => {console.log(post.thumbnail);setPost({...post, thumbnail: e.target.files});}}/>
                    </div>
                </div>
                <div className={"flex flex-row w-full justify-between"}>
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
                            value={post.description}
                            onChange={(e) => setPost({...post, description: e.target.value})}/>
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
                            value={post.content}
                            onChange={(e) => setPost({...post, content: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col justify-center items-start w-1/2"}>
                <div className={"flex flex-row w-full justify-between"}>
                    <h2 className={'text-2xl'}>
                        Add Event
                    </h2>
                    <div className={"w-1/2 ml-3"}>
                        <button className={"shadow-md rounded p-2"} onClick={(e) => onSubmit(e, 'event')}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className={"flex flex-row w-full justify-between"}>
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
                </div>
                <div className={"flex flex-row w-full justify-between"}>
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
                            onChange={(e) => {console.log(post.thumbnail);setEvent({...post, thumbnail: e.target.files});}}/>
                    </div>
                </div>
                <div className={"flex flex-row w-full justify-between"}>
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
            </div>
        </div>
    );
}