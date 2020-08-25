# [Aussie Rules](https://louisgreenhall.github.io/MS2/)

Aussie Rules is an interactive website that allows users to keep up to date on the 2020 season of the Australian Football League (AFL). It is possible to filter information by team, users can also check live scores, see past matches, and see match probabilities for future games. They could use this to place bets or predict the result of teams they follow or are interested in.
 
## UX
 
This website is for followers of the Aussie Rules sport, that wish to be informed on the season and season progress. If they follow a team, they can use the website to see matches, stats and probabilities for their team; or if they just follow the sport, they could use the website to find details of every team. Aussie Rules is not always available for all audiences via live TV, due to geographical constraints, and so this website is the best way for users to stay informed about their team or other matches as it provides up-to-date details of matches and season standings.

### User Stories
- As a user I want to see my teams' latest match and previous matches so that I can catch up on a games I've missed and see how my my team are progressing.

- As a user I want to see how my team compares to the rest of the league and know whether they will reach the finals at the end to win the premiership.

- As a user I want to know if my team is likely to win their next match so that I can place bets or have peace of mind

## Features

- Ladder: shows the teams current ladder position of all 18 teams, pulling from the "standings" [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-standings) of the AFL API: From the page being loaded, the ladder is displaying standing number (1st - 18th) team logo, played, won, drawn and lost matches, as well as the goal/point difference which settles order of teams on the same amount of games won. This also minimises to serve as navigation where it then shows an abbreviated version of the team names, team logos and standing position and percentage of points scored and conceded.

- Fixtures from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-summaries): list of matches played and scheduled for each team, pulling from the season summaries.

- Match timeline from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#match-timeline): allows selection of the four quarters of any match to be displayed and view each score change to see how the match result came to be.

- Match statistics from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-summaries) specifically the statistics object: shows how both teams compared in their stats and allows individual analysis of whether the game was a close contest or an easy win and for which team. 
    - Probabilities - shows which team is more likely to win a given future match - shows probabilities from approximately 1-2 weeks in advance of the match.

- Venue details: shows on google maps where each game was played and also provided the address (via the Google Maps Geocoding API), name and capacity of each stadium.

### Existing Features

- Ladder: Allows users to see where their team is located in the league table and by clicking on a team a user will be taken to that team's latest match, which includes the team fixtures, match stats, match timeline and venue information. Once clicked by the user the table collapses to serve as a  minimised nav-bar, and a "Ladder" button appears to allow the user to see the full table again.

- Fixtures: Allows users to select which match they're looking at for the selected team, the currently selected team is both highlighted, and team colours applied to the header to provide positive visual feedback of their current location.

- Match Stats: Allows users to see more in-depth scores of each team as well as the overall stats of how the current teams (per match) performed such as tackles, kicks and free kicks. These stats are compared with a Red-Amber-Green (RAG) system to show in which areas the teams were better, equivalent or worse.

- Venue Stats: Allows users to see where a past, live, or future match was/will be held. This could be for travel purposes if they are intending to watch the game live, or to understand the teams travel requirements from week to week as this can impact a team's readiness for a match, and could be of interest to more dedicated fans. 

### Features Left to Implement
- Link match probabilities to betting sites that allow you place bets on related matches - also for the season winner. 
- Timeline score changes to have hover action that specifies more whether the change is a goal or behind. 
- Implement a score 'worm' alongside the timeline that focuses on how different each team's score was at a given point.
- Video Highlights of each match as found from youtube.
- Next and Prev buttons on game weeks to allow another way to navigate through a team's list of games.

## Technologies Used

