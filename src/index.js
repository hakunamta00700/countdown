import './style.css';
function CountdownTracker(label, value) {
    var el = document.createElement("span");

    el.className = "flip-clock__piece";
    el.innerHTML = `
<b class="flip-clock__card card">
    <b class="card__top"></b>
    <b class="card__bottom"></b>
    <b class="card__back">
        <b class="card__bottom"></b>
    </b>
</b>
<span class="flip-clock__slot">${label.toUpperCase()}</span>`;

    this.el = el;
    var top = el.querySelector(".card__top"),
        bottom = el.querySelector(".card__bottom"),
        back = el.querySelector(".card__back"),
        backBottom = el.querySelector(".card__back .card__bottom");

    this.update = function (val) {
        val = ("0" + val).slice(-2);
        if (val !== this.currentValue) {
            if (this.currentValue >= 0) {
                back.setAttribute("data-value", this.currentValue);
                bottom.setAttribute("data-value", this.currentValue);
            }
            this.currentValue = val;
            top.innerText = this.currentValue;
            backBottom.setAttribute("data-value", this.currentValue);

            this.el.classList.remove("flip");
            void this.el.offsetWidth;
            this.el.classList.add("flip");
        }
    };

    this.update(value);
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    return {
        Total: t,
        Days: Math.floor(t / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((t / 1000 / 60) % 60),
        Seconds: Math.floor((t / 1000) % 60)
    };
}
function pretaskForMakeCountdown(containerId) {
    const countdownContainer = document.getElementById(containerId);
    countdownContainer.style.display = 'flex';
    // <span> 요소를 생성하고 필요한 스타일 및 텍스트를 설정합니다.
    const countdownTitle = document.createElement('span');
    countdownTitle.className = 'countdown_title';
    countdownTitle.style.color = 'white';
    countdownTitle.innerText = '반짝특가 남은시간';

    // 새로운 <div> 요소를 생성하고 id를 'countdown_for_sale'로 설정합니다.
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdown_for_sale';

    // 생성된 <span> 및 <div> 요소를 'countdown_container'에 추가합니다.
    countdownContainer.appendChild(countdownTitle);
    countdownContainer.appendChild(countdownDiv);

    // 마지막으로 'countdown_container'를 문서의 원하는 위치에 추가합니다.
    // 예: body의 마지막 부분에 추가
    document.body.appendChild(countdownContainer);
    return countdownDiv.id;
}
export function Clock(containerId, countdown, callback) {
    const countdownDivId = pretaskForMakeCountdown(containerId);
    countdown = countdown ? new Date(Date.parse(countdown)) : false;
    callback = callback || function () { };

    var updateFn = getTimeRemaining;

    this.el = document.getElementById(countdownDivId);
    this.el.className = "flip-clock";

    var trackers = {},
        t = updateFn(countdown),
        key,
        timeinterval;

    for (key in t) {
        if (key === "Total") {
            continue;
        }
        trackers[key] = new CountdownTracker(key, t[key]);
        this.el.appendChild(trackers[key].el);
    }

    var i = 0;

    function updateClock() {
        timeinterval = requestAnimationFrame(updateClock);

        if (i++ % 10) {
            return;
        }

        var t = updateFn(countdown);
        if (t.Total < 0) {
            cancelAnimationFrame(timeinterval);
            for (key in trackers) {
                trackers[key].update(0);
            }
            callback();
            return;
        }

        for (key in trackers) {
            trackers[key].update(t[key]);
        }
    }

    setTimeout(updateClock, 500);
}
export function convertStringToDate(dateTimeString) {
    // "2023/09/22 15:00"을 [2023, 09, 22, 15, 00]로 분리합니다.
    const parts = dateTimeString
        .split(/[/ :]/)
        .map((part) => parseInt(part, 10));

    // Date 객체를 생성하고 반환합니다.
    // new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
    // month는 0부터 시작하므로 1을 빼줍니다.
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
}