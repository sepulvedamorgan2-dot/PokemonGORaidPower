


export function Offer(data = {}) {
    this.status = data.status ?? 'Pending';
    this.title = data.title ?? 'My Trade Card';
    this.flyingOrRemote = data.flyingOrRemote ?? 'Cant Fly';
    //havelist
    this.offerCreatorReceives = data.offerCreatorReceives ?? []
    //wantlist
    this.cardCreatorReceives = data.cardCreatorReceives ?? []
    this.haveOptions = data.haveOptions ?? null
    this.wantOptions = data.wantOptions ?? null
    this.playerIdArray = data.playerIdArray ?? []
    this.cardCreator = data.cardCreator ?? null
    this.offerCreator = data.offerCreator ?? null
}
