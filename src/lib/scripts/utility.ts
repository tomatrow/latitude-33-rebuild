export function stripPhone(phone: string) {
    return phone.match(/\d/g)?.join("") ?? ""
}

export function splitChoices(choices: string) {
    return choices.split("\n") ?? []
}
