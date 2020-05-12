import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: '../actor-maint-shared/actor-maint.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit {
  title: string = "Actor-Edit";
  actor: Actor = new Actor();
  actorId: number = 0;
  submitBtnTitle: string = "Save";

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

  save() {
    this.actorSvc.edit(this.actor).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new actor: ", this.actor);
      }
      else {
        console.log("Actor Saved: ", this.actor);
        this.router.navigateByUrl("/actor/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/actor/list");
  }

}
