"use strict";

const Tuotevarasto = require("../tuotevarasto");
const tuotteet = require("../tietovarasto.json");


// KONSTRUKTORI
describe("Testataan konstruktori", () => {
    test("puuttuva parametri aiheuttaa poikkeuksen 'tiedot puuttuvat'", () => {
        expect(() => new Tuotevarasto()).toThrow("tiedot puuttuvat");
    });
});
//


// HAETUOTTEIDENKOKONAISHINTATYYPILLA
describe("Testataan metodi haeTuotteidenKokonaishintaTyypilla", () => {
    const varasto = new Tuotevarasto(tuotteet);

    test("Testi 1: Puuttuva parametri aiheuttaa poikkeuksen 'parametri puuttuu'", () => {
        expect(() => varasto.haeTuotteidenKokonaishintaTyypilla()).toThrow("parametri puuttuu");
    });

    describe("Testi 2: Parametri väärä / ei löydy varastosta", () => {
        test("numeerinen parametri", () => {
            expect(() => varasto.haeTuotteidenKokonaishintaTyypilla(123))
                .toThrow("annetulla avaimella ei löytynyt tietoja");
        });
        test("joukkoon sopiva, mutta väärä", () => {
            expect(() => varasto.haeTuotteidenKokonaishintaTyypilla("televisio"))
                .toThrow("annetulla avaimella ei löytynyt tietoja");
        });
        test("satunnainen merkkijono", () => {
            expect(() => varasto.haeTuotteidenKokonaishintaTyypilla("xyz"))
                .toThrow("annetulla avaimella ei löytynyt tietoja");
        });
    });

    test("Testi 3: Hae tuotteiden kokonaishinta, joiden tyyppi on älypuhelin", () => {
        expect(varasto.haeTuotteidenKokonaishintaTyypilla("älypuhelin")).toEqual(600);
    });

    test("Testi 4: Hae tuotteiden kokonaishinta, joiden tyyppi on imuri", () => {
        expect(varasto.haeTuotteidenKokonaishintaTyypilla("imuri")).toEqual(523);
    });

});
// HAETUOTTEIDENKOKONAISHINTATYYPILLA loppuu



// HAETUOTTEENVÄRIT
describe("Testataan metodi haeTuotteenVärit", () => {
    const varasto = new Tuotevarasto(tuotteet);

    test("Testi 1: Puuttuva parametri aiheuttaa poikkeuksen 'parametri puuttuu'", () => {
        expect(varasto.haeTuotteenVarit()).toEqual([]);
    });

    test("Testi 2: Hae kaikki tuotteen 1 värit", () => {
        expect(varasto.haeTuotteenVarit(1)).toEqual(["vihreä", "sininen", "valkoinen"]);
    });

    test("Testi 3: Käytetään muokattua jsondataa", () => {
        const testidata =
            [
                {
                    "tuotenumero": 1,
                    "nimi": "Frost XL",
                    "tyyppi": "imuri",
                    "hinta": 123,
                    "valmistusvuosi": 2018,
                    "värit": [
                        "musta",
                        "keltainen",
                        "vaaleanpunainen"
                    ],
                    "lisätiedot": {
                        "huomautus": "huippulaite",
                        "energialuokka": "A+",
                        "malli": "VIP"
                    }
                }
            ]
        const varasto = new Tuotevarasto(testidata);
        expect(varasto.haeTuotteenVarit(1))
            .toEqual(["musta", "keltainen", "vaaleanpunainen"]);
    });

    test("Testi 4: Poistetaan värit tuotteesta 1", () => {
        const testidata =
            [
                {
                    "tuotenumero": 1,
                    "nimi": "Frost XL",
                    "tyyppi": "imuri",
                    "hinta": 123,
                    "valmistusvuosi": 2018,
                    "värit": [],
                    "lisätiedot": {
                        "huomautus": "huippulaite",
                        "energialuokka": "A+",
                        "malli": "VIP"
                    }
                }
            ];
        const varasto = new Tuotevarasto(testidata);
        expect(varasto.haeTuotteenVarit(1)).toEqual([]);
    });
});
// HAETUOTTEENVÄRIT LOPPUU


