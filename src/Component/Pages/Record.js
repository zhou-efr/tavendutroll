import {useParams} from "react-router";

export const Record = (props) => {
    let { id } = useParams() || props['id'];
    return (
      <div>
          Record-{id}
      </div>
    );
}