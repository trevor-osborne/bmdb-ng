import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  actor: Actor = new Actor();
  title: string = "Actor-Detail";
  id: number = 0;
  actorId: number = 0;

  constructor(private actorSvc: ActorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.actorId = parms["id"]);
    this.actorSvc.get(this.actorId).subscribe(jr => {
      this.actor = jr.data as Actor;
      console.log("Actor Found! ", this.actor);
    });
  }

  delete() {
    this.actorSvc.delete(this.actor.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting actor: ", this.actor);
      }
      else {
        console.log("Actor Deleted: ", this.actor);
        this.router.navigateByUrl("/actor/list");
      }
    });
  }

}
