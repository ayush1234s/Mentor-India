const correctAnswers = {
    mcq1: 'a',
    mcq2: 'd',
    mcq3: 'a',
    mcq4: 'a',
    mcq5: 'a'
};

function openTestPopup() {
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popupCard').style.display = 'block';
}

function closeTestPopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popupCard').style.display = 'none';
}

function toggleFullscreen() {
    const popupCard = document.getElementById('popupCard');
    popupCard.classList.toggle('fullscreen');
    const isFullscreen = popupCard.classList.contains('fullscreen');
    document.querySelector('.popup-card button i').className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
}

function submitTest() {
    const form = document.getElementById('testForm');
    const resultDiv = document.getElementById('result');
    let totalMarks = 40;
    let obtainedMarks = 0;

    // Check MCQ answers
    for (let i = 1; i <= 5; i++) {
        const selectedOption = form.querySelector(`input[name="mcq${i}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === correctAnswers[`mcq${i}`]) {
                obtainedMarks += 4;
            } else {
                obtainedMarks -= 1;
            }
        } else {
            obtainedMarks -= 1; // No answer selected
        }
    }

    // Show results
    document.getElementById('obtainedMarks').textContent = `Obtained Marks: ${Math.max(0, obtainedMarks)}`;
    document.getElementById('totalMarks').textContent = `Total Marks: ${totalMarks}`;
    document.getElementById('grade').textContent = `Grade: ${getGrade(obtainedMarks, totalMarks)}`;
    resultDiv.classList.remove('hidden');
}

function getGrade(obtainedMarks, totalMarks) {
    const percentage = (obtainedMarks / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'F';
}