import { useQuery } from 'react-query';
import './Brands.scss';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function Brands() {

    const GetBrands = () => {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }

    const { isLoading, data } = useQuery("Brands", GetBrands, {
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });
    return <>
        {isLoading ? <Loading /> :
            <div className="Brands w-100 row row-gap-4 column-gap-4 justify-content-center mt-4">
                {data?.data.data.map((Brand) => <div className="card col-md-3" key={Brand._id}><div>
                    <img src={Brand.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h1 className="card-title h4">{Brand.name}</h1>
                    </div>
                </div>
                </div>
                )}
            </div >
        }


    </>
}
