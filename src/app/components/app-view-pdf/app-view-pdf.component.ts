import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './app-view-pdf.component.html',
  styleUrls: ['./app-view-pdf.component.scss']
})
export class AppViewPdfComponent implements OnInit {

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  pdfSrc: string = '../assets/user-condition-file/CGU_portail_partenaire.pdf';

  constructor() { }

  ngOnInit() {
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

}
