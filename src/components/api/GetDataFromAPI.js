
const getDataFromAPI = (route) => {
    return fetch(route).then(resp => {
        if (resp.ok)
            return resp.json();
        else {
            throw new Error('Błąd sieci!');
        }
    });
};

const postDataToAPI = (route, data) => {
    return fetch( route, { 
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(resp => {
            if (resp.ok){
                return resp.json();
            }   
            else {
                console.log(resp);
                return resp.text().then(resp =>  {throw new Error(resp)});
            }
        });
}   

export default getDataFromAPI;
export {postDataToAPI};