export interface AutocompleteResult {
    place: google.maps.places.PlaceResult
    selectedPrediction: string
}

export interface MarkerDetail {
    id: string
    marker: google.maps.Marker
}
