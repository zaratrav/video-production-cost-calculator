// ===== TAB SWITCHING =====

function switchTab(tabName) {
    // Hide all tabs
    document.getElementById('videoTab').classList.remove('active');
    document.getElementById('vfxTab').classList.remove('active');
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    if (tabName === 'video') {
        document.getElementById('videoTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
    } else {
        document.getElementById('vfxTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
    }
}

// ===== VIDEO PRODUCTION CALCULATOR =====

function calculateVideo() {
    const videoType = document.getElementById('videoType').value;
    const duration = parseFloat(document.getElementById('videoDuration').value) || 0;
    const complexity = document.getElementById('videoComplexity').value;
    const crewSize = document.getElementById('crewSize').value;
    const postProduction = document.getElementById('postProduction').value;
    const shootingDays = parseFloat(document.getElementById('shootingDays').value) || 0;

    if (!duration || !shootingDays) return;

    // Base rates by crew size (daily)
    const crewRates = {
        'solo': 800,
        'small': 2500,
        'medium': 5000,
        'large': 8000
    };

    // Complexity multipliers
    const complexityMultipliers = {
        'basic': 1,
        'medium': 1.4,
        'high': 2.0
    };

    // Post-production base rates (per minute)
    const postRates = {
        'basic': 200,
        'standard': 500,
        'premium': 1500
    };

    // Equipment rental (daily)
    const equipmentCosts = {
        'solo': 200,
        'small': 500,
        'medium': 1200,
        'large': 2000
    };

    // Calculate components
    const crewCost = crewRates[crewSize] * shootingDays * complexityMultipliers[complexity];
    const equipmentCost = equipmentCosts[crewSize] * shootingDays;
    const postCost = postRates[postProduction] * duration;
    const subtotal = crewCost + equipmentCost + postCost;
    const contingency = subtotal * 0.15;
    const totalCost = subtotal + contingency;
    const costPerMinute = totalCost / duration;

    // Display results
    document.getElementById('crewCost').textContent = '$' + Math.round(crewCost).toLocaleString();
    document.getElementById('equipmentCost').textContent = '$' + Math.round(equipmentCost).toLocaleString();
    document.getElementById('postCost').textContent = '$' + Math.round(postCost).toLocaleString();
    document.getElementById('contingencyCost').textContent = '$' + Math.round(contingency).toLocaleString();
    document.getElementById('totalCostVideo').textContent = '$' + Math.round(totalCost).toLocaleString();
    document.getElementById('costPerMinVideo').textContent = '$' + Math.round(costPerMinute).toLocaleString();

    // Notes
    const notes = [];
    if (complexity === 'high') {
        notes.push('✓ High complexity detected: Budget includes advanced equipment and effects');
    }
    if (crewSize === 'solo') {
        notes.push('✓ Solo production: Ensure single person can handle all roles');
    }
    if (shootingDays > 5) {
        notes.push('✓ Multiple shooting days: Budget allows for setup/teardown time');
    }
    if (postProduction === 'premium') {
        notes.push('✓ Premium post-production: Includes color grading and custom motion graphics');
    }
    
    const notesList = document.getElementById('videoNotes');
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });

    document.getElementById('videoResults').style.display = 'block';
}

