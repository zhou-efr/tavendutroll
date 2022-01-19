import starplayer from '../images/starplayer.png';
import discord from '../images/DiscordLogo.png';
import facebook from '../images/FacebookLogo.png';
import instagram from '../images/InstagramLogo.png';
import linkedin from '../images/LinkedinLogo.png';
import twitch from '../images/TwitchLogo.png';
import logo from "../images/logo.png";
import {Link} from "react-router-dom";

export const Footer = (props) => {
    let icons = [
        [discord, 'https://discord.gg/8x5DwZxdzd'],
        [facebook, 'https://www.facebook.com/EfreiTaverneduTroll/'],
        // [instagram, ''],
        [linkedin, 'https://www.linkedin.com/company/efreitavernedutroll/?originalSubdomain=fr'],
        // [twitch, '']
    ];

    return (
      <div className={"w-screen h-1/2 mb-16 flex flex-col justify-between bg-tdt-brown text-white pr-10 pb-16"}>
          <div className={"flex flex-row w-full h-2/3 border-b border-b-white ml-3 mb-2 justify-between pb-4"}>
              <div className={"flex flex-row"}>
                  <Link to={'/'}><img className={'object-contain h-48'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
                  <div className={"pt-3 w-72"}>
                      <h3 className={"text-2xl font-bold pb-2"}>Taverne Du Troll</h3>
                      <p className={"text-sm"}>
                          30-32 Avenue de la République
                          94800 Villejuif,
                          France
                          Le siège social est situé au sein des locaux de Efrei Paris. À ce titre l’Association respecte le Règlement Intérieur du campus d’ Efrei Paris.
                      </p>
                  </div>
              </div>
              <div className={"flex flex-row-reverse"}>
                  <div className={"pt-3 w-56"}>
                      <h3 className={"text-2xl font-bold pb-2"}>Contact</h3>
                      <Link to={'/about'}><p className={'text-sm'}>About us</p></Link>
                      <a href={"https://discord.gg/HzKkU6VFDK"}><p className={'text-sm'}>Discord</p></a>
                      <a href={"mailto:killian.zhou@efrei.net"}><p className={'text-sm'}>Mail to webmaster</p></a>
                      <Link to={'/partner'}><p className={'text-sm'}>Partenaires</p></Link>
                  </div>
                  <div className={"pt-3 w-56"}>
                      <h3 className={"text-2xl font-bold pb-2"}>Association</h3>
                      <a href={"https://www.helloasso.com/associations/la-taverne-du-troll"}><p className={'text-sm'}>Helloasso</p></a>
                      <a href={"https://www.myefrei.fr/"}><p className={'text-sm'}>MyEfrei</p></a>
                      <a href={"https://associations.efrei.fr/groups/taverne-du-troll"}><p className={'text-sm'}>Site association</p></a>
                      <a href={"https://www.efrei.fr/"}><p className={'text-sm'}>EFREI Paris</p></a>
                  </div>
              </div>
          </div>
          <div className={"flex flex-row w-full justify-between pb-1 h-1/3"}>
              <p className={"text-sm pl-6"}>association loi 1901</p>
              <div className={"flex flex-col items-end "}>
                  <div className={"flex flex-row pb-3 justify-center items-center"}>
                      <p className={'text-sm pr-2'}>follow us : </p>
                      {icons.map((img, k) => <a href={img[1]}><img className={'w-8'} src={img[0]} key={k} alt={'logo'}/></a> )}
                  </div>
                  <img src={starplayer} alt={'starplayer logo'} className={'w-16'}/>
              </div>
          </div>
      </div>
    );
};
