import { useHistory } from 'react-router';
import useFetch from '../useFetch';
const Spare = () => {
    const history = useHistory()
    const { data, isPending } = useFetch(`http://localhost:8000/part/spare`);
    console.log(data);
    const handleClick = (id) => {
        fetch('http://localhost:8000/get-user', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if(data.authenticated){
                    return fetch(`http://localhost:8000/cart/${id}`, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify({userEmail: data.user.email}),
                        headers: new Headers({'content-type' : 'application/json'})
                    })
                } else {
                    throw Error('Not authenticated')
                }
            })
            .then(response => {
                return response.json()
            })
            .then(responseBody => {
                if (responseBody.error) throw Error(responseBody.eror)
                else {
                    console.log(responseBody.updatedUser)
                    history.push('/cart')
                }
            })
    }
    return (
        <div>
            <div className="category">
                <h1>Spare Parts</h1>
                {isPending && <div className="spin"></div>}
                <ul>
                { data &&
                    data.result.map((element, index) => {
                        return (
                            <li key={index} className="card" onClick={() => handleClick(element._id)}>
                                <div className="title">{element.partName}</div>
                                <div className="email">{element.vendorEmail}</div>
                                <div className="text">{element.partDescription}</div>
                            </li>
                        )
                    })
                }
                </ul>
                {!isPending && data.result.length === 0 && <div>No spare parts in store</div>}
            </div>
        </div>
    );
}
 
export default Spare;