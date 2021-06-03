export function stripPhone(phone: string) {
    return phone.match(/\d/g)?.join("") ?? ""
}

export function splitChoices(choices: string) {
    return choices.split("\n") ?? []
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
