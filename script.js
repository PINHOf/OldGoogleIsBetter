// ==UserScript==
// @name         OldGoogleIsBetter
// @namespace    google
// @version      0.2
// @description  Old google results is better
// @author       PINHOf
// @license      MIT
// @supportURL   https://github.com/PINHOf/OldGoogleIsBetter
// @match        https://*.google.com/search?*
// @include      /^https?://(?:www|encrypted|ipv[46])\.google\.[^/]+/(?:$|[#?]|search|webhp)/
// @grant        none
// @run-at       document-start
// ==/UserScript==


// Starts observing the search results
function startObservingResults(cl)
{
	console.log('OldGoogleIsBetter: starting to observe results');

	const observer = new MutationObserver(function(mutations)
	{
		const el = document.querySelector(`${cl}:not(.old-google-is-better)`);

		if (!el)
			return;

		console.log('OldGoogleIsBetter: found search container');

		// Applies a class to the element
		el.classList.add('old-google-is-better');

		beautifyResults(el);
		removeImagesContainer(el);
	});

	const config = { subtree: true, childList: true };
	observer.observe(document, config);
}

// Starts observing the search results feedback container
function startObservingFeedback()
{
	console.log('OldGoogleIsBetter: starting to observe feedback');

	const observer = new MutationObserver(function(mutations)
	{
		const el = document.querySelector('.Wt5Tfe');

		if (!el)
			return;

		console.log('OldGoogleIsBetter: found search feedback container');

		// Removes the entire feedback container
		el.closest('.TzHB6b')?.remove();
		el.remove();

		console.log('OldGoogleIsBetter: removed search feedback container');
	});

	const config = { subtree: true, childList: true };
	observer.observe(document, config);
}

// Starts observing the search results related container
function startObservingRelated()
{
	console.log('OldGoogleIsBetter: starting to observe related');

	const observer = new MutationObserver(function(mutations)
	{
		const el = document.getElementById('bres');

		if (!el)
			return;

		console.log('OldGoogleIsBetter: found search related container');

		// Removes the entire related container
		el.remove();

		console.log('OldGoogleIsBetter: removed search related container');
	});

	const config = { subtree: true, childList: true };
	observer.observe(document, config);
}

// Beautifies all the results as old google
function beautifyResults(el)
{
	console.log('OldGoogleIsBetter: beautifying results');

	const url = getUrl(el);

	removeHeaderInformation(el);
	removeUnnecessaryLineBreak(el);
	adjustTitle(el);
	appendUrlAfterTitle(el, url);
}

function removeImagesContainer(el)
{
	const imgs = el.querySelector('img');
	
	if (imgs)
		el.remove();
}

// Extracts the URL from the <a href> result
function getUrl(el)
{
	const linkEl = el.querySelector('a');
	const url = linkEl ? linkEl.getAttribute('href') : '';

	console.log(`OldGoogleIsBetter: extracting url ${url}`);

	return url;
}

// Removes the header information (icon; url; three dots; etc)
function removeHeaderInformation(el)
{
	el.querySelectorAll('.TbwUpd').forEach((elem) => elem.remove());
	el.querySelectorAll('.B6fmyf').forEach((elem) => elem.remove());

	console.log('OldGoogleIsBetter: removing header information');
}

// Removes extra <br> tags
function removeUnnecessaryLineBreak(el)
{
	const link = el.querySelector('a');

	if (link)
		link.querySelectorAll('br').forEach((elem) => elem.remove());

	console.log('OldGoogleIsBetter: removing unecessary <br> tags');
}

// Adjusts the title style
function adjustTitle(el)
{
	const titleEl = el.querySelector('.LC20lb');

	if (titleEl)
    {
		titleEl.style.marginTop = '0px';
        titleEl.style.fontSize = '19px';
    }

	console.log('OldGoogleIsBetter: adjusting title');
}

// Appends the URL after the title in a green color
function appendUrlAfterTitle(el, url)
{
	const titleParentEl = el.querySelector('.yuRUbf');
	const newEl = document.createElement('a');
	newEl.setAttribute('href', url);
	newEl.innerHTML = url;
	newEl.style.color = '#006621';
	newEl.style.fontSize = '15px';
	newEl.style.display = 'block';

	if (titleParentEl)
	{
		const parent = titleParentEl.parentElement;
		const totalLinks = parent.querySelectorAll('a').length;

	   if (totalLinks == 1)
		   titleParentEl.after(newEl);
	}

	console.log('OldGoogleIsBetter: appending url after title');
}

(function()
{
	startObservingResults('.TzHB6b');
	startObservingResults('.MjjYud');
	startObservingFeedback();
	startObservingRelated();
})();