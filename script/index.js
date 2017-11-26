var tr = document.getElementsByTagName("tr"),
    count = 9,
    title,
    titles = [],
    playingIndex = 0;
if (tr[0]) {
    var prevFooter = document.getElementsByClassName("prev-footer")[0],
        nextFooter = document.getElementsByClassName("next-footer")[0];
    for (var i = 1; i <= count; i++) {
        tr[i].getElementsByTagName("td")[0].innerHTML = i + '';
        title = tr[i].getElementsByTagName("td")[1];
        titles[i - 1] = title.innerHTML;
        title.addEventListener("click", playlistClick(i - 1));
    }
    prevFooter.addEventListener("click", playAnother(-1));
    nextFooter.addEventListener("click", playAnother(1));
}

var audio = document.getElementsByClassName("audio")[0];
if (audio) {
    audio.controls = false;
    var play = document.getElementsByClassName("playpause")[0];
    play.addEventListener("click", function () {
        if (audio.paused || audio.ended) {
            play.className = "option pause-footer playpause";
            audio.play();
        } else {
            play.className = "option play-footer playpause";
            audio.pause();
        }
    });

    audio.addEventListener("timeupdate", updateProgress);
}

function playAnother(i) {
    return function () {
        var audio = document.getElementsByClassName("audio")[0],
            play = document.getElementsByClassName("playpause")[0];
        play.className = "option pause-footer playpause";
        if (audio.currentTime > 0) {
            audio.currentTime = 0;
        }
        updateProgress();
        if (i === 1) {
            playingIndex = playingIndex === count - 1 ? count - 1 : playingIndex + 1;
        } else {
            playingIndex = playingIndex === 0 ? 0 : playingIndex - 1;
        }
        audio.src = "music/" + titles[playingIndex] + ".mp3";
        audio.load();
        audio.play();
    }
}

function playlistClick(i) {
    return function () {
        playingIndex = i;
        var audio = document.getElementsByClassName("audio")[0],
            play = document.getElementsByClassName("playpause")[0];
        play.className = "option pause-footer playpause";
        if (audio.currentTime > 0) {
            audio.currentTime = 0;
        }
        updateProgress();
        audio.src = "music/" + titles[i] + ".mp3";
        audio.load();
        audio.play();
    }
}

function updateProgress() {
    var progress = document.getElementsByClassName("progress")[0],
        time = document.getElementsByClassName("time")[0],
        value = 0,
        presentMinutes,
        presentSeconds,
        totalMinutes,
        totalSeconds;
    presentMinutes = parseInt(audio.currentTime / 60);
    presentSeconds = parseInt(audio.currentTime % 60);
    totalMinutes = parseInt(audio.duration / 60);
    totalSeconds = parseInt(audio.duration % 60);
    function format(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    presentSeconds = format(presentSeconds);
    totalSeconds = format(totalSeconds);
    if (totalSeconds) {
        time.innerHTML = presentMinutes + ":" + presentSeconds + "/" + totalMinutes + ":" + totalSeconds;
    }
    if (audio.currentTime > 0) {
        value = (100 / audio.duration) * audio.currentTime;
    }
    progress.style.width = value + "%";
}

var songs = document.getElementsByClassName("songs")[0],
    comments = document.getElementsByClassName("comments")[0],
    musicArea = document.getElementsByClassName("music-area")[0],
    commentArea = document.getElementsByClassName("comment-area")[0];
if (songs) {
    songs.addEventListener("click", function () {
        musicArea.style.display = "table";
        commentArea.style.display = "none";
        songs.style.backgroundColor = "rgb(225, 225, 225)";
        songs.style.color = "black";
        comments.style.backgroundColor = "white";
        comments.style.color = "rgb(144, 144, 144)";
    });
    comments.addEventListener("click", function () {
        musicArea.style.display = "none";
        commentArea.style.display = "block";
        comments.style.backgroundColor = "rgb(225, 225, 225)";
        comments.style.color = "black";
        songs.style.backgroundColor = "white";
        songs.style.color = "rgb(144, 144, 144)";
    });
}

var expand = document.getElementsByClassName("expand")[0],
    detail = document.getElementsByClassName("detail")[0],
    optionSet = document.getElementsByClassName("option-set")[0];
if (expand) {
    expand.addEventListener("click", function () {
        if (expand.innerHTML === "[展开]") {
            detail.style.overflow = "visible";
            detail.style.height = "100%";
            expand.innerHTML = "[折叠]";
            optionSet.style.display = "none";
        } else {
            detail.style.overflow = "hidden";
            detail.style.height = "2.8em";
            expand.innerHTML = "[展开]";
            optionSet.style.display = "block";
        }
    })
}

var collapse = document.getElementsByClassName("collapse")[0],
    playbar = document.getElementsByClassName("playbar")[0];
if (collapse) {
    collapse.addEventListener("click", function () {
        if (playbar.className === "playbar fadeout") {
            playbar.className = "playbar fadein";
        } else {
            playbar.className = "playbar fadeout";
        }
    });
}

var inputs = document.getElementsByTagName("input"),
    values = [],
    isClicked = false;
if (inputs[0]) {
    for (i = 0; i < inputs.length; i++) {
        values[i] = inputs[i].getAttribute("value");
        inputs[i].addEventListener("click", clearValue(i))
    }

    window.addEventListener("click", resetValue());
    function clearValue(i) {
        return function () {
            inputs[i].setAttribute("value", "");
            isClicked = true;
        }
    }
    function resetValue() {
        return function (e) {
            if (isClicked && e.target.nodeName !== "INPUT" && e.target.nodeName !== "BUTTON") {
                for (i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute("value", values[i]);
                }
                isClicked = false;
            }
        }
    }
}

