let sentence = "Getting Your Response from Gemini!!";
let words = sentence.split(' ');

let currentIndex = 0;

function geminiResponse() {
    var inputQuery = document.getElementById('query-input').value;
    document.getElementById('response-container').innerHTML = '<p style="margin: auto;">' + sentence +
        '</p>';
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure it: specify the type of request and the URL
    xhr.open("POST", "http://localhost/google_gemini/googleGemini/gemini.php?geminiQuery=" + inputQuery, true);
    // Set up a function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 means the request is complete
            if (xhr.status === 200) { // 200 means a successful HTTP response
                // Parse and display the response
                var responseData = JSON.parse(xhr.responseText);
                var textResponse = responseData.candidates[0].content.parts[0].text;
                sentence = textResponse.replace(/\n/g, '<br>');
                words = sentence.split(' ');
                console.log(textResponse);
                submitQuery();
            } else {

            }
        }
    };

    // Send the request
    xhr.send();


}


function submitQuery() {
    if (currentIndex < words.length) {
        const currentWord = words.slice(0, currentIndex + 1).join(' ');
        document.getElementById('response-container').innerHTML = '<p style="margin: auto;">' + currentWord +
            '</p>';
        currentIndex++;
    } else {
        clearInterval(wordInterval);
    }
    var wordInterval = setInterval(submitQuery, 200);
}