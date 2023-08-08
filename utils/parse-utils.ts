
export type KeyValueSet<TValue>  =  { [id: string] : TValue; };
export type Dictionary<TValue> = {
  keys: Array<string>;
  kvp: KeyValueSet<TValue>;
}

export const parseUrlVars = (urlString: string) => {
  const url = new URL(urlString);
  const keys = [];
  const urlVars: KeyValueSet<string> = {};
  for(const key of url.searchParams.keys()) {
    keys.push(key);
    urlVars[key] = url.searchParams.get(key) || "";
  }
  return { keys, kvp: urlVars } as Dictionary<string>;
}