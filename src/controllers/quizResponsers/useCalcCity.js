function CalcCity(response1, response1_1, response2, response3, response4, response5, response6, response7) {


    const citiesPoints = [
        { country: 'ie', city: "Dublin", language: 1, id: 1, question01: [0, 3, 16], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [2, 1, 0] },
        { country: 'ie', city: "Galway", language: 2, id: 2, question01: [2, 11, 0], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'ie', city: "Limerick", language: 1, id: 3, question01: [13, 1, 0], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 20] },
        { country: 'ie', city: "Cork", language: 3, id: 3, question01: [13, 1, 0], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 2] },
    ]

    let citiesLanguage = []
    citiesPoints.map((city) => {
        if (city.language === response2) {
            citiesLanguage.push(city);
        }
    });


    let citiesResultCalc = []

    citiesLanguage.map((item) => {
        citiesResultCalc.push({
            country: item.country,
            city: item.city,
            language: item.language,
            cityId: item.id,
            value:
                (
                    item.question01[response3 - 1]
                    + item.question02[response4 - 1]
                    + item.question03[response5 - 1]
                    + item.question04[response6 - 1]
                    + item.question05[response7 - 1]
                )

        })
    })



    let res = citiesResultCalc[citiesLanguage.indexOf(citiesLanguage.reduce(function (prev, current) {
        return prev > current ? prev : current;
    }))]
    return res


}
console.log(CalcCity(2, 0, 1, 2, 3, 1, 2, 3))

module.exports = CalcCity