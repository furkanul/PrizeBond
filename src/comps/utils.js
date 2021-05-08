const E2BNum = (sen) => {
    const converter = {
        "1": "১",
        "2": "২",
        "3": "৩",
        "4": "৪",
        "5": "৫",
        "6": "৬",
        "7": "৭",
        "8": "৮",
        "9": "৯",
        "0": "০",
    }

    let converted = [];
    for (let i = 0; i < sen.length; i++) {
        if (sen[i] in Object.keys(converter)) {
            converted.push(converter[sen[i]])
        } else {
            converted.push(sen[i])
        }
    }

    return converted.toString().replace(/,/g,"")
    

}
const HumanReadable = (text) => {
    let nextdata = text.split("")
                        .slice(2)
                        .toString()
  

    return text[0] + text[1] + "-" + E2BNum(nextdata.replace(/,/g,""))
}

export { HumanReadable }

