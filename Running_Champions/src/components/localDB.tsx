import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class Run {
    id: number;
    name: string;
    time: number;
    date: string;
    distance: number;

    constructor(i: number, n: string, t: number, da: string, di: number) {
      this.id = i;
      this.name = n;
      this.time = t;
      this.date = da;
      this.distance = di;
    }
}

export async function addRun(run: Run): Promise<number> {
  const { keys } = await Storage.keys();

  await Storage.set({
    key: keys.length.toString(),
    value: JSON.stringify(run)
  });
  return keys.length;
}

export async function getRuns(): Promise<Run[]> {

  // Clears local db when you view history page
  // For debug purposes only
  //await Storage.clear();

  let { keys } = await Storage.keys();
  keys.sort((a: string, b: string) => {
    let intA = parseInt(a);
    let intB = parseInt(b);
    return (intA < intB) ? -1 : ((intA === intB) ? 0 : 1);
  });
  let runs: Run[] = [];

  for (let i = 0; i < keys.length; i++) {
    const { value } = await Storage.get({ key: keys[i] });
    if (value != null) {
      runs.push(JSON.parse(value));
    }
  }
  return runs;
}

export async function getSize() {
  const { keys } = await Storage.keys();
  return keys.length;
}

/*
async function setObject(k: string, obj: Run[]) {
  await Storage.set({
    key: k,
    value: JSON.stringify(obj)
  });
}

async function getObject(k: string): Promise<Run[]> {
  const { value } = await Storage.get({ key: k });
  return value != null ? JSON.parse(value) : [];
}

async function setItem(k: string, val: string) {
  await Storage.set({
    key: k,
    value: val
  });
}

async function getItem(k: string): Promise<string> {
  const { value } = await Storage.get({ key: k });
  return value != null ? value : "";
}

async function removeItem(k: string) {
  await Storage.remove({ key: k });
}

async function keys() {
  const { keys } = await Storage.keys();
  return keys;
}

async function clear() {
  await Storage.clear();
}
*/
