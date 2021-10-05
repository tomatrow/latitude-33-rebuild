import { object, string, size, refine, number } from "superstruct"
import { parse } from "date-fns"

export const DateInput = refine(string(), "DateInput", value => {
    const inputFormat = "yyyy-MM-dd"
    if (value?.length !== inputFormat.length) return false
    try {
        parse(value, inputFormat, new Date())
        return true
    } catch (error) {
        return false
    }
})

export const nonEmptyString = size(string(), 1, Infinity)
