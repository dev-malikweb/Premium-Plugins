// دالة بطاقة المباراة
document.addEventListener("DOMContentLoaded", function () {
getMatchData();
});
async function getMatchData() {
const matchElement = document.querySelector('.C-MatchResult');
if (!matchElement) {
console.error("عنصر .C-MatchResult غير موجود");
return;
}

// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}

if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
const matchLink = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const tableResponse = await fetch(matchLink);
const data = await tableResponse.json();
console.log("بطاقة المباراة:", data.game);
const match = data.game;
if (!match) {
console.error("تفاصيل المباراة غير متاحة");
return;
}
const homeScore = (match.homeCompetitor.score === -1) ? "-" : (match.homeCompetitor.score || "0");
const awayScore = (match.awayCompetitor.score === -1) ? "-" : (match.awayCompetitor.score || "0");
const matchDiv = document.querySelector('.C-MatchResult .MatchCard .match');
if (matchDiv) {
const competitionName = match.competitionDisplayName.replace(/.*?,\s*/, '');
matchDiv.innerHTML = `
<div class="match-competition">
<span class="CompetitionName">${competitionName}</span>
</div>
<div class="match-container">
<div class="Right-Team">
<div class="Team-Logo">
<img alt="${match.homeCompetitor.name}" height="85" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.homeCompetitor.id}.png" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" 
title="${match.homeCompetitor.name}" 
width="85" loading="lazy"/>
</div>
<div class="Team-Name">${match.homeCompetitor.name}</div>
</div>
<div class="match-timing">
<div id="result">
<div class="Team-Score"><span>${homeScore}</span></div>
:
<div class="Team-Score"><span>${awayScore}</span></div>
</div>
<div id="match-time">-- : --</div>
<span class="date" data-start="${match.startTime}">جاري التحميل ..</span>
</div>
<div class="Left-Team">
<div class="Team-Logo">
<img alt="${match.awayCompetitor.name}" height="85" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.awayCompetitor.id}.png" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" 
title="${match.awayCompetitor.name}" width="85" />
</div>
<div class="Team-Name">${match.awayCompetitor.name}</div>
</div>
</div>
</div>
`;
const h1Elements = document.getElementsByTagName('h1');
for (let h1 of h1Elements) {
if (h1.textContent.trim() !== '') { 
h1.textContent = `تفاصيل مباراة ${match.homeCompetitor.name} و ${match.awayCompetitor.name} اليوم في ${competitionName}`;
break;
}
}
}
document.getElementById('DetailsBtn').addEventListener('click', function () {
showElement('Details', this);
});
document.getElementById('AnalyticsBtn').addEventListener('click', function () {
showElement('Analytics', this);
});
document.getElementById('ScorersBtn').addEventListener('click', function () {
showElement('Squads', this);
});
document.getElementById('StandingsBtn').addEventListener('click', function () {
showElement('Standings', this);
});
document.getElementById('GrStandingsBtn').addEventListener('click', function () {
showElement('GrStandings', this);
});
document.getElementById('TopScorersBtn').addEventListener('click', function () {
showElement('TopScorers', this);
});
function showElement(elementId, activeButton) {
var elements = document.querySelectorAll('.C-MatchResult .Details, .C-MatchResult .Analytics, .C-MatchResult .Squads, .C-MatchResult .Standings, .C-MatchResult .GrStandings, .C-MatchResult .TopScorers');
elements.forEach(function (el) {
el.style.display = 'none';
});
var selectedElement = document.querySelector('.C-MatchResult .' + elementId);
if (selectedElement) {
selectedElement.style.display = 'block';
}
var buttons = document.querySelectorAll('.Buttons a');
buttons.forEach(function (btn) {
btn.classList.remove('active');
});
activeButton.classList.add('active');
}
} catch (error) {
console.error("حدث خطأ أثناء استرجاع البيانات:", error);
const matchDiv = document.querySelector('.C-MatchResult .MatchCard');
if (matchDiv) {
matchDiv.innerHTML = '';
matchDiv.innerHTML = `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`;
}
}
}


// دالة مجريات المباراة
document.addEventListener("DOMContentLoaded", function () {
getMatchDetails1();
setInterval(getMatchDetails1, 60000);
});
let lastData = null;
async function getMatchDetails1() {
const matchElement = document.querySelector('.C-MatchResult');
if (!matchElement) {
console.error("عنصر .C-MatchResult غير موجود");
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
const actionsLink = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const actionResponse = await fetch(actionsLink);
const actionData = await actionResponse.json();
const currentData = actionData.game;
if (JSON.stringify(currentData) === JSON.stringify(lastData)) {
console.log("لا توجد بيانات جديدة.");
return;
}
console.log("أحداث المباراة:", currentData);
lastData = currentData;
const homeTeamId = currentData.homeCompetitor.id;
const awayTeamId = currentData.awayCompetitor.id;
const members = currentData.members;
const events = currentData.events;
const homeTeamEvents = events.filter(event => event.competitorId === homeTeamId);
const awayTeamEvents = events.filter(event => event.competitorId === awayTeamId);
console.log("أحداث الفريق المضيف:", homeTeamEvents);
console.log("أحداث الفريق الضيف:", awayTeamEvents);
const matchDiv = document.querySelector('.C-MatchResult .Details .DetailsAfter');
if (matchDiv) {
let eventsHTML = '<div class="SecTitle">أهم أحداث المباراة</div><div class="EventsTable">';
let isOdd = true;
events.forEach(event => {
const eventClass = isOdd ? 'odd' : 'even';
isOdd = !isOdd;
let eventHTML = `<div class="Event ${eventClass}" style="order:${event.order}">`;
const player = members.find(member => member.id === event.playerId);
const playerImageId = player ? player.athleteId : null;
const playerName = player ? player.name : "لاعب غير معروف";
let eventType = event.eventType.name;
if (eventType === "Woodwork") {
eventType = "عارضة";
}
if (event.competitorId === homeTeamId) {
if (event.eventType.name === "Substitution") {
const substitutePlayer = members.find(member => member.id === event.extraPlayers[0]);
const substituteImageId = substitutePlayer ? substitutePlayer.athleteId : null;
const substituteName = substitutePlayer ? substitutePlayer.name : "لاعب غير معروف";
eventHTML += `
<div class="HomeTeamEven">
<div class="EvenPlayersCo">  
<div class="EvenPlayers">
<div class="EvenPlayersLogo">
<span class="EvenPlayerImg InSide">
<img alt="${playerName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${playerImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${playerName}" loading="lazy"/>
</span>
<span class="EvenPlayerImg OutSide">
<img alt="${substituteName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${substituteImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${substituteName}" loading="lazy"/>
</span>
</div>  
<div class="EvenPlayersName">
<span class="EvenPlayerName InSide">${playerName}</span>
<span class="EvenPlayerName OutSide">${substituteName}</span>
</div>
</div>
<div class="EventType">
<img alt="أستبدال" src="https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/${event.eventType.id}.svg" width="25" height="25"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/none-icon.svg';" title="أستبدال" loading="lazy"/>
</div>
</div>  
</div>
<div class="EventTime"><span>${event.gameTimeDisplay}</span></div>
<div class="AwayTeamEven"></div>
`;
} else {
eventHTML += `
<div class="HomeTeamEven">
<div class="EvenPlayersCo"> 
<div class="EvenPlayer">
<span class="EvenPlayerImg">
<img alt="${playerName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${playerImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${playerName}" loading="lazy"/>
</span>
<span class="EvenPlayerName">${playerName}</span>
</div>
<div class="EventType">
<img alt="${eventType}" src="https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/${event.eventType.id}.svg" width="25" height="25"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/none-icon.svg';" title="${eventType}" loading="lazy"/>
</div>
</div>
</div>
<div class="EventTime"><span>${event.gameTimeDisplay}</span></div>
<div class="AwayTeamEven"></div>
`;
}
} else if (event.competitorId === awayTeamId) {
if (event.eventType.name === "Substitution") {
const substitutePlayer = members.find(member => member.id === event.extraPlayers[0]);
const substituteImageId = substitutePlayer ? substitutePlayer.athleteId : null;
const substituteName = substitutePlayer ? substitutePlayer.name : "لاعب غير معروف";
eventHTML += `
<div class="HomeTeamEven"></div>
<div class="EventTime"><span>${event.gameTimeDisplay}</span></div>
<div class="AwayTeamEven">
<div class="EvenPlayersCo">  
<div class="EvenPlayers">
<div class="EvenPlayersLogo">
<span class="EvenPlayerImg OutSide">
<img alt="${substituteName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${substituteImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${substituteName}" loading="lazy"/>
</span>
<span class="EvenPlayerImg InSide">
<img alt="${playerName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${playerImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${playerName}" loading="lazy"/>
</span>
</div>  
<div class="EvenPlayersName">
<span class="EvenPlayerName InSide">${playerName}</span>
<span class="EvenPlayerName OutSide">${substituteName}</span>
</div>
</div>
<div class="EventType">
<img alt="أستبدال" src="https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/${event.eventType.id}.svg" width="25" height="25"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/none-icon.svg';" title="أستبدال" loading="lazy"/>
</div>
</div>
</div>
`;
} else {
eventHTML += `
<div class="HomeTeamEven"></div>
<div class="EventTime"><span>${event.gameTimeDisplay}</span></div>
<div class="AwayTeamEven">
<div class="EvenPlayersCo">  
<div class="EvenPlayer">
<span class="EvenPlayerImg">
<img alt="${playerName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${playerImageId}.png" width="30" height="30"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${playerName}" loading="lazy"/>
</span>
<span class="EvenPlayerName">${playerName}</span>
</div>
<div class="EventType">
<img alt="${eventType}" src="https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/${event.eventType.id}.svg" width="25" height="25"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/match-actions-icons/none-icon.svg';" title="${eventType}" loading="lazy"/>
</div>
</div>
</div>
`;
}
}
eventHTML += `</div>`;
eventsHTML += eventHTML;
});
eventsHTML += '</div>';
matchDiv.innerHTML = `
<div class="Events">
${eventsHTML}
</div>
`;
}
} catch (error) {
console.error("حدث خطأ أثناء استرجاع البيانات:", error);
const matchDiv = document.querySelector('.C-MatchResult .Details .DetailsAfter');
if (matchDiv) {
matchDiv.innerHTML = '';
}
}
}


