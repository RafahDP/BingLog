export class Media {
    constructor({
        id,
        title,
        type,
        totalEpisodes = 0,
        currentEpisode = 0,
        status = 'Planned'
    }){
        this.id = id;
        this.title = title;
        this.type = type;
        this.totalEpisodes = totalEpisodes;
        this.currentEpisode = currentEpisode;
        this.status = status;
    }
}
