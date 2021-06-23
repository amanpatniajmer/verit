import {searchData} from './Search';
import committees from './committees.json' ;

export const filter = (array, verifiedFilter, unverifiedFilter, session, club, type,search) => {
    return array.filter((item) => (
        
        (verifiedFilter === unverifiedFilter) || (verifiedFilter && item.status === "Verified") || 
        (unverifiedFilter && item.status === "Unverified")) 
        &&
        (session === "-1" || session === "undefined" || session === "All" || session === item.session) 
        && 
        (club === "-1" || club === "undefined" || club === item.club || (committees[club] && committees[club]["Clubs"].includes(item.club))) 
        &&
        (type === "-1" || type === "undefined" || type === item.type) 
        &&
        (search === undefined || search === "" || searchData(search, item))
    );
}