// دالة تفاصيل المباراة
document.addEventListener("DOMContentLoaded", function () {
getMatchDetails2();
});
async function getMatchDetails2() {
const matchElement = document.querySelector('.C-MatchResult');
if (!matchElement) {
console.error("عنصر .C-MatchResult غير موجود");
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
const cachedVote = localStorage.getItem(`match_vote_${matchId}`);
const matchLink = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
const h2hLink = `https://webws.365scores.com/web/games/h2h/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
const statsLink = `https://webws.365scores.com/web/game/stats/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&games=${matchId}`;
try {
const matchResponse = await fetch(matchLink);
const matchData = await matchResponse.json();
console.log("تفاصيل المباراة:", matchData.game);
const match = matchData.game;
const h2hResponse = await fetch(h2hLink);
const h2hData = await h2hResponse.json();
console.log("المواجهات السابقة:", h2hData.game);
const h2h = h2hData.game;
const statsResponse = await fetch(statsLink);
const statsData = await statsResponse.json();
console.log("أحصائيات المباراة:", statsData);
const stats = statsData;
if (!match) {
console.error("تفاصيل المباراة غير موجودة");
return;
}
const matchDiv = document.querySelector('.C-MatchResult .Details .DetailsBefor');
if (matchDiv) {
const totalVotes = match.promotedPredictions.predictions[0].options[0].vote.count +
match.promotedPredictions.predictions[0].options[1].vote.count +
match.promotedPredictions.predictions[0].options[2].vote.count;
matchDiv.innerHTML = `
<div class="VotesBulk">
<div class="Outlook">
<div class="VTitle">توقع نتيجة المباراة !</div>
<div class="VoteButtons">
<button id="RightTeamBtn">فوز <span class="VoteTeamLogo">
<img alt="${match.homeCompetitor.name}" height="25" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.homeCompetitor.id}.png" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" 
title="${match.homeCompetitor.name}" width="25" loading="lazy"/>
</span>
</button>
<button id="DrawBtn">تعادل</button>
<button id="LiftTeamBtn">فوز <span class="VoteTeamLogo">
<img alt="${match.awayCompetitor.name}" height="25" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.awayCompetitor.id}.png" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" 
title="${match.awayCompetitor.name}" width="25" loading="lazy"/>
</span>
</button>
</div>
</div>
<div class="Findings" style="display: none">
<span class="TotalVotes">إجمالي عدد المصوتين : ${totalVotes} صوت</span>
<span class="FindingsLine">
<span class="RightTeamLine" style="display:inline-block;width:${match.promotedPredictions.predictions[0].options[0].vote.percentage}%;background-color:#4267b2"></span>
<span class="DrawLine" style="display:inline-block;width:${match.promotedPredictions.predictions[0].options[1].vote.percentage}%;background-color:#008d29"></span>
<span class="LiftTeamLine" style="display:inline-block;width:${match.promotedPredictions.predictions[0].options[2].vote.percentage}%;background-color:#b51818"></span>
</span>
<span class="Percentage">
<span class="RightTeamPer">
<span>${match.promotedPredictions.predictions[0].options[0].vote.percentage}%</span>
<span>${match.homeCompetitor.name}</span>
</span>
<span class="DrawPer">
<span>${match.promotedPredictions.predictions[0].options[1].vote.percentage}%</span>
<span>التعادل</span>
</span>
<span class="LiftTeamPer">
<span>${match.promotedPredictions.predictions[0].options[2].vote.percentage}%</span>
<span>${match.awayCompetitor.name}</span>
</span>
</span>
</div>
</div>

<div class="SecTitle">معلومات حول المباراة</div>
<div class="MeetDetails">
<table class="MeetDetailsTable">
<thead><tr><th>الملعب</th><th>القناة الناقلة</th><th>حكم المباراة</th></tr></thead>
<tbody><tr><th>${match.venue?.name || "لم يحدد بعد"}</th><th>${match.tvNetworks?.[0]?.name || "لم يحدد بعد"}</th><th>${match.officials?.[0]?.name || "لم يحدد بعد"}</th></tr></tbody>
</table>
</div>

<div class="SecTitle">أهم اللاعبين</div>
<div class="TopPlayers">
${match?.topPerformers?.categories?.length > 0 ? `
${match.topPerformers.categories.map((category, index) => `

<div class="TopPlayersLine">
<div class="TopPlayerLoc"><span>خط ${category?.name || "غير محدد"}</span></div>
<div class="PlayersContainer">
<div class="HomeTopPlayer">
<span class="TopPlayerLogo">
<img alt="${category?.homePlayer?.name || "لم يحدد"}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${category?.homePlayer?.athleteId || "unknow-player"}.png" width="60" height="60" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${category?.homePlayer?.name || "لم يحدد"}" loading="lazy"/>
</span>
<span class="TopPlayerName">${category?.homePlayer?.name || "لم يحدد"}</span>
</div>

<div class="TopPlayerCenter">  
<span class="HomePlayerSection">
<span class="HomeNum">${category?.homePlayer?.stats[0].value || "لم يحدد"}</span> 
<span class="HomeNum">${category?.homePlayer?.stats[1].value || "لم يحدد"}</span>  
<span class="HomeRank">${category?.homePlayer?.stats?.[2]?.value != null ? (String(category.homePlayer.stats[2].value).includes('.') ? category.homePlayer.stats[2].value : `${category.homePlayer.stats[2].value} د`) : "-"}
</span> 
</span>

<span class="NamesSection">
<span class="NSection"><span>${category?.homePlayer?.stats[0].name || "لم يحدد"}</span></span>  
<span class="NSection"><span>${category?.homePlayer?.stats[1].name || "لم يحدد"}</span></span>   
<span class="NSection"><span>${category?.homePlayer?.stats[2].name || "لم يحدد"}</span></span>    
</span>

<span class="AwayPlayerSection">
<span class="AwayNum">${category?.awayPlayer?.stats[0].value || "لم يحدد"}</span> 
<span class="AwayNum">${category?.awayPlayer?.stats[1].value || "لم يحدد"}</span>  
<span class="AwayRank">${category?.awayPlayer?.stats?.[2]?.value != null ? (String(category.awayPlayer.stats[2].value).includes('.') ? category.awayPlayer.stats[2].value : `${category.awayPlayer.stats[2].value} د`) : "-"}
</span>  
</span>
</div>

<div class="AwayTopPlayer">
<span class="TopPlayerLogo">
<img alt="${category?.awayPlayer?.name || "لم يحدد"}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${category?.awayPlayer?.athleteId || "unknow-player"}.png" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${category?.awayPlayer?.name || "لم يحدد"}" loading="lazy"/>
</span>
<span class="TopPlayerName">${category?.awayPlayer?.name || "لم يحدد"}</span>
</div>
</div>
</div>
`).join('')}
` : `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`}
</div>

<div class="SecTitle">نتائج المواجهات الخمسة الأخيرة</div>
<div class="Meetings">
<div class="Parties">
<div class="RightTeamPar">
<span class="TeamParLogo">
<img alt="${match.homeCompetitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.homeCompetitor.id}.png" height="70" width="70"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${match.homeCompetitor.name}" loading="lazy"/>
</span>
<span class="TeamParName">${match.homeCompetitor.name}</span>
</div>
<div class="MeetingsStats"></div>
<div class="LeftTeamPar">
<span class="TeamParLogo">
<img alt="${match.awayCompetitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${match.awayCompetitor.id}.png" height="70" width="70"
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${match.awayCompetitor.name}" loading="lazy"/>
</span>
<span class="TeamParName">${match.awayCompetitor.name}</span>
</div>
</div>
</div>
<div class="PreviousTable"></div>
`;
let homeWins = 0;
let awayWins = 0;
let draws = 0;
const homeTeamName = match.homeCompetitor.name;
const awayTeamName = match.awayCompetitor.name;
const previousTable = matchDiv.querySelector('.PreviousTable');
if (h2h.h2hGames && h2h.h2hGames.length > 0) {
let matchesDisplayed = 0;
h2h.h2hGames.forEach(game => {
if (matchesDisplayed >= 5) {
return;
}
if (!game.scores || game.scores.length === 0) {
return;
}
const gameDate = new Date(game.startDate);
const now = new Date();
if (gameDate > now) {
return;
}
if (game.winner === 1 && game.homeCompetitor.name === homeTeamName) {
homeWins++;
} else if (game.winner === 1 && game.homeCompetitor.name === awayTeamName) {
awayWins++;
} else if (game.winner === 2 && game.awayCompetitor.name === homeTeamName) {
homeWins++;
} else if (game.winner === 2 && game.awayCompetitor.name === awayTeamName) {
awayWins++;
} else if (game.winner === -1) {
draws++;
}
const previousMatchHTML = `
<div class="PreviousMatch">
<div class="PreRightTeam">
<div class="PreLogo">
<img alt="${game.homeCompetitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${game.homeCompetitor.id}.png" height="40" width="40" onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${game.homeCompetitor.name}" loading="lazy"/>
</div>
<div class="PreName">${game.homeCompetitor.name}</div>
</div>
<div class="PreviousMatchResults">
<span class="preResults">
<span>${game.scores[0]}</span>
<span> - </span>
<span>${game.scores[1]}</span>
</span>
<span class="PreviousMatchTime">${formatDate(game.startTime)}</span>
<span class="Competition">${game.competitionDisplayName}</span>
</div>
<div class="PreLeftTeam">
<div class="PreLogo">
<img alt="${game.awayCompetitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${game.awayCompetitor.id}.png" height="40" width="40" onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${game.awayCompetitor.name}" loading="lazy"/>
</div>
<div class="PreName">${game.awayCompetitor.name}</div>
</div>
</div>
`;
function formatDate(dateString) {
const date = new Date(dateString);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
}
previousTable.innerHTML += previousMatchHTML;
matchesDisplayed++;
});
} else {
previousTable.innerHTML = '<div class="noPreviousMatches">ليس هناك معلومات عن مباريات سابقة</div>';
}
const meetingsStats = matchDiv.querySelector('.MeetingsStats');
meetingsStats.innerHTML = `
<div class="RightStats"><span class="kok1">${homeWins}</span><span class="kok2">أنتصار</span></div>
<div class="TieStats"><span class="kok1">${draws}</span><span class="kok2">تعادلات</span></div>
<div class="LeftStats"><span class="kok1">${awayWins}</span><span class="kok2">أنتصار</span></div>
`;
if (match.gameTime >= 90) {
document.querySelector('.Outlook').style.display = 'none';
document.querySelector('.Findings').style.display = 'flex';
} else if (cachedVote) {
document.querySelector('.Outlook').style.display = 'none';
document.querySelector('.Findings').style.display = 'flex';
}
document.getElementById('RightTeamBtn').addEventListener('click', function () {
showResults(matchId);
});
document.getElementById('DrawBtn').addEventListener('click', function () {
showResults(matchId);
});
document.getElementById('LiftTeamBtn').addEventListener('click', function () {
showResults(matchId);
});
}
} catch (error) {
console.error("حدث خطأ أثناء استرجاع البيانات:", error);
const matchDiv = document.querySelector('.C-MatchResult .Details .DetailsBefor');
if (matchDiv) {
matchDiv.innerHTML = '';
matchDiv.innerHTML = '<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>';
}
}
}
function showResults(matchId) {
document.querySelector('.Outlook').style.display = 'none';
document.querySelector('.Findings').style.display = 'block';
localStorage.setItem(`match_vote_${matchId}`, true);
}


// دالة أحصائيات المباراة
document.addEventListener("DOMContentLoaded", function () {
fetchMatchStatistics();
});
async function fetchMatchStatistics() {
const matchElement = document.querySelector('.C-MatchResult');
const detailsButton = document.querySelector('#AnalyticsBtn');
if (matchElement) {
detailsButton.style.display = 'block';
} else {
detailsButton.style.display = 'none';
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}
if (matchId) {
detailsButton.style.display = 'block';
} else {
detailsButton.style.display = 'none';
return;
}
const statsLink = `https://webws.365scores.com/web/game/stats/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&games=${matchId}`;
try {
const statsResponse = await fetch(statsLink);
if (!statsResponse.ok) {
detailsButton.style.display = 'none';
return;
}
const statsData = await statsResponse.json();
if (!statsData.statistics || statsData.statistics.length === 0) {
detailsButton.style.display = 'none';
return;
}
const homeTeamId = statsData.games[0].homeCompetitor.id;
const awayTeamId = statsData.games[0].awayCompetitor.id;
const statistics = statsData.statistics;
const homeTeamStats = statistics.filter(stat => stat.competitorId === homeTeamId);
const awayTeamStats = statistics.filter(stat => stat.competitorId === awayTeamId);
const analyticsDiv = document.querySelector('.C-MatchResult .Analytics');
if (analyticsDiv && homeTeamStats.length > 0 && awayTeamStats.length > 0) {
detailsButton.style.display = 'block';
let statisticsHTML = '<div class="AnalyticsTable">';
let isLine1 = true;
for (let i = 1; i < homeTeamStats.length; i++) {
const rowClass = isLine1 ? 'Line1' : 'Line2';
statisticsHTML += `
<div class="AnalyticsLine ${rowClass}">
<div class="AnaHomeTeam">${homeTeamStats[i].value}</div>
<div class="AnaName">
<span class="AnaNameCo">
<span class="AnaNameLine Left"></span>
<span class="AnaNameLineName">${homeTeamStats[i].name}</span>
<span class="AnaNameLine Right"></span>
</span>
</div>
<div class="AnaAwayTeam">${awayTeamStats[i].value}</div>
</div>`;
isLine1 = !isLine1;
}
statisticsHTML += '</div></div>';
analyticsDiv.innerHTML = `
<div class="MatchAnalytics">
<div class="AnalyticsLineTop">
<span class="AnaHomeTeamTop" style="width:${homeTeamStats[0].value};background-color:#4267b2">
<span class="AnaHomeTeamTopLogo">
<img height="30" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${homeTeamStats[0].competitorId}.png" onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" width="30" loading="lazy"/>
</span>
${homeTeamStats[0].value}
</span>
<span class="AnaAwayTeamTop" style="width:${awayTeamStats[0].value};background-color:#b51818">
<span class="AnaAwayTeamTopLogo">
<img height="30" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${awayTeamStats[0].competitorId}.png" onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" width="30" loading="lazy"/>
</span>
${awayTeamStats[0].value}
</span>
</div>
<div class="SecTitle">أحصائيات المباراة</div>
${statisticsHTML}
</div>`;
}
} catch (error) {
const analyticsDiv = document.querySelector('.C-MatchResult .Analytics');
if (analyticsDiv) {
analyticsDiv.innerHTML = '';
}
detailsButton.style.display = 'none';
}
}


// دالة تشكيلة الفريقين
document.addEventListener("DOMContentLoaded", function () {
getMatchInfo();
});
async function getMatchInfo() {
const matchElement = document.querySelector('.C-MatchResult');
const detailsButton1 = document.querySelector('#ScorersBtn');
if (!matchElement) {
console.error("عنصر .C-MatchResult غير موجود");
detailsButton1.style.display = 'none'; 
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}

if (!matchId) {
console.error("معرف المباراة غير موجود");
detailsButton1.style.display = 'none';
return;
}
const matchLink = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const tableResponse = await fetch(matchLink);
if (!tableResponse.ok) {
console.error("فشل في جلب البيانات");
detailsButton1.style.display = 'none';
return;
}
const data = await tableResponse.json();
const match = data.game;
if (!match) {
console.error("تفاصيل المباراة غير موجودة في البيانات المسترجعة");
detailsButton1.style.display = 'none';
return;
}
if (!match.homeCompetitor || !match.homeCompetitor.lineups || !match.homeCompetitor.lineups.members || match.homeCompetitor.lineups.members.length === 0) {
console.error("لا توجد بيانات للتشكيلة");
detailsButton1.style.display = 'none';
return;
}
console.log("تشكيلة الفريقين:", match);
detailsButton1.style.display = 'block';
const homeLineup = match.homeCompetitor.lineups.members;
const awayLineup = match.awayCompetitor.lineups.members;
const allMembers = match.members;
function categorizePlayers(lineup, members) {
const categories = {
goalkeeper: [],
defense: [],
midfield: [],
midfieldattack: [],
attack: [],
substitutes: [],
missing: [],
management: []
};
members.forEach(member => {
const matchingLineupPlayer = lineup.find(lineupPlayer => lineupPlayer.id === member.id);
if (matchingLineupPlayer) {
const player = {
name1: member.shortName,
name2: member.name,
athleteId: member.athleteId,
number: (member.jerseyNumber !== undefined && member.jerseyNumber >= 0) ? member.jerseyNumber : '-',
position: matchingLineupPlayer.formation.name ? matchingLineupPlayer.formation.name : '-',
status: matchingLineupPlayer.statusText || '-'
};
if (player.status === 'Starting') {
switch (matchingLineupPlayer.yardFormation.line) {
case 1:
categories.goalkeeper.push(player);
break;
case 2:
categories.defense.push(player);
break;
case 3:
categories.midfield.push(player);
break;
case 4:
categories.midfieldattack.push(player);
break;
case 5:
categories.attack.push(player);
break;
default:
break;
}
} else if (player.status === 'Substitute') {
categories.substitutes.push(player);
} else if (player.status === 'Missing') {
categories.missing.push(player);
} else if (player.status === 'Management') {
categories.management.push(player);
}
}
});
return categories;
}
const homeCategories = categorizePlayers(homeLineup, allMembers);
const awayCategories = categorizePlayers(awayLineup, allMembers);
function renderPlayers(team, categories) {
function renderTeamLine(players) {
return players && players.length > 0
? `<div class="TeamLine">${players.map(player => createPlayerCard(player)).join('')}</div>`
: '';
}
return `
<div class="TeamSquad">
<div class="StartSquad">
${renderTeamLine(categories.attack)} 
${renderTeamLine(categories.midfieldattack)}
${renderTeamLine(categories.midfield)}
${renderTeamLine(categories.defense)}
${renderTeamLine(categories.goalkeeper)}
</div>
<div class="SecTitle">المدير الفني</div>
<div class="SubSquad">
${categories.management && categories.management.length > 0 
? categories.management.map(player => createPlayerCard3(player)).join('') 
: '<h6 class="SubPlayer" style="display:block;font-size:14px;text-align:center">:: لا يوجد بيانات في الوقت الحالي ::</h6>'}
</div>
<div class="SecTitle">دكة البدلاء</div>
<div class="SubSquad">
${categories.substitutes && categories.substitutes.length > 0 
? categories.substitutes.map(player => createPlayerCard2(player)).join('') 
: '<h6 class="SubPlayer" style="display:block;font-size:14px;text-align:center">:: لا يوجد بيانات في الوقت الحالي ::</h6>'}
</div>
<div class="SecTitle">أصابات الفريق</div>
<div class="SubSquad">
${categories.missing && categories.missing.length > 0 
? categories.missing.map(player => createPlayerCard2(player)).join('') 
: '<h6 class="SubPlayer" style="display:block;font-size:14px;text-align:center">:: لا يوجد بيانات في الوقت الحالي ::</h6>'}
</div>
</div>
`;
}
function createPlayerCard(player) {
return `
<div class="Player">
<div class="PLogo">
<img alt="${player.name1}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${player.athleteId}.png" height="60" width="60" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${player.name1}" loading="lazy"/>
</div>
<div class="PName">${player.name1}</div>
<div class="PNumber">${player.number}</div>
</div>
`;
}
function createPlayerCard2(player) {
return `
<div class="SubPlayer">
<div class="SubPlayerCo">
<div class="SubLogo">
<img alt="${player.name2}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${player.athleteId}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${player.name2}" loading="lazy"/>
</div>
<div class="PlayerDetails">
<div class="SubName">${player.name2}</div>
<div class="SubPosition">${player.position}</div>
</div>
</div>
<div class="SubNumber"><span style="background-image: url(&quot;https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/Shirt.svg&quot;); background-repeat: no-repeat; background-size: 100%;width: 50px; height: 50px; background-position: center center; font-size: 12px;">${player.number}</span></div>
</div>
`;
}
function createPlayerCard3(player) {
return `
<div class="SubPlayer">
<div class="SubPlayerCo">
<div class="SubLogo">
<img 
alt="${player.name2}" 
title="${player.name2}" 
src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${player.athleteId}.png" 
loading="lazy" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';">
</div>
<div class="PlayerDetails">
<div class="SubName">${player.name2}</div>
<div class="SubPosition">${player.position}</div>
</div>
</div>
</div>
`;
}
const matchDiv = document.querySelector('.C-MatchResult .Squads');
if (matchDiv && match.homeCompetitor && match.awayCompetitor) {
const homeLineup = match.homeCompetitor.lineups;
const awayLineup = match.awayCompetitor.lineups;
matchDiv.innerHTML = `
<div class="SquadsButtons">
<div class="SquadsButtonsCo">
<button id="HomeTeamBtn" class="active">تشكيلة ${match.homeCompetitor.name}</button>
<button id="AwayTeamBtn">تشكيلة ${match.awayCompetitor.name}</button>
</div>
</div>
<div class="HomeTeam">
<div class="Dividing">
<span>التشكيلة المتوقعة : (${homeLineup && homeLineup.formation ? homeLineup.formation : 'غير متاحة'})</span>
</div>
${homeLineup ? renderPlayers('home', homeCategories) : '<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>'}
</div>
<div class="AwayTeam" style="display:none;">
<div class="Dividing">
<span>التشكيلة المتوقعة : (${awayLineup && awayLineup.formation ? awayLineup.formation : 'غير متاحة'})</span>
</div>
${awayLineup ? renderPlayers('away', awayCategories) : '<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>'}
</div>
`;
}
document.getElementById('HomeTeamBtn').addEventListener('click', function () {
showElement('HomeTeam', this);
});
document.getElementById('AwayTeamBtn').addEventListener('click', function () {
showElement('AwayTeam', this);
});
function showElement(elementId, activeButton) {
var elements = document.querySelectorAll('.C-MatchResult .Squads .HomeTeam, .C-MatchResult .Squads .AwayTeam');
elements.forEach(function (el) {
el.style.display = 'none';
});
var selectedElement = document.querySelector('.C-MatchResult .' + elementId);
if (selectedElement) {
selectedElement.style.display = 'block';
}
var buttons = document.querySelectorAll('.SquadsButtons button');
buttons.forEach(function (btn) {
btn.classList.remove('active');
});
activeButton.classList.add('active');
}
} catch (error) {
console.error("حدث خطأ أثناء استرجاع البيانات:", error);
const matchDiv = document.querySelector('.C-MatchResult .Squads');
if (matchDiv) {
matchDiv.innerHTML = `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`;
}
}
}


