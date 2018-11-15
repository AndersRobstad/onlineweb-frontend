import { routes } from 'App';
import Authenticate from 'authentication/components/Authenticate';
import { STATIC_URL } from 'common/constants/endpoints';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './header.less';
import HeaderLogo from './HeaderLogo';
import MainSponsor from './MainSponsor';
import MenuButton from './MenuButton';

export interface IProps {}

export interface IState {
  isOpen: boolean;
}

class Header extends Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  constructor(props: IProps) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  public toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  public closeMenu() {
    this.setState({
      isOpen: false,
    });
  }

  public render() {
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={this.state.isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div className={`${style.links} ${this.state.isOpen ? style.dropdownMode : ''}`} onClick={this.closeMenu}>
            <Link to={routes.profile}>Profil</Link>
            <Link to={routes.events}>Arkiv</Link>
            <Link to={routes.career}>Karriere</Link>
            <Link to={routes.resources}>Ressurser</Link>
            <Link to={routes.contribution}>Bidra</Link>
            <Link to={routes.hobbygroups}>Interessegrupper</Link>
            <Authenticate authentication={'view_wiki'}>
              <Link to={routes.wiki}>Wiki</Link>
            </Authenticate>
            <Link to={routes.webshop}>Webshop</Link>
          </div>
          <MainSponsor />
        </div>
      </header>
    );
  }
}

export default Header;
