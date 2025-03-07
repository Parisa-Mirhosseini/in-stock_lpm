
import './InventoryDetails.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryDetails () {

    const params = useParams();
    const navigate = useNavigate();
    const [InventoryDetails, setInventoryDetails] = useState({});

// Get warehouse details from the API based on id

    async function getInventoryDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/api/inventories/${params.id}`);
            console.log(response)
            setInventoryDetails(response.data);
        } catch (error) {
            console.log(`Error: api call was not able to retrieve desired inventory item with id:${params.id}`);
            navigate("notfound");
        }
    }
    
    useEffect(() => {
        getInventoryDetails();
    }, [params.id]);

    console.log("this is inventory item",InventoryDetails)

return (
    <>
    <div className='inventory-details__container'>
    <section className='items'>
        <section className='items__header'>
            <Link to={'/inventories'} className='items__arrow'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E66E6"/>
                </svg>  
            </Link>
           
            <h1 className='items__item'>{InventoryDetails.item_name}</h1>
            <Link to={`/inventories/edit/${params.id}`} className='items__edit'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFFFFF"/>
                </svg>
            </Link>
            
            <Link to={`/inventories/edit/${params.id}`} className='items__edit--hidden'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFFFFF"/>
                </svg>
                <h3>Edit</h3>
            </Link>
        </section>
        <section className='items__container'>
        <section className='items__description-category'>
            <div className='items__description'>
                <h4 className='items__subtitle'>ITEM DESCRIPTION:</h4>
                <p className='items__text--mod'>{`${InventoryDetails.description}`}</p>
            </div>
            <div className='items__category'>
                <h4 className='items__subtitle'>CATEGORY:</h4>
                <p className='items__text'>{`${InventoryDetails.category}`}</p>
            </div>
        </section>
        <section className='items__additional-info'>
            <div className='items__status-quantity'>
                <div className='items__status'>
                    <h4 className='items__subtitle'>STATUS:</h4>
                    {InventoryDetails.status==='In Stock'?         
                    <p className='items__stock'>IN STOCK</p>:
                    <p className='items__stock--not'>OUT OF STOCK</p>
                    }
                </div>
                <div className='items__quantity'>
                    <h4 className='items__subtitle'>QUANTITY:</h4>
                    <p className='items__text--mod'>{`${InventoryDetails.quantity}`}</p>
                </div>
            </div>
                <div className='items__Status'>
                    <h4 className='items__subtitle'>WAREHOUSE:</h4>
                    <p className='items__text'>{`${InventoryDetails.warehouse_name}`}</p>
                </div>
        </section>
        </section>
    </section>
    </div>
    </>
);

}

export default InventoryDetails;