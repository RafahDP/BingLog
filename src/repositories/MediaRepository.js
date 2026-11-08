import { Media } from "../entities/Media.js";
export class MediaRepository{
    constructor(){
        this.medias = [
            new Media({
                id: 1,
                title: "One Piece",
                type: "Anime",
                totalEpisodes: 1100,
                currentEpisode: 1050,
                status: "Assistindo"
            })
        ]
    }

   findAll(){
       return this.medias;
   }

   findById(id){
       return this.medias.find(m => m.id === parseInt(id));
   }

   findAllAndCreate(mediaData){
       const newId = this.medias.length > 0 ? this.medias[this.medias.length - 1].id + 1 : 1;
       const media = new Media({ ...mediaData, id: newId });
       this.medias.push(media);
       return media; 
   }
   update(id, { currentEpisode, status}){
        const media = this.findById(id);
        if(!media) return null;
        
   }
}