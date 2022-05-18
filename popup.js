const select = document.querySelector('select');
const form = document.querySelector('form');
const regexFloat = /^\d+(\.{1}\d+)?$/;
let videoList;

async function getVideoList() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getVideo,
    })

    chrome.storage.sync.get(['list'],(result) => {
        const select = document.querySelector('select');
        let option = '';
        if (result.list > 0) {
            option += `<option>--Choisissez la video--</option>`;
            for (let i = 0; i < result.list; i++) {
                option += `<option value="${i}">Video ${i + 1}</option>`;
            }

        } else {
            option = '<option value="">No Video</option>';
        }
        select.innerHTML = option;
    });
}

function getVideo() {
    let videoList = document.querySelectorAll('video').length;
    chrome.storage.sync.set({ list: videoList });
}

function selectVideo() {
    let video;
    chrome.storage.sync.get(['videoSelected'],(result) => {
        result = result.videoSelected;
        if(Number.isInteger(+result)) {
            let videoList = document.querySelectorAll('video');
            videoList[result].style.opacity = 0.8;
            videoList[result].style.border = '2px red solid';
        }
        video = result
    });

    chrome.storage.sync.get(['previousVideoSelected'],(result) => {
        result = result.previousVideoSelected;
        if(Number.isInteger(+result) && result !== video) {
            let videoList = document.querySelectorAll('video');
            videoList[result].style.opacity = "";
            videoList[result].style.border = "";
        }
    });
}

function changeSpeed () {
    let speed;

    chrome.storage.sync.get(['speed'],(result) => {
        speed = result.speed;
    });

    chrome.storage.sync.get(['videoSelected'],(result) => {
        result = result.videoSelected;
        if(Number.isInteger(+result)) {
            let videoList = document.querySelectorAll('video');
            videoList[result].style.opacity = '';
            videoList[result].style.border = '';
            videoList[result].playbackRate = +speed;
        }
    });
}

getVideoList();

select.addEventListener('change', async (e) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.get(['videoSelected'],(result) => {
        chrome.storage.sync.set({ previousVideoSelected: result.videoSelected });
        console.log(result.videoSelected);
    })
    chrome.storage.sync.set({ videoSelected: e.target.value });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: selectVideo,
    })
});

form.addEventListener('submit', (e)=>e.preventDefault());

form.addEventListener('change', async (e)=> {
    if((regexFloat.test(+e.target.id)) || (regexFloat.test(+e.target.value) && e.target.name === "custom" && document.querySelector('#custom').checked === true)) {

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if(e.target.id !== "custom") {
            chrome.storage.sync.set({ speed: e.target.id });
        } else {
            if (+e.target.value < 0) {
                e.target.value = 0;
            } else if (+e.target.value > 16) {
                e.target.value = 16;
            }
            chrome.storage.sync.set({ speed: e.target.value });
        }

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeSpeed,
        })
    }
})