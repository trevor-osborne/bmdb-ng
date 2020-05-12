import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: '../movie-maint-shared/movie-maint.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  title: string = "Movie-Create";
  movie: Movie = new Movie();
  submitBtnTitle: string = "Create";

  constructor(private movieSvc: MovieService,
              private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    this.movieSvc.create(this.movie).subscribe(jr => {
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
