import {useParams} from "react-router";
import {Item} from "../../Item";
import {QUEST_API_URL} from "../../../Constant";
import {Header} from "../../Header";

export const Quest = (props) => {
    let { id } = useParams() || props['id'];
    // TODO: define join button use  (discord notification ?) (player database ?) (player list ?)
    return (
        <>
            <Header />
            <Item call={"id"} url={QUEST_API_URL} id={id} button={"Rejoindre"}/>
        </>
    );
}