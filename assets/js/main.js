/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center',
							'images/bg03.jpg': 'center'
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Events.
			// Note: If you're *not* using AJAX, get rid of this event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Hide message.
						$message._hide();

					// Disable submit.
						$submit.disabled = true;

					// Process form.
					// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// but there's enough here to piece together a working AJAX submission call that does.
						window.setTimeout(function() {

							// Reset form.
								$form.reset();

							// Enable submit.
								$submit.disabled = false;

							// Show message.
								$message._show('success', 'Searching...');
								//$message._show('failure', 'Something went wrong. Please try again.');

						}, 750);

				});

		})();

})()


document.querySelector('.exit-button').addEventListener('click', closePopup) 

function closePopup() {
	document.querySelector('.popup-box').style.display = 'none'
	window.location.reload()
}


const API_KEY = 'H2saLikjgqyggPxWdtx8hw0bMYhiHBVJ0rmh7Snl'
const submitForm = document.getElementById('signup-form')
submitForm.addEventListener('submit', getResults)

async function getResults() {

	////Grab form submission data and use it to fetch Watchmode API. If form field is blank, hard return////
	let formData = new FormData(submitForm)
	const userInput = Object.fromEntries(formData).title.split(' ').join('%20')
	if (!userInput) return

	////Fetch title ID, year, and name then plug into popup h1////
	const titleSearchURL = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${userInput}`
	const titleSearchResponse = await fetch(titleSearchURL)
	const titleSearchData = await titleSearchResponse.json()
	// console.log(titleSearchData)

	const [titleID, titleYear, titleName] = 
	
		[titleSearchData.title_results[0].id, titleSearchData.title_results[0].year, titleSearchData.title_results[0].name]
	
	document.getElementById('results-title').textContent = `${titleName} (${titleYear})`


	////Fetch title details and plug into popup////
	const titleDetailsURL = `https://api.watchmode.com/v1/title/${titleID}/details/?apiKey=${API_KEY}`
	const titleDetailsResponse = await fetch(titleDetailsURL)
	const titleDetailsData = await titleDetailsResponse.json()
	// console.log(titleDetailsData)

	const [titlePlot, titleScore, titlePoster, similarTitles, trailerLink] = 
	
		[titleDetailsData.plot_overview, titleDetailsData.critic_score, titleDetailsData.poster, 
		 titleDetailsData.similar_titles, titleDetailsData.trailer]
	
	const trailerID = trailerLink.split('=')[1]																					
	
	
	document.getElementById('poster').src = titlePoster
	document.getElementById('plot-overview').textContent = titlePlot
	document.getElementById('title-trailer').src = `https://www.youtube.com/embed/${trailerID}`


	//Streaming sources
	const titleSourcesURL = `https://api.watchmode.com/v1/title/${titleID}/sources/?apiKey=${API_KEY}`
	const titleSourcesResponse = await fetch(titleSourcesURL)	
	const titleSourcesData = await titleSourcesResponse.json()	
	// console.log(titleSourcesData)
	const subOrFree = titleSourcesData.filter(entry => entry.type === 'sub' || entry.type === 'free')
	console.log(subOrFree)

	if (subOrFree.length === 0) {
		document.querySelector('.title-unavailable').style.display = 'block'
		
		// similarTitles.filter((_, ind) => ind < 5)
		// similarTitles.forEach(entry => {
		// 	const newList = document.createElement('li')
		// 	newList.textContent = entry.title

		// 	document.querySelector('.title-unavailable').appendChild(newList)
		// })
	}
	
	const streamSourcesURL = `https://api.watchmode.com/v1/sources/?apiKey=${API_KEY}`
	const streamSourcesResponse = await fetch(streamSourcesURL)
	const streamSourcesData = await streamSourcesResponse.json()
	console.log(streamSourcesData)

	//Add new li element for each entry in the subOrFree array		
	subOrFree.forEach((entry, ind) => {

		const li = document.createElement('li')
		li.classList.add(`streaming-service-${ind + 1}`)

		const logo = document.createElement('img')
		logo.classList.add(`stream-logo${ind + 1}`)
		logo.src = streamSourcesData.find(streamSrc => streamSrc.id === entry.source_id).logo_100px

		const playButton = document.createElement('img')
		playButton.classList.add('play-button')
		playButton.src = 'https://img.icons8.com/color/48/next.png'

		const span = document.createElement('span')
		span.textContent = `${entry.name} (${entry.type === 'sub' ? 'subscription' : 'free'})`

		const playURL = document.createElement('a')
		playURL.classList.add(`playlink-${ind + 1}`)
		playURL.href = entry.web_url
		playURL.target ='_blank'

		document.querySelector('.stream-sources').appendChild(li)
		document.querySelector(`.streaming-service-${ind + 1}`).appendChild(logo)
		document.querySelector(`.streaming-service-${ind + 1}`).appendChild(span)
		document.querySelector(`.streaming-service-${ind + 1}`).appendChild(playURL)
		document.querySelector(`.playlink-${ind + 1}`).appendChild(playButton)

	})


	////Fetch top four actors and plug headshot and name/role into popup////
	const titleCastAndCrewURL = `https://api.watchmode.com/v1/title/${titleID}/cast-crew/?apiKey=${API_KEY}`
	const titleCastAndCrewResponse = await fetch(titleCastAndCrewURL)
	const titleCastAndCrewData = await titleCastAndCrewResponse.json()
	console.log(titleCastAndCrewData)
	const titleDirector = titleCastAndCrewData.filter(entry => entry.role === 'Director' || (entry.role.includes('Director,') && !entry.role.includes('Director of') && !entry.role.includes('Assistant') && !entry.role.includes('Art Director')) || (entry.role.split('').slice(-10).join('') === ', Director'))

	console.log(titleDirector)
	if (titleDetailsData.type === 'movie') {
		document.getElementById('director').textContent = `dir. ${titleDirector.length === 1 ? titleDirector[0].full_name : `${titleDirector[0].full_name} & ${titleDirector[1].full_name}`}`
		document.getElementById('director').style.display = 'block'
	}
	
	
	const titleCastAll = titleCastAndCrewData.filter(entry => entry.type === 'Cast')
	const topCast = titleCastAll.filter((_, ind) => ind < 10)
	console.log(titleCastAll)

	topCast.forEach((entry,ind) => {
		const headshot = document.getElementById(`headshot-${String(ind + 1)}`)
		const name = document.getElementById(`name-${String(ind + 1)}`)
		const role = document.getElementById(`role-${String(ind + 1)}`)
		headshot.src = entry.headshot_url
		name.textContent = entry.full_name
		role.textContent = entry.role
	})
	


	////Set popup display to 'block'  on last line so that the data fetches have more time to resolve/populate before popup appears.//// 
	document.querySelector('.popup-box').style.display = "block"			 
}

// If user doesn't find shows available for free, or they're unavailable on their preferred services, fetch recommendations. 

// async function getRecentTitles() {

// 	const recentTitlesURL = `https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}`
// 	const recentTitlesResponse = await fetch(recentTitlesURL)
// 	const recentTitlesData = await recentTitlesResponse.json()

// 	let today = new Date
// 	const newlyReleased = recentTitlesData.releases.filter(entry => new Date(entry.source_release_date) <= today)

// 	const [recentMovies, recentShows] = [newlyReleased.filter(entry => entry.type === 'movie'),
// 								         newlyReleased.filter(entry => entry.tmdb_type === 'tv')]

// 	console.log(recentMovies)
// 	recentMovies.forEach((entry, ind) => {
// 		const newList = document.createElement('li')
// 		newList.textContent = entry.title

// 		document.querySelector('.title-unavailable').appendChild(newList)
// 	})
	
	
// }