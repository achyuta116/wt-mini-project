import { useState } from "react"
import { useHistory } from "react-router"
const Vendor = () => {
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [category, setCategory] = useState('frame')
    const [error, setError] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        fetch('http://localhost:8000/get-user', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if(data.authenticated){
                    return fetch('http://localhost:8000/part',{
                        method: 'POST',
                        body: JSON.stringify({
                            vendorEmail: data.user.email,
                            partType: category,
                            partName: productName,
                            partDescription: productDescription
                        }),
                        headers: new Headers({'content-type' : 'application/json'}),
                        credentials: 'include'
                    })
                } else {
                    return 'error'
                }
            })
            .then(result => {
                if(result === 'error'){
                    setError('User not authenticated');
                } else {
                    history.push('/');
                }
            })
            .catch(console.log)
    }
    return (
        <div className="DIY">
            <form>
                <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)}/>
                <br/>
                <textarea placeholder="Product Description" value={productDescription} onChange={e => setProductDescription(e.target.value)}></textarea>
                <br/>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="frame">Frame</option>
                    <option value="motor">Motor</option>
                    <option value="propeller">Propeller</option>
                    <option value="radio">Radio</option>
                    <option value="flight-controller">Flight Controller</option>
                    <option value="prebuilt">Prebuilt</option>
                    <option value="spare">Spare Part</option>
                </select>
                <div className="btn" onClick={handleSubmit}>Submit</div>
                <div className="error">{error}</div>
            </form>
        </div>
    );
}
 
export default Vendor;