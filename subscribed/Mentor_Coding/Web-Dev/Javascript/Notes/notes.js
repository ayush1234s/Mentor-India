 // Function to open the popup
 function openPopup() {
    document.getElementById('popupCard').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupCard').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none';
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    const popupCard = document.getElementById('popupCard');
    popupCard.classList.toggle('fullscreen');
    const icon = popupCard.querySelector('button i');
    if (popupCard.classList.contains('fullscreen')) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
}

// Function to download notes as PDF
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add custom header
    doc.setFontSize(22);
    doc.text('Mentor India', 10, 10);
    
    // Title
    doc.setFontSize(18);
    doc.text('JavaScript Introduction Notes', 10, 20);
    
    // Add content
    doc.setFontSize(16);
    doc.text(`JavaScript is a versatile programming language primarily used for enhancing the interactivity of websites. It allows developers to implement dynamic features like interactive forms, animations, and even complex web applications.`, 10, 30);
    
    doc.setFontSize(14);
    doc.text('Key Concepts:', 10, 50);
    doc.setFontSize(12);
    doc.text('- Variables: Containers for storing data values. Example: let x = 5;', 10, 60);
    doc.text('- Functions: Blocks of code designed to perform a particular task. Example: function myFunction() { }', 10, 70);
    doc.text('- Events: Actions that can be detected and handled by JavaScript, such as clicks or keystrokes.', 10, 80);
    
    doc.setFontSize(14);
    doc.text('Basic Structure:', 10, 90);
    doc.setFontSize(12);
    doc.text('&lt;script&gt;\nfunction myFunction() {\n    alert(\'Hello, world!\');\n}\n&lt;/script&gt;', 10, 100);
    
    doc.setFontSize(14);
    doc.text('Common Methods:', 10, 130);
    doc.setFontSize(12);
    doc.text('- document.getElementById(): Selects an HTML element by its ID.', 10, 140);
    doc.text('- addEventListener(): Attaches an event handler to an element.', 10, 150);
    doc.text('- console.log(): Outputs messages to the web console for debugging.', 10, 160);
    
    // Add custom footer
    doc.setFontSize(12);
    doc.text('Admin - Ayush Srivastava', 10, 200);
    
    // Save PDF
    doc.save('JavaScript_Introduction_Notes.pdf');
}