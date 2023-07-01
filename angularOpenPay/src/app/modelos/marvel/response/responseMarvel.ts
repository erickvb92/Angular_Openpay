export class Root {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: Data
}

export class Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Result[]
}

export class Result {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}

export class Thumbnail {
  path: string
  extension: string
}

export class Comics {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

export class Item {
  resourceURI: string
  name: string
  type: any
}

export class Series {
  available: number
  collectionURI: string
  items: Item2[]
  returned: number
}

export class Item2 {
  resourceURI: string
  name: string
  type: any
}

export class Stories {
  available: number
  collectionURI: string
  items: Item3[]
  returned: number
}

export class Item3 {
  resourceURI: string
  name: string
  type: string
}

export class Events {
  available: number
  collectionURI: string
  items: Item4[]
  returned: number
}

export class Item4 {
  resourceURI: string
  name: string
  type: any
}

export class Url {
  type: string
  url: string
}