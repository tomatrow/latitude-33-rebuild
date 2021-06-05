import { graphql } from "$lib/scripts/apollo"

export const AircraftFragment = graphql`
    fragment AircraftFragment on Aircraft {
        id
        slug
        title
        featuredImage {
            node {
                ...MediaItemFragment
            }
        }
        aircraftFields {
            stats {
                baggageCapacity
                maxCruiseSpeed
                maxPassengers
                maxRange
            }
            interior {
                description
                image {
                    ...MediaItemFragment
                }
            }
            amenities {
                description
                image {
                    ...MediaItemFragment
                }
            }
            avionics {
                description
                image {
                    ...MediaItemFragment
                }
            }
        }
    }
`

export const FleetTypeOptionsFragment = graphql`
    fragment FleetTypeOptionsFragment on AcfOptionsDrillDown {
        fleetPostTypeFields {
            testimonialProof {
                title
                blurb
                proof {
                    ... on Testimonial {
                        id
                        testimonialPostFields {
                            name
                            quote
                            position
                        }
                        featuredImage {
                            node {
                                ...MediaItemFragment
                            }
                        }
                    }
                }
            }
            socialProofSummary {
                title
                blurb
                rating
                links {
                    link {
                        ...AcfLinkFragment
                    }
                }
            }
        }
    }
`
