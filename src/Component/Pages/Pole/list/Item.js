export const Item = (props) => {
    // TODO: create global Item component (cf Quest component)
    return (
        <div className={"aspect-square w-2/3 relative"}>
            <img src={props.game.imageUrl} className={"object-cover h-full w-full"} alt={"background - " + props.name}/>
            <div className={"absolute w-full h-1/4 top-0 left-0 bg-item flex flex-row items-center justify-center"}>
                <p className={"text-center text-white text-4xl"}>{props.game.name}</p>
            </div>
        </div>
    );
}