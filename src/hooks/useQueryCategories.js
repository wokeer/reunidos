import { useStaticQuery, graphql } from "gatsby"
import { fromJS } from 'immutable';

export const useQueryCategories = () => {
    const { allCategories } = useStaticQuery(graphql`
        query GET_CATEGORIES {
            allCategories {
                nodes {
                    plate {
                        pt_id
                        pt_synchronized
                        pt_price
                        pt_name
                        pt_image
                        pt_dish_categories_id
                        pt_discount
                        pt_description
                        plaSection {
                            pls_id
                            pls_max_products
                            pls_min_products
                            pls_plate_id
                            pls_required
                            pls_selection
                            pls_type_section
                            plaSectionProduct {
                                plsp_id
                                plsp_max_products
                                plsp_price_add
                                plsp_product_id
                                plsp_section_id
                                proProduct {
                                    pro_id
                                    pro_category_id
                                    pro_name
                                    pro_ref_code
                                    pro_price
                                    pro_price_add
                                    pro_exhausted
                                    pro_creator_id
                                }
                            }
                            plaTypeSection {
                                pts_id
                                pts_name
                                pts_branch_office_id
                            }
                        }
                    }
                    dcg_branch_office_id
                    dcg_name
                    dcg_id
                }
            }
        }
    `)
    return fromJS(allCategories.nodes);
}