function setVideoScenario(type, duration, complexity, crew, post, days) {
    document.getElementById('videoType').value = type;
    document.getElementById('videoDuration').value = duration;
    document.getElementById('videoComplexity').value = complexity;
    document.getElementById('crewSize').value = crew;
    document.getElementById('postProduction').value = post;
    document.getElementById('shootingDays').value = days;
    calculateVideo();
    document.getElementById('videoResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== VFX & ANIMATION CALCULATOR =====

function calculateVFX() {
    const vfxType = document.getElementById('vfxType').value;
    const duration = parseInt(document.getElementById('vfxDuration').value) || 0;
    const complexity = document.getElementById('vfxComplexity').value;
    const revisions = parseInt(document.getElementById('vfxRevisions').value) || 1;
    const teamSize = document.getElementById('vfxTeam').value;
    const deadline = document.getElementById('vfxDeadline').value;

    if (!duration) return;

    // Base cost per second by type and complexity
    const baseCosts = {
        '2d-animation': {
            'simple': 150,
            'moderate': 300,
            'complex': 600,
            'premium': 1000
        },
        '3d-animation': {
            'simple': 300,
            'moderate': 800,
            'complex': 1500,
            'premium': 3000
        },
        'motion-graphics': {
            'simple': 100,
            'moderate': 250,
            'complex': 500,
            'premium': 1200
        },
        'vfx-effects': {
            'simple': 250,
            'moderate': 800,
            'complex': 2000,
            'premium': 5000
        },
        'cgi-character': {
            'simple': 400,
            'moderate': 1200,
            'complex': 3000,
            'premium': 7000
        },
        'product-visualization': {
            'simple': 300,
            'moderate': 800,
            'complex': 2000,
            'premium': 4000
        },
        'architectural': {
            'simple': 200,
            'moderate': 600,
            'complex': 1500,
            'premium': 3500
        }
    };

    // Team size multiplier
    const teamMultipliers = {
        'freelance': 1,
        'small': 1.2,
        'medium': 1.4,
        'large': 1.6
    };

    // Deadline premium
    const deadlinePremium = {
        'standard': 0,
        'rush': 0.20,
        'urgent': 0.40
    };

    // Calculate base cost
    const baseCostPerSec = baseCosts[vfxType][complexity] || 500;
    const teamMultiplier = teamMultipliers[teamSize];
    const baseAnimationCost = baseCostPerSec * duration * teamMultiplier;
    
    // Revisions cost (10% per revision)
    const revisionCost = baseAnimationCost * 0.10 * (revisions - 1);
    
    // Urgency premium
    const urgencyCost = baseAnimationCost * deadlinePremium[deadline];
    
    // Contingency
    const subtotal = baseAnimationCost + revisionCost + urgencyCost;
    const contingency = subtotal * 0.10;
    const totalCost = subtotal + contingency;
    const costPerSec = totalCost / duration;

    // Display results
    document.getElementById('animationCost').textContent = '$' + Math.round(baseAnimationCost).toLocaleString();
    document.getElementById('revisionCost').textContent = '$' + Math.round(revisionCost).toLocaleString();
    document.getElementById('urgencyCost').textContent = '$' + Math.round(urgencyCost).toLocaleString();
    document.getElementById('contingencyVFXCost').textContent = '$' + Math.round(contingency).toLocaleString();
    document.getElementById('totalCostVFX').textContent = '$' + Math.round(totalCost).toLocaleString();
    document.getElementById('costPerSecVFX').textContent = '$' + Math.round(costPerSec).toLocaleString();

    // Notes
    const notes = [];
    if (complexity === 'premium') {
        notes.push('✓ Premium quality detected: Includes photoreal rendering and cinematic quality');
    }
    if (deadline !== 'standard') {
        notes.push(`✓ ${deadline === 'rush' ? '20' : '40'}% urgency premium applied`);
    }
    if (revisions > 2) {
        notes.push(`✓ ${revisions} revision rounds included: Additional revisions cost extra`);
    }
    if (teamSize === 'large') {
        notes.push('✓ Large studio team: Higher cost but faster turnaround and quality');
    }
    if (duration > 300) {
        notes.push('✓ Long-form animation: Consider breaking into episodes to optimize cost');
    }
    
    const notesList = document.getElementById('vfxNotes');
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });

    document.getElementById('vfxResults').style.display = 'block';
}

function setVFXScenario(type, duration, complexity, revisions, team, deadline) {
    document.getElementById('vfxType').value = type;
    document.getElementById('vfxDuration').value = duration;
    document.getElementById('vfxComplexity').value = complexity;
    document.getElementById('vfxRevisions').value = revisions;
    document.getElementById('vfxTeam').value = team;
    document.getElementById('vfxDeadline').value = deadline;
    calculateVFX();
    document.getElementById('vfxResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    calculateVideo();
    calculateVFX();
});
