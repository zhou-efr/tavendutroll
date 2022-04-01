import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Carousel = (props) => {
    const [current, setCurrent] = useState(0);
    let classname = props?.classname || "";
    let content = props?.content || [{"name": "Welcome", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG"}];

    let portrait = window.innerHeight > window.innerWidth;

    let status = [];
    for (let i = 0; i < content.length; i++) {
        status.push(
            <div key={i} onClick={() => setCurrent(i)} className={`h-full  ${(i <= current%content.length)?"bg-dark-brown":"bg-light-brown"}`} style={{width: `${Math.floor(100 / content.length)}%`}}/>
        );
    }

    useEffect(() => {
        let slideInterval = setInterval(() => {
            setCurrent(current => current + 1);
        }, 7000);
        return () => clearInterval(slideInterval);
    }, [])

    // console.log("reload ", current%content.length);

    return (
        <div className={"relative w-full ".concat(classname)}>
            <div className={`${portrait?"home-picture-size-phone":""} absolute left-10 top-32 lg:top-20 lg:left-[10vw] z-10`}>
                <div className={`${portrait?"home-picture-size-phone":"carousel-text-size"} bg-dark-brown p-5 flex flex-col items-start justify-center`}>
                    <div key={current} className={"[animation-name:carousel-text] [animation-duration:2s]"}>
                        <Link to={content[current%content.length].link}><h3 key={current} className={"text-4xl font-bold text-white hover:underline [animation-name:carousel-text-opacity] [animation-duration:2s]"}>{content[current%content.length].name}</h3></Link>
                        <p key={current} className={"text-base text-white [animation-name:carousel-text-opacity] [animation-duration:2s]"}>{content[current%content.length].description}</p>
                    </div>
                </div>
                <div className={"w-full h-2 mt-1 flex flex-row gap-2"}>
                    {
                        status.map((item => item))
                    }
                </div>
            </div>
            <Link to={content[current%content.length].link}>
                <img
                    key={current}
                    className={`absolute hover:opacity-95 z-0 top-0 right-0 ml-6 ${portrait?"home-picture-size-phone":"carousel-picture-size"} object-cover [animation-name:carousel] [animation-duration:2s]`}
                    src={content[current%content.length].imageUrl}
                    alt={"panda"}
                />
            </Link>
        </div>
    );
}