export const DealsPseduoFragment = `
    deals(first: 250, where: { status: PUBLISH }) {
        edges {
            node {
                id
                dealFields {
                    cost
                    craft {
                        ... on Aircraft {
                            id
                            title
                            aircraftFields {
                                stats {
                                    maxPassengers
                                }
                                featuredImage {
                                    ...MediaItemFragment
                                }
                            }
                        }
                    }
                    date
                    end {
                        ...AirportDealsFragment
                    }
                    start {
                        ...AirportDealsFragment
                    }
                }
            }
        }
    }
`

export const AirportDealsFragment = `
    fragment AirportDealsFragment on Airport {
        id
        locationPostFields {
            coordinates {
                city
                stateShort
            }
        }
    }
`
