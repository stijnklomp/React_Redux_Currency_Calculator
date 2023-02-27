import { update } from "../../models/counterSlice";

const getJSONCurrenciesFromAPI = async ({currencyCodeForAPI}) => {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://www.floatrates.com/daily/${currencyCodeForAPI}.json`, true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject("Something went wrong");
            }
        };
        xhr.send();
  });
}

export const convertCurrency = async ({fromCurrencyCode, toCurrencyCode, fromAmount, toAmount, fromOrTo, dispatch}) => {
    let currencyCodeForAPI
    let currencyCodeForBaseRate
    let amount

    if (fromOrTo === "from") {
        currencyCodeForAPI = fromCurrencyCode
        currencyCodeForBaseRate = toCurrencyCode
        amount = fromAmount
    } else {
        currencyCodeForAPI = toCurrencyCode
        currencyCodeForBaseRate = fromCurrencyCode
        amount = toAmount
    }

    // Retrieve rates from desired currency
    let JSONCurrencies

    try {
        JSONCurrencies = await getJSONCurrenciesFromAPI({currencyCodeForAPI})
    } catch (e) {

        throw new Error(e)
    }

    const toCurrencyBaseRate = JSONCurrencies[currencyCodeForBaseRate].rate
    const newAmount = amount * toCurrencyBaseRate // Multiply inputted amount times the currency rate
    const newRoundedAmountTwoDecimals = Math.round((newAmount + Number.EPSILON) * 100) / 100
    let fromOrToState

    if (fromOrTo === "from") {
        fromOrToState = "to"
    } else {
        fromOrToState = "from"
    }
    
    dispatch(update({[`${fromOrToState}Value`]: newRoundedAmountTwoDecimals})) // Update state with new amount
}