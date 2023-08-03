export function load({cookies}){
    var j = cookies.get("jwt")!= "";
    return {j};
}