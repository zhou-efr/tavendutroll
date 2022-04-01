// import prez from "../../images/prew.png";
import panda from "../../images/panda.jpg";
import {Header} from "../Header";

export const Office = () => {
  return (
      <>
          <Header />
          <div className={'w-full flex justify-center'}>
              <div className={"w-5/6 mb-5"}>
                  <div className="flex flex-row justify-around">
                      <div className="flex flex-row justify-center p-10">
                          <img className={"w-40 h-40 object-cover rounded-full"} alt={"post"} src={panda}/>
                          <div className={"flex flex-col ml-9 justify-center items-start"}>
                              <h2 className={"text-xl font-bold"}>
                                  Présidente
                              </h2>
                              <p className={"text-base"}>
                                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ration
                              </p>
                          </div>
                      </div>
                      <div className="flex flex-row justify-center p-10">
                          <div className={"flex flex-col ml-9 w-3/4 justify-center items-start"}>
                              <h2 className={"text-xl font-bold"}>
                                  Secrétaire
                              </h2>
                              <p className={"text-base"}>
                                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ration
                              </p>
                          </div>
                          <img className={"w-40 h-40 object-cover rounded-full"} alt={"post"} src={panda}/>
                      </div>
                  </div>
                  <div className="flex flex-row justify-around">
                      <div className="flex flex-row justify-center p-10">
                          <div className={"flex flex-col ml-9 justify-center items-start"}>
                              <h2 className={"text-xl font-bold"}>
                                  Trésorier
                              </h2>
                              <p className={"text-base"}>
                                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ration
                              </p>
                          </div>
                          <img className={"w-40 h-40 object-cover rounded-full"} alt={"post"} src={panda}/>
                      </div>
                      <div className="flex flex-row justify-center p-10">
                          <img className={"w-40 h-40 object-cover rounded-full"} alt={"post"} src={panda}/>
                          <div className={"flex flex-col ml-9 w-3/4 justify-center items-start"}>
                              <h2 className={"text-xl font-bold"}>
                                  Vice-Président
                              </h2>
                              <p className={"text-base"}>
                                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ration
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}