import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard,
        IonCardTitle, IonCardHeader, IonList, withIonLifeCycle} from '@ionic/react';
import React from 'react';
import '../css/CompDetail.css';
import { RouteComponentProps } from 'react-router';
import { getCompetition, getTeams } from '../components/firebaseConfig';

interface CompDetailProps extends RouteComponentProps<{
  id: string;
}>{}

class CompDetailsPage extends React.Component<CompDetailProps> {
  state = {isFetching: true}
  count = {num: 0}
  competition: Array<any> = []
  teams: Array<any> = []

  async ionViewWillEnter() {
    console.log("This is ion view will enter")
    const comp = await getCompetition(this.props.match.params.id)
    const team = await getTeams(this.props.match.params.id)
    if (comp && team) {
      this.competition = comp
      team.forEach((element) => {
        this.teams.push(element)
        this.setState({count: this.count.num + 1})
      })
      this.setState({isFetching: false})
    }
    console.log(this.competition)
    console.log(this.teams)
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired')
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired');
  }
  
  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired')
  }

  render() {
    let items = this.teams.map((team) => {
      return (
        <IonCard id="list" key={team.teamId} button routerLink={"/page/TeamDetails/" + team.teamId} onClick={(e) => console.log("teams page")}>
        <IonCardHeader>
          <IonCardTitle>
            <span className="comp-item-first">{team.tName}</span>
            <span className="comp-item-list">{team.distance } km</span>
            <span className="comp-item-list">1</span>
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
      )
    })
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle class="ion-text-center">Competition Details</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent id="compDetail">
          <section>
            <div className="comp-detail">
              <span>{this.state.isFetching ? "" : (this.competition[0].name)}</span>
              <span className="fee">${this.state.isFetching ? "" : (this.competition[0].fee)}</span>
            </div>
            <div className="comp-detail">
              <span>({this.state.isFetching ? "" : (this.competition[0].minRange)}km - {this.state.isFetching ? "" : (this.competition[0].maxRange)})</span>
              <span className="entrants">{this.state.isFetching ? "" : (this.competition[0].entrants)} entrants</span>
            </div>
            <div className="comp-detail">
              <span className="comp-item">Start: </span>
              <span>{this.state.isFetching ? "" : (this.competition[0].startDate)}</span>
            </div>
            <div className="comp-detail">
              <span className="comp-item">End: </span>
              <span>{this.state.isFetching ? "" : (this.competition[0].endDate)}</span>
            </div>
            <div className='comp-detail'>
              <span className='comp-item'>Description: </span>
              <span>{this.state.isFetching ? "" : (this.competition[0].description)}</span>
            </div>
          </section>
        <IonList>{items}</IonList>
        </IonContent>
      </IonPage>
    )
  }
}



/* const ListItems = () => {
  const teams = [
    {tName: "Team First", distance: 30.0, place: "1st"},
    {tName: "Team Win", distance: 25.0, place: "2nd"},
    {tName: "Team Good", distance: 20.4, place: "3rd"},
    {tName: "Team Trying", distance: 17.0, place: "4th"},
    {tName: "Team Never Give Up", distance: 6.3, place: "5th"}
  ];

  let count = 0;
  const items = teams.map(team => {
    count += 1;
    return (
      <IonCard id="list" key={count} button routerLink="/page/TeamDetails" onClick={(e) => console.log("teams page")}>
        <IonCardHeader>
          <IonCardTitle>
            <span className="comp-item-first">{team.tName}</span>
            <span className="comp-item-list">{team.distance } km</span>
            <span className="comp-item-list">{team.place}</span>
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    )
  })
  return <IonList>{items}</IonList>;
}
 */
export default withIonLifeCycle(CompDetailsPage);
