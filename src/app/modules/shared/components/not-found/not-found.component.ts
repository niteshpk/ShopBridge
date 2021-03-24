import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input() title: String = 'Page Not Found!';
  @Input() description: String = 'The page you are trying to visit does not exists. Please check the URL and try again.';

  constructor() { }

  ngOnInit(): void {
  }

}
