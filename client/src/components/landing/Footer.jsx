import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import Logo from '../Logo'

export function Footer () {
  return (
    <footer className='border-t border-gray-300'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <a href='#'>
          <div className='flex items-center gap-3'>
            <Logo/>
aA          </div>
        </a>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            About
          </a>
          <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Features
          </a>
          <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Works
          </a>
          <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Career
          </a>
        </div>

        <div className='flex items-center gap-4 text-xl'>
          <a href='#' className='hover:text-blue-600 transition-colors'>
            <FaFacebookF />
          </a>
          <a href='#' className='hover:text-pink-500 transition-colors'>
            <FaInstagram />
          </a>
          <a href='#' className='hover:text-sky-400 transition-colors'>
            <FaTwitter />
          </a>
          <a href='#' className='hover:text-red-600 transition-colors'>
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <a href='#' className='hover:underline'>
            TourismHUB
          </a>
        </p>
      </div>
    </footer>
  )
}

