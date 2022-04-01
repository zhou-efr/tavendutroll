import {useParams} from "react-router";
import {Item} from "../../../Item";
import {GAME_API_URL} from "../../../../Constant";
import {Header} from "../../../Header";

export const Game = (props) => {
    let { id } = useParams() || props['id'];
    // TODO: available state
    return (
        <>
            <Header />
            <Item call={"id"} url={GAME_API_URL} id={id}/>
        </>
    );
}