// دالة ترتيب الدوريات
document.addEventListener("DOMContentLoaded", function () {
getStandingsData();
});
async function getStandingsData() {
const matchElement = document.querySelector('.C-MatchResult');
const detailsButton2 = document.querySelector('#StandingsBtn');
if (!matchElement) {
detailsButton2.style.display = 'none';
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}

if (!matchId) {
detailsButton2.style.display = 'none';
return;
}
const matchUrl = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const matchResponse = await fetch(matchUrl);
if (!matchResponse.ok) {
detailsButton2.style.display = 'none';
return;
}
const matchData = await matchResponse.json();
const match = matchData.game;
if (!match || !match.competitionId) {
detailsButton2.style.display = 'none';
return;
}
const validCompetitionIds = [
7,   // الدوري الإنجليزي
11,  // الدوري الأسباني
17,  // الدوري الإيطالي
35,  // الدوري الفرنسي
25,  // الدوري الألماني
552, // الدوري المصري
649, // الدوري السعودي
408, // الدوري القطري
557, // الدوري المغربي
554, // الدوري التونسي
560, // الدوري الجزائري
549, // الدوري الاماراتي
78,  // الدوري التركي
572, // دوري أبطال أوروبا
573, // الدوري الأوروبي
7685,// دوري المؤتمر الأوروبي
];
if (!validCompetitionIds.includes(match.competitionId)) {
detailsButton2.style.display = 'none';
return;
}
const standingsUrl = `https://webws.365scores.com/web/standings/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&competitions=${match.competitionId}&live=false&withSeasons=true`;
const standingsResponse = await fetch(standingsUrl);
if (!standingsResponse.ok) {
detailsButton2.style.display = 'none';
return;
}
const data = await standingsResponse.json();
if (data.standings && data.standings.length > 0) {
const competitionData = data.standings[0];
console.log("ترتيب الدوري:", competitionData.rows);
detailsButton2.style.display = 'block';
displayStandings(competitionData, competitionData.rows);
} else {
detailsButton2.style.display = 'none';
displayNoData();
}
} catch (error) {
console.error("خطأ أثناء جلب البيانات:", error);
detailsButton2.style.display = 'none';
displayNoData();
}
}
function displayStandings(competitionData, standingsData) {
const matchDiv = document.querySelector('.C-MatchResult .Standings');
if (matchDiv) {
matchDiv.innerHTML = `
<div class='LeagueCo'>
<span class='LeagueCoLogo'>
<img alt="${competitionData?.displayName || "غير معروف"}" src="https://cdn.statically.io/gh/dev-malikweb/images/leagues-imgs/${competitionData.competitionId}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${competitionData?.displayName || "غير معروف"}" loading="lazy"/>
</span>
<span class='LeagueCoName'>
${competitionData?.displayName || "غير معروف"}
</span>
</div>
<table class="standings">
<thead>
<tr>
<th><span class="show">الترتيب</span><span class="hide">#</span></th>
<th><span class="show">الفريق</span><span class="hide">ناد</span></th>
<th><span class="show">لعب</span><span class="hide">ل</span></th>
<th class="won"><span class="show">فاز</span><span class="hide">ف</span></th>
<th class="draw"><span class="show">تعادل</span><span class="hide">ت</span></th>
<th class="lost"><span class="show">خسر</span><span class="hide">خ</span></th>
<th>+/-</th>
<th>فارق</th>
<th><span class="show">النقاط</span><span class="hide">ن</span></th>
</tr>
</thead>
<tbody>
${standingsData.map((row, index) => `
<tr class="${index % 2 === 0 ? 'even' : 'odd'} ${row.nextMatch && row.nextMatch.isOtherCompetition ? 'other-competition' : ''}">
<th>${row.position}</th>
<th>
<span class="team-info">
<span class="team">
<span class="team-logo">
<img class="teamlogo" alt="${row.competitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${row.competitor.id}.png" height="30" width="30" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${row.competitor.name}" loading="lazy"/>
</span>
<span class="team-name">${row.competitor.name}</span>
</span>
</span>
</th>
<th>${row.gamePlayed}</th>
<th class="tnt" style="background-color: #00800030 !important;">${row.gamesWon}</th>
<th class="tnt" style="background-color: #a9710930 !important;">${row.gamesEven}</th>
<th class="tnt" style="background-color: #ff000030 !important;">${row.gamesLost}</th>
<th>${row.for} : ${row.against}</th>
<th>${row.ratio}</th>
<th>${row.points}</th>
</tr>
`).join('')}
</tbody>
</table>
`;
}
}
function displayNoData() {
const matchDiv = document.querySelector('.C-MatchResult .Standings');
if (matchDiv) {
matchDiv.innerHTML = `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`;
}
}


