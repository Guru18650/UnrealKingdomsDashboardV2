export function load({cookies}){
    var j = cookies.get("jwt")!= ""&&cookies.get("jwt")!=undefined;
    return {j};
}