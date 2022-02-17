import {useParams} from "react-router";
import {Item} from "../Item";
import {RECORD_API} from "../../Constant";

export const Record = (props) => {
    let { id } = useParams() || props['id'];
    return (
      <Item call={"id"} url={RECORD_API} id={id}/>
    );
}