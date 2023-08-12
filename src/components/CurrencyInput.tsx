import { TextField } from "@mui/material";
import currency from "currency.js"
import { AnySrvRecord } from "dns"
import { useCallback } from "react"

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8

const CurrencyInput = (props:any) => {

    const {
        className = "",
        style={},
        currencyConfig={
            locale: "en-US",
            currencyCode: "USD",
            currencyDisplay: "symbol",
            useGrouping: true,
            minimumFractionDigits: undefined
        },
        customInput=TextField,
        name,
        id,
        max = Number.MAX_SAFE_INTEGER,
        onChange,
        value
    } = props

    const fakeChangeEvent = {
        target: {
            type: "number",
            name,
            id,
            value
        }
    }
    
    const valueInCents = currency(value).intValue
    const valueAbsTrunc = Math.trunc(Math.abs(valueInCents))
    if (valueInCents !== valueAbsTrunc || !Number.isFinite(valueInCents) || Number.isNaN(valueInCents)) {
        throw new Error(`invalid value property`)
    }

    const handleKeyDown = useCallback((e:any) => {
        const { key, keyCode } = e
        if (
            (valueInCents === 0 && !VALID_FIRST.test(key)) ||
            (valueInCents !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
        ) {
            return;
        }
        const valueString = valueInCents.toString()
        let nextValue
        if (keyCode !== DELETE_KEY_CODE) {
            const nextValueString = valueInCents === 0 ? key : `${valueString}${key}`
            nextValue = Number.parseInt(nextValueString, 10)
        }
        else {
            const nextValueString = valueString.slice(0, -1)
            nextValue = nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10)
        }
        if (nextValue > props.max) {
            return;
        }
        fakeChangeEvent.target.value = currency(nextValue / 100).value
        onChange(fakeChangeEvent)
    }, [max, onChange, valueInCents, fakeChangeEvent])

    const handleChange = useCallback(() => {

    }, [])

    const {
        locale,
        currencyCode,
        currencyDisplay,
        useGrouping,
        minimumFractionDigits
    } = currencyConfig

    const valueDisplay = currency(valueInCents / 100).value.toLocaleString(
        locale,
        {
            style: "currency",
            currency: currencyCode,
            currencyDisplay,
            useGrouping,
            minimumFractionDigits
        }
    )

    const inputProps = {
        "data-testid": "currency-input",
        className: className,
        inputMode: "numeric",
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        style: style,
        value: valueDisplay
    }

    const customProps = { ...props, ...inputProps }
    delete customProps.customInput
    delete customProps.currencyConfig
    const CustomInput = customInput
    return <CustomInput {...customProps} />
}

export default CurrencyInput;