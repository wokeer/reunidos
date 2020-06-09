import { useStaticQuery, graphql } from "gatsby"
import { fromJS } from 'immutable';

export const useQueryRestaurant = () => {
    const { allRestaurant } = useStaticQuery(graphql`
        query GET_REST {
            allRestaurant {
                nodes {
                    rest_business_name
                    rest_city_id
                    rest_folder
                    rest_id
                    rest_subdomain
                    rest_logo
                    resBranchOffice {
                        rbo_address
                        rbo_city_id
                        rbo_domicile_value
                        rbo_datafono
                        rbo_folder
                        rbo_name
                        rbo_id
                        rbo_wp_orders
                    }
                }
            }
        }
    `)
    return fromJS(allRestaurant.nodes[0]);
}