import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmailService } from 'src/app/services/confirm-email.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit, OnChanges {

  loading = true;

  notify : boolean = false;

  confirm: boolean | null = null;

  current$ : any;

  constructor(private confirmEmailService : ConfirmEmailService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.route.params.subscribe( params => {

      if(params['token']) {

          this.notify = false;

          this.confirmEmailService.confirmEmail(params['token']).subscribe({

              next : () => this.confirmEmailService.confirm()
          })

      } else {

        this.notify = true;

      }

    });

    this.current$ = this.confirmEmailService.currentConfirmed$.subscribe( (confirm : boolean | null) => {

      confirm === null ? this.loading = true : this.loading = false;

      this.confirm = confirm;

    } );
  }

  ngOnChanges(changes: SimpleChanges): void {
    
   changes['current$'].currentValue( (confirm : boolean | null) => {

     confirm === null ? this.loading = true : this.loading = false;

     this.confirm = confirm;

   } );
  }

  login() {

    this.router.navigate(['/login']);

  }

}
