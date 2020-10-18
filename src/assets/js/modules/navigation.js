import PreLoader from "./preloader";
import Teams from "./teamsHandler";
import Standings from "./standingsHandler";

export default class Navigation {
  constructor(leagueId) {
    this.navigationButtons = document.querySelectorAll("#navigation>button");
    this.dropdownLeagueContainer = document.getElementById(
      "dropdownLeagueContainer"
    );
    this.filterStandingsBtn = document.querySelectorAll(
      "#filterButtonsWrap button"
    );
    this.dropdownLeagues = document.querySelectorAll(".league");
    this.selected = document.getElementById("selected");
    this.leagueId = leagueId;
    console.log("navigation: ", leagueId);
    this.events();
  }

  // select for "standings" || "teams" || "scorers"

  events() {
    this.navigationButtons.forEach((stat) => {
      stat.addEventListener("click", (e) => {
        // only run if it's not already active

        if (!stat.classList.contains("active")) {
          PreLoader.prototype.showLoader();

          this.statValue = e.target.getAttribute("id");
          console.log("clicked on stat: ", this.statValue);

          // remove the "active" class
          this.navigationButtons.forEach((btn) => {
            btn.classList.remove("active");
          });

          // add the "active" class to targeted element
          e.target.classList.add("active");

          if (this.statValue === "standings")
            new Standings(this.leagueId).init();
          else if (this.statValue === "scorers") scorers(data);
          else if (this.statValue === "teams") new Teams(this.leagueId);
        }
      });
    });

    // showDropDrownItems
    this.selected.addEventListener("click", () => this.toggleDropDown());
    this.selected.addEventListener("keyup", () => this.toggleDropDown());

    // dropdownLeagues dropdown handler
    this.dropdownLeagues.forEach((league) => {
      let selectedLeague = document.querySelector("#selected>span");
      league.addEventListener("click", (e) => {
        // execute only when the selected "league" is different from "current" league

        if (selectedLeague.textContent != e.currentTarget.textContent) {
          PreLoader.prototype.showLoader();

          // collapse the dropdownLeagueContainer

          dropdownLeagueContainer.classList.remove("scaleY1");
          selectedLeague.textContent = e.currentTarget.textContent;

          // ends

          selected.style.transform = "translateY(-80px)";

          // remove/set active class

          for (let btn of this.navigationButtons) {
            if (btn.classList.contains("active")) {
              btn.classList.remove("active");
              break;
            }
          }

          // to highlight "standings" initially on every selection
          this.navigationButtons[2].classList.add("active");

          this.leagueId = league.dataset.league;
          teamsOutput.innerHTML = "";

          // fetch standings
          new Standings(this.leagueId).init();
          this.highlightOverallFilterInitially();
        }
      });
    });

    // filter standings
    this.filterStandingsBtn.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          if (!btn.classList.contains("activeFilter")) {
            console.log("clicked on filter button");

            this.filterStandingsBtn.forEach((btn) =>
              btn.classList.remove("activeFilter")
            );
            btn.classList.add("activeFilter");

            new Standings().populateStandings(btn.dataset.tableType);
          }
        },
        true
      );
    });
  }

  highlightOverallFilterInitially() {
    this.filterStandingsBtn.forEach((btn) => {
      btn.classList.remove("activeFilter");
    });

    this.filterStandingsBtn[0].classList.add("activeFilter");
  }

  toggleDropDown() {
    console.log("clicked");
    dropdownLeagueContainer.classList.toggle("scaleY1");
  }
}
