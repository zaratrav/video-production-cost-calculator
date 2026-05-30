// ===== TAB SWITCHING =====

function switchTab(tabName) {
    document.getElementById('videoTab').classList.remove('active');
    document.getElementById('vfxTab').classList.remove('active');

    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });

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
    var videoType = document.getElementById('videoType').value;
    var duration = parseFloat(document.getElementById('videoDuration').value) || 0;
    var complexity = document.getElementById('videoComplexity').value;
    var crewSize = document.getElementById('crewSize').value;
    var postProduction = document.getElementById('postProduction').value;
    var shootingDays = parseFloat(document.getElementById('shootingDays').value) || 0;

    if (!duration || !shootingDays) return;

    var crewRates = {
        'solo': 800,
        'small': 2500,
        'medium': 5000,
        'large': 8000
    };

    var complexityMultipliers = {
        'basic': 1,
        'medium': 1.4,
        'high': 2.0
    };

    var postRates = {
        'basic': 200,
        'standard': 500,
        'premium': 1500
    };

    var equipmentCosts = {
        'solo': 200,
        'small': 500,
        'medium': 1200,
        'large': 2000
    };

    var crewCost = crewRates[crewSize] * shootingDays * complexityMultipliers[complexity];
    var equipmentCost = equipmentCosts[crewSize] * shootingDays;
    var postCost = postRates[postProduction] * duration;
    var subtotal = crewCost + equipmentCost + postCost;
    var contingency = subtotal * 0.15;
    var totalCost = subtotal + contingency;
    var costPerMinute = totalCost / duration;

    document.getElementById('crewCost').textContent = '$' + Math.round(crewCost).toLocaleString();
    document.getElementById('equipmentCost').textContent = '$' + Math.round(equipmentCost).toLocaleString();
    document.getElementById('postCost').textContent = '$' + Math.round(postCost).toLocaleString();
    document.getElementById('contingencyCost').textContent = '$' + Math.round(contingency).toLocaleString();
    document.getElementById('totalCostVideo').textContent = '$' + Math.round(totalCost).toLocaleString();
    document.getElementById('costPerMinVideo').textContent = '$' + Math.round(costPerMinute).toLocaleString();

    var notes = [];
    if (complexity === 'high') {
        notes.push('High complexity detected: Budget includes advanced equipment and effects');
    }
    if (crewSize === 'solo') {
        notes.push('Solo production: Ensure single person can handle all roles');
    }
    if (shootingDays > 5) {
        notes.push('Multiple shooting days: Budget allows for setup/teardown time');
    }
    if (postProduction === 'premium') {
        notes.push('Premium post-production: Includes color grading and custom motion graphics');
    }

    var notesList = document.getElementById('videoNotes');
    notesList.innerHTML = '';
    for (var i = 0; i < notes.length; i++) {
        var li = document.createElement('li');
        li.textContent = notes[i];
        notesList.appendChild(li);
    }

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
    var vfxType = document.getElementById('vfxType').value;
    var duration = parseInt(document.getElementById('vfxDuration').value) || 0;
    var complexity = document.getElementById('vfxComplexity').value;
    var revisions = parseInt(document.getElementById('vfxRevisions').value) || 1;
    var teamSize = document.getElementById('vfxTeam').value;
    var deadline = document.getElementById('vfxDeadline').value;

    if (!duration) return;

    var baseCosts = {
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

    var teamMultipliers = {
        'freelance': 1,
        'small': 1.2,
        'medium': 1.4,
        'large': 1.6
    };

    var deadlinePremium = {
        'standard': 0,
        'rush': 0.20,
        'urgent': 0.40
    };

    var baseCostPerSec = (baseCosts[vfxType] && baseCosts[vfxType][complexity]) ? baseCosts[vfxType][complexity] : 500;
    var teamMultiplier = teamMultipliers[teamSize];
    var baseAnimationCost = baseCostPerSec * duration * teamMultiplier;

    var revisionCost = baseAnimationCost * 0.10 * (revisions - 1);
    var urgencyCost = baseAnimationCost * deadlinePremium[deadline];

    var subtotal = baseAnimationCost + revisionCost + urgencyCost;
    var contingency = subtotal * 0.10;
    var totalCost = subtotal + contingency;
    var costPerSec = totalCost / duration;

    document.getElementById('animationCost').textContent = '$' + Math.round(baseAnimationCost).toLocaleString();
    document.getElementById('revisionCost').textContent = '$' + Math.round(revisionCost).toLocaleString();
    document.getElementById('urgencyCost').textContent = '$' + Math.round(urgencyCost).toLocaleString();
    document.getElementById('contingencyVFXCost').textContent = '$' + Math.round(contingency).toLocaleString();
    document.getElementById('totalCostVFX').textContent = '$' + Math.round(totalCost).toLocaleString();
    document.getElementById('costPerSecVFX').textContent = '$' + Math.round(costPerSec).toLocaleString();

    var notes = [];
    if (complexity === 'premium') {
        notes.push('Premium quality detected: Includes photoreal rendering and cinematic quality');
    }
    if (deadline !== 'standard') {
        notes.push((deadline === 'rush' ? '20' : '40') + '% urgency premium applied');
    }
    if (revisions > 2) {
        notes.push(revisions + ' revision rounds included: Additional revisions cost extra');
    }
    if (teamSize === 'large') {
        notes.push('Large studio team: Higher cost but faster turnaround and quality');
    }
    if (duration > 300) {
        notes.push('Long-form animation: Consider breaking into episodes to optimize cost');
    }

    var notesList = document.getElementById('vfxNotes');
    notesList.innerHTML = '';
    for (var i = 0; i < notes.length; i++) {
        var li = document.createElement('li');
        li.textContent = notes[i];
        notesList.appendChild(li);
    }

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

// ===== PROJECT COMPLEXITY SCORER =====

(function () {

    var pcsAnswers = {};

    var pcsTiers = [
        {
            min: 4,
            max: 7,
            tier: 'Budget',
            cls: 'tier-budget',
            range: '$1,000 - $5,000',
            desc: 'Freelancer or small crew. Good for internal use, social content, and simple interviews.'
        },
        {
            min: 8,
            max: 11,
            tier: 'Mid-Range',
            cls: 'tier-mid',
            range: '$5,000 - $25,000',
            desc: 'Professional crew and post-production. Suitable for brand videos, commercials, and standard animations.'
        },
        {
            min: 12,
            max: 13,
            tier: 'Premium',
            cls: 'tier-premium',
            range: '$25,000 - $100,000',
            desc: 'Broadcast-quality production. Multi-location shoots, color grading, motion graphics, advanced VFX.'
        },
        {
            min: 14,
            max: 16,
            tier: 'Cinematic',
            cls: 'tier-cinematic',
            range: '$100,000+',
            desc: 'High-end commercial or cinematic VFX. Full studio team, photoreal CGI, tight deadlines.'
        }
    ];

    function pcsInit() {
        var groups = document.querySelectorAll('.pcs-pills');
        for (var i = 0; i < groups.length; i++) {
            (function (group) {
                var pills = group.querySelectorAll('.pcs-pill');
                for (var j = 0; j < pills.length; j++) {
                    pills[j].addEventListener('click', function () {
                        var siblings = group.querySelectorAll('.pcs-pill');
                        for (var k = 0; k < siblings.length; k++) {
                            siblings[k].classList.remove('selected');
                        }
                        this.classList.add('selected');
                        pcsAnswers[group.getAttribute('data-key')] = parseInt(this.getAttribute('data-val'), 10);
                        group.closest('.pcs-question').classList.add('answered');
                        pcsCheck();
                    });
                }
            })(groups[i]);
        }
    }

    function pcsCheck() {
        var keys = ['type', 'duration', 'quality', 'timeline'];
        for (var i = 0; i < keys.length; i++) {
            if (!pcsAnswers[keys[i]]) return;
        }
        var score = pcsAnswers.type + pcsAnswers.duration + pcsAnswers.quality + pcsAnswers.timeline;
        pcsShow(score);
    }

    function pcsShow(score) {
        var tier = pcsTiers[0];
        for (var i = 0; i < pcsTiers.length; i++) {
            if (score >= pcsTiers[i].min && score <= pcsTiers[i].max) {
                tier = pcsTiers[i];
                break;
            }
        }

        var badge  = document.getElementById('pcsBadge');
        var range  = document.getElementById('pcsRange');
        var desc   = document.getElementById('pcsDesc');
        var result = document.getElementById('pcsResult');

        if (!badge || !range || !desc || !result) return;

        badge.className   = 'pcs-tier-badge ' + tier.cls;
        badge.textContent = tier.tier;
        range.textContent = tier.range;
        desc.textContent  = tier.desc;

        result.classList.add('visible');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    window.pcsReset = function () {
        pcsAnswers = {};

        var pills = document.querySelectorAll('.pcs-pill');
        for (var i = 0; i < pills.length; i++) {
            pills[i].classList.remove('selected');
        }

        var questions = document.querySelectorAll('.pcs-question');
        for (var i = 0; i < questions.length; i++) {
            questions[i].classList.remove('answered');
        }

        var result = document.getElementById('pcsResult');
        if (result) result.classList.remove('visible');
    };

    document.addEventListener('DOMContentLoaded', pcsInit);

})();

// ===== INITIALIZE =====

document.addEventListener('DOMContentLoaded', function () {
    calculateVideo();
    calculateVFX();
});
