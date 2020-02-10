export class Run {
    id: number;
    name: string;
    time: number;
    date: string;
    distance: number;
    positions: Position[];

    constructor(i: number, n: string, t: number, da: string, di: number, p: Position[]) {
      this.id = i;
      this.name = n;
      this.time = t;
      this.date = da;
      this.distance = di;
      this.positions = p;
    }
}

export class Position {
  lat: number;
  long: number;
  timestamp: number;

  constructor(la: number, lo: number, time: number) {
    this.lat = la;
    this.long = lo;
    this.timestamp = time;
  }
}