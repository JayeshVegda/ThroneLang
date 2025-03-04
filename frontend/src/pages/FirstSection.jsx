import { Button, styled } from '@mui/material'
import Github from '@mui/icons-material/GitHub';
import React from 'react'
import Editor from '../components/Editor';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';

const PlayButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
    transition: 'all 0.3s ease-in-out',
    border: '2px solid',

    // Responsive padding
    padding: '6px 16px',
    [theme.breakpoints.up('sm')]: {
        padding: '8px 20px',
    },
    [theme.breakpoints.up('md')]: {
        padding: '8px 24px',
    },

    // Responsive font size
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.125rem',
    },

    fontWeight: 600,

    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[5],
        filter: 'brightness(1.1)',
        '& .icon': {
            transform: 'rotate(10deg)',
        },
        '& .underline': {
            width: '100%',
        }
    },

    '&:active': {
        transform: 'scale(0.95)',
    },
}));
const FirstSection = () => {
    const github_link = "https://github.com/JayeshVegda/ThroneLang";

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
                {/* Title */}
                <h1 className="tracking-wider">
                    <span className="font-got select-none text-4xl sm:text-9xl md:text-7xl lg:text-8xl xl:text-8xl">THRON LANG</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-2 select-none tracking-[.15em] text-xs md:text-lg lg:text-2xl  xl:text-2xl text-gray-300 font-cinzel">
                    A LANGUAGE FOR THE REALM OF IMAGINATION
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                    <PlayButton href='#editor-id'>
                        <div style={{ position: 'relative' }} >
                            Let's Play
                            <div
                                className="underline"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '2px',
                                    width: 0,
                                    backgroundColor: 'white',
                                    transition: 'width 0.3s ease-in-out'
                                }}
                            />
                        </div>
                    </PlayButton>
                    <PrimaryButton
                        href={github_link}
                        target="_blank"
                        variant="contained"
                        startIcon={
                            <Github
                                className="icon"
                                style={{ transition: 'transform 0.3s ease-in-out' }}
                            />
                        }
                    >
                        <div style={{ position: 'relative' }}>
                            Source Code
                            <div
                                className="underline"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '2px',
                                    width: 0,
                                    backgroundColor: 'white',
                                    transition: 'width 0.3s ease-in-out'
                                }}
                            />
                        </div>
                    </PrimaryButton>
                </div>



                {/* Footer */}
                <span className="mt-6 font-light tracking-wide text-wrap text-xs md:text-sm text-gray-400/80
      flex items-center justify-center gap-1.5
      font-mono">
                    CREATED AND DEVELOPED BY
                    <a
                        href="https://github.com/JayeshVegda/"
                        target="_blank"
                        className="relative inline-flex items-center font-medium text-gray-300
          transition-colors duration-300
          hover:text-white
          group"
                    >
                        @JayeshVegda
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white/40
          transition-all duration-300 ease-out
          group-hover:w-full" />
                    </a>&
                    <a
                        href="https://github.com/jay08-09"
                        target="_blank"
                        className="relative inline-flex items-center font-medium text-gray-300
          transition-colors duration-300
          hover:text-white
          group"
                    >
                        @JayDhandhukiya
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white/40
          transition-all duration-300 ease-out
          group-hover:w-full" />
                    </a>

                </span>

            </div>
            {/* <div className="flex justify-center items-center mb-8">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                    style={{
                        animation: 'upDown 2s ease-in-out infinite'
                    }}
                >
                    <line x1="12" y1="4" x2="12" y2="16" />
                    <polyline points="6 10 12 16 18 10" />
                </svg>

                <style jsx>{`
        @keyframes upDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
            </div> */}
            <Editor />

        </>

    )
}

export default FirstSection
