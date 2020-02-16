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
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { home, mail, logIn, settings, people } from 'ionicons/icons';
import '../css/Menu.css'; 

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
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );

          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
