import { Card } from 'antd'
import { IProduct } from '../../types/Type'
import { vietnameseCurrency } from '../../helpers/currency'
import { Link } from 'react-router-dom'
import PreviewProduct from './PreviewProduct'

type ProductListProps = {
    data: IProduct[]
}

const ProductList = (props: ProductListProps) => {
    const { data } = props

    return (
        data.length > 0 ?
        <div className='flex flex-wrap gap-5'>
            {data.map((product) => (
                <Card
                    key={product._id.$oid}
                    style={{ width: 'calc(25% - 15px)' }}
                    hoverable
                    cover={<PreviewProduct product={product}/>}
                >
                    <Link to={'/detail/' + product._id.$oid}>
                        <div className='h-full flex flex-col gap-2'>
                            <p className='line-clamp-2 text-[16px] font-bold italic'>{product.name}</p>
                            <p className='italic'>{vietnameseCurrency(product.price)}</p>
                            <p className='line-clamp-2 items-end'>{product.short_desc}</p>
                        </div>
                    </Link>
                </Card>
            ))}
        </div> :
        "Không có sản phẩm nào!"
    )
}

export default ProductList
