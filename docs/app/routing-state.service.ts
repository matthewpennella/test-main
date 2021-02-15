import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingStateService {
  History = [];

  constructor(private router: Router) { }

  public loadRouting(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.History = [...this.History, event.urlAfterRedirects];
      }
    });
  }

  public getHistory(): string[] {
    return this.History;
  }

  public getPreviousUrl(): string {
    return this.History[this.History.length - 1] || '/';
  }

  public getNthPreviousUrl(index: number): string {
    return this.History[this.History.length - index] || '/';
  }
}
