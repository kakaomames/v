const apiKey = 'AIzaSyApZ9YhMttem3N0ibnwApn8YeavaNd8zWA';  // ここにAPIキーを入力

function searchVideos() {
    const query = document.getElementById('search-query').value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(videos) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';  // 既存の結果をクリア

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-result');

        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.high.url;
        const videoDescription = video.snippet.description;

        videoElement.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}">
            <h3>${videoTitle}</h3>
            <p>${videoDescription}</p>
        `;

        resultsContainer.appendChild(videoElement);
    });
}