// دالة ترتيب المجموعات
document.addEventListener("DOMContentLoaded", function () {
fetchTournamentData();
});
async function fetchTournamentData() {
const resultContainer = document.querySelector('.C-MatchResult');
const detailsButton3 = document.querySelector('#GrStandingsBtn');
if (!resultContainer) {
detailsButton3.style.display = 'none';
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}

if (!matchId) {
detailsButton3.style.display = 'none';
return;
}
const matchApiEndpoint = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const matchApiResponse = await fetch(matchApiEndpoint);
if (!matchApiResponse.ok) {
detailsButton3.style.display = 'none';
return;
}
const matchData = await matchApiResponse.json();
const gameInfo = matchData.game;
if (!gameInfo || !gameInfo.competitionId) {
detailsButton3.style.display = 'none';
return;
}
const validCompetitionIds = [
624, // دوري أبطال افريقيا
104, // الدوري الأمريكي
623, // دوري أبطال اسيا     
627, // الكونفدرالية الأفريقية
5096, // كأس العالم للأندية
];
if (!validCompetitionIds.includes(gameInfo.competitionId)) {
detailsButton3.style.display = 'none';
return;
}
console.log("بيانات المباراة:", gameInfo);
const standingsApiEndpoint = `https://webws.365scores.com/web/standings/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&competitions=${gameInfo.competitionId}&live=false&withSeasons=true`;
const standingsApiResponse = await fetch(standingsApiEndpoint);
if (!standingsApiResponse.ok) {
detailsButton3.style.display = 'none';
return;
}
const standingsInfo = await standingsApiResponse.json();
if (standingsInfo.standings && standingsInfo.standings.length > 0) {
console.log("ترتيب المجموعات:", standingsInfo.standings[0].rows);
detailsButton3.style.display = 'block';
displayStandingsByGroup(standingsInfo.standings[0], gameInfo);
} else {
detailsButton3.style.display = 'none';
displayNoDataMessage();
}
} catch (error) {
console.error(error);
detailsButton3.style.display = 'none';
displayNoDataMessage();
}
}
function displayStandingsByGroup(standingsInfo, gameInfo) {
const standingsContainer = document.querySelector('.C-MatchResult .GrStandings');
if (!standingsContainer) return;
const leagueName = standingsInfo.displayName || "غير معروف";
const leagueId = gameInfo.competitionId;
const groupsList = standingsInfo.groups || [];
standingsContainer.innerHTML = `
<div class='LeagueCo'>
<span class='LeagueCoLogo'>
<img alt="${leagueName}" src="https://cdn.statically.io/gh/dev-malikweb/images/leagues-imgs/${leagueId}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${leagueName}" loading="lazy"/>
</span>
<span class='LeagueCoName'>
${leagueName}
</span>
</div>
`;
groupsList.forEach(group => {
const groupRows = standingsInfo.rows.filter(row => row.groupNum === group.num) || [];
standingsContainer.innerHTML += `
<h5 class="SecTitle">${group.name}</h5>
<table class="standings">
<thead>
<tr>
<th><span class="show">الترتيب</span><span class="hide">#</span></th>
<th><span class="show">الفريق</span><span class="hide">ناد</span></th>
<th><span class="show">لعب</span><span class="hide">ل</span></th>
<th class="won"><span class="show">فاز</span><span class="hide">ف</span></th>
<th class="draw"><span class="show">تعادل</span><span class="hide">ت</span></th>
<th class="lost"><span class="show">خسر</span><span class="hide">خ</span></th>
<th>+/-</th>
<th>فارق</th>
<th><span class="show">النقاط</span><span class="hide">ن</span></th>
</tr>
</thead>
<tbody>
${groupRows.map((row, index) => `
<tr class="${index % 2 === 0 ? 'even' : 'odd'}">
<th>${row.position}</th>
<th>
<span class="team-info">
<span class="team">
<span class="team-logo">
<img class="teamlogo" alt="${row.competitor.name}" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${row.competitor.id}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${row.competitor.name}" loading="lazy"/>
</span>
<span class="team-name">${row.competitor.name}</span>
</span>
</span>
</th>
<th>${row.gamePlayed}</th>
<th class="tnt" style="background-color: #00800030 !important;">${row.gamesWon}</th>
<th class="tnt" style="background-color: #a9710930 !important;">${row.gamesEven}</th>
<th class="tnt" style="background-color: #ff000030 !important;">${row.gamesLost}</th>
<th>${row.for} : ${row.against}</th>
<th>${row.ratio}</th>
<th>${row.points}</th>
</tr>
`).join('')}
</tbody>
</table>`;
});
}
function displayNoDataMessage() {
const standingsContainer = document.querySelector('.C-MatchResult .GrStandings');
if (standingsContainer) {
standingsContainer.innerHTML = `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`;
}
}


