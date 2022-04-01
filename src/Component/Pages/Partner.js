import logoStarplayer from "../../images/starplayerbig.png";
import logoLoufoque from "../../images/loufoque.png";

export const Partner = () => {
    // TODO: partner page
    return (
        <div className={'h-screen-5/4'}>
            <div className={'h-screen-1/2 w-screen bg-cover bg-wooden-header flex flex-row justify-center gap-32 items-center pt-96'}>
                <a href={"https://www.starplayer.fr/"} target="_blank" rel="noreferrer">
                    <div className={"flex flex-col items-center w-80 mt-36"}>
                        <img className={"rounded-full"} src={logoStarplayer} alt={"Starplayer"}/>
                        <h3 className={"text-3xl mt-3 font-bold text-center hover:underline"}>
                            Starplayer
                        </h3>
                        <p className={"text-center mt-2"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu vehicula quam. Aenean dictum eros sed vehicula rhoncus. Suspendisse a porttitor dolor. Ut ut lobortis metus, quis consectetur metus.
                        </p>
                    </div>
                </a>
                <a href={"https://www.loufoque.fr/"} target="_blank" rel="noreferrer">
                    <div className={"flex flex-col items-center mt-36 w-80"}>
                        <img className={"rounded-full w-80"} src={logoLoufoque} alt={"Le Loufoque"}/>
                        <h3 className={"text-3xl mt-3 font-bold text-center hover:underline"}>
                            Le Loufoque
                        </h3>
                        <p className={"text-center mt-2"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu vehicula quam. Aenean dictum eros sed vehicula rhoncus. Suspendisse a porttitor dolor. Ut ut lobortis metus, quis consectetur metus.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
}