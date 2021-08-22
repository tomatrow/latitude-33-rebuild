import { writable } from "svelte/store"
import type { Trip } from "./index.type"

export const trip = writable<Trip | null>(null)
