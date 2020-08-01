// let apiKeyV2 = "rqz7xyyqush2cn5m838nffdy";

$(() => {

    let standingsUrl = "https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/seasons/sr:season:72434/standings.json?api_key=rqz7xyyqush2cn5m838nffdy";
    fetch(standingsUrl)
        .then(response => {
            return response.json();
        })
        .then(json => {
            for (let team of json.standings[0].groups[0].team_standings) {

                $(".standings").append(`<tr>
                                     <td>${team.competitor_standing.rank}</td>
                                     <td>
                                         <a href="#" class="test" competitorId="${team.competitor_standing.competitor.id}">${team.competitor_standing.competitor.name}</a>
                                     </td>
                                     <td>${team.competitor_standing.win}</td>
                                     <td>${team.competitor_standing.loss}</td>
                                     <td>${team.competitor_standing.draw}</td>
                                 </tr>`);
            };
        });

    $("body").on("click", ".test", function (event) {

        let id = $(event.target).attr("competitorId");
        fetchSeasonDetails("sr:season:72434").then(function (json) {

            let matches = filterMatchesByTeam(json, id);

            $(".matches").html(""); //clearing in case team fixtures already loaded.

            for (let i = 0; i < matches.length; i++) {

                let match = matches[i];
                let matchId = match.sport_event.id;

                $(".matches").append(`<li style="padding-left:10px;"> <a href="#" class="create" matchId="${matchId}">${match.sport_event.sport_event_context.stage.round} - ${match.sport_event.competitors[0].abbreviation} vs ${match.sport_event.competitors[1].abbreviation}</a></li>`)
            }

        });

    })

    function filterMatchesByTeam(json, id) {
        let matches = [];
        for (let i = 0; i < json.summaries.length; i++) {

            let match = json.summaries[i];

            if (match.sport_event_status.status === "cancelled") {
                continue;
            }
            if (match.sport_event.competitors[0].id === id || match.sport_event.competitors[1].id === id) {
                matches.push(match);
            }
        }

        return matches;
    }

    // reusable function to get the season details from the api

    function fetchSeasonDetails(id) {

        return fetch(`https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/seasons/${id}/summaries.json?api_key=rqz7xyyqush2cn5m838nffdy`)
            .then(function (response) {
                return response.json();
            });

    }

});