# Aussie Rules

Aussie Rules is an interactive website that allows users keep up to date on the 2020 season of the Australian Football League (AFL). Filtering information by team selection users can check scores live and in the past and even see match probabilities for future games, which they can use to place bets or predict the result of teams they follow or are interested in.
 
## UX
 
This website is for followers of the aussie rules sport, that wish to be informed on the season and it's progress. They may follow an individual team and so they can see that teams matches, stats and probabilities, or they may just follow the sport in which they can see details of every team. Aussie Rules is the best way for users to stay informed as it provided details of live matches and so for users that aren't able to watch the sport for reasons such as not being a resident of Australia, they can follow the scores and season from a distance but not be late.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.
As a user I want to see my teams latest match and previous matches so that I can catch up on a games i've missed and see how my my team are progressing.

As a user I want to see how my team compares to the rest of the league and know whether they will reach the finals at the end to win the premiership.

As a user i want to know if my team is likely to win their next match so that I can place bets or have peace of mind

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

-Ladder: shows the teams current ladder position of all 18 teams, displaying played, won, drawn and lost matches, as well as the goal/point difference which settles order of teams on the same wins. This also minimises to serve as navigation

-fixtures: list of matches played and scheduled for each team

-Match timeline: allows selection of the 4 quarters of any match to be displayed and view each score change to see how the match result came to be

-Match stats: shows how both teams compared in their stats and allows individual analysis of whether the game was a close contest or an easy win and for which team. 
    Probabilities - shows which team is more likely to win a given future match - allows about 1-2 weeks in advance 

-Venue details: shows on google maps where each game was played and also provided the address, name and capacity of each stadium.
 

### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Link Match probabilities to betting sites that allow you place bets on related matches - also for the season winner.
- Timeline score changes to have hover action that specifies more whether the change is a goal or behind. 
    implement a score worm alongside the timeline that focuses on how different each team's score was at a given point.
Video Highlights of each match as found from youtube.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

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
    2. Try to submit the empty form and verify tha
    t an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

!!!!!!!!!!!!!!!! Throttling and usage limits (1000 requests per month) were an issue whilst testing, to get around this I used Fiddler auto response rules to return saved responses for a handful of teams and matches in order to make sure my usage limits were sufficient, and to ensure that data would load without being rejected due to throttling.
 During testing - An Issue with the API was discovered, Q2, PAP vs RIC has no period scores (Match ID: sr:match:22821963)

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function Learning async functionality 

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X