// دالة ترتيب هدافين
document.addEventListener("DOMContentLoaded", function () {
getTopScorersData();
});
async function getTopScorersData() {
const matchElement = document.querySelector('.C-MatchResult');
const detailsButton4 = document.querySelector('#TopScorersBtn');
if (!matchElement) {
console.error("عنصر .C-MatchResult غير موجود");
detailsButton4.style.display = 'none';
return;
}
// الحصول على رابط الصفحة الحالي
const url = window.location.href;
const matchIdIndex = url.indexOf("?id=");
if (matchIdIndex === -1) {
console.error("معرف المباراة غير موجود في الرابط");
return;
}
const matchId = url.substring(matchIdIndex + 4);
if (!matchId) {
console.error("معرف المباراة غير موجود");
return;
}

if (!matchId) {
console.error("معرف المباراة غير موجود");
detailsButton4.style.display = 'none';
return;
}
const matchUrl = `https://webws.365scores.com/web/game/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&gameId=${matchId}`;
try {
const matchResponse = await fetch(matchUrl);
if (!matchResponse.ok) {
detailsButton4.style.display = 'none';
return;
}
const matchData = await matchResponse.json();
const match = matchData.game;
if (!match || !match.competitionId) {
console.error("تفاصيل المباراة أو معرف البطولة غير موجود");
detailsButton4.style.display = 'none';
return;
}
const validCompetitionIds = [
7,   // الدوري الإنجليزي
11,  // الدوري الأسباني
17,  // الدوري الإيطالي
35,  // الدوري الفرنسي
25,  // الدوري الألماني
552, // الدوري المصري
649, // الدوري السعودي
408, // الدوري القطري
557, // الدوري المغربي
554, // الدوري التونسي
560, // الدوري الجزائري
549, // الدوري الاماراتي
78,  // الدوري التركي
572, // دوري أبطال أوروبا
573, // الدوري الأوروبي
7685,// دوري المؤتمر الأوروبي
624, // دوري أبطال افريقيا
104, // الدوري الأمريكي
623, // دوري أبطال اسيا     
627, // الكونفدرالية الأفريقية
5096, // كأس العالم للأندية
];
if (!validCompetitionIds.includes(match.competitionId)) {
detailsButton4.style.display = 'none';
return;
}
console.log("بيانات المباراة:", match);
const topScorersUrl = `https://webws.365scores.com/web/stats/?appTypeId=5&langId=27&timezoneName=Africa/Cairo&userCountryId=131&competitions=${match.competitionId}&live=false&withSeasons=true`;
const topScorersResponse = await fetch(topScorersUrl);
if (!topScorersResponse.ok) {
detailsButton4.style.display = 'none';
return;
}
const topScorersData = await topScorersResponse.json();
if (topScorersData && topScorersData.stats && topScorersData.stats.athletesStats[0].rows) {
console.log("بيانات الهدافين:", topScorersData);
detailsButton4.style.display = 'block';
displayTopScorers(topScorersData.stats.athletesStats[0].rows, topScorersData);
} else {
console.error("بيانات الهدافين غير متوفرة");
detailsButton4.style.display = 'none';
displayNoTopScorersData();
}
} catch (error) {
console.error("حدث خطأ أثناء استرجاع البيانات:", error);
detailsButton4.style.display = 'none';
displayNoTopScorersData();
}
}
function displayTopScorers(rows, topScorersData) {
const matchDiv = document.querySelector('.C-MatchResult .TopScorers');
if (matchDiv) {
if (rows && rows.length > 0) {
const competition = topScorersData.competitions[0] || {};
const competitionName = competition.name || "غير معروف";
const competitionId = competition.id || "none";
matchDiv.innerHTML = `
<div class='LeagueCo'>
<span class='LeagueCoLogo'>
<img alt="${competitionName}" src="https://cdn.statically.io/gh/dev-malikweb/images/leagues-imgs/${competitionId}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" title="${competitionName}" loading="lazy"/>
</span>
<span class='LeagueCoName'>
${competitionName}
</span>
</div>
<table class="players">
<thead>
<tr>
<th>الترتيب</th>
<th style="text-align: center;">اللاعب</th>
<th>المركز</th>
<th>الفريق</th>
<th class="goals">الأهداف</th>
</tr>
</thead>
<tbody>
${rows.map((row, index) => {
const playerName = row.entity.name || "غير معروف";
const playerId = row.entity.id || "none";
const teamId = row.entity.competitorId || "none";
const position = row.entity.positionShortName || "غير معروف";
const goals = row.stats[0]?.value || 0;
return `
<tr class="${index % 2 === 0 ? 'even' : 'odd'}">
<th>${row.position}</th>
<th>
<span class="player-info">
<span class="player-img">
<img alt="${playerName}" src="https://cdn.statically.io/gh/dev-malikweb/images/clubs-players-imgs-24-25/${playerId}.png" height="40" width="40" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/player-avatar.svg';" title="${playerName}" loading="lazy"/>
</span>
<span class="player-name">${playerName}</span>
</span>
</th>
<th>${position}</th>
<th>
<img class="player-team" src="https://cdn.statically.io/gh/dev-malikweb/images/teams-imgs/${teamId}.png" height="30" width="30" 
onerror="this.onerror=null; this.src='https://cdn.statically.io/gh/dev-malikweb/images/trophies-imgs/none-club.png';" loading="lazy"/>
</th>
<th>${goals}</th>
</tr>`;
}).join('')}
</tbody>
</table>`;
} else {
displayNoTopScorersData();
}
}
}
function displayNoTopScorersData() {
const matchDiv = document.querySelector('.C-MatchResult .TopScorers');
if (matchDiv) {
matchDiv.innerHTML = `<h6 class="no-data">:: لا يتوافر معلومات في الوقت الحالي ::</h6>`;
}
}