// HAETUOTTEITATYYPILLA
describe("Testataan metodi haeTuotteitaTyypilla", () => {
    const varasto = new Tuotevarasto(tuotteet);

    test("Testi 1: Puuttuva parametri aiheuttaa poikkeuksen 'parametri puuttuu'", () => {
        expect(() => varasto.haeTuotteitaTyypilla()).toThrow("parametri puuttuu");
    });

    test("Testi 2: Hae kaikki tyypin älypuhelin tuotteet", () => {
        expect(varasto.haeTuotteitaTyypilla("älypuhelin")).toEqual([
            {
                "tuotenumero": 2,
                "nimi": "MaxEffect 2000",
                "tyyppi": "älypuhelin",
                "hinta": 300,
                "valmistusvuosi": 2011,
                "värit": [
                    "valkoinen",
                    "sininen",
                    "punainen"
                ],
                "lisätiedot": {
                    "huomautus": "laadukas",
                    "energialuokka": "A",
                    "malli": "gold"
                }
            },
            {
                "tuotenumero": 4,
                "nimi": "Luuri S43",
                "tyyppi": "älypuhelin",
                "hinta": 300,
                "valmistusvuosi": 2012,
                "värit": [
                    "musta",
                    "keltainen",
                    "sininen"
                ],
                "lisätiedot": {
                    "huomautus": "ei huomauttamista",
                    "energialuokka": "A",
                    "malli": "GT"
                }
            }
        ]);
    });

    test("Testi 3: Hae kaikki tyypin imuri tuotteet", () => {
        expect(varasto.haeTuotteitaTyypilla("imuri")).toEqual([
            {
                "tuotenumero": 1,
                "nimi": "Frost XL",
                "tyyppi": "imuri",
                "hinta": 123,
                "valmistusvuosi": 2018,
                "värit": [
                    "vihreä",
                    "sininen",
                    "valkoinen"
                ],
                "lisätiedot": {
                    "huomautus": "huippulaite",
                    "energialuokka": "A+",
                    "malli": "VIP"
                }
            },
            {
                "tuotenumero": 3,
                "nimi": "XZL 34",
                "tyyppi": "imuri",
                "hinta": 200,
                "valmistusvuosi": 2011,
                "värit": [
                    "punainen",
                    "valkoinen",
                    "oranssi"
                ],
                "lisätiedot": {
                    "huomautus": "huippulaite",
                    "energialuokka": "A++",
                    "malli": "GT"
                }
            },
            {
                "tuotenumero": 5,
                "nimi": "Silo delux",
                "tyyppi": "imuri",
                "hinta": 200,
                "valmistusvuosi": 1995,
                "värit": [
                    "musta",
                    "keltainen",
                    "sininen"
                ]
            }
        ]);
    });

    test("Testi 4: Haetaan parametrilla jota ei ole", () => {
        expect(varasto.haeTuotteitaTyypilla("xyz")).toEqual([]);
    });
});
// HAETUOTTEITATYYPILLA loppuu

// HAELISÄTIEDOT
describe("Testataan metodi haeLisätiedot", () => {
    const varasto = new Tuotevarasto(tuotteet);

    test("Testi 1: Tyhjä toutenumero aiheuttaa poikkeuksen", () => {
        expect(varasto.haeLisätiedot()).toBeNull();
    });

    test("Testi 2: Hae tuotteen 1 lisätiedot", () => {
        expect(varasto.haeLisätiedot(1)).toEqual({
            "huomautus": "huippulaite",
            "energialuokka": "A+",
            "malli": "VIP"
        });
    });

    test("Testi 3: Haetaan tuotteella, jolla ei ole lisätietoja", () => {
        expect(varasto.haeLisätiedot(5)).toBeNull();
    });

    test("Testi 4: Haetaan testidatalla", () => {
        const testidata = [{
            "tuotenumero": 5,
            "nimi": "Silo delux",
            "tyyppi": "imuri",
            "hinta": 200,
            "valmistusvuosi": 1995,
            "värit": [
                "musta",
                "keltainen",
                "sininen"
            ],
            "lisätiedot": {
                "huomautus": "älä osta",
                "energialuokka": "F",
                "malli": "SB"
            }
        }
        ];
        const varasto = new Tuotevarasto(testidata);
        expect(varasto.haeLisätiedot(5)).toEqual({
            "huomautus": "älä osta",
            "energialuokka": "F",
            "malli": "SB"
        });
    });
});
// HAELISÄTIEDOT loppuu

//  HAETUOTTEENVALMISTUSVUOSINIMELLÄ
describe("Testataan metodi haeTuotteenValmistusvuosiNimellä", () => {
    const varasto = new Tuotevarasto(tuotteet);

    test("Testi 1: Tyhjä nimi aiheuttaa poikkeuksen", () => {
        expect(() => varasto.haeTuotteenValmistusvuosiNimella()).toThrow("parametri puuttuu");
    });

    test("Testi 2: Haetaan tuotteen Luuri S43 valmistusvuosi", () => {
        expect(varasto.haeTuotteenValmistusvuosiNimella("Luuri S43")).toEqual(2012);
    });

    test("Testi 3: Haetaan olemattomalla nimellä", () => {
        expect(varasto.haeTuotteenValmistusvuosiNimella("Testituote 21")).toBeNull();
    });
});
//  HAETUOTTEENVALMISTUSVUOSINIMELLÄ loppuu
