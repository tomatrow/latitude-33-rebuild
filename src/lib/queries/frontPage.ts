import { graphql } from "$lib/scripts/apollo"
import { AcfLinkFragment } from "./utility"

export const FrontPageQuery = graphql`
    query FrontPageQuery($id: ID!) {
        page(id: $id) {
            title
            frontPage {
                grid {
                    first {
                        title
                        link {
                            ...AcfLinkFragment
                        }
                    }
                    second {
                        link {
                            ...AcfLinkFragment
                        }
                        title
                    }
                    fourth {
                        link {
                            ...AcfLinkFragment
                        }
                        title
                    }
                    third {
                        title
                        link {
                            ...AcfLinkFragment
                        }
                    }
                }
                hero {
                    brandName
                    title
                    pageLink {
                        ...AcfLinkFragment
                    }
                    youtubeId
                }
                why {
                    subheading
                    heading
                    contenthtml
                }
                triblurbs {
                    firstBlurb {
                        contentHtml
                        title
                    }
                    secondBlurb {
                        contentHtml
                        title
                    }
                    thirdBlurb {
                        contentHtml
                        title
                    }
                }
                offerings {
                    firstOffering {
                        subheading
                        heading
                        link {
                            ...AcfLinkFragment
                        }
                        contenthtml
                    }
                    secondOffering {
                        subheading
                        heading
                        link {
                            ...AcfLinkFragment
                        }
                        contenthtml
                    }
                }
                services {
                    firstService {
                        title
                        contenthtml
                    }
                    secondService {
                        title
                        contenthtml
                    }
                }
            }
        }
    }
    ${AcfLinkFragment}
`
