const countEl = document.getElementById('facility-count');

async function buildAnalytics() {
  const facilities = await loadFacilities();
  const totals = facilities.reduce(function (acc, facility) {
    const borough = facility.borough || 'Unknown';
    acc[borough] = (acc[borough] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(totals).sort();
  const values = labels.map(function (label) { return totals[label]; });

  countEl.textContent = facilities.length + ' total facilities';

  const barCtx = document.getElementById('boroughChart');

  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Facilities by Borough',
          data: values,
          backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'],
          borderColor: '#111827',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });

  }
}

buildAnalytics();
