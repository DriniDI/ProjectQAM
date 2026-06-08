const facilityList = document.getElementById('facility-list');
const boroughSelect = document.getElementById('boroughSelect');
const zipInput = document.getElementById('zipInput');
const facilityCount = document.getElementById('facility-count');

let allFacilities = [];

function updateResults() {
  const borough = boroughSelect.value;
  const zipCode = zipInput.value.trim();

  const filteredFacilities = allFacilities.filter(function (facility) {
    const matchesBorough = borough === 'ALL' || facility.borough === borough;
    const matchesZip = !zipCode || String(facility.postcode || '').includes(zipCode);
    return matchesBorough && matchesZip;
  });

  renderFacilities(filteredFacilities, facilityList);
  facilityCount.textContent = filteredFacilities.length + ' facilities found';
}

async function initFacilities() {
  allFacilities = await loadFacilities();
  updateResults();
}

boroughSelect.addEventListener('change', updateResults);
zipInput.addEventListener('input', updateResults);

initFacilities();
