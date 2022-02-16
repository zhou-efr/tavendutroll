import {useEffect, useState} from "react";
import {BASE_API} from "../../../../Constant";
import {useParams} from "react-router";
import {Item} from "./Item";

export const GameList = (props) => {
    const [gameList, setGameList] = useState([]);
    const [gameListLoad, setGameListLoad] = useState(false);
    let { type } = useParams() || props['type'] || false;

    useEffect(() => {
        fetch(BASE_API+'game', {method: 'GET',})
            .then(res => res.json())
            .then((res) => {setGameList(res);setGameListLoad(res.length);})
            .catch((res) => {console.log(res)})
    }, [])
    // const game = games.filter(item => item.id === gameId)[0];
    return (
        <div className={"w-screen p-10 flex justify-center items-center"}>
            {
                gameListLoad && (
                    <div className={"w-full grid grid-cols-1 md:grid-cols-3 gap-12"}>
                        {
                            gameList.map((item, index) => {
                                return (
                                    <Item game={item} />
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}