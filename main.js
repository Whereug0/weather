
const inputBox = document.querySelector('.inputBox');
const apiKey = '57f80767cf494b1db5e62700231711'
const apiUrl = `https://api.weatherapi.com/v1/current.json?`
const form = document.querySelector('.int')
const ent = document.querySelector('.enter-name')
const list = document.querySelector('.wither-list')
const noFound = document.querySelector(".no-found")



form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.searchInput.value
    if (value) {
        checkWeather(value)
    }
})


async function checkWeather(searcbValue) {
    try {
    
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searcbValue}`);
    
    if (response.ok) {
    const data = await response.json();
    console.log(data, "data");


    const localtime = data.location.localtime.split(' ')
    const [date, time] = localtime
    const now = new Date(date)
    const timenow = time
    
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const a = 'https:'
    document.querySelector(".icon").src = a + (data.current.condition.icon)
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".country").innerHTML = data.location.country
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "&#8451";
    document.querySelector(".humidity").innerHTML = "Humidity: " + (data.current.humidity) + "%";
    document.querySelector('.feelsLike').innerHTML = "Feels Like: " + Math.round(data.current.feelslike_c) + "&#8451";
    document.querySelector('.wind').innerHTML = "Wind: " + Math.round(data.current.wind_kph) + "kph";
    document.querySelector('.date').innerHTML = formattedDate
    document.querySelector(".time").innerHTML = timenow
    document.querySelector(".text").innerHTML = data.current.condition.text
    enterName()
    noFound.style.display = 'none'
    }else {
        console.error('Ошибка запроса:', response.status);
        list.style.display = 'none';
        ent.style.display = 'none';
        noFound.style.display = 'block'
    }
    }catch (er) {
        console.error("Ошибка", er)
        list.style.display = 'none'
        ent.style.display = 'none'
        noFound.style.display = 'block'
    }

}


function enterName() {
    ent.style.display = 'none'
    list.style.display = "flex"
}


