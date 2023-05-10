function CalcCity(response1, response1_1, response2, response3, response4, response5, response6, response7) {


    const citiesPoints = [
        { country: 'Irelanda', city: "Dublin", language: 1, id: 1, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [2, 1, 0] },
        { country: 'Irelanda', city: "Cork", language: 1, id: 8, question01: [3, 4, 3], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 2] },
        { country: 'Irelanda', city: "Limerick", language: 1, id: 9, question01: [3, 4, 3], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 20] },
        { country: 'Irelanda', city: "Galway", language: 1, id: 10, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Irelanda', city: "Waterford", language: 1, id: 11, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Englaterra', city: "Londres", language: 1, id: 12, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Englaterra', city: "Manchester", language: 1, id: 13, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Englaterra', city: "Liverpool", language: 1, id: 14, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Englaterra', city: "Brigton", language: 1, id: 15, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Englaterra', city: "Bristol", language: 1, id: 16, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Canadá', city: "Toronto", language: 1, id: 17, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Canadá', city: "Vancouver", language: 1, id: 18, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Canadá', city: "Calgary", language: 1, id: 20, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Canadá', city: "Ottawa", language: 1, id: 21, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'França', city: "Paris", language: 3, id: 22, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'França', city: "Nice", language: 3, id: 23, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'França', city: "Lyon", language: 3, id: 24, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Barcelona', city: "Madri", language: 2, id: 25, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Barcelona', city: "Barcelona", language: 2, id: 26, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'Barcelona', city: "Valência", language: 2, id: 27, question01: [3, 4, 3], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
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

module.exports = CalcCity