// Toggle fullscreen mode
function toggleFullscreen() {
    const popup = document.getElementById('popupCard');
    if (!document.fullscreenElement) {
        popup.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Open popup
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popupCard').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popupCard').style.display = 'none';
}

// Submit test and calculate results
function submitTest() {
    const form = document.getElementById('practiceTestForm');
    const formData = new FormData(form);
    let score = 0;
    let totalQuestions = 10;
    
    // MCQ Score Calculation
    for (let i = 1; i <= 5; i++) {
        if (formData.get(`mcq${i}`) === '1') score += 4;
        else score -= 1;
    }

    // Subjective Questions are assumed to be automatically correct for this example
    score += 20; // Add 20 points (5 questions x 4 marks each)

    const totalMarks = totalQuestions * 4;
    const percentage = ((score / totalMarks) * 100).toFixed(2);

    let grade = '';
    if (percentage < 40) {
        grade = 'Fail';
    } else if (percentage < 45) {
        grade = 'Below Average';
    } else if (percentage < 50) {
        grade = 'Average';
    } else if (percentage < 60) {
        grade = 'Good';
    } else if (percentage < 70) {
        grade = 'Very Good';
    } else if (percentage < 80) {
        grade = 'Star';
    } else if (percentage < 90) {
        grade = 'Excellent';
    } else {
        grade = 'Outstanding';
    }

    document.getElementById('obtainedMarks').innerText = `Obtained Marks: ${score}`;
    document.getElementById('totalMarks').innerText = `Total Marks: ${totalMarks}`;
    document.getElementById('percentage').innerText = `Percentage: ${percentage}%`;
    document.getElementById('grade').innerText = `Grade: ${grade}`;
    document.getElementById('result').classList.remove('hidden');
}