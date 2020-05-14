import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.class';
import { Actor } from 'src/app/model/actor.class';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css']
})
export class CreditCreateComponent implements OnInit {
  title: string = 'Credit-Create';
  credit: Credit = new Credit();
  submitBtnTitle: string = 'Create';
  movies: Movie[] = [];
  actors: Actor[] = [];
  errorMessage: string = "";

  constructor(private movieSvc: MovieService,
              private actorSvc: ActorService,
              private creditSvc: CreditService,
              private router: Router) { }

  ngOnInit() {
    this.movieSvc.list().subscribe(
      jr => {
        this.movies = jr.data as Movie[];
        console.log(this.movies);
    });
    this.actorSvc.list().subscribe(
      jr => {
        this.actors = jr.data as Actor[];
        console.log(this.actors);
    });

  }

  save() {
    this.creditSvc.create(this.credit).subscribe(jr => {
      if (jr.errors!=null) {
        console.log("Error creating new credit: ", this.credit, jr.errors);
        this.errorMessage = "Error creating Credit. Try again.";
        alert(this.errorMessage);
      }
      this.router.navigateByUrl('/credit/list');
    });
  }

  backClicked() {
    this.router.navigateByUrl("/credit/list");
  }
}