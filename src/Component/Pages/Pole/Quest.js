import {useParams} from "react-router";
import {Item} from "../../Item";
import {QUEST_API} from "../../../Constant";

export const Quest = (props) => {
    let { id } = useParams() || props['id'];
    return (
        <Item call={"id"} url={QUEST_API} id={id}/>
    );
}