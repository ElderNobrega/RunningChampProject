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
import { withRouter, useHistory } from 'react-router-dom';
import { home, mail, logIn, settings, people, logOut } from 'ionicons/icons';
import {toast} from '../helperFunctions/toast';
import {logOutUser} from '../components/firebaseConfig';



const Menu: React.FunctionComponent = () => {

  const appPages: any[] = [
    {    title: 'Home',        url: '/home',        icon: home     },
    {    title: 'Login',       url: '/login',       icon: logIn    },
    {    title: 'Messages',    url: '/messages',    icon: mail     },
    {    title: 'Settings',    url: '/settings',    icon: settings },
    {    title: 'About Us',    url: '/about',       icon: people   }
  ];

  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory()

  async function logingOut() {
    setBusy(true)
    await logOutUser()
    setBusy(false)
    toast('You have logged out')
    history.replace('/login')
}
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
              <IonItem routerLink={appPage.url} routerDirection="forward">
                <IonIcon slot="start" icon={ appPage.icon } />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
        <IonLoading message='Loging out...' duration={0} isOpen={busy}/>
        <IonItem button onClick={logingOut}>
          <IonIcon slot='start' icon={logOut}/>
          <IonLabel>Log out</IonLabel> 
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);
};

export default withRouter(Menu);
