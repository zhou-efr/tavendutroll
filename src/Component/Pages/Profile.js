import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {Header} from "../Header";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [pp, setPP] = useState("");

    useEffect(() => {
        if (!isLoading) {
            if(isAuthenticated && user){
                setPP(user.picture);
            }
        }
    }, [isLoading, isAuthenticated, user])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if(!isAuthenticated || !user){
        return <div>please authenticate yourself</div>;
    }

    return (
        <>
            <Header />
            <div className={"w-full mt-20 mb-20 flex items-center flex-col justify-center"}>
                <img className={"rounded-full h-48"} src={pp} alt={pp}/>
                <h2 className={"text-dark-brown text-3xl font-bold"}>{user.nickname}</h2>
                <div className={"flex justify-center items-center flex-col"}>
                    {
                        Object.keys(user).map((userKey, index) => {
                            if(userKey === "locale" || userKey === "updated_at" || userKey === "email_verified" || userKey === "sub" || userKey === "nickname")
                                return <></>
                            if(userKey === "picture"){
                                return (
                                    <></>
                                );
                            }
                            return (
                                <div key={index}>
                                    <p className={"text-dark-brown"}>{userKey} : <span className={"italic"}>{user[userKey]}</span></p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={""}>
                    <img className={"rounded-xl h-48"} src={pp} alt={pp}/>
                </div>
            </div>
        </>
    );
}