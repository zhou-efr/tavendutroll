import {useParams} from "react-router";
import {Item} from "../Item";
import {EVENT_API_URL} from "../../Constant";

export const Event = (props) => {
    let { id } = useParams() || props['id'];
    return (
        <Item id={id} call={"id"} url={EVENT_API_URL} />
    );
}