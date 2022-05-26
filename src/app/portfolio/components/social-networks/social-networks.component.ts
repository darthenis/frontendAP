import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin, faInstagramSquare, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { networks } from '../contact/type';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {

  @Output() cancelEmit = new EventEmitter();

  @Input() socialNetWorks : networks;

  faTimes = faTimes;
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  faInstagramSquare = faInstagramSquare;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
