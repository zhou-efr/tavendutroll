import {useParams} from "react-router";

export const Record = (props) => {
    let { id } = useParams() || props['id'];
    // TODO: record page
    return (
      <div>
          Record-{id}
      </div>
    );
}