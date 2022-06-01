import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmailService } from 'src/app/services/confirm-email.service';
import { LoadingService } from 'src/app/services/loading.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  faSpinner = faSpinner;

  loading = this.loadingService.isLoadingGet;

  notify : boolean = false;

  confirm: boolean | null = null;

  current$ : any;

  constructor(private confirmEmailService : ConfirmEmailService, 
              private route : ActivatedRoute, 
              private router : Router, 
              private loadingService : LoadingService) { }

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

      this.confirm = confirm;

    } );
  }


  login() {

    this.router.navigate(['/login']);

  }

}