// دالة التنسيقات
document.addEventListener("DOMContentLoaded", function () {
getCssData();
});
async function getCssData() {
var cssText = `
.SecTitle{display:block;font-size:18px;font-weight:bold;text-align:center;margin-bottom:12px;background:linear-gradient(to right,#4267b2,#71b6ef,#71b6ef,#4267b2);color:#fff;padding:6px 18px;border-radius:12px;}.Title{display:block;width:100%;font-size:14px;text-align:center;margin-bottom:12px;line-height:25px;}.match{display:flex;flex-direction:column;justify-content:center;width:100%;height:200px;margin-bottom:20px;align-items:center;overflow:hidden;}.MatchCard{display:block;position:relative;background-image:url('https://cdn.statically.io/gh/dev-malikweb/assists/template-assists/match-card-cover.webp');background-size:cover;background-position:center;background-repeat:no-repeat;border-radius:12px;background-color:#0e1019;margin-bottom:12px;overflow:hidden;}.MatchCard:before{content:"";position:absolute;background-color:rgba(0,0,0,0.5);backdrop-filter:blur(1px) saturate(100%);width:100%;top:0;bottom:0;left:0;right:0;}.MatchCard .match-container{display:flex;position:relative;width:100%;height:160px;color:#fff!important;padding:0;flex-direction:row;align-items:center;justify-content:center;overflow:hidden;}.match-container > div{display:flex;width:33.3333%;height:160px;flex:0 0 33.3333%!important;justify-content:center;flex-direction:column;align-items:center;}.Team-Logo{display:block;position:relative;width:100%;height:80%;overflow:hidden;}.Team-Logo img{max-width:85px!important;max-height:85px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}.Team-Name{display:block;width:150px;background-color:#191d2d;border:1px solid #252c37;border-radius:8px;margin:0 auto;font-size:16px;text-align:center;}.match-competition{display:flex;position:relative;width:100%;flex-direction:row;align-items:center;justify-content:center;height:40px;border-bottom:1px solid #252c37;margin-top:0;overflow:hidden;}span.CompetitionLogo{display:flex;width:25px;height:25px;float:right;background-color:#fff;padding:5px;border-radius:50%;margin-left:6px;text-align:center;align-items:center;justify-content:center;}span.CompetitionLogo img{display:table;width:100%;height:auto;max-width:20px;max-height:20px;margin:auto;}span.CompetitionName{display:block;font-size:14px;color:#fff;}#result{display:flex;width:150px;font-size:22px;margin-bottom:12px;align-items:center;justify-content:space-between;flex-wrap:nowrap;}.Team-Score{display:flex;background-color:#191d2d;border:1px solid #252c37;width:40px;height:40px;border-radius:8px;flex-direction:column;align-items:center;justify-content:center;}.date,div#match-time{display:flex;position:relative;font-size:16px;border-radius:8px;background:#191d2d;border:1px solid #252c37;width:150px;align-items:center;justify-content:center;}.match-timing{justify-content:flex-end!important;}div#match-time,#result{display:flex!important;margin-bottom:12px;}.match-timing .date.live:before,.match-timing .date.soon:before,.match-timing .date.not-start:before{display:inline-block;background:#474747;content:'';width:10px;height:10px;margin-left:12px;border-radius:50%;}.match-timing .date.live:before{background-color:#b51818;animation:pulse .5s infinite;}.match-timing .date.soon:before{background-color:#008d29;}.match-timing .date.not-start:before{background-color:#4267b2;}@keyframes pulse{0%{transform:scale(1);opacity:1;}50%{transform:scale(1.2);opacity:0.6;}100%{transform:scale(1);opacity:1;}}.Buttons{display:flex;width:100%;flex-direction:row;justify-content:center;align-items:center;height:50px;overflow:hidden;}.Buttons a{display:flex;position:relative;cursor:pointer;height:50px;-webkit-transition:all .3s;transition:all .3s;font-size:14px;color:#fff;padding-bottom:15px;overflow:hidden;align-items:center;}.Buttons a:not(:last-child){margin-left:25px;}.Buttons a:before{content:"";position:absolute;bottom:0;height:4px;width:0;border-radius:4px;background-color:#39dbbf;-webkit-transition:all .3s;transition:all .3s;}.Buttons a.active::before{width:100%;}.Buttons a:hover,.Buttons a.active{color:#39dbbf;}.Buttons a span.show{display:block;}.Buttons a span.hide{display:none;}#AnalyticsBtn,#ScorersBtn,#StandingsBtn,#GrStandingsBtn,#TopScorersBtn{display:none;}h6.no-data{display:flex;width:100%;height:300px;font-size:18px;font-weight:600;color:#718ba1;letter-spacing:1px;background-color:#e4eeff;border-radius:8px;border:1px solid #d1e7ff;text-align:center;align-items:center;justify-content:center;}.EventsTable{display:flex;flex-direction:column-reverse;justify-content:center;border-radius:12px;margin-bottom:12px;border:1px solid #d1e7ff;overflow:hidden;}.Event{display:flex;width:100%;height:45px;padding:0 20px;flex-direction:row;align-items:center;justify-content:center;overflow:hidden;}.Event.odd{background-color:#eceef2;}.Event.even{background-color:#e4eeff;}.Event:not(:last-of-type){border-top:1px solid #d1e7ff;}.HomeTeamEven,.AwayTeamEven{display:flex;width:45%;}.HomeTeamEven{flex-direction:row;align-items:center;}.AwayTeamEven{flex-direction:row-reverse;align-items:center;}.EventTime{display:flex;width:10%;align-items:center;justify-content:center;}.EventTime span{display:flex;position:relative;background-color:#fff;color:#718ba1;font-size:12px;border-radius:50%;width:28px;height:28px;align-items:center;justify-content:center;border:2px solid #718ba1;}.EventTime span::before,.EventTime span::after{content:"";position:absolute;bottom:-10px;width:2px;height:10px;background-color:#718ba1;}.EventTime span::before{bottom:-10px;}.EventTime span::after{top:-10px;}.Event:first-of-type .EventTime span::before,.Event:last-of-type .EventTime span::after{display:none!important;}.EvenPlayersCo{display:flex;width:100%;align-items:center;}.HomeTeamEven .EvenPlayersCo{flex-direction:row;}.AwayTeamEven .EvenPlayersCo{flex-direction:row-reverse;}.EvenPlayer,.EvenPlayers{display:flex;width:80%;align-items:center;flex-direction:row;}.EventType{display:flex;width:20%;flex-direction:column;align-items:center;}.EventType img{width:100%;height:auto;max-width:25px;max-height:25px;}span.EvenPlayerImg{display:flex;flex-direction:column;align-items:center;justify-content:center;width:30px;height:30px;}.EvenPlayer span.EvenPlayerImg{width:60px;float:right;}.HomeTeamEven span.EvenPlayerImg{align-items:flex-start;}.AwayTeamEven span.EvenPlayerImg{align-items:flex-end;}span.EvenPlayerImg img{width:30px;height:30px;}.HomeTeamEven span.EvenPlayerImg{margin-left:12px;}.AwayTeamEven span.EvenPlayerImg{margin-right:12px;}.EvenPlayersName{display:flex;flex-direction:column;}.AwayTeamEven .EvenPlayersCo .EvenPlayers,.AwayTeamEven .EvenPlayer{flex-direction:row-reverse;}.HomeTeamEven .EvenPlayersCo .EvenPlayers{flex-direction:row;}.EvenPlayers .EvenPlayersLogo{display:flex;justify-content:center;align-items:center;overflow:hidden;}.HomeTeamEven .EvenPlayers .EvenPlayersLogo{margin-left:12px;}.AwayTeamEven .EvenPlayers .EvenPlayersLogo{margin-right:12px;}.EvenPlayers .EvenPlayersLogo span.EvenPlayerImg{margin:0!important;}span.EvenPlayerName{font-size:12px;line-height:15px;height:15px;color:#718ba1;overflow:hidden;}.HomeTeamEven span.EvenPlayerName{text-align:right;}.AwayTeamEven span.EvenPlayerName{text-align:left;}.HomeTeamEven span.EvenPlayerImg.OutSide{display:block;position:relative;right:-8px;}.AwayTeamEven span.EvenPlayerImg.OutSide{display:block;position:relative;left:-8px;}span.EvenPlayerImg.OutSide img{border:1px solid #fc4d4d;border-radius:50%;}span.EvenPlayerName.OutSide{color:#fc4d4d;}span.EvenPlayerImg.InSide img{border:1px solid #5bd286;border-radius:50%;}span.EvenPlayerName.InSide{color:#5bd286;}.VotesBulk{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;overflow:hidden;}.Outlook,.Findings{display:flex;background-color:#e4eeff;border:1px solid #d1e7ff;padding:12px;margin-bottom:12px;height:150px;border-radius:12px;width:100%;flex-direction:column;overflow:hidden;justify-content:center;}.Outlook{align-items:center;justify-content:center;}.VTitle,span.TotalVotes{display:block;width:100%;font-size:18px;text-align:center;margin-bottom:12px;line-height:25px;}.VoteButtons{display:flex;width:100%;height:60px;float:right;overflow:hidden;flex-direction:row;align-items:center;justify-content:center;}.VoteButtons button{display:flex;cursor:pointer;width:150px;margin:0 12px;background-color:#4267b2;border-radius:8px;border:inherit;-webkit-transition:all .3s;transition:all .3s;font-family:inherit;position:relative;font-size:14px;color:#fff;padding:6px 12px;text-align:center;align-items:center;justify-content:center;overflow:hidden;}button#RightTeamBtn,button#LiftTeamBtn{flex-direction:row;}span.VoteTeamLogo{display:flex;position:relative;width:25px;height:25px;flex-direction:column;align-items:center;justify-content:center;}span.VoteTeamLogo img{max-width:25px!important;max-height:25px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}button#RightTeamBtn span.VoteTeamLogo,button#LiftTeamBtn span.VoteTeamLogo{margin-right:10px;}span.TotalVotes{display:block;width:100%;font-size:14px;text-align:center;margin-bottom:12px;line-height:25px;}.FindingsLine{display:flex;position:relative;flex-direction:row;justify-content:center;background-color:#fff;border-radius:8px;overflow:hidden;}.FindingsLine span{height:10px;}span.DrawLine{border-right:1px solid #fff;border-left:1px solid #fff;}span.Percentage{display:flex;flex-direction:row;align-items:center;width:100%;margin-top:12px;}span.Percentage span{display:flex;flex-direction:column;align-items:center;justify-content:center;width:33.3333%;line-height:20px;font-size:14px;}span.RightTeamPer span,span.LiftTeamPer span{display:block;width:100%;}span.RightTeamPer span{text-align:right!important;}span.LiftTeamPer span{text-align:left!important;}.MeetDetails{display:block;position:relative;margin-bottom:12px;width:100%;overflow:hidden;}table.MeetDetailsTable{width:100%;border-spacing:2px;margin:0 auto;}table.MeetDetailsTable thead tr{background-color:#718ba1;color:#fff;}table.MeetDetailsTable th{width:33.3333%;border-radius:8px;font-size:14px;padding:4px 0;text-align:center;}table.MeetDetailsTable tbody tr{background-color:#eceef2;color:#718ba1;}span.STMap{display:inline-block;width:25px;height:25px;overflow:hidden;text-align:center;margin-right:10px;}.TopPlayers{position:relative;display:grid;grid-gap:12px;grid-template-columns:repeat(1,1fr);width:100%;margin-bottom:12px;align-items:center;overflow:hidden;}.TopPlayersLine{display:flex;flex-direction:column;justify-content:center;background-color:#e4eeff;border:1px solid #d1e7ff;border-radius:12px;overflow:hidden;}.TopPlayerLoc{color:#718ba1;font-size:16px;border-bottom:1px solid #d1e7ff;text-align:center;}.PlayersContainer{display:flex;width:100%;padding:12px;flex-direction:row;align-items:center;overflow:hidden;}.PlayersContainer > div{display:flex;align-items:center;}.HomeTopPlayer,.AwayTopPlayer{width:25%;flex-direction:column;}.TopPlayerCenter{width:50%;flex-direction:row;justify-content:space-between!important;}.TopPlayerCenter > span{display:flex;font-size:14px;flex-direction:column;align-items:center;}span.HomePlayerSection,span.AwayPlayerSection{width:20%;}span.NamesSection{width:55%;}span.HomeNum,span.AwayNum{border-radius:8px;margin-bottom:5px;border:1px solid #d1e7ff;}span.TopPlayerLogo{display:flex;position:relative;width:100%;height:65px;flex-direction:column;align-items:center;justify-content:center;}span.TopPlayerLogo img{max-width:60px!important;max-height:60px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}span.TopPlayerName{display:block;width:100%;height:30px;text-align:center;margin-top:5px;font-size:14px;color:#718ba1;}span.HomePlayerSection > span,span.NamesSection > span,span.AwayPlayerSection > span{display:block;width:100%;text-align:center;background-color:#fff;border:1px solid #d1e7ff;border-radius:8px;line-height:30px;font-size:12px;height:30px;}span.HomeRank,span.AwayRank{border:1px solid #5bd286!important;}span.NSection:not(:last-of-type){margin-bottom:5px;}.Meetings,.PreviousTable{display:flex;width:100%;flex-direction:column;background-color:#e4eeff;border:1px solid #d1e7ff;border-radius:12px;margin-bottom:12px;padding:12px;align-items:center;justify-content:center;overflow:hidden;}.Parties{display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-evenly;overflow:hidden;}.Parties > div{display:flex;width:33.3333%;}.RightTeamPar,.LeftTeamPar{flex-direction:column;align-items:center;justify-content:center;}span.TeamParLogo{display:block;position:relative;width:100%;height:75px;text-align:center;overflow:hidden;}span.TeamParLogo img{max-width:70px!important;max-height:70px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}span.TeamParName{display:block;width:100%;height:25%;font-size:16px;text-align:center;}.MeetingsStats{flex-direction:row;align-items:center;justify-content:center;}.MeetingsStats > div{display:flex;width:33.3333%;flex-direction:column;align-items:center;justify-content:center;}.TieStats{border-right:2px solid #d1e7ff;border-left:2px solid #d1e7ff;}span.kok1,span.kok2{display:flex;width:100%;flex-direction:column;align-items:center;}span.kok1{font-size:18px;}span.kok2{font-size:14px;color:#718ba1;}.PreviousMatch{display:flex;width:80%;flex-direction:row;align-items:center;justify-content:center;}.PreviousMatch:not(:last-of-type){border-bottom:2px solid #d1e7ff;}.PreviousMatch > div{display:flex;width:33.3333%;}.PreviousMatchResults{flex-direction:column;align-items:center;justify-content:center;padding:6px 0;}.PreRightTeam{display:flex;width:100%;flex-direction:row;overflow:hidden;}.PreLeftTeam{display:flex;width:100%;flex-direction:row-reverse;overflow:hidden;}.PreLogo{display:flex;position:relative;width:50%;height:50px;flex-direction:column;align-items:center;justify-content:center;}.PreLogo img{max-width:40px!important;max-height:40px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}.PreName{display:flex;width:50%;flex-direction:column;align-items:center;justify-content:center;font-size:14px;}span.preResults{font-size:16px;line-height:25px;}span.Competition,span.PreviousMatchTime{font-size:12px;color:#718ba1;line-height:20px;}.MatchIframe{display:block;position:relative;background-color:#e4eeff;border:1px solid #d1e7ff;padding:12px;border-radius:12px;margin-bottom:12px;overflow:hidden;}.MatchIframe iframe{border-radius:8px;}.AnalyticsLineTop{display:flex;width:100%;height:60px;background-color:#fff;border-radius:12px;margin-bottom:12px;overflow:hidden;align-items:center;justify-content:center;}.AnalyticsLineTop:after{content:"الأستحواذ";position:absolute;margin:0 auto;color:#fff;background-color:rgb(255 255 255 / 40%);border-radius:8px;line-height:25px;padding:0 8px;font-size:14px;}.AnaHomeTeamTop,.AnaAwayTeamTop{display:flex;color:#fff;flex-direction:row;align-items:center;padding:10px 20px;overflow:hidden;}.AnaHomeTeamTop{border-left:1px solid #fff;padding-left:0;}.AnaAwayTeamTop{flex-direction:row-reverse;border-right:1px solid #fff;padding-right:0;}.AnaHomeTeamTopLogo,.AnaAwayTeamTopLogo{display:flex;position:relative;width:40px;height:40px;background-color:#fff;margin:0 15px;border-radius:50%;padding:5px;overflow:hidden;align-items:center;justify-content:center;}.AnaHomeTeamTopLogo img,.AnaAwayTeamTopLogo img{max-width:30px!important;max-height:30px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}.AnalyticsTable{display:flex;flex-direction:column;border:1px solid #d1e7ff;border-radius:12px;margin-bottom:12px;align-items:center;justify-content:center;overflow:hidden;}.AnalyticsLine{display:flex;width:100%;font-size:14px;height:35px;flex-direction:row;align-items:center;justify-content:center;background-color:#fff;}.AnalyticsLine.Line1{background-color:#eceef2;}.AnalyticsLine.Line2{background-color:#e4eeff;}.AnalyticsLine:not(:first-of-type){border-top:1px solid #d1e7ff;}.AnalyticsLine > div{display:flex;justify-content:center;align-items:center;font-size:13px;}.AnalyticsLine .AnaHomeTeam,.AnalyticsLine .AnaAwayTeam{width:12%;}.AnalyticsLine .AnaName{width:78%;}span.AnaNameCo{display:flex;width:100%;align-items:center;justify-content:center;}.AnaNameLine{display:block;background-color:#fff;border-radius:4px;height:4px;width:20%;opacity:.5;}.AnaNameLine.Left{background-color:#4267b2;}span.AnaNameLine.Right{background-color:#b51818;}span.AnaNameLineName{width:25%;text-align:center;color:#718ba1;background-color:#fff;border:1px solid #d1e7ff;border-radius:8px;line-height:25px;margin:0 10px;}.SquadsButtons{display:flex;flex-direction:row;align-items:center;justify-content:center;margin-bottom:15px;border-radius:12px;}.SquadsButtonsCo{display:flex;position:relative;width:400px;border-radius:12px;flex-direction:row;overflow:hidden;}.SquadsButtons button{display:block;cursor:pointer;width:50%;background-color:#0e1019;border:inherit;-webkit-transition:all .3s;transition:all .3s;font-family:inherit;position:relative;font-size:16px;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,0.45);padding:8px 12px;overflow:hidden;}.SquadsButtons button.active{background-color:#39dbbf;}.Dividing{display:flex;position:relative;align-items:center;justify-content:center;flex-direction:row;margin-bottom:12px;overflow:hidden;}.Dividing span{display:block;background-color:#0e1019;color:#fff;border-radius:8px;font-size:14px;padding:0 12px;z-index:9;}.TeamSquad{display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}.StartSquad{display:flex;background-image:url(https://cdn.statically.io/gh/dev-malikweb/assists/template-assists/football-field.webp);background-repeat:no-repeat;background-size:cover;background-position:center center;flex-direction:column;position:relative;height:490px;width:100%;max-width:800px;align-items:center;overflow:hidden;padding:15px 0;margin:auto;margin-bottom:15px;justify-content:space-around;z-index:1;}.TeamLine{display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;flex-direction:row;}.Player{display:flex;position:relative;width:80px;height:80px;margin:0 20px;flex-direction:column;align-items:center;justify-content:center;}.PLogo{display:flex;width:70px;height:70px;text-align:center;align-items:center;justify-content:center;}.PLogo img{display:table;width:100%;height:auto;max-width:60px;max-height:60px;}.PName{display:block;position:relative;text-align:center;color:#fff;font-size:10px;line-height:20px;}.PNumber{display:flex;position:absolute;font-size:10px;background-color:#fff;width:20px;height:20px;border-radius:50%;text-align:center;align-items:center;justify-content:center;top:0;right:3px;border:1px solid #bbbbbb;}.SubSquad{position:relative;display:grid;grid-gap:12px;grid-template-columns:repeat(3,1fr);margin-bottom:12px;}.SubPlayer{display:flex;background-color:#e4eeff;border:1px solid #d1e7ff;padding:6px 18px;border-radius:12px;flex-direction:row;align-items:center;overflow:hidden;justify-content:space-between;}.SubPlayerCo{display:flex;position:relative;flex-direction:row;justify-content:center;overflow:hidden;align-items:center;}.SubLogo{display:inline-block;position:relative;width:40px;height:40px;margin-left:15px;overflow:hidden;}.SubLogo img{display:table;width:100%;height:auto;max-width:40px;max-height:40px;margin:auto;}.PlayerDetails{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;}.SubNumber{display:block;width:30px;text-align:center;margin-left:12px;}.SubNumber span{display:flex;align-items:center;justify-content:center;font-size:14px;}.SubName{display:block;text-align:center;font-size:16px;line-height:25px;}.SubPosition{display:block;line-height:25px;color:#718ba1;font-size:12px;}.LeagueCo{display:flex;width:100%;background-color:#e4eeff;border:1px solid #d1e7ff;border-radius:12px;margin-bottom:12px;padding:12px;flex-direction:row;align-items:center;overflow:hidden;justify-content:center;}span.LeagueCoLogo{display:flex;position:relative;flex-direction:column;align-items:center;justify-content:center;background-color:#fff;border:1px solid #d1e7ff;border-radius:50%;width:60px;height:60px;padding:10px;margin-left:12px;overflow:hidden;}span.LeagueCoLogo img{max-width:40px!important;max-height:40px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}table.standings{width:100%;font-size:14px;border-spacing:2px;margin:0 auto;}table.standings thead tr{background-color:#718ba1;color:#ffffff;}table.standings th{border-radius:8px;padding:6px 0;text-align:center;}table.standings th:nth-child(1){display:table-cell;width:60px;}table.standings th:not(:nth-of-type(2)){width:70px;}th span.team-info{display:flex;flex-direction:row;align-items:center;justify-content:space-between;}th span.team-logo{display:flex;width:20%;position:relative;overflow:hidden;flex-direction:column;align-items:center;justify-content:center;}th span.team-logo img.teamlogo{display:table;width:32px;height:32px;margin:0 auto;object-fit:contain;}th .team-name{position:relative;width:80%;text-align:right;overflow:hidden;}table.standings th span.team{display:flex;flex-direction:row;width:70%;align-items:center;justify-content:flex-start;}table.standings tbody tr.odd th:not(.tnt){background:#e4eeff;}table.standings tbody tr.even th:not(.tnt){background:#eceef2;}table.standings thead tr th span.hide{display:none;}table.players{width:100%;border-spacing:2px;font-size:14px;overflow:hidden;}table.players thead tr{background-color:#718ba1;color:#fff;}table.players th{position:relative;border-radius:8px;padding:4px 0;text-align:center;}table.players th:nth-of-type(1),table.players th:nth-of-type(4),table.players th:nth-of-type(5){width:70px;}table.players th:nth-of-type(2){width:50%;}th span.player-info{display:flex;align-items:center;justify-content:flex-start;flex-direction:row;width:100%;overflow:hidden;}th span.player-img{display:block;position:relative;float:right;margin-right:10px;overflow:hidden;}th span.player-img img{display:table;width:100%;height:auto;max-width:40px;max-height:40px;margin:0 auto;}th span.player-name{display:block;margin-right:10px;font-size:14px;float:right;}th img.player-team{max-width:30px!important;max-height:30px;width:auto;height:auto!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0!important;padding:0!important;margin:0 -50px 0 auto!important;}table.players tbody tr.odd{background-color:#e4eeff;}table.players tbody tr.even{background-color:#eceef2;}.Night .SecTitle,.Night .Event.even,.Night table.MeetDetailsTable tbody tr,.Night .AnalyticsLine.Line1,.Night .AnalyticsLineTop,.Night table.standings tbody tr.even th:not(.tnt),.Night table.standings tbody tr.odd th:not(.tnt),.Night table.players tbody tr.even,.Night table.players tbody tr.odd{background:#0e1019;color:#fff;}.Night .Outlook,.Night .Findings,.Night .TopPlayersLine,.Night .Meetings,.Night .PreviousTable,.Night .MatchIframe,.Night span.AnaNameLineName,.Night .SubPlayer,.Night .LeagueCo,.Night h6.no-data{background:#0e1019;border:1px solid #252c37;color:#fff;}.Night span.HomePlayerSection > span,.Night span.NamesSection > span,.Night span.AwayPlayerSection > span{background:#191d2d;border:1px solid #252c37;color:#fff;}.Night .Event.odd,.Night .AnalyticsLine.Line2{background-color:#191d2d;}.Night .EventsTable,.Night .AnalyticsTable{border:1px solid #252c37;}.Night .Event:not(:last-of-type),.Night .AnalyticsLine:not(:first-of-type){border-top:1px solid #252c37;}.Night .TopPlayerLoc{border-bottom:1px solid #252c37;}.Night table.MeetDetailsTable thead tr,.Night table.standings thead tr,.Night table.players thead tr{background-color:#000;}.Night span.TopPlayerName,.Night .TopPlayerLoc,.Night .AnaHomeTeam,.Night .AnaAwayTeam{color:#fff;}.Night .TieStats{border-right:2px solid #252c37;border-left:2px solid #252c37;}.Night .PreviousMatch:not(:last-of-type){border-bottom:2px solid #252c37;}.Night .SubNumber span{color:#444!important;}@media screen and (max-width:800px){.StartSquad{height:410px;max-width:620px;}table.standings th:not(:nth-of-type(2)){width:50px;}table.standings th span.team{width:100%;margin-bottom:6px;}.SubName{font-size:14px;}}@media screen and (max-width:650px){.Buttons a span.show,.AnaNameLine.Left,span.AnaNameLine.Right,.PName,table.standings th:nth-of-type(7),table.players th:nth-of-type(3){display:none!important;}span.AnaNameLineName{width:70%;}.SquadsButtonsCo{width:100%;}.Buttons a span.hide{display:block;}.Team-Name,.match-date,div#match-hour,#result-now{width:100px;font-size:14px;}.Team-Logo img{max-width:70px!important;max-height:70px;}.SubSquad{grid-template-columns:repeat(2,1fr);}.StartSquad{height:350px;max-width:550px;}.Player{width:60px;height:60px;margin:0 10px;}.PNumber{top:10px;right:-7px;}.PLogo{width:50px;height:50px;}table.standings th span.team{margin-bottom:0;}}@media screen and (max-width:550px){.StartSquad{height:300px;max-width:450px;}.Player{width:30px;height:30px;}.PNumber{top:-5px;right:-20px;}.PLogo{width:40px;height:40px;}table.standings th span.team{display:flex;flex-direction:column;align-items:center;justify-content:center;}th .team-name,th span.team-logo{width:100%;text-align:center;}table.standings th:nth-of-type(8){display:none;}}@media screen and (max-width:450px){.PNumber{display:none!important;}.SubSquad{grid-template-columns:repeat(1,1fr);}.StartSquad{height:200px;max-width:350px;}.Player{width:30px;height:30px;}.PLogo{width:30px;height:30px;}table.standings th{width:auto!important;}}@media screen and (max-width:400px){.Buttons{margin-top:15px;}.EvenPlayers .EvenPlayersLogo,.Team-Name,span.EvenPlayerImg,span.Competition,.PreName,span.kok2,span.TopPlayerName,.AnaNameLine.Left,span.AnaNameLine.Right,th .team-name,th span.player-name{display:none!important;}.EvenPlayer,.EvenPlayers,.EventType{width:50%!important;}span.EvenPlayerName{font-size:10px;}table.MeetDetailsTable tr th{width:auto;font-size:12px;}.HomeTopPlayer,.AwayTopPlayer{width:15%;}.TopPlayerCenter{width:70%;}span.TopPlayerLogo{height:40px;}span.TopPlayerLogo img{max-width:40px!important;max-height:40px;}span.AnaNameLineName,th span.player-info{width:100%;}.SquadsButtonsCo{font-size:14px;}.SubSquad{grid-template-columns:repeat(1,1fr);}table.players th:nth-of-type(2){width:auto;}th span.player-info{justify-content:center;}}@media screen and (max-width:800px){.StartSquad{height:410px;max-width:620px;}table.standings th:not(:nth-of-type(2)){width:50px;}table.standings th span.team{width:100%;margin-bottom:6px;}.SubName{font-size:14px;}}@media screen and (max-width:650px){.Buttons a span.show,.AnaNameLine.Left,span.AnaNameLine.Right,.PName,table.standings th:nth-of-type(7),table.players th:nth-of-type(3){display:none!important;}span.AnaNameLineName{width:70%;}.SquadsButtonsCo{width:100%;}.Buttons a span.hide{display:block;}.Team-Name,.match-date,div#match-hour,#result-now{width:100px;font-size:14px;}.Team-Logo img{max-width:70px!important;max-height:70px;}.SubSquad{grid-template-columns:repeat(2,1fr);}.StartSquad{height:350px;max-width:550px;}.Player{width:60px;height:60px;margin:0 10px;}.PNumber{top:10px;right:-7px;}.PLogo{width:50px;height:50px;}table.standings th span.team{margin-bottom:0;}}@media screen and (max-width:550px){.StartSquad{height:300px;max-width:450px;}.Player{width:30px;height:30px;}.PNumber{top:-5px;right:-20px;}.PLogo{width:40px;height:40px;}table.standings th span.team{display:flex;flex-direction:column;align-items:center;justify-content:center;}th .team-name,th span.team-logo{width:100%;text-align:center;}table.standings th:nth-of-type(8){display:none;}}@media screen and (max-width:450px){.PNumber{display:none!important;}.SubSquad{grid-template-columns:repeat(1,1fr);}.StartSquad{height:200px;max-width:350px;}.Player{width:30px;height:30px;}.PLogo{width:30px;height:30px;}table.standings th{width:auto!important;}.date,div#match-time,#result{width:120px;}}@media screen and (max-width:400px){.Buttons{margin-top:15px;}.Buttons a:not(:last-child){margin-left:10px;}.EvenPlayers .EvenPlayersLogo,.Team-Name,span.EvenPlayerImg,span.Competition,.PreName,span.kok2,span.TopPlayerName,.AnaNameLine.Left,span.AnaNameLine.Right,th .team-name,th span.player-name{display:none!important;}.EvenPlayer,.EvenPlayers,.EventType{width:50%!important;}span.EvenPlayerName{font-size:10px;}table.MeetDetailsTable tr th{width:auto;font-size:12px;}.HomeTopPlayer,.AwayTopPlayer{width:15%;}.TopPlayerCenter{width:70%;}span.TopPlayerLogo{height:40px;}span.TopPlayerLogo img{max-width:40px!important;max-height:40px;}span.AnaNameLineName,th span.player-info{width:100%;}.SquadsButtonsCo{font-size:14px;}.SubSquad{grid-template-columns:repeat(1,1fr);}table.players th:nth-of-type(2){width:auto;}th span.player-info{justify-content:center;}}
`;
var styleElement = document.createElement('style');
styleElement.textContent = cssText;
document.head.appendChild(styleElement);
}


// دالة أزالة الكود من الصفحة  
(function () {
// التحقق من أن DOM تم تحميله
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", secureLoaderRemoval);
} else {
secureLoaderRemoval();
}

function secureLoaderRemoval() {
try {
var elements = document.querySelectorAll('[id="MalikWebSecretCode"]');
if (elements.length > 0) {
for (var i = 0; i < elements.length; i++) {
var element = elements[i];
if (element.parentNode) {
element.parentNode.removeChild(element); 
}
}
}
if (Object.defineProperty) {
Object.defineProperty(window, 'MalikWebSecretCode', {
get: function () {
return undefined;
},
set: function () {
},
configurable: false
});
} else {
window.MalikWebSecretCode = undefined;
}
clearConsole();
} catch (error) {
}
}
function clearConsole() {
if (typeof console !== "undefined" && typeof console.clear === "function") {
console.clear();
}
}
})();
