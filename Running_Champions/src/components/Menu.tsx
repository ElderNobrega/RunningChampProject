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
import { withRouter } from 'react-router-dom';
import { home, mail, logIn, settings, people } from 'ionicons/icons';

const appPages: any[] = [
  {    title: 'Home',        url: '/home',        icon: home     },
  {    title: 'Login',       url: '/login',       icon: logIn    },
  {    title: 'Messages',    url: '/messages',    icon: mail     },
  {    title: 'Settings',    url: '/settings',    icon: settings },
  {    title: 'About Us',    url: '/about',       icon: people   }
];

const Menu: React.FunctionComponent = () => (
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
              <IonItem routerLink={appPage.url} routerDirection="forward">
                <IonIcon slot="start" icon={ appPage.icon } />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
