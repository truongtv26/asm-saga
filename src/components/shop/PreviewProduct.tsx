import { Image } from 'antd'
import { IProduct } from '../../types/Type'

type PreviewProductProps = {
    product: IProduct
}

const PreviewProduct = ({ product }: PreviewProductProps) => {
    return (
        <>
            <Image preview alt={product.name} src={product.img1} />
        </>
    )
}

export default PreviewProduct
