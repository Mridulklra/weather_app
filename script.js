// script.js
const curDate = document.getElementById("date");
const tempStatus = "clouds";
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getCurrentTime = () => {
    const now = new Date();
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[now.getMonth()];
    const date = now.getDate();
    const formattedDate = `${month} ${date}`;

    curDate.textContent = `${weekday[now.getDay()]} | ${formattedDate} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
};

getCurrentTime();
