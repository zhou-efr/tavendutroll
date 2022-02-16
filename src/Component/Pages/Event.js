import {useParams} from "react-router";

export const Event = (props) => {
    let { id } = useParams() || props['id'];
    // TODO: event page (universal item ?)
    return (
        <div>
            Event-{id}
        </div>
    );
}