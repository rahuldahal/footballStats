import PreLoader from "./utils/preloader";
import Matches from "./matchesHandler";
import Navigation from "./navigation";
import Router from "./utils/router";
import LeagueDetails from "./utils/leagueDetails";

export default class LandingPage {
  constructor() {
    this.landingContent = document.getElementById("landingContent");
    this.leagues = document.querySelectorAll("#selectLeague button");
    this.leagueId;
    this.handleButtons();
  }

  handleButtons() {
    this.leagues.forEach((league) => {
      new Router({
        link: league,
        callback: () => this.callback(league),
      });
    });
    console.log(Router.getRoutes());
  }

  callback(league) {
    // show loader
    PreLoader.prototype.showLoader();
    const leagueId = league.dataset.league;
    // change the "selected-league" text on the top-left of the screen
    document.querySelector("#selected>span").textContent =
      league.dataset.leagueName;

    // display the "header" and "nav"
    document.querySelector("header").style.display = "flex";
    document.querySelector("nav").style.display = "flex";

    // hide the "landingContent" and show the standings
    landingContent.style.display = "none";

    // start to fetch things
    new Navigation(leagueId);
    Navigation.changeTheme(leagueId, LeagueDetails);
    // new Standings(leagueId).init();
    new Matches(leagueId);
  }
}
