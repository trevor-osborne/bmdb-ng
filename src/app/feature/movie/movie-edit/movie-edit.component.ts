import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: '../movie-maint-shared/movie-maint.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  title: string = "Movie-Edit";
  movie: Movie = new Movie();
  movieId: number = 0;
  submitBtnTitle: string = "Save";

  constructor(private movieSvc: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.movieId = parms["id"]);
    this.movieSvc.get(this.movieId).subscribe(jr => {
      this.movie = jr.data as Movie;
      console.log("Movie Found! ", this.movie);
    });
  }

  save() {
    this.movieSvc.edit(this.movie).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new movie: ", this.movie);
      }
      else {
        console.log("Movie Saved: ", this.movie);
        this.router.navigateByUrl("/movie/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/movie/list");
  }

}
