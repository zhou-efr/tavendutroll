import {useEffect, useState} from "react";
import {BASE_API_URL, GAME_URL} from "../../../../Constant";
import {useParams} from "react-router";
import {Item} from "../../../Item";

export const GameList = (props) => {
    const [gameList, setGameList] = useState([]);
    const [gameListLoad, setGameListLoad] = useState(false);
    let { type } = useParams() || props['type'] || false;
    useEffect(() => {
        fetch(BASE_API_URL+'game', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {
                setGameListLoad(res.length);
                if(type){
                    const game = res.filter(item => item.pole === type);
                    setGameList(game);
                }else {
                    setGameList(res);
                }
            })
            .catch((res) => {console.log(res)})
    }, [])
    // const game = games.filter(item => item.id === gameId)[0];
    return (
        <div className={"w-screen p-10 flex justify-center items-center"}>
            {
                gameListLoad && (
                    <div className={"w-full flex flex-wrap gap-12"}>
                        {
                            gameList.map((item, index) => {
                                return (
                                    <Item call={"object"} item={item} content={false} link={GAME_URL+'/'+item.id}/>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}