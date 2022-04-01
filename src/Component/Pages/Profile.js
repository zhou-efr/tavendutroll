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
            <div className={"w-full mt-20 mb-20 flex items-center flex-wrap-reverse justify-center gap-24"}>
                <div className={"flex justify-center items-center flex-col"}>
                    {
                        Object.keys(user).map((userKey, index) => {
                            if(userKey === "locale" || userKey === "updated_at" || userKey === "email_verified" || userKey === "sub")
                                return <></>
                            if(userKey === "picture"){
                                return (
                                    <></>
                                );
                            }
                            return (
                                <div key={index}>
                                    <p><strong>{userKey} : </strong>{user[userKey]}</p>
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