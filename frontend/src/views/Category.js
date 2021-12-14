import { useHistory, useParams } from "react-router";
import useFetch from "../useFetch";
const Category = () => {
    const { category } = useParams();
    const { data, isPending } = useFetch(`http://localhost:8000/part/${category}`);
    const history = useHistory();
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
                if (responseBody.error) throw Error(responseBody.error)
                else {
                    console.log(responseBody.updatedUser)
                    history.push('/cart')
                }
            })
            .catch(console.log)
    }
    const getHeading = (name) => {
        switch(name){
            case 'flight-controller':
                return 'Flight Controllers';
            case 'radio':
                return 'Radios';
            case 'propeller':
                return 'Propellers';
            case 'frame':
                return 'Frames';
            case 'motor':
                return 'Motors';
            default: {
                history.push('/');
            }
        }
    }
    return (
        <div className="category">
            <h1>{category && getHeading(category)}</h1>
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
            {!isPending && data.result.length === 0 && <div>No parts under this category in store</div>}
        </div>
    );
}
 
export default Category;