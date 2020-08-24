// let apiKeyV2 = "rqz7xyyqush2cn5m838nffdy";
// let 2ndApiKeyV2 = "8rq4qb4y9wpvm8czed2j7fz9"
// let 3rdApiKeyV2 = "umfmpvapcrzjuhhw73mbysgh"
// le googleMapsApiKey = "AIzaSyDWYUEHSzOcPWpL6lJq9T_CilOpqRs7c2w"

$(() => {
    const abbreviations = {
        "Adelaide Crows": "ADE",
        "Brisbane Lions": "BRI",
        "Carlton Blues": "CBL",
        "Collingwood Magpies": "COL",
        "Essendon Bombers": "ESS",
        "Fremantle Dockers": "FRE",
        "Geelong Cats": "GEE",
        "Gold Coast Suns": "GCS",
        "GWS Giants": "GWS",
        "Hawthorn Hawks": "HAW",
        "Melbourne Demons": "MEL",
        "North Melbourne Kangaroos": "NMK",
        "Port Adelaide Power": "PAP",
        "Richmond Tigers": "RIC",
        "St Kilda Saints": "SKS",
        "Sydney Swans": "SYD",
        "West Coast Eagles": "WCE",
        "Western Bulldogs": "BUL"
    };
    let prevMarker = null;

    const teamInfo = {
        matches: [],
    }

    const timelines = {};
    const probabilities = {};
    let seasonMatches = null;
    const seasonId = "sr:season:72434";

    // collapse button functions
    $(".buttonExpanded").on("click", () => {
        expand();
    })

    function collapse() {
        $('.ladder table').addClass("collapse");
        $('.ladder').removeClass("s4").addClass("s2 ladder-toggle");
        $('.match-info').removeClass("s6").addClass("s8");
        $(".buttonExpanded").toggleClass("hidden");
    }

    function expand() {
        $('.ladder table').removeClass("collapse");
        $('.ladder').addClass("s4").removeClass("s2 ladder-toggle");
        $('.match-info').addClass("s6").removeClass("s8");
        $(".buttonExpanded").toggleClass("hidden");
    }





    let standingsUrl = `https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/seasons/${seasonId}/standings.json?api_key=umfmpvapcrzjuhhw73mbysgh`;
    fetch(standingsUrl)
        .then(handleErrors)
        .then(response => {
            return response.json();
        })
        .then(json => {
            for (let team of json.standings[0].groups[0].team_standings) {


                // add table row to standings table with competitorId attribute that can be used later once link clicked
                $(".standings").append(`<tr abbreviation="${abbreviations[team.competitor_standing.competitor.name]}">
                                     <td>${team.competitor_standing.rank}</td>
                                     <td>
                                        <a href="#match-info" class="team" competitorId="${team.competitor_standing.competitor.id}"> 
                                            <img src="assets/imgs/${abbreviations[team.competitor_standing.competitor.name]}.png">
                                        </a>
                                    </td>
                                    <td>
                                        <a href="#match-info" class="team" competitorId="${team.competitor_standing.competitor.id}"> 
                                            ${abbreviations[team.competitor_standing.competitor.name]}
                                        </a>
                                    </td>
                                     <td>
                                         <a href="#" class="team" competitorId="${team.competitor_standing.competitor.id}">${team.competitor_standing.competitor.name}</a>
                                     </td>
                                     <td>${team.competitor_standing.played}</td>
                                     <td>${team.competitor_standing.win}</td>
                                     <td>${team.competitor_standing.loss}</td>
                                     <td>${team.competitor_standing.draw}</td>
                                     <td>${team.competitor_standing.points_percentage}</td>
                                     </tr>`);
            };
        }).catch(function () {
            M.toast({
                html: 'Failed to load season standings from API, please reload the page to try again',
                classes: 'error'
            });
        });

    $("body").on("click", ".team", async function (event) {
        $(".welcome").hide()
        $('.tabs').tabs();


        if (!$('.ladder table').hasClass("collapse")) {
            collapse();
        } // If ladder is not collapsed, clicking team name will auto collapse 

        let target = event.target;
        console.log(target)
        if ($(event.target).first().tagName != "A") {
            target = $(event.target).closest("a");
        }

        let row = $(event.target).closest("tr");
        const abbr = $(row).attr("abbreviation");
        $("#gradient").removeClass().addClass(abbr);
        $("#gradientBottom").removeClass().addClass(abbr);
        const teamName = getTeamNameFromAbbreviation(abbr);

        $("#gradient h6").html(teamName)
        $(".timelineError").hide();

        let id = $(target).attr("competitorId"); // store attribute of clicked competitorId.
        // fetchSeasonDetails("sr:season:72434").then(async function (json) 
        let season = await getSeasonDetails(seasonId)

        let matches = filterMatchesByTeam(season, id);


        teamInfo.matches = matches;

        $(".matches").html(""); //clearing in case team fixtures already loaded.

        for (let i = 0; i < matches.length; i++) {

            let match = matches[i];
            let matchId = match.sport_event.id;

            // add list element to matches list with matchId attribute that can be used later once link clicked.
            $(".matches").append(`<li style="padding-left:10px;"> <a href="#match-info" class="match" matchId="${matchId}">${match.sport_event.sport_event_context.stage.round} - ${match.sport_event.competitors[0].abbreviation} vs ${match.sport_event.competitors[1].abbreviation}</a></li>`)
        }

        $(".match-info").show();
        $(".fixtures").show();


        let latestMatch = getLatestMatchWithStatistics(matches);

        updateVenue(latestMatch)



        let timeline = await getMatchTimeline(latestMatch.sport_event.id)

        populateMatchTimeline(timeline);
        populateMatchStats(timeline);


    })

    function getStatisticsHtml(stats) {

        return `<table>
        <tr>
            <td>Behinds</td>
            <td>${stats.behinds}</td>
        </tr>
        <tr>
            <td>Disposals</td>
            <td>${stats.disposals}</td>
        </tr>
        <tr>
            <td>Free Kicks</td>
            <td>${stats.free_kicks}</td>
        </tr>
        <tr>
            <td>Goals</td>
            <td>${stats.goals}</td>
        </tr>
        <tr>
            <td>Handballs</td>
            <td>${stats.handballs}</td>
        </tr>
        <tr>
            <td>Hitouts</td>
            <td>${stats.hitouts}</td>
        </tr>
        <tr>
            <td>Kicks</td>
            <td>${stats.kicks}</td>
        </tr>
        <tr>
            <td>Marks</td>
            <td>${stats.marks}</td>
        </tr>
        <tr>
            <td>Marks In 50s</td>
            <td>${stats.marks_inside_50s}</td>
        </tr>
        <tr>
            <td>Tackles</td>
            <td>${stats.tackles}</td>
        </tr>
</table>`;
    }

    function isMatchCompleted(match) {

        let currentMatchKeys = Object.keys(match);
        return currentMatchKeys.includes("statistics") || match.sport_event_status.status === "live";
    }


    function getLatestMatchWithStatistics(matches) {

        let completeMatches = [];

        for (let i = 0; i < matches.length; i++) {
            let currentMatch = matches[i];

            if (isMatchCompleted(currentMatch)) {
                completeMatches.push(currentMatch)
            };
        }
        return completeMatches.pop();
    };


    $("body").on("click", ".match", async function (event) {

        let id = $(event.target).attr("matchId"); // store matchId attribute of clicked element 


        const match = teamInfo.matches.find(function (m) {
            return m.sport_event.id == id;
        });

        updateVenue(match)

        if (isMatchCompleted(match)) {
            let matchTimeline = await getMatchTimeline(id);

            $(".timelineContainer button").show();
            $(".timeline").children().show();
            $(".timelineError").hide();

            populateMatchStats(matchTimeline);
            populateMatchTimeline(matchTimeline);

        } else {
            $(".timelineContainer button").hide();
            $(".timeline").children().hide();
            $(".timelineError").show();

            let probs = await getMatchProbabilities(id)


            $(".homeStats").html("");
            $(".awayStats").html("");
            $(".homeDisplayScore").html("");
            $(".awayDisplayScore").html("");



            $(".matchResultTitle").text(`Round ${match.sport_event.sport_event_context.stage.round} of ${match.sport_event.sport_event_context.season.name}`)
            $(".matchResultTitle").append(`<p>${moment(match.sport_event.scheduled).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>`);
            if (probs.probabilities.markets.length > 0) {
                $(".homeStats").append(`Win Probability: ${probs.probabilities.markets[0].outcomes[0].probability}%`);
                $(".awayStats").append(`Win Probability: ${probs.probabilities.markets[0].outcomes[1].probability}%`);
            } //Stops error of future matches not having win/loss probabilities yet
            $(".homeTeam .team-image").attr("src", `assets/imgs/${abbreviations[match.sport_event.competitors[0].name]}.png`);
            $(".homeTeam .team-abbr").text(abbreviations[match.sport_event.competitors[0].name]);

            $(".awayTeam .team-image").attr("src", `assets/imgs/${abbreviations[match.sport_event.competitors[1].name]}.png`);
            $(".awayTeam .team-abbr").text(abbreviations[match.sport_event.competitors[1].name]);

            $(".vsStats").hide()
        }
    });



    $(".period-selector").on("click", function (event) {
        let id = $(event.target).attr("period");
        console.log(id);
        $(".period").hide();
        $(`.${id}`).show();
    })


    function getTeamNameFromAbbreviation(abbr) {
        for (var key of Object.keys(abbreviations)) {
            if (abbreviations[key] == abbr) {
                return key;
            }
        }
    }

    function updateVenue(match) {
        let latLng = match.sport_event.venue.map_coordinates;

        $(".venueName").html(`Name: ${match.sport_event.venue.name}`)
        $(".venueCapacity").html(`Capacity: ${match.sport_event.venue.capacity}`)

        fetchGeocodeData(latLng).then(function (json) {

            $(".venueAddress").html(`Address: ${json.results[0].formatted_address}`);
        })

        const latLngSplit = latLng.split(',');
        let lat = Number.parseFloat(latLngSplit[0]);
        let lng = Number.parseFloat(latLngSplit[1]);
        console.log(latLng)
        let realLatLng = {
            lat: lat,
            lng: lng
        };
        map.setCenter(realLatLng)

        if (prevMarker != null) {
            prevMarker.setMap(null);
        }

        prevMarker = new google.maps.Marker({
            position: realLatLng,
            title: match.sport_event.venue.name
        });

        // To add the marker to the map, call setMap();
        prevMarker.setMap(map);


    }

    function getTeamByQualifier(competitors, qualifier) {
        return competitors.find(function (c) {
            return c.qualifier == qualifier
        });
    }

    function populateMatchStats(latestMatch) {

        $(`[matchId='${latestMatch.sport_event.id}']`).addClass("fixture-active");
        // want to show the match when I find the latest match.

        $(".vsStats").show()

        $(".homeDisplayScore").html("");
        $(".awayDisplayScore").html("");

        const homeTeam = getTeamByQualifier(latestMatch.statistics.competitors, "home");
        const awayTeam = getTeamByQualifier(latestMatch.statistics.competitors, "away");

        $(".matchResultTitle").text(`Round ${latestMatch.sport_event.sport_event_context.stage.round} of ${latestMatch.sport_event.sport_event_context.season.name}`)
        $(".matchResultTitle").append(`<p>${moment(latestMatch.sport_event.scheduled).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>`);
        $(".homeTeam .team-image").attr("src", `assets/imgs/${abbreviations[homeTeam.name]}.png`);
        $(".homeTeam .team-abbr").text(abbreviations[homeTeam.name]);

        $(".awayTeam .team-image").attr("src", `assets/imgs/${abbreviations[awayTeam.name]}.png`);
        $(".awayTeam .team-abbr").text(abbreviations[awayTeam.name]);

        $(".homeDisplayScore").append(`${latestMatch.sport_event_status.home_display_score}`)
        $(".awayDisplayScore").append(`${latestMatch.sport_event_status.away_display_score}`)
        console.log(`${latestMatch.sport_event.id}`)


        const homeStats = homeTeam.statistics;
        const awayStats = awayTeam.statistics;

        $(".homeStats").html(getStatisticsHtml(homeStats));
        $(".awayStats").html(getStatisticsHtml(awayStats));

        calculateStatWinner("behinds", "Behinds", homeStats, awayStats);
        calculateStatWinner("disposals", "Disposals", homeStats, awayStats);
        calculateStatWinner("free_kicks", "FreeKicks", homeStats, awayStats);
        calculateStatWinner("goals", "Goals", homeStats, awayStats);
        calculateStatWinner("handballs", "Handballs", homeStats, awayStats);
        calculateStatWinner("hitouts", "Hitouts", homeStats, awayStats);
        calculateStatWinner("kicks", "Kicks", homeStats, awayStats);
        calculateStatWinner("marks", "Marks", homeStats, awayStats);
        calculateStatWinner("marks_inside_50s", "MarksInside", homeStats, awayStats);
        calculateStatWinner("tackles", "Tackles", homeStats, awayStats);

    }

    function calculateStatWinner(statName, className, homeStats, awayStats) {

        if (homeStats[statName] < awayStats[statName]) {

            $(`.home${className}`).removeClass("green").removeClass("amber").addClass("red").text("");
            $(`.away${className}`).removeClass("red").removeClass("amber").addClass("green").text(`+${awayStats[statName] - homeStats[statName]}`); // winner

        } else if (homeStats[statName] > awayStats[statName]) {

            $(`.home${className}`).removeClass("red").removeClass("amber").addClass("green").text(`+${homeStats[statName] - awayStats[statName]}`); // winner
            $(`.away${className}`).removeClass("green").removeClass("amber").addClass("red").text("");

        } else {

            $(`.home${className}`).removeClass("red").removeClass("green").addClass("amber").text("");
            $(`.away${className}`).removeClass("green").removeClass("red").addClass("amber").text("");

        }

    }


    function populateMatchTimeline(json) {

        let i = 0;
        let currentPeriod = 1;

        $(".period").hide();
        $(".period1").show();
        $(".timeline .period-events").html(`<hr class="timeline-splitter" />`); // clearing contents in case already selected match fixture
        while (i < json.timeline.length) {
            let timelineEvent = json.timeline[i];

            let teamType = "neither";

            if (typeof timelineEvent.team !== "undefined") {
                teamType = timelineEvent.team;
            }

            // using a switch instead of if/else statements because there is a defined number of options available for timeline event types 
            switch (timelineEvent.type) {
                case "match_started":
                    break;
                case "period_start":
                    break;
                case "score_change":
                    $(`.timeline .period${currentPeriod} .period-events`).append(`<div class="timeline-event ${timelineEvent.team}">
                                                                <div class="event-badge">${timelineEvent.match_time}</div>
                                                                <div class="event-content">

                                                                    ${timelineEvent.home_score} - ${timelineEvent.away_score}
                                                                </div>
                                                            </div>`);
                    break;
                case "period_score":
                    currentPeriod++;
                    break;
                case "break_start":
                    break;
                case "match_ended":
                    break;
            }
            i++;
        }

    }

    function filterMatchesByTeam(season, id) {

        let matches = [];
        for (let i = 0; i < season.summaries.length; i++) {

            let match = season.summaries[i];

            if (match.sport_event_status.status === "cancelled") {
                continue;
            }
            if (match.sport_event.competitors[0].id === id || match.sport_event.competitors[1].id === id) {
                matches.push(match);
            }
        }
        return matches;
    }


    async function getSeasonDetails(seasonId) {

        let matches = null;
        if (seasonMatches != null) {
            matches = seasonMatches;
        } else {
            matches = await fetchSeasonDetails(seasonId);

            seasonMatches = matches;
        }

        return matches
    }

    // reusable function to get the season details from the api
    function fetchSeasonDetails(seasonId) {

        return fetch(`https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/seasons/${seasonId}/summaries.json?api_key=umfmpvapcrzjuhhw73mbysgh`)
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .catch(function () {
                M.toast({
                    html: 'Failed to load season summaries from API, please reload the page to try again',
                    classes: 'error'
                });

            });
    }

    async function getMatchTimeline(matchId) {

        let timeline = null;
        if (typeof timelines[matchId] !== "undefined") {
            timeline = timelines[matchId];
        } else {
            timeline = await fetchMatchTimeline(matchId);
            timelines[matchId] = timeline;
        }

        return timeline;
    }

    function fetchMatchTimeline(matchId) {

        let timelineUrl = `https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/match/${matchId}/timeline.json?api_key=umfmpvapcrzjuhhw73mbysgh`
        return fetch(timelineUrl)
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            }).catch(function (err) {
                M.toast({
                    html: 'Failed to load match timeline from API, please reload the page to try again',
                    classes: 'error'
                });
            });
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }



    async function getMatchProbabilities(matchId) {

        let probability = null;
        if (typeof probabilities[matchId] !== "undefined") {
            probability = probabilities[matchId];
        } else {
            probability = await fetchMatchProbabilities(matchId);
            probabilities[matchId] = probability;
        }

        return probability;
    }

    function fetchMatchProbabilities(matchId) {
        let probUrl = `https://corsaway.herokuapp.com/proxy?url=https://api.sportradar.com/australianrules/trial/v2/en/matches/${matchId}/probabilities.json?api_key=umfmpvapcrzjuhhw73mbysgh`
        return fetch(probUrl)
            .then(handleErrors)

            .then(function (response) {
                return response.json();
            }).catch(function () {
                M.toast({
                    html: 'Failed to load match probabilities from API, please reload the page to try again',
                    classes: 'error'
                });
            });
    }

    function fetchGeocodeData(latLng) {
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyDWYUEHSzOcPWpL6lJq9T_CilOpqRs7c2w&latlng=${latLng}`
        return fetch(geocodeUrl)
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            }).catch(function () {
                M.toast({
                    html: 'Failed to load address information from API, please reload the page to try again',
                    classes: 'error'
                });
            });
    }

    // side nav & tooltip function from materialize
    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.sidenav');
    //     var instances = M.Sidenav.init(elems, options);
    //   })

    $('.tooltipped').tooltip();

});



//MAP
//
// match.sport_event.venue.capacity
// match.sport_event.venue.city_name
// match.sport_event.venue.map_coordinates
// match.sport_event.venue.name