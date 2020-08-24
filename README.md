# Aussie Rules

Aussie Rules is an interactive website that allows users keep up to date on the 2020 season of the Australian Football League (AFL). Filtering information by team selection users can check scores live and in the past and even see match probabilities for future games, which they can use to place bets or predict the result of teams they follow or are interested in.
 
## UX
 
This website is for followers of the aussie rules sport, that wish to be informed on the season and it's progress. They may follow an individual team and so they can see that teams matches, stats and probabilities, or they may just follow the sport in which they can see details of every team. Aussie Rules is the best way for users to stay informed as it provided details of live matches and so for users that aren't able to watch the sport for reasons such as not being a resident of Australia, they can follow the scores and season from a distance but not be late.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.
As a user I want to see my teams' latest match and previous matches so that I can catch up on a games i've missed and see how my my team are progressing.

As a user I want to see how my team compares to the rest of the league and know whether they will reach the finals at the end to win the premiership.

As a user i want to know if my team is likely to win their next match so that I can place bets or have peace of mind

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

-Ladder: shows the teams current ladder position of all 18 teams, pulling from the "standings" [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-standings) From the page being loaded, the ladder is displaying played, won, drawn and lost matches, as well as the goal/point difference which settles order of teams on the same wins. This also minimises to serve as navigation.

-fixtures from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-summaries): list of matches played and scheduled for each team, pulling from the season summaries.

-Match timeline from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#match-timeline): allows selection of the 4 quarters of any match to be displayed and view each score change to see how the match result came to be.

-Match stats from [endpoint](https://developer.sportradar.com/docs/read/australian_rules_football/Australian_Rules_Football_v2#season-summaries) specifcally the statstics object: shows how both teams compared in their stats and allows individual analysis of whether the game was a close contest or an easy win and for which team. 
    Probabilities - shows which team is more likely to win a given future match - allows about 1-2 weeks in advance.

-Venue details: shows on google maps where each game was played and also provided the address, name and capacity of each stadium.

### Existing Features

- Ladder: allows users to see where their team is located in the league table and by clicking on a team a user will be taken to that team's latest match, which includes it's fixtures, match stats, match timline and venue information. Once clicked by the user the table collapses to serve as minimised nav-bar and a "Ladder" button appears to allow the user to see the full table again.

- Fixtures: Allows users to select which match they're looking at for the selected team, the current selected team is highlighted to provide visual feedback of their current location.

- Match Stats: allows user so see in more depth the scores of each team as well as the overall stats of how they performed such as tackles, kicks and free kicks. These stats are compared with a Red-Amber-Green system to show in which areas the teams were better, the same or worse.

- Venue Stats: Allows user to see where a past, live of future match is held, this can be for travel purposes if they chose to see the game live or to understand the teams travel requirements from week to week as this can impact a team's readiness and is of interest to more involved fans. 

### Features Left to Implement
- Link Match probabilities to betting sites that allow you place bets on related matches - also for the season winner.
- Timeline score changes to have hover action that specifies more whether the change is a goal or behind. 
    implement a score worm alongside the timeline that focuses on how different each team's score was at a given point.
- Video Highlights of each match as found from youtube.
- Next and Prev buttons on gameweeks to allow another way to navigate through a team's list of games.

## Technologies Used

- [Materialize Framework](https://materializecss.com/)
    - Used to provide responsiveness and structure to my website.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Json Formatter](https://jsonformatter.org/)
To help me understand the structure of the data returned from the APIs, I used JSON formatter's tree view, since this gave an easy to understand visualisation of the data in a nested structure.

- [Fiddler](https://www.telerik.com/download/fiddler-everywhere)
Fiddler allowed my to save responses from my API without adding too heavily to my calls-per-month allowance from the AFL API (1000)

- [MomentJS](https://momentjs.com/)
MomentJS allowed me to reformat the date and times given by the API to show readable match date/times.

## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

I have personally tested each of my UX stories:
    Whilst testing I did not use Fiddler as this would create different results to those found when the site is deployed live.

As a user I want to see my teams latest match and previous matches so that I can catch up on a games I've missed and see how my my team are progressing.
        Opened landing page, clicked on Port Adelaide Power, Most recent match loads automatically and have clicked through the Match stats, match timeline and map tabs to make sure they populated with the correct data (which i've compared with a different application). I've then applied this method for two games that were in the past. I've then repeated this for St Kilda Saints and Fremantle Dockers. 

As a user I want to see how my team compares to the rest of the league and know whether they will reach the finals at the end to win the premiership.
        Opened landing page. Left hand side is the league ladder uodated at the end of every played match. I've tested this by watching the ladder during the end stages of a live match and refreshing the page once the game has ended, the played games number increases by 1 and the order of each team is changed accordingly.

As a user I want to know if my team is likely to win their next match so that I can place bets or have peace of mind.
        Opened Landing page, clicked on Geelong Cats and chose match from 1 week in advance and made sure the probabilities were pulling through. I then repeated this for North Melbourne Kangaroos and Essendon Bombers.

I have also tested the Google Maps API showing the correct location, selecting multiple teams and multiple matches and making sure that the stadium is centered and marked with a pin. during testing i've found that the google maps images of Optus Stadium, when zoomed 1x greater than my preset, makes the stadium disappear. This is because the images held for this zoom rate are older than the stadium however the location of the map's center is the same.

N.B. Throttling and usage limits (1000 requests per month) were an issue whilst testing, to get around this I used Fiddler auto response rules to return saved responses for a handful of teams and matches in order to make sure my usage limits were sufficient, and to ensure that data would load without being rejected due to throttling.
 During testing - An Issue with the API was discovered, Q2, PAP vs RIC has no period scores (Match ID: sr:match:22821963), another issue found with the API is that since the release of games scheduled for round 14-18, the API list of matches for this season has been inconsistent amongst each team. Certain teams are missing random game weeks 

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

To deploy on github pages I have taken the following steps.
- Loaded google chrome and logged into my Github account
- Selected my "MS2" repo and clicked the "settings" tab (located on the right hand side of the page)
- I've then scrolled down to the heading titled "Github Pages"
- within this heading, I've selected the "Master branch" and "Root/" and then clicked "Save"
- After a few moments Github had updated and my page was ready to be viewed online by scrolling back down to the heading "Github Pages" and selecting the link that was now just below the heading.

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function Learning async functionality 

Adam Cross Github: https://github.com/adamscross04/cors-away To get around Cors issues with API.

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- ALF team logos obtained from https://logos-download.com/tag/afl and google images for (West Coast Eagles, Collingwood Magpies and Gold Coast Suns) in search results for AFL team logo 2020.

AFL 2020 season logo obtained from google images by search of the same name.

### Acknowledgements

N/a