import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonLoading
} from '@ionic/react';

import React, { useState } from 'react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { home, mail, logIn, logOut, settings, people } from 'ionicons/icons';
import {toast} from '../helperFunctions/toast';
import {logOutUser} from '../components/firebaseConfig';
import '../css/Menu.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { setUserState } from '../redux/actions';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

const appPages: AppPage[] = [
  {    title: 'Home',        url: '/page/Home',        icon: home     },
  {    title: 'Login',       url: '/page/Login',       icon: logIn    },
  {    title: 'Messages',    url: '/page/Messages',    icon: mail     },
  {    title: 'Settings',    url: '/page/Settings',    icon: settings },
  {    title: 'About',       url: '/page/About',       icon: people   }
];
        
const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory()
  const dispatch = useDispatch()

  async function logingOut() {
    setBusy(true)
    await logOutUser()
    setBusy(false)
    dispatch(setUserState(undefined))
    toast('You have logged out')
    history.replace('/page/Home')
  }

  const userIsLoggedIn = useSelector((state: any) => {
    return state !== undefined;
  });

  return (

    <IonMenu contentId="main" type="overlay" side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Running Champions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={appPage.title === 'Login' && userIsLoggedIn}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );

          })}
          <IonLoading message='Loging out...' duration={0} isOpen={busy}/>
          <IonItem button onClick={logingOut} hidden={!userIsLoggedIn}>
            <IonIcon slot='start' icon={logOut}/>
            <IonLabel>Log out</IonLabel> 
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
