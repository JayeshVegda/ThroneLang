import React from "react";
import logo from '../assets/Logo.png'
import './one.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Github from '@mui/icons-material/GitHub';

function Logo(){

    const url = logo
    const primaryButton = "Play";
    const secondaryButton = "GitHub";
    const github_link = "https://github.com/JayeshVegda/ThroneLang";



      
    return(
        <>

        <div className="main_text">
            <h3 className="customFont">THRON LANG</h3>
            <p className="sub_head">A Language for the Realm of Imagination </p>
        </div>
        
        <div class="btn_group">
            <div id="btn1">
                <Button color="" variant="outlined" size="large" >Let's Play</Button>
            </div>
            <div id="btn2">
                    <Button  id="btn2" target="_blank" variant="contained" href={github_link} size="large"
                        startIcon={<Github /> }>Source Code</Button>
            </div>    
        </div>
        
        <div className="credit">
            <p>Created and developed by <a href="https://github.com/JayeshVegda/" target="_blank">@JayeshVegda</a></p>
        </div>
        </>
    )
}

export default Logo;