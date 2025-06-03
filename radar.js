function generateRadarChart(skills, containerId) {
	const radius = 100;
	const centerX = 200;
	const centerY = 200;
	const levels = 4; // Number of grid layers
	const total = skills.length;
	const angleStep = 360 / total;

	function polarToCartesian(angle, value) {
		const rad = (angle - 90) * Math.PI / 180;
		const r = value * radius;
		return [
			centerX + r * Math.cos(rad),
			centerY + r * Math.sin(rad)
		];
	}

	let svg = `<svg viewBox="0 0 400 400">`;

	// Draw grid layers
	for (let l = 1; l <= levels; l++) {
		const points = skills.map((_, i) => {
			const angle = angleStep * i;
			const [x, y] = polarToCartesian(angle, l / levels);
			return `${x},${y}`;
		}).join(" ");
		svg += `<polygon points="${points}" class="grid" />`;
	}

	// Draw skill shape
	const skillPointsCoords = skills.map((skill, i) => {
		const angle = angleStep * i;
		return polarToCartesian(angle, skill.value);
	});

	const skillPoints = skillPointsCoords.map(([x, y]) => `${x},${y}`).join(" ");
	svg += `<polygon points="${skillPoints}" class="skill" />`;

	// Add dots on skill points
	skillPointsCoords.forEach(([x, y]) => {
		svg += `<circle cx="${x}" cy="${y}" r="2.5" fill="rgba(var(--accent-rgb), 1)" />`;
	});

	// Add skill labels
	skills.forEach((skill, i) => {
		const angle = angleStep * i;
		const [x, y] = polarToCartesian(angle, 1.2);
		svg += `<text x="${x}" y="${y}" text-anchor="middle" class="label-chart">${skill.name}</text>`;
	});

	for (let i = 0; i < total; i++) {
		const angle = angleStep * i;
		const [x, y] = polarToCartesian(angle, 1);  // value=1 for full length
		svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#888" stroke-width="1" />`;
	}
	svg += `</svg>`;
	document.getElementById(containerId).innerHTML = svg;
}
