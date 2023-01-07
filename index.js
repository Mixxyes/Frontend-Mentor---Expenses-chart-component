// Asynchronous function that receives data
async function getSpendingData(url = '/data.json') {

    //Send a request and wait for a response
    const response = await fetch(url);

    //Receive data from the response object
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    getSpendingData()
        .then(data => {

            const maxSpendValue = Math.max(...data.map(item => item.amount));

            const diagram = document.querySelector('.diagram');

            data.forEach(item => {
                diagram.insertAdjacentHTML('beforeend', `
                    <div class="column">
                        <div class="value_caption">$${item.amount}</div>
                        <div class="bar" style="height: ${item.amount*3}px; background-color: ${item.amount===maxSpendValue ? "var(--color-cyan)" : ""};"></div>
                        <div class="day caption">${item.day}</div>
                    </div>
                `);
            });

            const valueCaptions = document.querySelectorAll('.value_caption');
            const bars = document.querySelectorAll('.bar');

            bars.forEach((bar, i) => bar.addEventListener('mouseenter', (e) => {
                console.log(bars[i].style);
                bars[i].style.opacity= "0.8";
                valueCaptions[i].classList.remove('hide');
                valueCaptions[i].classList.add('show');
            }));

            bars.forEach((bar, i) => bar.addEventListener('mouseout', (e) => {
                bars[i].style.opacity= "1";
                valueCaptions[i].classList.remove('show');
                valueCaptions[i].classList.add('hide');
            }));
        });
});