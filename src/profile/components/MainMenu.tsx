import classnames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { getMyProfileUrl, getProfileSearchUrl, getProfileSettingsUrl, getProfileStatisticsUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import style from './mainMenu.less';

const MainMenu = () => {
  return (
    <div className={style.menuGrid}>
      <MenuElement text="Min Profil" {...getMyProfileUrl()} />
      <MenuElement text="Brukersøk" {...getProfileSearchUrl()} />
      <MenuElement text="Innstillinger" {...getProfileSettingsUrl()} />
      <MenuElement text="Statistikk" {...getProfileStatisticsUrl()} />
    </div>
  );
};

export interface IElementProps {
  text: string;
  href: string;
  as?: string;
}

export const MenuElement = ({ text, href, as }: IElementProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link href={href} as={as}>
      <a className={classnames(style.menuElement, { [style.menuElementActive]: isActive })}>
        <h1>{text}</h1>
      </a>
    </Link>
  );
};

export default MainMenu;
