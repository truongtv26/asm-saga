import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
    {
        title: 'New inspiration 2020',
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: '20% off on new session'
    },
    {
        title: 'New inspiration 2020',
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: '20% off on new session'
    },
    {
        title: 'New inspiration 2020',
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: '20% off on new session'
    }
]

const Slider = () => {
    return (
        <div className='slide-container'>
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div
                            className='flex items-center justify-center bg-cover h-[400px]'
                            style={{ backgroundImage: `url(${slideImage.url})` }}
                        >
                            <div className='w-full px-10 flex flex-col justify-start items-start'>
                                <span className='uppercase text-gray-400 text-[24px] italic'>{slideImage.title}</span>
                                <span className='text-gray-300 uppercase text-[32px] italic'>{slideImage.caption}</span>
                                <Link to={'/shop'}>
                                    <Button className='bg-white text-black hover:opacity-80 border-none'>
                                        Browse Collections
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default Slider
