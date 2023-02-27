import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Styling
import "./Form.css";

// Models
import { update } from "../../models/counterSlice";

// Controllers
import { convertCurrency } from "../../controllers/currency/currencyController";
import { validateInputIsTypeDouble } from "../../controllers/inputValidation";

// Views
import { FormInputGroup } from "./inputGroup/FormInputGroup";

export const Form = () => {
  // Data store access
  const dispatch = useDispatch()

  const fromValue = useSelector((state) => state.counter.fromValue);
  const toValue = useSelector((state) => state.counter.toValue);

  const getCurrencyCodeFromElement = (elm) => {
    return elm.options[elm.selectedIndex].dataset.currencycode.toLowerCase()
  }

  const getFromAndToCurrencyCodes = () => {
    const fromCurrencyElement = document.getElementById("from-currency")
    const toCurrencyElement = document.getElementById("to-currency")

    const fromCurrencyCode = getCurrencyCodeFromElement(fromCurrencyElement)
    const toCurrencyCode = getCurrencyCodeFromElement(toCurrencyElement)

    return {fromCurrencyCode, toCurrencyCode}
  }

  const convertCurrencies = async ({fromOrTo, fromAmount, toAmount}) => {
    const {fromCurrencyCode, toCurrencyCode} = getFromAndToCurrencyCodes()
    
    try {
        await convertCurrency({fromCurrencyCode, toCurrencyCode, fromAmount, toAmount, fromOrTo, dispatch})
    } catch (e) {
        return
    }
  }

  const playErrorAnimationOnInput = ({elm}) => {
        elm.target.classList.add("bounce");
        setTimeout(() => {
            // Remove the class so animation can occur as many times as user triggers event, delay must be longer than the animation duration and any delay.
            elm.target.classList.remove("bounce");
        }, 1000); 
    }

    const updatedValue = ({elm, fromOrTo}) => {
        if (!validateInputIsTypeDouble({value: elm.target.value})) {
            playErrorAnimationOnInput({elm})

             if (fromOrTo == "from") {
              elm.target.value = fromValue
            } else {
              elm.target.value = toValue
            }
            
            return
        }

        dispatch(update({[`${fromOrTo}Value`]: elm.target.valueAsNumber})) // Update state with inputted amount

        let fromOrToAmount = {}

        if (fromOrTo === "from") {
            fromOrToAmount["fromAmount"] = elm.target.valueAsNumber
            fromOrToAmount["toAmount"] = document.getElementById("to-amount").valueAsNumber
        } else {
            fromOrToAmount["fromAmount"] = document.getElementById("from-amount").valueAsNumber
            fromOrToAmount["toAmount"] = elm.target.valueAsNumber
        }

        convertCurrencies({fromOrTo, ...fromOrToAmount})
    }

    const updateCurrency = ({elm, fromOrTo}) => {
        // CODE TODO
        // VALIDATE INPUTS

        const {fromCurrencyCode, toCurrencyCode} = getFromAndToCurrencyCodes()

        const fromAmount = document.getElementById("from-amount").valueAsNumber
        const toAmount = document.getElementById("to-amount").valueAsNumber

        // Set other amount to the same amount if the currencies are the same
        if (fromCurrencyCode == toCurrencyCode) {
            let currencyState
            let newValue

            if (fromOrTo == "from") {
              currencyState = "to"
              newValue = fromAmount
            } else {
              currencyState = "from"
              newValue = toAmount
            }

            dispatch(update({[`${currencyState}Value`]: newValue})) // Update state with inputted amount

            return
        }

        // Currencies are different so convert the amounts
        dispatch(update({[`${fromOrTo}Currency`]: elm.target.value})) // Update state with inputted amount

        convertCurrencies({fromOrTo, fromAmount, toAmount})
    }

  // Run initial currency conversion
  // CODE TODO
  // CREATE CURRENCY CODES LIST ON INITIAL API REQUEST FROM API DATA
  useEffect(() => {
    convertCurrencies({fromOrTo: "from", fromAmount: fromValue, toAmount: toValue})
  }, [])

  return (
    <div className="converter">
      <h2>Currency Converter</h2>
      <FormInputGroup fromOrTo={"from"} value={fromValue} updatedValue={updatedValue} updateCurrency={updateCurrency} />
      <FormInputGroup fromOrTo={"to"} value={toValue} updatedValue={updatedValue} updateCurrency={updateCurrency} />
    </div>
  );
};