- [Materialize Framework](https://materializecss.com/)
    - I used **Materialize** to provide responsiveness and structure to my website.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Json Formatter](https://jsonformatter.org/)
    - To help me understand the structure of the data returned from the APIs, I used **JSON formatter's** tree view, since this gave an easy to understand visualisation of the data in a nested structure.

- [Fiddler](https://www.telerik.com/download/fiddler-everywhere)
    - **Fiddler** allowed my to save responses from my API without adding too heavily to my calls-per-month allowance from the AFL API (1000).

- [MomentJS](https://momentjs.com/)
    - **MomentJS** allowed me to reformat the date and times given by the API to show readable match date/times.

- [Sports Radar AFL API](https://developer.sportradar.com/)
    - I have used **Sports Radar AFL API** to gather most of the football related data show in the website.

- [Google Maps JS API](https://developers.google.com/maps/documentation/javascript/overview)
    - I have used **Google Maps JS API** to show the map location of the venues at which each match is played.

- [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
    - I have used **Google Maps Geocoding API** to turn the Lat & Lng figues into a real world address.

- [Cypress Testing](https://www.cypress.io/)
    - **Cypress Testing** was used to automate testing of my site.

## Testing

On Mobile views (fewer than 992px) a sidenav bar is used for navigation, with the expected burger icon. This opens up on click to allow the user to selcect a team. Within the sidenav is a collapsible section that closes the ladder on click and opens that teams' fixtures list for selection. The user once they've selected a team and/or a match can click off the navbar to see the latest match or chosen (respectively) stats, timeline and venue.
Above 992px width the sidenav disappears and the ladder and fixtures are brought within the page, the tabs for stats, timeline and venue are still present but fixed to right hand side of the screen as apposed to center.


I have used Cypress automated testing in order to test the functionality of my site, specifically the test check previous and future matches and whether certain html is populated from the API, I've also cheked whether fixtures and match timeline contain information. My testing JS file is located within cypress/intergration in a file named ["testing.spec.js"](https://github.com/louisgreenhall/MS2/blob/master/cypress/integration/testing.spec..js)

To replicate my testing results follow the intructions on how to download Cypress [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements), then drag my project file into the drop box upon loading the application, select "testing.spec.js" and the tests shall run.
NB if they fail on the first attempt due to timing out - as I experienced, the API should cache for 5 minutes using Cors-away so once I cached the locations the test went to, they passed.

I have personally tested each of my UX stories:
- Whilst testing I did not use Fiddler as this would create different results to those found when the site is deployed live.

- As a user I want to see my teams latest match and previous matches so that I can catch up on a games I've missed and see how my my team are progressing.
  - I opened the landing page
  - I clicked on Port Adelaide Power
  - Port Adelaide Power's most-recent match loads automatically and I have clicked through the match statistics, match timeline and map venue to make sure they are populated with the correct data (which I've compared with a different application - [what application was this?]). 
  - I then followed these above steps for two games that were in the past. 
  - I then followed these above steps for two other teams: St Kilda Saints and Fremantle Dockers. 

- As a user I want to see how my team compares to the rest of the league and know whether they will reach the finals at the end to win the premiership.
  - I opened the landing page 
  - On the left-hand-side is the league ladder, which updates at the end of every played match. 
  - I have tested this by watching the ladder during the end-stages of a live match and then by refreshing the page once the game has ended, 
  - The number of played games increases by 1 and the current standings for each team changes accordingly.

- As a user I want to know if my team is likely to win their next match so that I can place bets or have peace of mind: 
  - I opened the landing page 
  - I then clicked on Geelong Cats
  - Once their data loaded, I chose a match from 1 week in advance and made sure the probabilities were pulling through. 
  - I then repeated this for two other teams: North Melbourne Kangaroos and Essendon Bombers.

- I have tested that the Google Maps API shows the correct location, by:
  - Selecting multiple teams and multiple matches and making sure that the stadium is centered and marked with a pin. 
  - During testing I found that the Google maps images of Optus Stadium, when zoomed 1x greater than my preset makes the stadium disappear. 
  - This is because the images held for this zoom rate are older than the stadium however the centre location of the map is the same.

  I have placed my HTML, CSS and JS through online code validators all of which came with no errors except what is expected such as empty headings etc which are filled by functions in main.js.

- Throttling and usage limits (1000 requests per month) were an issue whilst testing. To get around this I used 'Fiddler Everywhere' auto response rules to return saved responses for a handful of teams and matches in order to make sure my usage limits were not exceeeded too regularly, and to ensure that data would load without being rejected due to throttling (403 Forbidden errors).
- During testing, an issue with the API was discovered when selecting either Port Adelaide Powers (PAP) or Richmond Tigers (RIC), Round 11. During Quarter 2, PAP vs RIC has no period scores; instead they are recorded against Quarter 1 (Match ID: sr:match:22821963).
- Another issue found with the API was that since the release of games scheduled for round 14-18, the API list of matches for this season has been inconsistent for each team. Certain teams have since been missing some game weeks; the match information is still available via the API, however the fixtures are not returned. 

## Deployment

To deploy on github pages I took the following steps.
- Loaded google chrome and logged into my Github account
- Selected my "MS2" repo and clicked the "settings" tab (located on the right hand side of the page)
- I've then scrolled down to the heading titled "Github Pages"
- within this heading, I've selected the "Master branch" and "Root/" and then clicked "Save"
- After a few moments Github had updated and my page was ready to be viewed online by scrolling back down to the heading "Github Pages" and selecting the link that was now just below the heading.


## Credits

- MDN [Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function): Learning async functionality 

- Adam Cross, [Github](https://github.com/adamscross04/cors-away):  To get around CORS issues with API.

### Media
- AFL team logos obtained from https://logos-download.com/tag/afl and Google images for (West Coast Eagles, Collingwood Magpies and Gold Coast Suns) in search results for AFL team logo 2020.

- AFL 2020 season logo obtained from Google images by search of the same name.

### Acknowledgements

- I would like to thank my mentor Felipe Souza Alarcon for the advice he has given me throughout the course of this project.

