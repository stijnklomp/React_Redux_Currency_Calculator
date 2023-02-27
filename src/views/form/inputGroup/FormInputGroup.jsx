import { useDispatch } from "react-redux";

// Styling
import "./FormInputGroup.css";

// Controllers
import { currencyCodes } from "../../../controllers/currency/currencyCodes";

export const FormInputGroup = ({fromOrTo, value, updatedValue, updateCurrency}) => {
    let defaultCurrency

    if (fromOrTo === "from") {
        defaultCurrency = "U.S. Dollar"
    } else {
        defaultCurrency = "Euro"
    }

    const upperCaseFromOrTo = fromOrTo.charAt(0).toUpperCase() + fromOrTo.slice(1);

    // List all currencies supported by the API (Read from currencyCodes.js)
    const currencyOptions = () => {
        let options = []

        Object.keys(currencyCodes).forEach((currency) => {
        options.push(<option value={currency} key={currencyCodes[currency]} data-currencycode={currencyCodes[currency]}>{currency}</option>)
        })

        return options
    }

    return (
        <div className="form-group">
            <label htmlFor="from-currency">{upperCaseFromOrTo}:</label>
            <input type="number" id={`${fromOrTo}-amount`} placeholder="Amount" onChange={(e) => {updatedValue({elm: e, fromOrTo})}} min={0} max={99999999.99} value={value} />
            <select id={`${fromOrTo}-currency`} defaultValue={defaultCurrency} onChange={(e) => {updateCurrency({elm: e, fromOrTo})}}>
                {currencyOptions()}
            </select>
        </div>
    )
}