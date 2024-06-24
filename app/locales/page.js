"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import SearchBar from '../../componentes estaticos/buscador';
import Navegador from '../../componentes estaticos/navegador';
export default function Locales() {
    
    return(
        <>
            <SearchBar/>
            <Navegador/>
        </>
        
    )
}