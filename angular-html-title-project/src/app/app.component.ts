import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private appName = 'TitleTesting';
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          // Traverse the ActivatedRoute tree to get titles of nested routes
          const titles: string[] = [];
          while (route) {
            if (route.snapshot.data['title']) {
              titles.unshift(route.snapshot.data['title']);
            }
            route = route.firstChild!;
          }
          return titles;
        })
      )
      .subscribe((titles) => {
        // Join the titles and append the app name
        const fullTitle = [...titles, this.appName].join(' | ');
        this.titleService.setTitle(fullTitle);
      });
  }

  updateFavicon(faviconUrl: string): void {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}
