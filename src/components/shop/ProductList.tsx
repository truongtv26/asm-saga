import { Card } from 'antd'
import { IProduct } from '../../types/Type'
import { vietnameseCurrency } from '../../helpers/currency'
import { Link } from 'react-router-dom'

type ProductListProps = {
    data: IProduct[]
}

const ProductList = (props: ProductListProps) => {
    const { data } = props

    return (
        <div className='flex flex-wrap gap-5'>
            {data.map((product) => (
                <Link to={'/detail/' + product._id.$oid}
                style={{ width: 'calc(25% - 15px)' }}
                >
                    <Card
                         className='h-full'
                        hoverable
                        cover={<img alt={product.name} src={product.img1}/>}
                    >
                        <div className='h-full flex flex-col gap-2'>
                            <p className='line-clamp-2 text-[16px] font-bold italic'>{product.name}</p>
                            <p className='italic'>{vietnameseCurrency(product.price)}</p>
                            <p className='line-clamp-2 items-end'>{product.short_desc}</p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default ProductList
