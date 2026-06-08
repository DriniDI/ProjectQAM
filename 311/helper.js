async function loadFacilities() {
	try {
		const res = await fetch('311.json');
		if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
		const data = await res.json();
		return Array.isArray(data) ? data : [];
	} catch (err) {
		console.error('loadFacilities error:', err);
		return [];
	}
}

function renderFacilities(facilities, container) {
	container.innerHTML = '';
	if (!facilities || facilities.length === 0) {
		container.innerHTML = '<div class="empty-state">No facilities found.</div>';
		return;
	}

	facilities.forEach(function (f) {
		const card = document.createElement('div');
		card.className = 'facility-card';

		const title = document.createElement('h3');
		title.textContent = f.facilityname || 'Unnamed facility';
		card.appendChild(title);

		const addrLine = document.createElement('div');
		addrLine.className = 'facility-row';
		addrLine.textContent = (f.facilityaddress || '') + (f.facilityaddress ? ', ' : '') + (f.borough || '') + ' ' + (f.postcode || '');
		card.appendChild(addrLine);

		const details = document.createElement('div');
		details.className = 'facility-row';
		details.style.fontSize = '0.9rem';
		const parts = [];
		if (f.community_board) parts.push('Community Board: ' + f.community_board);
		if (f.community_council) parts.push('Council: ' + f.community_council);
		if (f.census_tract) parts.push('Census Tract: ' + f.census_tract);
		if (f.nta) parts.push('NTA: ' + f.nta);
		if (f.bin || f.bbl) parts.push('BIN/BBL: ' + (f.bin || '') + (f.bin && f.bbl ? ' / ' : '') + (f.bbl || ''));
		details.textContent = parts.join(' • ');
		card.appendChild(details);

		container.appendChild(card);
	});
}

window.loadFacilities = loadFacilities;
window.renderFacilities = renderFacilities;
