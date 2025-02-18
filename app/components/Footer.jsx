'use client';

import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col space-y-5 justify-center">

    <nav className="flex justify-center flex-wrap text-gray-500 font-medium py-2 border-y-2">
        <div className="">Anish Bar, CSE, 2026</div>
    </nav>

    <div className="flex justify-center space-x-5 py-2">
        <Link href="https://www.facebook.com/anish.bar.9" target="_blank" rel="noopener noreferrer">
            <FaFacebook className='text-3xl text-blue-500 hover:text-blue-700' />
        </Link>
        <Link href="https://www.linkedin.com/in/anishbar/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className='text-3xl text-blue-700 hover:text-blue-900' />
        </Link>
        <Link href="https://www.instagram.com/anishbar2003" target="_blank" rel="noopener noreferrer">
            <FaInstagram className='text-3xl text-pink-600 hover:text-pink-800' />
        </Link>
        <Link href="https://github.com/anix003" target="_blank" rel="noopener noreferrer">
            <FaGithub className='text-3xl text-gray-800 hover:text-gray-900' />
        </Link>
        <Link href="https://twitter.com/bar_anish" target="_blank" rel="noopener noreferrer">
            <FaTwitter className='text-3xl text-blue-400 hover:text-blue-600' />
        </Link>
    </div>
    <p className="text-center text-gray-700 font-medium border-y-2 py-2">&copy; {currentYear}  All rights reserved.</p>
</footer>
  );
};

export default Footer;
