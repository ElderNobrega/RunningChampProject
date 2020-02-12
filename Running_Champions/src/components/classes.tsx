export class Run {
    id: number;
    name: string;
    duration: number;
    date: string;
    distance: number;
    positions: Position[];

    constructor(id: number, name: string, duration: number, date: string, distance: number, position: Position[]) {
      this.id = id;
      this.name = name;
      this.duration = duration;
      this.date = date;
      this.distance = distance;
      this.positions = position;
    }
}

export class Position {
  lat: number;
  long: number;
  timestamp: number;

  constructor(lat: number, long: number, time: number) {
    this.lat = lat;
    this.long = long;
    this.timestamp = time;
  }
}