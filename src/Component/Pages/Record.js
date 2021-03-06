import {useParams} from "react-router";
import {Item} from "../Item";
import {RECORD_API_URL} from "../../Constant";
import {Header} from "../Header";

export const Record = (props) => {
    let { id } = useParams() || props['id'];
    return (
        <>
            <Header />
            <Item call={"id"} url={RECORD_API_URL} id={id}/>
        </>
    );
}