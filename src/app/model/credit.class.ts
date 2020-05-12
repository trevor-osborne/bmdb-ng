import { Movie } from './movie.class';
import { Actor } from './actor.class';

export class Credit {
    id: number;
    role: string;
    movie: Movie;
    actor: Actor;


    constructor(id: number = 0, role: string = "",
    movie: Movie = null, actor: Actor = null) {
            this.id = id;
            this.role = role;
            this.movie = movie;
            this.actor = actor;
        }

}
