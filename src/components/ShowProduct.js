import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productSelectors, getProducts, deleteProducts } from '../features/ProductSlice'
import { Link } from 'react-router-dom'

const ShowProduct = () => {
    const dispatch = useDispatch()
    const products = useSelector(productSelectors.selectAll)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className="box mt-5">
            <Link to="add" className="button is-success">Add New</Link>
            <table className="table is-strpped is=fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((products, index) => (
                        <tr key={products.id}>
                            <td>{index + 1}</td>
                            <td>{products.title}</td>
                            <td>{products.price}</td>
                            <td>
                                <Link to={`edit/${products.id}`} className="button is-info is-small">Edit</Link>
                                <button onClick={() => dispatch(deleteProducts(products.id))} className="button is-danger is-small">Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowProduct
