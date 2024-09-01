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
    
    // Title
    doc.setFontSize(22);
    doc.text('HTML Introduction Notes', 10, 10);
    
    // Add content
    doc.setFontSize(16);
    doc.text(`HTML stands for HyperText Markup Language. It is the standard language used to create and design webpages. HTML structures a webpage and its content through a series of elements or tags.`, 10, 20);
    
    doc.setFontSize(14);
    doc.text('Key Concepts:', 10, 30);
    doc.setFontSize(12);
    doc.text('- Elements: Building blocks of HTML. Examples include <div>, <span>, and <a>.', 10, 40);
    doc.text('- Attributes: Provide additional information about elements. Example: <a href="url">.', 10, 50);
    doc.text('- Tags: HTML elements are wrapped in tags. Example: <h1>Heading</h1>.', 10, 60);
    
    doc.setFontSize(14);
    doc.text('Basic Structure:', 10, 70);
    doc.setFontSize(12);
    doc.text('&lt;!DOCTYPE html&gt;\n&lt;html lang="en"&gt;\n&lt;head&gt;\n    &lt;meta charset="UTF-8"&gt;\n    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;\n    &lt;title&gt;Document Title&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;h1&gt;Hello World&lt;/h1&gt;\n&lt;/body&gt;\n&lt;/html&gt;', 10, 80);
    
    doc.setFontSize(14);
    doc.text('Common Tags:', 10, 120);
    doc.setFontSize(12);
    doc.text('- &lt;h1&gt; to &lt;h6&gt;: Header tags with varying sizes.', 10, 130);
    doc.text('- &lt;p&gt;: Paragraph tag.', 10, 140);
    doc.text('- &lt;a&gt;: Anchor tag for links.', 10, 150);
    doc.text('- &lt;img&gt;: Tag to display images.', 10, 160);
    
    // Signature
    doc.setFontSize(12);
    doc.text('Signature:', 10, 190);
    doc.setFontSize(12);
    doc.text('Ayush Srivastava', 10, 200);
    
    // Save PDF
    doc.save('HTML_Introduction_Notes.pdf');
}