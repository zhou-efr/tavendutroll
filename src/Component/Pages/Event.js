import {useParams} from "react-router";

export const Event = (props) => {
    let { id } = useParams() || props['id'];
    return (
        <div>
            Event-{id}
        </div>
    );
}